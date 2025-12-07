// src/api/axios.config.js
import axios from 'axios';
import { API_URL } from '../constants/api';
import { getToken } from '../utils/storage';

/**
 * Instance Axios configurée pour l'API
 */
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 secondes
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * INTERCEPTEUR DE REQUÊTE
 * Ajoute automatiquement le token JWT à chaque requête
 */
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Récupérer le token depuis AsyncStorage
      const token = await getToken();
      
      // Si un token existe, l'ajouter au header Authorization
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Log en développement
      if (__DEV__) {
        console.log('📤 Requête:', config.method.toUpperCase(), config.url);
      }
      
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * INTERCEPTEUR DE RÉPONSE
 * Gère les erreurs globales (token expiré, erreurs serveur)
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // Log en développement
    if (__DEV__) {
      console.log('📥 Réponse:', response.status, response.config.url);
    }
    
    return response;
  },
  async (error) => {
    // Log de l'erreur
    if (__DEV__) {
      console.log('❌ Erreur API:', error.response?.status, error.response?.data);
    }
    
    // Erreur 401 : Token expiré ou invalide
    if (error.response?.status === 401) {
      // TODO: Déconnecter l'utilisateur et rediriger vers login
      console.log('🔒 Token expiré - Déconnexion nécessaire');
    }
    
    // Erreur 500 : Problème serveur
    if (error.response?.status === 500) {
      console.log('🔥 Erreur serveur');
    }
    
    // Pas de réponse : Problème réseau
    if (!error.response) {
      console.log('📡 Erreur réseau - Vérifiez votre connexion');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;