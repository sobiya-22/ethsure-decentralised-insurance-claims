import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getAgent } from "@/services/agentAPI";
import { useWalletAddress } from "@/hooks/useWalletAddress";

const AgentDashboard = () => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showKYCPopup, setShowKYCPopup] = useState(false);
  const navigate = useNavigate();
  const { walletAddress, isConnecting } = useWalletAddress();

  useEffect(() => {
    const fetchAgentData = async () => {
      if (isConnecting && !walletAddress) {
        navigate("/");
        return;
      }
      try {
        const response = await getAgent(walletAddress);
        const data = response.data;
        console.log("Agent Data from API:", data);
        setAgent(data);

        const isProfileIncomplete =
          !data?.agent_name || !data?.agent_phone || !data?.license_number;

        if (isProfileIncomplete && data?.kyc_status !== "verified") {
          setShowKYCPopup(true);
        } else {
          setShowKYCPopup(false); 
        }
      } catch (err) {
        console.error("Error fetching agent:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAgentData();
  }, [walletAddress, navigate]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Agent Dashboard</h1>

        {/* Case 1: No KYC submitted */}
        {showKYCPopup && (
          <Card className="p-6 border border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100 shadow-md rounded-2xl">
            <CardHeader className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-200 border border-yellow-500 mb-3">
                📝
              </div>
              <CardTitle className="text-xl font-semibold text-yellow-700">
                KYC Required
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-700">
              <p className="mb-4">
                Please complete your KYC to continue using the platform.
              </p>
              <Button className="mt-3" onClick={() => navigate("/agent-kyc")}>
                Complete KYC
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Case 2: KYC done but waiting for admin approval */}
        {!showKYCPopup && agent && agent.kyc_status === "verified" && !agent.is_approved && (
          <Card className="p-6 border border-blue-400 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md rounded-2xl">
            <CardHeader className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-200 border border-blue-500 mb-3">
                ⏳
              </div>
              <CardTitle className="text-xl font-semibold text-blue-700">
                Waiting for Admin Approval
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-700">
              <p className="mb-2">
                ✅ Your KYC has been{" "}
                <span className="font-semibold text-green-600">verified</span>.
              </p>
              <p className="mb-4">
                ⏳ Now your account is under review by the admin team.
              </p>
              <p className="text-sm text-gray-500">
                You’ll be notified once approved. Thank you for your patience!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Case 3: Approved agent */}
        {agent?.is_approved && (
          <Card className="p-6 border border-green-400 bg-gradient-to-r from-green-50 to-green-100 shadow-md rounded-2xl">
            <CardHeader className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-200 border border-green-500 mb-3">
                🎉
              </div>
              <CardTitle className="text-xl font-semibold text-green-700">
                Welcome, {agent.agent_name || "Agent"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-700">
              <p className="mb-2">
                🎯 You are now <span className="font-semibold">approved</span>!
              </p>
              <p className="text-sm">
                Start handling claims, managing policies, and serving customers.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default AgentDashboard;
