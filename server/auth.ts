import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { IStorage } from "./storage";
import { User } from "@shared/mysql-schema";

// Use global storage initialized in routes.ts
declare global {
  var storage: IStorage;
}

declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string | null;
      role: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
    }
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  // For development only - basic handling for non-hashed passwords
  if (!stored.includes('.')) {
    console.log("Using direct string comparison for non-hashed password");
    console.log(`Direct comparison: '${supplied}' vs '${stored}'`);
    return supplied === stored;
  }
  
  try {
    // Normal scrypt password comparison
    const [hashed, salt] = stored.split(".");
    const hashedBuf = Buffer.from(hashed, "hex");
    const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    
    // Güvenli karşılaştırma yapmadan önce boyutları kontrol et
    if (hashedBuf.length !== suppliedBuf.length) {
      console.error(`Buffer length mismatch: stored=${hashedBuf.length}, supplied=${suppliedBuf.length}`);
      // Direkt karşılaştırmaya geri dön, güvenli değil ama geliştirme için çalışır
      return suppliedBuf.toString('hex') === hashedBuf.toString('hex');
    }
    
    return timingSafeEqual(hashedBuf, suppliedBuf);
  } catch (error) {
    console.error("Password comparison error:", error);
    // Fallback to direct comparison if we encounter an error with the hashing
    return supplied === stored;
  }
}

// For development only - we can use this to generate a hashed password for test users
export async function generateHashForPassword(password: string) {
  return hashPassword(password);
}

export function setupAuth(app: Express) {
  // Daha sağlam oturum yönetimi
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "a-very-long-and-secure-secret-key-for-visa-application-system",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    name: 'visa_session_id',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 gün - daha uzun süre kalıcı
      httpOnly: true,
      secure: false, // Production'da true olmalı
      sameSite: "lax",
      path: '/'
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (user) {
          console.log("Kullanıcı bulundu:", user.username);
          console.log("Şifre kontrol ediliyor, verilen:", password, "saklanan:", user.password.substring(0, 20) + "...");
        } else {
          console.log("Kullanıcı bulunamadı:", username);
        }
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const { username, firstName, lastName, email, password, phone } = req.body;
      
      // Kullanıcı adı ve e-posta kontrolü
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: "Bu kullanıcı adı zaten kullanılıyor." 
        });
      }
      
      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ 
          success: false, 
          message: "Bu e-posta adresi zaten kullanılıyor." 
        });
      }
      
      // Şifreyi hashle
      const hashedPassword = await hashPassword(password);
      
      // Kullanıcıyı oluştur
      const user = await storage.createUser({
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        role: 'user'
      });
      
      // Hoşgeldin e-postası gönder
      try {
        const { emailService } = await import('./email-service');
        await emailService.sendRegistrationEmail(email, username);
        
        // Admin log ekle
        await storage.createAdminLog({
          userId: user.id,
          action: "User Registration",
          details: `New user registered: ${username} (${email}), welcome email sent`
        });
      } catch (emailError) {
        console.error("Kayıt e-postası gönderme hatası:", emailError);
        
        // E-posta gönderilemese bile kayda devam et, sadece loga ekle
        await storage.createAdminLog({
          userId: user.id,
          action: "User Registration",
          details: `New user registered: ${username} (${email}), but welcome email failed`
        });
      }
      
      // Kullanıcıyı otomatik olarak giriş yap
      req.login(user, (err) => {
        if (err) {
          console.error('Otomatik giriş hatası:', err);
          return res.json({ 
            success: true, 
            message: "Kayıt başarılı! Lütfen giriş yapın.",
            user: {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role
            }
          });
        }
        
        return res.json({ 
          success: true, 
          message: "Kayıt başarılı ve giriş yapıldı!",
          user: {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
          }
        });
      });
    } catch (err) {
      console.error("Kayıt hatası:", err);
      res.status(500).json({ 
        success: false, 
        message: "Kayıt işlemi sırasında bir hata oluştu." 
      });
    }
  });

  // Gelişmiş giriş yönetimi
  const loginHandler = async (req, res, next) => {
    try {
      // İlk aşama: Kullanıcı adı ve şifre doğrulama
      passport.authenticate("local", async (err, user, info) => {
        if (err) {
          console.error("Passport authentication error:", err);
          return next(err);
        }
        
        if (!user) {
          console.log("Authentication failed: Invalid username or password");
          return res.status(401).json({ 
            success: false, 
            message: "Invalid username or password" 
          });
        }
        
        // İki faktörlü kimlik doğrulama gerekli mi? (2FA)
        const { emailService } = await import('./email-service');

        // Kullanıcı için önceki kodu kontrol et ve varsa sil
        const existingCode = await storage.getLoginVerificationCodeByUserId(user.id);
        if (existingCode) {
          await storage.deleteLoginVerificationCode(existingCode.id);
        }
        
        // Rastgele 6 haneli kod oluştur
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`Generated verification code for ${user.username}: ${verificationCode}`);
        
        // Kodu veritabanına kaydet
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 dakika geçerli
        
        await storage.createLoginVerificationCode({
          userId: user.id,
          email: user.email,
          code: verificationCode,
          isUsed: false,
          expiresAt,
          createdAt: new Date()
        });
        
        // Kodu e-posta ile gönder
        const sent = await emailService.sendVerificationCode(
          user.email, 
          verificationCode, 
          user.username
        );
        
        if (!sent) {
          console.error(`Failed to send verification code to ${user.email}`);
          return res.status(500).json({
            success: false,
            message: "Failed to send verification code via email."
          });
        }
        
        // Kullanıcı bilgilerini güvenli bir şekilde gönder, 2FA gerektiğini belirt
        const { password, ...userWithoutPassword } = user;
        return res.status(200).json({
          success: true,
          message: "Verification code sent",
          user: userWithoutPassword,
          requireVerification: true
        });
      })(req, res, next);
    } catch (error) {
      console.error("Login handler error:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during login process"
      });
    }
  };
  
  app.post("/api/login", loginHandler);
  app.post("/api/auth/login", loginHandler);

  app.post("/api/logout", (req, res, next) => {
    // Oturum bilgisini loglayalım
    console.log("Logging out user - Session ID:", req.sessionID);
    
    // Session'ı sonlandır
    req.logout((err) => {
      if (err) {
        console.error("Logout error:", err);
        return next(err);
      }
      
      // Session'ı temizle
      req.session.destroy((err) => {
        if (err) {
          console.error("Session destroy error:", err);
          return next(err);
        }
        
        // Clear cookie
        res.clearCookie('visa_session_id');
        
        // Başarılı yanıt
        res.status(200).json({
          success: true,
          message: "Logout successful"
        });
      });
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      console.log("Unauthorized access attempt to /api/user - Not authenticated");
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized, please login" 
      });
    }
    
    // Session bilgisini loglayalım
    console.log("Session info for /api/user request:");
    console.log("- Session ID:", req.sessionID);
    console.log("- Is Authenticated:", req.isAuthenticated());
    
    // Hassas bilgileri yanıttan çıkar
    const { password, ...userWithoutPassword } = req.user as any;
    
    res.json({
      success: true,
      user: userWithoutPassword
    });
  });
  
  // Şifre sıfırlama rotaları
  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ 
          success: false, 
          message: "E-posta adresi gereklidir." 
        });
      }

      // Kullanıcıyı e-posta ile bul
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "Bu e-posta adresine sahip bir kullanıcı bulunamadı." 
        });
      }
      
      // Token oluştur
      const { generatePasswordResetToken } = await import('./utils/token-utils');
      const token = await generatePasswordResetToken(user.id);
      
      // E-posta gönder
      const { emailService } = await import('./email-service');
      const emailSent = await emailService.sendPasswordResetEmail(
        user.email, 
        token, 
        user.username
      );
      
      // Loglama
      if (emailSent) {
        console.log(`Şifre sıfırlama e-postası gönderildi: ${email}`);
        
        // Admin log ekle
        await storage.createAdminLog({
          userId: user.id,
          action: "Password Reset Request",
          details: `Password reset email sent to ${user.email}`
        });
        
        res.json({ 
          success: true, 
          message: "Şifre sıfırlama talimatları e-posta adresinize gönderildi." 
        });
      } else {
        console.error(`Şifre sıfırlama e-postası gönderme hatası: ${email}`);
        res.status(500).json({ 
          success: false, 
          message: "E-posta gönderilirken bir hata oluştu, lütfen daha sonra tekrar deneyin." 
        });
      }
    } catch (error) {
      console.error("Şifre sıfırlama hatası:", error);
      res.status(500).json({ 
        success: false, 
        message: "Şifre sıfırlama işlemi sırasında bir hata oluştu." 
      });
    }
  });
  
  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword) {
        return res.status(400).json({ 
          success: false, 
          message: "Token ve yeni şifre gereklidir." 
        });
      }
      
      // Token'ı doğrula ve kullanıcı ID'sini al
      const { verifyPasswordResetToken, deletePasswordResetToken } = await import('./utils/token-utils');
      const userId = await verifyPasswordResetToken(token);
      
      if (!userId) {
        return res.status(400).json({ 
          success: false, 
          message: "Geçersiz veya süresi dolmuş token. Lütfen tekrar şifre sıfırlama talep edin." 
        });
      }
      
      // Kullanıcıyı bul
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "Kullanıcı bulunamadı." 
        });
      }
      
      // Şifreyi hashle ve güncelle
      const hashedPassword = await hashPassword(newPassword);
      await storage.updateUser(userId, { password: hashedPassword });
      
      // Kullanılan token'ı sil
      await deletePasswordResetToken(token);
      
      // Admin log ekle
      await storage.createAdminLog({
        userId,
        action: "Password Reset",
        details: `Password reset completed for user ${user.username}`
      });
      
      // Loglama
      console.log(`Şifre başarıyla sıfırlandı. Kullanıcı: ${user.username}`);
      
      res.json({ 
        success: true, 
        message: "Şifreniz başarıyla sıfırlandı. Yeni şifrenizle giriş yapabilirsiniz." 
      });
    } catch (error) {
      console.error("Şifre sıfırlama hatası:", error);
      res.status(500).json({ 
        success: false, 
        message: "Şifre sıfırlama işlemi sırasında bir hata oluştu." 
      });
    }
  });
}
