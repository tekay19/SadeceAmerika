import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '@shared/mysql-schema';

// MySQL bağlantı havuzu oluştur
let pool: mysql.Pool;

try {
  // Üretim veya geliştirme modunu kontrol et
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    // Üretim modu - MySQL kullan
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
      console.error('MySQL ortam değişkenleri düzgün tanımlanmamış');
      console.log('Lütfen .env dosyanızda aşağıdaki değişkenleri tanımlayın:');
      console.log('DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
      process.exit(1);
    }

    // Üretim için MySQL bağlantı havuzu oluştur
    console.log('MySQL veritabanına bağlanılıyor (Üretim modu)');
    
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: 'utf8mb4', // Türkçe karakterler için
      connectTimeout: 30000, // 30 saniye bağlantı zaman aşımı
      timezone: '+03:00' // Türkiye saat dilimi
    });
  } else {
    // Geliştirme modu
    console.log('Geliştirme modunda çalışıyor');
    
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'visa_app',
      waitForConnections: true,
      connectionLimit: 2,
      queueLimit: 0,
      connectTimeout: 10000, // Bağlantı zaman aşımını artır (10 saniye)
      charset: 'utf8mb4' // Türkçe karakter desteği
    });
    
    console.log('MySQL bağlantı havuzu oluşturuldu.');
  }
} catch (error) {
  console.error('MySQL havuzu oluşturma hatası:', error);
  // Fallback olarak dummy pool oluştur, böylece uygulama çökmeyecek
  pool = {} as mysql.Pool;
}

// Drizzle nesnesi oluştur
export const db = drizzle(pool, { schema, mode: 'default' });

// Havuzu dışa aktar (düzgün kapatma için)
export { pool };

// Bağlantı durumunu test et (non-blocking)
if (pool.getConnection) {
  pool.getConnection()
    .then(connection => {
      console.log('✅ MySQL veritabanına başarıyla bağlandı');
      connection.release();
    })
    .catch(err => {
      console.warn('⚠️ MySQL bağlantısı sağlanamadı:', err.message);
      if (process.env.NODE_ENV === 'production') {
        console.error('Üretim ortamında veritabanı bağlantısı olmadan devam edilemez.');
        process.exit(1);
      } else {
        console.log('Geliştirme modunda olduğu için devam ediliyor.');
      }
    });
}