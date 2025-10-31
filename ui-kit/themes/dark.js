/**
 * Dark Theme
 *
 * Dark mode theme for Open Wallet UI Kit
 */

import tokens from './tokens';

const darkTheme = {
  name: 'dark',

  // Colors
  colors: {
    // Brand (adjusted for dark mode)
    primary: tokens.colors.primary[400],
    primaryHover: tokens.colors.primary[300],
    primaryActive: tokens.colors.primary[200],
    primaryLight: tokens.colors.primary[900],

    secondary: '#BB86FC', // Material Dark Purple
    secondaryHover: '#C89FFC',
    secondaryActive: '#D5B8FC',
    secondaryLight: tokens.colors.secondary[900],

    // Semantic (adjusted for dark mode)
    success: tokens.colors.success[400],
    successLight: tokens.colors.success[900],
    warning: tokens.colors.warning[400],
    warningLight: tokens.colors.warning[900],
    error: tokens.colors.error[400],
    errorLight: tokens.colors.error[900],
    info: tokens.colors.info[400],
    infoLight: tokens.colors.info[900],

    // Surface Colors (Dark)
    background: '#121212',
    backgroundSecondary: '#1E1E1E',
    surface: '#1E1E1E',
    surfaceHover: '#2C2C2C',
    surfaceActive: '#383838',

    // Text Colors (Light on dark)
    textPrimary: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textDisabled: '#666666',
    textInverse: '#000000',

    // Border Colors
    border: '#2C2C2C',
    borderHover: '#383838',
    borderFocus: '#BB86FC',

    // Card specific
    cardBackground: '#1E1E1E',
    cardBorder: '#2C2C2C',
    cardShadow: 'rgba(0, 0, 0, 0.3)',

    // Gradient presets (dark mode versions)
    gradient: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      card: 'linear-gradient(135deg, #2E3440 0%, #3B4252 100%)'
    }
  },

  // Typography
  typography: tokens.typography,

  // Spacing
  spacing: tokens.spacing,

  // Border Radius
  borderRadius: tokens.borderRadius,

  // Shadows (enhanced for dark mode)
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    sm: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.5)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.6)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)',
    card: '0 4px 20px rgba(0, 0, 0, 0.4)',
    cardHover: '0 8px 30px rgba(0, 0, 0, 0.5)'
  },

  // Transitions
  transitions: tokens.transitions,

  // Breakpoints
  breakpoints: tokens.breakpoints,

  // Z-Index
  zIndex: tokens.zIndex,

  // Opacity
  opacity: tokens.opacity,

  // Component Specific (Dark Mode)
  components: {
    // Wallet Card
    walletCard: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#FFFFFF',
      borderRadius: tokens.borderRadius['2xl'],
      padding: tokens.spacing[6],
      shadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
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
      borderColor: '#2C2C2C',
      focusBorderColor: '#BB86FC',
      background: '#1E1E1E'
    },

    // Transaction Item
    transaction: {
      padding: tokens.spacing[4],
      borderRadius: tokens.borderRadius.md,
      hoverBackground: '#2C2C2C'
    },

    // Modal
    modal: {
      background: '#1E1E1E',
      backdropColor: 'rgba(0, 0, 0, 0.8)',
      borderRadius: tokens.borderRadius.xl,
      shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)'
    }
  }
};

export default darkTheme;
