import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '@shared/mysql-schema';

// MySQL bağlantı havuzu oluştur
let pool: mysql.Pool;

// Üretim veya geliştirme modunu kontrol et
const isProduction = process.env.NODE_ENV === 'production';

// IS_REPLIT ortamı kontrolü - Replit'te çalışıyor muyuz?
const isReplitEnv = process.env.REPL_ID || process.env.REPL_SLUG;

try {
  if (isProduction) {
    // Üretim modu (Hostinger) - MySQL kullan
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
      console.error('MySQL ortam değişkenleri düzgün tanımlanmamış');
      console.log('Lütfen .env dosyanızda aşağıdaki değişkenleri tanımlayın:');
      console.log('DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
      process.exit(1);
    }

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
  } else if (isReplitEnv) {
    // Replit ortamı - sadece dummy pool oluştur
    // PostgreSQL Replit'te kullanılabilir ama MySQL ile uyumsuz
    // Bu nedenle in-memory storage kullanacağız
    console.log('Replit ortamında çalışıyor - In-Memory depolama kullanılacak');
    
    // Drizzle'ın çökmemesi için minimum gereksinimleri sağlayan bir dummy pool nesnesi
    // @ts-ignore
    pool = {
      getConnection: () => Promise.resolve({ release: () => {} }),
      query: () => Promise.resolve([[], []]),
      execute: () => Promise.resolve([[], []]),
      end: () => Promise.resolve(),
      on: () => {},
      format: () => ""
    } as mysql.Pool;
  } else {
    // Yerel geliştirme ortamı - MySQL'e bağlanmayı dene
    console.log('Yerel geliştirme ortamında çalışıyor - MySQL bağlantısı deneniyor');
    
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
  }
} catch (error) {
  console.error('MySQL havuzu oluşturma hatası:', error);
  // Fallback olarak dummy pool oluştur
  // @ts-ignore
  pool = {
    getConnection: () => Promise.resolve({ release: () => {} }),
    query: () => Promise.resolve([[], []]),
    execute: () => Promise.resolve([[], []]),
    end: () => Promise.resolve(),
    on: () => {},
    format: () => ""
  } as mysql.Pool;
}

// Drizzle nesnesi oluştur
export const db = drizzle(pool, { schema, mode: 'default' });

// Havuzu dışa aktar (düzgün kapatma için)
export { pool };

// Bağlantı durumunu test et (sadece gerçek havuz için)
if (pool.getConnection && !isReplitEnv) {
  pool.getConnection()
    .then(connection => {
      console.log('✅ MySQL veritabanına başarıyla bağlandı');
      connection.release();
    })
    .catch(err => {
      console.warn('⚠️ MySQL bağlantısı sağlanamadı:', err.message);
      if (isProduction) {
        console.error('Üretim ortamında veritabanı bağlantısı olmadan devam edilemez.');
        process.exit(1);
      } else {
        console.log('Geliştirme modunda olduğu için devam ediliyor.');
      }
    });
}