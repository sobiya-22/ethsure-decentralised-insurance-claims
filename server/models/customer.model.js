import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    customer_did: {
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

    // Optional until KYC
    customer_name: { type: String, default: "", trim: true },
    customer_email: { type: String, default: "", lowercase: true, trim: true },
    customer_phone: { type: String, default: "", trim: true },
    customer_address: { type: String, default: "", trim: true },
    date_of_birth: { type: Date, default: null },

    profile_photo_url: { type: String, default: null },
    id_document_url: { type: String, default: null },

    // KYC status
    kyc_status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    registration_date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
