# OpenWallet

OpenWallet is a suite of tools for creating custom, branded wallet experiences. This repository contains the **Wallet Builder**, a user-friendly, drag-and-drop interface for designing and configuring your wallet's UI without writing code.

## Key Features

-   **Visual Wallet Builder**: A simple, browser-based tool to design your wallet's look and feel.
-   **Drag-and-Drop**: Easily add and arrange components like balances and buttons.
-   **Real-time Branding**: Customize colors and text and see your changes instantly.
-   **Code Export**: The builder will generate a code snippet to use in your application (feature coming soon).

## How to Use the Wallet Builder

1.  **Open the file**: Open the `wallet-builder.html` file directly in your web browser.
2.  **Drag Components**: Drag components like "Wallet Balance" or "Pay Now Button" from the left-hand component panel onto the phone preview in the center.
3.  **Customize**: Click on a component in the preview to see its options. Use the right-hand configuration panel to change colors, text, and other properties.

## Development

This project is built with React and is designed to run directly in the browser without a build step.

-   To view the component library, you can use Storybook: `npm run storybook`
-   To make changes, you can edit the `wallet-builder.html` file directly.
