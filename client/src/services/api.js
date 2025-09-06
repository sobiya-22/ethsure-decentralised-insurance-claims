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

// Customer API functions
export const customerAPI = {
  // Register new customer
  register: (data) => api.post('/customers/register', data),
  
  // Submit KYC
  submitKYC: (data) => api.post('/customers/kyc', data),
  
  // Get customer profile
  getProfile: (walletAddress) => api.get(`/customers/profile/${walletAddress}`),
  
  // Get all customers
  getAll: () => api.get('/customers'),
  
  // Update KYC status
  updateKYCStatus: (walletAddress, status) => 
    api.patch(`/customers/kyc/${walletAddress}`, { kyc_status: status }),
};

// Agent API functions
export const agentAPI = {
  // Register new agent
  register: (data) => api.post('/agents/register', data),
  
  // Submit KYC
  submitKYC: (data) => api.post('/agents/kyc', data),
  
  // Get agent profile
  getProfile: (walletAddress) => api.get(`/agents/profile/${walletAddress}`),
  
  // Get all agents
  getAll: () => api.get('/agents'),
  
  // Update approval status
  updateApproval: (walletAddress, isApproved) => 
    api.patch(`/agents/approve/${walletAddress}`, { is_approved: isApproved }),
};

// Test backend connectivity
export const testConnection = async () => {
  try {
    const response = await api.get('/');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// User API functions
export const userAPI = {
  // Register or get user
  registerOrGet: (data) => api.post('/users/register', data),
  
  // Get user profile
  getProfile: (walletAddress) => api.get(`/users/profile/${walletAddress}`),
  
  // Add role to user
  addRole: (data) => api.post('/users/add-role', data),
  
  // Update user profile
  updateProfile: (data) => api.put('/users/profile', data),
  
  // Update role-specific data
  updateRoleData: (data) => api.put('/users/role-data', data),
  
  // Get user's specific role data
  getRoleData: (walletAddress, roleType) => api.get(`/users/role/${walletAddress}/${roleType}`),
  
  // Update KYC status (admin)
  updateKYCStatus: (data) => api.patch('/users/kyc-status', data),
  
  // Get all users
  getAll: () => api.get('/users'),
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
