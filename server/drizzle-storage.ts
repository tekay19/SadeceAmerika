import { 
  User, InsertUser, 
  Application, InsertApplication,
  Document, InsertDocument,
  Appointment, InsertAppointment,
  Feedback, InsertFeedback,
  AdminLog, InsertAdminLog,
  Setting, InsertSetting,
  VisaType, InsertVisaType,
  users, applications, documents, appointments, feedback, adminLogs, settings, visaTypes
} from '@shared/schema';
import { eq, and } from 'drizzle-orm';
import { db } from './db';
import { IStorage } from './storage';
import session from 'express-session';
import createMemoryStore from 'memorystore';
import pgSessionStore from 'connect-pg-simple';
import { pool } from './db';

const MemoryStore = createMemoryStore(session);
const PgSessionStore = pgSessionStore(session);

export class DrizzleStorage implements IStorage {
  sessionStore: any;

  constructor() {
    // Üretim ortamında PostgreSQL session store kullan
    if (process.env.NODE_ENV === 'production') {
      this.sessionStore = new PgSessionStore({
        pool,
        tableName: 'session', // Session tablosunun adı
        createTableIfMissing: true
      });
    } else {
      // Geliştirme ortamında memory store kullan
      this.sessionStore = new MemoryStore({
        checkPeriod: 86400000 // 24 hours
      });
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const result = await db.update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    return result[0];
  }

  async deleteUser(id: number): Promise<boolean> {
    // Cascade silme işlemi - ilişkili tüm kayıtları silelim
    
    // 1. Kullanıcının tüm uygulamalarını bul
    const userApps = await db.select().from(applications).where(eq(applications.userId, id));
    
    for (const app of userApps) {
      // 2. Uygulama belgelerini sil
      await db.delete(documents).where(eq(documents.applicationId, app.id));
      
      // 3. Uygulama randevusunu sil
      await db.delete(appointments).where(eq(appointments.applicationId, app.id));
      
      // 4. Uygulamayı sil
      await db.delete(applications).where(eq(applications.id, app.id));
    }
    
    // 5. Kullanıcı geri bildirimlerini sil
    await db.delete(feedback).where(eq(feedback.userId, id));
    
    // 6. Admin kayıtlarını sil
    await db.delete(adminLogs).where(eq(adminLogs.userId, id));
    
    // 7. Kullanıcıyı sil
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    
    return result.length > 0;
  }

  // Visa type methods
  async getAllVisaTypes(): Promise<VisaType[]> {
    return await db.select().from(visaTypes);
  }

  async getVisaType(id: number): Promise<VisaType | undefined> {
    const result = await db.select().from(visaTypes).where(eq(visaTypes.id, id));
    return result[0];
  }

  async createVisaType(visaType: InsertVisaType): Promise<VisaType> {
    const result = await db.insert(visaTypes).values(visaType).returning();
    return result[0];
  }

  // Application methods
  async createApplication(application: InsertApplication): Promise<Application> {
    const result = await db.insert(applications).values(application).returning();
    return result[0];
  }

  async getApplication(id: number): Promise<Application | undefined> {
    const result = await db.select().from(applications).where(eq(applications.id, id));
    return result[0];
  }

  async getUserApplications(userId: number): Promise<Application[]> {
    return await db.select().from(applications).where(eq(applications.userId, userId));
  }

  async getAllApplications(): Promise<Application[]> {
    return await db.select().from(applications);
  }

  async updateApplication(id: number, updates: Partial<Application>): Promise<Application> {
    const result = await db.update(applications)
      .set(updates)
      .where(eq(applications.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error(`Application with ID ${id} not found`);
    }
    
    return result[0];
  }

  // Document methods
  async createDocument(document: InsertDocument): Promise<Document> {
    const result = await db.insert(documents).values(document).returning();
    return result[0];
  }

  async getDocument(id: number): Promise<Document | undefined> {
    const result = await db.select().from(documents).where(eq(documents.id, id));
    return result[0];
  }

  async getApplicationDocuments(applicationId: number): Promise<Document[]> {
    return await db.select().from(documents).where(eq(documents.applicationId, applicationId));
  }

  async updateDocument(id: number, updates: Partial<Document>): Promise<Document> {
    const result = await db.update(documents)
      .set(updates)
      .where(eq(documents.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error(`Document with ID ${id} not found`);
    }
    
    return result[0];
  }

  // Appointment methods
  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const result = await db.insert(appointments).values(appointment).returning();
    return result[0];
  }

  async getApplicationAppointment(applicationId: number): Promise<Appointment | undefined> {
    const result = await db.select().from(appointments).where(eq(appointments.applicationId, applicationId));
    return result[0];
  }

  // Feedback methods
  async createFeedback(feedbackItem: InsertFeedback): Promise<Feedback> {
    const result = await db.insert(feedback).values(feedbackItem).returning();
    return result[0];
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return await db.select().from(feedback);
  }

  // Admin log methods
  async createAdminLog(log: InsertAdminLog): Promise<AdminLog> {
    const result = await db.insert(adminLogs).values(log).returning();
    return result[0];
  }

  async getAllAdminLogs(): Promise<AdminLog[]> {
    return await db.select().from(adminLogs);
  }

  // Settings methods
  async getSetting(id: number): Promise<Setting | undefined> {
    const result = await db.select().from(settings).where(eq(settings.id, id));
    return result[0];
  }

  async getSettingByKey(category: string, key: string): Promise<Setting | undefined> {
    const result = await db.select().from(settings).where(
      and(
        eq(settings.category, category as any), 
        eq(settings.key, key)
      )
    );
    return result[0];
  }

  async getSettingsByCategory(category: string): Promise<Setting[]> {
    return await db.select().from(settings).where(eq(settings.category, category as any));
  }

  async getAllSettings(): Promise<Setting[]> {
    return await db.select().from(settings);
  }

  async createSetting(setting: InsertSetting): Promise<Setting> {
    const result = await db.insert(settings).values(setting).returning();
    return result[0];
  }

  async updateSetting(id: number, updates: Partial<Setting>): Promise<Setting> {
    const result = await db.update(settings)
      .set(updates)
      .where(eq(settings.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error(`Setting with ID ${id} not found`);
    }
    
    return result[0];
  }
}

// Veritabanı bağlantısını başlatmak ve test etmek
export const initializeDrizzleStorage = async (): Promise<DrizzleStorage> => {
  try {
    // İlk başlangıç verilerini oluştur
    await initializeData();
    return new DrizzleStorage();
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

// Temel verileri oluştur (vize türleri, admin kullanıcısı, temel ayarlar)
async function initializeData() {
  try {
    // Vize türleri kontrol et, yoksa ekle
    const existingVisaTypes = await db.select().from(visaTypes);
    
    if (existingVisaTypes.length === 0) {
      const visaTypesData = [
        { 
          name: "Business Visa", 
          description: "For business-related activities and meetings", 
          requirements: "Valid passport, business invitation letter, proof of funds",
          processingTime: "5-10 business days" 
        },
        { 
          name: "Tourist Visa", 
          description: "For tourism or visiting friends/relatives", 
          requirements: "Valid passport, hotel reservation, return ticket, proof of funds",
          processingTime: "7-14 business days" 
        },
        { 
          name: "Student Visa", 
          description: "For academic studies and educational programs", 
          requirements: "Valid passport, acceptance letter from institution, proof of financial support",
          processingTime: "10-20 business days" 
        },
        { 
          name: "Work Visa", 
          description: "For employment in specialty occupations", 
          requirements: "Valid passport, employment contract, educational credentials, employer sponsorship",
          processingTime: "20-30 business days" 
        },
        { 
          name: "Exchange Visitor Visa", 
          description: "For approved exchange visitor programs", 
          requirements: "Valid passport, program acceptance, DS-2019 form, proof of finances",
          processingTime: "15-25 business days" 
        }
      ];
      
      await db.insert(visaTypes).values(visaTypesData);
      console.log('Added default visa types');
    }
    
    // Admin kullanıcısı kontrol et, yoksa ekle
    const existingAdmins = await db.select().from(users).where(eq(users.role, 'admin'));
    
    if (existingAdmins.length === 0) {
      const now = new Date();
      // Admin kullanıcısını verilen özel kullanıcı adı ve 
      // güvenli hash'lenmiş şifreyle oluştur
      await db.insert(users).values({
        username: "murat_samet19",
        password: "4da1d09a7aab402bfa4c3c3e37f3f8972660730c72268ed4d335f570db1f8f01fde4bb32e3cdc126f78f4f0da4d682469a7e5f8b71edc24d73cd399272626a7c.a0fbc6ad039660d510c1ab5108a5aba6",
        firstName: "Admin",
        lastName: "User",
        email: "admin1@example.com",
        phone: "+90 555 000 0000",
        role: "admin",
        createdAt: now,
        updatedAt: now
      });
      console.log('Added default admin user');
    }
    
    // Temel ayarları kontrol et, yoksa ekle
    const existingSettings = await db.select().from(settings);
    
    if (existingSettings.length === 0) {
      // General settings
      const generalSettings = [
        { 
          category: 'general' as const, 
          key: 'appName', 
          value: 'Visa System',
          description: 'Application Name'
        },
        { 
          category: 'general' as const, 
          key: 'version', 
          value: '1.0.0',
          description: 'Application Version'
        },
        { 
          category: 'general' as const, 
          key: 'mode', 
          value: 'production',
          description: 'Application Mode (production/development)'
        }
      ];
      
      // Email settings
      const emailSettings = [
        { 
          category: 'email' as const, 
          key: 'smtpHost', 
          value: 'smtp.gmail.com',
          description: 'SMTP Server Host'
        },
        { 
          category: 'email' as const, 
          key: 'smtpPort', 
          value: '587',
          description: 'SMTP Server Port'
        },
        { 
          category: 'email' as const, 
          key: 'emailUser', 
          value: 'noreply@visa.com',
          description: 'Sender Email Address'
        },
        { 
          category: 'email' as const, 
          key: 'emailPass', 
          value: 'secureemailpassword',
          description: 'Email Password (encrypted)'
        }
      ];
      
      // Security settings
      const securitySettings = [
        { 
          category: 'security' as const, 
          key: 'jwtSecret', 
          value: 'supersecuretoken',
          description: 'JWT Secret Token'
        },
        { 
          category: 'security' as const, 
          key: 'jwtExpiresIn', 
          value: '15m',
          description: 'JWT Token Expiration Time'
        },
        { 
          category: 'security' as const, 
          key: 'rateLimit', 
          value: '100',
          description: 'API Rate Limit per IP'
        }
      ];
      
      // Logging settings
      const loggingSettings = [
        { 
          category: 'logging' as const, 
          key: 'level', 
          value: 'info',
          description: 'Log Level (error, info, debug)'
        },
        { 
          category: 'logging' as const, 
          key: 'format', 
          value: 'combined',
          description: 'Log Format'
        }
      ];
      
      // Tüm ayarları birleştir ve ekle
      const allSettings = [...generalSettings, ...emailSettings, ...securitySettings, ...loggingSettings];
      await db.insert(settings).values(allSettings);
      console.log('Added default settings');
    }
  } catch (error) {
    console.error('Error initializing data:', error);
    throw error;
  }
}