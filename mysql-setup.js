// MySQL kurulum betiği
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const pool = await mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'visa_app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  console.log('MySQL bağlantısı kuruluyor...');
  
  try {
    console.log('Tabloları oluşturma başlıyor...');
    
    // Enum tabloları oluştur
    await pool.query(`
      CREATE TABLE IF NOT EXISTS role_enum (
        value VARCHAR(10) NOT NULL PRIMARY KEY
      );
      INSERT IGNORE INTO role_enum (value) VALUES ('user'), ('officer'), ('admin');
    `);
    
    // Kullanıcılar tablosu
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(100),
        role VARCHAR(10) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (role) REFERENCES role_enum(value)
      );
    `);
    
    // Vize türleri tablosu
    await pool.query(`
      CREATE TABLE IF NOT EXISTS visa_types (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        requirements TEXT NOT NULL,
        processing_time VARCHAR(100) NOT NULL
      );
    `);
    
    // Durum enum tabloları
    await pool.query(`
      CREATE TABLE IF NOT EXISTS status_enum (
        value VARCHAR(20) NOT NULL PRIMARY KEY
      );
      INSERT IGNORE INTO status_enum (value) VALUES 
        ('pending'), ('reviewing'), ('approved'), ('rejected'), ('completed');
        
      CREATE TABLE IF NOT EXISTS document_status_enum (
        value VARCHAR(10) NOT NULL PRIMARY KEY
      );
      INSERT IGNORE INTO document_status_enum (value) VALUES 
        ('pending'), ('approved'), ('rejected');
        
      CREATE TABLE IF NOT EXISTS appointment_status_enum (
        value VARCHAR(15) NOT NULL PRIMARY KEY
      );
      INSERT IGNORE INTO appointment_status_enum (value) VALUES 
        ('scheduled'), ('completed'), ('cancelled');
        
      CREATE TABLE IF NOT EXISTS settings_category_enum (
        value VARCHAR(10) NOT NULL PRIMARY KEY
      );
      INSERT IGNORE INTO settings_category_enum (value) VALUES 
        ('general'), ('email'), ('security'), ('logging');
        
      CREATE TABLE IF NOT EXISTS contact_status_enum (
        value VARCHAR(15) NOT NULL PRIMARY KEY
      );
      INSERT IGNORE INTO contact_status_enum (value) VALUES 
        ('new'), ('in_progress'), ('completed');
    `);
    
    // Uygulama tablosu
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        visa_type_id INT NOT NULL,
        application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        notes TEXT,
        assigned_officer_id INT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        age INT,
        phone VARCHAR(100),
        occupation VARCHAR(255),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (visa_type_id) REFERENCES visa_types(id),
        FOREIGN KEY (assigned_officer_id) REFERENCES users(id),
        FOREIGN KEY (status) REFERENCES status_enum(value)
      );
    `);
    
    // Belge tablosu
    await pool.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        application_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        file_path VARCHAR(255) NOT NULL,
        upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(10) NOT NULL DEFAULT 'pending',
        notes TEXT,
        FOREIGN KEY (application_id) REFERENCES applications(id),
        FOREIGN KEY (status) REFERENCES document_status_enum(value)
      );
    `);
    
    // Randevular tablosu
    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        application_id INT NOT NULL,
        date TIMESTAMP NOT NULL,
        time VARCHAR(10) NOT NULL,
        location VARCHAR(255) NOT NULL,
        purpose VARCHAR(255) NOT NULL,
        status VARCHAR(15) NOT NULL DEFAULT 'scheduled',
        FOREIGN KEY (application_id) REFERENCES applications(id),
        FOREIGN KEY (status) REFERENCES appointment_status_enum(value)
      );
    `);
    
    // Geri bildirim tablosu
    await pool.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        rating INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    
    // Admin logları tablosu
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        action VARCHAR(255) NOT NULL,
        details TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    
    // Ayarlar tablosu
    await pool.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(10) NOT NULL,
        \`key\` VARCHAR(255) NOT NULL,
        value TEXT NOT NULL,
        description TEXT,
        FOREIGN KEY (category) REFERENCES settings_category_enum(value),
        UNIQUE KEY (\`key\`)
      );
    `);
    
    // İletişim tablosu
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(15) NOT NULL DEFAULT 'new',
        assigned_to_id INT,
        response_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (status) REFERENCES contact_status_enum(value),
        FOREIGN KEY (assigned_to_id) REFERENCES users(id)
      );
    `);
    
    // Giriş doğrulama kodları tablosu
    await pool.query(`
      CREATE TABLE IF NOT EXISTS login_verification_codes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        email VARCHAR(255) NOT NULL,
        code VARCHAR(10) NOT NULL,
        is_used BOOLEAN NOT NULL DEFAULT FALSE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    
    // Şifre sıfırlama tokenları tablosu
    await pool.query(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(255) NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    
    // Oturum tablosu
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        sid VARCHAR(255) NOT NULL PRIMARY KEY,
        expires DATETIME NOT NULL,
        data TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    
    console.log('MySQL tabloları başarıyla oluşturuldu!');
    
  } catch (error) {
    console.error('MySQL tabloları oluşturulurken hata:', error);
    console.error(error.stack);
  } finally {
    await pool.end();
    console.log('MySQL bağlantısı kapatıldı.');
  }
}

// Run the main function
main().catch(error => {
  console.error('Error in main function:', error);
  process.exit(1);
});