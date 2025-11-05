import React from 'react';
import { WalletCard } from '../components/WalletCard';

export default {
  title: 'WalletCard',
  component: WalletCard,
};

const Template = (args) => <WalletCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  balance: 12458.50,
  currency: 'USD',
  cardNumber: '•••• 1234',
  expiryDate: '12/26',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
};