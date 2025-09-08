import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  // Example wallet address
  
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="flex min-h-screen text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-8 text-blue-400">EthSure</h1>

          

          <nav className="flex flex-col space-y-4">
           
            <Link to="policy" className="bg-gray-800 p-2 rounded hover:bg-gray-700">
              Policy Details
            </Link>
            <Link to="agent" className="bg-gray-800 p-2 rounded hover:bg-gray-700">
              Agent Details
            </Link>
            <Link to="claims" className="bg-gray-800 p-2 rounded hover:bg-gray-700">
              Claim Process
            </Link>
            <Link to="upload" className="bg-gray-800 p-2 rounded hover:bg-gray-700">
              Upload Documents
            </Link>
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <Link
          to="/logout"
          className="bg-green-600 p-2 rounded hover:bg-blue-500 mt-4 text-center font-semibold"
        >
          Logout
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Top Navbar */}
        <nav className="flex space-x-6 mb-6 text-lg font-medium">
          <Link to="home" className="hover:text-yellow-400">
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-400">
            About
          </Link>
          <Link to="/contact" className="hover:text-yellow-400">
            Contact
          </Link>
          <Link to="/help" className="hover:text-yellow-400">
            Help
          </Link>
        </nav>

        {/* Verify Banner */}
        {!isVerified && (
          <div className="bg-green-700 text-white p-4 rounded mb-6 flex justify-between items-center">
            <span>⚠ Please verify your account first</span>
            <button
              onClick={() => setIsVerified(true)}
              className="bg-green-400 text-black px-4 py-1 rounded hover:bg-blue-300"
            >
              Verify
            </button>
          </div>
        )}

        {/* Dashboard Pages */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
