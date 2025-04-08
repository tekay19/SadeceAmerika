import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './shared/schema';

async function main() {
  console.log('Setting up database connection...');
  
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
  
  try {
    console.log('Connecting to database...');
    const [result] = await pool.query('SELECT 1');
    console.log('Connected to database!');
    
    const db = drizzle(pool, { schema, mode: 'default' });
    
    console.log('Creating database schema...');
    
    // Create schema manually for each table
    console.log('Creating users table...');
    
    // Create users table with ENUM for role
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        role ENUM('user', 'officer', 'admin') NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Creating visa_types table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS visa_types (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        requirements TEXT NOT NULL,
        processing_time VARCHAR(100) NOT NULL
      );
    `);
    
    // Create password reset tokens table
    console.log('Creating password reset tokens table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(255) NOT NULL UNIQUE,
        expires_at DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    
    // Create login verification codes table
    console.log('Creating login verification codes table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS login_verification_codes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        email VARCHAR(255) NOT NULL,
        code VARCHAR(100) NOT NULL,
        is_used BOOLEAN NOT NULL DEFAULT FALSE,
        expires_at DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    
    console.log('Creating applications table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        visa_type_id INT NOT NULL,
        status ENUM('pending', 'reviewing', 'approved', 'rejected', 'completed') NOT NULL DEFAULT 'pending',
        application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        notes TEXT,
        assigned_officer_id INT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        age INT,
        phone VARCHAR(100),
        occupation VARCHAR(255),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (visa_type_id) REFERENCES visa_types(id),
        FOREIGN KEY (assigned_officer_id) REFERENCES users(id)
      );
    `);
    
    console.log('Creating documents table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        application_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
        notes TEXT,
        FOREIGN KEY (application_id) REFERENCES applications(id)
      );
    `);
    
    console.log('Creating appointments table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        application_id INT NOT NULL,
        date DATETIME NOT NULL,
        time VARCHAR(50) NOT NULL,
        location VARCHAR(255) NOT NULL,
        purpose VARCHAR(255) NOT NULL,
        status ENUM('scheduled', 'completed', 'cancelled') NOT NULL DEFAULT 'scheduled',
        FOREIGN KEY (application_id) REFERENCES applications(id)
      );
    `);
    
    console.log('Creating feedback table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        rating INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    
    console.log('Creating admin_logs table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        action VARCHAR(255) NOT NULL,
        details TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    
    console.log('Creating settings table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category ENUM('general', 'email', 'security', 'logging') NOT NULL DEFAULT 'general',
        \`key\` VARCHAR(255) NOT NULL UNIQUE,
        value TEXT NOT NULL,
        description TEXT
      );
    `);
    
    console.log('Creating contacts table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status ENUM('new', 'in_progress', 'completed') NOT NULL DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        assigned_to_id INT,
        response_notes TEXT,
        FOREIGN KEY (assigned_to_id) REFERENCES users(id)
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