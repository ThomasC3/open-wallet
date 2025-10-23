# Open Wallet

**A secure, tokenized mobile wallet system optimized for vault transactions**

Open Wallet is an open-source wallet infrastructure that provides secure payment tokenization, mobile payment integration (Apple Pay, Google Pay), and comprehensive wallet management capabilities. Built with PCI DSS compliance in mind, it leverages tokenization services like Basis Theory for secure payment data handling.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Mobile Integration](#mobile-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Wallet Functionality
- **Secure Tokenization**: PCI DSS compliant payment tokenization via Basis Theory or compatible providers
- **Multi-Currency Support**: Handle multiple currencies with automatic conversion
- **Transaction Management**: Complete transaction lifecycle with pending, completed, and failed states
- **Balance Management**: Real-time balance tracking with atomic operations
- **Audit Trail**: Complete transaction history and audit logging

### Mobile Payments
- **Apple Pay Integration**: Native Apple Pay support for iOS applications
- **Google Pay Integration**: Native Google Pay support for Android applications
- **Token Vault**: Secure storage of payment tokens with encryption at rest
- **Biometric Authentication**: Support for Touch ID, Face ID, and fingerprint authentication

### Admin & Management
- **Dashboard Analytics**: Real-time wallet statistics and transaction metrics
- **Refund Processing**: Complete refund workflow with approval system
- **Customer Management**: Wallet status control and customer support tools
- **Transaction Monitoring**: Advanced filtering, search, and export capabilities
- **Role-Based Access Control**: Granular permissions for admin users

### Developer Experience
- **RESTful API**: Well-documented REST API with comprehensive examples
- **Webhook Support**: Real-time notifications for transaction events
- **SDK Examples**: JavaScript, Python, and cURL examples
- **Test Mode**: Complete testing environment with mock data
- **TypeScript Support**: Full TypeScript definitions included

## Architecture

Open Wallet follows a modular, service-oriented architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    Mobile Applications                   │
│              (iOS - Apple Pay / Android - Google Pay)    │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ HTTPS/TLS
                 │
┌────────────────▼────────────────────────────────────────┐
│                     API Gateway                          │
│              (Authentication & Rate Limiting)            │
└────────────────┬────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
┌───────▼──────┐  ┌──────▼────────┐
│   Wallet     │  │   Payment     │
│   Service    │  │   Service     │
└───────┬──────┘  └──────┬────────┘
        │                │
        └────────┬───────┘
                 │
        ┌────────▼────────┐
        │  Tokenization   │
        │    Provider     │
        │ (Basis Theory)  │
        └─────────────────┘
                 │
        ┌────────▼────────┐
        │    Database     │
        │   (MongoDB/     │
        │   PostgreSQL)   │
        └─────────────────┘
```

### Key Components

1. **Wallet Service**: Core business logic for wallet operations
2. **Payment Service**: Mobile payment processing and tokenization
3. **Token Service**: Secure token management and vault operations
4. **Transaction Service**: Transaction lifecycle management
5. **Admin Service**: Administrative operations and reporting

## Quick Start

### Prerequisites

- Node.js 18+ or Python 3.9+
- MongoDB 6.0+ or PostgreSQL 14+
- Basis Theory account (or compatible tokenization provider)
- Redis (optional, for caching)

### Basic Setup

```bash
# Clone the repository
git clone https://github.com/ThomasC3/open-wallet.git
cd open-wallet

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run migrate

# Start the server
npm start
```

The API will be available at `http://localhost:3000`.

## Installation

### Using npm

```bash
npm install @open-wallet/core
```

### Using yarn

```bash
yarn add @open-wallet/core
```

### Using Docker

```bash
docker pull open-wallet/api:latest
docker run -p 3000:3000 -e DATABASE_URL=mongodb://localhost:27017 open-wallet/api
```

### From Source

```bash
git clone https://github.com/ThomasC3/open-wallet.git
cd open-wallet
npm install
npm run build
npm start
```

## Configuration

### Environment Variables

```bash
# Server Configuration
NODE_ENV=production
PORT=3000
API_BASE_URL=https://api.yourapp.com

# Database
DATABASE_URL=mongodb://localhost:27017/openwallet
# Or for PostgreSQL:
# DATABASE_URL=postgresql://user:pass@localhost:5432/openwallet

# Tokenization Provider (Basis Theory)
TOKENIZATION_API_KEY=your_api_key_here
TOKENIZATION_BASE_URL=https://api.basistheory.com
TOKENIZATION_TENANT_ID=your_tenant_id

# Security
JWT_SECRET=your_jwt_secret_here
ENCRYPTION_KEY=your_encryption_key_here
WEBHOOK_SECRET=your_webhook_secret_here

# Redis (optional, for caching)
REDIS_URL=redis://localhost:6379

# Payment Providers
APPLE_PAY_MERCHANT_ID=merchant.com.yourapp
GOOGLE_PAY_MERCHANT_ID=your_google_merchant_id

# Monitoring (optional)
SENTRY_DSN=your_sentry_dsn
LOG_LEVEL=info
```

### Configuration File

Create `config/default.json`:

```json
{
  "server": {
    "port": 3000,
    "host": "0.0.0.0"
  },
  "wallet": {
    "defaultCurrency": "USD",
    "minBalance": 0,
    "maxBalance": 10000,
    "autoTopUp": {
      "enabled": true,
      "threshold": 10,
      "amount": 50
    }
  },
  "transactions": {
    "maxRetries": 3,
    "timeoutMs": 30000,
    "idempotencyWindowHours": 24
  },
  "security": {
    "rateLimit": {
      "windowMs": 900000,
      "max": 100
    },
    "cors": {
      "origins": ["https://yourapp.com"]
    }
  }
}
```

## API Documentation

### Authentication

All API requests require authentication using Bearer tokens:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.yourapp.com/v1/wallet
```

### Wallet Endpoints

#### Create Wallet

```http
POST /v1/wallet
```

**Request:**
```json
{
  "userId": "user-123",
  "currency": "USD",
  "initialBalance": 0
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "wallet-456",
    "userId": "user-123",
    "balance": 0,
    "currency": "USD",
    "status": "active",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

#### Get Wallet Balance

```http
GET /v1/wallet/:walletId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "wallet-456",
    "balance": 125.50,
    "currency": "USD",
    "status": "active"
  }
}
```

#### Add Funds

```http
POST /v1/wallet/:walletId/fund
```

**Request:**
```json
{
  "amount": 50.00,
  "paymentMethodToken": "tok_1234567890",
  "description": "Add funds to wallet"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactionId": "txn-789",
    "amount": 50.00,
    "newBalance": 175.50,
    "status": "completed"
  }
}
```

### Mobile Payment Endpoints

#### Initialize Apple Pay

```http
POST /v1/payment/apple-pay/init
```

**Request:**
```json
{
  "walletId": "wallet-456",
  "amount": 25.00,
  "merchantIdentifier": "merchant.com.yourapp"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "session-123",
    "merchantSession": {
      "epochTimestamp": 1234567890,
      "expiresAt": 1234571490,
      "merchantSessionIdentifier": "SSH123456789",
      "nonce": "nonce-xyz",
      "merchantIdentifier": "merchant.com.yourapp",
      "domainName": "yourapp.com",
      "displayName": "Your App",
      "signature": "signature-data"
    }
  }
}
```

#### Process Apple Pay Payment

```http
POST /v1/payment/apple-pay/process
```

**Request:**
```json
{
  "walletId": "wallet-456",
  "sessionId": "session-123",
  "paymentData": {
    "version": "EC_v1",
    "data": "encrypted-payment-data",
    "signature": "signature",
    "header": {
      "ephemeralPublicKey": "key-data",
      "publicKeyHash": "hash-data",
      "transactionId": "txn-id"
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactionId": "txn-789",
    "status": "completed",
    "amount": 25.00,
    "token": "tok_1234567890"
  }
}
```

#### Initialize Google Pay

```http
POST /v1/payment/google-pay/init
```

**Request:**
```json
{
  "walletId": "wallet-456",
  "amount": 25.00,
  "merchantId": "your_google_merchant_id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "session-456",
    "configuration": {
      "environment": "PRODUCTION",
      "merchantInfo": {
        "merchantId": "your_google_merchant_id",
        "merchantName": "Your App"
      },
      "allowedPaymentMethods": [{
        "type": "CARD",
        "parameters": {
          "allowedAuthMethods": ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          "allowedCardNetworks": ["MASTERCARD", "VISA"]
        }
      }]
    }
  }
}
```

### Transaction Endpoints

#### Get Transaction History

```http
GET /v1/wallet/:walletId/transactions?page=1&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "txn-789",
        "type": "payment",
        "amount": -25.00,
        "description": "Purchase",
        "status": "completed",
        "createdAt": "2024-01-15T11:30:00Z"
      },
      {
        "id": "txn-790",
        "type": "refund",
        "amount": 10.00,
        "description": "Refund for order #123",
        "status": "completed",
        "createdAt": "2024-01-15T12:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "pages": 3
    }
  }
}
```

### Admin Endpoints

#### Dashboard Overview

```http
GET /v1/admin/dashboard
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalWallets": 5432,
    "totalBalance": 125678.50,
    "monthlyTransactions": 12345,
    "monthlyVolume": 456789.00,
    "pendingRefunds": 23,
    "activeUsers": 4567
  }
}
```

#### Process Refund

```http
POST /v1/admin/refunds
```

**Request:**
```json
{
  "transactionId": "txn-789",
  "amount": 25.00,
  "reason": "customer_request",
  "notes": "Customer requested refund"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "refundId": "ref-123",
    "transactionId": "txn-789",
    "amount": 25.00,
    "status": "pending",
    "createdAt": "2024-01-15T14:00:00Z"
  }
}
```

## Security

### PCI DSS Compliance

Open Wallet is designed to help you maintain PCI DSS compliance:

- **No Raw Card Data**: Never stores raw card numbers; uses tokenization
- **Encrypted Storage**: All sensitive data encrypted at rest
- **TLS Required**: All API communication over HTTPS/TLS 1.3
- **Token Vault**: Secure token storage with access controls
- **Audit Logging**: Complete audit trail of all operations

### Best Practices

1. **Use Environment Variables**: Never commit secrets to version control
2. **Rotate Keys Regularly**: Implement key rotation for encryption keys
3. **Enable Rate Limiting**: Protect against abuse and DDoS
4. **Monitor Suspicious Activity**: Set up alerts for unusual patterns
5. **Regular Security Audits**: Conduct periodic security reviews

### Token Security

Tokens are stored securely using:

- **Encryption at Rest**: AES-256-GCM encryption
- **Access Controls**: Role-based access to tokens
- **Expiration**: Automatic token expiration after configurable period
- **Audit Trail**: All token access logged

## Mobile Integration

### iOS (Swift)

```swift
import OpenWallet

// Initialize the SDK
let wallet = OpenWallet(
    apiKey: "your_api_key",
    baseURL: "https://api.yourapp.com"
)

// Create Apple Pay payment request
let paymentRequest = PKPaymentRequest()
paymentRequest.merchantIdentifier = "merchant.com.yourapp"
paymentRequest.supportedNetworks = [.visa, .masterCard, .amex]
paymentRequest.merchantCapabilities = .capability3DS
paymentRequest.countryCode = "US"
paymentRequest.currencyCode = "USD"

// Process payment
wallet.processApplePayPayment(
    walletId: "wallet-456",
    paymentData: payment.token.paymentData
) { result in
    switch result {
    case .success(let transaction):
        print("Payment successful: \\(transaction.id)")
    case .failure(let error):
        print("Payment failed: \\(error)")
    }
}
```

### Android (Kotlin)

```kotlin
import com.openwallet.sdk.OpenWallet
import com.openwallet.sdk.GooglePayConfig

// Initialize the SDK
val wallet = OpenWallet(
    apiKey = "your_api_key",
    baseUrl = "https://api.yourapp.com"
)

// Configure Google Pay
val googlePayConfig = GooglePayConfig(
    environment = WalletConstants.ENVIRONMENT_PRODUCTION,
    merchantId = "your_google_merchant_id",
    merchantName = "Your App"
)

// Process payment
wallet.processGooglePayPayment(
    walletId = "wallet-456",
    paymentData = paymentData
) { result ->
    when (result) {
        is Result.Success -> {
            println("Payment successful: ${result.data.transactionId}")
        }
        is Result.Error -> {
            println("Payment failed: ${result.error}")
        }
    }
}
```

### React Native

```javascript
import OpenWallet from '@open-wallet/react-native';

// Initialize
const wallet = new OpenWallet({
  apiKey: 'your_api_key',
  baseURL: 'https://api.yourapp.com'
});

// Add funds using Apple Pay
const addFunds = async () => {
  try {
    const result = await wallet.addFundsWithApplePay({
      walletId: 'wallet-456',
      amount: 50.00,
      merchantId: 'merchant.com.yourapp'
    });
    console.log('Funds added:', result.transactionId);
  } catch (error) {
    console.error('Payment failed:', error);
  }
};
```

## Testing

### Unit Tests

```bash
npm test
```

### Integration Tests

```bash
npm run test:integration
```

### Test Mode

Use test API keys to run in sandbox mode:

```bash
export TOKENIZATION_API_KEY=test_key_1234567890
export NODE_ENV=test
npm start
```

### Example Test Data

```javascript
const testWallet = {
  userId: "test-user-123",
  balance: 100.00,
  currency: "USD"
};

const testTransaction = {
  walletId: "test-wallet-456",
  amount: 25.00,
  type: "payment",
  status: "completed"
};
```

## Performance

### Optimization Tips

1. **Enable Caching**: Use Redis for frequently accessed data
2. **Database Indexing**: Ensure proper indexes on wallet and transaction collections
3. **Connection Pooling**: Configure appropriate database connection pools
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **Async Processing**: Use queues for non-critical operations

### Benchmarks

On a standard cloud instance (2 vCPU, 4GB RAM):

- **Wallet Creation**: ~50ms average
- **Balance Lookup**: ~10ms average
- **Transaction Processing**: ~100ms average
- **Throughput**: ~1000 requests/second

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/ThomasC3/open-wallet.git
cd open-wallet
npm install
npm run dev
```

### Code Style

We use ESLint and Prettier for code formatting:

```bash
npm run lint
npm run format
```

### Submitting Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Community

- **Documentation**: [docs.openwallet.dev](https://docs.openwallet.dev)
- **Discord**: [Join our community](https://discord.gg/openwallet)
- **GitHub Discussions**: [Ask questions](https://github.com/ThomasC3/open-wallet/discussions)
- **Twitter**: [@OpenWalletDev](https://twitter.com/OpenWalletDev)

## License

Open Wallet is released under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by modern payment tokenization practices
- Built with security and developer experience in mind
- Special thanks to all contributors

## Roadmap

### v1.0 (Current)
- Core wallet functionality
- Mobile payment integration
- Basic admin dashboard
- RESTful API

### v1.1 (Next)
- GraphQL API support
- Enhanced analytics
- Multi-tenant support
- Webhooks v2

### v2.0 (Future)
- Cryptocurrency support
- Cross-border payments
- Advanced fraud detection
- Machine learning analytics

## Support

For support, please:

1. Check the [documentation](https://docs.openwallet.dev)
2. Search [GitHub Issues](https://github.com/ThomasC3/open-wallet/issues)
3. Join our [Discord community](https://discord.gg/openwallet)
4. Email: support@openwallet.dev

---

Made with ❤️ by the Open Wallet community
