const { Client } = require('pg');

async function main() {
  // Doğrudan bağlantı bilgilerini kullan
  const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT),
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Password reset tokens tablosunu oluştur
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        token TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    
    await client.query(createTableQuery);
    console.log('Password reset tokens table created or already exists');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
    console.log('Connection closed');
  }
}

main();