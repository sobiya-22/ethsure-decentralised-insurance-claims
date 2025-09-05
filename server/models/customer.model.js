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
        required: true,
        trim: true,
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
        required: true,
        trim: true,
    },
    customer_address: {
        type: String,
        required: true,
        trim: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
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
        default: null, //  IPFS link or not decided yet
    },
    id_document_url: {
        type: String,
        default: null, // IPFS link or any other for now
    }
}, {
    timestamps: true
});

export default mongoose.model("Customer", CustomerSchema);
