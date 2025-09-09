import Customer from "../models/customer.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Register or Get Customer
const registerOrGetCustomer = asyncHandler(async (req, res) => {
  const { wallet_address, email, name } = req.body;

  if (!wallet_address) {
    return res.status(400).json({ success: false, message: "Wallet address is required" });
  }

  let customer = await Customer.findOne({ wallet_address });

  if (customer) {
    return res.status(200).json({
      success: true,
      message: "Customer already registered",
      user: customer,
      isNew: false,
      requiresKYC: customer.kyc_status !== "verified",
    });
  }

  customer = await Customer.create({
    customer_did: `did:customer:${Date.now()}`,
    customer_name: name || "",
    customer_email: email || "",
    wallet_address,
    kyc_status: "pending",
  });

  return res.status(201).json({
    success: true,
    message: "Customer registered, please complete KYC",
    user: customer,
    isNew: true,
    requiresKYC: true,
  });
});

// Complete Customer KYC
const completeCustomerKYC = asyncHandler(async (req, res) => {
  const { wallet_address, name, email, phone, address, date_of_birth, profile_photo_url, id_document_url } = req.body;

  const customer = await Customer.findOneAndUpdate(
    { wallet_address },
    {
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      customer_address: address,
      date_of_birth,
      profile_photo_url: profile_photo_url || null,
      id_document_url: id_document_url || null,
      kyc_status: "verified",
    },
    { new: true }
  );

  if (!customer) {
    return res.status(404).json({ success: false, message: "Customer not found" });
  }

  res.status(200).json({ success: true, message: "KYC completed successfully", user: customer });
});


// Get customer by wallet address
const getCustomer = asyncHandler(async (req, res) => {
  const { wallet_address } = req.params;
  const customer = await Customer.findOne({ wallet_address });
  if (!customer) {
    return res.status(404).json({ success: false, message: "Customer not found" });
  }
  res.status(200).json({ success: true, data: customer });
});

// Get all Customers
const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find();
  res.status(200).json({ success: true, data: customers });
});

export { registerOrGetCustomer, completeCustomerKYC, getCustomer, getAllCustomers };
