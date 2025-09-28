import axios from "axios";

// Base axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend port
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: add JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: log errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
