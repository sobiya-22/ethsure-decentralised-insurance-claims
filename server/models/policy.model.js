import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const PolicySchema = new mongoose.Schema({
  policy_id: {
    type: String,
    default: uuidv4, 
    unique: true,
  },
  policy_number: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  customer_did: {
    type: String,
    required: true,
    trim: true,
  },
  agent_did: {
    type: String,
    required: true,
    trim: true,
  },
  policy_type: {
    type: String,
    required: true,
    enum: ["health", "auto", "life", "property", "travel", "other"], // can expand
  },
  coverage_amount: {
    type: mongoose.Decimal128,
    required: true,
  },
  premium_amount: {
    type: mongoose.Decimal128,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "expired", "cancelled", "pending"],
    default: "pending",
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  terms_document_url: {
    type: String,
    default: null, //  IPFS or any other
  }
}, {
  timestamps: true
});

export default mongoose.model("Policy", PolicySchema);
