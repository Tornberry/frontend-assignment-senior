import styled from "@emotion/styled";
import React, { FC, InputHTMLAttributes } from "react";
import { useTheme } from "../../context/theme-context";

// Define the type for the input
type TInput = {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

// Wrapper for the entire input component
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

// Label styling
const Label = styled.label<{ $textColor: string; $required: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$textColor};

  ${props => props.$required && `
    &::after {
      content: ' *';
      color: #dc3545;
    }
  `}
`;

// Input field styling
const StyledInput = styled.input<{
  $backgroundColor: string;
  $borderColor: string;
  $textColor: string;
  $hasError: boolean;
}>`
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid ${props => props.$hasError ? '#dc3545' : props.$borderColor};
  border-radius: 8px;
  background-color: ${props => props.$backgroundColor};
  color: ${props => props.$textColor};
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  font-family: inherit;

  &::placeholder {
    color: ${props => props.$textColor}80; // 50% opacity
  }

  &:focus {
    border-color: ${props => props.$hasError ? '#dc3545' : '#0066cc'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(0, 102, 204, 0.1)'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${props => props.$backgroundColor}50;
  }
`;

// Error message styling
const ErrorMessage = styled.span`
  font-size: 14px;
  color: #dc3545;
  font-weight: 500;
`;

// Helper text styling
const HelperText = styled.span<{ $textColor: string }>`
  font-size: 14px;
  color: ${props => props.$textColor}cc; // 80% opacity
`;

const Input: FC<TInput> = ({ 
  label,
  error,
  helperText,
  required = false,
  id,
  ...inputProps
}) => {
  const { theme } = useTheme();
  const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <InputWrapper>
      {label && (
        <Label 
          htmlFor={inputId}
          $textColor={theme.textPrimary}
          $required={required}
        >
          {label}
        </Label>
      )}
      
      <StyledInput
        id={inputId}
        $backgroundColor={theme.inputBackground}
        $borderColor={theme.border}
        $textColor={theme.textPrimary}
        $hasError={!!error}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        required={required}
        {...inputProps}
      />
      
      {error && (
        <ErrorMessage id={`${inputId}-error`} role="alert">
          {error}
        </ErrorMessage>
      )}
      
      {!error && helperText && (
        <HelperText $textColor={theme.textSecondary}>
          {helperText}
        </HelperText>
      )}
    </InputWrapper>
  );
};

export default Input;