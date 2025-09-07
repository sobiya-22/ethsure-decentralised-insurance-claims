import express from "express";
import { registerAdmin, loginAdmin, getAdminProfile } from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js"; // JWT auth middleware

const router = express.Router();

// Public routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Protected route
router.get("/profile", protect, getAdminProfile);

export default router;
