import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  X, User, MapPin, Shield, FileText, Wallet,
  CheckCircle, XCircle, Download, Eye, ExternalLink,
  CreditCard, AlertCircle, Clock, DollarSign
} from "lucide-react";
import { userStore } from "@/context/userContext";
import toast from "react-hot-toast";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const DocumentViewer = ({ url, title, onClose }) => {
  const isPDF = url?.toLowerCase().endsWith('.pdf');
  const viewerUrl = isPDF 
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
    : url;
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 rounded-2xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
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

const getStatusColor = (status) => {
  const colors = {
    'pending': 'border-amber-500/30 text-amber-400 bg-amber-500/20',
    'under_review': 'border-blue-500/30 text-blue-400 bg-blue-500/20',
    'approved': 'border-emerald-500/30 text-emerald-400 bg-emerald-500/20',
    'rejected': 'border-red-500/30 text-red-400 bg-red-500/20',
    'paid': 'border-purple-500/30 text-purple-400 bg-purple-500/20'
  };
  return colors[status] || 'border-gray-500/30 text-gray-400 bg-gray-500/20';
};

const ClaimPolicyModal = ({ policy, isOpen, onClose }) => {
  const user = userStore((state) => state.user);
  const [viewingDocument, setViewingDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !policy) return null;

  const claimData = policy.claim_data || {};

  const handleApproveClaim = async () => {
    setLoading(true);
    const toastId = toast.loading("Approving claim...");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/policy/update-claim-status/${policy._id}`,
        {
          wallet_address: user.wallet_address,
          role: user.role,
          claim_status: 'approved',
          approved_amount: claimData.claim_amount
        }
      );

      if (response.data.success) {
        toast.success("Claim approved successfully!", { id: toastId });
        onClose();
      } else {
        toast.error(response.data.message || "Failed to approve claim", { id: toastId });
      }
    } catch (error) {
      console.error("Error approving claim:", error);
      toast.error(error.response?.data?.message || "Failed to approve claim", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleRejectClaim = async () => {
    setLoading(true);
    const toastId = toast.loading("Rejecting claim...");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/policy/update-claim-status/${policy._id}`,
        {
          wallet_address: user.wallet_address,
          role: user.role,
          claim_status: 'rejected'
        }
      );

      if (response.data.success) {
        toast.success("Claim rejected", { id: toastId });
        onClose();
      } else {
        toast.error(response.data.message || "Failed to reject claim", { id: toastId });
      }
    } catch (error) {
      console.error("Error rejecting claim:", error);
      toast.error(error.response?.data?.message || "Failed to reject claim", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const claimDocuments = [
    {
      label: "Death Certificate",
      url: claimData.claim_documents?.death_certificate_url,
      icon: FileText
    },
    {
      label: "Medical Reports",
      url: claimData.claim_documents?.medical_reports_url,
      icon: FileText
    },
    {
      label: "Claimant ID Proof",
      url: claimData.claim_documents?.claimant_id_url,
      icon: CreditCard
    },
    {
      label: "Police Report",
      url: claimData.claim_documents?.police_report_url,
      icon: FileText
    }
  ];

  const policyDocuments = [
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
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 hide-scrollbar">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-xl z-10 flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
                <AlertCircle className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Claim Details</h2>
                <p className="text-gray-400 text-sm">Review and process claim request</p>
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

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Claim Status Banner */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-cyan-400" />
                  <div>
                    <p className="text-white font-semibold">Claim Status</p>
                    <p className="text-gray-400 text-sm">Current processing status</p>
                  </div>
                </div>
                <Badge className={getStatusColor(claimData.claim_status || 'pending')}>
                  {(claimData.claim_status || 'pending').replace('_', ' ')}
                </Badge>
              </div>
            </div>

            {/* Claim Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Claim Details */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Claim Information
                </h3>
                <div className="space-y-3 bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 text-sm">Policy ID:</span>
                    <span className="text-white font-mono text-sm">POL_{policy.onchain_policyID || policy._id?.slice(-6)}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 text-sm">Claim Reason:</span>
                    <span className="text-white capitalize text-sm">{claimData.claim_reason?.replace('_', ' ') || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 text-sm">Claim Amount:</span>
                    <span className="text-emerald-400 font-semibold text-sm">₹{(claimData.claim_amount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 text-sm">Request Date:</span>
                    <span className="text-white text-sm">
                      {claimData.claim_request_date ? new Date(claimData.claim_request_date).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  {claimData.incident_date && (
                    <div className="flex justify-between items-start">
                      <span className="text-gray-400 text-sm">Incident Date:</span>
                      <span className="text-white text-sm">
                        {new Date(claimData.incident_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Claimant Details */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Claimant Information
                </h3>
                <div className="space-y-3 bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 text-sm">Claimant Name:</span>
                    <span className="text-white font-medium text-sm">{claimData.claimant_name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 text-sm">Claimant Type:</span>
                    <span className="text-white capitalize text-sm">{claimData.claimant_type || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 text-sm">Relationship:</span>
                    <span className="text-white capitalize text-sm">{claimData.claimant_relation || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 text-sm">Phone:</span>
                    <span className="text-white text-sm">{claimData.claimant_phone || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 text-sm">Email:</span>
                    <span className="text-white text-sm truncate max-w-[200px]">{claimData.claimant_email || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Claim Description */}
            {claimData.claim_description && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Claim Description
                </h3>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-white text-sm leading-relaxed">{claimData.claim_description}</p>
                </div>
              </div>
            )}

            {/* Policy Holder Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Policy Holder Details
                </h3>
                <div className="space-y-3 bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 text-sm">Full Name:</span>
                    <span className="text-white font-medium text-sm">{policy.fullName || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 text-sm">Email:</span>
                    <span className="text-white text-sm truncate max-w-[200px]">{policy.email || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 text-sm">Phone:</span>
                    <span className="text-white text-sm">{policy.phone || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 text-sm">Gender:</span>
                    <span className="text-white capitalize text-sm">{policy.gender || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Policy Financial Details
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
                    <span className="text-gray-400 text-sm">Issue Date:</span>
                    <span className="text-white text-sm">{policy.issueDate ? new Date(policy.issueDate).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 text-sm">Expiry Date:</span>
                    <span className="text-white text-sm">{policy.expiryDate ? new Date(policy.expiryDate).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Claim Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Claim Supporting Documents
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {claimDocuments.map((doc, index) => (
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

            {/* Original Policy Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Original Policy Documents
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {policyDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30">
                        <doc.icon className="w-5 h-5 text-blue-400" />
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
                          className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-xl transition-all duration-300"
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

            {/* Action Buttons */}
            {claimData.claim_status === 'pending' && user?.role === 'company' && (
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleRejectClaim}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Claim
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleApproveClaim}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Claim
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Approval Info */}
            {claimData.claim_status === 'approved' && (
              <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-white font-semibold">Claim Approved</p>
                    <p className="text-gray-400 text-sm">
                      Approved Amount: <span className="text-emerald-400 font-semibold">₹{(claimData.approved_amount || 0).toLocaleString()}</span>
                    </p>
                    {claimData.approval_date && (
                      <p className="text-gray-400 text-sm">
                        Approved on: {new Date(claimData.approval_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Rejection Info */}
            {claimData.claim_status === 'rejected' && (
              <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Claim Rejected</p>
                    <p className="text-gray-400 text-sm">This claim has been rejected by the company</p>
                  </div>
                </div>
              </div>
            )}
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

export default ClaimPolicyModal;