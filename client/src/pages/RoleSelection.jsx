import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleConfirm = () => {
    if (!selectedRole) return;
    // Save role in localStorage (or your backend / context)
    localStorage.setItem("userRole", selectedRole);

    // Navigate based on role
     if (selectedRole === "customer") {
      navigate("/signup-customer");
    } else if (selectedRole === "agent") {
    navigate("/signup-agent");
  }else if(selectedRole === "admin") navigate("/admin-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white w-full">
      {/* Navigation */}
      <Navbar />

      {/* Page Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Select Your <span className="bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent">Role</span>
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Choose your role to continue with the EthSure platform.
        </p>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Agent Role */}
          <Card
            className={`bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer ${
              selectedRole === "agent" ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedRole("agent")}
          >
            <CardHeader>
              <CardTitle className="text-white">Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Assist customers with insurance policies, verify claims, and act as a trusted intermediary.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Customer Role */}
          <Card
            className={`bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer ${
              selectedRole === "user" ? "ring-2 ring-green-500" : ""
            }`}
            onClick={() => setSelectedRole("user")}
          >
            <CardHeader>
              <CardTitle className="text-white">User</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Submit insurance claims, track claim status, and receive payouts quickly.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Admin Role */}
          <Card
            className={`bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer ${
              selectedRole === "admin" ? "ring-2 ring-purple-500" : ""
            }`}
            onClick={() => setSelectedRole("admin")}
          >
            <CardHeader>
              <CardTitle className="text-white">Admin</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Oversee the entire system, manage users, and ensure compliance.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Confirm Button */}
        <div className="mt-12">
          <Button
            size="lg"
            disabled={!selectedRole}
            onClick={handleConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-10 py-4"
          >
            Confirm Role
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
