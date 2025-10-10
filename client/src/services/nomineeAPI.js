import api from "./api";

//Add a nominee for a specific policy
export const addNominee = async (nomineeData) => {
  return await api.post("/nominee/add", nomineeData);
};

//Get all nominees for a customer
export const getCustomerNominees = async (customer_id) => {
  return await api.get("/nominee/nominee-list", { params: { customer_id } });
};

//Get all nominees for a policy
export const getPolicyNominees = async (policy_id) => {
  return await api.get("/nominee/nominee-list", { params: { policy_id } });
};

//Update nominee details
export const updateNominee = async (nominee_id, updateData) => {
  return await api.patch("/nominee/update", { nominee_id, updateData });
};
