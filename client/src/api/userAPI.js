import axios from "./axiosInstance";

export const registerOrGetUser = (data) => axios.post("/user/register", data).then(res => res.data);

export const selectRole = (data) => axios.post("/user/select-role", data).then(res => res.data);

export const getUserByWallet = (wallet) => axios.get(`/user/${wallet}`).then(res => res.data);
