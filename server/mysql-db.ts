import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '@shared/schema';

// Ortam değişkenlerini kontrol et
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.error('MySQL ortam değişkenleri düzgün tanımlanmamış');
  console.log('Lütfen .env dosyanızda aşağıdaki değişkenleri tanımlayın:');
  console.log('DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
  process.exit(1);
}

// MySQL bağlantı havuzu oluştur
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4' // Türkçe karakterler için
});

// Bağlantı testini yap
pool.getConnection()
  .then(connection => {
    console.log('MySQL veritabanına bağlandı');
    connection.release();
  })
  .catch(err => {
    console.error('MySQL bağlantısında hata:', err);
    process.exit(-1);
  });

// Drizzle nesnesi oluştur
export const db = drizzle(pool, { schema, mode: 'default' });

// Havuzu dışa aktar (düzgün kapatma için)
export { pool };