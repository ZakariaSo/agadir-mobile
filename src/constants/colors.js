// src/constants/colors.js

/**
 * Palette de couleurs orange moderne
 * Inspirée du style "Sunset / Orange Pro"
 */

export const COLORS = {
  // Couleurs principales (ORANGE)
  primary: '#F57C00',           // Orange principal
  primaryLight: '#FF9800',      // Orange clair
  primaryDark: '#E65100',       // Orange foncé

  // Couleur secondaire (plus neutre pour accompagner l’orange)
  secondary: '#FFA726',         // Orange doux (accent)
  secondaryLight: '#FFB74D',
  secondaryDark: '#FB8C00',

  // Statuts
  success: '#2ECC71',           // Vert
  danger: '#E74C3C',            // Rouge
  warning: '#FB8C00',           // Orange alerte
  info: '#4FC3F7',              // Bleu clair

  // Neutres
  white: '#FFFFFF',
  black: '#1A1A1A',
  gray: '#9E9E9E',
  grayLight: '#E0E0E0',
  grayDark: '#616161',

  // Backgrounds
  background: '#FAFAFA',
  backgroundDark: '#F5F5F5',

  // Text
  textPrimary: '#212121',
  textSecondary: '#757575',
  textLight: '#BDBDBD',

  // Bordures
  border: '#E0E0E0',
  borderDark: '#BDBDBD',

  // Status tâches
  statusPending: '#FFB74D',     // Orange doux
  statusDone: '#66BB6A',        // Vert
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
    elevation: 2,
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
  round: 999,
};
