import api from "./api";

// Submit customer KYC
export const submitCustomerKYC = (customerData) => {
  return api.post("/customer/kyc", customerData);
};

// Check customer KYC status by wallet
export const checkCustomerKYCStatus = (wallet_address) => {
  return api.get(`/customer/kyc-status/${wallet_address}`);
};

// Get a single customer
export const getCustomer = (wallet_address) => {
  return api.get(`/customer/${wallet_address}`);
};

// Get all customers
export const getAllCustomers = () => {
  return api.get("/customer");
};

export const updateCustomer = () => {
   return api.post("/customer/kyc", customerData);
};

