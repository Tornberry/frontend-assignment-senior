import styled from "@emotion/styled";
import React, { FC, ReactElement } from "react";
import { useTheme } from "../../context/theme-context";

// Define the type for the button
type TButton = {
  children: ReactElement | string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// Define the styled button
const StyledButton = styled.button<{ 
  $backgroundColor: string;
  $hoverColor: string;
  $textColor: string;
  $size: 'small' | 'medium' | 'large';
  disabled?: boolean;
}>`
  background-color: ${props => props.$backgroundColor};
  color: ${props => props.$textColor};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: transform 0.2s, background-color 0.2s;
  
  padding: ${props => {
    switch(props.$size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  
  font-size: ${props => {
    switch(props.$size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};

  &:hover:not(:disabled) {
    background-color: ${props => props.$hoverColor};
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const Button: FC<TButton> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button'
}) => {
  const { theme } = useTheme();

  // Determine colors based on variant
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
          hover: '#c82333',
          text: theme.foreground,
        };
      default:
        return {
          bg: theme.primary,
          hover: theme.primaryHover,
          text: theme.foreground,
        };
    }
  };

  const colors = getColors();

  return (
    <StyledButton
      type={type}
      onClick={onClick}
      $backgroundColor={colors.bg}
      $hoverColor={colors.hover}
      $textColor={colors.text}
      $size={size}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;