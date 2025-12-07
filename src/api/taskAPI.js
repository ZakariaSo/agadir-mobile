// src/api/taskAPI.js
import axiosInstance from './axios.config';
import { ENDPOINTS } from '../constants/api';

/**
 * Récupérer toutes les tâches de l'utilisateur
 * @param {string} status - Filtrer par statut: 'pending', 'done', ou undefined (toutes)
 * @returns {Promise} Liste des tâches
 */
export const getTasksAPI = async (status) => {
  try {
    const params = status ? { status } : {};
    const response = await axiosInstance.get(ENDPOINTS.TASKS, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la récupération des tâches' };
  }
};

/**
 * Récupérer une tâche par son ID
 * @param {number} id - ID de la tâche
 * @returns {Promise} Données de la tâche
 */
export const getTaskByIdAPI = async (id) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.TASK_BY_ID(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la récupération de la tâche' };
  }
};

/**
 * Créer une nouvelle tâche
 * @param {Object} taskData - { title, description, due_date }
 * @returns {Promise} Tâche créée
 */
export const createTaskAPI = async (taskData) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.TASKS, taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la création de la tâche' };
  }
};

/**
 * Mettre à jour une tâche
 * @param {number} id - ID de la tâche
 * @param {Object} taskData - Données à mettre à jour
 * @returns {Promise} Tâche mise à jour
 */
export const updateTaskAPI = async (id, taskData) => {
  try {
    const response = await axiosInstance.put(ENDPOINTS.TASK_BY_ID(id), taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la mise à jour de la tâche' };
  }
};

/**
 * Supprimer une tâche
 * @param {number} id - ID de la tâche
 * @returns {Promise} Confirmation de suppression
 */
export const deleteTaskAPI = async (id) => {
  try {
    const response = await axiosInstance.delete(ENDPOINTS.TASK_BY_ID(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la suppression de la tâche' };
  }
};

/**
 * Marquer une tâche comme terminée
 * @param {number} id - ID de la tâche
 * @returns {Promise} Tâche mise à jour
 */
export const markTaskAsDoneAPI = async (id) => {
  try {
    const response = await axiosInstance.patch(ENDPOINTS.TASK_DONE(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la mise à jour du statut' };
  }
};

/**
 * Récupérer les statistiques des tâches
 * @returns {Promise} Statistiques (total, pending, done, overdue)
 */
export const getTaskStatsAPI = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.TASK_STATS);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la récupération des statistiques' };
  }
};