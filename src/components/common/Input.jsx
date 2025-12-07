// src/components/common/Input.jsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';

/**
 * Composant Input personnalisé
 * @param {string} placeholder - Texte placeholder
 * @param {string} value - Valeur de l'input
 * @param {function} onChangeText - Fonction appelée au changement
 * @param {boolean} secureTextEntry - Masquer le texte (password)
 * @param {string} error - Message d'erreur
 * @param {string} icon - Nom de l'icône (Ionicons)
 * @param {string} keyboardType - Type de clavier
 */
const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  icon,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  style,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {/* Input avec icône */}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        {/* Icône à gauche */}
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={error ? COLORS.danger : isFocused ? COLORS.primary : COLORS.gray}
            style={styles.icon}
          />
        )}

        {/* Champ de texte */}
        <TextInput
          style={[
            styles.input,
            multiline && styles.multilineInput,
          ]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.grayLight}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />

        {/* Icône pour afficher/masquer le mot de passe */}
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={COLORS.gray}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Message d'erreur */}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    minHeight: 50,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    paddingVertical: SPACING.sm,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: SPACING.md,
  },
  eyeIcon: {
    padding: SPACING.xs,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: FONT_SIZES.sm,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
  },
});

export default Input;