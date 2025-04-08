import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '@shared/schema';

// Check if necessary MySQL env variables are defined
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.error('MySQL environment variables are not properly defined');
  process.exit(1);
}

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Log database connection
console.log('Connecting to MySQL database');

// Create a drizzle instance with the pool and schema
export const db = drizzle(pool, { schema, mode: 'default' });

// For compatibility with the rest of the code
export { pool };