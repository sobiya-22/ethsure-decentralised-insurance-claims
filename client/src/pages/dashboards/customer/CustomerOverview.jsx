import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield, FileText, CreditCard, AlertCircle, CheckCircle,
  Clock, Users, Star, ArrowRight
} from "lucide-react";
import KycNew from "@/components/KycNew";
import { InlineLoader } from "@/components/ui/Loader";
import { getApprovedAgents } from "@/services/agentAPI";
import { getCustomerPolicies } from "@/services/policyAPI";

const CustomerOverview = forwardRef(({ customer = {}, kycStatus = "pending", onCreatePolicy, onPolicySuccess }, ref) => {
  const [showAgents, setShowAgents] = useState(false);
  const [agents, setAgents] = useState([]);
  const [loadingAgents, setLoadingAgents] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [myPolicies, setMyPolicies] = useState([]);
  const [hasPolicyRequest, setHasPolicyRequest] = useState(false);

  // Fetch customer policies
  useEffect(() => {
    const fetchPolicies = async () => {
      if (!customer?.wallet_address) return;
      try {
        const response = await getCustomerPolicies(customer.wallet_address);
        setMyPolicies(response.data?.policies || []);
      } catch (err) {
        console.error("Error fetching policies:", err);
      }
    };

    fetchPolicies();
  }, [customer]);

  // Handle creating a policy
  const handleCreatePolicy = (agent) => {
    console.log("Create Policy clicked for agent:", agent);
    onCreatePolicy?.(agent);
  };

  // Handle policy success from child
  const handlePolicySuccess = (policyData) => {
    setHasPolicyRequest(true);
    onPolicySuccess?.(policyData);
  };

  useImperativeHandle(ref, () => ({ handlePolicySuccess }));

  // Fetch verified agents
  const handleGetPolicy = async () => {
    setLoadingAgents(true);
    try {
      const response = await getApprovedAgents();
      setAgents(response.data?.data || []);
      setShowAgents(true);
    } catch (error) {
      console.error("Error fetching approved agents:", error);
      setAgents([]);
      setShowAgents(true);
    } finally {
      setLoadingAgents(false);
    }
  };

  // Dashboard statistics
  const stats = [
    {
      title: "Active Policies",
      value: customer?.activePolicies || 0,
      icon: Shield,
      change: "Coverage Active",
      color: "from-emerald-500/20 to-emerald-400/20",
      iconColor: "text-emerald-400",
    },
    {
      title: "Total Claims",
      value: customer?.totalClaims || 0,
      icon: FileText,
      change: "Claims Submitted",
      color: "from-blue-500/20 to-blue-400/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Premium Due",
      value: "₹2,500",
      icon: CreditCard,
      change: "Monthly Payment",
      color: "from-amber-500/20 to-amber-400/20",
      iconColor: "text-amber-400",
    },
  ];

  // Utility functions
  const getAgentInitials = (agent) => {
    const name = agent.agent_name || agent.name;
    return name ? name.split(" ").map((n) => n[0]).join("").toUpperCase() : "A";
  };

  const getAgentName = (agent, index) => agent.agent_name || agent.name || `Agent ${index + 1}`;
  const getAgentEmail = (agent) => agent.agent_email || agent.email || "Verified Agent";

  return (
    <div className="text-white w-full relative bg-transparent">
      {showKYC ? (
        <KycNew role="customer" onClose={() => setShowKYC(false)} />
      ) : (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 pt-16">
          {/* Header */}
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg glass">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold leading-tight">
                  Customer <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="text-gray-300">
                  Welcome back, {customer?.customer_name || "Customer"}!
                </p>
              </div>
            </div>
            <div className="flex items-center px-3 py-1.5 rounded-full glass border border-cyan-500/30">
              <span
                className={`text-sm font-medium ${
                  kycStatus === "pending"
                    ? "text-red-500"
                    : kycStatus === "verified"
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              >
                {kycStatus}
              </span>
            </div>
          </div>

          {/* KYC Prompt */}
          {kycStatus === "pending" && (
            <Card className="glass border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-lg font-semibold text-cyan-400">Complete Your KYC</h3>
                    </div>
                    <p className="text-cyan-100">
                      Complete your verification to access advanced features and higher claim limits.
                    </p>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all"
                    onClick={() => setShowKYC(true)}
                  >
                    Complete KYC
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <Card
                key={i}
                className="glass hover:border-white/30 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                      <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
                    </div>
                    <span className="text-xs text-gray-400">{stat.change}</span>
                  </div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Policy Request Confirmation */}
          {hasPolicyRequest && (
            <Card className="glass border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-green-500/10">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center items-center gap-3 mb-3">
                  <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-400">Policy Request Submitted!</h3>
                </div>
                <p className="text-gray-300 mb-2">
                  Our agent will reach out to you soon. Expect contact within 24–48 hours.
                </p>
              </CardContent>
            </Card>
          )}

          {/* No Policy Section */}
          {Array.isArray(myPolicies) && myPolicies.length === 0 && (
            <Card className="glass hover:border-green-400/50 transition-all hover:scale-[1.01]">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Insurance Endorsement Plans
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-center">
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-blue-400 mb-1">No Policy Yet</h3>
                  <p className="text-gray-300 text-sm">
                    You don’t have any active insurance policies. Get started with our comprehensive plans.
                  </p>
                </div>
                <Button
                  onClick={handleGetPolicy}
                  disabled={loadingAgents}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-2 px-8 py-3 text-lg"
                >
                  {loadingAgents ? <InlineLoader /> : <>Get Endorsement Plan <ArrowRight className="w-5 h-5" /></>}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Approved Agents */}
          {showAgents && (
            <Card className="glass border border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Users className="w-5 h-5" /> Approved Agents ({agents.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {agents.length > 0 ? (
                  agents.map((agent, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{getAgentInitials(agent)}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{getAgentName(agent, index)}</p>
                          <p className="text-gray-400 text-sm">{getAgentEmail(agent)}</p>
                          <p className="text-gray-500 text-xs">Wallet: {agent.wallet_address}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleCreatePolicy(agent)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 px-6 py-2 text-sm font-semibold"
                      >
                        <Star className="w-4 h-4 text-yellow-400 fill-current" /> Create Policy
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-400">No approved agents available at the moment.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
});

export default CustomerOverview;
