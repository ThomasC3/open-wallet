/**
 * Design Tokens
 *
 * Core design system tokens for Open Wallet UI Kit
 * These tokens define the visual foundation of the wallet interface
 */

const tokens = {
  // Color Palette
  colors: {
    // Brand Colors
    primary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#007AFF', // Primary
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1'
    },

    secondary: {
      50: '#F3E5F5',
      100: '#E1BEE7',
      200: '#CE93D8',
      300: '#BA68C8',
      400: '#AB47BC',
      500: '#5856D6', // Secondary
      600: '#8E24AA',
      700: '#7B1FA2',
      800: '#6A1B9A',
      900: '#4A148C'
    },

    // Semantic Colors
    success: {
      50: '#E8F5E9',
      100: '#C8E6C9',
      200: '#A5D6A7',
      300: '#81C784',
      400: '#66BB6A',
      500: '#34C759', // Success
      600: '#43A047',
      700: '#388E3C',
      800: '#2E7D32',
      900: '#1B5E20'
    },

    warning: {
      50: '#FFF3E0',
      100: '#FFE0B2',
      200: '#FFCC80',
      300: '#FFB74D',
      400: '#FFA726',
      500: '#FF9500', // Warning
      600: '#FB8C00',
      700: '#F57C00',
      800: '#EF6C00',
      900: '#E65100'
    },

    error: {
      50: '#FFEBEE',
      100: '#FFCDD2',
      200: '#EF9A9A',
      300: '#E57373',
      400: '#EF5350',
      500: '#FF3B30', // Error
      600: '#E53935',
      700: '#D32F2F',
      800: '#C62828',
      900: '#B71C1C'
    },

    info: {
      50: '#E1F5FE',
      100: '#B3E5FC',
      200: '#81D4FA',
      300: '#4FC3F7',
      400: '#29B6F6',
      500: '#5AC8FA', // Info
      600: '#039BE5',
      700: '#0288D1',
      800: '#0277BD',
      900: '#01579B'
    },

    // Neutral Colors (Light Theme)
    neutral: {
      0: '#FFFFFF',
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      1000: '#000000'
    },

    // Gradients
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      sunset: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      ocean: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      forest: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      fire: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      premium: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
      midnight: 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
      gold: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)'
    }
  },

  // Typography
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
      secondary: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      monospace: '"SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", monospace',
      display: '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif'
    },

    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px'
    },

    fontWeight: {
      thin: 100,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },

    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    },

    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },

  // Spacing Scale
  spacing: {
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px'
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
    full: '9999px',
    // Card specific
    card: '16px',
    button: '8px',
    input: '8px'
  },

  // Shadows
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    // Card specific
    card: '0 4px 20px rgba(0, 0, 0, 0.08)',
    cardHover: '0 8px 30px rgba(0, 0, 0, 0.12)'
  },

  // Animation & Transitions
  transitions: {
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
      slower: '500ms'
    },

    timing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },

  // Breakpoints
  breakpoints: {
    mobile: '320px',
    mobileLg: '480px',
    tablet: '768px',
    desktop: '1024px',
    desktopLg: '1280px',
    wide: '1440px',
    ultraWide: '1920px'
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1600,
    tooltip: 1700
  },

  // Opacity Scale
  opacity: {
    0: '0',
    5: '0.05',
    10: '0.1',
    20: '0.2',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    80: '0.8',
    90: '0.9',
    95: '0.95',
    100: '1'
  }
};

export default tokens;
