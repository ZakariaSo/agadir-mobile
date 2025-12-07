// src/utils/validators.js

/**
 * Valider un email
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valider un mot de passe
 * - Minimum 6 caractères
 * - Au moins une majuscule
 * - Au moins une minuscule
 * - Au moins un chiffre
 */
export const validatePassword = (password) => {
  if (password.length < 6) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins 6 caractères' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins une majuscule' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins une minuscule' };
  }
  
  if (!/\d/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins un chiffre' };
  }
  
  return { valid: true, message: '' };
};

/**
 * Valider un nom
 */
export const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return { valid: false, message: 'Le nom doit contenir au moins 2 caractères' };
  }
  
  if (name.trim().length > 255) {
    return { valid: false, message: 'Le nom ne peut pas dépasser 255 caractères' };
  }
  
  return { valid: true, message: '' };
};

/**
 * Valider le titre d'une tâche
 */
export const validateTaskTitle = (title) => {
  if (!title || title.trim().length < 3) {
    return { valid: false, message: 'Le titre doit contenir au moins 3 caractères' };
  }
  
  if (title.trim().length > 255) {
    return { valid: false, message: 'Le titre ne peut pas dépasser 255 caractères' };
  }
  
  return { valid: true, message: '' };
};

/**
 * Valider une date future
 */
export const validateFutureDate = (date) => {
  const selectedDate = new Date(date);
  const now = new Date();
  
  if (selectedDate < now) {
    return { valid: false, message: 'La date doit être dans le futur' };
  }
  
  return { valid: true, message: '' };
};