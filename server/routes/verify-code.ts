// Login verification code doğrulama endpointi

import { Router } from "express";
import { IStorage } from "../storage";

const router = Router();

interface VerifyCodeRequest {
  code: string;
  userId: number;
}

// This endpoint verifies the 2FA code sent via email
router.post("/verify-code", async (req, res) => {
  try {
    const { code, userId } = req.body as VerifyCodeRequest;
    const storage = global.storage as IStorage;
    
    if (!code || !userId) {
      return res.status(400).json({
        success: false,
        message: "Verification code and user ID are required"
      });
    }

    // Get the stored verification code for the user
    const storedCode = await storage.getLoginVerificationCodeByUserId(userId);
    
    // If no code exists, return error
    if (!storedCode) {
      return res.status(400).json({
        success: false,
        message: "No verification code found or code has expired"
      });
    }
    
    // Check if the code is already used
    if (storedCode.isUsed) {
      return res.status(400).json({
        success: false,
        message: "Verification code has already been used"
      });
    }
    
    // Check if the code has expired
    const now = new Date();
    if (storedCode.expiresAt < now) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired"
      });
    }
    
    // Verify the code
    if (storedCode.code !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code"
      });
    }
    
    // Get the user
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    // Mark the code as used
    await storage.updateLoginVerificationCode(storedCode.id, {
      isUsed: true
    });
    
    // Log the user in
    req.login(user, (err) => {
      if (err) {
        console.error("Login session error:", err);
        return res.status(500).json({
          success: false,
          message: "Error during login process"
        });
      }
      
      console.log(`User logged in successfully after 2FA: ${user.username} (ID: ${user.id})`);
      console.log("Session ID:", req.sessionID);
      
      // Return user data without password
      const { password, ...userWithoutPassword } = user;
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: userWithoutPassword
      });
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during verification"
    });
  }
});

export default router;