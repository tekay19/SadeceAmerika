-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."appointment_status" AS ENUM('scheduled', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."contact_status" AS ENUM('new', 'in_progress', 'completed');--> statement-breakpoint
CREATE TYPE "public"."document_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'officer', 'admin');--> statement-breakpoint
CREATE TYPE "public"."settings_category" AS ENUM('general', 'email', 'security', 'logging');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'reviewing', 'approved', 'rejected', 'completed');--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"application_id" integer NOT NULL,
	"date" timestamp NOT NULL,
	"time" text NOT NULL,
	"location" text NOT NULL,
	"purpose" text NOT NULL,
	"status" "appointment_status" DEFAULT 'scheduled' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"action" text NOT NULL,
	"details" text,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" "settings_category" NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "visa_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"requirements" text NOT NULL,
	"processing_time" text NOT NULL,
	CONSTRAINT "visa_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"application_id" integer NOT NULL,
	"name" text NOT NULL,
	"file_path" text NOT NULL,
	"upload_date" timestamp DEFAULT now() NOT NULL,
	"document_status" "document_status" DEFAULT 'pending' NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "feedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"content" text NOT NULL,
	"rating" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"status" "contact_status" DEFAULT 'new' NOT NULL,
	"assigned_to_id" integer,
	"response_notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "password_reset_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "password_reset_tokens_token_key" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"phone" varchar(100),
	"role" "role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"last_login" timestamp,
	"last_name" varchar(255),
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "users_username_key" UNIQUE("username"),
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "login_verification_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"code" varchar(10) NOT NULL,
	"is_used" boolean DEFAULT false NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"visa_type_id" integer NOT NULL,
	"application_date" timestamp DEFAULT now() NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"notes" text,
	"assigned_officer_id" integer,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"age" integer,
	"phone" varchar(255),
	"occupation" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "login_verification_codes" ADD CONSTRAINT "login_verification_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_visa_type_id_visa_types_id_fk" FOREIGN KEY ("visa_type_id") REFERENCES "public"."visa_types"("id") ON DELETE no action ON UPDATE no action;
*/