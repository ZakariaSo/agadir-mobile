// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * Composant principal de l'application
 * Wrap toute l'app avec les providers nécessaires
 */
export default function App() {
  return (
    <SafeAreaProvider>
      {/* AuthProvider : Fournit le contexte d'authentification à toute l'app */}
      <AuthProvider>
        {/* Navigation principale */}
        <AppNavigator />
        
        {/* StatusBar : Barre de statut en haut (heure, batterie, etc.) */}
        <StatusBar style="auto" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}