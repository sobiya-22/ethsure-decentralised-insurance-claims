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
    required: true,
    trim: true,
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
    required: true,
    trim: true,
  },
  license_number: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
  wallet_address: {
    type: String,
    required: true,
    trim: true,
  },
  is_approved: {
    type: Boolean,
    default: false,
  },
  profile_photo_url: {
    type: String,
    default: null,
  }
}, {
  timestamps: true
});

export default mongoose.model("Agent", AgentSchema);
