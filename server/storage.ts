import { 
  users, User, InsertUser, 
  applications, Application, InsertApplication,
  documents, Document, InsertDocument,
  appointments, Appointment, InsertAppointment,
  feedback, Feedback, InsertFeedback,
  adminLogs, AdminLog, InsertAdminLog,
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
  sessionStore: session.SessionStore;
  
  private userCurrentId: number;
  private visaTypeCurrentId: number;
  private applicationCurrentId: number;
  private documentCurrentId: number;
  private appointmentCurrentId: number;
  private feedbackCurrentId: number;
  private adminLogCurrentId: number;

  constructor() {
    this.users = new Map();
    this.visaTypes = new Map();
    this.applications = new Map();
    this.documents = new Map();
    this.appointments = new Map();
    this.feedbacks = new Map();
    this.adminLogs = new Map();
    
    this.userCurrentId = 1;
    this.visaTypeCurrentId = 1;
    this.applicationCurrentId = 1;
    this.documentCurrentId = 1;
    this.appointmentCurrentId = 1;
    this.feedbackCurrentId = 1;
    this.adminLogCurrentId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
    
    // Initialize some visa types
    this.initializeVisaTypes();
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
    const user: User = { ...insertUser, id };
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
    const application: Application = { ...insertApplication, id };
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
    const document: Document = { ...insertDocument, id };
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
    const appointment: Appointment = { ...insertAppointment, id };
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
    const feedback: Feedback = { ...insertFeedback, id };
    this.feedbacks.set(id, feedback);
    return feedback;
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedbacks.values());
  }

  // Admin log methods
  async createAdminLog(insertAdminLog: InsertAdminLog): Promise<AdminLog> {
    const id = this.adminLogCurrentId++;
    const adminLog: AdminLog = { ...insertAdminLog, id };
    this.adminLogs.set(id, adminLog);
    return adminLog;
  }

  async getAllAdminLogs(): Promise<AdminLog[]> {
    return Array.from(this.adminLogs.values());
  }
}

export const storage = new MemStorage();
