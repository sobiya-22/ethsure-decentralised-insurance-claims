import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useWalletAddress } from "@/hooks/useWalletAddress";
import { useWeb3AuthUser } from "@web3auth/modal/react";
import { userAPI } from "@/services/api";

// ✅ Centralized helper with KYC check
const redirectToDashboard = (role, navigate) => {
  if (!role) return;

  switch (role.role_type) {
    case "customer":
      if (role.kyc_status === "verified") {
        navigate("/customer-dashboard");
      } else {
        navigate("/customer-kyc");
      }
      break;

    case "agent":
      if (role.is_approved) {
        navigate("/agent-dashboard");
      } else {
        navigate("/agent-kyc");
      }
      break;

    case "admin":
      navigate("/admin-dashboard");
      break;

    default:
      console.warn("Unknown role type:", role.role_type);
  }
};

const RoleSelect = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const { walletAddress, isConnecting } = useWalletAddress();
  const { userInfo } = useWeb3AuthUser();

  // Fetch user data once walletAddress is available
  useEffect(() => {
    if (walletAddress) checkExistingUser();
  }, [walletAddress]);

  // Auto-redirect existing users
  useEffect(() => {
    if (user && user.roles?.length > 0) {
      const roleToRedirect = user.roles.find((r) => {
        return r.role_type === "customer" || r.role_type === "agent" || r.role_type === "admin";
      });
      if (roleToRedirect) redirectToDashboard(roleToRedirect, navigate);
    }
  }, [user, navigate]);

  const checkExistingUser = async () => {
    if (!walletAddress) return;
    try {
      const response = await userAPI.getProfile(walletAddress);
      if (response.data?.success && response.data.data) {
        const userData = response.data.data;
        setUser(userData);
        setIsNewUser(userData.is_new_user || false);
      } else {
        setIsNewUser(true);
      }
    } catch (error) {
      console.log("User not found, will be created on role selection");
      setIsNewUser(true);
    }
  };

  const handleConfirm = async () => {
    if (!selectedRole || !walletAddress) return;

    setLoading(true);
    try {
      let userData = user;

      // Register new user if needed
      if (isNewUser || !userData) {
        const userEmail = userInfo?.email || "temp@example.com";
        const userName = userInfo?.name || userInfo?.email || "User";

        const response = await userAPI.registerOrGet({
          wallet_address: walletAddress,
          email: userEmail,
          name: userName,
        });

        userData = response.data.data;
        setUser(userData);
        setIsNewUser(false);
      }

      // Check if user already has this role
      const existingRole = userData.roles?.find((r) => r.role_type === selectedRole);
      if (existingRole) {
        localStorage.setItem("userRole", selectedRole);
        localStorage.setItem("userEmail", userData.email);
        redirectToDashboard(existingRole, navigate);
        return;
      }

      // Add new role
      const addRoleResponse = await userAPI.addRole({
        wallet_address: walletAddress,
        role_type: selectedRole,
      });

      const updatedUser = addRoleResponse.data.data;
      setUser(updatedUser);

      localStorage.setItem("userRole", selectedRole);
      localStorage.setItem("userEmail", updatedUser.email);

      const newRole = updatedUser.roles.find((r) => r.role_type === selectedRole);
      if (newRole) redirectToDashboard(newRole, navigate);
    } catch (error) {
      console.error("Error handling role selection:", error);
      alert("Failed to process role selection. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white w-full">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          {isNewUser ? "Select Your" : "Add a New"}{" "}
          <span className="bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent">
            Role
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          {isNewUser
            ? "Choose your role to continue with the EthSure platform."
            : "You can add additional roles to your account or select an existing role."}
        </p>

        {user && user.roles?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Your Current Roles</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {user.roles.map((role, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 border border-blue-500 rounded-lg px-4 py-2"
                >
                  <span className="text-blue-400 font-medium capitalize">{role.role_type}</span>
                  {role.role_type === "customer" && (
                    <span
                      className={`ml-2 text-sm ${
                        role.kyc_status === "verified" ? "text-green-400" : "text-yellow-400"
                      }`}
                    >
                      ({role.kyc_status})
                    </span>
                  )}
                  {role.role_type === "agent" && (
                    <span
                      className={`ml-2 text-sm ${
                        role.is_approved ? "text-green-400" : "text-yellow-400"
                      }`}
                    >
                      ({role.is_approved ? "approved" : "pending"})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["agent", "customer", "admin"].map((role) => (
            <Card
              key={role}
              className={`bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer ${
                selectedRole === role ? "ring-2 ring-blue-500" : ""
              } ${user?.roles?.find((r) => r.role_type === role) ? "border-green-500" : ""}`}
              onClick={() => setSelectedRole(role)}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                  {user?.roles?.find((r) => r.role_type === role) && (
                    <span className="text-green-400 text-sm">✓</span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  {role === "agent" &&
                    "Assist customers with insurance policies, verify claims, and act as a trusted intermediary."}
                  {role === "customer" &&
                    "Submit insurance claims, track claim status, and receive payouts quickly."}
                  {role === "admin" && "Oversee the entire system, manage users, and ensure compliance."}
                </CardDescription>
                {user?.roles?.find((r) => r.role_type === role) && (
                  <p className="text-green-400 text-sm mt-2">You already have this role</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Button
            size="lg"
            disabled={!selectedRole || loading || !walletAddress}
            onClick={handleConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-10 py-4"
          >
            {loading
              ? "Processing..."
              : user?.roles?.find((r) => r.role_type === selectedRole)
              ? "Continue with Role"
              : "Add Role"}
          </Button>
          {isConnecting && (
            <p className="text-yellow-400 text-sm mt-2">Connecting to wallet... Please wait...</p>
          )}
          {!walletAddress && !isConnecting && (
            <p className="text-red-400 text-sm mt-2">
              Wallet connection failed. Please try logging in again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
