# 🎨 Open Wallet Visual Builder

## Low-Code Drag & Drop Wallet Designer

Build enterprise-grade digital wallets with tokenized payment processing in minutes, not months. No coding required.

---

## 🚀 Quick Start

### Launch the Builder
```bash
open wallet-builder.html
```

The builder opens with three main panels:
1. **Component Library** (left) - Drag & drop UI elements
2. **Canvas** (center) - Visual wallet preview on mobile device
3. **Properties** (right) - Customize component settings

---

## 📦 Component Library

### 💳 Wallet Components
Build the core wallet experience:

| Component | Description | Features |
|-----------|-------------|----------|
| **Wallet Card** | Premium gradient card displaying balance | • 6 gradient themes<br>• Pattern overlays<br>• Auto-formatted currency |
| **Balance Display** | Standalone balance widget | • Real-time updates<br>• Multiple currencies<br>• Trend indicators |
| **Card List** | Scrollable payment methods | • Swipe gestures<br>• Default card selection<br>• Add new card CTA |

### 🔐 Payment Methods (Tokenized)
Add secure, PCI-DSS compliant payment options:

| Component | Description | Tokenization |
|-----------|-------------|--------------|
| **Payment Method** | Credit/debit card display | ✅ Fully tokenized<br>Supports: Visa, Mastercard, Amex, Discover |
| **Apple Pay** | One-tap Apple Pay integration | ✅ Token provisioning<br>Biometric authentication |
| **Google Pay** | Quick Google Pay checkout | ✅ Secure element storage<br>NFC support |
| **Token Vault** | Display vault status indicator | ✅ 256-bit encrypted<br>PCI-DSS Level 1 compliant |
| **Add Card** | Tokenized card capture form | ✅ Direct vault submission<br>Never touches your servers |

### 📊 Transaction Components
Display payment history and receipts:

| Component | Description | Use Case |
|-----------|-------------|----------|
| **Transaction List** | Scrollable history | Past 90 days, infinite scroll |
| **Transaction Item** | Individual transaction row | Amount, merchant, date, status |
| **Receipt** | Detailed transaction receipt | Full itemization, tax breakdown |

### ⚡ Action Components
Enable user interactions:

| Component | Description | Actions |
|-----------|-------------|---------|
| **Button** | Primary/outline/ghost styles | Custom text, icons, loading states |
| **Action Grid** | 2x2 or 3x3 quick actions | Add funds, send, request, scan |
| **QR Scanner** | Camera-based QR reader | Payment requests, P2P transfers |

---

## 🎨 Building Your Wallet

### Step 1: Drag Components
1. Click and hold a component from the left panel
2. Drag it onto the mobile canvas
3. Drop it between the dashed drop zones
4. Components auto-arrange with proper spacing

### Step 2: Customize Properties
Click any component on the canvas to edit:

**Wallet Card Properties:**
- **Gradient**: 6 premium themes (Dark, Ocean, Forest, Sunset, Purple, Gold)
- **Pattern**: None, Dots, Waves, Mesh
- **Show Balance**: Toggle visibility
- **Currency**: USD, EUR, GBP, JPY, etc.

**Payment Method Properties:**
- **Brand**: Visa, Mastercard, Amex, Discover
- **Last 4 Digits**: Display masked number
- **Tokenized Badge**: Show security indicator
- **Default Card**: Set primary payment method

**Button Properties:**
- **Text**: Custom label
- **Variant**: Primary (gradient), Outline, Ghost
- **Icon**: Choose from 50+ icons
- **Action**: Link to function

### Step 3: Configure Wallet Settings
Global settings in the properties panel:

| Setting | Options | Description |
|---------|---------|-------------|
| **Wallet Name** | Text input | Display name for your wallet app |
| **Tokenization Provider** | Basis Theory, Stripe, Braintree, Adyen | Choose your vault provider |
| **Theme** | 6 gradients | App-wide color scheme |
| **Vault Enabled** | Toggle | Enable secure token storage |

---

## 🔐 Tokenization & Security

### How It Works

```
User enters card → Tokenization SDK → Secure Vault → Token returned
     ❌ Card data never touches your server
     ✅ PCI-DSS compliance automatic
     ✅ 256-bit encryption
     ✅ Token lifecycle management
```

### Supported Tokenization Providers

#### 1. **Basis Theory** (Recommended)
- **Best for**: Enterprise-grade security
- **Features**:
  - Programmable vault
  - Granular access controls
  - SOC 2 Type II certified
  - 99.99% uptime SLA
- **Pricing**: Pay-as-you-go, $0.05/token/month

#### 2. **Stripe**
- **Best for**: Rapid deployment
- **Features**:
  - Instant merchant account
  - Global payment methods
  - Built-in fraud detection
- **Pricing**: 2.9% + $0.30 per transaction

#### 3. **Braintree** (PayPal)
- **Best for**: Marketplace platforms
- **Features**:
  - Split payments
  - Escrow support
  - Multi-currency
- **Pricing**: 2.59% + $0.49 per transaction

#### 4. **Adyen**
- **Best for**: International commerce
- **Features**:
  - 250+ payment methods
  - Dynamic currency conversion
  - Local acquiring
- **Pricing**: Custom enterprise pricing

### Token Vault Component

The **Token Vault** component displays security status:
```jsx
<TokenVault
  provider="basis-theory"
  status="active"
  tokenCount={5}
  encryption="AES-256"
  compliance={['PCI-DSS', 'SOC2', 'GDPR']}
/>
```

Visual indicator shows:
- 🔐 Vault status (Active/Inactive)
- Number of stored tokens
- Encryption level
- Compliance badges

---

## 💳 Payment Method Integration

### Adding Tokenized Cards

When you add a **Payment Method** component, the generated code includes full tokenization:

```javascript
// Auto-generated tokenization flow
import { BasisTheory } from '@basis-theory/basis-theory-js';

const bt = await new BasisTheory().init('your_api_key');

// Card tokenization
const token = await bt.tokens.create({
  type: 'card',
  data: {
    number: '<card-number>',      // Collected via secure iframe
    expiration_month: 12,
    expiration_year: 2025,
    cvc: '<cvc>'                   // Never stored
  }
});

// Token saved to vault
console.log(token.id); // tok_abc123...
// Original card data destroyed
```

### Apple Pay Integration

Drag the **Apple Pay** component to enable:
```javascript
// Auto-generated Apple Pay setup
const applePaySession = new ApplePaySession(3, {
  countryCode: 'US',
  currencyCode: 'USD',
  supportedNetworks: ['visa', 'mastercard', 'amex'],
  merchantCapabilities: ['supports3DS'],
  total: { label: 'Total', amount: '10.00' }
});

applePaySession.onpaymentauthorized = async (event) => {
  // Token automatically created and stored
  const token = await tokenizeApplePay(event.payment.token);
  // Process payment with token
};
```

### Google Pay Integration

Drag the **Google Pay** component:
```javascript
// Auto-generated Google Pay integration
const paymentsClient = new google.payments.api.PaymentsClient({
  environment: 'PRODUCTION'
});

const tokenizationSpec = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    gateway: 'basistheory',
    gatewayMerchantId: 'your_merchant_id'
  }
};

// Secure token provisioning
const paymentData = await paymentsClient.loadPaymentData(request);
// Token stored, card data never exposed
```

---

## 📤 Export & Deploy

### 1. Export Code

Click **💻 Export Code** to generate production-ready React code:

```jsx
import React from 'react';
import {
  OpenWallet,
  WalletCard,
  PaymentMethod,
  ApplePay,
  GooglePay,
  TransactionList
} from '@open-wallet/ui-kit';

function MyWallet() {
  return (
    <OpenWallet
      config={{
        tokenization: "basis-theory",
        apiKey: process.env.TOKENIZATION_KEY,
        vaultEnabled: true,
        theme: {
          gradient: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          primaryColor: "#667eea"
        }
      }}
    >
      <WalletCard gradient="dark" showPattern={true} />
      <PaymentMethod type="credit-card" tokenized={true} />
      <ApplePay merchantId="merchant.com.yourapp" />
      <GooglePay merchantId="BCR2DN4..." />
      <TransactionList limit={50} />
    </OpenWallet>
  );
}

export default MyWallet;
```

### 2. Install Dependencies

```bash
npm install @open-wallet/ui-kit @basis-theory/basis-theory-js
# or
yarn add @open-wallet/ui-kit @basis-theory/basis-theory-js
```

### 3. Configure Environment

```bash
# .env
REACT_APP_TOKENIZATION_PROVIDER=basis-theory
REACT_APP_TOKENIZATION_KEY=key_live_abc123...
REACT_APP_APPLE_MERCHANT_ID=merchant.com.yourapp
REACT_APP_GOOGLE_MERCHANT_ID=BCR2DN4...
```

### 4. Deploy

```bash
# Build production bundle
npm run build

# Deploy to your platform
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# AWS S3 + CloudFront
aws s3 sync build/ s3://your-wallet-bucket
```

---

## 🎨 Customization Examples

### Example 1: Minimalist Wallet
```
Components:
1. Wallet Card (Ocean gradient, no pattern)
2. Add Card button
3. Transaction List (last 10)

Theme: Ocean
Provider: Stripe
```

### Example 2: Feature-Rich Payment Hub
```
Components:
1. Wallet Card (Dark gradient, dots pattern)
2. Token Vault status
3. Payment Method (Visa •••• 4242)
4. Apple Pay
5. Google Pay
6. Action Grid (4 buttons)
7. Transaction List (infinite scroll)
8. Receipt viewer

Theme: Professional Dark
Provider: Basis Theory
```

### Example 3: Marketplace Wallet
```
Components:
1. Balance Display (multi-currency)
2. Card List (3 cards, swipeable)
3. Button "Add Payout Method"
4. Transaction List (filterable)
5. QR Scanner for P2P

Theme: Purple
Provider: Braintree
```

---

## 🔒 Security Best Practices

### ✅ DO:
- **Use tokenization for all payment data** - Never store raw card numbers
- **Enable vault encryption** - 256-bit AES minimum
- **Implement biometric auth** - FaceID/TouchID for Apple Pay
- **Use HTTPS only** - TLS 1.3 required
- **Rotate API keys quarterly** - Automated key management
- **Log all token operations** - Audit trail required
- **Set token TTL** - Auto-expire unused tokens

### ❌ DON'T:
- **Never log card data** - Even in development
- **Don't store CVV** - It's illegal under PCI-DSS
- **Don't use test keys in production** - Obvious but critical
- **Don't skip 3D Secure** - Required for SCA compliance
- **Don't reuse tokens** - One-time use for charges
- **Don't transmit tokens via URL** - Use request body/headers only

---

## 🌍 Multi-Currency Support

Enable multiple currencies in the Wallet Card:

```javascript
<WalletCard
  balances={[
    { currency: 'USD', amount: 1250.00 },
    { currency: 'EUR', amount: 1100.50 },
    { currency: 'GBP', amount: 950.25 },
  ]}
  displayCurrency="USD"
  autoConvert={true}
/>
```

Supported currencies:
- **Fiat**: USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, INR, BRL
- **Crypto**: BTC, ETH, USDC (via Coinbase integration)

---

## 📊 Analytics Integration

Track wallet usage with built-in analytics:

```javascript
<OpenWallet
  analytics={{
    provider: 'mixpanel',
    apiKey: 'your_mixpanel_key',
    events: [
      'wallet_opened',
      'card_added',
      'payment_completed',
      'token_created',
      'vault_accessed'
    ]
  }}
>
```

Tracked metrics:
- Wallet open rate
- Card add conversion
- Payment success rate
- Token creation volume
- Vault access frequency
- Average transaction value

---

## 🎯 Use Cases

### 1. **E-Commerce Checkout**
Components: Wallet Card, Apple Pay, Google Pay, Button "Complete Purchase"
- One-click checkout
- Saved payment methods
- Guest checkout with tokenization

### 2. **P2P Payment App**
Components: Balance Display, QR Scanner, Transaction List, Button "Send Money"
- Instant transfers
- QR code payments
- Transaction history

### 3. **Subscription Management**
Components: Card List, Token Vault, Transaction List (recurring)
- Auto-renewal
- Payment method updates
- Billing history

### 4. **Marketplace Split Payments**
Components: Balance (seller wallet), Transaction List, Button "Withdraw"
- Escrow support
- Multi-party split
- Payout management

### 5. **Rewards & Loyalty**
Components: Balance (points), Wallet Card (branded), Transaction List
- Points tracking
- Reward redemption
- Tier status

---

## 🚀 Advanced Features

### Webhooks for Token Events
```javascript
// Auto-configured webhook endpoints
POST /webhooks/token-created
POST /webhooks/token-expired
POST /webhooks/payment-authorized
POST /webhooks/vault-accessed

// Example handler
app.post('/webhooks/token-created', (req, res) => {
  const { token_id, type, last4 } = req.body;
  // Update UI with new payment method
  console.log(`New ${type} token: ****${last4}`);
  res.status(200).send();
});
```

### Biometric Authentication
```javascript
<OpenWallet
  auth={{
    biometric: true,
    fallback: 'pin',
    timeout: 300 // 5 minutes
  }}
>
```

### Offline Mode
```javascript
<OpenWallet
  offline={{
    enabled: true,
    cacheTransactions: 100,
    syncInterval: 60000 // 1 minute
  }}
>
```

---

## 📞 Support & Resources

- **Documentation**: https://open-wallet.dev/docs
- **API Reference**: https://open-wallet.dev/api
- **Component Storybook**: https://storybook.open-wallet.dev
- **GitHub**: https://github.com/ThomasC3/open-wallet
- **Discord Community**: https://discord.gg/open-wallet
- **Email**: support@open-wallet.dev

---

## 📄 License

MIT License - Free for commercial use

Built with ❤️ by the Open Wallet community
