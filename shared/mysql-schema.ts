import { 
  mysqlTable, 
  varchar, 
  text, 
  int, 
  boolean, 
  timestamp, 
  mysqlEnum,
  uniqueIndex
} from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// MySQL için enum değerlerini string olarak tanımlıyoruz
export const roleEnum = varchar('role', { length: 20 });
export const applicationStatusEnum = varchar('status', { length: 20 });
export const documentStatusEnum = varchar('document_status', { length: 20 });
export const appointmentStatusEnum = varchar('appointment_status', { length: 20 });
export const settingsCategoryEnum = varchar('settings_category', { length: 20 });
export const contactStatusEnum = varchar('contact_status', { length: 20 });

// Şifre sıfırlama tablosu 
export const passwordResetTokens = mysqlTable("password_reset_tokens", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

// Giriş doğrulama kodları tablosu
export const loginVerificationCodes = mysqlTable("login_verification_codes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  code: varchar("code", { length: 10 }).notNull(),
  isUsed: boolean("is_used").notNull().default(false),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

// Kullanıcılar tablosu
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 100 }),
  role: roleEnum.notNull().default('user'),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

// Vize türleri tablosu
export const visaTypes = mysqlTable("visa_types", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  processingTime: varchar("processing_time", { length: 100 }).notNull()
});

// Başvurular tablosu
export const applications = mysqlTable("applications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  visaTypeId: int("visa_type_id").notNull(),
  applicationDate: timestamp("application_date").notNull().defaultNow(),
  status: applicationStatusEnum.notNull().default('pending'),
  notes: text("notes"),
  assignedOfficerId: int("assigned_officer_id"),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  age: int("age"),
  phone: varchar("phone", { length: 100 }),
  occupation: varchar("occupation", { length: 255 })
});

// Belgeler tablosu
export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(),
  applicationId: int("application_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  filePath: varchar("file_path", { length: 255 }).notNull(),
  uploadDate: timestamp("upload_date").notNull().defaultNow(),
  status: documentStatusEnum.notNull().default('pending'),
  notes: text("notes")
});

// Randevular tablosu
export const appointments = mysqlTable("appointments", {
  id: int("id").autoincrement().primaryKey(),
  applicationId: int("application_id").notNull(),
  date: timestamp("date").notNull(),
  time: varchar("time", { length: 10 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  purpose: varchar("purpose", { length: 255 }).notNull(),
  status: appointmentStatusEnum.notNull().default('scheduled')
});

// Geri bildirim tablosu
export const feedback = mysqlTable("feedback", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  content: text("content").notNull(),
  rating: int("rating").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

// Yönetici günlükleri tablosu
export const adminLogs = mysqlTable("admin_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  action: varchar("action", { length: 255 }).notNull(),
  details: text("details"),
  timestamp: timestamp("timestamp").notNull().defaultNow()
});

// Ayarlar tablosu
export const settings = mysqlTable("settings", {
  id: int("id").autoincrement().primaryKey(),
  category: settingsCategoryEnum.notNull(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value").notNull(),
  description: text("description")
});

// İletişim tablosu
export const contacts = mysqlTable("contacts", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 100 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: contactStatusEnum.notNull().default('new'),
  assignedToId: int("assigned_to_id"),
  responseNotes: text("response_notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

// Kullanıcı ekleme şeması
export const insertUserSchema = createInsertSchema(users, {
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  role: z.enum(['user', 'officer', 'admin'])
});

// Vize türleri ekleme şeması 
export const insertVisaTypeSchema = createInsertSchema(visaTypes);

// Diğer şemalar için de benzer tanımlamalar yapılabilir

// Tip tanımlamaları
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type VisaType = typeof visaTypes.$inferSelect;
export type InsertVisaType = typeof visaTypes.$inferInsert;

export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;

export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;

export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = typeof feedback.$inferInsert;

export type AdminLog = typeof adminLogs.$inferSelect;
export type InsertAdminLog = typeof adminLogs.$inferInsert;

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

export type LoginVerificationCode = typeof loginVerificationCodes.$inferSelect;
export type InsertLoginVerificationCode = typeof loginVerificationCodes.$inferInsert;