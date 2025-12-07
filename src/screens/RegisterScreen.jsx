// src/screens/RegisterScreen.jsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { COLORS, FONT_SIZES, SPACING } from '../constants/colors';
import useRegister from '../hooks/useRegister';

/**
 * Écran d'inscription
 */
const RegisterScreen = ({ navigation }) => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    isLoading,
    handleRegister,
  } = useRegister();

  /**
   * Soumettre le formulaire d'inscription
   */
  const onSubmit = async () => {
    const result = await handleRegister();

    if (result.success) {
      // La navigation sera gérée automatiquement
      Alert.alert('Succès', 'Votre compte a été créé avec succès ! 🎉');
    } else {
      Alert.alert('Erreur', result.message || 'Inscription échouée');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>
              Rejoignez Agadir Task Manager aujourd'hui
            </Text>
          </View>

          {/* Formulaire */}
          <View style={styles.form}>
            <Input
              placeholder="Nom complet"
              value={name}
              onChangeText={setName}
              error={errors.name}
              icon="person-outline"
            />

            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              icon="mail-outline"
              keyboardType="email-address"
            />

            <Input
              placeholder="Mot de passe"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              icon="lock-closed-outline"
              secureTextEntry
            />

            <Input
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={errors.confirmPassword}
              icon="lock-closed-outline"
              secureTextEntry
            />

            {/* Erreur générale */}
            {errors.general && (
              <Text style={styles.errorText}>{errors.general}</Text>
            )}

            {/* Exigences du mot de passe */}
            <View style={styles.passwordRequirements}>
              <Text style={styles.requirementsTitle}>
                Le mot de passe doit contenir :
              </Text>
              <Text style={styles.requirementItem}>• Au moins 6 caractères</Text>
              <Text style={styles.requirementItem}>• Une majuscule</Text>
              <Text style={styles.requirementItem}>• Une minuscule</Text>
              <Text style={styles.requirementItem}>• Un chiffre</Text>
            </View>

            {/* Bouton d'inscription */}
            <Button
              title="S'inscrire"
              onPress={onSubmit}
              loading={isLoading}
              style={styles.registerButton}
            />
          </View>

          {/* Lien vers connexion */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Déjà un compte ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  form: {
    marginBottom: SPACING.xl,
  },
  passwordRequirements: {
    backgroundColor: COLORS.grayLight,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  requirementsTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  requirementItem: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  registerButton: {
    marginTop: SPACING.md,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  linkText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default RegisterScreen;