import { pgTable, foreignKey, serial, integer, timestamp, text, unique, varchar, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const appointmentStatus = pgEnum("appointment_status", ['scheduled', 'completed', 'cancelled'])
export const contactStatus = pgEnum("contact_status", ['new', 'in_progress', 'completed'])
export const documentStatus = pgEnum("document_status", ['pending', 'approved', 'rejected'])
export const role = pgEnum("role", ['user', 'officer', 'admin'])
export const settingsCategory = pgEnum("settings_category", ['general', 'email', 'security', 'logging'])
export const status = pgEnum("status", ['pending', 'reviewing', 'approved', 'rejected', 'completed'])


export const appointments = pgTable("appointments", {
	id: serial().primaryKey().notNull(),
	applicationId: integer("application_id").notNull(),
	date: timestamp({ mode: 'string' }).notNull(),
	time: text().notNull(),
	location: text().notNull(),
	purpose: text().notNull(),
	status: appointmentStatus().default('scheduled').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.applicationId],
			foreignColumns: [applications.id],
			name: "appointments_application_id_applications_id_fk"
		}),
]);

export const adminLogs = pgTable("admin_logs", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	action: text().notNull(),
	details: text(),
	timestamp: timestamp({ mode: 'string' }).defaultNow().notNull(),
});

export const settings = pgTable("settings", {
	id: serial().primaryKey().notNull(),
	category: settingsCategory().notNull(),
	key: text().notNull(),
	value: text().notNull(),
	description: text(),
});

export const visaTypes = pgTable("visa_types", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	description: text().notNull(),
	requirements: text().notNull(),
	processingTime: text("processing_time").notNull(),
}, (table) => [
	unique("visa_types_name_unique").on(table.name),
]);

export const documents = pgTable("documents", {
	id: serial().primaryKey().notNull(),
	applicationId: integer("application_id").notNull(),
	name: text().notNull(),
	filePath: text("file_path").notNull(),
	uploadDate: timestamp("upload_date", { mode: 'string' }).defaultNow().notNull(),
	documentStatus: documentStatus("document_status").default('pending').notNull(),
	notes: text(),
}, (table) => [
	foreignKey({
			columns: [table.applicationId],
			foreignColumns: [applications.id],
			name: "documents_application_id_applications_id_fk"
		}),
]);

export const feedback = pgTable("feedback", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	content: text().notNull(),
	rating: integer().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	phone: text(),
	subject: text().notNull(),
	message: text().notNull(),
	status: contactStatus().default('new').notNull(),
	assignedToId: integer("assigned_to_id"),
	responseNotes: text("response_notes"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	token: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "password_reset_tokens_user_id_fkey"
		}),
	unique("password_reset_tokens_token_key").on(table.token),
]);

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	username: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	firstName: varchar("first_name", { length: 255 }).notNull(),
	phone: varchar({ length: 100 }),
	role: role().default('user').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	lastLogin: timestamp("last_login", { mode: 'string' }),
	lastName: varchar("last_name", { length: 255 }),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	unique("users_username_key").on(table.username),
	unique("users_email_key").on(table.email),
]);

export const loginVerificationCodes = pgTable("login_verification_codes", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	email: varchar({ length: 255 }).notNull(),
	code: varchar({ length: 10 }).notNull(),
	isUsed: boolean("is_used").default(false).notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "login_verification_codes_user_id_fkey"
		}),
]);

export const applications = pgTable("applications", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	visaTypeId: integer("visa_type_id").notNull(),
	applicationDate: timestamp("application_date", { mode: 'string' }).defaultNow().notNull(),
	status: status().default('pending').notNull(),
	notes: text(),
	assignedOfficerId: integer("assigned_officer_id"),
	firstName: varchar("first_name", { length: 255 }),
	lastName: varchar("last_name", { length: 255 }),
	age: integer(),
	phone: varchar({ length: 255 }),
	occupation: varchar({ length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.visaTypeId],
			foreignColumns: [visaTypes.id],
			name: "applications_visa_type_id_visa_types_id_fk"
		}),
]);
