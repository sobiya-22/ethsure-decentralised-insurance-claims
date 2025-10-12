import api from "./api";

//GET AGENT DETAILS
export const getAgentDetails = async (wallet_address) => {
  return await api.post("/agent/get", { wallet_address });
};

//UPDATE AGENT PROFILE
export const updateAgentProfile = async (wallet_address, updateData) => {
  return await api.patch("/agent/update", { wallet_address, updateData });
};

// Agent sends association request to company
export const sendAssociationRequest = async (agent_wallet_address) => {
  return await api.post("/agent/send-association", { agent_wallet_address });
};

// GET POLICY REQUESTS
export const getAgentPolicyRequests = async (wallet_address) => {
  return await api.post("/agent/policy-requests", { wallet_address });
};

//GET ALL POLICIES ASSIGNED TO AGENT
export const getAllAgentPolicies = async (wallet_address) => {
  return await api.post("/agent/all-policies", { wallet_address });
};