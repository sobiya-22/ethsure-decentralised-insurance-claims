import axios from "./axiosInstance";

export const submitAgentKYC = (data) => axios.post("/agent/kyc", data).then(res => res.data);

export const checkAgentKYCStatus = (wallet) => axios.get(`/agent/kyc-status/${wallet}`).then(res => res.data);

export const getAllAgents = () => axios.get("/agent").then(res => res.data);
