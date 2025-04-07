const { Client } = require('pg');

async function main() {
  // DATABASE_URL çevre değişkenini kullan
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // SMTP ayarlarını güncelle
    const updates = [
      {id: 4, value: 'smtp.mailgun.org'},
      {id: 5, value: '465'},
      {id: 6, value: 'postmaster@yourdomain.com'},
      {id: 7, value: 'your-secure-password'}
    ];
    
    for (const update of updates) {
      await client.query('UPDATE settings SET value = $1 WHERE id = $2', [update.value, update.id]);
      console.log(`Updated setting ID ${update.id} to ${update.value}`);
    }
    
    // Güncellenmiş ayarları al
    const result = await client.query("SELECT * FROM settings WHERE category = 'email'");
    console.log('Updated SMTP settings:');
    console.log(JSON.stringify(result.rows, null, 2));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
    console.log('Connection closed');
  }
}

main();