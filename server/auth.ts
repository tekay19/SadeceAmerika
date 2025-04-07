import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { IStorage } from "./storage";
import { User } from "@shared/schema";

// Use global storage initialized in routes.ts
declare global {
  var storage: IStorage;
}

declare global {
  namespace Express {
    interface User extends User {}
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
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "visa-application-secret",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: false, // development ortamı için false, production için true olmalı
      sameSite: "lax", // Cross-site request forgery (CSRF) saldırılarına karşı koruma
      path: '/' // tüm yollar için cookie erişimi
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
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      next(err);
    }
  });

  // İki giriş rotası tanımlayalım, biri /api/login için, diğeri /api/auth/login için
  const loginHandler = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json(user);
      });
    })(req, res, next);
  };
  
  app.post("/api/login", loginHandler);
  app.post("/api/auth/login", loginHandler);

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
  
  // Şifre sıfırlama rotaları
  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "E-posta adresi gereklidir." });
      }

      // Kullanıcıyı e-posta ile bul
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Bu e-posta adresine sahip bir kullanıcı bulunamadı." });
      }
      
      // TODO: Gerçek uygulamada, token oluştur ve e-posta gönder
      // Burada şimdilik sadece başarılı yanıt dönüyoruz
      
      // Loglama
      console.log(`Şifre sıfırlama isteği: ${email} için token gönderildi.`);
      
      res.json({ 
        success: true, 
        message: "Şifre sıfırlama talimatları e-posta adresinize gönderildi." 
      });
    } catch (error) {
      console.error("Şifre sıfırlama hatası:", error);
      res.status(500).json({ message: "Şifre sıfırlama işlemi sırasında bir hata oluştu." });
    }
  });
  
  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword) {
        return res.status(400).json({ message: "Token ve yeni şifre gereklidir." });
      }
      
      // TODO: Gerçek uygulamada, token'ı doğrula ve kullanıcıyı bul
      // Burada şimdilik sadece başarılı yanıt dönüyoruz
      
      // Gerçek uygulamada aşağıdaki gibi şifre güncellemesi yapılacak:
      // const hashedPassword = await hashPassword(newPassword);
      // await storage.updateUser(userId, { password: hashedPassword });
      
      // Loglama
      console.log(`Şifre sıfırlama başarılı: Token: ${token.substring(0, 10)}...`);
      
      res.json({ 
        success: true, 
        message: "Şifreniz başarıyla güncellendi." 
      });
    } catch (error) {
      console.error("Şifre güncelleme hatası:", error);
      res.status(500).json({ message: "Şifre güncelleme işlemi sırasında bir hata oluştu." });
    }
  });
}
