import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, User, MapPin, Shield, FileText, CreditCard, AlertCircle, CheckCircle, Users, Star, ArrowRight, ArrowLeft } from "lucide-react";
import axios from "axios";
import { userStore } from "@/context/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CustomerOverview = () => {
  const user = userStore((state) => state.user);
  const kycStatus = user?.customer?.kyc_status;
  const navigate = useNavigate();

  const [showAgents, setShowAgents] = useState(false);
  const [agents, setAgents] = useState([]);
  const [loadingAgents, setLoadingAgents] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPolicy(null);
  };
  // Fetch policies
  useEffect(() => {
    const handleMyPolicies = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/policy/all-policies`, {
          params: { customer_wallet_address: user.wallet_address },
        });

        if (res.data.success) {
          // Map policies to table-friendly format
          const mappedPolicies = res.data.policies.map((p) => ({
            id: p._id,
            name: p.fullName,
            agentName: p.agent_wallet_address,
            premiumAmount: p.premium_amount,
            issueDate: p.issueDate,
            maturityDate: new Date(p.expiryDate).toLocaleDateString(),
            nominee: p.nominee?.nominee_name || "N/A",
          }));

          setPolicies(mappedPolicies);
          console.log("Fetched Policies:", mappedPolicies);
        } else {
          toast.error(res.data.message || "No policies found.");
        }
      } catch (err) {
        console.error("Error fetching policies:", err);
        toast.error("Failed to fetch policies.");
      }
    };

    if (user?.wallet_address) handleMyPolicies();
  }, [user]);


  const PolicyDetailsModal = ({ policy, isOpen, onClose }) => {
    if (!isOpen || !policy) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Policy Details</h2>
                <p className="text-gray-400">Complete policy information</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-xl"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Policy Content */}
          <div className="p-6 space-y-6">
            {/* Policy Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-cyan-400">Policy Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Policy ID:</span>
                    <span className="text-white font-mono">{policy.policy_number || `POL_${policy.id}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${policy.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : policy.status === 'created'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : policy.status === 'claimed'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}>
                      {policy.status || 'created'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Issue Date:</span>
                    <span className="text-white">{policy.issueDate ? new Date(policy.issueDate).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expiry Date:</span>
                    <span className="text-white">{policy.expiryDate ? new Date(policy.expiryDate).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-cyan-400">Financial Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Coverage Amount:</span>
                    <span className="text-white font-semibold">₹{(policy.coverage_amount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Premium Amount:</span>
                    <span className="text-white font-semibold">₹{(policy.premium_amount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Premium Frequency:</span>
                    <span className="text-white capitalize">{policy.premium_frequency || 'annual'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Policy Duration:</span>
                    <span className="text-white">{policy.policy_duration || '10'} years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Details
                </h3>
                <div className="space-y-3 bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Full Name:</span>
                    <span className="text-white">{policy.fullName || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date of Birth:</span>
                    <span className="text-white">{policy.dateOfBirth ? new Date(policy.dateOfBirth).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gender:</span>
                    <span className="text-white">{policy.gender || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Marital Status:</span>
                    <span className="text-white">{policy.maritalStatus || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Contact Information
                </h3>
                <div className="space-y-3 bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white">{policy.email || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white">{policy.phone || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Address:</span>
                    <span className="text-white text-right max-w-[200px]">{policy.address || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Identification & Agent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Identification
                </h3>
                <div className="space-y-3 bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Aadhar Number:</span>
                    <span className="text-white font-mono">{policy.aadharNumber || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">PAN Number:</span>
                    <span className="text-white font-mono">{policy.panNumber || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Annual Income:</span>
                    <span className="text-white">₹{(policy.annualIncome || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Occupation:</span>
                    <span className="text-white">{policy.occupation || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Agent Information
                </h3>
                <div className="space-y-3 bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Agent Name:</span>
                    <span className="text-white">{policy.agentName || 'Unknown Agent'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Agent Wallet:</span>
                    <span className="text-white font-mono text-sm">
                      {policy.agent_wallet_address || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Customer Wallet:</span>
                    <span className="text-white font-mono text-sm">
                      {policy.customer_wallet_address || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-white/10">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Close
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              Download Policy Document
            </Button>
          </div>
        </div>
      </div>
    );
  };
  const handleAgentList = async () => {
    try {
      setLoadingAgents(true);
      const res = await axios.get(`${BASE_URL}/api/agent/all-agents`, {
        params: { status: "approved" },
      });

      if (res.data && res.data.success) {
        setAgents(res.data.data || []);
        setShowAgents(true);
      } else {
        setAgents([]);
        setShowAgents(true);
        console.warn("No agents found or API returned false success");
      }
    } catch (error) {
      toast.error("Failed to fetch agents");
      console.error("Failed to fetch agents:", error);
      setAgents([]);
      setShowAgents(true);
    } finally {
      setLoadingAgents(false);
    }
  };

  const handleKYC = () => {
    navigate("/customer/kyc");
  };

  const handleCreatePolicy = (agent) => {
    setSelectedAgent(agent);
    navigate("/customer/buy-plan", { state: { selectedAgent: agent } });
  };

  // Dashboard stats
  const stats = [
    {
      title: "Active Policies",
      value: policies.length,
      icon: Shield,
      change: "Coverage Active",
      color: "from-emerald-500/20 to-emerald-400/20",
      iconColor: "text-emerald-400",
    },
    {
      title: "Total Claims",
      value: 0,
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

  const renderNoPolicyView = () => (
    <Card className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-white/10 shadow-xl rounded-2xl backdrop-blur-sm hover:border-green-400/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-white text-xl">
          <Shield className="w-6 h-6 text-cyan-400" />
          Insurance Endorsement Plans
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
          <AlertCircle className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-blue-400 mb-2">No Policy Yet</h3>
          <p className="text-gray-300 text-base">
            You don't have any active insurance policies yet.
          </p>
        </div>
        <Button
          onClick={handleAgentList}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center gap-3 px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 font-medium"
        >
          Buy Plan <ArrowRight className="w-5 h-5" />
        </Button>
      </CardContent>
    </Card>
  );

  const renderAgentListView = () => (
    <Card className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-green-500/30 shadow-2xl rounded-2xl backdrop-blur-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6">
        <CardTitle className="flex items-center gap-3 text-green-400 text-xl font-bold">
          <div className="p-2 rounded-xl bg-green-500/20">
            <Users className="w-6 h-6" />
          </div>
          Available Verified Agents
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAgents(false)}
          className="border-white/20 text-white hover:bg-white/10 hover:border-cyan-400/30 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {loadingAgents ? (
          <div className="text-center text-gray-400 py-12">
            <div className="w-10 h-10 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg">Loading verified agents...</p>
          </div>
        ) : agents.length > 0 ? (
          <div className="space-y-3">
            {agents.map((agent, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden border border-white/20 group-hover:border-cyan-400/50 transition-all duration-300">
                      {agent.profile_photo_url ? (
                        <img
                          src={agent.profile_photo_url}
                          alt={agent.agent_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-sm">
                          {agent.agent_name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase() || "A"}
                        </span>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <CheckCircle className="w-2 h-2 text-white" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-white text-base truncate group-hover:text-cyan-400 transition-colors duration-300">
                        {agent.agent_name || "Unknown Agent"}
                      </h3>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium border border-emerald-500/30">
                        Verified
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <p className="text-gray-400 truncate">{agent.agent_email || "No email"}</p>
                      <span className="text-gray-500">•</span>
                      <p className="text-gray-400 font-mono text-xs">
                        {agent.wallet_address
                          ? `${agent.wallet_address.slice(0, 8)}...${agent.wallet_address.slice(-6)}`
                          : "No wallet"}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleCreatePolicy(agent)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 font-medium whitespace-nowrap ml-4"
                >
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  Create Policy
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-8 h-8 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-400 mb-2">No Agents Available</h3>
            <p className="text-gray-500">There are no verified agents available at the moment.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderMyPoliciesView = () => (
    <Card className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-white/10 shadow-2xl rounded-2xl backdrop-blur-sm hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500">
      <CardHeader className="pb-6 border-b border-white/10">
        <CardTitle className="flex items-center gap-3 text-white text-2xl font-bold">
          <div className="p-2 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20">
            <Shield className="w-6 h-6 text-green-400" />
          </div>
          My Insurance Policies
          <span className="text-sm font-normal text-gray-400 bg-white/5 px-3 py-1 rounded-full">
            {policies.length} {policies.length === 1 ? 'Policy' : 'Policies'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-white/10">
                <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                  Policy ID
                </th>
                <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                  Premium
                </th>
                <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                  Coverage
                </th>
                <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                  Maturity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {policies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border border-white/10">
                        <Shield className="w-8 h-8 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-400 mb-1">No Policies Found</h3>
                        <p className="text-gray-500 text-sm">You don't have any insurance policies yet.</p>
                      </div>
                      <Button
                        onClick={() => setShowAgents(true)}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 mt-2 px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        Get Your First Policy
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                policies.map((policy, idx) => (
                  <tr
                    key={policy.id || idx}
                    onClick={() => handlePolicyClick(policy)}
                    className="group hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-l-4 hover:border-l-cyan-400/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap duration-300">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-white font-semibold text-sm font-mono group-hover:text-cyan-400 transition-colors duration-300">
                            {policy.policy_number || `POL_${policy.id}`}
                          </div>
                          <div className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
                            Issued {policy.issueDate ? new Date(policy.issueDate).toLocaleDateString() : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 transition-transform duration-300">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors duration-300">
                            {policy.agentName || 'Unknown Agent'}
                          </div>
                          <div className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
                            {policy.agent_wallet_address?.slice(0, 4)}...{policy.agent_wallet_address?.slice(-3)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 transition-transform duration-300">
                      <div className="space-y-1">
                        <div className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors duration-300">
                          ₹{(policy.premium_amount || policy.premiumAmount)?.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-xs capitalize group-hover:text-gray-300 transition-colors duration-300">
                          {policy.premium_frequency || 'annual'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 transition-transform duration-300">
                      <div className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors duration-300">
                        ₹{(policy.coverage_amount)?.toLocaleString() || "20 Lacs"}
                      </div>
                    </td>
                    <td className="px-6 py-4 transition-transform duration-300">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium group-hover:scale-105 transition-transform duration-300 ${policy.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:bg-emerald-500/30'
                        : policy.status === 'created'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 group-hover:bg-blue-500/30'
                          : policy.status === 'claimed'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:bg-amber-500/30'
                            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30 group-hover:bg-gray-500/30'
                        }`}>
                        {policy.status || 'created'}
                      </span>
                    </td>
                    <td className="px-6 py-4 transition-transform duration-300">
                      <div className="space-y-1">
                        <div className="text-white text-sm group-hover:text-cyan-400 transition-colors duration-300">
                          {policy.expiryDate ? new Date(policy.expiryDate).toLocaleDateString() : policy.maturityDate || 'N/A'}
                        </div>
                        <div className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
                          {policy.policy_duration || policy.duration || '10'} years
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination or Summary */}
        {policies.length > 0 && (
          <div className="border-t border-white/10 px-6 py-4 bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-400">
              Showing <span className="text-white font-medium">{policies.length}</span> policies
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <span>Total Coverage: <span className="text-white font-medium">₹{policies.reduce((sum, policy) => sum + (policy.coverage_amount || 0), 0).toLocaleString()}</span></span>
              <span>Annual Premium: <span className="text-white font-medium">₹{policies.reduce((sum, policy) => sum + (policy.premium_amount || 0), 0).toLocaleString()}</span></span>
            </div>
            {/* Create Policy Button */}
            <Button
              onClick={handleAgentList}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 mt-2 sm:mt-0 px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Create Policy
            </Button>
          </div>
        )}
      </CardContent>

      {/* Policy Details Modal */}
      <PolicyDetailsModal
        policy={selectedPolicy}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </Card>
  );

  return (
    <div className="text-white w-full relative bg-transparent py-5">
      <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/20">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                Customer <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Dashboard</span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-base">
                Welcome back, {user?.customer?.customer_name || "Customer"}!
              </p>
            </div>
          </div>
          <div className={`flex items-center px-4 py-2 rounded-full bg-white/5 border ${kycStatus === "pending" ? "border-amber-500/30 text-amber-400" : "border-emerald-500/30 text-emerald-400"
            }`}>
            <span className="text-sm font-medium capitalize">{kycStatus}</span>
          </div>
        </div>

        {/* KYC Prompt */}
        {kycStatus === "pending" && (
          <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 shadow-xl rounded-2xl backdrop-blur-sm">
            <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-cyan-400">Complete Your KYC</h3>
                </div>
                <p className="text-cyan-100 text-sm sm:text-base">
                  Complete verification to access advanced features and higher claim limits.
                </p>
              </div>
              <Button
                onClick={handleKYC}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 font-medium whitespace-nowrap"
              >
                Complete KYC
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-white/10 shadow-xl rounded-2xl backdrop-blur-sm hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400 font-medium">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="mt-6">
          {showAgents ? (
            renderAgentListView()
          ) : policies.length === 0 ? (
            renderNoPolicyView()
          ) : (
            renderMyPoliciesView()
          )}
        </div>


      </div>
    </div>
  );
};

export default CustomerOverview;
