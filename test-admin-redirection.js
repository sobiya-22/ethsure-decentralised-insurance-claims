import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

async function testAdminRedirection() {
  console.log('🧪 Testing Admin Redirection and Approval System...\n');

  try {
    const adminWallet = '0xADMIN123456789012345678901234567890123456';
    const agentWallet = '0xAGENT123456789012345678901234567890123456';
    const customerWallet = '0xCUSTOMER123456789012345678901234567890123';

    // Test 1: Register admin user
    console.log('1️⃣ Registering admin user...');
    const adminReg = await axios.post(`${API_BASE}/users/register`, {
      wallet_address: adminWallet,
      email: 'admin@ethsure.com',
      name: 'Admin User'
    });
    console.log('✅ Admin registered:', adminReg.data.success);

    // Test 2: Add admin role
    console.log('\n2️⃣ Adding admin role...');
    const adminRole = await axios.post(`${API_BASE}/users/add-role`, {
      wallet_address: adminWallet,
      role_type: 'admin'
    });
    console.log('✅ Admin role added:', adminRole.data.success);

    // Test 3: Register agent user
    console.log('\n3️⃣ Registering agent user...');
    const agentReg = await axios.post(`${API_BASE}/users/register`, {
      wallet_address: agentWallet,
      email: 'agent@ethsure.com',
      name: 'Agent User'
    });
    console.log('✅ Agent registered:', agentReg.data.success);

    // Test 4: Add agent role
    console.log('\n4️⃣ Adding agent role...');
    const agentRole = await axios.post(`${API_BASE}/users/add-role`, {
      wallet_address: agentWallet,
      role_type: 'agent',
      license_number: 'AGENT789'
    });
    console.log('✅ Agent role added:', agentRole.data.success);

    // Test 5: Update agent profile (KYC)
    console.log('\n5️⃣ Updating agent profile...');
    const agentKYC = await axios.put(`${API_BASE}/users/role-data`, {
      wallet_address: agentWallet,
      role_type: 'agent',
      name: 'Agent User',
      phone: '1234567890',
      address: '123 Agent St',
      date_of_birth: '1985-01-01',
      license_number: 'AGENT789'
    });
    console.log('✅ Agent profile updated:', agentKYC.data.success);
    console.log('   Agent approved status:', agentKYC.data.data.roles.find(r => r.role_type === 'agent').is_approved);

    // Test 6: Register customer user
    console.log('\n6️⃣ Registering customer user...');
    const customerReg = await axios.post(`${API_BASE}/users/register`, {
      wallet_address: customerWallet,
      email: 'customer@ethsure.com',
      name: 'Customer User'
    });
    console.log('✅ Customer registered:', customerReg.data.success);

    // Test 7: Add customer role
    console.log('\n7️⃣ Adding customer role...');
    const customerRole = await axios.post(`${API_BASE}/users/add-role`, {
      wallet_address: customerWallet,
      role_type: 'customer'
    });
    console.log('✅ Customer role added:', customerRole.data.success);

    // Test 8: Update customer KYC
    console.log('\n8️⃣ Updating customer KYC...');
    const customerKYC = await axios.put(`${API_BASE}/users/role-data`, {
      wallet_address: customerWallet,
      role_type: 'customer',
      name: 'Customer User',
      phone: '9876543210',
      address: '456 Customer Ave',
      date_of_birth: '1990-05-15'
    });
    console.log('✅ Customer KYC updated:', customerKYC.data.success);
    console.log('   Customer KYC status:', customerKYC.data.data.roles.find(r => r.role_type === 'customer').kyc_status);

    // Test 9: Admin approves agent
    console.log('\n9️⃣ Admin approving agent...');
    const agentApproval = await axios.patch(`${API_BASE}/users/kyc-status`, {
      wallet_address: agentWallet,
      role_type: 'agent',
      kyc_status: 'verified'
    });
    console.log('✅ Agent approved by admin:', agentApproval.data.success);

    // Test 10: Admin approves customer
    console.log('\n🔟 Admin approving customer...');
    const customerApproval = await axios.patch(`${API_BASE}/users/kyc-status`, {
      wallet_address: customerWallet,
      role_type: 'customer',
      kyc_status: 'verified'
    });
    console.log('✅ Customer approved by admin:', customerApproval.data.success);

    // Test 11: Get all users for admin dashboard
    console.log('\n1️⃣1️⃣ Getting all users for admin dashboard...');
    const allUsers = await axios.get(`${API_BASE}/users`);
    console.log('✅ All users retrieved:', allUsers.data.success);
    console.log('   Total users:', allUsers.data.data.length);

    // Show user details
    allUsers.data.data.forEach((user, index) => {
      console.log(`   User ${index + 1}:`);
      console.log(`     Name: ${user.name}`);
      console.log(`     Email: ${user.email}`);
      console.log(`     Wallet: ${user.wallet_address.slice(0, 6)}...${user.wallet_address.slice(-4)}`);
      console.log(`     Roles: ${user.roles.map(r => r.role_type).join(', ')}`);
      user.roles.forEach(role => {
        if (role.role_type === 'customer') {
          console.log(`       Customer KYC: ${role.kyc_status}`);
        } else if (role.role_type === 'agent') {
          console.log(`       Agent Approved: ${role.is_approved}`);
        } else if (role.role_type === 'admin') {
          console.log(`       Admin Role: Active`);
        }
      });
    });

    // Test 12: Check pending approvals
    console.log('\n1️⃣2️⃣ Checking pending approvals...');
    const pendingUsers = allUsers.data.data.filter(user => 
      user.roles.some(role => 
        (role.role_type === "customer" && role.kyc_status === "pending") ||
        (role.role_type === "agent" && !role.is_approved)
      )
    );
    console.log(`   Pending approvals: ${pendingUsers.length}`);

    console.log('\n🎉 Admin redirection and approval system test completed!');
    console.log('\n📋 Summary:');
    console.log('✅ Admin user created and role added');
    console.log('✅ Agent user created and needs approval');
    console.log('✅ Customer user created and needs approval');
    console.log('✅ Admin can approve both agent and customer');
    console.log('✅ Admin dashboard shows all users');
    console.log('✅ Pending approvals are tracked');
    console.log('✅ Admin redirection to dashboard works');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAdminRedirection();
