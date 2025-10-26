import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Users, FileText, AlertCircle, CheckCircle, Clock, Wallet, TrendingUp, Eye, Plus, UserPlus, X, UserCheck, Calendar } from "lucide-react";
import { getStatusColor, getPriorityColor } from "@/constants/agentConstants";
import toast from "react-hot-toast";
import { userStore } from "@/context/userContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;


const AssociateCompanyCard = ({ onAssociate }) => (
  <Card className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 shadow-xl rounded-2xl backdrop-blur-sm">
    <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-yellow-400">Associate With a Company</h3>
        </div>
        <p className="text-yellow-100 text-sm sm:text-base">
          You need to associate with a company to start processing policies and using agent features.
        </p>
      </div>
      <Button
        onClick={onAssociate}
        className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25 font-medium whitespace-nowrap"
      >
        Get Associated with Ethsure Now!
      </Button>
    </CardContent>
  </Card>
);


const PolicyRequestsCard = ({ policyRequests, loadingRequests, handleReviewDetails, handleApproveRequest, handleRejectRequest }) => (
  <Card className="glass shine hover:border-blue-400/50 transition-all duration-300 w-full">
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2 font-bold">
          <UserCheck className="w-5 h-5 font-bold" />
          Policy Requests from Customers
        </CardTitle>
        <Button variant="secondary" size="sm">
          View All Requests
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      {loadingRequests ? (
        <div className="flex items-center justify-center py-8">
          Loading...
        </div>
      ) : (
        <div className="space-y-4">
          {policyRequests.length > 0 ? (
            policyRequests.map((request, index) => (
              <div key={request.id || index} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-gray-300">#{request.id || `PR-${index + 1}`}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${request.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : request.status === 'approved'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : request.status === 'rejected'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}>
                        {request.status || 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-white">{request.fullName || request.customer_name || 'Customer'}</span>
                      <span className="text-sm text-white/60">{request.coverage_amount ? `₹${request.coverage_amount.toLocaleString()}` : 'Coverage Amount'}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-cyan-400">₹{request.premium_amount?.toLocaleString() || 'Premium'}</span>
                      <span className="text-sm text-white/60">{request.premium_frequency || 'Annual'}</span>
                      <span className="text-sm text-white/60">{request.policy_duration ? `${request.policy_duration} years` : 'Duration'}</span>
                    </div>
                    {request.createdAt && (
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>Requested: {new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={() => handleReviewDetails(request)}>
                      Review Details
                    </Button>
                    <Button size="sm" onClick={() => handleApproveRequest(request)}>
                      Approve
                    </Button>
                    <Button size="sm" onClick={() => handleRejectRequest(request)}>
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-400">No policy requests from customers yet</p>
            </div>
          )}
        </div>
      )}
    </CardContent>
  </Card>
);

const AgentOverview = () => {
  const user = userStore((state) => state.user);
  const kycStatus = user?.agent?.kyc_status;
  const agentApproved = user?.agent?.is_approved;
  // const associate_company = 
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [policyRequests, setPolicyRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const handleAssociate = () => navigate("/agent/associate-company");
  useEffect(() => {
    const fetchCustomerRequests = async () => {
      // if (!agent?.wallet_address) return;

      // setLoadingRequests(true);
      // try {
      //   const response = await getAgentPolicyRequests(agent.wallet_address);
      //   console.log("Policy requests response:", response);
      //   setPolicyRequests(response.data?.data || []);
      // } catch (error) {
      //   console.error("Error fetching policy requests:", error);
      //   setPolicyRequests([]);
      // } finally {
      //   setLoadingRequests(false);
      // }
    };

    fetchCustomerRequests();
  });

  const handleKYC = () => {
    navigate("/agent/kyc");
  };

  const stats = [
    { title: "Policy Requests", value: policyRequests.length.toString(), icon: FileText, change: "New requests from customers", color: "from-blue-500/20 to-blue-400/20", iconColor: "text-blue-400" },
    { title: "Pending Reviews", value: policyRequests.filter(req => req.status === 'pending').length.toString(), icon: Clock, change: "Awaiting your review", color: "from-amber-500/20 to-amber-400/20", iconColor: "text-amber-400" },
    { title: "Approved Policies", value: policyRequests.filter(req => req.status === 'approved').length.toString(), icon: CheckCircle, change: "Successfully processed", color: "from-emerald-500/20 to-emerald-400/20", iconColor: "text-emerald-400" },
  ];

  return (
    <div className="text-white w-full relative bg-transparent">
      <div className="space-y-6 px-4 sm:px-6 lg:px-8 pt-16">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg glass">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                  Agent <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Welcome back, {user?.agent?.agent_name}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center px-4 py-2 rounded-full bg-white/5 border ${kycStatus === "pending" ? "border-amber-500/30 text-amber-400" : "border-emerald-500/30 text-emerald-400"
              }`}>
              <span className="text-sm font-medium capitalize">{kycStatus}</span>
            </div>

          </div>
        </div>

        {/* KYC Alert */}
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
        {/* Association Alert */}
        {!user?.agent?.is_approved && (kycStatus === 'verified') && (
          <Card className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 shadow-xl rounded-2xl backdrop-blur-sm">
            <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-yellow-400">Associate With a Company</h3>
                </div>
                <p className="text-yellow-100 text-sm sm:text-base">
                  You need to associate with a company to start processing policies and using agent features.
                </p>
              </div>
              <Button
                onClick={() => navigate("/agent/associate-company")}
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25 font-medium whitespace-nowrap"
              >
                Associate Now
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glass shine hover:border-blue-400/50 transition-all duration-300 group hover:scale-105">
              <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-white/70 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/60 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="text-white w-full relative bg-transparent px-4 sm:px-6 lg:px-8 pt-16 space-y-6">
          {!user?.agent?.association_requests?.length ? (
            <AssociateCompanyCard onAssociate={handleAssociate} />
          ) : (
            <PolicyRequestsCard
              policyRequests={policyRequests}
              loadingRequests={loadingRequests}
              handleReviewDetails={() => { }}
              handleApproveRequest={() => { }}
              handleRejectRequest={() => { }}
            />
          )}
        </div>
      </div>

    </div>
  );
};
export default AgentOverview;