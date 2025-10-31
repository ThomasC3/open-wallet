/**
 * Button Component
 *
 * Customizable button with multiple variants and sizes
 */

import React from 'react';
import styled, { css } from 'styled-components';

const getVariantStyles = (variant, theme) => {
  const variants = {
    primary: css`
      background: ${theme.colors.primary};
      color: ${theme.colors.textInverse};
      border: none;

      &:hover:not(:disabled) {
        background: ${theme.colors.primaryHover};
      }

      &:active:not(:disabled) {
        background: ${theme.colors.primaryActive};
      }
    `,

    secondary: css`
      background: ${theme.colors.secondary};
      color: ${theme.colors.textInverse};
      border: none;

      &:hover:not(:disabled) {
        background: ${theme.colors.secondaryHover};
      }

      &:active:not(:disabled) {
        background: ${theme.colors.secondaryActive};
      }
    `,

    outline: css`
      background: transparent;
      color: ${theme.colors.primary};
      border: 2px solid ${theme.colors.primary};

      &:hover:not(:disabled) {
        background: ${theme.colors.primaryLight};
      }

      &:active:not(:disabled) {
        background: ${theme.colors.primaryLight};
        opacity: 0.8;
      }
    `,

    ghost: css`
      background: transparent;
      color: ${theme.colors.primary};
      border: none;

      &:hover:not(:disabled) {
        background: ${theme.colors.surfaceHover};
      }

      &:active:not(:disabled) {
        background: ${theme.colors.surfaceActive};
      }
    `,

    danger: css`
      background: ${theme.colors.error};
      color: ${theme.colors.textInverse};
      border: none;

      &:hover:not(:disabled) {
        background: ${theme.colors.error};
        opacity: 0.9;
      }

      &:active:not(:disabled) {
        opacity: 0.8;
      }
    `,

    success: css`
      background: ${theme.colors.success};
      color: ${theme.colors.textInverse};
      border: none;

      &:hover:not(:disabled) {
        background: ${theme.colors.success};
        opacity: 0.9;
      }

      &:active:not(:disabled) {
        opacity: 0.8;
      }
    `
  };

  return variants[variant] || variants.primary;
};

const getSizeStyles = (size, theme) => {
  const sizes = {
    small: css`
      padding: ${theme.components.button.padding.small};
      font-size: ${theme.typography.fontSize.sm};
      height: 32px;
    `,

    medium: css`
      padding: ${theme.components.button.padding.medium};
      font-size: ${theme.typography.fontSize.md};
      height: 40px;
    `,

    large: css`
      padding: ${theme.components.button.padding.large};
      font-size: ${theme.typography.fontSize.lg};
      height: 48px;
    `
  };

  return sizes[size] || sizes.medium;
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.components.button.borderRadius};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.duration.fast} ${props => props.theme.transitions.timing.easeOut};
  white-space: nowrap;
  user-select: none;

  ${props => getVariantStyles(props.variant, props.theme)}
  ${props => getSizeStyles(props.size, props.theme)}

  ${props => props.fullWidth && css`
    width: 100%;
  `}

  ${props => props.loading && css`
    position: relative;
    color: transparent;
    pointer-events: none;

    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.borderFocus};
    outline-offset: 2px;
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ariaLabel,
  className
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      loading={loading}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
      className={className}
    >
      {icon && iconPosition === 'left' && (
        <IconWrapper>{icon}</IconWrapper>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <IconWrapper>{icon}</IconWrapper>
      )}
    </StyledButton>
  );
};

export default Button;
