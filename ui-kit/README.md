# OpenWallet

OpenWallet is a comprehensive suite of tools for creating custom, branded wallet experiences. It consists of two main parts:

1.  **The OpenWallet SDK**: A powerful JavaScript library that handles the core logic of payments, balances, and transactions across multiple payment types.
2.  **The Wallet Builder**: A user-friendly, drag-and-drop interface for designing and configuring your wallet's UI without writing code.

## Key Features

-   **Multiple Payment Types**: A pluggable architecture for integrating various payment channels.
-   **White-Label UI Builder**: A drag-and-drop tool to build a wallet UI that matches your brand.
-   **Themeable Components**: A library of React components that can be styled to your needs.
-   **Secure**: Core logic is handled by the SDK, abstracting away sensitive operations.

## Quick Start

### 1. Wallet Builder

To get started with the UI builder:

1.  Open the `wallet-builder.html` file in your browser.
2.  Drag and drop components from the left-hand palette onto the central canvas.
3.  Use the right-hand panel to configure branding, colors, and text for your wallet.

### 2. Using the SDK (Coming Soon)

The SDK will provide the core functionality for your wallet.

```javascript
import OpenWallet from '@open-wallet/sdk';

const wallet = new OpenWallet({ apiKey: 'YOUR_API_KEY' });

const balance = await wallet.getBalance();
```

## Development

To contribute or run the project locally:

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  To view component examples, run Storybook: `npm run storybook`