// src/components/tasks/TaskForm.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../common/Input';
import Button from '../common/Button';
import { COLORS, SPACING, FONT_SIZES } from '../../constants/colors';
import { validateTaskTitle, validateFutureDate } from '../../utils/validators';

/**
 * Composant TaskForm
 * Formulaire pour créer ou modifier une tâche
 */
const TaskForm = ({ initialValues, onSubmit, isLoading }) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [dueDate, setDueDate] = useState(
    initialValues?.due_date ? new Date(initialValues.due_date) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Valider le formulaire
   */
  const validate = () => {
    const newErrors = {};

    // Validation titre
    const titleValidation = validateTaskTitle(title);
    if (!titleValidation.valid) {
      newErrors.title = titleValidation.message;
    }

    // Validation date
    const dateValidation = validateFutureDate(dueDate);
    if (!dateValidation.valid) {
      newErrors.dueDate = dateValidation.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Soumettre le formulaire
   */
  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      due_date: dueDate.toISOString(),
    };

    onSubmit(taskData);
  };

  /**
   * Gérer le changement de date
   */
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // Garder ouvert sur iOS
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      {/* Titre */}
      <Input
        placeholder="Titre de la tâche"
        value={title}
        onChangeText={setTitle}
        error={errors.title}
        icon="document-text-outline"
      />

      {/* Description */}
      <Input
        placeholder="Description (optionnelle)"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        icon="create-outline"
      />

      {/* Date limite */}
      <View style={styles.dateContainer}>
        <Text style={styles.label}>Date limite</Text>
        <Button
          title={dueDate.toLocaleDateString('fr-FR')}
          onPress={() => setShowDatePicker(true)}
          variant="outline"
        />
        {errors.dueDate && (
          <Text style={styles.errorText}>{errors.dueDate}</Text>
        )}
      </View>

      {/* DatePicker */}
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* Bouton de soumission */}
      <Button
        title={initialValues ? 'Modifier' : 'Créer la tâche'}
        onPress={handleSubmit}
        loading={isLoading}
        style={styles.submitButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
  },
  dateContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: FONT_SIZES.sm,
    marginTop: SPACING.xs,
  },
  submitButton: {
    marginTop: SPACING.md,
  },
});

export default TaskForm;