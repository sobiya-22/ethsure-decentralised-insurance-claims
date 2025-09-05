import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
    trim: true,
  },
  wallet_address: {
    type: String,
    required: true,
    unique: true,
  },
  logo_url: {
    type: String,
    default: null,
  }
});

export default mongoose.model("InsuranceCompany", CompanySchema);
