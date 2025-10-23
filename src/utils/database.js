/**
 * Database Connection Utility
 *
 * Handles database connection for MongoDB or PostgreSQL
 */

const mongoose = require('mongoose');
const config = require('../config');
const logger = require('./logger');

let isConnected = false;

async function connectDatabase() {
  if (isConnected) {
    logger.info('Using existing database connection');
    return;
  }

  const dbUrl = config.database.url;

  // Determine database type from URL
  if (dbUrl.startsWith('mongodb')) {
    return connectMongoDB();
  } else if (dbUrl.startsWith('postgres')) {
    return connectPostgreSQL();
  } else {
    throw new Error('Unsupported database type. Use MongoDB or PostgreSQL.');
  }
}

async function connectMongoDB() {
  try {
    await mongoose.connect(config.database.url, config.database.options);

    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connected successfully');
      isConnected = true;
    });

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
      isConnected = false;
    });

    // Load models
    require('../models/wallet');
    require('../models/transaction');
    require('../models/refund');

    return mongoose.connection;
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

async function connectPostgreSQL() {
  const { Pool } = require('pg');

  try {
    const pool = new Pool({
      connectionString: config.database.url,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    });

    // Test connection
    const client = await pool.connect();
    logger.info('PostgreSQL connected successfully');
    client.release();

    isConnected = true;
    return pool;
  } catch (error) {
    logger.error('Failed to connect to PostgreSQL:', error);
    throw error;
  }
}

async function disconnectDatabase() {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.connection.close();
    logger.info('Database disconnected');
    isConnected = false;
  } catch (error) {
    logger.error('Error disconnecting database:', error);
    throw error;
  }
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
  isConnected: () => isConnected
};
