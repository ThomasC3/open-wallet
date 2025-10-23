# Contributing to Open Wallet

Thank you for your interest in contributing to Open Wallet! This document provides guidelines and instructions for contributing.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions with other contributors.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Environment details** (Node version, OS, etc.)
- **Code samples** or error messages if applicable

### Suggesting Features

Feature suggestions are welcome! Please provide:

- **Clear use case** for the feature
- **Expected behavior** and API design
- **Examples** of how it would be used
- **Alternatives considered**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** with clear, focused commits
4. **Add tests** for new functionality
5. **Run tests**: `npm test`
6. **Run linter**: `npm run lint`
7. **Update documentation** if needed
8. **Submit pull request** with clear description

## Development Setup

### Prerequisites

- Node.js 18+ or Python 3.9+
- MongoDB 6.0+ or PostgreSQL 14+
- Redis (optional)

### Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/open-wallet.git
cd open-wallet

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your settings

# Start development server
npm run dev
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- tests/services/wallet.spec.js

# Run in watch mode
npm run test:watch
```

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Auto-fix issues
npm run lint:fix

# Format code
npm run format
```

## Project Structure

```
open-wallet/
├── src/
│   ├── services/       # Core business logic
│   ├── models/         # Database models
│   ├── middleware/     # Express middleware
│   ├── routes/         # API route handlers
│   ├── utils/          # Utility functions
│   └── config/         # Configuration
├── tests/
│   ├── unit/           # Unit tests
│   └── integration/    # Integration tests
├── docs/               # Documentation
└── examples/           # Usage examples
```

## Coding Guidelines

### General Principles

- Write clear, self-documenting code
- Follow existing code patterns
- Keep functions small and focused
- Add comments for complex logic
- Use meaningful variable names

### JavaScript Style

- Use ES6+ features
- Use `const` by default, `let` when needed
- Use async/await over promises
- Handle errors properly
- Document functions with JSDoc

Example:

```javascript
/**
 * Create a new wallet
 * @param {Object} params - Wallet parameters
 * @param {string} params.userId - User identifier
 * @param {string} params.currency - Currency code
 * @returns {Promise<Object>} Created wallet
 */
async function createWallet({ userId, currency }) {
  // Implementation
}
```

### Error Handling

Always handle errors appropriately:

```javascript
try {
  const result = await someOperation();
  return result;
} catch (error) {
  logger.error('Operation failed:', error);
  throw new Error('User-friendly error message');
}
```

### Testing

- Write tests for all new features
- Aim for >80% code coverage
- Use descriptive test names
- Test both success and failure cases

Example:

```javascript
describe('WalletService', () => {
  describe('createWallet', () => {
    it('should create wallet with valid parameters', async () => {
      const wallet = await walletService.createWallet({
        userId: 'user-123',
        currency: 'USD'
      });
      expect(wallet).toHaveProperty('id');
      expect(wallet.currency).toBe('USD');
    });

    it('should throw error for duplicate wallet', async () => {
      await walletService.createWallet({ userId: 'user-123' });
      await expect(
        walletService.createWallet({ userId: 'user-123' })
      ).rejects.toThrow('User already has a wallet');
    });
  });
});
```

## Commit Guidelines

Write clear, meaningful commit messages:

```
feat: Add Apple Pay support for wallet funding
fix: Correct balance calculation in transfer
docs: Update API documentation for refunds
test: Add integration tests for mobile payments
refactor: Simplify token validation logic
```

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `chore`: Maintenance tasks

## Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for new functions
- Update API documentation in `/docs`
- Include code examples where helpful

## Security

- Never commit sensitive data (keys, passwords)
- Use environment variables for secrets
- Follow security best practices
- Report security issues privately to maintainers

## Review Process

All submissions require review. We aim to:

- Review PRs within 2-3 business days
- Provide constructive feedback
- Work with you to address any issues
- Merge high-quality contributions promptly

## Getting Help

- **GitHub Issues**: For bugs and features
- **Discussions**: For questions and ideas
- **Discord**: For real-time chat (link in README)
- **Email**: support@openwallet.dev

## Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Don't hesitate to ask questions in Issues or Discussions. We're here to help!

---

Thank you for contributing to Open Wallet! 🎉
