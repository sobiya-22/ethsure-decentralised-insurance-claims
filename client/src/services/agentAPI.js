import api from "./api";

// Get a single agent by wallet address
export const getAgent = async (wallet_address) => {
  const res = await api.post("/agent/get", { wallet_address });
  return res;
};

// Update agent details
export const updateAgent = async (wallet_address, updateData) => {
  const res = await api.put("/agent/update", { wallet_address, updateData });
  return res;
};

// Get all agents
export const getAllAgents = async () => {
  const res = await api.post("/agent/all");
  return res;
};

// Get approved agents
export const getApprovedAgents = async () => {
  const res = await api.post("/agent/approved");
  return res;
};

// Get pending agents
export const getPendingAgents = async () => {
  const res = await api.post("/agent/pending");
  return res;
};

// Send association request from agent
export const sendAssociationRequest = async (agent_wallet_address) => {
  const res = await api.post("/agent/send-association-request", { agent_wallet_address });
  return res;
};



/* ===================== POLICY REQ BY CUSTOMER===================== */

// Get all policy requests for an agent
export const getAgentPolicyRequests = async (agent_wallet_address) => {
  const res = await api.post("/agent/policy-requests", { agent_wallet_address });
  return res;
};

// Approve a policy request
export const approvePolicyRequest = async (agent_wallet_address, customer_wallet_address, policy_id) => {
  const res = await api.post("/agent/policy-approve", { agent_wallet_address, customer_wallet_address, policy_id });
  return res;
};

// Reject a policy request
export const rejectPolicyRequest = async (agent_wallet_address, customer_wallet_address, policy_id) => {
  const res = await api.post("/agent/policy-reject", { agent_wallet_address, customer_wallet_address, policy_id });
  return res;
};
