// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Clés de stockage
 */
const STORAGE_KEYS = {
  TOKEN: '@agadir_token',
  USER: '@agadir_user',
};

/**
 * Sauvegarder le token JWT
 */
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    return true;
  } catch (error) {
    console.error('Erreur saveToken:', error);
    return false;
  }
};

/**
 * Récupérer le token JWT
 */
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    return token;
  } catch (error) {
    console.error('Erreur getToken:', error);
    return null;
  }
};

/**
 * Supprimer le token JWT (déconnexion)
 */
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    return true;
  } catch (error) {
    console.error('Erreur removeToken:', error);
    return false;
  }
};

/**
 * Sauvegarder les données utilisateur
 */
export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Erreur saveUser:', error);
    return false;
  }
};

/**
 * Récupérer les données utilisateur
 */
export const getUser = async () => {
  try {
    const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Erreur getUser:', error);
    return null;
  }
};

/**
 * Supprimer les données utilisateur
 */
export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    return true;
  } catch (error) {
    console.error('Erreur removeUser:', error);
    return false;
  }
};

/**
 * Tout supprimer (déconnexion complète)
 */
export const clearAll = async () => {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEYS.TOKEN, STORAGE_KEYS.USER]);
    return true;
  } catch (error) {
    console.error('Erreur clearAll:', error);
    return false;
  }
};