/**
 * Open Wallet - Main Entry Point
 *
 * A secure, tokenized mobile wallet system optimized for vault transactions.
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const { connectDatabase } = require('./utils/database');
const logger = require('./utils/logger');

// Import routes
const walletRoutes = require('./routes/wallet');
const paymentRoutes = require('./routes/payment');
const transactionRoutes = require('./routes/transaction');
const adminRoutes = require('./routes/admin');

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet());
app.use(cors(config.cors));

// Rate limiting
const limiter = rateLimit(config.rateLimit);
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: require('../package.json').version
  });
});

// API routes
app.use('/api/v1/wallet', walletRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/transaction', transactionRoutes);
app.use('/api/v1/admin', adminRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Open Wallet API',
    version: require('../package.json').version,
    description: 'A secure, tokenized mobile wallet system',
    documentation: 'https://github.com/ThomasC3/open-wallet#readme'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);

  const statusCode = err.statusCode || 500;
  const message = config.server.nodeEnv === 'production' && statusCode === 500
    ? 'Internal server error'
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(config.server.nodeEnv === 'development' && { stack: err.stack })
  });
});

// Start server
async function start() {
  try {
    // Connect to database
    await connectDatabase();
    logger.info('Database connected successfully');

    // Start listening
    const server = app.listen(config.server.port, config.server.host, () => {
      logger.info(`Open Wallet API running on ${config.server.host}:${config.server.port}`);
      logger.info(`Environment: ${config.server.nodeEnv}`);
      logger.info(`API Base URL: ${config.server.baseUrl}`);
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      logger.info(`${signal} received, shutting down gracefully`);

      server.close(async () => {
        logger.info('HTTP server closed');

        // Close database connection
        try {
          const mongoose = require('mongoose');
          await mongoose.connection.close();
          logger.info('Database connection closed');
        } catch (error) {
          logger.error('Error closing database:', error);
        }

        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
if (require.main === module) {
  start();
}

module.exports = app;
