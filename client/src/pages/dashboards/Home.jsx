import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const hasPolicy = false; // example static
  const walletAddress = "0xAbc...123"; // Add your wallet address here

  return (
    <div className="text-white">
      {/* Welcome Box */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-white-400 mb-2">
          Welcome to EthSure!
        </h1>
        <p className="text-green-300 mb-4">
          Hi there, Secure Your Future Today!
        </p>
        <p className="text-gray-400 font-mono">
          Wallet: {walletAddress}
        </p>
      </div>

      {/* Policy Section */}
      <div className="bg-gray-700 rounded-lg p-6 shadow-md">
        {hasPolicy ? (
          <p className="text-white">You already have a policy.</p>
        ) : (
          <>
            <p className="text-white mb-4">You have not bought any policy yet.</p>
            <button
              onClick={() => navigate("/customer-dashboard/policy")}
              className="bg-blue-400 text-black px-4 py-2 rounded-md hover:bg-yellow-300"
            >
              View Policy
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
