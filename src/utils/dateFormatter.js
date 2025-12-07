// src/utils/dateFormatter.js
import { format, formatDistanceToNow, isPast, isFuture, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Formater une date en format lisible
 * Ex: "15 décembre 2025"
 */
export const formatDate = (date) => {
  return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
};

/**
 * Formater une date avec l'heure
 * Ex: "15 déc. 2025 à 14:30"
 */
export const formatDateTime = (date) => {
  return format(new Date(date), 'dd MMM yyyy à HH:mm', { locale: fr });
};

/**
 * Formater une date en format court
 * Ex: "15/12/2025"
 */
export const formatDateShort = (date) => {
  return format(new Date(date), 'dd/MM/yyyy');
};

/**
 * Temps relatif depuis maintenant
 * Ex: "il y a 2 heures", "dans 3 jours"
 */
export const formatRelativeTime = (date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: fr,
  });
};

/**
 * Vérifier si une date est passée
 */
export const isDatePast = (date) => {
  return isPast(new Date(date));
};

/**
 * Vérifier si une date est future
 */
export const isDateFuture = (date) => {
  return isFuture(new Date(date));
};

/**
 * Obtenir le nombre de jours avant une date
 * Ex: "Dans 5 jours"
 */
export const getDaysUntil = (date) => {
  const days = differenceInDays(new Date(date), new Date());
  
  if (days < 0) {
    return `En retard de ${Math.abs(days)} jour${Math.abs(days) > 1 ? 's' : ''}`;
  }
  
  if (days === 0) {
    return "Aujourd'hui";
  }
  
  if (days === 1) {
    return "Demain";
  }
  
  return `Dans ${days} jours`;
};

/**
 * Obtenir la couleur selon l'urgence
 */
export const getUrgencyColor = (dueDate) => {
  const days = differenceInDays(new Date(dueDate), new Date());
  
  if (days < 0) return '#E74C3C'; // Rouge (en retard)
  if (days <= 1) return '#F39C12'; // Orange (urgent)
  if (days <= 3) return '#FFA726'; // Orange clair
  return '#66BB6A'; // Vert (OK)
};