import { pgTable, text, serial, integer, boolean, date, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Role enum for user roles
export const roleEnum = pgEnum('role', ['user', 'officer', 'admin']);

// Status enum for application statuses
export const applicationStatusEnum = pgEnum('status', [
  'draft',
  'submitted',
  'documents_pending',
  'documents_reviewing',
  'documents_approved',
  'appointment_scheduled',
  'interview_completed',
  'approved',
  'rejected',
  'additional_documents_required'
]);

// Document status enum
export const documentStatusEnum = pgEnum('document_status', [
  'pending',
  'approved',
  'rejected',
  'missing'
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
});

// Visa types table
export const visaTypes = pgTable("visa_types", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  description: text("description")
});

// Applications table
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  visaTypeId: integer("visa_type_id").notNull().references(() => visaTypes.id),
  applicationNumber: text("application_number").notNull().unique(),
  status: applicationStatusEnum("status").notNull().default('draft'),
  purpose: text("purpose"),
  travelDate: date("travel_date"),
  submittedAt: timestamp("submitted_at"),
  lastUpdated: timestamp("last_updated")
});

// Documents table
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  applicationId: integer("application_id").notNull().references(() => applications.id),
  type: text("type").notNull(),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  uploadedAt: timestamp("uploaded_at").notNull(),
  status: documentStatusEnum("document_status").notNull().default('pending'),
  notes: text("notes")
});

// Appointments table
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  applicationId: integer("application_id").notNull().references(() => applications.id),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  notes: text("notes")
});

// Feedback table
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").notNull()
});

// Admin logs table
export const adminLogs = pgTable("admin_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  action: text("action").notNull(),
  details: text("details"),
  timestamp: timestamp("timestamp").notNull()
});

// Schema for user insert
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  role: true,
});

// Schema for application insert
export const insertApplicationSchema = createInsertSchema(applications).pick({
  userId: true,
  visaTypeId: true,
  applicationNumber: true,
  status: true,
  purpose: true,
  travelDate: true,
  submittedAt: true,
  lastUpdated: true,
});

// Schema for document insert
export const insertDocumentSchema = createInsertSchema(documents).pick({
  applicationId: true,
  type: true,
  fileName: true,
  filePath: true,
  uploadedAt: true,
  status: true,
  notes: true,
});

// Schema for appointment insert
export const insertAppointmentSchema = createInsertSchema(appointments).pick({
  applicationId: true,
  date: true,
  location: true,
  notes: true,
});

// Schema for feedback insert
export const insertFeedbackSchema = createInsertSchema(feedback).pick({
  userId: true,
  message: true,
  submittedAt: true,
});

// Schema for admin log insert
export const insertAdminLogSchema = createInsertSchema(adminLogs).pick({
  userId: true,
  action: true,
  details: true,
  timestamp: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

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

export type VisaType = typeof visaTypes.$inferSelect;
