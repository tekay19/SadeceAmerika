import nodemailer from 'nodemailer';
import { db } from './db';
import { settings } from '../shared/schema';
import { eq } from 'drizzle-orm';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private initialized = false;
  private initializationPromise: Promise<void> | null = null;
  private emailUser: string = '';
  private configLoaded = false;

  constructor() {
    this.initializationPromise = this.initialize();
  }

  private async initialize(): Promise<void> {
    try {
      // Environment variables'dan e-posta bilgilerini al
      const emailUser = process.env.EMAIL_USER;
      const emailPass = process.env.EMAIL_PASS;
      const emailService = process.env.EMAIL_SERVICE || 'gmail';
      const emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
      const emailPort = parseInt(process.env.EMAIL_PORT || '465');
      const emailSecure = process.env.EMAIL_SECURE !== 'false';

      // Environment variables varsa onları kullan
      if (emailUser && emailPass) {
        this.configLoaded = true;
        this.emailUser = emailUser;
        
        console.log('Environment variables kullanılarak e-posta ayarları yapılandırılıyor...');
        
        // Nodemailer transport oluştur
        this.transporter = nodemailer.createTransport({
          service: emailService,
          host: emailHost,
          port: emailPort,
          secure: emailSecure,
          auth: {
            user: emailUser,
            pass: emailPass,
          }
        });
      } 
      // Environment variables yoksa veritabanından almayı dene
      else if (db) {
        try {
          console.log('Veritabanından e-posta ayarları alınıyor...');
          const emailSettings = await db.select().from(settings)
            .where(eq(settings.category, 'email'));
          
          if (emailSettings.length === 0) {
            console.warn('Veritabanında e-posta ayarları bulunamadı');
          } else {
            // Ayarları bir objeye dönüştür
            const config = emailSettings.reduce((acc, setting) => {
              acc[setting.key] = setting.value;
              return acc;
            }, {} as Record<string, string>);
            
            // Fallback değerler - NOT: Üretimde güvenlik için bu değerler environment variables ile değiştirilmelidir
            const configUser = config['smtp_user'] || process.env.EMAIL_USER;
            const configPass = config['smtp_pass'] || process.env.EMAIL_PASS;
            
            if (configUser && configPass) {
              this.configLoaded = true;
              this.emailUser = configUser;
              
              console.log('Veritabanı ayarları kullanılarak e-posta yapılandırılıyor...');
              
              // Nodemailer transport oluştur
              this.transporter = nodemailer.createTransport({
                service: config['smtp_service'] || 'gmail',
                host: config['smtp_host'] || 'smtp.gmail.com',
                port: parseInt(config['smtp_port'] || '465'),
                secure: config['smtp_secure'] !== 'false',
                auth: {
                  user: configUser,
                  pass: configPass,
                }
              });
            }
          }
        } catch (dbError) {
          console.warn('Veritabanından e-posta ayarları alınırken hata:', dbError);
        }
      }
      
      // Eğer hiçbir yapılandırma bulunamazsa, geçici test yapılandırması kullan (dev ortamında)
      if (!this.configLoaded && process.env.NODE_ENV !== 'production') {
        console.warn('Hiçbir e-posta yapılandırması bulunamadı, test modu kullanılıyor...');
        
        // Geliştirme ortamı için geçici test amaçlı bir yapılandırma
        this.transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: 'ethereal.user@ethereal.email',
            pass: 'ethereal_pass',
          }
        });
        
        this.emailUser = 'test@example.com';
        console.log('Test e-posta yapılandırması kullanılıyor. Gerçek e-postalar gönderilmeyecek.');
      }

      // SMTP bağlantısını doğrula (eğer yapılandırıldıysa)
      if (this.transporter) {
        try {
          await this.transporter.verify();
          console.log('✅ SMTP bağlantısı kuruldu ve doğrulandı');
          this.initialized = true;
        } catch (verifyError) {
          console.error('❌ SMTP doğrulama hatası:', verifyError);
          // Hatayı fırlatmak yerine sadece log kayıt et, böylece uygulama çalışmaya devam edebilir
          // Ancak initialized = false durumunda kalacak
        }
      } else {
        console.warn('⚠️ E-posta transport yapılandırılamadı. E-posta gönderimi devre dışı.');
      }
    } catch (error) {
      console.error('❌ E-posta servisi başlatma hatası:', error);
      // Ana hatayı fırlatma - uygulamanın çalışmaya devam etmesine izin ver
    }
  }

  /**
   * E-posta gönderir
   */
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // Servis başlatılmadıysa bekle
      if (!this.initialized && this.initializationPromise) {
        try {
          await this.initializationPromise;
        } catch (error) {
          console.warn('E-posta servisi başlatma beklemesi sırasında hata:', error);
        }
      }

      if (!this.transporter || !this.initialized) {
        console.error('⚠️ E-posta servisine bağlanılamadı - posta gönderilemedi');
        return false;
      }

      // From adresi için emailUser kullan (initialize sırasında ayarlanmıştı)
      const fromName = process.env.EMAIL_FROM_NAME || 'Sadece Amerika';

      // E-posta gönder
      const result = await this.transporter.sendMail({
        from: `"${fromName}" <${this.emailUser}>`,
        to: options.to,
        subject: options.subject,
        text: options.text || '',
        html: options.html || '',
      });

      console.log('✅ E-posta gönderildi:', result.messageId);
      return true;
    } catch (error) {
      console.error('❌ E-posta gönderme hatası:', error);
      return false;
    }
  }

  /**
   * Login verification code gönderir (2FA için)
   */
  async sendVerificationCode(email: string, code: string, username: string): Promise<boolean> {
    const subject = 'Giriş Doğrulama Kodu - Sadece Amerika';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #003366; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Sadece Amerika</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #ddd; border-top: none;">
          <p>Merhaba ${username},</p>
          <p>Hesabınıza giriş yapmak için doğrulama kodunuz:</p>
          <div style="padding: 10px; background-color: #f5f5f5; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold; margin: 15px 0;">
            ${code}
          </div>
          <p>Bu kod 10 dakika süreyle geçerlidir.</p>
          <p>Eğer giriş yapmaya çalışmıyorsanız, lütfen bu e-postayı dikkate almayın ve şifrenizi değiştirin.</p>
          <p>Saygılarımızla,<br>Sadece Amerika Ekibi</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>Bu e-posta otomatik olarak gönderilmiştir, lütfen yanıtlamayınız.</p>
        </div>
      </div>
    `;
    
    const text = `
      Merhaba ${username},
      
      Hesabınıza giriş yapmak için doğrulama kodunuz: ${code}
      
      Bu kod 10 dakika süreyle geçerlidir.
      
      Eğer giriş yapmaya çalışmıyorsanız, lütfen bu e-postayı dikkate almayın ve şifrenizi değiştirin.
      
      Saygılarımızla,
      Sadece Amerika Ekibi
    `;
    
    return this.sendEmail({
      to: email,
      subject,
      text,
      html
    });
  }

  /**
   * Şifre sıfırlama e-postası gönderir
   */
  async sendPasswordResetEmail(email: string, resetToken: string, username: string): Promise<boolean> {
    // Sunucu URL'si yerine doğrudan çalışan sunucunun adresini kullanmak için
    // Replit tarafından otomatik oluşturulan adresi kullan
    // Replit URL formatını kontrol et
    let resetDomain = '';
    if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
      resetDomain = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
    } else {
      // Geliştirme ortamı için
      resetDomain = 'http://localhost:5000';
    }
    
    const resetUrl = `${resetDomain}/reset-password?token=${resetToken}`;
    console.log(`Generated reset URL: ${resetUrl}`);
    
    const subject = 'Şifre Sıfırlama Talebi - Sadece Amerika';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #003366; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Sadece Amerika</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #ddd; border-top: none;">
          <p>Merhaba ${username},</p>
          <p>Şifrenizi sıfırlama talebinde bulundunuz. Aşağıdaki bağlantıya tıklayarak şifrenizi sıfırlayabilirsiniz:</p>
          <p style="text-align: center;">
            <a href="${resetUrl}" style="display: inline-block; background-color: #003366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px;">Şifremi Sıfırla</a>
          </p>
          <p>Bu bağlantı 1 saat süreyle geçerlidir.</p>
          <p>Eğer bu talebi siz yapmadıysanız, lütfen bu e-postayı dikkate almayın.</p>
          <p>Saygılarımızla,<br>Sadece Amerika Ekibi</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>Bu e-posta otomatik olarak gönderilmiştir, lütfen yanıtlamayınız.</p>
        </div>
      </div>
    `;
    
    const text = `
      Merhaba ${username},
      
      Şifrenizi sıfırlama talebinde bulundunuz. Aşağıdaki bağlantıya tıklayarak şifrenizi sıfırlayabilirsiniz:
      
      ${resetUrl}
      
      Bu bağlantı 1 saat süreyle geçerlidir.
      
      Eğer bu talebi siz yapmadıysanız, lütfen bu e-postayı dikkate almayın.
      
      Saygılarımızla,
      Sadece Amerika Ekibi
    `;
    
    return this.sendEmail({
      to: email,
      subject,
      text,
      html
    });
  }

  /**
   * Kayıt onay e-postası gönderir
   */
  async sendRegistrationEmail(email: string, username: string): Promise<boolean> {
    const loginUrl = `${process.env.APP_URL || 'http://localhost:5000'}/login`;
    
    const subject = 'Hoş Geldiniz - Sadece Amerika Kayıt Onayı';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #003366; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Sadece Amerika</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #ddd; border-top: none;">
          <h2>Kayıt İşleminiz Tamamlandı!</h2>
          <p>Merhaba ${username},</p>
          <p>Sadece Amerika platformuna hoş geldiniz! Kaydınız başarıyla tamamlanmıştır.</p>
          <p>Artık hesabınıza giriş yapabilir ve ABD vize başvuru sürecinizi takip edebilirsiniz.</p>
          <p style="text-align: center;">
            <a href="${loginUrl}" style="display: inline-block; background-color: #003366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px;">Giriş Yap</a>
          </p>
          <p>Amerika'ya uzanan yolculuğunuzda size yardımcı olmaktan mutluluk duyacağız.</p>
          <p>Saygılarımızla,<br>Sadece Amerika Ekibi</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>Bu e-posta otomatik olarak gönderilmiştir, lütfen yanıtlamayınız.</p>
        </div>
      </div>
    `;
    
    const text = `
      Merhaba ${username},
      
      Sadece Amerika platformuna hoş geldiniz! Kaydınız başarıyla tamamlanmıştır.
      
      Artık hesabınıza giriş yapabilir ve ABD vize başvuru sürecinizi takip edebilirsiniz:
      
      ${loginUrl}
      
      Amerika'ya uzanan yolculuğunuzda size yardımcı olmaktan mutluluk duyacağız.
      
      Saygılarımızla,
      Sadece Amerika Ekibi
    `;
    
    return this.sendEmail({
      to: email,
      subject,
      text,
      html
    });
  }

  /**
   * Aylık bilgilendirme e-postası gönderir
   */
  async sendMonthlyUpdateEmail(email: string, username: string, updates: any[]): Promise<boolean> {
    const loginUrl = `${process.env.APP_URL || 'http://localhost:5000'}/login`;
    
    // Güncellemelerden HTML listesi oluştur
    const updatesHtml = updates.map(update => `<li>${update.title}: ${update.description}</li>`).join('');
    
    const subject = 'Aylık Bilgilendirme - Sadece Amerika';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #003366; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Sadece Amerika</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #ddd; border-top: none;">
          <h2>Aylık Bilgilendirme</h2>
          <p>Merhaba ${username},</p>
          <p>ABD vize süreçleri ve göçmenlik konularındaki son gelişmeler hakkında sizi bilgilendirmek istiyoruz:</p>
          
          <ul>
            ${updatesHtml}
          </ul>
          
          <p>Daha fazla bilgi için hesabınıza giriş yapabilirsiniz:</p>
          <p style="text-align: center;">
            <a href="${loginUrl}" style="display: inline-block; background-color: #003366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px;">Hesabıma Git</a>
          </p>
          <p>Sorularınız için bizimle iletişime geçmekten çekinmeyin.</p>
          <p>Saygılarımızla,<br>Sadece Amerika Ekibi</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>Bu e-posta otomatik olarak gönderilmiştir, lütfen yanıtlamayınız.</p>
          <p>Bu e-postaları almak istemiyorsanız, <a href="${loginUrl}/profile">profilinizden</a> iletişim tercihlerinizi güncelleyebilirsiniz.</p>
        </div>
      </div>
    `;
    
    // Güncellemelerden text listesi oluştur
    const updatesText = updates.map(update => `- ${update.title}: ${update.description}`).join('\n');
    
    const text = `
      Merhaba ${username},
      
      ABD vize süreçleri ve göçmenlik konularındaki son gelişmeler hakkında sizi bilgilendirmek istiyoruz:
      
      ${updatesText}
      
      Daha fazla bilgi için hesabınıza giriş yapabilirsiniz:
      ${loginUrl}
      
      Sorularınız için bizimle iletişime geçmekten çekinmeyin.
      
      Saygılarımızla,
      Sadece Amerika Ekibi
      
      ---
      Bu e-posta otomatik olarak gönderilmiştir, lütfen yanıtlamayınız.
      Bu e-postaları almak istemiyorsanız, profilinizden iletişim tercihlerinizi güncelleyebilirsiniz.
    `;
    
    return this.sendEmail({
      to: email,
      subject,
      text,
      html
    });
  }
}

// Tek bir örnek (singleton) oluştur
export const emailService = new EmailService();