import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, FileText, CreditCard, Folder, AlertCircle, CheckCircle, Clock, Wallet, TrendingUp } from "lucide-react";

const CustomerContent = ({ customer, kycStatus, onPayEMIClick, currentView, onKYCSubmit }) => {
  // if (!customer) return <p className="text-center text-white mt-10">Loading customer data...</p>;

  // Stats dynamically from customer data
  const stats = [
    { 
      title: "Active Policies", 
      value: customer?.activePolicies || 0, 
      icon: Shield, 
      change: customer?.policyChange || "N/A", 
      color: "from-emerald-500/20 to-emerald-400/20", 
      iconColor: "text-emerald-400" 
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
      color: "from-purple-500/20 to-purple-400/20", 
      iconColor: "text-purple-400" 
    },
  ];

  const documents = customer?.documents || [];
  const activities = customer?.activities || [];

  return (
    <div className="text-white w-full relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[400px] xs:w-[500px] sm:w-[600px] h-[400px] xs:h-[500px] sm:h-[600px] rounded-full bg-gradient-to-br from-gray-500/20 via-gray-400/10 to-gray-500/20 blur-3xl" />
      <div className="relative z-10 space-y-4 sm:space-y-6 pt-8 sm:pt-12">
        {/* Header */}
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 xs:gap-3">
              <div className="p-1.5 xs:p-2 rounded-lg glass"><Shield className="w-5 h-5 xs:w-6 xs:h-6 text-cyan-400" /></div>
              <div>
                <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Customer <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="text-sm xs:text-base lg:text-xl text-gray-300">Welcome back, {customer?.customer_name}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3">
            {kycStatus === "verified" || kycStatus === "completed" ? (
              <div className="flex items-center gap-2 px-2 xs:px-3 py-1 xs:py-1.5 rounded-full glass border border-emerald-500/30">
                <div className="flex-shrink-0 w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-emerald-400" />
                <span className="text-xs xs:text-sm text-emerald-400 font-medium">KYC Verified</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-2 xs:px-3 py-1 xs:py-1.5 rounded-full glass border border-amber-500/30">
                <div className="flex-shrink-0 w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-amber-400" />
                <span className="text-xs xs:text-sm text-amber-400 font-medium">KYC Pending</span>
              </div>
            )}
            <Button variant="outline" size="sm" className="flex items-center gap-1 xs:gap-2 glass w-full xs:w-auto justify-start xs:justify-center">
              <Wallet className="w-3 h-3 xs:w-4 xs:h-4" />
              <span className="text-xs xs:text-sm truncate">{customer?.wallet}</span>
            </Button>
          </div>
        </div>

      {/* KYC Alert */}
      {kycStatus !== "verified" && kycStatus !== "completed" && (
        <Card className="border-cyan-500/40 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-purple-500/15 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 animate-pulse"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300 shadow-lg">
                <AlertCircle className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-cyan-300 text-lg mb-2">KYC Verification Pending</h3>
                <p className="text-cyan-100 text-base mb-3">
                  Complete your Know Your Customer verification to access advanced features and higher claim limits.
                </p>
              </div>
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300"
                onClick={() => {
                  if (onKYCSubmit) {
                    onKYCSubmit();
                  } else {
                    setCurrentView('kyc');
                  }
                }}
              >
                Complete KYC
              </Button>
            </div>
          </CardContent>
        </Card>
      )}


        {/* Stats */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glass shine group hover:scale-105 transition-transform duration-200">
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
                  <div className={`p-2 xs:p-3 rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}>
                    <stat.icon className={`w-5 h-5 xs:w-6 xs:h-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Documents & Activities */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            {/* Active Policy / EMI Section (dynamic if API provides) */}
          </div>

          <div className="space-y-6">
            {/* Documents */}
            <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-bold">
                  <Folder className="w-5 h-5 font-bold" />Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div>
                        <p className="text-white font-medium text-sm">{doc.name}</p>
                        <p className="text-white/60 text-xs">{doc.type} • {doc.uploaded}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${doc.status === 'Verified' ? 'text-gray-300 bg-gray-700/50' : 'text-gray-300 bg-gray-700/50'}`}>{doc.status}</span>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-bold">
                  <Clock className="w-5 h-5 font-bold" />Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div>
                        <p className="text-white font-medium text-sm">{activity.type}</p>
                        <p className="text-white/60 text-xs">
                          {activity.amount && `${activity.amount} • `}
                          {activity.reference && `${activity.reference} • `}
                          {activity.date}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.status === 'Completed' ? 'text-gray-300 bg-gray-700/50' : 'text-gray-300 bg-gray-700/50'}`}>{activity.status}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerContent;
