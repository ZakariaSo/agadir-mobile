// src/constants/api.js

/**
 * Configuration des URLs de l'API
 */

// Pour un émulateur Android uniquement
export const API_URL_ANDROID = 'http://10.0.2.2:4000/api';

// Pour iOS Simulator
export const API_URL_IOS = 'http://localhost:4000/api';

// Pour un appareil physique (Android ou iOS) ou Web
export const API_URL_PHYSICAL = 'http://192.168.100.211:4000/api';

// URL de production (à configurer plus tard)
export const API_URL_PRODUCTION = 'https://votre-api.com/api';

import { Platform } from 'react-native';

let BASE_URL;

// Détection automatique propre
if (__DEV__) {
  if (Platform.OS === 'android') {
    // Si tu utilises un ÉMULATEUR Android → 10.0.2.2
    // Si tu utilises un téléphone Android réel → on force l’IP locale
    BASE_URL = Platform.isTV ? API_URL_ANDROID : API_URL_PHYSICAL;
  } else if (Platform.OS === 'ios') {
    BASE_URL = API_URL_IOS;
  } else {
    BASE_URL = API_URL_PHYSICAL; // Web ou autres
  }
} else {
  BASE_URL = API_URL_PRODUCTION;
}

export const API_URL = BASE_URL;

// Endpoints de l'API
export const ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  ME: '/auth/me',

  TASKS: '/tasks',
  TASK_BY_ID: (id) => `/tasks/${id}`,
  TASK_DONE: (id) => `/tasks/${id}/done`,
  TASK_STATS: '/tasks/stats',
};
