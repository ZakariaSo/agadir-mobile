// src/screens/AddTaskScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskForm from '../components/tasks/TaskForm';
import useTasks from '../hooks/useTasks';
import { COLORS, FONT_SIZES, SPACING } from '../constants/colors';

/**
 * Écran pour créer une nouvelle tâche
 */
const AddTaskScreen = ({ navigation }) => {
  const { createTask, isLoading } = useTasks();

  /**
   * Créer la tâche
   */
  const handleSubmit = async (taskData) => {
    const result = await createTask(taskData);

    if (result.success) {
      Alert.alert('Succès', 'Tâche créée avec succès ! ✅', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      Alert.alert('Erreur', result.message || 'Impossible de créer la tâche');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nouvelle tâche</Text>
          <Text style={styles.subtitle}>
            Créez une tâche pour mieux organiser votre journée
          </Text>
        </View>

        {/* Formulaire */}
        <TaskForm onSubmit={handleSubmit} isLoading={isLoading} />

        {/* Suggestions de tâches courantes au Maroc */}
        <View style={styles.suggestions}>
          <Text style={styles.suggestionsTitle}>💡 Suggestions :</Text>
          <SuggestionItem text="RDV Moukawalati" />
          <SuggestionItem text="Télé-déclaration CNSS" />
          <SuggestionItem text="Renouvellement CIN" />
          <SuggestionItem text="Dépôt documents commune" />
          <SuggestionItem text="Examens OFPPT / BTS" />
          <SuggestionItem text="Rendez-vous ANCFCC" />
          <SuggestionItem text="Demande RAMED / AMO" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Item de suggestion
 */
const SuggestionItem = ({ text }) => (
  <View style={styles.suggestionItem}>
    <Text style={styles.suggestionBullet}>•</Text>
    <Text style={styles.suggestionText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  suggestions: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginTop: SPACING.lg,
  },
  suggestionsTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  suggestionBullet: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    marginRight: SPACING.sm,
  },
  suggestionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
});

export default AddTaskScreen;