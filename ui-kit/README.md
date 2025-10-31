# Open Wallet UI Kit

**A complete, customizable frontend UI kit for building branded wallet experiences**

The Open Wallet UI Kit provides a comprehensive set of pre-built React components, themes, and design tokens that enable you to quickly build and brand your own wallet interface. Whether you're building for web, iOS, or Android, our components are fully responsive, accessible, and ready to customize.

## Features

- 🎨 **Fully Themeable**: Built-in design token system for complete brand customization
- 📱 **Responsive**: Works perfectly on mobile, tablet, and desktop
- ♿ **Accessible**: WCAG 2.1 AA compliant components
- 🚀 **Production Ready**: Battle-tested components used in real applications
- 🎭 **Multiple Themes**: Light, dark, and custom theme support
- 🧩 **Modular**: Use individual components or the complete kit
- 💅 **Styled Components**: CSS-in-JS with full TypeScript support
- 🌍 **i18n Ready**: Internationalization support built-in

## Quick Start

### Installation

```bash
npm install @open-wallet/ui-kit
```

or with yarn:

```bash
yarn add @open-wallet/ui-kit
```

### Basic Usage

```jsx
import { WalletProvider, WalletDashboard } from '@open-wallet/ui-kit';
import '@open-wallet/ui-kit/dist/styles.css';

function App() {
  return (
    <WalletProvider
      apiKey="your_api_key"
      baseURL="https://api.yourapp.com"
      theme={{
        primaryColor: '#007AFF',
        brandName: 'Your Brand'
      }}
    >
      <WalletDashboard />
    </WalletProvider>
  );
}
```

## Components

### Layout Components

#### WalletDashboard
Main dashboard view showing balance, recent transactions, and quick actions.

```jsx
import { WalletDashboard } from '@open-wallet/ui-kit';

<WalletDashboard
  onAddFunds={() => {}}
  onSendMoney={() => {}}
  onViewTransactions={() => {}}
/>
```

#### WalletCard
Displays wallet balance with visual card design.

```jsx
import { WalletCard } from '@open-wallet/ui-kit';

<WalletCard
  balance={125.50}
  currency="USD"
  cardStyle="gradient" // or "solid", "glassmorphic"
  showDetails={true}
/>
```

#### TransactionList
Scrollable list of transactions with filtering and search.

```jsx
import { TransactionList } from '@open-wallet/ui-kit';

<TransactionList
  transactions={transactions}
  onTransactionClick={(id) => {}}
  showFilters={true}
  groupByDate={true}
/>
```

### Payment Components

#### AddFundsModal
Modal for adding funds with multiple payment methods.

```jsx
import { AddFundsModal } from '@open-wallet/ui-kit';

<AddFundsModal
  isOpen={isOpen}
  onClose={() => {}}
  onSuccess={(transaction) => {}}
  supportedMethods={['card', 'applepay', 'googlepay']}
/>
```

#### PaymentMethodSelector
Choose from saved payment methods or add new ones.

```jsx
import { PaymentMethodSelector } from '@open-wallet/ui-kit';

<PaymentMethodSelector
  methods={paymentMethods}
  onSelect={(method) => {}}
  onAddNew={() => {}}
/>
```

#### ApplePayButton / GooglePayButton
Native payment buttons with proper styling.

```jsx
import { ApplePayButton, GooglePayButton } from '@open-wallet/ui-kit';

<ApplePayButton
  amount={50.00}
  onSuccess={(token) => {}}
  merchantId="merchant.com.yourapp"
/>

<GooglePayButton
  amount={50.00}
  onSuccess={(token) => {}}
  merchantId="your_google_merchant_id"
/>
```

### Transaction Components

#### TransactionItem
Individual transaction display with icon, details, and amount.

```jsx
import { TransactionItem } from '@open-wallet/ui-kit';

<TransactionItem
  transaction={{
    id: 'txn-123',
    type: 'payment',
    amount: -25.00,
    description: 'Coffee shop',
    timestamp: '2024-01-15T10:30:00Z'
  }}
  onClick={(id) => {}}
/>
```

#### TransactionDetails
Full transaction details view.

```jsx
import { TransactionDetails } from '@open-wallet/ui-kit';

<TransactionDetails
  transactionId="txn-123"
  onClose={() => {}}
  onRefund={() => {}}
/>
```

#### TransactionFilter
Filter transactions by date, type, amount, etc.

```jsx
import { TransactionFilter } from '@open-wallet/ui-kit';

<TransactionFilter
  onFilterChange={(filters) => {}}
  availableTypes={['payment', 'refund', 'transfer']}
/>
```

### UI Components

#### Button
Customizable button component with multiple variants.

```jsx
import { Button } from '@open-wallet/ui-kit';

<Button
  variant="primary" // primary, secondary, outline, ghost, danger
  size="medium" // small, medium, large
  icon={<PlusIcon />}
  onClick={() => {}}
>
  Add Funds
</Button>
```

#### Input
Form input with validation and error states.

```jsx
import { Input } from '@open-wallet/ui-kit';

<Input
  type="number"
  label="Amount"
  placeholder="0.00"
  prefix="$"
  error={error}
  onChange={(value) => {}}
/>
```

#### Card
Container component with elevation and borders.

```jsx
import { Card } from '@open-wallet/ui-kit';

<Card
  elevation="medium" // none, low, medium, high
  padding="large"
  borderRadius="medium"
>
  {children}
</Card>
```

#### Badge
Status badges for transactions and notifications.

```jsx
import { Badge } from '@open-wallet/ui-kit';

<Badge
  variant="success" // success, warning, error, info
  size="small"
>
  Completed
</Badge>
```

#### LoadingSpinner
Loading states and skeleton screens.

```jsx
import { LoadingSpinner, SkeletonCard } from '@open-wallet/ui-kit';

<LoadingSpinner size="large" />
<SkeletonCard count={3} />
```

## Theming

### Design Tokens

Open Wallet UI Kit uses a comprehensive design token system for easy theming.

```javascript
const theme = {
  // Brand Colors
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA',

    // Neutral Colors
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: {
      primary: '#000000',
      secondary: '#3C3C43',
      disabled: '#C7C7CC'
    },
    border: '#E5E5EA',

    // Gradients
    gradient: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      success: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      premium: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)'
    }
  },

  // Typography
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      monospace: '"SF Mono", Monaco, "Cascadia Code", monospace'
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px'
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75
    }
  },

  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px'
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px'
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  },

  // Breakpoints
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px'
  }
};
```

### Using Custom Theme

```jsx
import { WalletProvider } from '@open-wallet/ui-kit';
import customTheme from './theme';

<WalletProvider theme={customTheme}>
  <App />
</WalletProvider>
```

### Theme Presets

The UI kit includes several pre-built themes:

```jsx
import { themes } from '@open-wallet/ui-kit';

// Light Theme (Default)
<WalletProvider theme={themes.light}>

// Dark Theme
<WalletProvider theme={themes.dark}>

// High Contrast
<WalletProvider theme={themes.highContrast}>

// Minimal
<WalletProvider theme={themes.minimal}>

// Premium
<WalletProvider theme={themes.premium}>
```

## Branding

### Complete Brand Customization

```jsx
import { WalletProvider } from '@open-wallet/ui-kit';

const brandConfig = {
  name: 'Your Brand',
  logo: '/path/to/logo.svg',
  logoLight: '/path/to/logo-light.svg', // For dark theme
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#FFE66D'
  },
  typography: {
    fontFamily: 'Poppins, sans-serif'
  },
  cardStyle: 'glassmorphic', // solid, gradient, glassmorphic
  buttonStyle: 'rounded', // rounded, square, pill
  animations: true
};

<WalletProvider brand={brandConfig}>
  <App />
</WalletProvider>
```

### Custom Card Designs

Create your own wallet card designs:

```jsx
import { WalletCard } from '@open-wallet/ui-kit';

<WalletCard
  style={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '24px',
    color: 'white'
  }}
  showPattern={true}
  pattern="dots" // dots, waves, geometric
/>
```

## Examples

### Complete Wallet App

```jsx
import React, { useState } from 'react';
import {
  WalletProvider,
  WalletDashboard,
  AddFundsModal,
  SendMoneyModal,
  TransactionList,
  useWallet
} from '@open-wallet/ui-kit';

function WalletApp() {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);
  const { balance, transactions, loading } = useWallet();

  return (
    <WalletProvider
      apiKey={process.env.REACT_APP_API_KEY}
      baseURL={process.env.REACT_APP_API_URL}
      theme={{
        colors: {
          primary: '#007AFF',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }
      }}
    >
      <div className="wallet-app">
        <WalletDashboard
          balance={balance}
          currency="USD"
          onAddFunds={() => setShowAddFunds(true)}
          onSendMoney={() => setShowSendMoney(true)}
        />

        <TransactionList
          transactions={transactions}
          loading={loading}
          groupByDate={true}
        />

        <AddFundsModal
          isOpen={showAddFunds}
          onClose={() => setShowAddFunds(false)}
          supportedMethods={['card', 'applepay', 'googlepay']}
        />

        <SendMoneyModal
          isOpen={showSendMoney}
          onClose={() => setShowSendMoney(false)}
          maxAmount={balance}
        />
      </div>
    </WalletProvider>
  );
}

export default WalletApp;
```

### Custom Themed Wallet

```jsx
import { WalletProvider, WalletDashboard } from '@open-wallet/ui-kit';

const darkTheme = {
  colors: {
    primary: '#BB86FC',
    secondary: '#03DAC6',
    background: '#121212',
    surface: '#1E1E1E',
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3'
    }
  }
};

function DarkWalletApp() {
  return (
    <WalletProvider theme={darkTheme}>
      <WalletDashboard />
    </WalletProvider>
  );
}
```

### Mobile-First Wallet

```jsx
import {
  MobileWalletNav,
  WalletCard,
  QuickActions,
  TransactionFeed
} from '@open-wallet/ui-kit';

function MobileWallet() {
  return (
    <div className="mobile-wallet">
      <MobileWalletNav />

      <WalletCard
        variant="mobile"
        showQRCode={true}
      />

      <QuickActions
        actions={[
          { icon: 'plus', label: 'Add', action: () => {} },
          { icon: 'send', label: 'Send', action: () => {} },
          { icon: 'scan', label: 'Scan', action: () => {} }
        ]}
      />

      <TransactionFeed
        limit={20}
        refreshable={true}
      />
    </div>
  );
}
```

## Customization Guide

### Override Component Styles

```jsx
import { WalletCard } from '@open-wallet/ui-kit';
import styled from 'styled-components';

const CustomWalletCard = styled(WalletCard)`
  background: linear-gradient(to right, #ff6b6b, #feca57);
  box-shadow: 0 10px 40px rgba(255, 107, 107, 0.3);

  .balance {
    font-size: 48px;
    font-weight: 700;
  }

  .card-number {
    letter-spacing: 4px;
  }
`;

<CustomWalletCard balance={250.00} />
```

### Create Custom Components

```jsx
import { useWallet, Card, Button } from '@open-wallet/ui-kit';

function CustomBalanceWidget() {
  const { balance, currency, refreshBalance } = useWallet();

  return (
    <Card>
      <h3>Your Balance</h3>
      <p className="amount">{currency} {balance.toFixed(2)}</p>
      <Button onClick={refreshBalance}>Refresh</Button>
    </Card>
  );
}
```

### Extend Theme

```jsx
import { defaultTheme } from '@open-wallet/ui-kit';

const myTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  borderRadius: {
    ...defaultTheme.borderRadius,
    card: '24px'
  }
};
```

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- ✅ Keyboard navigation support
- ✅ Screen reader compatible
- ✅ Sufficient color contrast (4.5:1 minimum)
- ✅ Focus indicators
- ✅ ARIA labels and roles
- ✅ Reduced motion support

### Accessible Component Usage

```jsx
<Button
  ariaLabel="Add $50 to your wallet"
  onClick={handleAddFunds}
>
  Add Funds
</Button>

<TransactionList
  ariaLabel="Recent transactions"
  role="list"
/>
```

## Internationalization

Built-in i18n support for multiple languages:

```jsx
import { WalletProvider } from '@open-wallet/ui-kit';
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';

<WalletProvider
  locale="es"
  translations={{
    en: enTranslations,
    es: esTranslations
  }}
>
  <App />
</WalletProvider>
```

Translation file format:

```json
{
  "wallet": {
    "balance": "Balance",
    "addFunds": "Add Funds",
    "sendMoney": "Send Money",
    "transactions": "Transactions",
    "recentActivity": "Recent Activity"
  },
  "transaction": {
    "completed": "Completed",
    "pending": "Pending",
    "failed": "Failed"
  }
}
```

## Performance

### Code Splitting

Import only what you need:

```jsx
// Import specific components
import { WalletCard } from '@open-wallet/ui-kit/components';
import { useWallet } from '@open-wallet/ui-kit/hooks';

// Lazy load heavy components
const AddFundsModal = lazy(() =>
  import('@open-wallet/ui-kit/components/AddFundsModal')
);
```

### Optimization Tips

1. **Use memo for expensive renders**
```jsx
import { memo } from 'react';
import { TransactionItem } from '@open-wallet/ui-kit';

const MemoizedTransaction = memo(TransactionItem);
```

2. **Virtual scrolling for long lists**
```jsx
import { VirtualTransactionList } from '@open-wallet/ui-kit';

<VirtualTransactionList
  transactions={transactions}
  height={600}
  itemHeight={72}
/>
```

3. **Optimize images**
```jsx
<WalletCard
  backgroundImage={{
    src: '/card-bg.jpg',
    srcSet: '/card-bg-2x.jpg 2x',
    loading: 'lazy'
  }}
/>
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari 14+
- Chrome Android 90+

## TypeScript Support

Full TypeScript definitions included:

```typescript
import { WalletTheme, Transaction, PaymentMethod } from '@open-wallet/ui-kit';

const theme: WalletTheme = {
  colors: {
    primary: '#007AFF'
  }
};

const transaction: Transaction = {
  id: 'txn-123',
  type: 'payment',
  amount: -25.00,
  currency: 'USD',
  status: 'completed',
  timestamp: new Date()
};
```

## Contributing

We welcome contributions to the UI Kit! See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
git clone https://github.com/ThomasC3/open-wallet.git
cd open-wallet/ui-kit
npm install
npm run dev
```

### Building

```bash
npm run build
```

### Testing

```bash
npm test
npm run test:watch
npm run test:coverage
```

## Examples Gallery

View live examples at: https://ui-kit.openwallet.dev

- Basic Wallet
- Dark Theme
- Minimal Design
- Premium Card Designs
- Mobile App
- E-commerce Integration
- Gaming Platform
- Subscription Service

## Storybook

Explore all components interactively:

```bash
npm run storybook
```

Visit http://localhost:6006

## License

MIT License - see [LICENSE](../LICENSE)

## Support

- Documentation: https://docs.openwallet.dev/ui-kit
- GitHub Issues: https://github.com/ThomasC3/open-wallet/issues
- Discord: https://discord.gg/openwallet

---

Built with ❤️ by the Open Wallet community
