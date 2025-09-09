import axios from "axios";

const BASE_URL = "http://localhost:3000/api/agents";

const registerAgent = async ({ wallet_address, email, name }) => {
  return axios.post(`${BASE_URL}/register`, { wallet_address, email, name });
};

const completeAgentKYC = async (kycData) => {
  return axios.post(`${BASE_URL}/complete-kyc`, kycData);
};

const getAgent = async (wallet_address) => {
  return axios.get(`${BASE_URL}/${wallet_address}`);
};

const getAllAgents = async () => {
  return axios.get(BASE_URL);
};

export {registerAgent , completeAgentKYC , getAgent , getAllAgents}