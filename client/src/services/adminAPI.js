import axios from "axios";

const BASE_URL = "http://localhost:3000/api/admin";

// Register admin
const registerAdmin = async (adminData) => {
  return axios.post(`${BASE_URL}/register`, adminData);
};

// Login admin
const loginAdmin = async (loginData) => {
  return axios.post(`${BASE_URL}/login`, loginData);
};

// Get admin profile (requires token)
const getAdminProfile = async (token) => {
  return axios.get(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export {registerAdmin  , loginAdmin , getAdminProfile}