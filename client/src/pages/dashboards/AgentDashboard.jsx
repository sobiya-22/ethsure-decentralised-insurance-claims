import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AgentDashboard = () => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showKYCPopup, setShowKYCPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await fetch(`http://localhost:5000/api/users/${email}`);
        const data = await response.json();
        setAgent(data);

        const agentRole = data.roles?.find((r) => r.role_type === "agent");

        const isProfileIncomplete =
          !data?.name || !data?.phone || !agentRole?.license_number;

        if (isProfileIncomplete && !agentRole?.is_approved) {
          setShowKYCPopup(true);
        }
      } catch (err) {
        console.error("Error fetching agent:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgent();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  const agentRole = agent?.roles?.find((r) => r.role_type === "agent");

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

        {!showKYCPopup && agentRole && !agentRole.is_approved && (
          <Card className="p-4 bg-blue-50 border border-blue-400">
            <CardHeader>
              <CardTitle>Approval Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your KYC is submitted. Waiting for admin approval.</p>
            </CardContent>
          </Card>
        )}

        {agentRole?.is_approved && (
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
