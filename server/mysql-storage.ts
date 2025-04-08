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
  LoginVerificationCode, InsertLoginVerificationCode,
  users, applications, documents, appointments, feedback, adminLogs, settings, visaTypes, contacts, loginVerificationCodes
} from '@shared/mysql-schema';
import { eq, and, gt, desc } from 'drizzle-orm';
import { db, pool } from './mysql-db';
import { IStorage } from './storage';
import session from 'express-session';
import createMemoryStore from 'memorystore';
import MySQLStore from 'express-mysql-session';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';

const MemoryStore = createMemoryStore(session);

export class MySQLStorage implements IStorage {
  sessionStore: any;

  constructor() {
    // Her ortamda MySQL session store kullan (Hostinger deployment için)
    const MySQLStoreConstructor = MySQLStore(session);
    
    const options = {
      clearExpired: true,
      checkExpirationInterval: 86400000, // 24 saat (milisaniye) 
      expiration: 86400000, // 24 saat (milisaniye)
      createDatabaseTable: true,
      schema: {
        tableName: 'sessions',
        columnNames: {
          session_id: 'sid',
          expires: 'expires',
          data: 'data'
        }
      }
    };

    // @ts-ignore - MySQL2 connection havuzunu doğrudan kullan
    this.sessionStore = new MySQLStoreConstructor(options, pool);
    console.log('MySQL session store aktif');
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.id, id));
      if (result.length === 0) return undefined;
      return result[0];
    } catch (error) {
      console.error('Error in getUser:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.username, username));
      if (result.length === 0) return undefined;
      return result[0];
    } catch (error) {
      console.error('Error in getUserByUsername:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.email, email));
      if (result.length === 0) return undefined;
      return result[0];
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      return undefined;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user) as { insertId: number } & MySqlRawQueryResult;
    const insertedId = Number(result.insertId);
    const newUser = await this.getUser(insertedId);
    if (!newUser) {
      throw new Error('User could not be created');
    }
    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    await db.update(users)
      .set(updates)
      .where(eq(users.id, id));
    
    const updatedUser = await this.getUser(id);
    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    return updatedUser;
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
    await db.delete(users).where(eq(users.id, id));
    
    // Silme işleminin başarılı olup olmadığını kontrol et
    const userExists = await this.getUser(id);
    return userExists === undefined;
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
    const result = await db.insert(visaTypes).values(visaType) as { insertId: number } & MySqlRawQueryResult;
    const insertedId = Number(result.insertId);
    const newVisaType = await this.getVisaType(insertedId);
    if (!newVisaType) {
      throw new Error('Visa type could not be created');
    }
    return newVisaType;
  }

  // Application methods
  async createApplication(application: InsertApplication): Promise<Application> {
    const result = await db.insert(applications).values(application) as { insertId: number } & MySqlRawQueryResult;
    const insertedId = Number(result.insertId);
    const newApplication = await this.getApplication(insertedId);
    if (!newApplication) {
      throw new Error('Application could not be created');
    }
    return newApplication;
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
    await db.update(applications)
      .set(updates)
      .where(eq(applications.id, id));
    
    const updatedApplication = await this.getApplication(id);
    if (!updatedApplication) {
      throw new Error(`Application with ID ${id} not found`);
    }
    
    return updatedApplication;
  }

  // Document methods
  async createDocument(document: InsertDocument): Promise<Document> {
    const result = await db.insert(documents).values(document) as { insertId: number } & MySqlRawQueryResult;
    const insertedId = Number(result.insertId);
    const newDocument = await this.getDocument(insertedId);
    if (!newDocument) {
      throw new Error('Document could not be created');
    }
    return newDocument;
  }

  async getDocument(id: number): Promise<Document | undefined> {
    const result = await db.select().from(documents).where(eq(documents.id, id));
    return result[0];
  }

  async getApplicationDocuments(applicationId: number): Promise<Document[]> {
    return await db.select().from(documents).where(eq(documents.applicationId, applicationId));
  }

  async updateDocument(id: number, updates: Partial<Document>): Promise<Document> {
    await db.update(documents)
      .set(updates)
      .where(eq(documents.id, id));
    
    const updatedDocument = await this.getDocument(id);
    if (!updatedDocument) {
      throw new Error(`Document with ID ${id} not found`);
    }
    
    return updatedDocument;
  }

  // Appointment methods
  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const result = await db.insert(appointments).values(appointment) as { insertId: number } & MySqlRawQueryResult;
    const insertedId = Number(result.insertId);
    
    // Eklenen randevuyu getir
    const insertedAppointment = await db.select()
      .from(appointments)
      .where(eq(appointments.id, insertedId));
    
    if (insertedAppointment.length === 0) {
      throw new Error('Appointment could not be created');
    }
    
    return insertedAppointment[0];
  }

  async getApplicationAppointment(applicationId: number): Promise<Appointment | undefined> {
    const result = await db.select().from(appointments).where(eq(appointments.applicationId, applicationId));
    return result[0];
  }

  // Feedback methods
  async createFeedback(feedbackItem: InsertFeedback): Promise<Feedback> {
    const result = await db.insert(feedback).values(feedbackItem) as { insertId: number } & MySqlRawQueryResult;
    const insertedId = Number(result.insertId);
    
    const insertedFeedback = await db.select()
      .from(feedback)
      .where(eq(feedback.id, insertedId));
    
    if (insertedFeedback.length === 0) {
      throw new Error('Feedback could not be created');
    }
    
    return insertedFeedback[0];
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return await db.select().from(feedback);
  }

  // Admin log methods
  async createAdminLog(log: InsertAdminLog): Promise<AdminLog> {
    const result = await db.insert(adminLogs).values(log) as { insertId: number } & MySqlRawQueryResult;
    const insertedId = Number(result.insertId);
    
    const insertedLog = await db.select()
      .from(adminLogs)
      .where(eq(adminLogs.id, insertedId));
    
    if (insertedLog.length === 0) {
      throw new Error('Admin log could not be created');
    }
    
    return insertedLog[0];
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
    const result = await db.insert(settings).values(setting) as { insertId: number } & MySqlRawQueryResult;
    const insertedId = Number(result.insertId);
    
    const insertedSetting = await db.select()
      .from(settings)
      .where(eq(settings.id, insertedId));
    
    if (insertedSetting.length === 0) {
      throw new Error('Setting could not be created');
    }
    
    return insertedSetting[0];
  }

  async updateSetting(id: number, updates: Partial<Setting>): Promise<Setting> {
    await db.update(settings)
      .set(updates)
      .where(eq(settings.id, id));
    
    const updatedSetting = await this.getSetting(id);
    if (!updatedSetting) {
      throw new Error(`Setting with ID ${id} not found`);
    }
    
    return updatedSetting;
  }
  
  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(contact) as { insertId: number } & MySqlRawQueryResult;
    const insertedId = Number(result.insertId);
    
    const insertedContact = await db.select()
      .from(contacts)
      .where(eq(contacts.id, insertedId));
    
    if (insertedContact.length === 0) {
      throw new Error('Contact could not be created');
    }
    
    return insertedContact[0];
  }
  
  async getContact(id: number): Promise<Contact | undefined> {
    const result = await db.select().from(contacts).where(eq(contacts.id, id));
    return result[0];
  }
  
  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }
  
  async updateContact(id: number, updates: Partial<Contact>): Promise<Contact> {
    await db.update(contacts)
      .set({
        ...updates,
        updatedAt: new Date()
      })
      .where(eq(contacts.id, id));
    
    const updatedContact = await this.getContact(id);
    if (!updatedContact) {
      throw new Error(`Contact with ID ${id} not found`);
    }
    
    return updatedContact;
  }
  
  // Login verification code methods
  async createLoginVerificationCode(code: InsertLoginVerificationCode): Promise<LoginVerificationCode> {
    const result = await db.insert(loginVerificationCodes).values(code) as { insertId: number } & MySqlRawQueryResult;
    const insertedId = Number(result.insertId);
    
    const insertedCode = await db.select()
      .from(loginVerificationCodes)
      .where(eq(loginVerificationCodes.id, insertedId));
    
    if (insertedCode.length === 0) {
      throw new Error('Login verification code could not be created');
    }
    
    return insertedCode[0];
  }
  
  async getLoginVerificationCodeByCode(code: string): Promise<LoginVerificationCode | undefined> {
    const result = await db.select().from(loginVerificationCodes).where(eq(loginVerificationCodes.code, code));
    return result[0];
  }
  
  async getLoginVerificationCodeByUserId(userId: number): Promise<LoginVerificationCode | undefined> {
    // En son oluşturulan ve süresi dolmamış olanı bul
    const now = new Date();
    
    const result = await db
      .select()
      .from(loginVerificationCodes)
      .where(
        and(
          eq(loginVerificationCodes.userId, userId),
          gt(loginVerificationCodes.expiresAt, now),
          eq(loginVerificationCodes.isUsed, false)
        )
      )
      .orderBy(desc(loginVerificationCodes.createdAt))
      .limit(1);
    
    return result.length > 0 ? result[0] : undefined;
  }
  
  async updateLoginVerificationCode(id: number, updates: Partial<LoginVerificationCode>): Promise<LoginVerificationCode> {
    await db.update(loginVerificationCodes)
      .set(updates)
      .where(eq(loginVerificationCodes.id, id));
    
    // Get updated code
    const result = await db.select()
      .from(loginVerificationCodes)
      .where(eq(loginVerificationCodes.id, id));
    
    if (result.length === 0) {
      throw new Error(`Login verification code with ID ${id} not found`);
    }
    
    return result[0];
  }
  
  async deleteLoginVerificationCode(id: number): Promise<boolean> {
    // First check if the code exists
    const existingCode = await db.select()
      .from(loginVerificationCodes)
      .where(eq(loginVerificationCodes.id, id));
    
    if (existingCode.length === 0) {
      return false;
    }
    
    // Then delete it
    await db.delete(loginVerificationCodes)
      .where(eq(loginVerificationCodes.id, id));
    
    return true;
  }
}

// Veritabanı bağlantısını başlatmak ve test etmek
export const initializeMySQLStorage = async (): Promise<MySQLStorage> => {
  try {
    // İlk başlangıç verilerini oluştur
    await initializeData();
    return new MySQLStorage();
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

// Temel verileri oluştur
async function initializeData() {
  // 1. Admin rolünde kullanıcı var mı kontrol et
  const adminUsers = await db.select().from(users).where(eq(users.role, 'admin'));
  
  if (adminUsers.length === 0) {
    console.log('Admin kullanıcısı bulunamadı, varsayılan admin oluşturuluyor...');
    
    // 2. Admin kullanıcısı oluştur
    await db.insert(users).values({
      username: 'admin',
      // BCrypt ile şifrelenmiş 'admin123' (güvenlik için üretimde değiştirin)
      password: '$2b$10$wuRYVJdBV3bpFSmB1QfCZu9CwRp9TwtO2NXLpsERVDaNXLZsS7RdG',
      firstName: 'System',
      lastName: 'Administrator',
      email: 'admin@example.com',
      role: 'admin'
    });
    
    console.log('Varsayılan admin kullanıcısı oluşturuldu.');
    console.log('Kullanıcı adı: admin');
    console.log('Şifre: admin123');
    console.log('ÖNEMLİ: Bu bilgileri üretimde değiştirin!');
  }
  
  // 3. Vize türleri var mı kontrol et
  const visaTypeCount = await db.select().from(visaTypes);
  
  if (visaTypeCount.length === 0) {
    console.log('Vize türleri bulunamadı, varsayılan türler oluşturuluyor...');
    
    // 4. Varsayılan vize türleri oluştur
    const defaultVisaTypes = [
      {
        name: 'Turist Vizesi',
        description: 'Amerika Birleşik Devletleri\'ne turistik amaçlı seyahat etmek isteyenler için.',
        requirements: '- Geçerli pasaport\n- Vize başvuru formu\n- Seyahat planı\n- Finansal yeterlilik kanıtı',
        processingTime: '2-4 hafta'
      },
      {
        name: 'İş Vizesi',
        description: 'İş görüşmeleri veya ticari faaliyetler için ABD\'ye seyahat etmek isteyenler için.',
        requirements: '- Geçerli pasaport\n- Vize başvuru formu\n- İşveren mektubu\n- İş seyahati kanıtı',
        processingTime: '3-5 hafta'
      },
      {
        name: 'Öğrenci Vizesi',
        description: 'ABD\'de eğitim görmek isteyen uluslararası öğrenciler için.',
        requirements: '- Geçerli pasaport\n- Kabul mektubu\n- Finansal yeterlilik kanıtı\n- I-20 formu',
        processingTime: '3-6 hafta'
      }
    ];
    
    for (const visaType of defaultVisaTypes) {
      await db.insert(visaTypes).values(visaType);
    }
    
    console.log('Varsayılan vize türleri oluşturuldu.');
  }
  
  // 5. Temel sistem ayarlarını oluştur
  const settingsCount = await db.select().from(settings);
  
  if (settingsCount.length === 0) {
    console.log('Sistem ayarları bulunamadı, varsayılan ayarlar oluşturuluyor...');
    
    // 6. Varsayılan sistem ayarları
    const defaultSettings = [
      {
        category: 'general',
        key: 'site_name',
        value: 'Vize Başvuru Sistemi',
        description: 'Site başlığı'
      },
      {
        category: 'general',
        key: 'contact_email',
        value: 'info@example.com',
        description: 'İletişim e-posta adresi'
      },
      {
        category: 'email',
        key: 'smtp_host',
        value: 'smtp.example.com',
        description: 'SMTP sunucu adresi'
      },
      {
        category: 'email',
        key: 'smtp_port',
        value: '587',
        description: 'SMTP port numarası'
      },
      {
        category: 'email',
        key: 'smtp_user',
        value: 'smtp_user',
        description: 'SMTP kullanıcı adı'
      },
      {
        category: 'email',
        key: 'smtp_pass',
        value: 'smtp_password',
        description: 'SMTP şifresi'
      },
      {
        category: 'security',
        key: 'session_duration',
        value: '3600',
        description: 'Oturum süresi (saniye)'
      },
      {
        category: 'security',
        key: 'login_verification',
        value: 'false',
        description: 'İki faktörlü kimlik doğrulama'
      }
    ];
    
    for (const setting of defaultSettings) {
      await db.insert(settings).values(setting);
    }
    
    console.log('Varsayılan sistem ayarları oluşturuldu.');
  }
  
  console.log('Veritabanı başlangıç verilerinin kontrolü tamamlandı.');
}