import { db } from './db';
import { users } from '../shared/schema';
import { emailService } from './email-service';
import { eq } from 'drizzle-orm';

// Güncelleme tipini tanımla
interface Update {
  title: string;
  description: string;
}

/**
 * Aylık bilgilendirme e-postası gönderme işlevi
 * 
 * Bu işlev, tüm kullanıcılara aylık güncellemeleri içeren e-posta gönderir.
 * Zamanlanmış bir görev olarak ayda bir çalıştırılması önerilir.
 */
export async function sendMonthlyUpdates() {
  try {
    console.log('🔄 Aylık bilgilendirme e-postaları gönderiliyor...');
    
    // DB bağlantısını kontrol et
    if (!db) {
      console.error('❌ Veritabanı bağlantısı bulunamadı, aylık e-postalar gönderilemedi');
      return { success: 0, fail: 0, error: 'Veritabanı bağlantısı bulunamadı' };
    }
    
    // Tüm aktif kullanıcıları al
    let allUsers;
    try {
      allUsers = await db.select().from(users);
      console.log(`ℹ️ Kullanıcı sayısı: ${allUsers.length}`);
    } catch (error) {
      console.error('❌ Kullanıcılar veritabanından alınamadı:', error);
      return { success: 0, fail: 0, error: 'Kullanıcılar veritabanından alınamadı' };
    }
    
    // Kullanıcı yoksa işlemi sonlandır
    if (!allUsers || allUsers.length === 0) {
      console.warn('⚠️ Hiç kullanıcı bulunamadı, e-posta gönderilecek kullanıcı yok');
      return { success: 0, fail: 0, error: 'Hiç kullanıcı bulunamadı' };
    }
    
    // Güncellemeleri oluştur (normalde burası veritabanından veya bir API'den veri çekecek şekilde güncellenebilir)
    const today = new Date();
    const currentMonth = today.toLocaleString('tr-TR', { month: 'long' });
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1).toLocaleString('tr-TR', { month: 'long' });
    const currentYear = today.getFullYear();
    
    const updates: Update[] = [
      {
        title: `${nextMonth} ${currentYear} için vize mülakatları`,
        description: `${nextMonth} ${currentYear} için yeni vize mülakat tarihlerini web sitemizden kontrol edebilirsiniz.`
      },
      {
        title: 'Green Card başvuru dönemi',
        description: 'Green Card çekilişi için başvurular önümüzdeki ay başlayacak.'
      },
      {
        title: 'Yeni hizmetlerimiz',
        description: 'ABD\'de vergi danışmanlığı hizmetimiz artık kullanımınıza sunuldu.'
      },
      {
        title: 'Vize ücretlerinde güncelleme',
        description: `ABD Büyükelçiliği, 1 ${nextMonth} ${currentYear} tarihinden itibaren vize ücretlerini güncelledi.`
      }
    ];
    
    // Başarılı ve başarısız gönderimleri takip et
    let successCount = 0;
    let failCount = 0;
    let errorMessages: string[] = [];
    
    // Her kullanıcıya e-posta gönder
    for (const user of allUsers) {
      if (!user.email || !user.username) {
        console.warn(`⚠️ Kullanıcı bilgileri eksik: ${user.id}`);
        failCount++;
        continue;
      }
      
      try {
        const success = await emailService.sendMonthlyUpdateEmail(
          user.email,
          user.username,
          updates
        );
        
        if (success) {
          successCount++;
          console.log(`✅ Aylık e-posta gönderildi: ${user.email}`);
        } else {
          failCount++;
          const errorMsg = `❌ Aylık e-posta gönderilemedi: ${user.email}`;
          console.error(errorMsg);
          errorMessages.push(errorMsg);
        }
      } catch (error) {
        failCount++;
        const errorMsg = `❌ Kullanıcıya e-posta gönderilirken hata: ${user.email} - ${error instanceof Error ? error.message : String(error)}`;
        console.error(errorMsg);
        errorMessages.push(errorMsg);
      }
      
      // Her gönderimden sonra kısa bir bekleme süresi (rate-limit koruması için)
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    const summary = `🏁 Aylık e-postalar tamamlandı. Başarılı: ${successCount}, Başarısız: ${failCount}`;
    console.log(summary);
    
    // Eğer hata varsa logla
    if (errorMessages.length > 0) {
      console.log('❌ Hata mesajları:');
      errorMessages.forEach((msg, index) => {
        console.log(`   ${index + 1}. ${msg}`);
      });
    }
    
    return { 
      success: successCount, 
      fail: failCount,
      errors: errorMessages.length > 0 ? errorMessages : undefined
    };
    
  } catch (error) {
    const errorMsg = `❌ Aylık e-posta gönderme işlemi başarısız oldu: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMsg);
    return { 
      success: 0, 
      fail: 0, 
      error: errorMsg
    };
  }
}

/**
 * Belirli bir kullanıcıya test amaçlı aylık bilgilendirme e-postası gönder
 */
export async function sendTestMonthlyUpdate(userId: number) {
  try {
    console.log(`🔄 ${userId} ID'li kullanıcıya test aylık e-postası gönderiliyor...`);
    
    // DB bağlantısını kontrol et
    if (!db) {
      console.error('❌ Veritabanı bağlantısı bulunamadı, test e-postası gönderilemedi');
      return false;
    }
    
    // Kullanıcıyı bul
    let userResult;
    try {
      userResult = await db.select().from(users).where(eq(users.id, userId));
    } catch (error) {
      console.error(`❌ Kullanıcı veritabanından alınamadı: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
    
    if (!userResult || userResult.length === 0) {
      console.error(`❌ Kullanıcı bulunamadı: ${userId}`);
      return false;
    }
    
    const user = userResult[0];
    
    if (!user.email || !user.username) {
      console.error(`❌ Kullanıcı email veya username bilgisi eksik: ${userId}`);
      return false;
    }
    
    // Test güncellemeleri
    const today = new Date();
    const formattedDate = today.toLocaleString('tr-TR', { 
      day: '2-digit',
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const updates: Update[] = [
      {
        title: 'Test - Vize mülakatları için yeni tarihler',
        description: `Bu bir test e-postasıdır (${formattedDate}). Gerçek güncellemeler aylık olarak gönderilecektir.`
      },
      {
        title: 'Test - Güncel vize bilgileri',
        description: 'Bu mesaj, e-posta gönderim sisteminizin düzgün çalıştığını doğrulamak için gönderilmiştir.'
      }
    ];
    
    // E-posta gönder
    try {
      const success = await emailService.sendMonthlyUpdateEmail(
        user.email,
        user.username,
        updates
      );
      
      if (success) {
        console.log(`✅ Test aylık e-postası gönderildi: ${user.email}`);
      } else {
        console.error(`❌ Test aylık e-postası gönderilemedi: ${user.email}`);
      }
      
      return success;
    } catch (error) {
      console.error(`❌ Test e-postası gönderilirken hata: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
    
  } catch (error) {
    console.error(`❌ Test aylık e-posta gönderimi başarısız oldu: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}