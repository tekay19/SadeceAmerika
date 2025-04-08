import { mysqlTable, varchar, text, int, boolean, datetime, timestamp, unique } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

// Users table
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 100 }),
  role: varchar("role", { length: 10 }).notNull().default('user'),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Password reset tokens table
export const passwordResetTokens = mysqlTable("password_reset_tokens", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull().references(() => users.id),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: datetime("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Login verification codes table
export const loginVerificationCodes = mysqlTable("login_verification_codes", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull().references(() => users.id),
  email: varchar("email", { length: 255 }).notNull(),
  code: varchar("code", { length: 100 }).notNull(),
  isUsed: boolean("is_used").notNull().default(false),
  expiresAt: datetime("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Visa types table
export const visaTypes = mysqlTable("visa_types", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  processingTime: varchar("processing_time", { length: 100 }).notNull()
});

// Applications table
export const applications = mysqlTable("applications", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull().references(() => users.id),
  visaTypeId: int("visa_type_id").notNull().references(() => visaTypes.id),
  applicationDate: timestamp("application_date").notNull().default(sql`CURRENT_TIMESTAMP`),
  status: varchar("status", { length: 20 }).notNull().default('pending'),
  notes: text("notes"),
  assignedOfficerId: int("assigned_officer_id").references(() => users.id),
  // Ek kişisel bilgiler
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  age: int("age"),
  phone: varchar("phone", { length: 100 }),
  occupation: varchar("occupation", { length: 255 }) // Yapılan iş/meslek
});

// Documents table
export const documents = mysqlTable("documents", {
  id: int("id").primaryKey().autoincrement(),
  applicationId: int("application_id").notNull().references(() => applications.id),
  name: varchar("name", { length: 255 }).notNull(),
  filePath: varchar("file_path", { length: 500 }).notNull(),
  uploadDate: timestamp("upload_date").notNull().default(sql`CURRENT_TIMESTAMP`),
  status: varchar("status", { length: 20 }).notNull().default('pending'),
  notes: text("notes")
});

// Appointments table
export const appointments = mysqlTable("appointments", {
  id: int("id").primaryKey().autoincrement(),
  applicationId: int("application_id").notNull().references(() => applications.id),
  date: datetime("date").notNull(),
  time: varchar("time", { length: 50 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  purpose: varchar("purpose", { length: 255 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default('scheduled')
});

// Feedback table
export const feedback = mysqlTable("feedback", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  rating: int("rating").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Admin logs table
export const adminLogs = mysqlTable("admin_logs", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull().references(() => users.id),
  action: varchar("action", { length: 255 }).notNull(),
  details: text("details"),
  timestamp: timestamp("timestamp").notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Settings table
export const settings = mysqlTable("settings", {
  id: int("id").primaryKey().autoincrement(),
  category: varchar("category", { length: 20 }).notNull().default('general'),
  key: varchar("key", { length: 255 }).notNull(),
  value: text("value").notNull(),
  description: text("description")
});

// Contact table
export const contacts = mysqlTable("contacts", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 100 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).notNull().default('new'),
  assignedToId: int("assigned_to_id").references(() => users.id),
  responseNotes: text("response_notes"),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`)
});

// Schema for user insert
export const insertUserSchema = createInsertSchema(users, {
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  role: z.enum(['user', 'officer', 'admin'])
});

// Schema for visa type insert
export const insertVisaTypeSchema = createInsertSchema(visaTypes, {
  name: z.string(),
  description: z.string(),
  requirements: z.string(),
  processingTime: z.string()
});

// Schema for application insert
export const insertApplicationSchema = createInsertSchema(applications, {
  userId: z.number(),
  visaTypeId: z.number(),
  status: z.enum(['pending', 'reviewing', 'approved', 'rejected', 'completed']),
  notes: z.string().optional(),
  assignedOfficerId: z.number().optional(),
  // Ek kişisel bilgiler
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z.number().optional(),
  phone: z.string().optional(),
  occupation: z.string().optional()
});

// Schema for document insert
export const insertDocumentSchema = createInsertSchema(documents, {
  applicationId: z.number(),
  name: z.string(),
  filePath: z.string(),
  status: z.enum(['pending', 'approved', 'rejected']),
  notes: z.string().optional()
});

// Schema for appointment insert
export const insertAppointmentSchema = createInsertSchema(appointments, {
  applicationId: z.number(),
  date: z.date(),
  time: z.string(),
  location: z.string(),
  purpose: z.string(),
  status: z.enum(['scheduled', 'completed', 'cancelled'])
});

// Schema for feedback insert
export const insertFeedbackSchema = createInsertSchema(feedback, {
  userId: z.number(),
  content: z.string(),
  rating: z.number()
});

// Schema for admin log insert
export const insertAdminLogSchema = createInsertSchema(adminLogs, {
  userId: z.number(),
  action: z.string(),
  details: z.string().optional()
});

// Schema for settings insert
export const insertSettingSchema = createInsertSchema(settings, {
  category: z.enum(['general', 'email', 'security', 'logging']),
  key: z.string(),
  value: z.string(),
  description: z.string().optional()
});

// Schema for contact insert
export const insertContactSchema = createInsertSchema(contacts, {
  name: z.string().min(3, { message: "Ad Soyad en az 3 karakter olmalıdır" }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  phone: z.string().min(10, { message: "Geçerli bir telefon numarası giriniz" }).optional(),
  subject: z.string().min(5, { message: "Konu en az 5 karakter olmalıdır" }),
  message: z.string().min(20, { message: "Mesajınız en az 20 karakter olmalıdır" }),
  status: z.enum(['new', 'in_progress', 'completed']).default('new'),
  assignedToId: z.number().optional(),
  responseNotes: z.string().optional()
});

// Login verification code insert schema
export const insertLoginVerificationCodeSchema = createInsertSchema(loginVerificationCodes, {
  userId: z.number(),
  email: z.string().email(),
  code: z.string(),
  expiresAt: z.date()
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertVisaType = z.infer<typeof insertVisaTypeSchema>;
export type VisaType = typeof visaTypes.$inferSelect;

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof feedback.$inferSelect;

export type InsertAdminLog = z.infer<typeof insertAdminLogSchema>;
export type AdminLog = typeof adminLogs.$inferSelect;

export type InsertSetting = z.infer<typeof insertSettingSchema>;
export type Setting = typeof settings.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertLoginVerificationCode = z.infer<typeof insertLoginVerificationCodeSchema>;
export type LoginVerificationCode = typeof loginVerificationCodes.$inferSelect;
