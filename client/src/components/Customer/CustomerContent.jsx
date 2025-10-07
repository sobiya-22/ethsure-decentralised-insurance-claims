import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, FileText, CreditCard, Folder, AlertCircle, CheckCircle, Clock, Wallet, TrendingUp, Users, Star, ArrowRight } from "lucide-react";
import KycNew from "@/components/KycNew";
import { InlineLoader } from "@/components/ui/Loader";

const CustomerContent = ({ customer, kycStatus, onPayEMIClick, currentView, onKYCSubmit }) => {
  const [showAgents, setShowAgents] = useState(false);
  const [agents, setAgents] = useState([]);
  const [loadingAgents, setLoadingAgents] = useState(false);
  const [showKYC, setShowKYC] = useState(false);

  // Check if customer has no policies
  const hasNoPolicies = !customer?.policies || customer?.policies?.length === 0 || customer?.activePolicies === 0;

  // Function to fetch verified agents
  const handleGetPolicy = async () => {
    console.log("🔍 Fetching verified agents...");
    setLoadingAgents(true);
    try {
      // Since the backend doesn't have an approved agents endpoint,
      // let's create a mock solution for now
      console.log("📡 Backend doesn't have approved agents endpoint, using mock data");
      
      // Mock approved agents data
      const mockAgents = [
        {
          agent_name: "John Smith",
          agent_email: "john.smith@ethsure.com",
          wallet_address: "0x1234567890abcdef1234567890abcdef12345678",
          is_approved: true,
          kyc_status: "verified"
        }
      ];
      
      console.log("✅ Using mock agents:", mockAgents);
      setAgents(mockAgents);
      setShowAgents(true);
      
      console.log(`🎉 Found ${mockAgents.length} verified agents (mock data)`);
    } catch (error) {
      console.error("❌ Error fetching agents:", error);
      console.error("Error details:", error.response?.data || error.message);
    } finally {
      setLoadingAgents(false);
    }
  };

  // Stats dynamically from customer data
  const stats = [
    { 
      title: "Active Policies", 
      value: customer?.activePolicies || 0, 
      icon: Shield, 
      change: customer?.policyChange || "N/A", 
      color: "from-blue-500/20 to-blue-400/20", 
      iconColor: "text-blue-400" 
    },
    { 
      title: "Total Premiums", 
      value: `₹${customer?.totalPremiums || 0}`, 
      icon: CreditCard, 
      change: "Monthly payment", 
      color: "from-blue-500/20 to-blue-400/20", 
      iconColor: "text-blue-400" 
    },
    { 
      title: "Claims Submitted", 
      value: customer?.claimsCount || "0", 
      icon: FileText, 
      change: "Pending review", 
      color: "from-blue-500/20 to-blue-400/20", 
      iconColor: "text-blue-400" 
    },
  ];

  const documents = customer?.documents || [];
  const activities = customer?.activities || [];

  // Debug logging
  console.log("🔍 CustomerContent Debug:");
  console.log("  - showAgents:", showAgents);
  console.log("  - agents array:", agents);
  console.log("  - agents length:", agents.length);
  console.log("  - loadingAgents:", loadingAgents);

  return (
    <div className="text-white w-full relative bg-transparent">
      {showKYC ? (
        <KycNew role="customer" onClose={() => setShowKYC(false)} />
      ) : (
        <div className="space-y-4 sm:space-y-6 px-3 xs:px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        {/* Header */}
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 xs:gap-3">
              <div className="p-1.5 xs:p-2 rounded-lg glass"><Shield className="w-5 h-5 xs:w-6 xs:h-6 text-cyan-400" /></div>
              <div>
                <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Customer <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="text-xl text-gray-300">Welcome back, {customer?.customer_name || "Customer"}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3">
            {kycStatus === "verified" || kycStatus === "completed" ? (
              <div className="flex items-center gap-2 px-2 xs:px-3 py-1 xs:py-1.5 rounded-full glass border border-emerald-500/30 ml-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-emerald-400" />
                <span className="text-xs xs:text-sm text-emerald-400 font-medium">KYC Verified</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-2 xs:px-3 py-1 xs:py-1.5 rounded-full glass border border-amber-500/30 ml-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-amber-400" />
                <span className="text-xs xs:text-sm text-amber-400 font-medium">KYC Pending</span>
              </div>
            )}
          </div>
        </div>

      {/* KYC Alert */}
      {kycStatus !== "verified" && kycStatus !== "completed" && (
        <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                <AlertCircle className="w-6 h-6 text-cyan-400" />
              </div>
                <div className="flex-1">
                <h3 className="font-semibold text-cyan-300 text-lg mb-2">KYC Verification Pending</h3>
                <p className="text-cyan-100 text-base mb-3">
                  Complete your Know Your Customer verification to access advanced features and higher claim limits.
                </p>
                </div>
              <div className="flex-shrink-0">
                <Button 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 cursor-pointer z-10 relative"
                  onClick={() => {
                    console.log("Complete KYC button clicked!");
                    setShowKYC(true);
                  }}
                  type="button"
                >
                  Complete KYC
                </Button>
              </div>
              </div>
            </CardContent>
          </Card>
        )}


        {/* Stats */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glass">
              <CardContent className="p-4 xs:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 xs:space-y-2 min-w-0 flex-1">
                    <p className="text-white/70 text-xs xs:text-sm font-medium truncate">{stat.title}</p>
                    <p className="text-2xl xs:text-3xl font-bold text-white truncate">{stat.value}</p>
                    <p className="text-xs text-white/60 flex items-center gap-1 truncate">
                      <TrendingUp className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{stat.change}</span>
                    </p>
                  </div>
                  <div className={`p-2 xs:p-3 rounded-xl bg-gradient-to-r ${stat.color} flex-shrink-0`}>
                    <stat.icon className={`w-5 h-5 xs:w-6 xs:h-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Policy Section - Full Width */}
        {hasNoPolicies ? (
          <Card className="glass">
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                {/* No Policy Header */}
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 w-fit mx-auto">
                    <Shield className="w-8 h-8 text-blue-400 mx-auto" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">No Policy Yet</h2>
                  <p className="text-gray-300 text-lg">Choose your plan to get started with comprehensive insurance coverage</p>
                </div>

                {/* Endorsement Plan */}
                <Card className="glass border border-blue-500/30">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white">Endorsement Plan</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-yellow-400 font-semibold">Recommended</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-200">Comprehensive coverage for all your insurance needs</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-200">24/7 customer support and claim assistance</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-200">Flexible premium payment options</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-200">Quick claim processing and settlement</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-white">₹2,500<span className="text-gray-400 text-lg font-normal">/month</span></p>
                            <p className="text-gray-400 text-sm">Starting premium</p>
                          </div>
                          <Button 
                            onClick={(e) => {
                              console.log("🖱️ Get Policy button clicked!");
                              console.log("Event:", e);
                              console.log("Button element:", e.target);
                              console.log("loadingAgents state:", loadingAgents);
                              handleGetPolicy();
                            }}
                            disabled={loadingAgents}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 cursor-pointer relative z-10"
                            type="button"
                            style={{ pointerEvents: 'auto' }}
                          >
                    {loadingAgents ? (
                      <InlineLoader />
                    ) : (
                              <>
                                Get Policy
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Verified Agents List */}
                {showAgents && (
                  <Card className="glass border border-green-500/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-400">
                        <Users className="w-5 h-5" />
                        Verified Agents ({agents.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {agents.length > 0 ? (
                          agents.map((agent, index) => {
                            console.log(`👤 Rendering agent ${index}:`, agent);
                            return (
                              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">
                                      {agent.agent_name ? agent.agent_name.split(' ').map(n => n[0]).join('').toUpperCase() : 
                                       agent.name ? agent.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'A'}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="text-white font-semibold">
                                      {agent.agent_name || agent.name || `Agent ${index + 1}`}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                      {agent.agent_email || agent.email || 'Verified Agent'}
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                      Wallet: {agent.wallet_address ? `${agent.wallet_address.slice(0, 6)}...${agent.wallet_address.slice(-4)}` : 'N/A'}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-yellow-400 text-sm font-medium">4.8</span>
                                  </div>
                                  <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                                    Contact
                                  </Button>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center py-8">
                            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-400">No verified agents available at the moment</p>
                            <p className="text-gray-500 text-sm mt-2">Debug: agents array length = {agents.length}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div>
            {/* Active Policy Overview - placeholder for when customer has policies */}
            <Card className="glass">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Active Policy Overview</h3>
                <p className="text-gray-400">Policy details will be displayed here when customer has active policies.</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default CustomerContent;
