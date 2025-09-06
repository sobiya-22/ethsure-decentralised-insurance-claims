import express from "express";
import {
  registerOrGetUser,
  getUser,
  addRole,
  updateProfile,
  updateRoleData,
  getUserRole,
  updateKYCStatus,
  getAllUsers
} from "../controllers/user.controller.js";

const router = express.Router();

// Register or get user
router.post("/register", registerOrGetUser);

// Get specific user
router.get("/:wallet_address", getUser);

// Get all users
router.get("/getalluser", getAllUsers);

// Add a role (customer or agent)
router.post("/add-role", addRole);

// Update general profile
router.put("/update-profile", updateProfile);

// Update role-specific data
router.put("/update-role-data", updateRoleData);

// Get specific role data
router.get("/:wallet_address/role/:role_type", getUserRole);

// Update KYC status (admin)
router.put("/update-kyc", updateKYCStatus);

export default router;
