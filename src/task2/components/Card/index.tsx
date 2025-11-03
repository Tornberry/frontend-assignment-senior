import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";
import { useTheme } from "../../context/theme-context";

// Define the type for the card
type TCard = {
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
  variant?: 'elevated' | 'outlined' | 'flat';
  hoverable?: boolean;
  onClick?: () => void;
}

// Define the styled card
const StyledCard = styled.div<{
  $backgroundColor: string;
  $borderColor: string;
  $textColor: string;
  $shadow: string;
  $variant: 'elevated' | 'outlined' | 'flat';
  $hoverable: boolean;
}>`
  background-color: ${props => props.$backgroundColor};
  color: ${props => props.$textColor};
  border-radius: 12px;
  padding: 24px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: ${props => props.$hoverable ? 'pointer' : 'default'};
  
  ${props => {
    switch(props.$variant) {
      case 'elevated':
        return `
          box-shadow: ${props.$shadow};
          border: none;
        `;
      case 'outlined':
        return `
          border: 2px solid ${props.$borderColor};
          box-shadow: none;
        `;
      case 'flat':
        return `
          border: none;
          box-shadow: none;
        `;
    }
  }}

  ${props => props.$hoverable && `
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${props.$variant === 'elevated' ? '0 10px 15px rgba(0, 0, 0, 0.15)' : props.$shadow};
    }
  `}
`;

const CardTitle = styled.h3<{ $textColor: string }>`
  margin: 0 0 16px 0;
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.$textColor};
`;

const CardContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
`;

const CardFooter = styled.div<{ $borderColor: string }>`
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid ${props => props.$borderColor};
`;

const Card: FC<TCard> = ({ 
  children, 
  title,
  footer,
  variant = 'elevated',
  hoverable = false,
  onClick 
}) => {
  const { theme } = useTheme();

  return (
    <StyledCard
      $backgroundColor={theme.cardBackground}
      $borderColor={theme.border}
      $textColor={theme.textPrimary}
      $shadow={theme.shadowMd}
      $variant={variant}
      $hoverable={hoverable}
      onClick={onClick}
    >
      {title && <CardTitle $textColor={theme.textPrimary}>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter $borderColor={theme.border}>{footer}</CardFooter>}
    </StyledCard>
  );
};

export default Card;