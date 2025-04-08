import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '@shared/mysql-schema';

const isProduction = process.env.NODE_ENV === 'production';
let pool: mysql.Pool;

// Geliştirme ortamında mı, yoksa üretim ortamında mı olduğumuzu kontrol et
if (isProduction) {
  // Üretim modu - MySQL kullan
  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    console.error('MySQL ortam değişkenleri düzgün tanımlanmamış');
    console.log('Lütfen .env dosyanızda aşağıdaki değişkenleri tanımlayın:');
    console.log('DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
    process.exit(1);
  }

  // Üretim için MySQL bağlantı havuzu oluştur
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4' // Türkçe karakterler için
  });
  
  console.log('MySQL veritabanına bağlanılıyor (Üretim modu)');
  
  // Üretim modunda bağlantıyı test et
  pool.getConnection()
    .then(connection => {
      console.log('MySQL veritabanına bağlandı');
      connection.release();
    })
    .catch(err => {
      console.error('MySQL bağlantısında hata:', err);
      console.error('Veritabanı bağlantısı olmadan devam edilemez.');
      process.exit(-1);
    });
} else {
  // Geliştirme modu - in-memory veritabanı kullan
  console.log('Geliştirme modunda çalışıyor - bellek içi veri saklama kullanılacak');
  
  // Geliştirme için test MySQL bağlantı havuzu
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'visa_app',
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0
  });
  
  // Geliştirme modunda bağlantı hatası olsa bile devam et
  pool.getConnection()
    .then(connection => {
      console.log('MySQL veritabanına başarıyla bağlandı');
      connection.release();
    })
    .catch(err => {
      console.warn('MySQL bağlantısında hata, ancak geliştirme modunda olduğu için devam ediliyor:', err.message);
      console.log('Not: Geliştirme modunda bellek içi veri saklama kullanılacak');
    });
}

// Drizzle nesnesi oluştur
export const db = drizzle(pool, { schema, mode: 'default' });

// Havuzu dışa aktar (düzgün kapatma için)
export { pool };