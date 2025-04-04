import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage"; // Hafıza tabanlı depolamayı içe aktarıyoruz
import { initializeDrizzleStorage } from "./drizzle-storage"; // Drizzle tabanlı depolamayı içe aktarıyoruz
import { setupAuth, generateHashForPassword } from "./auth";
import { IStorage } from "./storage";
import { scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";
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
  // Depolama seçimi: Eğer DATABASE_URL varsa PostgreSQL, yoksa MemStorage kullan
  let activeStorage: IStorage;
  
  try {
    if (process.env.DATABASE_URL) {
      console.log('Using PostgreSQL database');
      activeStorage = await initializeDrizzleStorage();
      
      // Hafıza tabanlı depolama yerine PostgreSQL depolamayı kullan
      global.storage = activeStorage;
    } else {
      console.log('DATABASE_URL not found, using in-memory storage');
      activeStorage = storage;
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
    console.log('Falling back to in-memory storage');
    activeStorage = storage;
    global.storage = storage;
  }
  
  // Setup authentication routes with the active storage
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
  
  // Development only route to check password
  app.get("/api/dev/check-password/:username/:password", async (req, res) => {
    if (process.env.NODE_ENV === "production") {
      return res.status(404).json({ message: "Not found" });
    }
    
    try {
      const user = await activeStorage.getUserByUsername(req.params.username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Manually check password using the same algorithm from auth.ts
      const supplied = req.params.password;
      const stored = user.password;
      let passwordValid = false;
      
      const scryptAsync = promisify(scrypt);
      
      // Basic handling for non-hashed passwords
      if (!stored.includes('.')) {
        passwordValid = supplied === stored;
      } else {
        // Normal scrypt password comparison
        const [hashed, salt] = stored.split(".");
        const hashedBuf = Buffer.from(hashed, "hex");
        const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
        passwordValid = hashedBuf.length === suppliedBuf.length && 
                        timingSafeEqual(hashedBuf, suppliedBuf);
      }
      
      res.json({
        username: user.username,
        passwordValid,
        storedPasswordFormat: user.password.includes('.') ? 'hashed' : 'plain',
        passwordLength: user.password.length
      });
    } catch (error) {
      console.error("Password check error:", error);
      res.status(500).json({ message: error.message });
    }
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
  
  // Admin settings routes
  app.get("/api/admin/settings", isAdmin, async (req, res, next) => {
    try {
      const allSettings = await storage.getAllSettings();
      
      // Group settings by category
      const groupedSettings = allSettings.reduce((acc, setting) => {
        if (!acc[setting.category]) {
          acc[setting.category] = {};
        }
        acc[setting.category][setting.key] = setting.value;
        return acc;
      }, {} as Record<string, Record<string, string>>);
      
      res.json(groupedSettings);
    } catch (err) {
      next(err);
    }
  });
  
  app.get("/api/admin/settings/:category", isAdmin, async (req, res, next) => {
    try {
      const category = req.params.category;
      const settings = await storage.getSettingsByCategory(category);
      
      if (settings.length === 0) {
        return res.status(404).json({ message: `No settings found for category: ${category}` });
      }
      
      // Convert to key-value object
      const categorySettings = settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, string>);
      
      res.json(categorySettings);
    } catch (err) {
      next(err);
    }
  });
  
  app.put("/api/admin/settings", isAdmin, async (req, res, next) => {
    try {
      const settingsData = req.body;
      const updatedSettings = [];
      
      // For each category and its settings
      for (const [category, settings] of Object.entries(settingsData)) {
        // For each key-value pair in the category
        for (const [key, value] of Object.entries(settings as Record<string, string>)) {
          // Find the existing setting
          const existingSetting = await storage.getSettingByKey(category, key);
          
          if (existingSetting) {
            // Update existing setting
            const updated = await storage.updateSetting(existingSetting.id, {
              value: value,
              updatedBy: req.user.id
            });
            updatedSettings.push(updated);
          } else {
            // Create new setting if it doesn't exist
            const newSetting = await storage.createSetting({
              category: category as any, // Cast to the enum type
              key,
              value,
              description: `Setting for ${category}.${key}`,
              lastUpdated: new Date(),
              updatedBy: req.user.id
            });
            updatedSettings.push(newSetting);
          }
        }
      }
      
      // Log the action
      await storage.createAdminLog({
        userId: req.user.id,
        action: "System settings updated",
        details: JSON.stringify(settingsData),
        timestamp: new Date(),
      });
      
      res.json({ 
        message: "Settings updated successfully", 
        count: updatedSettings.length 
      });
    } catch (err) {
      next(err);
    }
  });
  
  app.put("/api/admin/settings/:category", isAdmin, async (req, res, next) => {
    try {
      const category = req.params.category;
      const settingsData = req.body;
      const updatedSettings = [];
      
      // For each key-value pair in the category
      for (const [key, value] of Object.entries(settingsData)) {
        // Find the existing setting
        const existingSetting = await storage.getSettingByKey(category, key);
        
        if (existingSetting) {
          // Update existing setting
          const updated = await storage.updateSetting(existingSetting.id, {
            value: value as string,
            updatedBy: req.user.id
          });
          updatedSettings.push(updated);
        } else {
          // Create new setting if it doesn't exist
          const newSetting = await storage.createSetting({
            category: category as any, // Cast to the enum type
            key,
            value: value as string,
            description: `Setting for ${category}.${key}`,
            lastUpdated: new Date(),
            updatedBy: req.user.id
          });
          updatedSettings.push(newSetting);
        }
      }
      
      // Log the action
      await storage.createAdminLog({
        userId: req.user.id,
        action: `${category} settings updated`,
        details: JSON.stringify(settingsData),
        timestamp: new Date(),
      });
      
      res.json({ 
        message: `${category} settings updated successfully`, 
        count: updatedSettings.length 
      });
    } catch (err) {
      next(err);
    }
  });

  // User management routes
  app.get("/api/users", isAdmin, async (req, res, next) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/users/:id", isAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

  app.put("/api/users/:id", isAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Prevent changing own role if you are an admin
      if (id === req.user.id && req.body.role && req.body.role !== 'admin') {
        return res.status(403).json({ message: "You cannot change your own admin status" });
      }
      
      // If password is being updated, hash it
      let updates = { ...req.body };
      if (updates.password) {
        updates.password = await generateHashForPassword(updates.password);
      }
      
      const updatedUser = await storage.updateUser(id, updates);
      
      // Log the action
      await storage.createAdminLog({
        userId: req.user.id,
        action: "User updated",
        details: `User ID: ${id}, Updated fields: ${Object.keys(req.body).join(', ')}`,
        timestamp: new Date(),
      });
      
      res.json({ 
        message: "User updated successfully", 
        user: updatedUser 
      });
    } catch (err) {
      next(err);
    }
  });

  app.delete("/api/users/:id", isAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Prevent deleting yourself
      if (id === req.user.id) {
        return res.status(403).json({ message: "You cannot delete your own account" });
      }
      
      await storage.deleteUser(id);
      
      // Log the action
      await storage.createAdminLog({
        userId: req.user.id,
        action: "User deleted",
        details: `User ID: ${id}, Username: ${user.username}`,
        timestamp: new Date(),
      });
      
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      // Check if the error is related to associated applications
      if (err.message && err.message.includes('associated applications')) {
        return res.status(400).json({ message: err.message });
      }
      next(err);
    }
  });

  // Create new user (admin)
  app.post("/api/users", isAdmin, async (req, res, next) => {
    try {
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Hash the password
      const hashedPassword = await generateHashForPassword(req.body.password);

      // Create the user
      const user = await storage.createUser({
        ...req.body,
        password: hashedPassword,
      });

      // Log the action
      await storage.createAdminLog({
        userId: req.user.id,
        action: "User created",
        details: `User ID: ${user.id}, Username: ${user.username}, Role: ${user.role}`,
        timestamp: new Date(),
      });

      res.status(201).json({
        message: "User created successfully",
        user
      });
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
