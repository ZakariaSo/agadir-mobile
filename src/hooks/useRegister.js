// src/hooks/useRegister.js
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword, validateName } from '../utils/validators';

/**
 * Hook personnalisé pour gérer l'inscription
 */
const useRegister = () => {
  const { register } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Valider le formulaire
   */
  const validate = () => {
    const newErrors = {};

    // Validation nom
    const nameValidation = validateName(name);
    if (!nameValidation.valid) {
      newErrors.name = nameValidation.message;
    }

    // Validation email
    if (!email.trim()) {
      newErrors.email = 'L\'email est obligatoire';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email invalide';
    }

    // Validation password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.message;
    }

    // Validation confirmation mot de passe
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer le mot de passe';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Soumettre le formulaire d'inscription
   */
  const handleRegister = async () => {
    // Valider le formulaire
    if (!validate()) {
      return { success: false, message: 'Veuillez corriger les erreurs' };
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await register(name.trim(), email.trim(), password);
      
      if (result.success) {
        // Réinitialiser le formulaire
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
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
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    isLoading,
    handleRegister,
    resetForm,
  };
};

export default useRegister;