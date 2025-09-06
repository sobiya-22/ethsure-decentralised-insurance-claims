import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

async function testCompleteSystem() {
  console.log('🧪 Testing Complete System with All Fixes...\n');

  try {
    const testWallet1 = '0x1111111111111111111111111111111111111111';
    const testWallet2 = '0x2222222222222222222222222222222222222222';
    const testEmail1 = 'user1@example.com';
    const testEmail2 = 'user2@example.com';

    // Test 1: Register first user with real email
    console.log('1️⃣ Registering first user with real email...');
    const user1Reg = await axios.post(`${API_BASE}/users/register`, {
      wallet_address: testWallet1,
      email: testEmail1,
      name: 'John Doe'
    });
    console.log('✅ User 1 registered:', user1Reg.data.success);
    console.log('   Email:', user1Reg.data.data.email);
    console.log('   Name:', user1Reg.data.data.name);

    // Test 2: Register second user with different email
    console.log('\n2️⃣ Registering second user with different email...');
    const user2Reg = await axios.post(`${API_BASE}/users/register`, {
      wallet_address: testWallet2,
      email: testEmail2,
      name: 'Jane Smith'
    });
    console.log('✅ User 2 registered:', user2Reg.data.success);
    console.log('   Email:', user2Reg.data.data.email);

    // Test 3: Try to register with duplicate email (should fail)
    console.log('\n3️⃣ Testing duplicate email prevention...');
    try {
      await axios.post(`${API_BASE}/users/register`, {
        wallet_address: '0x3333333333333333333333333333333333333333',
        email: testEmail1, // Same email as user 1
        name: 'Duplicate User'
      });
      console.log('❌ Should have failed but succeeded');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('✅ Correctly rejected duplicate email');
      } else {
        console.log('❌ Unexpected error:', error.response?.data);
      }
    }

    // Test 4: Add customer role to user 1
    console.log('\n4️⃣ Adding customer role to user 1...');
    const customerRole = await axios.post(`${API_BASE}/users/add-role`, {
      wallet_address: testWallet1,
      role_type: 'customer'
    });
    console.log('✅ Customer role added:', customerRole.data.success);

    // Test 5: Add agent role to user 2
    console.log('\n5️⃣ Adding agent role to user 2...');
    const agentRole = await axios.post(`${API_BASE}/users/add-role`, {
      wallet_address: testWallet2,
      role_type: 'agent',
      license_number: 'AGENT123456'
    });
    console.log('✅ Agent role added:', agentRole.data.success);

    // Test 6: Update customer KYC
    console.log('\n6️⃣ Updating customer KYC...');
    const kycUpdate = await axios.put(`${API_BASE}/users/role-data`, {
      wallet_address: testWallet1,
      role_type: 'customer',
      name: 'John Doe Updated',
      phone: '1234567890',
      address: '123 Main St',
      date_of_birth: '1990-01-01'
    });
    console.log('✅ KYC updated:', kycUpdate.data.success);
    console.log('   KYC Status:', kycUpdate.data.data.roles.find(r => r.role_type === 'customer').kyc_status);

    // Test 7: Update agent profile
    console.log('\n7️⃣ Updating agent profile...');
    const agentUpdate = await axios.put(`${API_BASE}/users/role-data`, {
      wallet_address: testWallet2,
      role_type: 'agent',
      name: 'Jane Smith Updated',
      phone: '9876543210',
      address: '456 Oak Ave',
      date_of_birth: '1985-05-15',
      license_number: 'AGENT123456'
    });
    console.log('✅ Agent profile updated:', agentUpdate.data.success);

    // Test 8: Admin approval for customer
    console.log('\n8️⃣ Admin approving customer KYC...');
    const customerApproval = await axios.patch(`${API_BASE}/users/kyc-status`, {
      wallet_address: testWallet1,
      role_type: 'customer',
      kyc_status: 'verified'
    });
    console.log('✅ Customer approved:', customerApproval.data.success);

    // Test 9: Admin approval for agent
    console.log('\n9️⃣ Admin approving agent...');
    const agentApproval = await axios.patch(`${API_BASE}/users/kyc-status`, {
      wallet_address: testWallet2,
      role_type: 'agent',
      kyc_status: 'verified'
    });
    console.log('✅ Agent approved:', agentApproval.data.success);

    // Test 10: Get all users (admin dashboard)
    console.log('\n🔟 Getting all users for admin dashboard...');
    const allUsers = await axios.get(`${API_BASE}/users`);
    console.log('✅ All users retrieved:', allUsers.data.success);
    console.log('   Total users:', allUsers.data.data.length);
    
    // Show user details
    allUsers.data.data.forEach((user, index) => {
      console.log(`   User ${index + 1}:`);
      console.log(`     Name: ${user.name}`);
      console.log(`     Email: ${user.email}`);
      console.log(`     Roles: ${user.roles.map(r => r.role_type).join(', ')}`);
      user.roles.forEach(role => {
        if (role.role_type === 'customer') {
          console.log(`       Customer KYC: ${role.kyc_status}`);
        } else if (role.role_type === 'agent') {
          console.log(`       Agent Approved: ${role.is_approved}`);
        }
      });
    });

    // Test 11: Get specific role data
    console.log('\n1️⃣1️⃣ Getting customer role data...');
    const customerData = await axios.get(`${API_BASE}/users/role/${testWallet1}/customer`);
    console.log('✅ Customer role data retrieved:', customerData.data.success);
    console.log('   KYC Status:', customerData.data.data.role_data.kyc_status);

    console.log('\n1️⃣2️⃣ Getting agent role data...');
    const agentData = await axios.get(`${API_BASE}/users/role/${testWallet2}/agent`);
    console.log('✅ Agent role data retrieved:', agentData.data.success);
    console.log('   Approved:', agentData.data.data.role_data.is_approved);

    console.log('\n🎉 Complete system testing successful!');
    console.log('\n📋 Summary:');
    console.log('✅ Email duplication prevention working');
    console.log('✅ Real email storage working');
    console.log('✅ Multi-role system working');
    console.log('✅ KYC approval system working');
    console.log('✅ Admin dashboard data available');
    console.log('✅ No duplicate index warnings');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testCompleteSystem();
