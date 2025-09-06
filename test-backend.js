const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

const testRoutes = async () => {
  console.log('🧪 Testing Backend Routes...\n');

  const routes = [
    { method: 'GET', path: '/', name: 'Root endpoint' },
    { method: 'GET', path: '/api', name: 'API status' },
    { method: 'GET', path: '/api/customers', name: 'Get all customers' },
    { method: 'GET', path: '/api/agents', name: 'Get all agents' },
    { method: 'POST', path: '/api/customers/register', name: 'Register customer', data: { wallet_address: '0x123', customer_email: 'test@test.com' } },
    { method: 'POST', path: '/api/agents/register', name: 'Register agent', data: { wallet_address: '0x456', agent_email: 'agent@test.com' } },
  ];

  for (const route of routes) {
    try {
      console.log(`Testing ${route.method} ${route.path}...`);
      
      let response;
      if (route.method === 'GET') {
        response = await axios.get(`${BASE_URL}${route.path}`);
      } else if (route.method === 'POST') {
        response = await axios.post(`${BASE_URL}${route.path}`, route.data);
      }

      console.log(`✅ ${route.name}: ${response.status} - ${response.statusText}`);
      if (response.data) {
        console.log(`   Response: ${JSON.stringify(response.data).substring(0, 100)}...`);
      }
    } catch (error) {
      console.log(`❌ ${route.name}: ${error.response?.status || 'Error'} - ${error.message}`);
    }
    console.log('');
  }

  console.log('🏁 Backend route testing completed!');
};

// Run the test
testRoutes().catch(console.error);
