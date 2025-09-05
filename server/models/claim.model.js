import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ClaimSchema = new mongoose.Schema({
  claim_id: {
    type: String,
    default: uuidv4, 
    unique: true,
  },
  policy_id: {
    type: String,
    required: true, 
  },
  customer_did: {
    type: String,
    required: true,
    trim: true,
  },
  agent_did: {
    type: String,
    default: null, // optional, assigned later
    trim: true,
  },
  claim_type: {
    type: String,
    required: true,
    enum: ["accident", "medical", "theft", "natural_disaster", "other"],
  },
  claim_amount: {
    type: mongoose.Decimal128,
    required: true,
  },
  incident_date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["submitted", "under_review", "approved", "rejected", "paid"],
    default: "submitted",
  },
  submission_date: {
    type: Date,
    default: Date.now,
  },
  resolution_date: {
    type: Date,
    default: null,
  },
//   evidence_urls: {
//     type: [String], // array of IPFS links
//     default: [],
//   },
  payout_transaction_hash: {
    type: String,
    default: null, // blockchain tx hash
    trim: true,
  }
}, {
  timestamps: true
});

export default mongoose.model("Claim", ClaimSchema);
