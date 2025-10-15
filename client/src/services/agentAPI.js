import api from "./api";

//GET AGENT DETAILS
export const getAgentDetails = async (wallet_address) => {
  return await api.post("api/agent/get", { wallet_address });
};

//UPDATE AGENT PROFILE
export const updateAgentProfile = async (wallet_address, updateData) => {
  return await api.patch("api/agent/update", { wallet_address, updateData });
};

// Agent sends association request to company
export const sendAssociationRequest = async (agent_wallet_address) => {
  return await api.post("api/agent/send-association", { agent_wallet_address });
};

// GET POLICY REQUESTS
export const getAgentPolicyRequests = async (wallet_address) => {
  return await api.post("api/agent/policy-requests", { wallet_address });
};

//GET ALL POLICIES ASSIGNED TO AGENT
export const getAllAgentPolicies = async (wallet_address) => {
  return await api.post("api/agent/all-policies", { wallet_address });
};

//GET APPROVED AGENTS (for customers to choose from)
export const getApprovedAgents = async () => {
  return await api.post("api/agent/approved");
};