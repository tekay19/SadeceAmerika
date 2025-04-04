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
  assignedOfficerId: integer("assigned_officer_id").references(() => users.id)
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
  assignedOfficerId: z.number().optional()
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
