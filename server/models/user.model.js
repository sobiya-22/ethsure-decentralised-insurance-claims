import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  wallet_address: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  name: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  phone: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  address: {
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
  profile_photo_url: {
    type: String,
    required: false,
    default: null,
  },
  id_document_url: {
    type: String,
    required: false,
    default: null,
  },

  // Array of roles the user has
  roles: [
    {
      role_type: {
        type: String,
        enum: ["  Customer", "Agent", "Admin"],
        required: true,
      },
      ref_id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "roles.role_type", // link to Agent or Customer
      },
      is_active: {
        type: Boolean,
        default: true,
      },
      // For agents
      license_number: {
        type: String,
        required: false,
        default: "",
      },
      is_approved: {
        type: Boolean,
        default: false,
      },
      // For customers + agents
      kyc_status: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending",
      },
      added_at: {
        type: Date,
        default: Date.now,
      },
      updated_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  is_new_user: {
    type: Boolean,
    default: true,
  },
  last_login: {
    type: Date,
    default: Date.now,
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
UserSchema.index({ "roles.role_type": 1 });

export default mongoose.model("User", UserSchema);
