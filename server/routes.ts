import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage as memStorage } from "./storage"; // Hafıza tabanlı depolamayı içe aktarıyoruz
import { initializeDrizzleStorage } from "./drizzle-storage"; // Drizzle tabanlı depolamayı içe aktarıyoruz
import { initializeMySQLStorage } from "./mysql-storage"; // MySQL tabanlı depolamayı içe aktarıyoruz
import { setupAuth, generateHashForPassword } from "./auth";
import { IStorage } from "./storage";
import { scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";
import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

// Import verification code route
import verifyCodeRouter from "./routes/verify-code";

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
  res.status(401).json({ 
    success: false, 
    message: "Unauthorized, please login" 
  });
}

// Middleware to check if user is an admin
function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user && (req.user as any).role === "admin") {
    return next();
  }
  res.status(403).json({ 
    success: false, 
    message: "Forbidden, admin access required" 
  });
}

// Middleware to check if user is an officer
function isOfficer(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user && ((req.user as any).role === "officer" || (req.user as any).role === "admin")) {
    return next();
  }
  res.status(403).json({ 
    success: false, 
    message: "Forbidden, officer access required" 
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API rotaları için Content-Type'ı zorla
  app.use('/api', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });
  
  // Depolama seçimi: MySQL veya MemStorage
  let activeStorage: IStorage;
  
  try {
    // Üretim ortamında mı, yoksa geliştirme ortamında mı olduğumuzu kontrol et
    const isProduction = process.env.NODE_ENV === 'production';
    // Replit ortamında mı çalışıyoruz?
    const isReplitEnv = process.env.REPL_ID || process.env.REPL_SLUG;
    
    // Üretim modu - MySQL'e bağlanmaya çalış (Hostinger)
    if (isProduction) {
      if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_NAME) {
        console.log('💾 Üretim modu - MySQL veritabanı kullanılıyor');
        activeStorage = await initializeMySQLStorage();
      } else {
        throw new Error('Üretim modunda MySQL bağlantı bilgileri tanımlanmamış. DB_HOST, DB_USER, DB_PASSWORD, DB_NAME gerekli.');
      }
    } 
    // Replit geliştirme ortamı - In-memory storage kullan
    else if (isReplitEnv) {
      console.log('💾 Replit geliştirme modu - In-memory depolama kullanılıyor');
      activeStorage = memStorage;
    }
    // Lokal geliştirme ortamı - Varsa MySQL'e bağlanmaya çalış, yoksa in-memory kullan
    else {
      if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_NAME) {
        console.log('💾 Lokal geliştirme - MySQL veritabanı kullanılıyor');
        try {
          activeStorage = await initializeMySQLStorage();
        } catch (dbError) {
          console.warn('⚠️ MySQL veritabanına bağlanılamadı, in-memory depolama kullanılacak:', dbError);
          activeStorage = memStorage;
        }
      } else {
        console.log('💾 Lokal geliştirme - In-memory depolama kullanılıyor (MySQL bağlantı bilgileri eksik)');
        activeStorage = memStorage;
      }
    }
    
    // Global olarak depolamayı ayarla
    global.storage = activeStorage;
  } catch (error) {
    console.error('❌ Veritabanı başlatma hatası:', error);
    console.log('⚠️ In-memory depolamaya geçiliyor (yedek)');
    activeStorage = memStorage;
    global.storage = memStorage;
  }
  
  // Hangi depolama türünün kullanıldığını doğrula
  console.log('🔹 Aktif depolama türü:', activeStorage.constructor.name);
  console.log('🔹 Global depolama türü:', global.storage.constructor.name);
  
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
      const visaTypes = await activeStorage.getAllVisaTypes();
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
      
      // Store the document type as the name field since it's what we use to identify document types
      const document = await storage.createDocument({
        applicationId: parseInt(req.body.applicationId),
        name: req.body.type, // Using type as name since this is what our schema expects
        filePath: req.file.path,
        uploadDate: new Date(), // Using uploadDate from schema
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
  // Admin kullanıcıları getir
  app.get("/api/admin/users", isAdmin, async (req, res, next) => {
    try {
      const users = await activeStorage.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  });

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
        const existingSetting = await activeStorage.getSettingByKey(category, key);
        
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
      const users = await activeStorage.getAllUsers();
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

  // Get currently logged in user
  app.get("/api/user", (req, res) => {
    if (req.isAuthenticated()) {
      // Return only necessary user data, omit sensitive info like password
      const { password, ...userData } = req.user as any;
      res.json(userData);
    } else {
      res.status(401).json({ message: "Unauthorized" });
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

  // Contact form routes - public endpoint for submissions
  app.post("/api/contacts", async (req, res, next) => {
    try {
      const contactData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone || null,
        subject: req.body.subject,
        message: req.body.message,
        status: "new", // contactStatusEnum değerlerine uygun olmalı
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const contact = await storage.createContact(contactData);
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: contact.id 
      });
    } catch (err) {
      next(err);
    }
  });

  // Get all contacts - admins and officers only
  app.get("/api/contacts", isAuthenticated, async (req, res, next) => {
    try {
      // Only allow admins and officers to access all contacts
      if (req.user.role !== 'admin' && req.user.role !== 'officer') {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied" 
        });
      }
      
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (err) {
      next(err);
    }
  });

  // Get single contact by ID - admins and officers only
  app.get("/api/contacts/:id", isAuthenticated, async (req, res, next) => {
    try {
      // Only allow admins and officers to access contact details
      if (req.user.role !== 'admin' && req.user.role !== 'officer') {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied" 
        });
      }
      
      const contactId = parseInt(req.params.id);
      const contact = await storage.getContact(contactId);
      
      if (!contact) {
        return res.status(404).json({ 
          success: false, 
          message: "Contact not found" 
        });
      }
      
      res.json(contact);
    } catch (err) {
      next(err);
    }
  });

  // Update contact status - admins and officers only
  app.put("/api/contacts/:id", isAuthenticated, async (req, res, next) => {
    try {
      // Only allow admins and officers to update contact status
      if (req.user.role !== 'admin' && req.user.role !== 'officer') {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied" 
        });
      }
      
      const contactId = parseInt(req.params.id);
      const contact = await storage.getContact(contactId);
      
      if (!contact) {
        return res.status(404).json({ 
          success: false, 
          message: "Contact not found" 
        });
      }
      
      // Update contact with provided fields
      const updates = {
        status: req.body.status || contact.status,
        assignedToId: req.body.assignedToId !== undefined ? req.body.assignedToId : contact.assignedToId,
        responseNotes: req.body.responseNotes || contact.responseNotes,
        updatedAt: new Date()
      };
      
      const updatedContact = await storage.updateContact(contactId, updates);
      
      // Log admin action
      if (req.user.role === 'admin') {
        await storage.createAdminLog({
          userId: req.user.id,
          action: 'update_contact',
          details: `Updated contact #${contactId} status to ${updates.status}`,
          timestamp: new Date()
        });
      }
      
      res.json({
        success: true,
        message: "Contact updated successfully",
        contact: updatedContact
      });
    } catch (err) {
      next(err);
    }
  });

  // Aylık e-posta test endpoint (Admin)
  app.post('/api/admin/send-test-monthly-email', isAdmin, async (req, res) => {
    try {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ 
          success: false, 
          message: 'Kullanıcı ID gereklidir' 
        });
      }
      
      const { sendTestMonthlyUpdate } = await import('./monthly-update');
      const success = await sendTestMonthlyUpdate(userId);
      
      if (success) {
        res.json({ 
          success: true, 
          message: 'Test aylık e-postası başarıyla gönderildi' 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: 'Test aylık e-postası gönderilirken bir hata oluştu' 
        });
      }
    } catch (error) {
      console.error('Test aylık e-posta gönderme hatası:', error);
      res.status(500).json({ 
        success: false, 
        message: 'E-posta gönderilirken bir hata oluştu' 
      });
    }
  });
  
  // E-posta yapılandırma durumunu kontrol et (Admin)
  app.get('/api/admin/email-status', isAdmin, async (req, res) => {
    try {
      // E-posta servisi modülünü import et
      const { emailService } = await import('./email-service');
      
      // Çevresel değişkenleri kontrol et (hassas bilgileri göstermeden)
      const emailConfig = {
        env: {
          EMAIL_USER: process.env.EMAIL_USER ? '✅ Mevcut' : '❌ Yok',
          EMAIL_PASS: process.env.EMAIL_PASS ? '✅ Mevcut' : '❌ Yok',
          EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'gmail (varsayılan)',
          EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com (varsayılan)',
          EMAIL_PORT: process.env.EMAIL_PORT || '465 (varsayılan)',
          EMAIL_SECURE: process.env.EMAIL_SECURE !== 'false' ? 'true (varsayılan)' : 'false',
          EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || 'Sadece Amerika (varsayılan)',
          NODE_ENV: process.env.NODE_ENV || 'development',
        }
      };
      
      // E-posta servisinin durumunu kontrol et
      const serviceStatus = await emailService.checkStatus();
      
      // Veritabanı ayarlarını kontrol et (güvenli bir şekilde)
      let dbSettings = [];
      if (db) {
        try {
          const emailDbSettings = await db.select({
            id: settings.id,
            key: settings.key,
            category: settings.category,
          }).from(settings).where(eq(settings.category, 'email'));
          
          dbSettings = emailDbSettings.map(s => ({
            key: s.key,
            hasValue: s.key ? true : false
          }));
        } catch (error) {
          console.error('Veritabanından e-posta ayarları alınamadı:', error);
          dbSettings = [{ key: 'error', hasValue: false, message: 'Ayarlar alınamadı: ' + (error instanceof Error ? error.message : String(error)) }];
        }
      } else {
        dbSettings = [{ key: 'db', hasValue: false, message: 'Veritabanı bağlantısı yok' }];
      }
      
      res.json({
        success: true,
        status: {
          emailConfig,
          serviceStatus,
          dbSettings
        }
      });
    } catch (error) {
      console.error('E-posta durum kontrolü sırasında hata:', error);
      res.status(500).json({
        success: false,
        message: 'E-posta durum kontrolü sırasında hata oluştu',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  // Genel test e-postası gönder (Admin)
  app.post('/api/admin/send-test-email', isAdmin, async (req, res) => {
    try {
      const { email, subject, message } = req.body;
      
      if (!email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'E-posta, konu ve mesaj alanları gereklidir' 
        });
      }
      
      // E-posta servisi modülünü import et
      const { emailService } = await import('./email-service');
      
      // HTML içeriğini hazırla
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #003366;">Sadece Amerika - Test E-postası</h2>
          <div style="border-left: 4px solid #003366; padding-left: 15px; margin: 15px 0;">
            <p>${message}</p>
          </div>
          <p style="color: #666; font-size: 0.9em;">Bu bir test e-postasıdır. Eğer bu e-postayı aldıysanız, e-posta sistemimiz doğru çalışıyor demektir.</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #999; font-size: 0.8em;">© ${new Date().getFullYear()} Sadece Amerika</p>
        </div>
      `;
      
      // E-postayı gönder
      const success = await emailService.sendEmail({
        to: email,
        subject: subject,
        html: htmlContent
      });
      
      if (success) {
        res.json({ 
          success: true, 
          message: `Test e-postası başarıyla gönderildi: ${email}` 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: 'Test e-postası gönderilirken bir hata oluştu' 
        });
      }
    } catch (error) {
      console.error('Test e-posta gönderme hatası:', error);
      res.status(500).json({ 
        success: false, 
        message: 'E-posta gönderilirken bir hata oluştu',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  // Tüm kullanıcılara aylık güncellemeleri gönder (Admin)
  app.post('/api/admin/send-monthly-emails', isAdmin, async (req, res) => {
    try {
      const { sendMonthlyUpdates } = await import('./monthly-update');
      const result = await sendMonthlyUpdates();
      
      res.json({ 
        success: true, 
        message: `Aylık e-postalar gönderildi: ${result.success} başarılı, ${result.fail} başarısız`, 
        result 
      });
    } catch (error) {
      console.error('Aylık e-posta gönderme hatası:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Aylık e-postalar gönderilirken bir hata oluştu' 
      });
    }
  });
  
  // Login verification code endpoint'ini uygulama rotalarına ekle
  app.use('/api/auth', verifyCodeRouter);

  const httpServer = createServer(app);
  return httpServer;
}
