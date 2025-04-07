// Şifre sıfırlama ve token yönetimi

import crypto from 'crypto';
import { promisify } from 'util';

// Redis kullanmak yerine basit bir in-memory çözüm oluşturuyoruz
// Gerçek bir uygulama için Redis veya veritabanında token saklama önerilir
const tokenStore: Map<string, { userId: number, expires: Date }> = new Map();

// Debug için token store durumunu yazdır
function logTokenStore() {
  console.log("Current token store:");
  tokenStore.forEach((value, key) => {
    console.log(`Token: ${key.substring(0, 8)}... UserID: ${value.userId}, Expires: ${value.expires}`);
  });
}

const randomBytes = promisify(crypto.randomBytes);

// Şifre sıfırlama tokeni oluşturur
export async function generatePasswordResetToken(userId: number): Promise<string> {
  // Rastgele token oluştur
  const buffer = await randomBytes(32);
  const token = buffer.toString('hex');
  
  // Tokenın geçerlilik süresini belirle (1 saat)
  const expires = new Date();
  expires.setHours(expires.getHours() + 1);
  
  // Tokeni sakla
  tokenStore.set(token, { userId, expires });
  
  // Debug için token store durumunu yazdır
  console.log(`Generated password reset token for user ${userId}: ${token.substring(0, 8)}...`);
  logTokenStore();
  
  // Tokeni döndür
  return token;
}

// Tokenı doğrula ve geçerliyse kullanıcı ID'sini döndür
export async function verifyPasswordResetToken(token: string): Promise<number | null> {
  console.log(`Attempting to verify token: ${token.substring(0, 8)}...`);
  logTokenStore();
  
  const storedToken = tokenStore.get(token);
  
  // Token bulunamadıysa veya süresi dolmuşsa null döndür
  if (!storedToken) {
    console.log(`Token not found: ${token.substring(0, 8)}...`);
    return null;
  }
  
  if (storedToken.expires < new Date()) {
    console.log(`Token expired: ${token.substring(0, 8)}... Expiry: ${storedToken.expires}`);
    return null;
  }
  
  console.log(`Valid token found for user ID: ${storedToken.userId}`);
  return storedToken.userId;
}

// Kullanılan veya geçersiz tokeni sil
export async function deletePasswordResetToken(token: string): Promise<boolean> {
  console.log(`Deleting token: ${token.substring(0, 8)}...`);
  const result = tokenStore.delete(token);
  console.log(`Token deleted: ${result}`);
  logTokenStore();
  return result;
}