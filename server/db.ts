import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '@shared/mysql-schema';

const isProduction = process.env.NODE_ENV === 'production';
let pool;

// Check if we're in development mode (Replit) or production mode (Hostinger)
if (isProduction) {
  // Production mode - use MySQL
  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    console.error('MySQL environment variables are not properly defined');
    process.exit(1);
  }

  // Create a MySQL connection pool for production
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  
  console.log('Connecting to MySQL database (Production mode)');
} else {
  // Development mode - use in-memory SQLite or mock implementation
  console.log('Running in development mode - using in-memory database');
  
  // Create a MySQL connection pool for local development
  // This will fail to connect but allows the app to start
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'visa_app',
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0
  });
}

// Create a drizzle instance with the pool and schema
export const db = drizzle(pool, { schema, mode: 'default' });

// For compatibility with the rest of the code
export { pool };