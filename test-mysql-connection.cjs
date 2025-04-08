// MySQL Hızlı Bağlantı Testi
require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('MySQL Hızlı Bağlantı Testi');
  console.log('-------------------------');
  
  // Ortam değişkenlerini kontrol et
  console.log('Ortam Değişkenleri:');
  console.log('DB_HOST:', process.env.DB_HOST || 'tanımlanmamış');
  console.log('DB_USER:', process.env.DB_USER ? '✓ (tanımlı)' : '✗ (tanımsız)');
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '✓ (tanımlı)' : '✗ (tanımsız)');
  console.log('DB_NAME:', process.env.DB_NAME || 'tanımlanmamış');
  console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
  console.log('-------------------------');
  
  try {
    console.log('MySQL bağlantısı oluşturuluyor...');
    
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'visa_app',
      waitForConnections: true,
      connectionLimit: 2,
      queueLimit: 0,
      connectTimeout: 10000,
      charset: 'utf8mb4'
    });
    
    console.log('Bağlantı kuruluyor...');
    const conn = await pool.getConnection();
    console.log('✅ Bağlantı başarılı!');
    
    console.log('Veritabanı bilgileri alınıyor...');
    const [rows] = await conn.query('SELECT VERSION() as version');
    console.log('MySQL Versiyonu:', rows[0].version);
    
    console.log('Mevcut tablolar kontrol ediliyor...');
    const [tables] = await conn.query('SHOW TABLES');
    console.log(`${tables.length} tablo bulundu.`);
    
    if (tables.length > 0) {
      console.log('Tablolar:');
      tables.forEach((table, i) => {
        const tableName = Object.values(table)[0];
        console.log(`  ${i+1}. ${tableName}`);
      });
    } else {
      console.log('Veritabanı boş. mysql-setup.js ile tabloları oluşturun.');
    }
    
    conn.release();
    await pool.end();
    console.log('Bağlantı kapatıldı.');
    
  } catch (error) {
    console.error('❌ MySQL bağlantı hatası:', error.message);
    
    if (error.message.includes('Access denied')) {
      console.log('🔍 Kullanıcı adı veya şifre hatalı olabilir.');
    } else if (error.message.includes('Unknown database')) {
      console.log('🔍 Veritabanı bulunamadı, oluşturmanız gerekebilir.');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('🔍 MySQL sunucusuna bağlanılamadı, çalıştığından emin olun.');
    }
  }
}

testConnection();