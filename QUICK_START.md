# Quick Start Guide

## Deploy to GitHub (Fastest Method)

```bash
cd ~/Desktop/open-wallet
./DEPLOY.sh
```

This script will:
1. Create the GitHub repository (if needed)
2. Configure git remote
3. Push all code to GitHub
4. Create v1.0.0 release tag
5. Generate GitHub release

## Manual Deployment

If you prefer manual control:

```bash
cd ~/Desktop/open-wallet

# 1. Create GitHub repository
gh repo create ThomasC3/open-wallet --public \
  --description "A secure, tokenized mobile wallet system optimized for vault transactions"

# 2. Add remote
git remote add origin https://github.com/ThomasC3/open-wallet.git

# 3. Push code
git push -u origin main

# 4. Create release
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0

# 5. Create GitHub release
gh release create v1.0.0 \
  --title "Open Wallet v1.0.0" \
  --notes "Initial release with complete wallet infrastructure"
```

## After Deployment

1. Visit: https://github.com/ThomasC3/open-wallet
2. Add topics: wallet, payment, tokenization, apple-pay, google-pay, etc.
3. Enable Discussions (Settings > Features)
4. Configure branch protection (Settings > Branches)

## Documentation

- **README.md** - Main project documentation
- **DEPLOYMENT.md** - Complete deployment guide
- **ARCHITECTURE.md** - Technical architecture
- **CONTRIBUTING.md** - Contribution guidelines
- **GITHUB_DEPLOYMENT_INSTRUCTIONS.md** - Detailed GitHub setup

## Test Locally

```bash
cd ~/Desktop/open-wallet

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start development server
npm run dev
```

## Need Help?

See PROJECT_COMPLETE.md for complete project overview.
