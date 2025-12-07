// src/screens/LoginScreen.jsx
import React, { useEffect } from 'react';
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
import useLogin from '../hooks/useLogin';

/**
 * Écran de connexion
 */
const LoginScreen = ({ navigation }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isLoading,
    handleLogin,
  } = useLogin();

  /**
   * Soumettre le formulaire de connexion
   */
  const onSubmit = async () => {
    const result = await handleLogin();

    if (result.success) {
      // La navigation sera gérée automatiquement par AppNavigator
      // car l'utilisateur est maintenant authentifié
    } else {
      Alert.alert('Erreur', result.message || 'Connexion échouée');
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
            <Text style={styles.title}>Bienvenue 👋</Text>
            <Text style={styles.subtitle}>
              Connectez-vous pour gérer vos tâches
            </Text>
          </View>

          {/* Formulaire */}
          <View style={styles.form}>
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

            {/* Erreur générale */}
            {errors.general && (
              <Text style={styles.errorText}>{errors.general}</Text>
            )}

            {/* Bouton de connexion */}
            <Button
              title="Se connecter"
              onPress={onSubmit}
              loading={isLoading}
              style={styles.loginButton}
            />
          </View>

          {/* Lien vers inscription */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Pas encore de compte ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkText}>S'inscrire</Text>
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
  loginButton: {
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

export default LoginScreen;