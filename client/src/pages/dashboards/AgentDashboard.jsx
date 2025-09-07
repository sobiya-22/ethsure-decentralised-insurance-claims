import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getAgent } from "@/services/agentAPI"; // ✅ use agentAPI
import { useWalletAddress } from "@/hooks/useWalletAddress";

const AgentDashboard = () => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showKYCPopup, setShowKYCPopup] = useState(false);
  const navigate = useNavigate();
  const { walletAddress } = useWalletAddress();

  useEffect(() => {
    const fetchAgentData = async () => {
      if (!walletAddress) {
        navigate("/");
        return;
      }
      try {
        const response = await getAgent(walletAddress);
        const data = response.data;
        setAgent(data);

        const isProfileIncomplete =
          !data?.agent_name || !data?.agent_phone || !data?.license_number;

        if (isProfileIncomplete && !data?.is_approved) {
          setShowKYCPopup(true);
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

        {showKYCPopup && (
          <Card className="p-4 bg-yellow-50 border border-yellow-400">
            <CardHeader>
              <CardTitle>KYC Required</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please complete your KYC to access full features.</p>
              <Button className="mt-3" onClick={() => navigate("/agent-kyc")}>
                Complete KYC
              </Button>
            </CardContent>
          </Card>
        )}

        {!showKYCPopup && agent && !agent.is_approved && (
          <Card className="p-4 bg-blue-50 border border-blue-400">
            <CardHeader>
              <CardTitle>Approval Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your KYC is submitted. Waiting for admin approval.</p>
            </CardContent>
          </Card>
        )}

        {agent?.is_approved && (
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Welcome, Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You are approved! Start handling claims and policies.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default AgentDashboard;
