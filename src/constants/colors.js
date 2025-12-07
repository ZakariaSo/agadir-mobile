// src/constants/colors.js

/**
 * Palette de couleurs inspirée d'Agadir
 * Bleu océan + Sable doré
 */
export const COLORS = {
  // Couleurs principales
  primary: '#1E88E5',        // Bleu océan Agadir
  primaryLight: '#64B5F6',   // Bleu clair
  primaryDark: '#1565C0',    // Bleu foncé
  
  secondary: '#F4A261',      // Sable doré
  secondaryLight: '#F6B17A',
  secondaryDark: '#E76F51',
  
  // Statuts
  success: '#2ECC71',        // Vert (tâche terminée)
  danger: '#E74C3C',         // Rouge (supprimer)
  warning: '#F39C12',        // Orange (alerte)
  info: '#3498DB',           // Bleu info
  
  // Neutres
  white: '#FFFFFF',
  black: '#2C3E50',
  gray: '#95A5A6',
  grayLight: '#ECF0F1',
  grayDark: '#7F8C8D',
  
  // Backgrounds
  background: '#F8F9FA',
  backgroundDark: '#ECEFF1',
  
  // Text
  textPrimary: '#2C3E50',
  textSecondary: '#7F8C8D',
  textLight: '#BDC3C7',
  
  // Borders
  border: '#E1E8ED',
  borderDark: '#CFD8DC',
  
  // Status tâches
  statusPending: '#FFA726',  // Orange pour "en attente"
  statusDone: '#66BB6A',     // Vert pour "terminée"
};

/**
 * Ombres pour les cards
 */
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

/**
 * Tailles de police
 */
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

/**
 * Espacements
 */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

/**
 * Border radius
 */
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999, // Complètement arrondi
};