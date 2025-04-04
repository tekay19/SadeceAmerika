import { 
  users, User, InsertUser, 
  applications, Application, InsertApplication,
  documents, Document, InsertDocument,
  appointments, Appointment, InsertAppointment,
  feedback, Feedback, InsertFeedback,
  adminLogs, AdminLog, InsertAdminLog,
  settings, Setting, InsertSetting,
  visaTypes, VisaType
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
  
  // Visa type methods
  getAllVisaTypes(): Promise<VisaType[]>;
  getVisaType(id: number): Promise<VisaType | undefined>;
  
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
  
  // Session store
  sessionStore: session.SessionStore;
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
  sessionStore: session.SessionStore;
  
  private userCurrentId: number;
  private visaTypeCurrentId: number;
  private applicationCurrentId: number;
  private documentCurrentId: number;
  private appointmentCurrentId: number;
  private feedbackCurrentId: number;
  private adminLogCurrentId: number;
  private settingCurrentId: number;

  constructor() {
    this.users = new Map();
    this.visaTypes = new Map();
    this.applications = new Map();
    this.documents = new Map();
    this.appointments = new Map();
    this.feedbacks = new Map();
    this.adminLogs = new Map();
    this.settings = new Map();
    
    this.userCurrentId = 1;
    this.visaTypeCurrentId = 1;
    this.applicationCurrentId = 1;
    this.documentCurrentId = 1;
    this.appointmentCurrentId = 1;
    this.feedbackCurrentId = 1;
    this.adminLogCurrentId = 1;
    this.settingCurrentId = 1;
    
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
        description: 'Application Name', 
        lastUpdated: new Date(),
        updatedBy: 3 // admin1
      },
      { 
        category: 'general' as const, 
        key: 'version', 
        value: '1.0.0',
        description: 'Application Version', 
        lastUpdated: new Date(),
        updatedBy: 3 // admin1
      },
      { 
        category: 'general' as const, 
        key: 'mode', 
        value: 'production',
        description: 'Application Mode (production/development)', 
        lastUpdated: new Date(),
        updatedBy: 3 // admin1
      }
    ];
    
    // Initialize default email settings
    const emailSettings = [
      { 
        category: 'email' as const, 
        key: 'smtpHost', 
        value: 'smtp.gmail.com',
        description: 'SMTP Server Host', 
        lastUpdated: new Date(),
        updatedBy: 3 // admin1
      },
      { 
        category: 'email' as const, 
        key: 'smtpPort', 
        value: '587',
        description: 'SMTP Server Port', 
        lastUpdated: new Date(),
        updatedBy: 3 // admin1
      },
      { 
        category: 'email' as const, 
        key: 'emailUser', 
        value: 'noreply@visa.com',
        description: 'Sender Email Address', 
        lastUpdated: new Date(),
        updatedBy: 3 // admin1
      },
      { 
        category: 'email' as const, 
        key: 'emailPass', 
        value: 'secureemailpassword',
        description: 'Email Password (encrypted)', 
        lastUpdated: new Date(),
        updatedBy: 3 // admin1
      }
    ];
    
    // Initialize default security settings
    const securitySettings = [
      { 
        category: 'security' as const, 
        key: 'jwtSecret', 
        value: 'supersecuretoken',
        description: 'JWT Secret Token', 
        lastUpdated: new Date(),
        updatedBy: 3 // admin1
      },
      { 
        category: 'security' as const, 
        key: 'jwtExpiresIn', 
        value: '15m',
        description: 'JWT Token Expiration Time', 
        lastUpdated: new Date(),
        updatedBy: 3 // admin1
      },
      { 
        category: 'security' as const, 
        key: 'rateLimit', 
        value: '100',
        description: 'API Rate Limit per IP', 
        lastUpdated: new Date(),
        updatedBy: 3 // admin1
      }
    ];
    
    // Initialize default logging settings
    const loggingSettings = [
      { 
        category: 'logging' as const, 
        key: 'level', 
        value: 'info',
        description: 'Log Level (error, info, debug)', 
        lastUpdated: new Date(),
        updatedBy: 3 // admin1
      },
      { 
        category: 'logging' as const, 
        key: 'format', 
        value: 'combined',
        description: 'Log Format', 
        lastUpdated: new Date(),
        updatedBy: 3 // admin1
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
      { code: "B1", name: "Business", description: "For business-related activities" },
      { code: "B2", name: "Tourism", description: "For tourism or visiting friends/relatives" },
      { code: "F1", name: "Student", description: "For academic studies" },
      { code: "H1B", name: "Work", description: "For employment in specialty occupations" },
      { code: "J1", name: "Exchange Visitor", description: "For approved exchange visitor programs" }
    ];
    
    types.forEach(type => {
      const id = this.visaTypeCurrentId++;
      this.visaTypes.set(id, { ...type, id });
    });
  }
  
  private initializeTestUsers() {
    // For development purposes using plain text password for easier testing
    const plainPassword = "password1";
    
    // Create a regular user
    const user1 = {
      id: this.userCurrentId++,
      username: "user1",
      password: plainPassword,
      firstName: "Normal",
      lastName: "User",
      email: "user1@example.com",
      phone: "+90 555 123 4567",
      role: "user" as const
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
      role: "officer" as const
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
      role: "admin" as const
    };
    this.users.set(admin1.id, admin1);
    
    // Create a sample application for the regular user
    const application1 = {
      id: this.applicationCurrentId++,
      userId: user1.id,
      visaTypeId: 3, // F1 Student visa
      applicationNumber: "US-VISA-2023-10001",
      status: "documents_pending" as const,
      purpose: "Study abroad for university degree",
      travelDate: "2023-09-01", // Date as string to match schema
      submittedAt: new Date("2023-06-15"),
      lastUpdated: new Date("2023-06-15")
    };
    this.applications.set(application1.id, application1);
    
    // Create documents for the application
    const docTypes = ["passport", "photo", "employment_letter", "bank_statement"];
    docTypes.forEach(type => {
      const doc = {
        id: this.documentCurrentId++,
        applicationId: application1.id,
        type,
        fileName: `${type}_example.pdf`,
        filePath: `/uploads/${type}_example.pdf`,
        uploadedAt: new Date("2023-06-15"),
        status: "pending" as const,
        notes: null
      };
      this.documents.set(doc.id, doc);
    });
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
    // Set default values for required fields that might be undefined
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || 'user',
      phone: insertUser.phone || null 
    };
    this.users.set(id, user);
    return user;
  }

  // Visa type methods
  async getAllVisaTypes(): Promise<VisaType[]> {
    return Array.from(this.visaTypes.values());
  }

  async getVisaType(id: number): Promise<VisaType | undefined> {
    return this.visaTypes.get(id);
  }

  // Application methods
  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.applicationCurrentId++;
    const application: Application = { 
      ...insertApplication, 
      id,
      status: insertApplication.status || 'draft',
      purpose: insertApplication.purpose || null,
      travelDate: insertApplication.travelDate || null,
      submittedAt: insertApplication.submittedAt || null,
      lastUpdated: insertApplication.lastUpdated || null
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
      notes: insertDocument.notes || null
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
      notes: insertAppointment.notes || null
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
      message: insertFeedback.message || ""
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
      details: insertAdminLog.details || null
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
      description: insertSetting.description || null,
      lastUpdated: insertSetting.lastUpdated || new Date(),
      updatedBy: insertSetting.updatedBy || null
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
      ...updates,
      lastUpdated: new Date() // Always update the lastUpdated timestamp
    };
    this.settings.set(id, updatedSetting);
    return updatedSetting;
  }
}

export const storage = new MemStorage();
