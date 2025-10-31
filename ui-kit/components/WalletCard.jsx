/**
 * WalletCard Component
 *
 * Displays wallet balance in a visually appealing card format
 */

import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: ${props => props.gradient || props.theme.components.walletCard.background};
  border-radius: ${props => props.theme.components.walletCard.borderRadius};
  padding: ${props => props.theme.components.walletCard.padding};
  color: ${props => props.theme.components.walletCard.textColor};
  box-shadow: ${props => props.theme.components.walletCard.shadow};
  min-height: 200px;
  position: relative;
  overflow: hidden;
  transition: transform ${props => props.theme.transitions.duration.normal} ${props => props.theme.transitions.timing.easeOut};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.cardHover};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing[5]};
    min-height: 180px;
  }
`;

const CardPattern = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  opacity: 0.1;
  background: ${props => {
    if (props.pattern === 'dots') {
      return 'radial-gradient(circle, white 1px, transparent 1px)';
    } else if (props.pattern === 'waves') {
      return `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 0, 50 50 T 100 50' stroke='white' fill='none'/%3E%3C/svg%3E")`;
    }
    return 'none';
  }};
  background-size: ${props => props.pattern === 'dots' ? '20px 20px' : 'cover'};
`;

const BalanceLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  opacity: 0.8;
  margin-bottom: ${props => props.theme.spacing[2]};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const BalanceAmount = styled.div`
  font-size: ${props => props.theme.typography.fontSize['4xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing[4]};
  line-height: 1;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
  }
`;

const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  opacity: 0.9;
`;

const CardNumber = styled.div`
  font-family: ${props => props.theme.typography.fontFamily.monospace};
  font-size: ${props => props.theme.typography.fontSize.md};
  letter-spacing: 2px;
`;

const CardExpiry = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const WalletCard = ({
  balance = 0,
  currency = 'USD',
  cardNumber = '•••• 1234',
  expiryDate,
  gradient,
  pattern = 'dots',
  showPattern = true,
  showDetails = true,
  className,
  onClick
}) => {
  const formatBalance = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <CardContainer
      gradient={gradient}
      className={className}
      onClick={onClick}
    >
      {showPattern && <CardPattern pattern={pattern} />}

      <BalanceLabel>Available Balance</BalanceLabel>
      <BalanceAmount>{formatBalance(balance)}</BalanceAmount>

      {showDetails && (
        <CardDetails>
          <CardNumber>{cardNumber}</CardNumber>
          {expiryDate && <CardExpiry>{expiryDate}</CardExpiry>}
        </CardDetails>
      )}
    </CardContainer>
  );
};

export default WalletCard;
