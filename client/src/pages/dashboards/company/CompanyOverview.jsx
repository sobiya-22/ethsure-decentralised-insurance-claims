import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye,Users, FileText, AlertCircle, Wallet, Building2, UserCheck, Award, Clock, CheckCircle } from "lucide-react";
import PolicyDetailsModal from '@/components/PolicyDetailsModal';
import { getStatusColor } from '@/constants/agentConstants';
import { userStore } from '@/context/userContext';
import AgentDetailsModal from "@/components/AgentDetailsModal"
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const CompanyOverview = () => {
  const user = userStore((state) => state.user);
  const [agentRequests, setAgentRequests] = useState([]);
  const [upcomingCustomers, setUpcomingCustomers] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  useEffect(() => {
    const fetchRequestingAgents = async () => {
      const res = await axios.get(`${BASE_URL}/api/agent/all-agents`, {
        params: {
          status: "pending",
        }
      });
      console.log("agents: ", res.data.agents);
      setAgentRequests(res.data.agents);
    }
    fetchRequestingAgents();
  }, [user]);

  useEffect(() => {
    const fetchUpcomingCustomers = async () => {
      const res = await axios.get(`${BASE_URL}/api/policy/all-policies`, {
        params: {
          status: "agentApproved",
        }
      });

      setUpcomingCustomers(res.data.policies);
      console.log("customer policies: ", upcomingCustomers);
    }
    fetchUpcomingCustomers();
  }, [user]);
  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
    setIsModalOpen(true);
  }
  const openAgentDetails = (agent) => {
    setSelectedAgent(agent);
    setIsAgentModalOpen(true);
  }

  const stats = [
    {
      title: "Total Agents",
      value: 0 ,
      icon: Users,
      color: "from-blue-500/20 to-cyan-400/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/30"
    },
    {
      title: "Total Customers",
      value: 0 ,
      icon: UserCheck,
      color: "from-amber-500/20 to-yellow-400/20",
      iconColor: "text-amber-400",
      borderColor: "border-amber-500/30"
    },
    {
      title: "Requesting Review",
      value: upcomingCustomers.length.toString() || 0,
      icon: FileText,
      color: "from-emerald-500/20 to-green-400/20",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/30"
    },
  ];
  return (
    <div className="text-white w-full relative bg-transparent">
      <div className="px-1 xs:px-2 sm:px-4 lg:px-6 pt-6 sm:pt-9">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl glass"><Building2 className="w-8 h-8 text-cyan-400" /></div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                  Company <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="text-xl text-gray-300">Welcome back, {user?.company?.company_name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`backdrop-blur-xl bg-${stat.color}/10 glass shine hover:border-cyan-400/50 transition-all duration-300 group border rounded-2xl ${stat.borderColor}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1.5">
                    <p className="text-white/60 text-xs font-medium uppercase tracking-wide">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} border ${stat.borderColor} transition-all duration-300 shadow-lg`}>
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300 py-3">
            {/* <CardHeader>
              <CardTitle className="text-white">Overview</CardTitle>
            </CardHeader> */}
            <CardContent>
              <Tabs defaultValue="agents" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/5 mb-6">
                  <TabsTrigger
                    value="agents"
                    className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Requesting Agents
                  </TabsTrigger>
                  <TabsTrigger
                    value="customers"
                    className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Upcoming Customers
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="agents">
                  <div className="rounded-lg border border-white/10 overflow-hidden">
                    <div className="max-h-[300px] overflow-y-auto hide-scrollbar">
                      <table className="w-full">
                        <thead className="bg-white/5 sticky top-0 z-10 backdrop-blur-2xl">
                          <tr>
                            <th className="text-left p-4 text-gray-400 font-medium">Agent</th>
                            <th className="text-left p-4 text-gray-400 font-medium">Wallet</th>
                            <th className="text-left p-4 text-gray-400 font-medium">License Number</th>
                            <th className="text-left p-4 text-gray-400 font-medium">Request Date</th>
                            <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {agentRequests.length === 0 ? (
                            <tr>
                              <td colSpan="5" className="p-8 text-center">
                                <div className="flex flex-col items-center gap-3 text-gray-400">
                                  <Award className="w-12 h-12 opacity-50" />
                                  <p className="text-lg font-medium">No Requesting Agents</p>
                                  <p className="text-sm">Agent requests will appear here when submitted</p>
                                </div>
                              </td>
                            </tr>
                          ) :(
                          agentRequests.map((agent) => (
                            <tr
                              key={agent._id}
                              className="border-t border-white/5 hover:bg-white/5 transition-colors"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={agent.profile_photo_url}
                                    alt={agent.agent_name}
                                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                                  />
                                  <div>
                                    <div className="text-white font-medium">{agent.agent_name}</div>
                                    <div className="text-gray-400 text-sm">{agent.agent_email}</div>
                                    <div className="text-gray-400 text-xs">{agent.agent_phone}</div>
                                  </div>
                                </div>
                              </td>

                              <td className="p-4 text-white">
                                {agent.wallet_address.slice(0, 20)}...
                              </td>

                              <td className="p-4 text-white">
                                {agent.license_number || " N/A"}
                              </td>

                              <td className="p-4 text-white">
                                {new Date(agent.associated_company.request_date).toLocaleString()}
                              </td>

                              <td className="p-4">
                                <Button
                                  size="sm"
                                  onClick={() => openAgentDetails(agent)}
                                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
                                >
                                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                                  View Details
                                </Button>
                              </td>
                            </tr>
                          )))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>


                <TabsContent value="customers">
                  <div className="rounded-lg border border-white/10 overflow-hidden">
                    <div className="max-h-[300px] overflow-y-auto hide-scrollbar">
                      <table className="w-full">
                        <thead className="bg-white/5 sticky top-0 z-10 backdrop-blur-2xl">
                          <tr>
                            <th className="text-left p-4 text-gray-400 font-medium">Customer Name</th>
                            <th className="text-left p-4 text-gray-400 font-medium">Coverage Amount</th>
                            <th className="text-left p-4 text-gray-400 font-medium">Premium</th>
                            <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                            <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {agentRequests.length === 0 ? (
                            <tr>
                              <td colSpan="5" className="p-8 text-center">
                                <div className="flex flex-col items-center gap-3 text-gray-400">
                                  <Users className="w-12 h-12 opacity-50" />
                                  <p className="text-lg font-medium">No Policy requests from customers yet!</p>
                                  <p className="text-sm">Customer Policy requests will appear here when submitted</p>
                                </div>
                              </td>
                            </tr>
                          ) :(
                          upcomingCustomers.map((policy) => (
                            <tr
                              key={policy._id}
                              className="border-t border-white/5 hover:bg-white/5 transition-colors"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={policy?.customer?.profile_photo_url || "/default-avatar.png"}
                                    alt={policy?.customer?.customer_name || "User"}
                                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                                  />
                                  <span className="text-white font-medium">{policy.fullName}</span>
                                </div>
                              </td>

                              <td className="p-4 text-white">
                                ₹ {policy.coverage_amount.toLocaleString()}
                              </td>

                              <td className="p-4 text-gray-300">
                                ₹ {policy.premium_amount.toLocaleString()} / {policy.premium_frequency}
                              </td>

                              <td className="p-4">
                                <Badge className={getStatusColor(policy.status)}>
                                  {policy.status}
                                </Badge>
                              </td>

                              <td className="p-4">
                                <Button
                                  size="sm"
                                  onClick={() => handlePolicyClick(policy)}
                                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
                                >
                                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                                  View Details
                                </Button>
                              </td>
                            </tr>
                          )))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      <PolicyDetailsModal
        policy={selectedPolicy}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <AgentDetailsModal
        agent={selectedAgent}
        isOpen={isAgentModalOpen}
        onClose={() => setIsAgentModalOpen(false)}
      />
    </div>
  );
};

export default CompanyOverview;