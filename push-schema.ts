import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
import * as schema from './shared/schema';

async function main() {
  console.log('Setting up database connection...');
  
  const { Pool } = pg;
  
  // Create a PostgreSQL connection pool
  const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || '5432'),
    database: process.env.PGDATABASE,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    console.log('Connecting to database...');
    await pool.query('SELECT 1');
    console.log('Connected to database!');
    
    const db = drizzle(pool, { schema });
    
    console.log('Creating database schema...');
    
    // Create schema manually for each table
    console.log('Creating users table...');
    // Create role enum if it doesn't exist
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role') THEN
          CREATE TYPE role AS ENUM ('user', 'officer', 'admin');
        END IF;
      END $$;
    `);
    
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        role role NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      );
    `);
    
    console.log('Creating visa_types table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS visa_types (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        requirements TEXT,
        processing_time VARCHAR(100),
        fee DECIMAL
      );
    `);
    
    console.log('Creating application status enum...');
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status') THEN
          CREATE TYPE status AS ENUM (
            'pending', 'reviewing', 'approved', 'rejected', 'completed',
            'documents_pending', 'documents_reviewing', 'documents_approved',
            'additional_documents_required', 'appointment_scheduled', 'submitted'
          );
        END IF;
      END $$;
    `);
    
    console.log('Creating applications table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        visa_type_id INTEGER NOT NULL REFERENCES visa_types(id),
        status status NOT NULL DEFAULT 'pending',
        submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        notes TEXT,
        assigned_officer_id INTEGER REFERENCES users(id),
        personal_info JSONB,
        travel_info JSONB,
        additional_info JSONB
      );
    `);
    
    console.log('Creating document status enum...');
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'document_status') THEN
          CREATE TYPE document_status AS ENUM ('pending', 'approved', 'rejected');
        END IF;
      END $$;
    `);
    
    console.log('Creating documents table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        application_id INTEGER NOT NULL REFERENCES applications(id),
        name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status document_status NOT NULL DEFAULT 'pending',
        notes TEXT
      );
    `);
    
    console.log('Creating appointment status enum...');
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_status') THEN
          CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'canceled', 'rescheduled');
        END IF;
      END $$;
    `);
    
    console.log('Creating appointments table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        application_id INTEGER NOT NULL REFERENCES applications(id),
        date TIMESTAMP NOT NULL,
        location VARCHAR(255) NOT NULL,
        status appointment_status NOT NULL DEFAULT 'scheduled',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Creating feedback table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        content TEXT NOT NULL,
        rating INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Creating admin_logs table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_logs (
        id SERIAL PRIMARY KEY,
        admin_id INTEGER NOT NULL REFERENCES users(id),
        action VARCHAR(255) NOT NULL,
        target_type VARCHAR(100) NOT NULL,
        target_id INTEGER,
        details TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Creating settings category enum...');
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'settings_category') THEN
          CREATE TYPE settings_category AS ENUM ('general', 'email', 'security', 'logging');
        END IF;
      END $$;
    `);
    
    console.log('Creating settings table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) NOT NULL UNIQUE,
        value TEXT NOT NULL,
        description TEXT,
        category settings_category NOT NULL DEFAULT 'general'
      );
    `);
    
    console.log('Creating contact status enum...');
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'contact_status') THEN
          CREATE TYPE contact_status AS ENUM ('new', 'in_progress', 'completed');
        END IF;
      END $$;
    `);
    
    console.log('Creating contacts table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status contact_status NOT NULL DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        assigned_to_id INTEGER REFERENCES users(id),
        response_notes TEXT
      );
    `);
    
    console.log('Database schema created successfully!');
    
    // Note: Database schema has been successfully created.
    // Initial data population will be handled by the application on startup.
    
  } catch (error) {
    console.error('Error creating database schema:', error);
    throw error;
  } finally {
    console.log('Closing database connection...');
    await pool.end();
  }
}

main().catch(console.error);