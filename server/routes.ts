import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
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
      if (req.user.role === "admin" || req.user.role === "officer") {
        const applications = await storage.getAllApplications();
        res.json(applications);
      } else {
        const applications = await storage.getUserApplications(req.user.id);
        res.json(applications);
      }
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
      
      const updatedApplication = await storage.updateApplication(applicationId, {
        ...req.body,
        lastUpdated: new Date(),
      });
      
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

  app.put("/api/documents/:id/verify", isOfficer, async (req, res, next) => {
    try {
      const documentId = parseInt(req.params.id);
      const document = await storage.getDocument(documentId);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      const updatedDocument = await storage.updateDocument(documentId, {
        status: req.body.status,
        notes: req.body.notes || document.notes,
      });
      
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
      const appointment = await storage.createAppointment({
        ...req.body,
      });
      
      // Update application status
      await storage.updateApplication(appointment.applicationId, {
        status: "appointment_scheduled",
        lastUpdated: new Date(),
      });
      
      // Log the action
      await storage.createAdminLog({
        userId: req.user.id,
        action: "Appointment created",
        details: `Application ID: ${appointment.applicationId}, Date: ${appointment.date}`,
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
