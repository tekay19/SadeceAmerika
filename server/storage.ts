import { 
  users, User, InsertUser, 
  applications, Application, InsertApplication,
  documents, Document, InsertDocument,
  appointments, Appointment, InsertAppointment,
  feedback, Feedback, InsertFeedback,
  adminLogs, AdminLog, InsertAdminLog,
  settings, Setting, InsertSetting,
  visaTypes, VisaType, InsertVisaType,
  contacts, Contact, InsertContact
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  deleteUser(id: number): Promise<boolean>;
  
  // Visa type methods
  getAllVisaTypes(): Promise<VisaType[]>;
  getVisaType(id: number): Promise<VisaType | undefined>;
  createVisaType(visaType: InsertVisaType): Promise<VisaType>;
  
  // Application methods
  createApplication(application: InsertApplication): Promise<Application>;
  getApplication(id: number): Promise<Application | undefined>;
  getUserApplications(userId: number): Promise<Application[]>;
  getAllApplications(): Promise<Application[]>;
  updateApplication(id: number, updates: Partial<Application>): Promise<Application>;
  
  // Document methods
  createDocument(document: InsertDocument): Promise<Document>;
  getDocument(id: number): Promise<Document | undefined>;
  getApplicationDocuments(applicationId: number): Promise<Document[]>;
  updateDocument(id: number, updates: Partial<Document>): Promise<Document>;
  
  // Appointment methods
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getApplicationAppointment(applicationId: number): Promise<Appointment | undefined>;
  
  // Feedback methods
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getAllFeedback(): Promise<Feedback[]>;
  
  // Admin log methods
  createAdminLog(log: InsertAdminLog): Promise<AdminLog>;
  getAllAdminLogs(): Promise<AdminLog[]>;
  
  // Settings methods
  getSetting(id: number): Promise<Setting | undefined>;
  getSettingByKey(category: string, key: string): Promise<Setting | undefined>;
  getSettingsByCategory(category: string): Promise<Setting[]>;
  getAllSettings(): Promise<Setting[]>;
  createSetting(setting: InsertSetting): Promise<Setting>;
  updateSetting(id: number, updates: Partial<Setting>): Promise<Setting>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContact(id: number): Promise<Contact | undefined>;
  getAllContacts(): Promise<Contact[]>;
  updateContact(id: number, updates: Partial<Contact>): Promise<Contact>;
  
  // Session store
  sessionStore: any; // Using any type to avoid SessionStore error
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private visaTypes: Map<number, VisaType>;
  private applications: Map<number, Application>;
  private documents: Map<number, Document>;
  private appointments: Map<number, Appointment>;
  private feedbacks: Map<number, Feedback>;
  private adminLogs: Map<number, AdminLog>;
  private settings: Map<number, Setting>;
  private contacts: Map<number, Contact>;
  sessionStore: any; // Using any type to avoid SessionStore error
  
  private userCurrentId: number;
  private visaTypeCurrentId: number;
  private applicationCurrentId: number;
  private documentCurrentId: number;
  private appointmentCurrentId: number;
  private feedbackCurrentId: number;
  private adminLogCurrentId: number;
  private settingCurrentId: number;
  private contactCurrentId: number;

  constructor() {
    this.users = new Map();
    this.visaTypes = new Map();
    this.applications = new Map();
    this.documents = new Map();
    this.appointments = new Map();
    this.feedbacks = new Map();
    this.adminLogs = new Map();
    this.settings = new Map();
    this.contacts = new Map();
    
    this.userCurrentId = 1;
    this.visaTypeCurrentId = 1;
    this.applicationCurrentId = 1;
    this.documentCurrentId = 1;
    this.appointmentCurrentId = 1;
    this.feedbackCurrentId = 1;
    this.adminLogCurrentId = 1;
    this.settingCurrentId = 1;
    this.contactCurrentId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
    
    // Initialize some visa types
    this.initializeVisaTypes();
    
    // Initialize test users
    this.initializeTestUsers();
    
    // Initialize default settings
    this.initializeDefaultSettings();
  }
  
  private initializeDefaultSettings() {
    // Initialize default general settings
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
    
    // Initialize default email settings
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
    
    // Initialize default security settings
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
    
    // Initialize default logging settings
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
    
    // Combine all settings and add them to the settings map
    const allSettings = [...generalSettings, ...emailSettings, ...securitySettings, ...loggingSettings];
    
    allSettings.forEach(setting => {
      const id = this.settingCurrentId++;
      this.settings.set(id, { ...setting, id });
    });
  }

  private initializeVisaTypes() {
    const types = [
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
    
    types.forEach(type => {
      const id = this.visaTypeCurrentId++;
      this.visaTypes.set(id, { ...type, id });
    });
  }
  
  private initializeTestUsers() {
    // For development purposes using plain text password for easier testing
    const plainPassword = "password1";
    const now = new Date();
    
    // Create a regular user
    const user1 = {
      id: this.userCurrentId++,
      username: "user1",
      password: plainPassword,
      firstName: "Normal",
      lastName: "User",
      email: "user1@example.com",
      phone: "+90 555 123 4567",
      role: "user" as const,
      createdAt: now,
      updatedAt: now
    };
    this.users.set(user1.id, user1);
    
    // Create an officer
    const officer1 = {
      id: this.userCurrentId++,
      username: "officer1",
      password: plainPassword,
      firstName: "Visa",
      lastName: "Officer",
      email: "officer1@example.com",
      phone: "+90 555 987 6543",
      role: "officer" as const,
      createdAt: now,
      updatedAt: now
    };
    this.users.set(officer1.id, officer1);
    
    // Create an admin
    const admin1 = {
      id: this.userCurrentId++,
      username: "admin1",
      password: plainPassword,
      firstName: "Admin",
      lastName: "User",
      email: "admin1@example.com",
      phone: "+90 555 000 0000",
      role: "admin" as const,
      createdAt: now,
      updatedAt: now
    };
    this.users.set(admin1.id, admin1);
    
    // Create a sample application for the regular user
    const application1 = {
      id: this.applicationCurrentId++,
      userId: user1.id,
      visaTypeId: 3, // Student visa
      applicationDate: now,
      status: "pending" as const,
      notes: "Application for studying abroad for university degree",
      assignedOfficerId: officer1.id
    };
    this.applications.set(application1.id, application1);
    
    // Create documents for the application
    const docTypes = ["Passport", "Photo", "Employment Letter", "Bank Statement"];
    docTypes.forEach(docName => {
      const doc = {
        id: this.documentCurrentId++,
        applicationId: application1.id,
        name: docName,
        filePath: `/uploads/${docName.toLowerCase().replace(/\s+/g, '_')}.pdf`,
        uploadDate: now,
        status: "pending" as const,
        notes: null
      };
      this.documents.set(doc.id, doc);
    });
    
    // Create an appointment for the application
    const appointment1 = {
      id: this.appointmentCurrentId++,
      applicationId: application1.id,
      date: new Date("2023-08-15"),
      time: "10:00 AM",
      location: "US Consulate, Istanbul",
      purpose: "Document verification and interview",
      status: "scheduled" as const
    };
    this.appointments.set(appointment1.id, appointment1);
    
    // Create a feedback from the user
    const feedback1 = {
      id: this.feedbackCurrentId++,
      userId: user1.id,
      content: "The visa application process was very straightforward. Thank you!",
      rating: 5,
      createdAt: now
    };
    this.feedbacks.set(feedback1.id, feedback1);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const now = new Date();
    // Set default values for required fields that might be undefined
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || 'user',
      phone: insertUser.phone || null,
      createdAt: now,
      updatedAt: now
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    if (!this.users.has(id)) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Get user applications
    const userApplications = await this.getUserApplications(id);
    
    // Silme işlemi için destek - kullanıcıya ait uygulamaları sil
    if (userApplications.length > 0) {
      // Her uygulama için döngü
      for (const application of userApplications) {
        // 1. Aplikasyona bağlı belgeleri sil
        const documents = await this.getApplicationDocuments(application.id);
        for (const document of documents) {
          this.documents.delete(document.id);
        }
        
        // 2. Aplikasyona bağlı randevuyu sil
        const appointment = await this.getApplicationAppointment(application.id);
        if (appointment) {
          this.appointments.delete(appointment.id);
        }
        
        // 3. Aplikasyonu sil
        this.applications.delete(application.id);
      }
    }
    
    // 4. Kullanıcının geri bildirimlerini sil
    this.feedbacks = new Map(
      Array.from(this.feedbacks.entries()).filter(([_, feedback]) => feedback.userId !== id)
    );
    
    // 5. Kullanıcının admin kayıtlarını sil
    this.adminLogs = new Map(
      Array.from(this.adminLogs.entries()).filter(([_, log]) => log.userId !== id)
    );

    // Şimdi kullanıcıyı güvenle silebiliriz
    return this.users.delete(id);
  }

  // Visa type methods
  async getAllVisaTypes(): Promise<VisaType[]> {
    return Array.from(this.visaTypes.values());
  }

  async getVisaType(id: number): Promise<VisaType | undefined> {
    return this.visaTypes.get(id);
  }
  
  async createVisaType(insertVisaType: InsertVisaType): Promise<VisaType> {
    const id = this.visaTypeCurrentId++;
    const visaType: VisaType = {
      ...insertVisaType,
      id
    };
    this.visaTypes.set(id, visaType);
    return visaType;
  }

  // Application methods
  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.applicationCurrentId++;
    const application: Application = { 
      ...insertApplication, 
      id,
      status: insertApplication.status || 'pending',
      applicationDate: insertApplication.applicationDate || new Date(),
      notes: insertApplication.notes || null,
      assignedOfficerId: insertApplication.assignedOfficerId || null
    };
    this.applications.set(id, application);
    return application;
  }

  async getApplication(id: number): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async getUserApplications(userId: number): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(
      (application) => application.userId === userId,
    );
  }

  async getAllApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }

  async updateApplication(id: number, updates: Partial<Application>): Promise<Application> {
    const application = this.applications.get(id);
    if (!application) {
      throw new Error(`Application with ID ${id} not found`);
    }
    
    const updatedApplication = { ...application, ...updates };
    this.applications.set(id, updatedApplication);
    return updatedApplication;
  }

  // Document methods
  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = this.documentCurrentId++;
    const document: Document = { 
      ...insertDocument, 
      id,
      status: insertDocument.status || 'pending',
      notes: insertDocument.notes || null,
      uploadDate: insertDocument.uploadDate || new Date()
    };
    this.documents.set(id, document);
    return document;
  }

  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async getApplicationDocuments(applicationId: number): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(
      (document) => document.applicationId === applicationId,
    );
  }

  async updateDocument(id: number, updates: Partial<Document>): Promise<Document> {
    const document = this.documents.get(id);
    if (!document) {
      throw new Error(`Document with ID ${id} not found`);
    }
    
    const updatedDocument = { ...document, ...updates };
    this.documents.set(id, updatedDocument);
    return updatedDocument;
  }

  // Appointment methods
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentCurrentId++;
    const appointment: Appointment = { 
      ...insertAppointment, 
      id,
      status: insertAppointment.status || 'scheduled'
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async getApplicationAppointment(applicationId: number): Promise<Appointment | undefined> {
    return Array.from(this.appointments.values()).find(
      (appointment) => appointment.applicationId === applicationId,
    );
  }

  // Feedback methods
  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = this.feedbackCurrentId++;
    const feedback: Feedback = { 
      ...insertFeedback, 
      id,
      content: insertFeedback.content || "",
      createdAt: insertFeedback.createdAt || new Date()
    };
    this.feedbacks.set(id, feedback);
    return feedback;
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedbacks.values());
  }

  // Admin log methods
  async createAdminLog(insertAdminLog: InsertAdminLog): Promise<AdminLog> {
    const id = this.adminLogCurrentId++;
    const adminLog: AdminLog = { 
      ...insertAdminLog, 
      id,
      details: insertAdminLog.details || null,
      timestamp: insertAdminLog.timestamp || new Date()
    };
    this.adminLogs.set(id, adminLog);
    return adminLog;
  }

  async getAllAdminLogs(): Promise<AdminLog[]> {
    return Array.from(this.adminLogs.values());
  }
  
  // Settings methods
  async getSetting(id: number): Promise<Setting | undefined> {
    return this.settings.get(id);
  }
  
  async getSettingByKey(category: string, key: string): Promise<Setting | undefined> {
    return Array.from(this.settings.values()).find(
      (setting) => setting.category === category && setting.key === key,
    );
  }
  
  async getSettingsByCategory(category: string): Promise<Setting[]> {
    return Array.from(this.settings.values()).filter(
      (setting) => setting.category === category,
    );
  }
  
  async getAllSettings(): Promise<Setting[]> {
    return Array.from(this.settings.values());
  }
  
  async createSetting(insertSetting: InsertSetting): Promise<Setting> {
    const id = this.settingCurrentId++;
    const setting: Setting = { 
      ...insertSetting, 
      id,
      description: insertSetting.description || null
    };
    this.settings.set(id, setting);
    return setting;
  }
  
  async updateSetting(id: number, updates: Partial<Setting>): Promise<Setting> {
    const setting = this.settings.get(id);
    if (!setting) {
      throw new Error(`Setting with ID ${id} not found`);
    }
    
    const updatedSetting = { 
      ...setting, 
      ...updates
    };
    this.settings.set(id, updatedSetting);
    return updatedSetting;
  }
  
  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const now = new Date();
    const contact: Contact = { 
      ...insertContact, 
      id,
      status: insertContact.status || 'new',
      phone: insertContact.phone || null,
      assignedToId: insertContact.assignedToId || null,
      responseNotes: insertContact.responseNotes || null,
      createdAt: now,
      updatedAt: now
    };
    this.contacts.set(id, contact);
    return contact;
  }
  
  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }
  
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
  
  async updateContact(id: number, updates: Partial<Contact>): Promise<Contact> {
    const contact = this.contacts.get(id);
    if (!contact) {
      throw new Error(`Contact with ID ${id} not found`);
    }
    
    const updatedContact = { ...contact, ...updates };
    updatedContact.updatedAt = new Date();
    this.contacts.set(id, updatedContact);
    return updatedContact;
  }
}

export const storage = new MemStorage();
