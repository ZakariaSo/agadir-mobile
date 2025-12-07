// src/screens/WelcomeScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/common/Button';
import { COLORS, FONT_SIZES, SPACING } from '../constants/colors';

/**
 * Écran d'accueil
 * Premier écran de l'app avec options Login/Register
 */
const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo et icône */}
        <View style={styles.logoContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkbox-outline" size={60} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>Agadir Task Manager</Text>
          <Text style={styles.subtitle}>2025</Text>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Gérez vos tâches quotidiennes facilement
          </Text>
          <View style={styles.features}>
            <FeatureItem icon="checkmark-circle" text="RDV administratifs" />
            <FeatureItem icon="school" text="Révisions et examens" />
            <FeatureItem icon="document-text" text="Démarches officielles" />
            <FeatureItem icon="calendar" text="Rappels personnalisés" />
          </View>
        </View>

        {/* Boutons */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Se connecter"
            onPress={() => navigation.navigate('Login')}
            variant="primary"
            style={styles.button}
          />
          <Button
            title="Créer un compte"
            onPress={() => navigation.navigate('Register')}
            variant="outline"
            style={styles.button}
          />
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Made with ❤️ in Agadir 🌊
        </Text>
      </View>
    </SafeAreaView>
  );
};

/**
 * Composant pour afficher une fonctionnalité
 */
const FeatureItem = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <Ionicons name={icon} size={20} color={COLORS.primary} />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'space-between',
    paddingVertical: SPACING.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: SPACING.xxl,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.primary,
    fontWeight: '600',
  },
  descriptionContainer: {
    alignItems: 'center',
  },
  description: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  features: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  featureText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    marginLeft: SPACING.md,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    marginBottom: SPACING.md,
  },
  footer: {
    textAlign: 'center',
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
});

export default WelcomeScreen;