import React from 'react';

const CustomerDashboard = () => (
  <div className="min-h-screen flex bg-gray-50">
    <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-8">User Menu</h2>
      <ul className="space-y-4">
        <li><a href="#" className="text-gray-700 hover:text-blue-600">My Policies</a></li>
        <li><a href="#" className="text-gray-700 hover:text-blue-600">Claims</a></li>
        <li><a href="#" className="text-gray-700 hover:text-blue-600">Submit Claim</a></li>
      </ul>
    </aside>
    <main className="flex-1 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, Policyholder</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">Logout</button>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Active Policies</h3>
          <p className="text-2xl font-bold text-blue-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Open Claims</h3>
          <p className="text-2xl font-bold text-yellow-500">1</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Total Paid</h3>
          <p className="text-2xl font-bold text-green-600">Ξ0.75</p>
        </div>
      </section>
      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Claims</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4">Claim ID</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">#12345</td>
                <td className="py-2 px-4 text-yellow-600">Pending</td>
                <td className="py-2 px-4">Ξ0.25</td>
                <td className="py-2 px-4">2024-07-25</td>
              </tr>
              <tr>
                <td className="py-2 px-4">#12344</td>
                <td className="py-2 px-4 text-green-600">Approved</td>
                <td className="py-2 px-4">Ξ0.5</td>
                <td className="py-2 px-4">2024-06-10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Submit New Claim</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Policy Number" className="w-full border rounded px-3 py-2" />
          <input type="number" placeholder="Amount (ETH)" className="w-full border rounded px-3 py-2" />
          <textarea placeholder="Description" className="w-full border rounded px-3 py-2" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">Submit Claim</button>
        </form>
      </section>
    </main>
  </div>
);

export default CustomerDashboard; 