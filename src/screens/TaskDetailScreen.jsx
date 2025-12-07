// src/screens/TaskDetailScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useTasks from '../hooks/useTasks';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import {
  formatDateTime,
  getDaysUntil,
  getUrgencyColor,
  isDatePast,
} from '../utils/dateFormatter';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants/colors';

/**
 * Écran de détails d'une tâche
 */
const TaskDetailScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const { getTaskById, markAsDone, deleteTask, isLoading } = useTasks();
  const [task, setTask] = useState(null);

  /**
   * Charger les détails de la tâche
   */
  useEffect(() => {
    loadTask();
  }, [taskId]);

  const loadTask = async () => {
    const result = await getTaskById(taskId);
    if (result.success) {
      setTask(result.task);
    } else {
      Alert.alert('Erreur', 'Tâche introuvable', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  /**
   * Marquer comme terminée
   */
  const handleMarkAsDone = async () => {
    const result = await markAsDone(taskId);
    
    if (result.success) {
      setTask(result.task);
      Alert.alert('Succès', 'Tâche marquée comme terminée ✅');
    } else {
      Alert.alert('Erreur', result.message);
    }
  };

  /**
   * Supprimer la tâche
   */
  const handleDelete = () => {
    Alert.alert(
      'Supprimer la tâche',
      'Êtes-vous sûr de vouloir supprimer cette tâche ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteTask(taskId);
            
            if (result.success) {
              Alert.alert('Succès', 'Tâche supprimée', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ]);
            } else {
              Alert.alert('Erreur', result.message);
            }
          },
        },
      ]
    );
  };

  // Afficher un loader pendant le chargement
  if (isLoading || !task) {
    return <Loader message="Chargement..." />;
  }

  const isDone = task.status === 'done';
  const isOverdue = isDatePast(task.due_date) && !isDone;
  const urgencyColor = getUrgencyColor(task.due_date);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header avec statut */}
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: isDone ? COLORS.success : urgencyColor },
            ]}
          >
            <Ionicons
              name={isDone ? 'checkmark-circle' : 'time'}
              size={20}
              color={COLORS.white}
            />
            <Text style={styles.statusText}>
              {isDone ? 'Terminée' : getDaysUntil(task.due_date)}
            </Text>
          </View>

          {isOverdue && (
            <View style={[styles.statusBadge, styles.overdueBadge]}>
              <Ionicons name="warning" size={20} color={COLORS.white} />
              <Text style={styles.statusText}>En retard</Text>
            </View>
          )}
        </View>

        {/* Titre */}
        <Text style={[styles.title, isDone && styles.titleDone]}>
          {task.title}
        </Text>

        {/* Description */}
        {task.description && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="document-text" size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Description</Text>
            </View>
            <Text style={styles.description}>{task.description}</Text>
          </View>
        )}

        {/* Date limite */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Date limite</Text>
          </View>
          <Text style={styles.dateText}>{formatDateTime(task.due_date)}</Text>
        </View>

        {/* Informations supplémentaires */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Informations</Text>
          </View>
          <InfoRow label="Créée le" value={formatDateTime(task.created_at)} />
          <InfoRow
            label="Statut"
            value={isDone ? 'Terminée' : 'En attente'}
            valueColor={isDone ? COLORS.success : COLORS.warning}
          />
        </View>

        {/* Boutons d'action */}
        <View style={styles.actions}>
          {!isDone && (
            <Button
              title="Marquer comme terminée"
              onPress={handleMarkAsDone}
              variant="primary"
              style={styles.actionButton}
            />
          )}

          <Button
            title="Supprimer"
            onPress={handleDelete}
            variant="danger"
            style={styles.actionButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Composant pour afficher une ligne d'information
 */
const InfoRow = ({ label, value, valueColor }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, valueColor && { color: valueColor }]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.xs,
  },
  overdueBadge: {
    backgroundColor: COLORS.danger,
  },
  statusText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  dateText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  actions: {
    marginTop: SPACING.lg,
  },
  actionButton: {
    marginBottom: SPACING.md,
  },
});

export default TaskDetailScreen;