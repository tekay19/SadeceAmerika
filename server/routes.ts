import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, generateHashForPassword } from "./auth";
import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage_config = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${randomUUID()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({ 
  storage: storage_config,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, JPG, PNG, DOC, DOCX files are allowed.") as any);
    }
  },
});

// Middleware to check if user is authenticated
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

// Middleware to check if user is an admin
function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Forbidden" });
}

// Middleware to check if user is an officer
function isOfficer(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && (req.user.role === "officer" || req.user.role === "admin")) {
    return next();
  }
  res.status(403).json({ message: "Forbidden" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);
  
  // Development only route to hash passwords for test users
  app.get("/api/dev/hash-password/:password", async (req, res) => {
    if (process.env.NODE_ENV === "production") {
      return res.status(404).json({ message: "Not found" });
    }
    
    const hashedPassword = await generateHashForPassword(req.params.password);
    res.json({ 
      original: req.params.password,
      hashed: hashedPassword
    });
  });

  // VisaType routes
  app.get("/api/visa-types", async (req, res, next) => {
    try {
      const visaTypes = await storage.getAllVisaTypes();
      res.json(visaTypes);
    } catch (err) {
      next(err);
    }
  });

  // Application routes
  app.post("/api/applications", isAuthenticated, async (req, res, next) => {
    try {
      const applicationNumber = `VA-${Date.now().toString().substring(7)}-${Math.floor(Math.random() * 1000)}`;
      const application = await storage.createApplication({
        ...req.body,
        userId: req.user.id,
        applicationNumber,
        submittedAt: new Date(),
        lastUpdated: new Date(),
      });
      res.status(201).json(application);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/applications", isAuthenticated, async (req, res, next) => {
    try {
      let applications;
      const status = req.query.status as string || null;
      
      if (req.user.role === "admin" || req.user.role === "officer") {
        // Get all applications first
        applications = await storage.getAllApplications();
        
        // Filter by status if provided
        if (status) {
          applications = applications.filter(app => app.status === status);
        }
      } else {
        // Regular users only see their own applications
        applications = await storage.getUserApplications(req.user.id);
      }
      
      res.json(applications);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/applications/:id", isAuthenticated, async (req, res, next) => {
    try {
      const application = await storage.getApplication(parseInt(req.params.id));
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      // Check if the user is authorized to view this application
      if (req.user.role !== "admin" && req.user.role !== "officer" && application.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      res.json(application);
    } catch (err) {
      next(err);
    }
  });

  app.put("/api/applications/:id", isAuthenticated, async (req, res, next) => {
    try {
      const applicationId = parseInt(req.params.id);
      const application = await storage.getApplication(applicationId);
      
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      // Check if the user is authorized to update this application
      if (req.user.role !== "admin" && req.user.role !== "officer" && application.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      // Get the new status if it's being changed
      const newStatus = req.body.status ? req.body.status : application.status;
      const statusChanged = newStatus !== application.status;
      
      // Update the application
      const updatedApplication = await storage.updateApplication(applicationId, {
        ...req.body,
        lastUpdated: new Date(),
      });
      
      // Log the action if status changed or if this is an officer/admin update
      if ((req.user.role === "officer" || req.user.role === "admin") || statusChanged) {
        await storage.createAdminLog({
          userId: req.user.id,
          action: `Application status updated to ${newStatus}`,
          details: `Application ID: ${applicationId}, Previous Status: ${application.status}`,
          timestamp: new Date(),
        });
      }
      
      res.json(updatedApplication);
    } catch (err) {
      next(err);
    }
  });

  // Document routes
  app.post("/api/documents/upload", isAuthenticated, upload.single("file"), async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      const document = await storage.createDocument({
        applicationId: parseInt(req.body.applicationId),
        type: req.body.type,
        fileName: req.file.originalname,
        filePath: req.file.path,
        uploadedAt: new Date(),
        status: "pending",
        notes: req.body.notes || null,
      });
      
      res.status(201).json(document);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/documents/:applicationId", isAuthenticated, async (req, res, next) => {
    try {
      const applicationId = parseInt(req.params.applicationId);
      const application = await storage.getApplication(applicationId);
      
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      // Check if the user is authorized to view documents for this application
      if (req.user.role !== "admin" && req.user.role !== "officer" && application.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const documents = await storage.getApplicationDocuments(applicationId);
      res.json(documents);
    } catch (err) {
      next(err);
    }
  });
  
  // Get all pending documents for officer review
  app.get("/api/pending-documents", isOfficer, async (req, res, next) => {
    try {
      // Get all applications with pending status
      const allApplications = await storage.getAllApplications();
      const pendingApplications = allApplications.filter(app => 
        app.status === 'documents_pending' ||
        app.status === 'documents_reviewing' ||
        app.status === 'submitted'
      );
      
      // Get documents for each pending application
      const pendingDocsPromises = pendingApplications.map(app => 
        storage.getApplicationDocuments(app.id)
      );
      
      // Wait for all document queries to complete
      const pendingDocsArrays = await Promise.all(pendingDocsPromises);
      
      // Flatten results and filter for pending documents
      const pendingDocuments = pendingDocsArrays
        .flat()
        .filter(doc => doc.status === 'pending');
      
      res.json(pendingDocuments);
    } catch (err) {
      next(err);
    }
  });

  app.put("/api/documents/:id/verify", isOfficer, async (req, res, next) => {
    try {
      const documentId = parseInt(req.params.id);
      const document = await storage.getDocument(documentId);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      // Update document status
      const updatedDocument = await storage.updateDocument(documentId, {
        status: req.body.status,
        notes: req.body.notes || document.notes,
      });
      
      // After updating document, check all documents for this application
      const applicationId = document.applicationId;
      const allDocuments = await storage.getApplicationDocuments(applicationId);
      
      // Check if all documents are approved or if any are rejected
      const allApproved = allDocuments.every(doc => doc.status === 'approved');
      const anyRejected = allDocuments.some(doc => doc.status === 'rejected');
      
      // Update application status based on document verification results
      if (anyRejected) {
        // If any document is rejected, application needs additional documents
        await storage.updateApplication(applicationId, {
          status: "additional_documents_required",
          lastUpdated: new Date(),
        });
      } else if (allApproved) {
        // If all documents are approved, update application status
        await storage.updateApplication(applicationId, {
          status: "documents_approved",
          lastUpdated: new Date(),
        });
      } else {
        // Some documents are still pending or under review
        await storage.updateApplication(applicationId, {
          status: "documents_reviewing",
          lastUpdated: new Date(),
        });
      }
      
      // Log the action
      await storage.createAdminLog({
        userId: req.user.id,
        action: `Document ${req.body.status}`,
        details: `Document ID: ${documentId}, Application ID: ${document.applicationId}`,
        timestamp: new Date(),
      });
      
      res.json(updatedDocument);
    } catch (err) {
      next(err);
    }
  });

  // Appointment routes
  app.post("/api/appointments", isOfficer, async (req, res, next) => {
    try {
      // Verify application exists and is in a valid state for appointment
      const applicationId = req.body.applicationId;
      const application = await storage.getApplication(applicationId);
      
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      // Check if all documents have been approved
      if (application.status !== "documents_approved") {
        return res.status(400).json({ 
          message: "Cannot schedule appointment until all documents are approved" 
        });
      }
      
      // Validate appointment date is in the future
      const appointmentDate = new Date(req.body.date);
      const now = new Date();
      
      if (appointmentDate <= now) {
        return res.status(400).json({ 
          message: "Appointment date must be in the future" 
        });
      }
      
      // Check if appointment already exists
      const existingAppointment = await storage.getApplicationAppointment(applicationId);
      if (existingAppointment) {
        return res.status(400).json({ 
          message: "Appointment already exists for this application" 
        });
      }
      
      // Create the appointment
      const appointment = await storage.createAppointment({
        ...req.body,
      });
      
      // Update application status
      await storage.updateApplication(applicationId, {
        status: "appointment_scheduled",
        lastUpdated: new Date(),
      });
      
      // Log the action
      await storage.createAdminLog({
        userId: req.user.id,
        action: "Appointment created",
        details: `Application ID: ${appointment.applicationId}, Date: ${appointment.date}, Location: ${appointment.location}`,
        timestamp: new Date(),
      });
      
      res.status(201).json(appointment);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/appointments/:applicationId", isAuthenticated, async (req, res, next) => {
    try {
      const applicationId = parseInt(req.params.applicationId);
      const application = await storage.getApplication(applicationId);
      
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      // Check if the user is authorized to view appointments for this application
      if (req.user.role !== "admin" && req.user.role !== "officer" && application.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const appointment = await storage.getApplicationAppointment(applicationId);
      if (!appointment) {
        return res.status(404).json({ message: "No appointment found for this application" });
      }
      
      res.json(appointment);
    } catch (err) {
      next(err);
    }
  });

  // Admin routes
  app.get("/api/admin/logs", isAdmin, async (req, res, next) => {
    try {
      const logs = await storage.getAllAdminLogs();
      res.json(logs);
    } catch (err) {
      next(err);
    }
  });

  // Feedback routes
  app.post("/api/feedback", isAuthenticated, async (req, res, next) => {
    try {
      const feedback = await storage.createFeedback({
        userId: req.user.id,
        message: req.body.message,
        submittedAt: new Date(),
      });
      
      res.status(201).json(feedback);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/admin/feedbacks", isAdmin, async (req, res, next) => {
    try {
      const feedbacks = await storage.getAllFeedback();
      res.json(feedbacks);
    } catch (err) {
      next(err);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
