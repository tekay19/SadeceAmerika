// MySQL Bağlantı Test Aracı
require('dotenv').config();
const mysql = require('mysql2/promise');

async function testMySQLConnection() {
  console.log('MySQL bağlantısı test ediliyor...');
  console.log('Ortam değişkenleri:');
  console.log('DB_HOST: ' + (process.env.DB_HOST ? '✓' : '✗'));
  console.log('DB_USER: ' + (process.env.DB_USER ? '✓' : '✗'));
  console.log('DB_PASSWORD: ' + (process.env.DB_PASSWORD ? '✓' : '✗'));
  console.log('DB_NAME: ' + (process.env.DB_NAME ? '✓' : '✗'));
  
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'visa_app',
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
    connectTimeout: 10000, // 10 saniye bağlantı zaman aşımı
    charset: 'utf8mb4' // Türkçe karakter desteği
  });
  
  try {
    console.log('Bağlantı kurulmaya çalışılıyor...');
    const connection = await pool.getConnection();
    console.log('✅ MySQL bağlantısı BAŞARILI!');
    
    console.log('Veritabanı bilgileri:');
    const [rows] = await connection.query('SELECT VERSION() as version');
    console.log('MySQL versiyonu:', rows[0].version);
    
    console.log('Tablo listesi alınıyor...');
    const [tables] = await connection.query('SHOW TABLES');
    
    if (tables.length === 0) {
      console.log('Veritabanında hiç tablo bulunamadı.');
      console.log('Lütfen önce "node mysql-setup.js" komutunu çalıştırın.');
    } else {
      console.log('Veritabanındaki tablolar:');
      tables.forEach((table, index) => {
        const tableName = Object.values(table)[0];
        console.log(`${index + 1}. ${tableName}`);
      });
      
      // Örnek bir kullanıcı sorgula
      console.log('Kullanıcı tablosunu kontrol ediliyor...');
      const [users] = await connection.query('SELECT COUNT(*) as count FROM users');
      console.log(`Sistemde ${users[0].count} kullanıcı kayıtlı.`);
    }
    
    connection.release();
  } catch (error) {
    console.error('❌ MySQL bağlantısı BAŞARISIZ!');
    console.error('Hata detayı:', error.message);
    
    if (error.message.includes('Access denied')) {
      console.log('🔍 Çözüm önerisi: Kullanıcı adı ve şifrenizi kontrol edin.');
    } else if (error.message.includes('Unknown database')) {
      console.log('🔍 Çözüm önerisi: Veritabanı adını kontrol edin veya veritabanını oluşturun.');
    } else if (error.message.includes('connect ECONNREFUSED')) {
      console.log('🔍 Çözüm önerisi: Host adresini ve port numarasını kontrol edin.');
    }
  } finally {
    await pool.end();
  }
}

testMySQLConnection().catch(error => {
  console.error('Beklenmeyen hata:', error);
});