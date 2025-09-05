import React from 'react';

const AgentDashboard = () => (
  <div className="min-h-screen flex bg-gray-50">
    <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-8">Agent Menu</h2>
      <ul className="space-y-4">
        <li><a href="#" className="text-gray-700 hover:text-blue-600">Assigned Claims</a></li>
        <li><a href="#" className="text-gray-700 hover:text-blue-600">Review Claims</a></li>
        <li><a href="#" className="text-gray-700 hover:text-blue-600">User Management</a></li>
      </ul>
    </aside>
    <main className="flex-1 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, Agent</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">Logout</button>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Assigned Claims</h3>
          <p className="text-2xl font-bold text-blue-600">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Pending Reviews</h3>
          <p className="text-2xl font-bold text-yellow-500">2</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Resolved Claims</h3>
          <p className="text-2xl font-bold text-green-600">12</p>
        </div>
      </section>
      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Claims to Review</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4">Claim ID</th>
                <th className="py-2 px-4">User</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">#12345</td>
                <td className="py-2 px-4">Alice</td>
                <td className="py-2 px-4">Ξ0.25</td>
                <td className="py-2 px-4 text-yellow-600">Pending</td>
                <td className="py-2 px-4"><button className="bg-green-500 text-white px-2 py-1 rounded">Approve</button></td>
              </tr>
              <tr>
                <td className="py-2 px-4">#12346</td>
                <td className="py-2 px-4">Bob</td>
                <td className="py-2 px-4">Ξ0.1</td>
                <td className="py-2 px-4 text-yellow-600">Pending</td>
                <td className="py-2 px-4"><button className="bg-green-500 text-white px-2 py-1 rounded">Approve</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">User Management</h2>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>Alice</span>
            <button className="bg-red-500 text-white px-2 py-1 rounded">Block</button>
          </li>
          <li className="flex justify-between items-center">
            <span>Bob</span>
            <button className="bg-red-500 text-white px-2 py-1 rounded">Block</button>
          </li>
        </ul>
      </section>
    </main>
  </div>
);

export default AgentDashboard; 