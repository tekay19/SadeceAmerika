import { db } from './db';
import { users } from '../shared/schema';
import { emailService } from './email-service';
import { eq } from 'drizzle-orm';

/**
 * Aylık bilgilendirme e-postası gönderme işlevi
 * 
 * Bu işlev, tüm kullanıcılara aylık güncellemeleri içeren e-posta gönderir.
 * Zamanlanmış bir görev olarak ayda bir çalıştırılması önerilir.
 */
export async function sendMonthlyUpdates() {
  try {
    console.log('Aylık bilgilendirme e-postaları gönderiliyor...');
    
    // Tüm aktif kullanıcıları al
    const allUsers = await db.select().from(users);
    
    // E-postada gösterilecek güncellemeleri oluştur
    // Bu normalde bir veritabanından veya API'den alınabilir
    const updates = [
      {
        title: 'Vize mülakatları için yeni tarihler',
        description: 'Mayıs 2025 için yeni vize mülakat tarihlerini web sitemizden kontrol edebilirsiniz.'
      },
      {
        title: 'Green Card başvuru dönemi',
        description: 'Green Card çekilişi için başvurular Haziran ayında başlayacak.'
      },
      {
        title: 'Yeni hizmetlerimiz',
        description: 'ABD\'de vergi danışmanlığı hizmetimiz artık kullanımınıza sunuldu.'
      },
      {
        title: 'Vize ücretlerinde güncelleme',
        description: 'ABD Büyükelçiliği, 1 Haziran 2025 tarihinden itibaren vize ücretlerini güncelledi.'
      }
    ];
    
    // Başarılı ve başarısız gönderimleri takip et
    let successCount = 0;
    let failCount = 0;
    
    // Her kullanıcıya e-posta gönder
    for (const user of allUsers) {
      try {
        const success = await emailService.sendMonthlyUpdateEmail(
          user.email,
          user.username,
          updates
        );
        
        if (success) {
          successCount++;
          console.log(`Aylık e-posta gönderildi: ${user.email}`);
        } else {
          failCount++;
          console.error(`Aylık e-posta gönderilemedi: ${user.email}`);
        }
      } catch (error) {
        failCount++;
        console.error(`Kullanıcıya e-posta gönderilirken hata: ${user.email}`, error);
      }
      
      // Her gönderimden sonra kısa bir bekleme süresi
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`Aylık e-postalar tamamlandı. Başarılı: ${successCount}, Başarısız: ${failCount}`);
    return { success: successCount, fail: failCount };
    
  } catch (error) {
    console.error('Aylık e-posta gönderme işlemi başarısız oldu:', error);
    throw error;
  }
}

/**
 * Belirli bir kullanıcıya test amaçlı aylık bilgilendirme e-postası gönder
 */
export async function sendTestMonthlyUpdate(userId: number) {
  try {
    console.log(`${userId} ID'li kullanıcıya test aylık e-postası gönderiliyor...`);
    
    // Kullanıcıyı bul
    const userResult = await db.select().from(users).where(eq(users.id, userId));
    
    if (userResult.length === 0) {
      console.error(`Kullanıcı bulunamadı: ${userId}`);
      return false;
    }
    
    const user = userResult[0];
    
    // Test güncellemeleri
    const updates = [
      {
        title: 'Test - Vize mülakatları için yeni tarihler',
        description: 'Bu bir test e-postasıdır. Gerçek güncellemeler aylık olarak gönderilecektir.'
      },
      {
        title: 'Test - Güncel vize bilgileri',
        description: 'Bu mesaj, e-posta gönderim sisteminizin düzgün çalıştığını doğrulamak için gönderilmiştir.'
      }
    ];
    
    // E-posta gönder
    const success = await emailService.sendMonthlyUpdateEmail(
      user.email,
      user.username,
      updates
    );
    
    if (success) {
      console.log(`Test aylık e-postası gönderildi: ${user.email}`);
    } else {
      console.error(`Test aylık e-postası gönderilemedi: ${user.email}`);
    }
    
    return success;
    
  } catch (error) {
    console.error('Test aylık e-posta gönderimi başarısız oldu:', error);
    return false;
  }
}