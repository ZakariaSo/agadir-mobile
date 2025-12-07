// src/constants/api.js

/**
 * Configuration des URLs de l'API
 * Changez selon votre environnement
 */

// Pour un émulateur Android
export const API_URL_ANDROID = 'http://10.0.2.2:4000/api';

// Pour iOS Simulator
export const API_URL_IOS = 'http://localhost:4000/api';

// Pour un appareil physique (remplacez par votre IP locale)
export const API_URL_PHYSICAL = 'http://192.168.1.100:4000/api';

// URL de production (à configurer plus tard)
export const API_URL_PRODUCTION = 'https://votre-api.com/api';

// Détection automatique de l'environnement
import { Platform } from 'react-native';

let BASE_URL;

if (__DEV__) {
  // Mode développement
  if (Platform.OS === 'android') {
    BASE_URL = API_URL_ANDROID;
  } else if (Platform.OS === 'ios') {
    BASE_URL = API_URL_IOS;
  } else {
    BASE_URL = API_URL_PHYSICAL; // Web ou appareil physique
  }
} else {
  // Mode production
  BASE_URL = API_URL_PRODUCTION;
}

export const API_URL = BASE_URL;

// Endpoints de l'API
export const ENDPOINTS = {
  // Auth
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  ME: '/auth/me',
  
  // Tasks
  TASKS: '/tasks',
  TASK_BY_ID: (id) => `/tasks/${id}`,
  TASK_DONE: (id) => `/tasks/${id}/done`,
  TASK_STATS: '/tasks/stats',
};