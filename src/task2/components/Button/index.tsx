import styled from "@emotion/styled";
import React, { FC, ReactElement } from "react";
import { useTheme } from "../../context/theme-context";

/**
 * Props for the Button component
 * @typedef {Object} TButton
 * @property {ReactElement | string} children - The content to display inside the button
 * @property {() => void} [onClick] - Optional callback function triggered when button is clicked
 * @property {'primary' | 'secondary' | 'danger'} [variant='primary'] - Visual style variant of the button
 * @property {'small' | 'medium' | 'large'} [size='medium'] - Size of the button affecting padding and font size
 * @property {boolean} [disabled=false] - Whether the button is disabled
 * @property {'button' | 'submit' | 'reset'} [type='button'] - HTML button type attribute
 * @property {string} [ariaLabel] - Accessible label for screen readers (use when button only contains icons)
 * @property {boolean} [fullWidth=false] - Whether button should take full width of container
 * @property {boolean} [loading=false] - Whether button is in loading state
 */
type TButton = {
  children: ReactElement | string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  fullWidth?: boolean;
  loading?: boolean;
}

/**
 * Styled button component with theme integration
 * Uses transient props ($-prefixed) to avoid passing styled props to DOM
 */
const StyledButton = styled.button<{ 
  $backgroundColor: string;
  $hoverColor: string;
  $textColor: string;
  $size: 'small' | 'medium' | 'large';
  $fullWidth: boolean;
  disabled?: boolean;
}>`
  /* Base styles */
  background-color: ${props => props.$backgroundColor};
  color: ${props => props.$textColor};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: transform 0.2s, background-color 0.2s;
  
  /* Width handling */
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  /* Prevent text selection for better UX */
  user-select: none;
  -webkit-user-select: none;
  
  /* Ensure consistent line height */
  line-height: 1.5;
  
  /* Dynamic padding based on size - responsive on mobile */
  padding: ${props => {
    switch(props.$size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  
  /* Dynamic font size based on size - responsive on mobile */
  font-size: ${props => {
    switch(props.$size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};

  /* Hover state - only applies when not disabled */
  &:hover:not(:disabled) {
    background-color: ${props => props.$hoverColor};
    transform: translateY(-2px);
  }

  /* Active state - removes lift effect on click */
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  /* Focus state for keyboard navigation accessibility */
  &:focus-visible {
    outline: 3px solid ${props => props.$hoverColor};
    outline-offset: 2px;
  }
  
  /* Remove default focus outline for mouse users */
  &:focus:not(:focus-visible) {
    outline: none;
  }

  /* Responsive adjustments for mobile devices */
  @media (max-width: 768px) {
    /* Slightly larger tap targets on mobile for better touch accuracy */
    min-height: 44px; /* iOS recommended minimum touch target */
    
    /* Adjust padding for better mobile experience */
    padding: ${props => {
      switch(props.$size) {
        case 'small': return '10px 18px';
        case 'large': return '14px 28px';
        default: return '12px 24px';
      }
    }};
  }
  
  /* Responsive font sizes for smaller screens */
  @media (max-width: 480px) {
    font-size: ${props => {
      switch(props.$size) {
        case 'small': return '13px';
        case 'large': return '16px';
        default: return '15px';
      }
    }};
  }
`;

/**
 * Loading spinner component for button loading state
 */
const LoadingSpinner = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

/**
 * A customizable button component with theme support and multiple variants
 * 
 * Features:
 * - Three visual variants: primary, secondary, and danger
 * - Three size options: small, medium, and large
 * - Automatic theme integration for colors
 * - Hover and active state animations
 * - Disabled state with reduced opacity and cursor change
 * - Support for HTML button types (button, submit, reset)
 * - Full keyboard navigation support with visible focus indicators
 * - Loading state with spinner
 * - Optional full-width mode
 * - Responsive design with mobile optimizations
 * 
 * Accessibility Features:
 * - Keyboard navigable with visible focus states
 * - Screen reader support with aria-label option
 * - Proper disabled state that prevents interaction
 * - Loading state announced to screen readers
 * - Minimum 44px touch target on mobile (iOS guidelines)
 * - High contrast focus indicators
 * 
 * Responsive Features:
 * - Adaptive font sizes for different screen sizes
 * - Optimized touch targets for mobile devices
 * - Full-width option for mobile layouts
 * - Flexible padding adjustments
 * 
 * @component
 * @example
 * // Primary button with default settings
 * <Button onClick={() => console.log('clicked')}>
 *   Click Me
 * </Button>
 * 
 * @example
 * // Large danger button
 * <Button variant="danger" size="large" onClick={handleDelete}>
 *   Delete
 * </Button>
 * 
 * @example
 * // Disabled submit button
 * <Button type="submit" disabled={!isFormValid}>
 *   Submit Form
 * </Button>
 * 
 * @example
 * // Loading button
 * <Button loading={isSubmitting} disabled={isSubmitting}>
 *   Save Changes
 * </Button>
 * 
 * @example
 * // Icon-only button with aria-label for accessibility
 * <Button ariaLabel="Close dialog" size="small">
 *   <CloseIcon />
 * </Button>
 * 
 * @example
 * // Full-width button for mobile layouts
 * <Button fullWidth variant="primary">
 *   Continue
 * </Button>
 */
const Button: FC<TButton> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  ariaLabel,
  fullWidth = false,
  loading = false,
}) => {
  // Access theme context for color values
  const { theme } = useTheme();

  /**
   * Determines the color scheme based on the button variant
   * @returns {Object} Object containing background, hover, and text colors
   */
  const getColors = () => {
    switch(variant) {
      case 'secondary':
        return {
          bg: theme.secondary,
          hover: theme.secondaryHover,
          text: theme.foreground,
        };
      case 'danger':
        return {
          bg: theme.danger,
          hover: '#c82333', // Hardcoded darker red for danger hover state
          text: theme.foreground,
        };
      default: // 'primary' variant
        return {
          bg: theme.primary,
          hover: theme.primaryHover,
          text: theme.foreground,
        };
    }
  };

  const colors = getColors();
  
  // Combine disabled and loading states
  const isDisabled = disabled || loading;

  return (
    <StyledButton
      type={type}
      onClick={onClick}
      $backgroundColor={colors.bg}
      $hoverColor={colors.hover}
      $textColor={colors.text}
      $size={size}
      $fullWidth={fullWidth}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading}
      aria-disabled={isDisabled}
    >
      {loading && <LoadingSpinner aria-hidden="true" />}
      {children}
    </StyledButton>
  );
};

export default Button;