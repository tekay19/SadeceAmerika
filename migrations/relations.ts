import { relations } from "drizzle-orm/relations";
import { applications, appointments, documents, users, passwordResetTokens, loginVerificationCodes, visaTypes } from "./schema";

export const appointmentsRelations = relations(appointments, ({one}) => ({
	application: one(applications, {
		fields: [appointments.applicationId],
		references: [applications.id]
	}),
}));

export const applicationsRelations = relations(applications, ({one, many}) => ({
	appointments: many(appointments),
	documents: many(documents),
	visaType: one(visaTypes, {
		fields: [applications.visaTypeId],
		references: [visaTypes.id]
	}),
}));

export const documentsRelations = relations(documents, ({one}) => ({
	application: one(applications, {
		fields: [documents.applicationId],
		references: [applications.id]
	}),
}));

export const passwordResetTokensRelations = relations(passwordResetTokens, ({one}) => ({
	user: one(users, {
		fields: [passwordResetTokens.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	passwordResetTokens: many(passwordResetTokens),
	loginVerificationCodes: many(loginVerificationCodes),
}));

export const loginVerificationCodesRelations = relations(loginVerificationCodes, ({one}) => ({
	user: one(users, {
		fields: [loginVerificationCodes.userId],
		references: [users.id]
	}),
}));

export const visaTypesRelations = relations(visaTypes, ({many}) => ({
	applications: many(applications),
}));