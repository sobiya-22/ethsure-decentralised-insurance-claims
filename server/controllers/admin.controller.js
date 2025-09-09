import Admin from "../models/admin.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register new admin
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, wallet_address } = req.body;
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) throw new Error("Admin already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({ name, email, password: hashedPassword, wallet_address });

  res.status(201).json({ success: true, data: admin });
});

// Admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error("Admin not found");

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error("Invalid password");

  const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.status(200).json({ success: true, token, data: admin });
});

// Get admin profile
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id); // req.admin set in auth middleware
  res.status(200).json({ success: true, data: admin });
});

// Approve Agent (Admin only)
const approveAgent = asyncHandler(async (req, res) => {
  const { wallet_address } = req.params;

  const agent = await Agent.findOneAndUpdate(
    { wallet_address },
    { is_approved: true },   // ✅ only admin can flip this
    { new: true }
  );

  if (!agent) {
    return res.status(404).json({ success: false, message: "Agent not found" });
  }

  res.status(200).json({ success: true, message: "Agent approved successfully", user: agent });
});

// Reject Agent (Admin only)
const rejectAgent = asyncHandler(async (req, res) => {
  const { wallet_address } = req.params;

  const agent = await Agent.findOneAndUpdate(
    { wallet_address },
    { kyc_status: "rejected", is_approved: false },
    { new: true }
  );

  if (!agent) {
    return res.status(404).json({ success: false, message: "Agent not found" });
  }

  res.status(200).json({ success: true, message: "Agent rejected", user: agent });
});


export {getAdminProfile , loginAdmin , registerAdmin , approveAgent}