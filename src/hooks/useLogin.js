// src/hooks/useLogin.js
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail } from '../utils/validators';

/**
 * Hook personnalisé pour gérer la connexion
 * Gère l'état du formulaire, la validation, et l'appel API
 */
const useLogin = () => {
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Valider le formulaire
   */
  const validate = () => {
    const newErrors = {};

    // Validation email
    if (!email.trim()) {
      newErrors.email = 'L\'email est obligatoire';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email invalide';
    }

    // Validation password
    if (!password) {
      newErrors.password = 'Le mot de passe est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Soumettre le formulaire de connexion
   */
  const handleLogin = async () => {
    // Valider le formulaire
    if (!validate()) {
      return { success: false, message: 'Veuillez corriger les erreurs' };
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await login(email.trim(), password);
      
      if (result.success) {
        // Réinitialiser le formulaire
        setEmail('');
        setPassword('');
      } else {
        setErrors({ general: result.message });
      }
      
      return result;
    } catch (error) {
      const errorMessage = 'Une erreur est survenue';
      setErrors({ general: errorMessage });
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Réinitialiser le formulaire
   */
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrors({});
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isLoading,
    handleLogin,
    resetForm,
  };
};

export default useLogin;