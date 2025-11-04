import styled from "@emotion/styled";
import React, { FC, InputHTMLAttributes, useState } from "react";
import { useTheme } from "../../context/theme-context";

/**
 * Props for the Input component
 * Extends native HTML input attributes for full compatibility
 * @typedef {Object} TInput
 * @property {string} [label] - Optional label text displayed above the input field
 * @property {string} [error] - Error message to display below input (takes precedence over helperText)
 * @property {string} [helperText] - Helper text displayed below input when no error is present
 * @property {boolean} [required=false] - Whether the input is required (adds asterisk to label)
 * @property {ReactNode} [leftIcon] - Optional icon to display on the left side of input
 * @property {ReactNode} [rightIcon] - Optional icon to display on the right side of input
 * @property {boolean} [fullWidth=false] - Whether input should take full width of container
 * @extends {InputHTMLAttributes<HTMLInputElement>} Inherits all standard HTML input attributes
 */
type TInput = {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * Container wrapper for the entire input component
 * Provides consistent spacing between label, input, and helper/error text
 */
const InputWrapper = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  min-width: 200px;
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    min-width: 0;
    width: 100%;
  }
`;

/**
 * Styled label element with required indicator support
 * Automatically adds red asterisk when required prop is true
 */
const Label = styled.label<{ $textColor: string; $required: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$textColor};
  line-height: 1.4;

  /* Add red asterisk for required fields */
  ${props => props.$required && `
    &::after {
      content: ' *';
      color: #dc3545;
    }
  `}
  
  /* Responsive font sizing */
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

/**
 * Container for input and icons
 * Provides proper layout for icon positioning
 */
const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

/**
 * Icon wrapper for left icon
 */
const LeftIconWrapper = styled.span<{ $textColor: string }>`
  position: absolute;
  left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$textColor}99; // 60% opacity
  pointer-events: none;
  
  /* Adjust for mobile */
  @media (max-width: 480px) {
    left: 10px;
  }
`;

/**
 * Icon wrapper for right icon
 */
const RightIconWrapper = styled.span<{ $textColor: string }>`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$textColor}99; // 60% opacity
  pointer-events: none;
  
  /* Adjust for mobile */
  @media (max-width: 480px) {
    right: 10px;
  }
`;

/**
 * Main styled input element with comprehensive state management
 * Handles normal, focus, error, and disabled states
 * Uses transient props ($-prefixed) to avoid passing styled props to DOM
 */
const StyledInput = styled.input<{
  $backgroundColor: string;
  $borderColor: string;
  $textColor: string;
  $hasError: boolean;
  $hasLeftIcon: boolean;
  $hasRightIcon: boolean;
}>`
  /* Base styles */
  padding: 12px 16px;
  font-size: 16px; /* 16px minimum prevents iOS zoom on focus */
  border: 2px solid ${props => props.$hasError ? '#dc3545' : props.$borderColor};
  border-radius: 8px;
  background-color: ${props => props.$backgroundColor};
  color: ${props => props.$textColor};
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
  
  /* Minimum height for better touch targets */
  min-height: 44px;
  
  /* Icon padding adjustments */
  padding-left: ${props => props.$hasLeftIcon ? '44px' : '16px'};
  padding-right: ${props => props.$hasRightIcon ? '44px' : '16px'};

  /* Placeholder styling with 50% opacity */
  &::placeholder {
    color: ${props => props.$textColor}80;
  }

  /* Focus state with accent color and glow effect */
  &:focus {
    border-color: ${props => props.$hasError ? '#dc3545' : '#0066cc'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(0, 102, 204, 0.1)'};
  }
  
  /* Focus-visible for keyboard navigation */
  &:focus-visible {
    border-color: ${props => props.$hasError ? '#dc3545' : '#0066cc'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(220, 53, 69, 0.15)' : 'rgba(0, 102, 204, 0.15)'};
  }

  /* Disabled state with reduced opacity and not-allowed cursor */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${props => props.$backgroundColor}50;
  }
  
  /* Remove spinner for number inputs on WebKit browsers */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  /* Remove spinner for number inputs on Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
  
  /* Responsive adjustments for mobile */
  @media (max-width: 768px) {
    padding: 10px 14px;
    padding-left: ${props => props.$hasLeftIcon ? '40px' : '14px'};
    padding-right: ${props => props.$hasRightIcon ? '40px' : '14px'};
  }
  
  @media (max-width: 480px) {
    font-size: 16px; /* Keep at 16px to prevent zoom */
    padding: 10px 12px;
    padding-left: ${props => props.$hasLeftIcon ? '38px' : '12px'};
    padding-right: ${props => props.$hasRightIcon ? '38px' : '12px'};
    border-radius: 6px;
  }
`;

/**
 * Styled error message text
 * Displayed in red below input when error prop is provided
 */
const ErrorMessage = styled.span`
  font-size: 14px;
  color: #dc3545;
  font-weight: 500;
  line-height: 1.4;
  
  /* Responsive font sizing */
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

/**
 * Styled helper text
 * Displayed below input when no error is present
 * Uses 80% opacity for subtle appearance
 */
const HelperText = styled.span<{ $textColor: string }>`
  font-size: 14px;
  color: ${props => props.$textColor}cc; // 80% opacity
  line-height: 1.4;
  
  /* Responsive font sizing */
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

/**
 * A fully-featured input component with label, error handling, and helper text
 * 
 * Features:
 * - Optional label with automatic required indicator (red asterisk)
 * - Error state with visual feedback and accessibility support
 * - Helper text for providing additional context
 * - Full keyboard and screen reader accessibility
 * - Automatic ID generation for label association
 * - Focus states with colored borders and glow effects
 * - Disabled state styling
 * - Theme integration for consistent colors
 * - Supports all native HTML input attributes (type, placeholder, etc.)
 * - Optional left and right icons
 * - Full-width option for flexible layouts
 * - Mobile-optimized with proper touch targets
 * 
 * Accessibility:
 * - Proper label-input association via htmlFor/id
 * - ARIA attributes (aria-invalid, aria-describedby) for error states
 * - Error messages have role="alert" for screen readers
 * - Required fields indicated both visually and semantically
 * - Minimum 44px height for touch targets (iOS/Android guidelines)
 * - Focus-visible styles for keyboard navigation
 * - 16px font size prevents iOS zoom on focus
 * 
 * Responsive Features:
 * - Adaptive padding and font sizes across breakpoints
 * - Mobile-first full-width on small screens
 * - Touch-optimized sizing (44px minimum height)
 * - iOS zoom prevention (16px font minimum)
 * - Icon positioning adjusts for mobile
 * - Number input spinner removal for cleaner mobile UX
 * 
 * @component
 * @example
 * // Basic input with label
 * <Input 
 *   label="Email" 
 *   type="email" 
 *   placeholder="Enter your email"
 * />
 * 
 * @example
 * // Required input with error
 * <Input 
 *   label="Password" 
 *   type="password" 
 *   required
 *   error="Password must be at least 8 characters"
 * />
 * 
 * @example
 * // Input with helper text
 * <Input 
 *   label="Username" 
 *   helperText="Must be 3-20 characters, letters and numbers only"
 *   value={username}
 *   onChange={(e) => setUsername(e.target.value)}
 * />
 * 
 * @example
 * // Disabled input
 * <Input 
 *   label="Account Type" 
 *   value="Premium" 
 *   disabled
 * />
 * 
 * @example
 * // Input with icons
 * <Input 
 *   label="Search"
 *   leftIcon={<SearchIcon />}
 *   rightIcon={<ClearIcon />}
 *   placeholder="Search..."
 * />
 * 
 * @example
 * // Full-width input for forms
 * <Input 
 *   label="Full Name"
 *   fullWidth
 *   required
 * />
 */
const Input: FC<TInput> = ({ 
  label,
  error,
  helperText,
  required = false,
  id,
  leftIcon,
  rightIcon,
  fullWidth = false,
  ...inputProps
}) => {
  // Access theme context for color values
  const { theme } = useTheme();
  
  // Generate unique ID for accessibility if not provided
  // Uses label text to create readable ID (e.g., "input-email-address")
  const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <InputWrapper $fullWidth={fullWidth}>
      {/* Conditionally render label if provided */}
      {label && (
        <Label 
          htmlFor={inputId}
          $textColor={theme.textPrimary}
          $required={required}
        >
          {label}
        </Label>
      )}
      
      {/* Input container with icon support */}
      <InputContainer>
        {/* Left icon */}
        {leftIcon && (
          <LeftIconWrapper $textColor={theme.textPrimary}>
            {leftIcon}
          </LeftIconWrapper>
        )}
        
        {/* Main input element with error state handling */}
        <StyledInput
          id={inputId}
          $backgroundColor={theme.inputBackground}
          $borderColor={theme.border}
          $textColor={theme.textPrimary}
          $hasError={!!error}
          $hasLeftIcon={!!leftIcon}
          $hasRightIcon={!!rightIcon}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          required={required}
          {...inputProps}
        />
        
        {/* Right icon */}
        {rightIcon && (
          <RightIconWrapper $textColor={theme.textPrimary}>
            {rightIcon}
          </RightIconWrapper>
        )}
      </InputContainer>
      
      {/* Error message - displayed when error prop is provided */}
      {error && (
        <ErrorMessage id={`${inputId}-error`} role="alert">
          {error}
        </ErrorMessage>
      )}
      
      {/* Helper text - only shown when no error is present */}
      {!error && helperText && (
        <HelperText id={`${inputId}-helper`} $textColor={theme.textSecondary}>
          {helperText}
        </HelperText>
      )}
    </InputWrapper>
  );
};

export default Input;