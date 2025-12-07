// src/navigation/AppNavigator.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import AuthNavigator from './AuthNavigator';
import DashboardScreen from '../screens/DashboardScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import Loader from '../components/common/Loader';
import { COLORS } from '../constants/colors';

const Stack = createNativeStackNavigator();

/**
 * Navigation principale de l'application
 * Affiche AuthNavigator si non connecté, sinon les écrans de tâches
 */
const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Afficher un loader pendant la vérification de l'authentification
  if (isLoading) {
    return <Loader message="Vérification..." />;
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        // Utilisateur non connecté : Afficher les écrans d'authentification
        <AuthNavigator />
      ) : (
        // Utilisateur connecté : Afficher les écrans de tâches
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTintColor: COLORS.white,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ title: 'Mes Tâches', headerShown: false }}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTaskScreen}
            options={{ title: 'Nouvelle Tâche' }}
          />
          <Stack.Screen
            name="TaskDetail"
            component={TaskDetailScreen}
            options={{ title: 'Détails de la Tâche' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;