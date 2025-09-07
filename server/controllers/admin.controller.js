import Admin from "../models/admin.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register new admin
export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, wallet_address } = req.body;
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) throw new Error("Admin already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({ name, email, password: hashedPassword, wallet_address });

  res.status(201).json({ success: true, data: admin });
});

// Admin login
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error("Admin not found");

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error("Invalid password");

  const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.status(200).json({ success: true, token, data: admin });
});

// Get admin profile
export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id); // req.admin set in auth middleware
  res.status(200).json({ success: true, data: admin });
});
