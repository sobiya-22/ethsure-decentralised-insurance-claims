import api from "./api";

/* ---------- COMPANY MANAGEMENT ---------- */



//Get all companies (returns array, but we'll use the first one since there's only one company)
//Get company (works with or without wallet address)
export const getCompany = async (wallet_address = null) => {
  return await api.post("api/company/get", { wallet_address });
};
/* ---------- AGENT MANAGEMENT ---------- */

//Get all agents (any status)
export const getAllAgents = async (company_wallet_address) => {
  return await api.post("api/company/agents", { company_wallet_address });
};

// Get agents with pending KYC
export const getPendingKYCAgents = async (company_wallet_address) => {
  return await api.post("api/company/agents", {
    company_wallet_address,
    status: "pending_kyc",
  });
};

//Get approved agents
export const getApprovedAgents = async (company_wallet_address) => {
  return await api.post("api/company/agents", {
    company_wallet_address,
    status: "approved",
  });
};

// "pending_approval" = verified but not approved
export const getPendingApprovalAgents = async (company_wallet_address) => {
  return await api.post("api/company/agents", {
    company_wallet_address,
    status: "pending_approval",
  });
};

//Get rejected agents
export const getRejectedAgents = async (company_wallet_address) => {
  return await api.post("api/company/agents", {
    company_wallet_address,
    status: "rejected",
  });
};

//Approve specific agent
export const approveAgent = async (company_wallet_address, agent_wallet_address) => {
  return await api.patch("api/company/agent-approval", {
    company_wallet_address,
    agent_wallet_address,
    approve: true,
  });
};

//Reject specific agent
export const rejectAgent = async (company_wallet_address, agent_wallet_address) => {
  return await api.patch("api/company/agent-approval", {
    company_wallet_address,
    agent_wallet_address,
    approve: false,
  });
};
