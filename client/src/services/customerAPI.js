import api from "./api";

//Get customer info
export const getCustomer = async (wallet_address) => {
  return await api.post("api/customer/get", { wallet_address });
};

//Update customer details
export const updateCustomer = async (wallet_address, updateData) => {
  return await api.patch("api/customer/update", { wallet_address, updateData });
};
