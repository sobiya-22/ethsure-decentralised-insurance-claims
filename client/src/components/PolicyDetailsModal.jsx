import React from "react";
import { Button } from "@/components/ui/button";
import {
  X, User, MapPin, Shield, FileText, Wallet,
  CheckCircle, XCircle, Download
} from "lucide-react";
import { userStore } from "@/context/userContext";
import toast from "react-hot-toast";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * PolicyDetailsModal Component
 * 
 * @param {Object} policy - The policy object to display
 * @param {boolean} isOpen - Controls modal visibility
 * @param {Function} onClose - Callback when modal is closed
 */
const PolicyDetailsModal = ({
  policy,
  isOpen,
  onClose,
}) => {
  const user = userStore((state) => state.user);

  const userRole = user?.role;

  if (!isOpen || !policy) return null;

  const handleClaimPolicy = async () => {
    try {

      // API call to generate/download policy document
      const response = await axios.post(
        `${BASE_URL}/api/policy/update-status/${policy._id}`,
        {
          wallet_address: user.wallet_address,
          role: user?.role,
          newStatus: 'claimed'
        }
      );

      toast.dismiss();
      toast.success("Policy claimed successfully!");
    } catch (error) {
      toast.dismiss();
      console.error("Error claiming policy:", error);
      toast.error(error.response?.data?.message || "Failed to claim policy");
    }
  };

  // Handle Approve Request (Agent only)
  const handleApprove = async () => {
    try {
      toast.loading("Approving policy request...");

      const response = await axios.post(
        `${BASE_URL}/api/policy/update-status/${policy._id}`,
        {
          role: user.role,
          wallet_address: user.wallet_address,
          newStatus: 'agentApproved'
        }
      );

      toast.dismiss();

      if (response.data.success) {
        toast.success("Policy request approved successfully!");
        onClose();
      } else {
        toast.error(response.data.message || "Failed to approve policy");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error approving policy:", error);
      toast.error(error.response?.data?.message || "Failed to approve policy request");
    }
  };

  const handleReject = async () => {
    try {
      toast.loading("Rejecting policy request...");

      const response = await axios.post(
        `${BASE_URL}/api/policy/update-status/${policy._id}`,
        {
          role: user.role,
          wallet_address: user.wallet_address,
          newStatus: 'cancelled'
        }
      );

      toast.dismiss();

      if (response.data.success) {
        toast.success("Policy request rejected");
        onClose();
        // if (onSuccess) onSuccess();
      } else {
        toast.error(response.data.message || "Failed to reject policy");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error rejecting policy:", error);
      toast.error(error.response?.data?.message || "Failed to reject policy request");
    }
  };
  const handleDiscard = async () => {
    try {
      toast.loading("Cancelling policy request...");

      const response = await axios.post(
        `${BASE_URL}/api/policy/update-status/${policy._id}`,
        {
          role: user.role,
          wallet_address: user.wallet_address,
          newStatus: 'cancelled'
        }
      );

      toast.dismiss();

      if (response.data.success) {
        toast.success("Policy request cancelled");
        onClose();
        // if (onSuccess) onSuccess();
      } else {
        toast.error(response.data.message || "Failed to cancel policy");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error cancelling policy:", error);
      toast.error(error.response?.data?.message || "Failed to cancel policy request");
    }
  };
  const handleApproval = async () => {
    try {
      toast.loading("Approving policy request...");

      const response = await axios.post(
        `${BASE_URL}/api/policy/update-status/${policy._id}`,
        {
          role: user.role,
          wallet_address: user.wallet_address,
          newStatus: 'active'
        }
      );

      toast.dismiss();

      if (response.data.success) {
        toast.success("Policy request approved");
        onClose();
        // if (onSuccess) onSuccess();
      } else {
        toast.error(response.data.message || "Failed to approve policy");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error approving policy:", error);
      toast.error(error.response?.data?.message || "Failed to approve policy request");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/7 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 hide-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-xl z-10 flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Policy Details</h2>
              <p className="text-gray-400 text-sm">Complete policy information</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Policy Content */}
        <div className="p-6 space-y-6">
          {/* Policy Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Policy Information
              </h3>
              <div className="space-y-3 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Policy ID:</span>
                  <span className="text-white font-mono text-sm">{`POL_${policy._id}`}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${policy.status === 'active'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : policy.status === 'created'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : policy.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : policy.status === 'claimed'
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                    {policy.status || 'created'}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Issue Date:</span>
                  <span className="text-white text-sm">{policy.issueDate ? new Date(policy.issueDate).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Expiry Date:</span>
                  <span className="text-white text-sm">{policy.expiryDate ? new Date(policy.expiryDate).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Financial Details
              </h3>
              <div className="space-y-3 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Coverage Amount:</span>
                  <span className="text-emerald-400 font-semibold text-sm">₹{(policy.coverage_amount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Premium Amount:</span>
                  <span className="text-white font-semibold text-sm">₹{(policy.premium_amount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Premium Frequency:</span>
                  <span className="text-white capitalize text-sm">{policy.premium_frequency || 'annual'}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Policy Duration:</span>
                  <span className="text-white text-sm">{policy.policy_duration || '10'} years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Details
              </h3>
              <div className="space-y-3 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Full Name:</span>
                  <span className="text-white text-sm font-medium">{policy.fullName || policy.customer_name || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Date of Birth:</span>
                  <span className="text-white text-sm">{policy.dateOfBirth ? new Date(policy.dateOfBirth).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Gender:</span>
                  <span className="text-white text-sm capitalize">{policy.gender || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Marital Status:</span>
                  <span className="text-white text-sm capitalize">{policy.maritalStatus || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Contact Information
              </h3>
              <div className="space-y-3 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Email:</span>
                  <span className="text-white text-sm truncate max-w-[200px]">{policy.email || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Phone:</span>
                  <span className="text-white text-sm">{policy.phone || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Address:</span>
                  <span className="text-white text-sm text-right max-w-[200px] line-clamp-2">{policy.address || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Identification & Agent/Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Identification
              </h3>
              <div className="space-y-3 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Aadhar Number:</span>
                  <span className="text-white font-mono text-sm">{policy.aadharNumber || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">PAN Number:</span>
                  <span className="text-white font-mono text-sm">{policy.panNumber || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Annual Income:</span>
                  <span className="text-white text-sm">₹{(policy.annualIncome || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Occupation:</span>
                  <span className="text-white text-sm">{policy.occupation || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <User className="w-5 h-5" />
                {userRole === 'agent' ? 'Customer Information' : 'Agent Information'}
              </h3>
              <div className="space-y-3 bg-white/5 rounded-xl p-4 border border-white/10">
                {userRole === 'agent' ? (
                  <>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-400 text-sm">Customer Name:</span>
                      <span className="text-white text-sm font-medium">{policy.fullName || policy.customer_name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-400 text-sm">Customer Wallet:</span>
                      <span className="text-white font-mono text-xs truncate max-w-[200px]">
                        {policy.customer_wallet_address || 'N/A'}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-400 text-sm">Agent Name:</span>
                      <span className="text-white text-sm font-medium">{policy.agent?.agent_name || 'Not Available'}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-400 text-sm">Agent Wallet:</span>
                      <span className="text-white font-mono text-xs truncate max-w-[200px]">
                        {policy.agent_wallet_address || 'N/A'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Nominee Information (if available) */}
          {(policy.nominee || policy.policy_VC) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Nominee Information */}
              {policy.nominee && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Nominee Information
                  </h3>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-gray-400 text-sm">Nominee Name:</span>
                      <span className="text-white text-sm font-medium">
                        {policy.nominee.nominee_name || 'N/A'}
                      </span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-gray-400 text-sm">Relationship:</span>
                      <span className="text-white text-sm capitalize">
                        {policy.nominee.nominee_relation || 'N/A'}
                      </span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-gray-400 text-sm">Age:</span>
                      <span className="text-white text-sm">
                        {policy.nominee.nominee_age || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* On-chain Information */}
              {policy.policy_VC && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    On-chain Policy Information
                  </h3>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">

                    <div className="flex justify-between items-start">
                      <span className="text-gray-400 text-sm">Blockchain Policy ID:</span>
                      <span className="text-white text-sm font-medium">
                        {policy.onchain_policyID || 'N/A'}
                      </span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-gray-400 text-sm">Transaction Hash:</span>
                      <a
                        href={`https://sepolia.etherscan.io/tx/${policy.txn_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 underline font-mono text-xs break-all"
                      >
                        {policy.txn_hash || 'N/A'}
                      </a>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}


          {userRole === 'agent' && (
            <>
              <Button
                onClick={handleReject}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject Request
              </Button>
              <Button
                onClick={handleApprove}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Request
              </Button>
            </>
          )}
          {userRole === 'company' && (
            <>
              <Button
                onClick={handleDiscard}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Discard Policy
              </Button>
              <Button
                onClick={handleApproval}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Policy Request
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyDetailsModal;