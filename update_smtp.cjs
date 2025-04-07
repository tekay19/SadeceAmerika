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

    // Geçerli SMTP ayarlarını al
    const currentSettings = await client.query("SELECT * FROM settings WHERE category = 'email'");
    console.log('Current SMTP settings:');
    console.log(JSON.stringify(currentSettings.rows, null, 2));
    
    // SMTP ayarlarını güncelle
    const updates = [
      {id: 4, value: 'smtp.office365.com'},
      {id: 5, value: '587'},
      {id: 6, value: 'noreply@sadeceamerika.com'},
      {id: 7, value: 'GercekEmailSifresi123!'}
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