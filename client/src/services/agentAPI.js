import api from "./api";

// Submit agent KYC
export const submitAgentKYC = (agentData) => {
  return api.post("/agents/kyc", agentData);
};

// Check agent KYC status
export const checkAgentKYCStatus = (wallet_address) => {
  return api.get(`/agents/kyc-status/${wallet_address}`);
};

// Get a single agent
export const getAgent = (wallet_address) => {
  return api.get(`/agents/${wallet_address}`);
};

// Get all agents
export const getAllAgents = () => {
  return api.get("/agents");
};
