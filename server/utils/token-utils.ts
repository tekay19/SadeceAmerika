import { db } from '../db';
import { randomBytes } from 'crypto';
import { passwordResetTokens } from '../../shared/schema';
import { eq } from 'drizzle-orm';

/**
 * Şifre sıfırlama için token üretir ve veritabanında saklar
 * @param userId Kullanıcı ID
 * @returns Oluşturulan token
 */
export async function generatePasswordResetToken(userId: number): Promise<string> {
  try {
    // Rastgele bir token oluştur
    const token = randomBytes(32).toString('hex');
    
    // Mevcut tokenları sil (her kullanıcının sadece bir tane aktif tokeni olabilir)
    await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, userId));
    
    // Token son kullanma tarihini belirle (1 saat)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    
    // Tokeni veritabanına kaydet
    await db.insert(passwordResetTokens).values({
      userId,
      token,
      expiresAt,
      createdAt: new Date()
    });
    
    return token;
  } catch (error) {
    console.error('Token oluşturma hatası:', error);
    throw new Error('Şifre sıfırlama tokeni oluşturulamadı');
  }
}

/**
 * Şifre sıfırlama tokenını doğrular
 * @param token Doğrulanacak token
 * @returns Eğer token geçerliyse kullanıcı ID, değilse null
 */
export async function verifyPasswordResetToken(token: string): Promise<number | null> {
  try {
    // Tokeni veritabanında ara
    const result = await db.select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));
    
    if (result.length === 0) {
      return null; // Token bulunamadı
    }
    
    const resetToken = result[0];
    const now = new Date();
    
    // Tokenin süresi dolmuş mu kontrol et
    if (now > resetToken.expiresAt) {
      // Süresi dolmuş tokeni sil
      await db.delete(passwordResetTokens)
        .where(eq(passwordResetTokens.token, token));
      
      return null; // Token süresi dolmuş
    }
    
    return resetToken.userId;
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    return null;
  }
}

/**
 * Kullanılmış ya da geçersiz şifre sıfırlama tokenini siler
 * @param token Silinecek token
 */
export async function deletePasswordResetToken(token: string): Promise<void> {
  try {
    await db.delete(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));
  } catch (error) {
    console.error('Token silme hatası:', error);
    throw new Error('Token silinemedi');
  }
}

/**
 * Süresi dolmuş tüm tokenleri temizler
 * Bu fonksiyon düzenli aralıklarla zamanlanabilir
 */
export async function cleanExpiredTokens(): Promise<number> {
  try {
    const now = new Date();
    
    // Süresi dolmuş tüm tokenleri sil
    const result = await db.delete(passwordResetTokens)
      .where(eq(now > passwordResetTokens.expiresAt, true))
      .returning();
    
    return result.length;
  } catch (error) {
    console.error('Süresi dolmuş token temizleme hatası:', error);
    return 0;
  }
}