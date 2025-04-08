// Hostinger Deployment Script
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Log fonksiyonu
function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

// MySQL kurulumunu kontrol et
function checkMySQLEnvironment() {
  log('MySQL ortam değişkenleri kontrol ediliyor...');
  
  const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    log(`HATA: Aşağıdaki MySQL değişkenleri eksik: ${missingVars.join(', ')}`);
    log('.env dosyanızda bu değişkenleri tanımladığınızdan emin olun.');
    process.exit(1);
  }
  
  log('MySQL ortam değişkenleri doğru şekilde ayarlanmış.');
  return true;
}

// Veri klasörlerini oluştur
function createDataDirectories() {
  log('Veri klasörleri oluşturuluyor...');
  
  const dirs = ['./uploads'];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      log(`Klasör oluşturuldu: ${dir}`);
    } else {
      log(`Klasör zaten mevcut: ${dir}`);
    }
  });
}

// MySQL veritabanı kurulumunu yap
function setupMySQLDatabase() {
  log('MySQL veritabanı yapılandırılıyor...');
  
  try {
    log('mysql-setup.cjs çalıştırılıyor...');
    execSync('node mysql-setup.cjs', { stdio: 'inherit' });
    log('MySQL veritabanı başarıyla kuruldu.');
  } catch (error) {
    log('MySQL kurulumu sırasında hata oluştu:');
    console.error(error);
    process.exit(1);
  }
}

// Uygulama derleme ve başlatma
function buildAndStartApp() {
  log('Uygulama derleniyor ve başlatılıyor...');
  
  try {
    // Derle
    log('npm run build komutu çalıştırılıyor...');
    execSync('npm run build', { stdio: 'inherit' });
    log('Uygulama başarıyla derlendi.');
    
    // Başlat
    log('Uygulama başlatılıyor...');
    log('npm start komutunu NODE_ENV=production olarak çalıştırabilirsiniz.');
  } catch (error) {
    log('Derleme sırasında hata oluştu:');
    console.error(error);
    process.exit(1);
  }
}

// Ana fonksiyon
async function main() {
  log('Hostinger deployment süreci başlatılıyor...');
  
  // MySQL ortam değişkenlerini kontrol et
  checkMySQLEnvironment();
  
  // Veri klasörlerini oluştur
  createDataDirectories();
  
  // MySQL veritabanını kur
  setupMySQLDatabase();
  
  // Uygulamayı derle ve başlat
  buildAndStartApp();
  
  log('Deployment süreci tamamlandı!');
  log('Hostinger kontrol panelinden Node.js uygulamasını yapılandırmayı unutmayın.');
  log('Detaylı bilgi için hostinger-deploy-readme.md dosyasına bakın.');
}

// Çalıştır
main().catch(error => {
  log('Deployment sırasında beklenmeyen hata:');
  console.error(error);
  process.exit(1);
});