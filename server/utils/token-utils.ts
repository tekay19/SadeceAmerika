// Şifre sıfırlama ve token yönetimi

import crypto from 'crypto';
import { promisify } from 'util';

// Redis kullanmak yerine basit bir in-memory çözüm oluşturuyoruz
// Gerçek bir uygulama için Redis veya veritabanında token saklama önerilir
const tokenStore: Map<string, { userId: number, expires: Date }> = new Map();

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
  
  // Tokeni döndür
  return token;
}

// Tokenı doğrula ve geçerliyse kullanıcı ID'sini döndür
export async function verifyPasswordResetToken(token: string): Promise<number | null> {
  const storedToken = tokenStore.get(token);
  
  // Token bulunamadıysa veya süresi dolmuşsa null döndür
  if (!storedToken || storedToken.expires < new Date()) {
    return null;
  }
  
  return storedToken.userId;
}

// Kullanılan veya geçersiz tokeni sil
export async function deletePasswordResetToken(token: string): Promise<boolean> {
  return tokenStore.delete(token);
}