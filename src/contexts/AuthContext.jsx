// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getToken, saveToken, removeToken, getUser, saveUser, clearAll } from '../utils/storage';
import { loginAPI, registerAPI, getMeAPI } from '../api/authAPI';

/**
 * Contexte d'authentification
 * Stocke l'état global de l'utilisateur connecté
 */
const AuthContext = createContext({});

/**
 * Provider d'authentification
 * Wrap toute l'application pour fournir le contexte
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Vérifier si l'utilisateur est déjà connecté au démarrage
   */
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Vérifier l'authentification (au démarrage de l'app)
   */
  const checkAuth = async () => {
    try {
      const storedToken = await getToken();
      const storedUser = await getUser();

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
        setIsAuthenticated(true);

        // Optionnel : Vérifier que le token est toujours valide
        try {
          const response = await getMeAPI();
          setUser(response.data.user);
          await saveUser(response.data.user);
        } catch (error) {
          // Token expiré ou invalide
          console.log('Token expiré, déconnexion...');
          await logout();
        }
      }
    } catch (error) {
      console.error('Erreur checkAuth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Inscription
   */
  const register = async (name, email, password) => {
    try {
      const response = await registerAPI({ name, email, password });
      
      // Sauvegarder le token et l'utilisateur
      const { token: newToken, user: newUser } = response.data;
      
      await saveToken(newToken);
      await saveUser(newUser);
      
      setToken(newToken);
      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erreur lors de l\'inscription',
      };
    }
  };

  /**
   * Connexion
   */
  const login = async (email, password) => {
    try {
      const response = await loginAPI({ email, password });
      
      // Sauvegarder le token et l'utilisateur
      const { token: newToken, user: newUser } = response.data;
      
      await saveToken(newToken);
      await saveUser(newUser);
      
      setToken(newToken);
      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erreur lors de la connexion',
      };
    }
  };

  /**
   * Déconnexion
   */
  const logout = async () => {
    try {
      // Supprimer toutes les données locales
      await clearAll();
      
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      
      return { success: true };
    } catch (error) {
      console.error('Erreur logout:', error);
      return { success: false };
    }
  };

  /**
   * Mettre à jour le profil utilisateur
   */
  const updateUserProfile = async (updatedUser) => {
    try {
      await saveUser(updatedUser);
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  /**
   * Valeurs exposées par le contexte
   */
  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    register,
    login,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook personnalisé pour utiliser le contexte d'authentification
 * Usage: const { user, login, logout } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }
  
  return context;
};

export default AuthContext;