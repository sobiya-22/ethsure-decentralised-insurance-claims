import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema(
  {
    agent_did: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    wallet_address: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    //filled during KYC
    agent_name: { type: String,
       default: "", 
       trim: true },
       
    agent_email: { type: String, default: "", lowercase: true, trim: true },
    agent_phone: { type: String, default: "", trim: true },
    license_number: { type: String, default: "", trim: true },

    profile_photo_url: { type: String, default: null },

    // KYC & approval
    kyc_status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    is_approved: { type: Boolean, default: false },

    registration_date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Agent", AgentSchema);
