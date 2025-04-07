import { 
  User, InsertUser, 
  Application, InsertApplication,
  Document, InsertDocument,
  Appointment, InsertAppointment,
  Feedback, InsertFeedback,
  AdminLog, InsertAdminLog,
  Setting, InsertSetting,
  VisaType, InsertVisaType,
  Contact, InsertContact,
  users, applications, documents, appointments, feedback, adminLogs, settings, visaTypes, contacts
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
    try {
      // Tabloda hangi kolonlar var kontrol et
      const tableInfo = await pool.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'users'
      `);
      const columns = tableInfo.rows.map(row => row.column_name);
      
      if (columns.includes('first_name') && columns.includes('last_name')) {
        // Drizzle şemasıyla uyumlu kullanım
        const result = await db.select().from(users).where(eq(users.id, id));
        if (result.length === 0) return undefined;
        return result[0];
      } else {
        // Full_name formatında, manual query ile sorgu yapma
        const result = await pool.query(`
          SELECT id, username, password, email, full_name, phone, role, created_at, last_login
          FROM users WHERE id = $1
        `, [id]);
        
        if (result.rows.length === 0) return undefined;
        
        // Sonucu schema.ts'deki User tipine uygun biçimde dönüştür
        const user = result.rows[0];
        const nameParts = user.full_name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        
        return {
          id: user.id,
          username: user.username,
          password: user.password,
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          createdAt: user.created_at,
          updatedAt: user.last_login || user.created_at
        };
      }
    } catch (error) {
      console.error('Error in getUser:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      // Tabloda hangi kolonlar var kontrol et
      const tableInfo = await pool.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'users'
      `);
      const columns = tableInfo.rows.map(row => row.column_name);
      
      if (columns.includes('first_name') && columns.includes('last_name')) {
        // Drizzle şemasıyla uyumlu kullanım
        const result = await db.select().from(users).where(eq(users.username, username));
        if (result.length === 0) return undefined;
        return result[0];
      } else {
        // Full_name formatında, manual query ile sorgu yapma
        const result = await pool.query(`
          SELECT id, username, password, email, full_name, phone, role, created_at, last_login
          FROM users WHERE username = $1
        `, [username]);
        
        if (result.rows.length === 0) return undefined;
        
        // Sonucu schema.ts'deki User tipine uygun biçimde dönüştür
        const user = result.rows[0];
        const nameParts = user.full_name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        
        return {
          id: user.id,
          username: user.username,
          password: user.password,
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          createdAt: user.created_at,
          updatedAt: user.last_login || user.created_at
        };
      }
    } catch (error) {
      console.error('Error in getUserByUsername:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      // Tabloda hangi kolonlar var kontrol et
      const tableInfo = await pool.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'users'
      `);
      const columns = tableInfo.rows.map(row => row.column_name);
      
      if (columns.includes('first_name') && columns.includes('last_name')) {
        // Drizzle şemasıyla uyumlu kullanım
        const result = await db.select().from(users).where(eq(users.email, email));
        if (result.length === 0) return undefined;
        return result[0];
      } else {
        // Full_name formatında, manual query ile sorgu yapma
        const result = await pool.query(`
          SELECT id, username, password, email, full_name, phone, role, created_at, last_login
          FROM users WHERE email = $1
        `, [email]);
        
        if (result.rows.length === 0) return undefined;
        
        // Sonucu schema.ts'deki User tipine uygun biçimde dönüştür
        const user = result.rows[0];
        const nameParts = user.full_name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        
        return {
          id: user.id,
          username: user.username,
          password: user.password,
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          createdAt: user.created_at,
          updatedAt: user.last_login || user.created_at
        };
      }
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      return undefined;
    }
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
  
  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(contact).returning();
    return result[0];
  }
  
  async getContact(id: number): Promise<Contact | undefined> {
    const result = await db.select().from(contacts).where(eq(contacts.id, id));
    return result[0];
  }
  
  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }
  
  async updateContact(id: number, updates: Partial<Contact>): Promise<Contact> {
    const result = await db.update(contacts)
      .set({
        ...updates,
        updatedAt: new Date()
      })
      .where(eq(contacts.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error(`Contact with ID ${id} not found`);
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
      
      // Kullanıcı hesaplarını oluştur - verilen şifreler zaten hash'lenmiş
      
      // Önce users tablosunun şemasını kontrol et
      const checkTableSchema = await pool.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'users'
      `);
      
      const userColumns = checkTableSchema.rows.map(row => row.column_name);
      console.log('User table columns:', userColumns);
      
      // Kolon isimlerine göre uygun insert yap
      if (userColumns.includes('first_name') && userColumns.includes('last_name')) {
        // Admin kullanıcısı oluştur (firstName, lastName formatında)
        await db.insert(users).values({
          username: "admin",
          password: "7ec4fcc11730d89a2376fe7d8a5c3a5cc1f4155f4dd2b7a8b52ea4f3c03cd30ac442bc3666043a1b861789de49cacb8c8e01e4a1de8746b32c0a28d15e7cf533.5f58c240eeaaa0ce91e3e8ece83c4cbf", // admin123
          firstName: "Admin",
          lastName: "User",
          email: "admin@example.com",
          phone: "+90 555 000 0000",
          role: "admin",
          createdAt: now,
          updatedAt: now
        });
        
        // Murat kullanıcısı oluştur
        await db.insert(users).values({
          username: "murat_",
          password: "d431dfa6e7a6a5f1064235c36daf09fdbf30bc9b79d3a84e1db4f1de3c0c17db2f9f1f54e9fcf83c35d944e82af4f645ddc72fe7f3c0884fa4a7f4ddc66c0d4e.af02ae15dcc1fb2c", // samet19
          firstName: "Murat",
          lastName: "Samet",
          email: "murat@example.com",
          phone: "+90 555 111 1111",
          role: "user",
          createdAt: now,
          updatedAt: now
        });
      } else if (userColumns.includes('full_name')) {
        // SQL olarak direkt ekle (full_name formatında)
        await pool.query(`
          INSERT INTO users (username, password, email, full_name, phone, role, created_at) 
          VALUES ('admin', '7ec4fcc11730d89a2376fe7d8a5c3a5cc1f4155f4dd2b7a8b52ea4f3c03cd30ac442bc3666043a1b861789de49cacb8c8e01e4a1de8746b32c0a28d15e7cf533.5f58c240eeaaa0ce91e3e8ece83c4cbf', 'admin@example.com', 'Admin User', '+90 555 000 0000', 'admin', NOW())
        `);
        
        await pool.query(`
          INSERT INTO users (username, password, email, full_name, phone, role, created_at) 
          VALUES ('murat_', 'd431dfa6e7a6a5f1064235c36daf09fdbf30bc9b79d3a84e1db4f1de3c0c17db2f9f1f54e9fcf83c35d944e82af4f645ddc72fe7f3c0884fa4a7f4ddc66c0d4e.af02ae15dcc1fb2c', 'murat@example.com', 'Murat Samet', '+90 555 111 1111', 'user', NOW())
        `);
      }
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