import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

async function testMultiRoleSystem() {
  console.log('🧪 Testing Multi-Role User System...\n');

  try {
    const testWallet = '0x1234567890abcdef1234567890abcdef12345678';
    const testEmail = 'test@example.com';

    // Test 1: Register new user
    console.log('1️⃣ Registering new user...');
    const userReg = await axios.post(`${API_BASE}/users/register`, {
      wallet_address: testWallet,
      email: testEmail,
      name: 'Test User'
    });
    console.log('✅ User registered:', userReg.data.success);
    console.log('   Is new user:', userReg.data.data.is_new_user);

    // Test 2: Add customer role
    console.log('\n2️⃣ Adding customer role...');
    const customerRole = await axios.post(`${API_BASE}/users/add-role`, {
      wallet_address: testWallet,
      role_type: 'customer'
    });
    console.log('✅ Customer role added:', customerRole.data.success);

    // Test 3: Add agent role
    console.log('\n3️⃣ Adding agent role...');
    const agentRole = await axios.post(`${API_BASE}/users/add-role`, {
      wallet_address: testWallet,
      role_type: 'agent',
      license_number: 'AGENT123456'
    });
    console.log('✅ Agent role added:', agentRole.data.success);

    // Test 4: Get user profile
    console.log('\n4️⃣ Getting user profile...');
    const userProfile = await axios.get(`${API_BASE}/users/profile/${testWallet}`);
    console.log('✅ User profile retrieved:', userProfile.data.success);
    console.log('   Roles count:', userProfile.data.data.roles.length);
    console.log('   Roles:', userProfile.data.data.roles.map(r => r.role_type));

    // Test 5: Get customer role data
    console.log('\n5️⃣ Getting customer role data...');
    const customerData = await axios.get(`${API_BASE}/users/role/${testWallet}/customer`);
    console.log('✅ Customer role data retrieved:', customerData.data.success);
    console.log('   KYC Status:', customerData.data.data.role_data.kyc_status);

    // Test 6: Get agent role data
    console.log('\n6️⃣ Getting agent role data...');
    const agentData = await axios.get(`${API_BASE}/users/role/${testWallet}/agent`);
    console.log('✅ Agent role data retrieved:', agentData.data.success);
    console.log('   License:', agentData.data.data.role_data.license_number);
    console.log('   Approved:', agentData.data.data.role_data.is_approved);

    // Test 7: Update customer KYC
    console.log('\n7️⃣ Updating customer KYC...');
    const kycUpdate = await axios.put(`${API_BASE}/users/role-data`, {
      wallet_address: testWallet,
      role_type: 'customer',
      name: 'John Doe',
      phone: '1234567890',
      address: '123 Main St',
      date_of_birth: '1990-01-01'
    });
    console.log('✅ KYC updated:', kycUpdate.data.success);
    console.log('   KYC Status:', kycUpdate.data.data.roles.find(r => r.role_type === 'customer').kyc_status);

    // Test 8: Try to add duplicate role
    console.log('\n8️⃣ Trying to add duplicate customer role...');
    try {
      await axios.post(`${API_BASE}/users/add-role`, {
        wallet_address: testWallet,
        role_type: 'customer'
      });
      console.log('❌ Should have failed but succeeded');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('✅ Correctly rejected duplicate role');
      } else {
        console.log('❌ Unexpected error:', error.response?.data);
      }
    }

    // Test 9: Get updated user profile
    console.log('\n9️⃣ Getting updated user profile...');
    const updatedProfile = await axios.get(`${API_BASE}/users/profile/${testWallet}`);
    console.log('✅ Updated profile retrieved:', updatedProfile.data.success);
    console.log('   User name:', updatedProfile.data.data.name);
    console.log('   User phone:', updatedProfile.data.data.phone);
    console.log('   Is new user:', updatedProfile.data.data.is_new_user);

    console.log('\n🎉 Multi-role system testing completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testMultiRoleSystem();
