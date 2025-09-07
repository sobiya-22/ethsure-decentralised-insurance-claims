import axios from "axios";

const BASE_URL = "http://localhost:3000/api/customers"; // change for prod

const registerCustomer = async (wallet_address) => {
  return axios.post(`${BASE_URL}/register`, { wallet_address });
};

const completeCustomerKYC = async (kycData) => {
  return axios.post(`${BASE_URL}/complete-kyc`, kycData);
};

const getCustomer = async (wallet_address) => {
  return axios.get(`${BASE_URL}/${wallet_address}`);
};

 const getAllCustomers = async () => {
  return axios.get(BASE_URL);
};


export {getAllCustomers , getCustomer , completeCustomerKYC , registerCustomer };