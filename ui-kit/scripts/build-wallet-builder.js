const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const rootDir = __dirname ? path.resolve(__dirname, '..') : path.resolve('..');
const inputPath = path.join(rootDir, 'src', 'wallet-builder.jsx');
const outputDir = path.join(rootDir, 'dist');
const outputPath = path.join(outputDir, 'wallet-builder.bundle.js');

const buildWalletBuilder = () => {
  const source = fs.readFileSync(inputPath, 'utf8');
  const { code } = babel.transformSync(source, {
    presets: [
      ['@babel/preset-env', { targets: { browsers: 'defaults' } }],
      ['@babel/preset-react', { runtime: 'classic' }],
    ],
    sourceMaps: false,
  });

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, code, 'utf8');
  // eslint-disable-next-line no-console
  console.log(`Wallet builder bundle written to ${path.relative(rootDir, outputPath)}`);
};

buildWalletBuilder();
