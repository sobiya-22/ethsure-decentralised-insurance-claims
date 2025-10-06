import api from "./api";


// Approve agent association (company side)
export const approveAgentAssociation = async (agent_wallet_address) => {
  const res = await api.post("/company/approve-association", { agent_wallet_address });
  return res;
};

// Reject agent association (company side)
export const rejectAgentAssociation = async (agent_wallet_address) => {
  const res = await api.post("/company/reject-association", { agent_wallet_address });
  return res;
};

// Get pending agent association requests
export const getPendingAgentRequests = async () => {
  const res = await api.get("/company/pending-association-requests");
  return res;
};
