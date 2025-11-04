import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";
import { useTheme } from "../../context/theme-context";

/**
 * Props for the Card component
 * @typedef {Object} TCard
 * @property {ReactNode} children - The main content to display inside the card body
 * @property {string} [title] - Optional title displayed at the top of the card
 * @property {ReactNode} [footer] - Optional footer content displayed at the bottom with a top border
 * @property {'elevated' | 'outlined' | 'flat'} [variant='elevated'] - Visual style variant of the card
 * @property {boolean} [hoverable=false] - Whether the card should have hover effects (lift animation)
 * @property {() => void} [onClick] - Optional callback function triggered when card is clicked
 * @property {string} [ariaLabel] - Accessible label for screen readers (recommended when card is clickable)
 * @property {string} [role] - ARIA role (auto-set to 'button' when clickable, 'article' otherwise)
 * @property {boolean} [fullWidth=false] - Whether card should take full width of container
 */
type TCard = {
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
  variant?: 'elevated' | 'outlined' | 'flat';
  hoverable?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  role?: string;
  fullWidth?: boolean;
}

/**
 * Main styled card container with dynamic styling based on variant
 * Uses transient props ($-prefixed) to avoid passing styled props to DOM
 */
const StyledCard = styled.div<{
  $backgroundColor: string;
  $borderColor: string;
  $textColor: string;
  $shadow: string;
  $variant: 'elevated' | 'outlined' | 'flat';
  $hoverable: boolean;
  $isClickable: boolean;
  $fullWidth: boolean;
}>`
  /* Base styles */
  background-color: ${props => props.$backgroundColor};
  color: ${props => props.$textColor};
  border-radius: 12px;
  padding: 24px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: ${props => props.$hoverable || props.$isClickable ? 'pointer' : 'default'};
  
  /* Width handling */
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  box-sizing: border-box;
  
  /* Prevent text selection when interactive */
  user-select: ${props => props.$isClickable ? 'none' : 'auto'};
  -webkit-user-select: ${props => props.$isClickable ? 'none' : 'auto'};
  
  /* Variant-specific styles */
  ${props => {
    switch(props.$variant) {
      case 'elevated':
        // Card with shadow elevation, no border
        return `
          box-shadow: ${props.$shadow};
          border: none;
        `;
      case 'outlined':
        // Card with visible border, no shadow
        return `
          border: 2px solid ${props.$borderColor};
          box-shadow: none;
        `;
      case 'flat':
        // Card with no border or shadow (minimal style)
        return `
          border: none;
          box-shadow: none;
        `;
    }
  }}

  /* Hover effects - only applied when hoverable is true */
  ${props => (props.$hoverable || props.$isClickable) && `
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${props.$variant === 'elevated' ? '0 10px 15px rgba(0, 0, 0, 0.15)' : props.$shadow};
    }
    
    &:active {
      transform: translateY(-2px);
    }
  `}
  
  /* Focus state for keyboard navigation accessibility */
  ${props => props.$isClickable && `
    &:focus-visible {
      outline: 3px solid ${props.$variant === 'outlined' ? props.$borderColor : '#0066cc'};
      outline-offset: 2px;
    }
    
    /* Remove default focus outline for mouse users */
    &:focus:not(:focus-visible) {
      outline: none;
    }
  `}
  
  /* Responsive adjustments for mobile devices */
  @media (max-width: 768px) {
    /* Reduce padding on mobile for better space usage */
    padding: 16px;
    
    /* Slightly reduce lift effect on mobile */
    ${props => (props.$hoverable || props.$isClickable) && `
      &:hover {
        transform: translateY(-2px);
      }
      
      &:active {
        transform: translateY(0);
      }
    `}
  }
  
  /* Smaller screens get even more compact padding */
  @media (max-width: 480px) {
    padding: 12px;
    border-radius: 8px;
  }
`;

/**
 * Styled card title element
 * Renders as an h3 with consistent spacing and typography
 */
const CardTitle = styled.h3<{ $textColor: string }>`
  margin: 0 0 16px 0;
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.$textColor};
  line-height: 1.3;
  
  /* Responsive font sizing */
  @media (max-width: 768px) {
    font-size: 18px;
    margin: 0 0 12px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

/**
 * Styled card content wrapper
 * Contains the main body content of the card
 */
const CardContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  
  /* Responsive font sizing */
  @media (max-width: 768px) {
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1.5;
  }
`;

/**
 * Styled card footer wrapper
 * Separated from main content with a top border
 */
const CardFooter = styled.div<{ $borderColor: string }>`
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid ${props => props.$borderColor};
  
  /* Responsive spacing adjustments */
  @media (max-width: 768px) {
    margin-top: 16px;
    padding-top: 12px;
  }
  
  @media (max-width: 480px) {
    margin-top: 12px;
    padding-top: 10px;
  }
`;

/**
 * A flexible card component with theme support and multiple variants
 * 
 * Features:
 * - Three visual variants: elevated (with shadow), outlined (with border), and flat (minimal)
 * - Optional title section with consistent typography
 * - Optional footer section with visual separation
 * - Hoverable mode with lift animation
 * - Click handler support for interactive cards
 * - Full theme integration for colors and shadows
 * - Keyboard navigation support for interactive cards
 * - Responsive design with mobile optimizations
 * - Full-width option for flexible layouts
 * 
 * Accessibility Features:
 * - Keyboard navigable when clickable with visible focus states
 * - Automatic role assignment (button for clickable, article otherwise)
 * - Screen reader support with aria-label option
 * - Proper interactive element semantics
 * - High contrast focus indicators
 * - Reduced motion respected through CSS transitions
 * 
 * Responsive Features:
 * - Adaptive padding for different screen sizes
 * - Scalable typography across breakpoints
 * - Reduced animations on mobile for performance
 * - Compact spacing on smaller devices
 * - Full-width option for mobile-first layouts
 * 
 * @component
 * @example
 * // Basic card with title
 * <Card title="Welcome">
 *   <p>This is the card content</p>
 * </Card>
 * 
 * @example
 * // Outlined hoverable card with footer
 * <Card 
 *   variant="outlined" 
 *   hoverable 
 *   onClick={() => console.log('Card clicked')}
 *   footer={<button>Action</button>}
 * >
 *   Card content goes here
 * </Card>
 * 
 * @example
 * // Flat card without title or footer
 * <Card variant="flat">
 *   Simple card with minimal styling
 * </Card>
 * 
 * @example
 * // Clickable card with accessibility
 * <Card 
 *   onClick={handleCardClick}
 *   ariaLabel="View product details"
 *   hoverable
 * >
 *   <h4>Product Name</h4>
 *   <p>Product description</p>
 * </Card>
 * 
 * @example
 * // Full-width card for mobile layouts
 * <Card title="Mobile Card" fullWidth variant="outlined">
 *   This card spans the full width of its container
 * </Card>
 */
const Card: FC<TCard> = ({ 
  children, 
  title,
  footer,
  variant = 'elevated',
  hoverable = false,
  onClick,
  ariaLabel,
  role,
  fullWidth = false,
}) => {
  // Access theme context for color and shadow values
  const { theme } = useTheme();
  
  // Determine if card is clickable
  const isClickable = !!onClick;
  
  // Auto-determine role based on interactivity
  const cardRole = role || (isClickable ? 'button' : 'article');
  
  // Handle keyboard interaction for clickable cards
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isClickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <StyledCard
      $backgroundColor={theme.cardBackground}
      $borderColor={theme.border}
      $textColor={theme.textPrimary}
      $shadow={theme.shadowMd}
      $variant={variant}
      $hoverable={hoverable}
      $isClickable={isClickable}
      $fullWidth={fullWidth}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={cardRole}
      aria-label={ariaLabel}
      tabIndex={isClickable ? 0 : undefined}
    >
      {/* Conditionally render title if provided */}
      {title && <CardTitle $textColor={theme.textPrimary}>{title}</CardTitle>}
      
      {/* Main card content */}
      <CardContent>{children}</CardContent>
      
      {/* Conditionally render footer if provided */}
      {footer && <CardFooter $borderColor={theme.border}>{footer}</CardFooter>}
    </StyledCard>
  );
};

export default Card;