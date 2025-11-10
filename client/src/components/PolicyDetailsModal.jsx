import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  X, User, MapPin, Shield, FileText, Wallet,
  CheckCircle, XCircle, Download, Eye, ExternalLink, CreditCard, Loader2
} from "lucide-react";
import { userStore } from "@/context/userContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const DocumentViewer = ({ url, title, onClose }) => {
  const isPDF = url?.toLowerCase().endsWith('.pdf');
  
  // Use Google Docs Viewer for PDFs to avoid CORS issues
  const viewerUrl = isPDF 
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
    : url;
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 rounded-2xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gray-900/90 backdrop-blur-xl rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30">
              <FileText className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-gray-400 text-sm">Document Viewer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => window.open(url, '_blank')}
              className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-xl transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-xl"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Document Display */}
        <div className="flex-1 p-4 overflow-hidden">
          {isPDF ? (
            <iframe
              src={viewerUrl}
              className="w-full h-full rounded-xl border border-white/10 bg-white"
              title={title}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800/50 rounded-xl border border-white/10">
              <img
                src={url}
                alt={title}
                className="max-w-full max-h-full object-contain rounded-xl"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PolicyDetailsModal = ({
  policy,
  isOpen,
  onClose,
}) => {
  const user = userStore((state) => state.user);
  const [viewingDocument, setViewingDocument] = useState(null);
  const navigate = useNavigate();
  const userRole = user?.role;

  if (!isOpen || !policy) return null;

  const handleClaimPolicy = async () => {
    navigate("/customer/claim-policy", { state: { policy } });
    onClose();
    // const toastId = toast.loading("Processing claim...");
    
    // try {
    //   const response = await axios.post(
    //     `${BASE_URL}/api/policy/update-status/${policy._id}`,
    //     {
    //       wallet_address: user.wallet_address,
    //       role: user?.role,
    //       newStatus: 'claimed'
    //     }
    //   );

    //   if (response.data.success) {
    //     toast.success("Policy claimed successfully!", { id: toastId });
    //     onClose();
    //   } else {
    //     toast.error(response.data.message || "Failed to claim policy", { id: toastId });
    //   }
    // } catch (error) {
    //   console.error("Error claiming policy:", error);
    //   toast.error(error.response?.data?.message || "Failed to claim policy", { id: toastId });
    // }
  };

  const handleApprove = async () => {
    const toastId = toast.loading("Approving policy request...");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/policy/update-status/${policy._id}`,
        {
          role: user.role,
          wallet_address: user.wallet_address,
          newStatus: 'agentApproved'
        }
      );

      if (response.data.success) {
        toast.success("Policy request approved successfully!", { id: toastId });
        onClose();
      } else {
        toast.error(response.data.message || "Failed to approve policy", { id: toastId });
      }
    } catch (error) {
      console.error("Error approving policy:", error);
      toast.error(error.response?.data?.message || "Failed to approve policy request", { id: toastId });
    }
  };

  const handleReject = async () => {
    const toastId = toast.loading("Rejecting policy request...");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/policy/update-status/${policy._id}`,
        {
          role: user.role,
          wallet_address: user.wallet_address,
          newStatus: 'cancelled'
        }
      );

      if (response.data.success) {
        toast.success("Policy request rejected", { id: toastId });
        onClose();
      } else {
        toast.error(response.data.message || "Failed to reject policy", { id: toastId });
      }
    } catch (error) {
      console.error("Error rejecting policy:", error);
      toast.error(error.response?.data?.message || "Failed to reject policy request", { id: toastId });
    }
  };

  const handleDiscard = async () => {
    const toastId = toast.loading("Cancelling policy request...");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/policy/update-status/${policy._id}`,
        {
          role: user.role,
          wallet_address: user.wallet_address,
          newStatus: 'cancelled'
        }
      );

      if (response.data.success) {
        toast.success("Policy request cancelled", { id: toastId });
        onClose();
      } else {
        toast.error(response.data.message || "Failed to cancel policy", { id: toastId });
      }
    } catch (error) {
      console.error("Error cancelling policy:", error);
      toast.error(error.response?.data?.message || "Failed to cancel policy request", { id: toastId });
    }
  };

  const handleApproval = async () => {
    const toastId = toast.loading("Approving policy request...");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/policy/update-status/${policy._id}`,
        {
          role: user.role,
          wallet_address: user.wallet_address,
          newStatus: 'active'
        }
      );

      if (response.data.success) {
        toast.success("Policy request approved", { id: toastId });
        onClose();
      } else {
        toast.error(response.data.message || "Failed to approve policy", { id: toastId });
      }
    } catch (error) {
      console.error("Error approving policy:", error);
      toast.error(error.response?.data?.message || "Failed to approve policy request", { id: toastId });
    }
  };

  const documents = [
    {
      label: "Aadhar Card",
      url: policy.documents?.aadharcard_url,
      icon: CreditCard
    },
    {
      label: "PAN Card",
      url: policy.documents?.pancard_url,
      icon: CreditCard
    },
    {
      label: "Nominee ID",
      url: policy.documents?.nominee_id_url,
      icon: FileText
    }
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
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
                    <span className="text-white font-mono text-sm">{`POL_${policy.onchain_policyID}`}</span>
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

            {/* Uploaded Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Uploaded Documents
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/30">
                        <doc.icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{doc.label}</p>
                        <p className="text-gray-400 text-xs">
                          {doc.url ? "Document uploaded" : "Not uploaded"}
                        </p>
                      </div>
                    </div>
                    {doc.url ? (
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => setViewingDocument({ url: doc.url, title: doc.label })}
                          className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-xl transition-all duration-300"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button
                          onClick={() => window.open(doc.url, '_blank')}
                          className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 px-4 py-2 rounded-xl transition-all duration-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">Not available</span>
                    )}
                  </div>
                ))}
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
                      <Shield className="w-5 h-5" />
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

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {userRole === 'customer' && policy.status === 'active' && (
                <>
                  <Button
                    onClick={handleClaimPolicy}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Claim Policy
                  </Button>
                </>
              )}
              {userRole === 'agent' && (
                <>
                  <Button
                    onClick={handleReject}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Request
                  </Button>
                  <Button
                    onClick={handleApprove}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
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
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Discard Policy
                  </Button>
                  <Button
                    onClick={handleApproval}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Policy Request
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {viewingDocument && (
        <DocumentViewer
          url={viewingDocument.url}
          title={viewingDocument.title}
          onClose={() => setViewingDocument(null)}
        />
      )}
    </>
  );
};

export default PolicyDetailsModal;