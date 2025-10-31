/**
 * Light Theme
 *
 * Default light theme for Open Wallet UI Kit
 */

import tokens from './tokens';

const lightTheme = {
  name: 'light',

  // Colors
  colors: {
    // Brand
    primary: tokens.colors.primary[500],
    primaryHover: tokens.colors.primary[600],
    primaryActive: tokens.colors.primary[700],
    primaryLight: tokens.colors.primary[100],

    secondary: tokens.colors.secondary[500],
    secondaryHover: tokens.colors.secondary[600],
    secondaryActive: tokens.colors.secondary[700],
    secondaryLight: tokens.colors.secondary[100],

    // Semantic
    success: tokens.colors.success[500],
    successLight: tokens.colors.success[100],
    warning: tokens.colors.warning[500],
    warningLight: tokens.colors.warning[100],
    error: tokens.colors.error[500],
    errorLight: tokens.colors.error[100],
    info: tokens.colors.info[500],
    infoLight: tokens.colors.info[100],

    // Surface Colors
    background: tokens.colors.neutral[0],
    backgroundSecondary: tokens.colors.neutral[50],
    surface: tokens.colors.neutral[0],
    surfaceHover: tokens.colors.neutral[50],
    surfaceActive: tokens.colors.neutral[100],

    // Text Colors
    textPrimary: tokens.colors.neutral[900],
    textSecondary: tokens.colors.neutral[600],
    textDisabled: tokens.colors.neutral[400],
    textInverse: tokens.colors.neutral[0],

    // Border Colors
    border: tokens.colors.neutral[200],
    borderHover: tokens.colors.neutral[300],
    borderFocus: tokens.colors.primary[500],

    // Card specific
    cardBackground: tokens.colors.neutral[0],
    cardBorder: tokens.colors.neutral[200],
    cardShadow: 'rgba(0, 0, 0, 0.08)',

    // Gradient presets
    gradient: {
      primary: tokens.colors.gradients.primary,
      card: tokens.colors.gradients.premium
    }
  },

  // Typography
  typography: tokens.typography,

  // Spacing
  spacing: tokens.spacing,

  // Border Radius
  borderRadius: tokens.borderRadius,

  // Shadows
  shadows: tokens.shadows,

  // Transitions
  transitions: tokens.transitions,

  // Breakpoints
  breakpoints: tokens.breakpoints,

  // Z-Index
  zIndex: tokens.zIndex,

  // Opacity
  opacity: tokens.opacity,

  // Component Specific
  components: {
    // Wallet Card
    walletCard: {
      background: tokens.colors.gradients.primary,
      textColor: tokens.colors.neutral[0],
      borderRadius: tokens.borderRadius['2xl'],
      padding: tokens.spacing[6],
      shadow: tokens.shadows.card
    },

    // Button
    button: {
      borderRadius: tokens.borderRadius.button,
      padding: {
        small: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
        medium: `${tokens.spacing[3]} ${tokens.spacing[6]}`,
        large: `${tokens.spacing[4]} ${tokens.spacing[8]}`
      }
    },

    // Input
    input: {
      borderRadius: tokens.borderRadius.input,
      padding: tokens.spacing[3],
      borderColor: tokens.colors.neutral[300],
      focusBorderColor: tokens.colors.primary[500]
    },

    // Transaction Item
    transaction: {
      padding: tokens.spacing[4],
      borderRadius: tokens.borderRadius.md,
      hoverBackground: tokens.colors.neutral[50]
    },

    // Modal
    modal: {
      background: tokens.colors.neutral[0],
      backdropColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: tokens.borderRadius.xl,
      shadow: tokens.shadows['2xl']
    }
  }
};

export default lightTheme;
