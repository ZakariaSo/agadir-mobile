// src/components/tasks/TaskItem.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';
import { formatDate, getDaysUntil, getUrgencyColor, isDatePast } from '../../utils/dateFormatter';

/**
 * Composant TaskItem
 * Affiche une tâche dans la liste
 */
const TaskItem = ({ task, onPress, onToggleDone }) => {
  const isDone = task.status === 'done';
  const isOverdue = isDatePast(task.due_date) && !isDone;
  const urgencyColor = getUrgencyColor(task.due_date);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Checkbox pour marquer comme terminée */}
      <TouchableOpacity
        style={[
          styles.checkbox,
          isDone && styles.checkboxDone,
        ]}
        onPress={() => onToggleDone(task.id)}
      >
        {isDone && (
          <Ionicons name="checkmark" size={18} color={COLORS.white} />
        )}
      </TouchableOpacity>

      {/* Contenu de la tâche */}
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            isDone && styles.titleDone,
          ]}
          numberOfLines={2}
        >
          {task.title}
        </Text>

        {task.description && (
          <Text style={styles.description} numberOfLines={2}>
            {task.description}
          </Text>
        )}

        {/* Date et statut */}
        <View style={styles.footer}>
          <View style={[styles.badge, { backgroundColor: urgencyColor }]}>
            <Ionicons name="calendar-outline" size={12} color={COLORS.white} />
            <Text style={styles.badgeText}>
              {isDone ? 'Terminée' : getDaysUntil(task.due_date)}
            </Text>
          </View>

          {isOverdue && (
            <View style={[styles.badge, styles.overdueBadge]}>
              <Ionicons name="warning" size={12} color={COLORS.white} />
              <Text style={styles.badgeText}>En retard</Text>
            </View>
          )}
        </View>
      </View>

      {/* Flèche pour voir les détails */}
      <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.gray,
    marginRight: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxDone: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    gap: 4,
  },
  overdueBadge: {
    backgroundColor: COLORS.danger,
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default TaskItem;