import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

async function testBackend() {
  console.log('🧪 Testing Fixed Backend...\n');

  try {
    // Test 1: Check if server is running
    console.log('1️⃣ Testing server connection...');
    const healthCheck = await axios.get(`${API_BASE}`);
    console.log('✅ Server is running:', healthCheck.data.message);

    // Test 2: Test customer registration
    console.log('\n2️⃣ Testing customer registration...');
    const testWallet = '0x1234567890abcdef1234567890abcdef12345678';
    const testEmail = 'test@example.com';

    try {
      const customerReg = await axios.post(`${API_BASE}/customers/register`, {
        wallet_address: testWallet,
        customer_email: testEmail
      });
      console.log('✅ Customer registration successful:', customerReg.data.success);
    } catch (error) {
      console.log('❌ Customer registration failed:', error.response?.data?.message || error.message);
    }

    // Test 3: Test agent registration
    console.log('\n3️⃣ Testing agent registration...');
    try {
      const agentReg = await axios.post(`${API_BASE}/agents/register`, {
        wallet_address: testWallet,
        agent_email: testEmail
      });
      console.log('✅ Agent registration successful:', agentReg.data.success);
    } catch (error) {
      console.log('❌ Agent registration failed:', error.response?.data?.message || error.message);
    }

    // Test 4: Test getting non-existent customer (should not throw error)
    console.log('\n4️⃣ Testing get non-existent customer...');
    try {
      const nonExistentCustomer = await axios.get(`${API_BASE}/customers/profile/0xnonexistent`);
      console.log('❌ Should have returned 404, but got:', nonExistentCustomer.data);
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('✅ Correctly returned 404 for non-existent customer');
      } else {
        console.log('❌ Unexpected error:', error.response?.data || error.message);
      }
    }

    // Test 5: Test getting non-existent agent (should not throw error)
    console.log('\n5️⃣ Testing get non-existent agent...');
    try {
      const nonExistentAgent = await axios.get(`${API_BASE}/agents/profile/0xnonexistent`);
      console.log('❌ Should have returned 404, but got:', nonExistentAgent.data);
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('✅ Correctly returned 404 for non-existent agent');
      } else {
        console.log('❌ Unexpected error:', error.response?.data || error.message);
      }
    }

    // Test 6: Test getting existing customer
    console.log('\n6️⃣ Testing get existing customer...');
    try {
      const existingCustomer = await axios.get(`${API_BASE}/customers/profile/${testWallet}`);
      console.log('✅ Successfully retrieved existing customer:', existingCustomer.data.success);
    } catch (error) {
      console.log('❌ Failed to get existing customer:', error.response?.data || error.message);
    }

    // Test 7: Test customer KYC submission
    console.log('\n7️⃣ Testing customer KYC submission...');
    try {
      const kycData = {
        wallet_address: testWallet,
        customer_name: 'Test Customer',
        customer_phone: '1234567890',
        customer_address: '123 Test Street',
        date_of_birth: '1990-01-01'
      };
      const kycResult = await axios.post(`${API_BASE}/customers/kyc`, kycData);
      console.log('✅ KYC submission successful:', kycResult.data.success);
    } catch (error) {
      console.log('❌ KYC submission failed:', error.response?.data || error.message);
    }

    console.log('\n🎉 Backend testing completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testBackend();
