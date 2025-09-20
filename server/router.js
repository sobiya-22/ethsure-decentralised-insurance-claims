import express from "express";
import { verifyIdToken, authorizeRole } from "./middleware.js";

const router = express.Router();

// Customer-only route
router.get("/customer", verifyIdToken, authorizeRole(["customer"]), (req, res) => {
  res.json({ message: `Welcome Customer ${req.user.sub}` });
});

// Agent-only route
router.get("/agent", verifyIdToken, authorizeRole(["agent"]), (req, res) => {
  res.json({ message: `Welcome Agent ${req.user.sub}` });
});

// Company-only route
router.get("/company", verifyIdToken, authorizeRole(["company"]), (req, res) => {
  res.json({ message: `Welcome Company ${req.user.sub}` });
});

export default router;
