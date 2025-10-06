import api from "./api";


// Create a new policy
export const createPolicy = async (policyData) => {
  const res = await api.post("/policy/create", policyData);
  return res;
};

// Get all policies
export const getPolicy = async () => {
  const res = await api.get("/policy/get");
  return res;
};

// Update existing policy
export const updatePolicy = async (updateData) => {
  const res = await api.put("/policy/update", updateData);
  return res;
};

// Deactivate a policy
export const deactivatePolicy = async () => {
  const res = await api.put("/policy/deactivate");
  return res;
};