import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PolicyDetailsModal from "@/components/PolicyDetailsModal";
import { Shield, User, Users, FileText, AlertCircle, CheckCircle, Clock, Wallet, TrendingUp, Eye, Plus, UserPlus, X, UserCheck, Calendar } from "lucide-react";
import { getStatusColor, getPriorityColor } from "@/constants/agentConstants";
import toast from "react-hot-toast";
import { userStore } from "@/context/userContext";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const AssociateCompanyCard = ({ user, onAssociate }) => (
  <Card className="relative overflow-hidden bg-gradient-to-br from-cyan-500/10 via-blue-500/10 border border-cyan-500/30 shadow-2xl rounded-2xl backdrop-blur-sm">
    <CardContent className="relative flex flex-col gap-6 p-8">
      {/* Header Section */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shrink-0">
          <AlertCircle className="w-6 h-6 text-cyan-400" />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            Associate With a Company
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </h3>
          <p className="text-cyan-100/90 text-base leading-relaxed">
            You need to associate with a company to start processing policies and using agent features.
          </p>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-xl bg-white/5 border border-cyan-500/20 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <UserCheck className="w-5 h-5 text-cyan-300 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-cyan-200">
              What happens after association?
            </p>
            <p className="text-sm text-cyan-100/70 leading-relaxed">
              Once you associate with a company, your customer policy requests will be displayed here for review and approval.
            </p>
          </div>
        </div>
      </div>

      {user.agent.associated_company.status === 'pending' ? (
        <Button
          disabled
          className="bg-gray-500/30 text-gray-300 cursor-not-allowed px-6 py-3 rounded-xl"
        >
          Pending Review...
        </Button>
      ) : user.agent.associated_company.status === null ? (
        <Button
          onClick={onAssociate}
          className="w-full sm:w-auto sm:self-end bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 font-semibold text-white border border-cyan-400/20 group"
        >
          <span className="flex items-center gap-2">
            Get Associated with Ethsure Now
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </Button>
      ) : null}

    </CardContent>
  </Card>
);

const PolicyRequestsCard = ({ policyRequests, loadingRequests, selectedRequest, isModalOpen, onViewDetails }) => (
  <Card className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-white/10 shadow-2xl rounded-2xl backdrop-blur-sm hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500">
    <CardHeader className="pb-6 border-b border-white/10">
      <CardTitle className="flex items-center gap-3 text-white text-2xl font-bold">
        <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
          <UserCheck className="w-6 h-6 text-cyan-400" />
        </div>
        Policy Requests from Customers
        <span className="text-sm font-normal text-gray-400 bg-white/5 px-3 py-1 rounded-full">
          {policyRequests.length} {policyRequests.length === 1 ? 'Request' : 'Requests'}
        </span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      {loadingRequests ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400 animate-pulse">Loading requests...</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-white/10">
                  <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                    Premium
                  </th>
                  <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                    Coverage
                  </th>
                  <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                    Requested
                  </th>
                  <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {policyRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border border-white/10">
                          <UserCheck className="w-8 h-8 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-400 mb-1">No Policy Requests</h3>
                          <p className="text-gray-500 text-sm">Customer requests will appear here once they submit applications</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  policyRequests.map((request, idx) => (
                    <tr
                      key={request.id || idx}
                      className="group hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 hover:shadow-lg hover:border-l-4 hover:border-l-cyan-400/50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap duration-300">
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors duration-300">
                              {request.fullName || 'Customer'}
                            </div>
                            <div className="text-gray-400 text-xs font-mono group-hover:text-gray-300 transition-colors duration-300">
                              {request.customer_wallet_address || 'Wallet not available'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 transition-transform duration-300">
                        <div className="space-y-1">
                          <div className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors duration-300">
                            ₹{request.premium_amount?.toLocaleString() || 'N/A'}
                          </div>
                          <div className="text-gray-400 text-xs capitalize group-hover:text-gray-300 transition-colors duration-300">
                            {request.premium_frequency || 'annual'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 transition-transform duration-300">
                        <div className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors duration-300">
                          ₹{request.coverage_amount?.toLocaleString() || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 transition-transform duration-300">
                        <div className="text-white text-sm group-hover:text-cyan-400 transition-colors duration-300">
                          {request.policy_duration ? `${request.policy_duration} years` : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 transition-transform duration-300">
                        <div className="text-white text-sm group-hover:text-cyan-400 transition-colors duration-300">
                          {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 transition-transform duration-300">
                        <Button
                          size="sm"
                          onClick={() => onViewDetails(request)}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1.5" />
                          View Details
                        </Button>

                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>


          </div>

          {/* Summary Footer */}
          {policyRequests.length > 0 && (
            <div className="border-t border-white/10 px-6 py-4 bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-gray-400">
                Showing <span className="text-white font-medium">{policyRequests.length}</span> {policyRequests.length === 1 ? 'request' : 'requests'}
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <span>Total Premium: <span className="text-white font-medium">₹{policyRequests.reduce((sum, req) => sum + (req.premium_amount || 0), 0).toLocaleString()}</span></span>
                <span>Total Coverage: <span className="text-white font-medium">₹{policyRequests.reduce((sum, req) => sum + (req.coverage_amount || 0), 0).toLocaleString()}</span></span>
              </div>
            </div>
          )}
        </>
      )}
    </CardContent>
  </Card>

);

const AgentOverview = () => {
  const user = userStore((state) => state.user);
  const blockchain = userStore((state) => state.blockchainInfo);
  const kycStatus = user?.agent?.kyc_status;
  const agentApproved = user?.agent?.is_approved;
  console.log(user);
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [policyRequests, setPolicyRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleAssociate = () => navigate("/agent/associate-company");
  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchCustomerRequests = async () => {
      const res = await axios.get(`${BASE_URL}/api/policy/all-policies`, {
        params: {
          agent_wallet_address: user.wallet_address,
          status: 'created'
        }
      });
      setPolicyRequests(res.data.policies);
    };

    fetchCustomerRequests();
  }, [user?.wallet_address]);

  const handleKYC = () => {
    navigate("/agent/kyc");
  };

  const stats = [
    {
      title: "Policy Requests",
      value: policyRequests.length.toString(),
      icon: FileText,
      color: "from-blue-500/20 to-cyan-400/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/30"
    },
    {
      title: "Pending Reviews",
      value: policyRequests.filter(req => req.status === 'pending').length.toString(),
      icon: Clock,
      color: "from-amber-500/20 to-yellow-400/20",
      iconColor: "text-amber-400",
      borderColor: "border-amber-500/30"
    },
    {
      title: "Approved",
      value: policyRequests.filter(req => req.status === 'approved').length.toString(),
      icon: CheckCircle,
      color: "from-emerald-500/20 to-green-400/20",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/30"
    },
  ];

  return (
    <div className="text-white w-full relative bg-transparent">
      <div className="space-y-3 px-1 sm:px-4 lg:px-6 pt-6 sm:pt-9">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg glass">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                  Agent <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Dashboard</span>
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
        {kycStatus === "verified" && !user?.agent?.is_approved && (
          user?.agent?.associated_company?.status === "pending" ? (
            //pending UI message
            <Card className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 shadow-xl rounded-2xl backdrop-blur-sm">
              <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-semibold text-yellow-400">Association Request Pending</h3>
                  </div>
                  <p className="text-yellow-100 text-sm sm:text-base">
                    Your association request has been sent and is currently under review by the company.
                  </p>
                </div>

                <Button
                  disabled
                  className="bg-gray-500/30 text-gray-300 cursor-not-allowed px-6 py-3 rounded-xl"
                >
                  Pending Review...
                </Button>
              </CardContent>
            </Card>
          ) : (
            // Associate Now UI if no request exists
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
          )
        )}


        {/* Stats Cards */}
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

        {/* Main Content Grid */}
        <div className="text-white w-full relative bg-transparent pt-8 space-y-6">
          {kycStatus === "pending" ? (
            <div className="w-full p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm">
              ⚠️ Your KYC is still pending.
              <br />
              Once your KYC is verified and you are associated to a company, customer policy requests will be shown here.
            </div>
          ) : !agentApproved && kycStatus === "verified" ? (
            <AssociateCompanyCard user={user} onAssociate={handleAssociate} />
          ) :
            (
              <PolicyRequestsCard
                policyRequests={policyRequests}
                loadingRequests={loadingRequests}
                selectedRequest={selectedRequest}
                isModalOpen={isModalOpen}
                onViewDetails={handleViewDetails}
              />

            )}
        </div>
      </div>
      <PolicyDetailsModal
        policy={selectedRequest}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />


    </div>
  );
};
export default AgentOverview;