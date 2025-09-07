import axios from "axios";

const BASE_URL = "http://localhost:3000/api/agents";

export const registerAgent = async (wallet_address) => {
  return axios.post(`${BASE_URL}/register`, { wallet_address });
};

export const completeAgentKYC = async (kycData) => {
  return axios.post(`${BASE_URL}/complete-kyc`, kycData);
};

export const getAgent = async (wallet_address) => {
  return axios.get(`${BASE_URL}/${wallet_address}`);
};

export const getAllAgents = async () => {
  return axios.get(BASE_URL);
};
