import api from "./api";

//create policy  
export const createPolicy = async (policyData) => {
  return await api.post("/policy/create", policyData);
};

//Get all policies (no filter)
export const getAllPolicies = async () => {
  return await api.get("/policy/all-policies");
};

//Get policies by customer wallet
export const getCustomerPolicies = async (customer_wallet) => {
  return await api.get("/policy/all-policies", {
    params: { customer_wallet },
  });
};

// Get policies by agent wallet
export const getAgentPolicies = async (agent_wallet) => {
  return await api.get("/policy/all-policies", {
    params: { agent_wallet },
  });
};

//Get policies by status only
export const getPoliciesByStatus = async (status) => {
  return await api.get("/policy/all-policies", {
    params: { status },
  });
};

//Get active policies
export const getActivePolicies = async (filters = {}) => {
  return await api.get("/policy/all-policies", {
    params: { ...filters, status: "active" },
  });
};

//Get created policies
export const getCreatedPolicies = async (filters = {}) => {
  return await api.get("/policy/all-policies", {
    params: { ...filters, status: "created" },
  });
};

// Get ongoing policies
export const getOngoingPolicies = async (filters = {}) => {
  return await api.get("/policy/all-policies", {
    params: { ...filters, status: "ongoing" },
  });
};

//Get cancelled policies
export const getCancelledPolicies = async (filters = {}) => {
  return await api.get("/policy/all-policies", {
    params: { ...filters, status: "cancelled" },
  });
};

//GET SPECIFIC POLICY
export const getPolicyById = async (id) => {
  return await api.get(`/policy/${id}`);
};

//UPDATE POLICY STATUS
//Generic function
export const updatePolicyStatus = async (id, newStatus, wallet_address, role) => {
  return await api.put(`/policy/update-status/${id}`, {
    newStatus,
    wallet_address,
    role,
  });
};


//Customer creates policy
export const customerCreatePolicy = async (id, wallet_address) => {
  return await updatePolicyStatus(id, "created", wallet_address, "customer");
};

//Agent activates policy (created → ongoing)
export const agentActivatePolicy = async (id, wallet_address) => {
  return await updatePolicyStatus(id, "ongoing", wallet_address, "agent");
};

//Agent cancels policy (created → cancelled)
export const agentCancelPolicy = async (id, wallet_address) => {
  return await updatePolicyStatus(id, "cancelled", wallet_address, "agent");
};

//Company activates policy (ongoing → active)
export const companyActivatePolicy = async (id, wallet_address) => {
  return await updatePolicyStatus(id, "active", wallet_address, "company");
};

//Company cancels policy (ongoing → cancelled)
export const companyCancelPolicy = async (id, wallet_address) => {
  return await updatePolicyStatus(id, "cancelled", wallet_address, "company");
};
