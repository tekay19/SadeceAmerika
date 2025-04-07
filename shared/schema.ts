import { pgTable, text, serial, integer, boolean, date, timestamp, pgEnum, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Role enum for user roles
export const roleEnum = pgEnum('role', ['user', 'officer', 'admin']);

// Status enum for application statuses
export const applicationStatusEnum = pgEnum('status', [
  'pending',
  'reviewing',
  'approved',
  'rejected',
  'completed'
]);

// Document status enum
export const documentStatusEnum = pgEnum('document_status', [
  'pending',
  'approved',
  'rejected'
]);

// Appointment status enum
export const appointmentStatusEnum = pgEnum('appointment_status', [
  'scheduled',
  'completed',
  'cancelled'
]);

// Settings category enum
export const settingsCategoryEnum = pgEnum('settings_category', [
  'general',
  'email',
  'security',
  'logging'
]);

// Contact status enum
export const contactStatusEnum = pgEnum('contact_status', [
  'new',
  'in_progress',
  'completed'
]);

// Password reset tokens table
export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

// Login verification codes table
export const loginVerificationCodes = pgTable("login_verification_codes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  email: text("email").notNull(),
  code: text("code").notNull(),
  isUsed: boolean("is_used").notNull().default(false),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  role: roleEnum("role").notNull().default('user'),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

// Visa types table
export const visaTypes = pgTable("visa_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  processingTime: text("processing_time").notNull()
});

// Applications table
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  visaTypeId: integer("visa_type_id").notNull().references(() => visaTypes.id),
  applicationDate: timestamp("application_date").notNull().defaultNow(),
  status: applicationStatusEnum("status").notNull().default('pending'),
  notes: text("notes"),
  assignedOfficerId: integer("assigned_officer_id").references(() => users.id),
  // Ek kişisel bilgiler
  firstName: text("first_name"),
  lastName: text("last_name"),
  age: integer("age"),
  phone: text("phone"),
  occupation: text("occupation") // Yapılan iş/meslek
});

// Documents table
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  applicationId: integer("application_id").notNull().references(() => applications.id),
  name: text("name").notNull(),
  filePath: text("file_path").notNull(),
  uploadDate: timestamp("upload_date").notNull().defaultNow(),
  status: documentStatusEnum("document_status").notNull().default('pending'),
  notes: text("notes")
});

// Appointments table
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  applicationId: integer("application_id").notNull().references(() => applications.id),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  purpose: text("purpose").notNull(),
  status: appointmentStatusEnum("status").notNull().default('scheduled')
});

// Feedback table
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

// Admin logs table
export const adminLogs = pgTable("admin_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  action: text("action").notNull(),
  details: text("details"),
  timestamp: timestamp("timestamp").notNull().defaultNow()
});

// Settings table
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  category: settingsCategoryEnum("category").notNull(),
  key: text("key").notNull(),
  value: text("value").notNull(),
  description: text("description"),
});

// Contact table
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: contactStatusEnum("status").notNull().default('new'),
  assignedToId: integer("assigned_to_id").references(() => users.id),
  responseNotes: text("response_notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
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
