import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, FileText, CreditCard, AlertCircle, CheckCircle, Users, Star, ArrowRight } from "lucide-react";

import { getApprovedAgents } from "@/services/agentAPI";
import { getCustomerPolicies } from "@/services/policyAPI";
import { userStore } from "@/context/userContext";
import { useNavigate } from "react-router-dom";
const CustomerOverview = () => {
  const user = userStore((state) => state.user);
  const kycStatus = user?.customer?.kyc_status;
  console.log("kyc: ", kycStatus)
  const navigate = useNavigate();

  const [showAgents, setShowAgents] = useState(false);
  const [agents, setAgents] = useState([]);
  const [loadingAgents, setLoadingAgents] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [myPolicies, setMyPolicies] = useState([]);
  const [policyRequested, setPolicyRequested] = useState(false);



  const handleKYC = () => {
    console.log('KYC Status:', kycStatus);
    navigate('/customer/kyc');
  };
  // Fetch customer policies
  // useEffect(() => {
  //   const fetchPolicies = async () => {
  //     // if (!customer?.wallet_address) return;
  //     // try {
  //     //   const response = await getCustomerPolicies(customer.wallet_address);
  //     //   setMyPolicies(response.data?.policies || []);
  //     // } catch (err) {
  //     //   console.error("Error fetching policies:", err);
  //     // }
  //   };
  //   fetchPolicies();
  // });


  // // Fetch approved agents
  // const handleGetPolicy = async () => {
  // setLoadingAgents(true);
  // try {
  //   const response = await getApprovedAgents();
  //   setAgents(response.data?.data || []);
  //   setShowAgents(true);
  // } catch (err) {
  //   console.error("Error fetching agents:", err);
  //   setAgents([]);
  //   setShowAgents(true);
  // } finally {
  //   setLoadingAgents(false);
  // }
  // };

  // Dashboard stats
  const stats = [
    { title: "Active Policies", value: 0, icon: Shield, change: "Coverage Active", color: "from-emerald-500/20 to-emerald-400/20", iconColor: "text-emerald-400" },
    { title: "Total Claims", value: 0, icon: FileText, change: "Claims Submitted", color: "from-blue-500/20 to-blue-400/20", iconColor: "text-blue-400" },
    { title: "Premium Due", value: "₹2,500", icon: CreditCard, change: "Monthly Payment", color: "from-amber-500/20 to-amber-400/20", iconColor: "text-amber-400" },
  ];

  // const getAgentInitials = (agent) => (agent.agent_name || agent.name || "A").split(" ").map(n => n[0]).join("").toUpperCase();
  // const getAgentName = (agent, index) => agent.agent_name || agent.name || `Agent ${index + 1}`;
  // const getAgentEmail = (agent) => agent.agent_email || agent.email || "Verified Agent";

  return (
    <div className="text-white w-full relative bg-transparent">
      <div className="space-y-6 px-4 sm:px-6 lg:px-8 pt-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold leading-tight">
                Customer <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-gray-300">
                Welcome back, {user?.customer?.customer_name || "Customer"}!
              </p>
            </div>
          </div>
          <div className={`flex items-center px-3 py-1.5 rounded-full glass border border-cyan-500/30 ${kycStatus === "pending" ? "text-red-500" : "text-green-500"}`}>
            {kycStatus}
          </div>
        </div>

        {/* KYC Prompt */}
        {kycStatus === "pending" && (
          <Card className="glass border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
            <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-cyan-400">Complete Your KYC</h3>
                </div>
                <p className="text-cyan-100">Complete verification to access advanced features and higher claim limits.</p>
              </div>
              <Button onClick={handleKYC}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all cursor-pointer">
                Complete KYC
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="glass hover:border-white/30 transition-all duration-300 hover:scale-105">
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


        {policyRequested && (
          <Card className="glass border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-green-500/10">
            <CardContent className="text-center p-6">
              <div className="flex justify-center items-center gap-3 mb-3">
                <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-400">Policy Request Submitted!</h3>
              </div>
              <p className="text-gray-300 mb-2">Our agent will reach out within 24–48 hours.</p>
            </CardContent>
          </Card>
        )}


        {myPolicies.length === 0 && (
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
                <p className="text-gray-300 text-sm">You don’t have any active insurance policies.</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 px-8 py-3 text-lg">
                Get Endorsement Plan <ArrowRight className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        )}


        {showAgents && (
          <Card className="glass border border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Users className="w-5 h-5" /> Approved Agents ({agents.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {agents.length ? (
                agents.map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
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
                    <Button onClick={() => console.log("Create Policy", agent)} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 px-6 py-2 text-sm font-semibold">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" /> Create Policy
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-8">No approved agents available at the moment.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CustomerOverview;
