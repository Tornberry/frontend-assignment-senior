// Create a lightTheme object
export const lightTheme = {
  // Colors
  background: '#ffffff',
  foreground: '#000000',
  
  // Text colors
  textPrimary: '#333333',
  textSecondary: '#666666',
  textMuted: '#999999',
  
  // Brand colors
  primary: '#0066cc',
  primaryHover: '#0052a3',
  secondary: '#6c757d',
  secondaryHover: '#5a6268',
  
  // Status colors
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  
  // UI elements
  border: '#e0e0e0',
  borderHover: '#cccccc',
  cardBackground: '#ffffff',
  inputBackground: '#ffffff',
  
  // Shadows
  shadowSm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  shadowMd: '0 4px 6px rgba(0, 0, 0, 0.1)',
  shadowLg: '0 10px 15px rgba(0, 0, 0, 0.1)',
};

// Create a darkTheme object
export const darkTheme = {
  // Colors
  background: '#1a1a1a',
  foreground: '#ffffff',
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#b3b3b3',
  textMuted: '#808080',
  
  // Brand colors
  primary: '#4d94ff',
  primaryHover: '#3d7edb',
  secondary: '#8c96a3',
  secondaryHover: '#7a8491',
  
  // Status colors
  success: '#34d058',
  danger: '#f85149',
  warning: '#ffb84d',
  info: '#58a6ff',
  
  // UI elements
  border: '#333333',
  borderHover: '#4d4d4d',
  cardBackground: '#2a2a2a',
  inputBackground: '#2a2a2a',
  
  // Shadows
  shadowSm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  shadowMd: '0 4px 6px rgba(0, 0, 0, 0.4)',
  shadowLg: '0 10px 15px rgba(0, 0, 0, 0.5)',
};

// Type for theme (useful for TypeScript)
export type Theme = typeof lightTheme;