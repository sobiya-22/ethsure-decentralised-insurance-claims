import api from "./api";


// Get customer details
export const getCustomer = async (wallet_address) => {
  const res = await api.post("/customer/get", { wallet_address });
  return res;
};

// Update customer details
export const updateCustomer = async (wallet_address, updateData) => {
  const res = await api.put("/customer/update", { wallet_address, updateData });
  return res;
};

// Customer sends policy request to agent
export const sendPolicyRequest = async (customer_wallet_address, agent_wallet_address, policy_id) => {
  const res = await api.post("/customer/send-policy-request", { customer_wallet_address, agent_wallet_address, policy_id });
  return res;
};

