import React from 'react';

const CompanyDashboard = () => (
  <div className="min-h-screen flex bg-gray-50">
    <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-8">Company Menu</h2>
      <ul className="space-y-4">
        <li><a href="#" className="text-gray-700 hover:text-blue-600">Policies</a></li>
        <li><a href="#" className="text-gray-700 hover:text-blue-600">Claims Analytics</a></li>
        <li><a href="#" className="text-gray-700 hover:text-blue-600">Agent Management</a></li>
      </ul>
    </aside>
    <main className="flex-1 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, Insurance Company</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">Logout</button>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Total Policies</h3>
          <p className="text-2xl font-bold text-blue-600">120</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Active Agents</h3>
          <p className="text-2xl font-bold text-yellow-500">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Total Claims</h3>
          <p className="text-2xl font-bold text-green-600">45</p>
        </div>
      </section>
      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Claims Analytics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4">Month</th>
                <th className="py-2 px-4">Claims</th>
                <th className="py-2 px-4">Paid (ETH)</th>
                <th className="py-2 px-4">Rejected</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">July</td>
                <td className="py-2 px-4">10</td>
                <td className="py-2 px-4">Ξ2.5</td>
                <td className="py-2 px-4">1</td>
              </tr>
              <tr>
                <td className="py-2 px-4">June</td>
                <td className="py-2 px-4">15</td>
                <td className="py-2 px-4">Ξ3.1</td>
                <td className="py-2 px-4">2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Agent Management</h2>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>Agent Smith</span>
            <button className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
          </li>
          <li className="flex justify-between items-center">
            <span>Agent Doe</span>
            <button className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
          </li>
        </ul>
      </section>
    </main>
  </div>
);

export default CompanyDashboard; 