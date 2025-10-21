import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, DollarSign, CreditCard, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { userStore } from "@/context/userContext";
import { defaultPolicies } from '@/constants/customerConstants';

const BASE_URL = import.meta.env.VITE_BASE_URL; 

const Policies = () => {
  const [policies, setPolicies] = useState(defaultPolicies);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showAgents, setShowAgents] = useState(false);
  const user = userStore((state) => state.user);

  // Modal state (optional)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPolicy(null);
  };

  // Fetch policies from API
  useEffect(() => {
    const handleMyPolicies = async () => {
      if (!user?.wallet_address) return;

      try {
        const res = await axios.get(`${BASE_URL}/api/policy/all-policies`, {
          params: { customer_wallet_address: user.wallet_address },
        });

        if (res.data.success) {
          const mappedPolicies = res.data.policies.map((p) => ({
            id: p._id,
            name: p.fullName,
            agent_wallet: p.agent_wallet_address,
            premiumAmount: p.premium_amount,
            maturityDate: new Date(p.expiryDate).toLocaleDateString(),
            nominee: p.nominee?.nominee_name || "N/A",
            status: p.status || 'created',
            coverage_amount: p.coverage_amount || 2000000, // default coverage
            policy_duration: p.duration || 10,
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

    handleMyPolicies();
  }, [user]);

  const stats = [
    { title: "Total Policies", value: policies.length.toString(), icon: Shield, color: "from-blue-500/20 to-blue-400/20", iconColor: "text-blue-400" },
    { title: "Active Coverage", value: "₹50,000", icon: DollarSign, color: "from-blue-500/20 to-blue-400/20", iconColor: "text-blue-400" },
    { title: "Monthly Premium", value: "₹120", icon: CreditCard, color: "from-blue-500/20 to-blue-400/20", iconColor: "text-blue-400" },
    { title: "Claims This Year", value: "2", icon: FileText, color: "from-blue-500/20 to-blue-400/20", iconColor: "text-blue-400" }
  ];

  return (
    <div className="text-white w-full space-y-8 px-3 xs:px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl glass shine"><Shield className="w-8 h-8 text-cyan-400" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">My <span className="text-blue-400">Policies</span></h1>
              <p className="text-xl text-gray-300 mt-2">Manage and view all your insurance policies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="glass shine border-white/10 hover-scale-105 hover-glow-cyan group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div><p className="text-white/60 text-sm">{stat.title}</p><p className="text-2xl font-bold text-white">{stat.value}</p></div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-200`}><stat.icon className={`w-6 h-6 ${stat.iconColor}`} /></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Policies Table */}
      <div className="space-y-6">
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
                    <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">Policy ID</th>
                    <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">Agent</th>
                    <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">Premium</th>
                    <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">Coverage</th>
                    <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">Maturity</th>
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
                          <h3 className="text-lg font-semibold text-gray-400 mb-1">No Policies Found</h3>
                          <p className="text-gray-500 text-sm">You don't have any insurance policies yet.</p>
                          <Button onClick={() => setShowAgents(true)} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 mt-2 px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105">
                            Get Your First Policy
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    policies.map((policy, idx) => (
                      <tr key={policy.id || idx} onClick={() => handlePolicyClick(policy)} className="group hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-l-4 hover:border-l-cyan-400/50">
                        <td className="px-6 py-4">POL_{policy.id}</td>
                        <td className="px-6 py-4">{policy.agent_wallet || 'Unknown Agent'}</td>
                        <td className="px-6 py-4">₹{policy.premiumAmount?.toLocaleString()}</td>
                        <td className="px-6 py-4">₹{policy.coverage_amount?.toLocaleString()}</td>
                        <td className="px-6 py-4">{policy.status}</td>
                        <td className="px-6 py-4">{policy.maturityDate}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Policies;
