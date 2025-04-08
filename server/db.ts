import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '@shared/mysql-schema';

// Üretim veya geliştirme modunu kontrol et
const isProduction = process.env.NODE_ENV === 'production';
const isReplitEnv = process.env.REPL_ID || process.env.REPL_SLUG;

// MySQL bağlantı havuzu
let pool;

try {
  if (isProduction) {
    // Üretim modu - Hostinger ortamında MySQL bağlantısı
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
      console.error('MySQL bağlantı bilgileri eksik. Aşağıdaki çevre değişkenleri gerekli:');
      console.error('DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
      process.exit(1);
    }
    
    console.log('MySQL veritabanına bağlanılıyor (Üretim modu)');
    
    // Üretim için MySQL havuzu oluştur
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: 'utf8mb4', // Türkçe karakter desteği
      timezone: '+03:00'  // Türkiye zaman dilimi
    });
  } else {
    // Geliştirme modu (Replit veya lokal)
    console.log('Geliştirme modunda MySQL yapılandırması');
    
    // Geliştirme için MySQL havuzu - ya lokal veritabanı ya da in-memory
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'visa_app',
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      charset: 'utf8mb4'
    });
  }
  
  // Bağlantıyı test et
  console.log('MySQL bağlantısı test ediliyor...');
  pool.query('SELECT 1').then(() => {
    console.log('✅ MySQL veritabanına başarıyla bağlandı');
  }).catch(err => {
    console.warn(`⚠️ MySQL bağlantısı kurulamadı: ${err.message}`);
    
    if (isProduction) {
      console.error('Üretim ortamında veritabanı bağlantısı olmadan devam edilemez.');
      process.exit(1);
    } else {
      console.log('Geliştirme modunda in-memory depolama kullanılacak.');
    }
  });
  
} catch (error) {
  console.error('MySQL bağlantı havuzu oluşturma hatası:', error);
  
  if (isProduction) {
    console.error('Üretim ortamında veritabanı bağlantısı olmadan devam edilemez.');
    process.exit(1);
  } else {
    console.warn('Geliştirme modunda in-memory depolama kullanılacak.');
  }
}

// Drizzle ORM örneğini oluştur
export const db = pool ? drizzle(pool, { schema, mode: 'default' }) : null;

// Havuzu dışa aktar (kontrollü kapatma için)
export { pool };