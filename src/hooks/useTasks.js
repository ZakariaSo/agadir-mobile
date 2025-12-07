// src/hooks/useTasks.js
import { useState, useEffect, useCallback } from 'react';
import {
  getTasksAPI,
  getTaskByIdAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
  markTaskAsDoneAPI,
  getTaskStatsAPI,
} from '../api/taskAPI';

/**
 * Hook personnalisé pour gérer les tâches
 * Fournit toutes les fonctions CRUD + état global
 */
const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'done'

  /**
   * Charger toutes les tâches
   */
  const loadTasks = useCallback(async (status) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getTasksAPI(status);
      setTasks(response.data.tasks);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des tâches');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Charger les statistiques
   */
  const loadStats = useCallback(async () => {
    try {
      const response = await getTaskStatsAPI();
      setStats(response.data.stats);
    } catch (err) {
      console.error('Erreur stats:', err);
    }
  }, []);

  /**
   * Charger les tâches au montage du composant
   */
  useEffect(() => {
    loadTasks();
    loadStats();
  }, [loadTasks, loadStats]);

  /**
   * Recharger les tâches selon le filtre
   */
  useEffect(() => {
    const status = filter === 'all' ? undefined : filter;
    loadTasks(status);
  }, [filter, loadTasks]);

  /**
   * Créer une nouvelle tâche
   */
  const createTask = async (taskData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await createTaskAPI(taskData);
      
      // Ajouter la nouvelle tâche à la liste
      setTasks((prevTasks) => [response.data.task, ...prevTasks]);
      
      // Recharger les stats
      await loadStats();
      
      return { success: true, task: response.data.task };
    } catch (err) {
      setError(err.message || 'Erreur lors de la création de la tâche');
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Mettre à jour une tâche
   */
  const updateTask = async (id, taskData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await updateTaskAPI(id, taskData);
      
      // Mettre à jour la tâche dans la liste
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? response.data.task : task
        )
      );
      
      await loadStats();
      
      return { success: true, task: response.data.task };
    } catch (err) {
      setError(err.message || 'Erreur lors de la mise à jour');
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Supprimer une tâche
   */
  const deleteTask = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteTaskAPI(id);
      
      // Retirer la tâche de la liste
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      
      await loadStats();
      
      return { success: true };
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression');
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Marquer une tâche comme terminée
   */
  const markAsDone = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await markTaskAsDoneAPI(id);
      
      // Mettre à jour la tâche dans la liste
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? response.data.task : task
        )
      );
      
      await loadStats();
      
      return { success: true, task: response.data.task };
    } catch (err) {
      setError(err.message || 'Erreur lors de la mise à jour du statut');
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Obtenir une tâche par ID
   */
  const getTaskById = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getTaskByIdAPI(id);
      return { success: true, task: response.data.task };
    } catch (err) {
      setError(err.message || 'Erreur lors de la récupération de la tâche');
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Rafraîchir les données
   */
  const refresh = async () => {
    const status = filter === 'all' ? undefined : filter;
    await loadTasks(status);
    await loadStats();
  };

  return {
    tasks,
    stats,
    isLoading,
    error,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    markAsDone,
    getTaskById,
    refresh,
  };
};

export default useTasks;