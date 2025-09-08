import React, { useRef, useState } from "react";
import AgentLayout from "../../layouts/AgentLayout";


const AgentDashboard = () => {
  const customersRef = useRef(null);
  const claimsRef = useRef(null);
  const userManagementRef = useRef(null);

  const [activeMenu, setActiveMenu] = useState("");
  const [profileImage, setProfileImage] = useState("/default-avatar.jpg");

  const agent = {
    name: "Rajesh Sharma",
    wallet: "0xA12B34C56D78E90F1234567890ABCDEF12345678",
    verified: true,
    customers: [
      { id: 1, name: "Alice", policy: "Health Insurance" },
      { id: 2, name: "Bob", policy: "Auto Insurance" },
      { id: 3, name: "Charlie", policy: "Property Insurance" },
    ],
  };

  return (
    <AgentLayout
      agent={agent}
      profileImage={profileImage}
      setProfileImage={setProfileImage}
      activeMenu={activeMenu}
      setActiveMenu={setActiveMenu}
      scrollRefs={{ customers: customersRef, claims: claimsRef, users: userManagementRef }}
    >
      {/* Dashboard-specific content here */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome to EthSure</h1>
        <p className="text-gray-400 mt-1">
          Manage your claims, customers, and activities here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center shadow hover:scale-105 transition">
          <h3 className="text-gray-300 text-lg mb-2">Assigned Claims</h3>
          <p className="text-2xl font-bold text-blue-400">5</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center shadow hover:scale-105 transition">
          <h3 className="text-gray-300 text-lg mb-2">Pending Reviews</h3>
          <p className="text-2xl font-bold text-yellow-400">2</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center shadow hover:scale-105 transition">
          <h3 className="text-gray-300 text-lg mb-2">Resolved Claims</h3>
          <p className="text-2xl font-bold text-green-400">12</p>
        </div>
      </div>

      {/* Customers */}
      <div ref={customersRef} className="bg-gray-800/50 border border-gray-700 rounded-lg shadow mb-10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">My Customers</h2>
        <ul className="space-y-4">
          {agent.customers.map((c) => (
            <li
              key={c.id}
              className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition"
            >
              <div>
                <p className="text-white font-medium">{c.name}</p>
                <p className="text-gray-400 text-sm">{c.policy}</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                View Policy
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Claims */}
      <div ref={claimsRef} className="bg-gray-800/50 border border-gray-700 rounded-lg shadow mb-10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Claims to Review</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 text-gray-400">Claim ID</th>
                <th className="py-2 px-4 text-gray-400">User</th>
                <th className="py-2 px-4 text-gray-400">Amount</th>
                <th className="py-2 px-4 text-gray-400">Status</th>
                <th className="py-2 px-4 text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-700/40">
                <td className="py-2 px-4 text-white">#12345</td>
                <td className="py-2 px-4 text-white">Alice</td>
                <td className="py-2 px-4 text-blue-400">Ξ0.25</td>
                <td className="py-2 px-4 text-yellow-400">Pending</td>
                <td className="py-2 px-4">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded">
                    Approve
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-700/40">
                <td className="py-2 px-4 text-white">#12346</td>
                <td className="py-2 px-4 text-white">Bob</td>
                <td className="py-2 px-4 text-blue-400">Ξ0.1</td>
                <td className="py-2 px-4 text-yellow-400">Pending</td>
                <td className="py-2 px-4">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded">
                    Approve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* User Management */}
      <div ref={userManagementRef} className="bg-gray-800/50 border border-gray-700 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-white mb-4">User Management</h2>
        <ul className="space-y-2">
          <li className="flex justify-between items-center hover:bg-gray-700/40 p-2 rounded">
            <span className="text-white">Alice</span>
            <button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">
              Block
            </button>
          </li>
          <li className="flex justify-between items-center hover:bg-gray-700/40 p-2 rounded">
            <span className="text-white">Bob</span>
            <button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">
              Block
            </button>
          </li>
        </ul>
      </div>
    </AgentLayout>
  );
};

export default AgentDashboard;
