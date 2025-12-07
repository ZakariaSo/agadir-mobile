// src/api/authAPI.js
import axiosInstance from './axios.config';
import { ENDPOINTS } from '../constants/api';

/**
 * Inscription d'un nouvel utilisateur
 * @param {Object} userData - { name, email, password }
 * @returns {Promise} Réponse de l'API avec user et token
 */
export const registerAPI = async (userData) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.REGISTER, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de l\'inscription' };
  }
};

/**
 * Connexion d'un utilisateur
 * @param {Object} credentials - { email, password }
 * @returns {Promise} Réponse de l'API avec user et token
 */
export const loginAPI = async (credentials) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.LOGIN, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la connexion' };
  }
};

/**
 * Récupérer le profil de l'utilisateur connecté
 * @returns {Promise} Données de l'utilisateur
 */
export const getMeAPI = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.ME);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la récupération du profil' };
  }
};