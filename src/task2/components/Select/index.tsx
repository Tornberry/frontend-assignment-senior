import styled from "@emotion/styled";
import React, { FC, SelectHTMLAttributes } from "react";
import { useTheme } from "../../context/theme-context";

/**
 * Props for the Select component
 * Extends native HTML select attributes for full compatibility
 * @typedef {Object} TSelect
 * @property {string} [label] - Optional label text displayed above the select field
 * @property {string} [error] - Error message to display below select (takes precedence over helperText)
 * @property {string} [helperText] - Helper text displayed below select when no error is present
 * @property {boolean} [required=false] - Whether the select is required (adds asterisk to label)
 * @property {boolean} [fullWidth=false] - Whether select should take full width of container
 * @property {ReactNode} [icon] - Optional custom dropdown icon
 * @extends {SelectHTMLAttributes<HTMLSelectElement>} Inherits all standard HTML select attributes
 */
type TSelect = {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>;

/**
 * Container wrapper for the entire select component
 * Provides consistent spacing between label, select, and helper/error text
 */
const SelectWrapper = styled.div<{ $fullWidth: boolean }>`
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
 * Container for select and custom dropdown icon
 * Provides proper layout for icon positioning
 */
const SelectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

/**
 * Custom dropdown icon wrapper
 */
const DropdownIcon = styled.span<{ $textColor: string }>`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$textColor}99; // 60% opacity
  pointer-events: none;
  
  /* Default chevron icon if no custom icon provided */
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid currentColor;
  }
  
  /* Adjust for mobile */
  @media (max-width: 480px) {
    right: 10px;
  }
`;

/**
 * Main styled select element with comprehensive state management
 * Handles normal, focus, error, and disabled states
 * Uses transient props ($-prefixed) to avoid passing styled props to DOM
 */
const StyledSelect = styled.select<{
  $backgroundColor: string;
  $borderColor: string;
  $textColor: string;
  $hasError: boolean;
  $hasCustomIcon: boolean;
}>`
  /* Base styles */
  padding: 12px 16px;
  padding-right: ${props => props.$hasCustomIcon ? '44px' : '40px'}; /* Space for dropdown icon */
  font-size: 16px; /* 16px minimum prevents iOS zoom on focus */
  border: 2px solid ${props => props.$hasError ? '#dc3545' : props.$borderColor};
  border-radius: 8px;
  background-color: ${props => props.$backgroundColor};
  color: ${props => props.$textColor};
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  font-family: inherit;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  
  /* Minimum height for better touch targets */
  min-height: 44px;
  
  /* Remove default dropdown arrow */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  
  /* Custom background for dropdown icon positioning */
  background-image: none;

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
  
  /* Style for option elements */
  option {
    padding: 8px;
    background-color: ${props => props.$backgroundColor};
    color: ${props => props.$textColor};
  }
  
  /* Responsive adjustments for mobile */
  @media (max-width: 768px) {
    padding: 10px 14px;
    padding-right: ${props => props.$hasCustomIcon ? '40px' : '36px'};
  }
  
  @media (max-width: 480px) {
    font-size: 16px; /* Keep at 16px to prevent zoom */
    padding: 10px 12px;
    padding-right: ${props => props.$hasCustomIcon ? '38px' : '34px'};
    border-radius: 6px;
  }
`;

/**
 * Styled error message text
 * Displayed in red below select when error prop is provided
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
 * Displayed below select when no error is present
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
 * A fully-featured select (dropdown) component with label, error handling, and helper text
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
 * - Supports all native HTML select attributes (multiple, size, etc.)
 * - Custom dropdown icon support
 * - Full-width option for flexible layouts
 * - Mobile-optimized with proper touch targets
 * 
 * Accessibility:
 * - Proper label-select association via htmlFor/id
 * - ARIA attributes (aria-invalid, aria-describedby) for error states
 * - Error messages have role="alert" for screen readers
 * - Required fields indicated both visually and semantically
 * - Native keyboard navigation (arrow keys, enter, escape, space)
 * - Minimum 44px height for touch targets (iOS/Android guidelines)
 * - Focus-visible styles for keyboard navigation
 * - 16px font size prevents iOS zoom on focus
 * 
 * Responsive Features:
 * - Adaptive padding and font sizes across breakpoints
 * - Mobile-first full-width on small screens
 * - Touch-optimized sizing (44px minimum height)
 * - iOS zoom prevention (16px font minimum)
 * - Custom dropdown arrow styling
 * - Dropdown icon positioning adjusts for mobile
 * 
 * @component
 * @example
 * // Basic select with options
 * <Select label="Country">
 *   <option value="">Select a country</option>
 *   <option value="us">United States</option>
 *   <option value="ca">Canada</option>
 *   <option value="uk">United Kingdom</option>
 * </Select>
 * 
 * @example
 * // Required select with error
 * <Select 
 *   label="Payment Method" 
 *   required
 *   error="Please select a payment method"
 * >
 *   <option value="">Choose...</option>
 *   <option value="credit">Credit Card</option>
 *   <option value="debit">Debit Card</option>
 *   <option value="paypal">PayPal</option>
 * </Select>
 * 
 * @example
 * // Select with helper text and controlled state
 * <Select 
 *   label="Size" 
 *   helperText="Choose the size that best fits you"
 *   value={size}
 *   onChange={(e) => setSize(e.target.value)}
 * >
 *   <option value="s">Small</option>
 *   <option value="m">Medium</option>
 *   <option value="l">Large</option>
 *   <option value="xl">Extra Large</option>
 * </Select>
 * 
 * @example
 * // Disabled select
 * <Select 
 *   label="Subscription Plan" 
 *   value="premium" 
 *   disabled
 * >
 *   <option value="free">Free</option>
 *   <option value="premium">Premium</option>
 *   <option value="enterprise">Enterprise</option>
 * </Select>
 * 
 * @example
 * // Full-width select with custom icon
 * <Select 
 *   label="Category"
 *   fullWidth
 *   icon={<ChevronDownIcon />}
 * >
 *   <option value="">Select category</option>
 *   <option value="tech">Technology</option>
 *   <option value="business">Business</option>
 * </Select>
 */
const Select: FC<TSelect> = ({
  label,
  error,
  helperText,
  required = false,
  id,
  children,
  fullWidth = false,
  icon,
  ...selectProps
}) => {
  // Access theme context for color values
  const { theme } = useTheme();
  
  // Generate unique ID for accessibility if not provided
  // Uses label text to create readable ID (e.g., "select-payment-method")
  const selectId = id || `select-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <SelectWrapper $fullWidth={fullWidth}>
      {/* Conditionally render label if provided */}
      {label && (
        <Label
          htmlFor={selectId}
          $textColor={theme.textPrimary}
          $required={required}
        >
          {label}
        </Label>
      )}

      {/* Select container with custom icon support */}
      <SelectContainer>
        {/* Main select element with error state handling */}
        <StyledSelect
          id={selectId}
          $backgroundColor={theme.inputBackground}
          $borderColor={theme.border}
          $textColor={theme.textPrimary}
          $hasError={!!error}
          $hasCustomIcon={!!icon}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          required={required}
          {...selectProps}
        >
          {children}
        </StyledSelect>
        
        {/* Custom dropdown icon or default chevron */}
        <DropdownIcon $textColor={theme.textPrimary}>
          {icon}
        </DropdownIcon>
      </SelectContainer>

      {/* Error message - displayed when error prop is provided */}
      {error && (
        <ErrorMessage id={`${selectId}-error`} role="alert">
          {error}
        </ErrorMessage>
      )}

      {/* Helper text - only shown when no error is present */}
      {!error && helperText && (
        <HelperText id={`${selectId}-helper`} $textColor={theme.textSecondary}>
          {helperText}
        </HelperText>
      )}
    </SelectWrapper>
  );
};

export default Select;