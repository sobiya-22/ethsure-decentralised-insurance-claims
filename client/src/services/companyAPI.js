import api from "./api";

/* ---------- AGENT MANAGEMENT ---------- */

//Get all agents (any status)
export const getAllAgents = async (company_wallet_address) => {
  return await api.post("/company/agents", { company_wallet_address });
};

// Get agents with pending KYC
export const getPendingKYCAgents = async (company_wallet_address) => {
  return await api.post("/company/agents", {
    company_wallet_address,
    status: "pending_kyc",
  });
};

//Get approved agents
export const getApprovedAgents = async (company_wallet_address) => {
  return await api.post("/company/agents", {
    company_wallet_address,
    status: "approved",
  });
};

// "pending_approval" = verified but not approved
export const getPendingApprovalAgents = async (company_wallet_address) => {
  return await api.post("/company/agents", {
    company_wallet_address,
    status: "pending_approval",
  });
};

//Get rejected agents
export const getRejectedAgents = async (company_wallet_address) => {
  return await api.post("/company/agents", {
    company_wallet_address,
    status: "rejected",
  });
};

//Approve specific agent
export const approveAgent = async (company_wallet_address, agent_wallet_address) => {
  return await api.patch("/company/agent-approval", {
    company_wallet_address,
    agent_wallet_address,
    approve: true,
  });
};

//Reject specific agent
export const rejectAgent = async (company_wallet_address, agent_wallet_address) => {
  return await api.patch("/company/agent-approval", {
    company_wallet_address,
    agent_wallet_address,
    approve: false,
  });
};
