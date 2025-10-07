import api from "./api";


// Get customer details
export const getCustomer = async (wallet_address) => {
  const res = await api.post("/api/customer/get", { wallet_address });
  return res;
};

// Update customer details
export const updateCustomer = async (wallet_address, updateData) => {
  const res = await api.put("/api/customer/update", { wallet_address, updateData });
  return res;
};

// Customer sends policy request to agent
export const sendPolicyRequest = async (customer_wallet_address, agent_wallet_address, policy_id) => {
  const res = await api.post("/api/customer/send-policy-request", { customer_wallet_address, agent_wallet_address, policy_id });
  return res;
};

// Check customer KYC status
export const checkCustomerKYCStatus = async (wallet_address) => {
  const res = await api.post("/api/customer/kyc-status", { wallet_address });
  return res;
};

// Submit customer KYC
export const submitCustomerKYC = async (kycData) => {
  const res = await api.post("/api/customer/kyc", kycData);
  return res;
};

// Get all customers
export const getAllCustomers = async () => {
  const res = await api.post("/api/customer/all");
  return res;
};

