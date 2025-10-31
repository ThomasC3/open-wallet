/**
 * Basic Wallet App Example
 *
 * Complete example of a wallet application using Open Wallet UI Kit
 */

import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../themes';
import WalletCard from '../components/WalletCard';
import Button from '../components/Button';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textPrimary};
  padding: ${props => props.theme.spacing[6]};
  transition: background ${props => props.theme.transitions.duration.normal};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing[4]};
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const Logo = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin: 0;
`;

const ThemeToggle = styled.button`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.full};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.duration.fast};

  &:hover {
    background: ${props => props.theme.colors.surfaceHover};
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[6]};
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 800px;
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing[4]};

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TransactionSection = styled.section`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[6]};
  border: 1px solid ${props => props.theme.colors.border};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin: 0 0 ${props => props.theme.spacing[4]} 0;
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing[4]};
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: background ${props => props.theme.transitions.duration.fast};

  &:hover {
    background: ${props => props.theme.colors.surfaceHover};
  }
`;

const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[1]};
`;

const TransactionTitle = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const TransactionDate = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
`;

const TransactionAmount = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.isPositive ? props.theme.colors.success : props.theme.colors.textPrimary};
`;

function BasicWalletApp() {
  const [theme, setTheme] = useState('light');
  const [balance, setBalance] = useState(1250.00);

  const transactions = [
    { id: 1, title: 'Coffee Shop', date: '2024-01-15', amount: -5.50 },
    { id: 2, title: 'Added Funds', date: '2024-01-14', amount: 100.00 },
    { id: 3, title: 'Online Purchase', date: '2024-01-13', amount: -45.00 },
    { id: 4, title: 'Refund', date: '2024-01-12', amount: 15.00 },
    { id: 5, title: 'Subscription', date: '2024-01-10', amount: -9.99 }
  ];

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleAddFunds = () => {
    const amount = prompt('Enter amount to add:');
    if (amount && !isNaN(amount)) {
      setBalance(balance + parseFloat(amount));
    }
  };

  const handleSendMoney = () => {
    const amount = prompt('Enter amount to send:');
    if (amount && !isNaN(amount) && parseFloat(amount) <= balance) {
      setBalance(balance - parseFloat(amount));
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <AppContainer>
        <Header>
          <Logo>My Wallet</Logo>
          <ThemeToggle onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </ThemeToggle>
        </Header>

        <DashboardGrid>
          <WalletCard
            balance={balance}
            currency="USD"
            cardNumber="•••• 1234"
            expiryDate="12/25"
            pattern="dots"
            showPattern={true}
            showDetails={true}
          />

          <QuickActions>
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handleAddFunds}
            >
              Add Funds
            </Button>

            <Button
              variant="outline"
              size="large"
              fullWidth
              onClick={handleSendMoney}
            >
              Send Money
            </Button>

            <Button
              variant="ghost"
              size="large"
              fullWidth
            >
              Request
            </Button>
          </QuickActions>

          <TransactionSection>
            <SectionTitle>Recent Transactions</SectionTitle>
            <TransactionList>
              {transactions.map(transaction => (
                <TransactionItem key={transaction.id}>
                  <TransactionInfo>
                    <TransactionTitle>{transaction.title}</TransactionTitle>
                    <TransactionDate>{transaction.date}</TransactionDate>
                  </TransactionInfo>
                  <TransactionAmount isPositive={transaction.amount > 0}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </TransactionAmount>
                </TransactionItem>
              ))}
            </TransactionList>
          </TransactionSection>
        </DashboardGrid>
      </AppContainer>
    </ThemeProvider>
  );
}

export default BasicWalletApp;
