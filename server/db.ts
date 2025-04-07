import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from '@shared/schema';

const { Pool } = pg;

// Check if necessary PostgreSQL env variables are defined
if (!process.env.PGUSER || !process.env.PGPASSWORD || !process.env.PGHOST || !process.env.PGPORT || !process.env.PGDATABASE) {
  console.error('PostgreSQL environment variables are not properly defined');
  process.exit(1);
}

// Create a PostgreSQL connection pool - use direct connection params instead of URL
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT),
  database: process.env.PGDATABASE,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection
  ssl: { rejectUnauthorized: false } // SSL required but don't reject unauthorized
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