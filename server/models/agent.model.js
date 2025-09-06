import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema({
  agent_did: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  agent_name: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  agent_email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  agent_phone: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  license_number: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  wallet_address: {
    type: String,
    required: true,
    trim: true,
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
  kyc_status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },
  is_approved: {
    type: Boolean,
    default: false,
  },
  profile_photo_url: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Agent", AgentSchema);
