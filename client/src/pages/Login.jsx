import React from "react";
import { useWeb3Auth } from "@web3auth/modal/react";
import { registerOrGetUser } from "../api/userAPI";

const Login = () => {
  const { user, login } = useWeb3Auth();

  const handleLogin = async () => {
    try {
      // Open Web3Auth login popup
      await login();

      // Get ID token (JWT)
      const idToken = user?.idToken;
      if (!idToken) {
        console.error("No ID token found");
        return;
      }

      // Save ID token to localStorage (used by axios interceptor)
      localStorage.setItem("idToken", idToken);

      // Send user details to backend
      const response = await registerOrGetUser({
        wallet_address: user?.walletAddress,
        user_did: user?.sub,
        name: user?.name,
        email: user?.email,
      });

      console.log("Backend response:", response);

      // Handle navigation
      if (response.success) {
        if (response.needsRole) {
          window.location.href = "/role-select";
        } else {
          // Role based routing
          if (response.role === "customer") {
            if (response.kyc_status === "pending") {
              window.location.href = "/customer/kyc";
            } else {
              window.location.href = "/customer/dashboard";
            }
          } else if (response.role === "agent") {
            if (response.kyc_status === "verified") {
              window.location.href = "/agent/dashboard";
            } else {
              window.location.href = "/agent/kyc";
            }
          } else if (response.role === "admin") {
            window.location.href = "/admin/dashboard";
          } else {
            window.location.href = "/dashboard";
          }
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={handleLogin}
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Login with Web3Auth
      </button>
    </div>
  );
};

export default Login;
