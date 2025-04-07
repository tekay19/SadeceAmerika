import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from '@shared/schema';

const { Pool } = pg;

// Replit'in yerleşik veritabanı bağlantısını kullanıyoruz
const pool = new Pool({
  // Replit tarafından otomatik olarak ayarlanan ortam değişkenlerini kullanıyoruz
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || '5432'),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 5000 // How long to wait for a connection
});

// Log when pool connects or has an error
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

// Create a drizzle instance with the pool and schema
export const db = drizzle(pool, { schema });

// Export the pool to allow graceful shutdown
export { pool };