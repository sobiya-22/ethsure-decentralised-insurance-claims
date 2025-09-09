import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllAgents } from "@/services/agentAPI";
import { getAllCustomers } from "@/services/customerAPI";

const AdminDashboard = () => {
  const [agents, setAgents] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsRes, customersRes] = await Promise.all([
          getAllAgents(),
          getAllCustomers(),
        ]);
        setAgents(agentsRes.data?.data || []);
        setCustomers(customersRes.data?.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAction = async (agentId, action) => {
    try {
      // TODO: Replace with backend API to update agent status
      console.log(`Agent ${agentId} ${action}`);
      setAgents((prev) =>
        prev.filter((agent) => agent._id !== agentId) // remove from list after action
      );
    } catch (err) {
      console.error("Error updating agent:", err);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  // ✅ Separate pending requests from approved agents
  const pendingAgents = agents.filter((a) => a.kyc_status !== "verified");
  const approvedAgents = agents.filter((a) => a.kyc_status === "verified");

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* ====== Overview Cards ====== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">
                {customers.length}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Total Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {agents.length}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">
                {pendingAgents.length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ====== Requested Agents Section ====== */}
        <Card>
          <CardHeader>
            <CardTitle>Requested Agents</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingAgents.length === 0 ? (
              <p>No pending agent requests.</p>
            ) : (
              <div className="space-y-4">
                {pendingAgents.map((agent) => (
                  <div
                    key={agent._id}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{agent.agent_name}</p>
                      <p className="text-sm text-gray-500">
                        Wallet: {agent.wallet_address}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleAction(agent._id, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleAction(agent._id, "rejected")}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboard;
