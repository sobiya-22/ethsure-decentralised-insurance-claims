import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Test backend connectivity
export const testConnection = async () => {
  try {
    const response = await api.get('/');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Test API endpoints
export const testAPI = {
  // Test GET request
  testGet: () => api.get('/test'),
  
  // Test POST request
  testPost: (data) => api.post('/test', data),
  
  // Test customer registration
  testCustomerRegister: (data) => api.post('/customers/register', data),
  
  // Test agent registration
  testAgentRegister: (data) => api.post('/agents/register', data),
};

export default api;
