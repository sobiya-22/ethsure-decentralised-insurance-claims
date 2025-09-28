import api from "./api";

// Submit agent KYC
export const submitAgentKYC = (agentData) => {
  return api.post("/agent/kyc", agentData);
};

// Check agent KYC status
export const checkAgentKYCStatus = (wallet_address) => {
  return api.get(`/agent/kyc-status/${wallet_address}`);
};

// Get a single agent
export const getAgent = (wallet_address) => {
  return api.get(`/agent/${wallet_address}`);
};

// Get all agents
export const getAllAgents = () => {
  return api.get("/agent");
};

//update agent KYC 
export const updateAgent = () => {
   return api.post("/agent/kyc", agentData);
};