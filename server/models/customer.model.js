import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  customer_did: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  customer_name: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  customer_email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  customer_phone: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  customer_address: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  date_of_birth: {
    type: Date,
    required: false,
    default: null,
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
  profile_photo_url: {
    type: String,
    default: null,
  },
  id_document_url: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Customer", CustomerSchema);
