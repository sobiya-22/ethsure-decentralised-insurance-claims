import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  X, XCircle, CheckCircle, User, Phone, Mail, Shield, Wallet, Building2, CreditCard, FileText, Eye, Download, ExternalLink
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { userStore } from "@/context/userContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const DocumentViewer = ({ url, title, onClose }) => {
  const isPDF = url?.toLowerCase().endsWith('.pdf');
  
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
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in New Tab
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
              src={url}
              className="w-full h-full rounded-xl border border-white/10"
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

const AgentDetailsModal = ({ agent, isOpen, onClose }) => {
  const [viewingDocument, setViewingDocument] = useState(null);
  // const user = userStore((state) => state.user);
  if (!isOpen || !agent) return null;
  
  const handleApprove = async () => {
    const toastId = toast.loading("Approving agent request...");

    try {
      const response = await axios.patch(
        `${BASE_URL}/api/agent/update-status`,
        { agent_wallet_address: agent.wallet_address }, 
        {
          params: { newStatus: "approved" } 
        }
      );

      if (response.data.success) {
        toast.success("Agent request approved successfully!", { id: toastId });
        onClose();
      } else {
        toast.error(response.data.message || "Failed to approve agent", { id: toastId });
      }
    } catch (error) {
      console.error("Error approving agent:", error);
      toast.error(error.response?.data?.message || "Failed to approve agent request", { id: toastId });
    }
  };

  const handleReject = async () => {
    const toastId = toast.loading("Rejecting agent request...");

    try {
      const response = await axios.patch(
        `${BASE_URL}/api/agent/update-status`,
        { agent_wallet_address: agent.wallet_address }, 
        {
          params: { newStatus: "rejected" } 
        }
      );

      if (response.data.success) {
        toast.success("Agent request rejected", { id: toastId });
        onClose();
      } else {
        toast.error(response.data.message || "Failed to reject agent", { id: toastId });
      }
    } catch (error) {
      console.error("Error rejecting agent:", error);
      toast.error(error.response?.data?.message || "Failed to reject agent request", { id: toastId });
    }
  };

  const documents = [
    {
      label: "PAN Card",
      url: agent.documents?.pancard_url,
      icon: CreditCard
    },
    {
      label: "Aadhar Card",
      url: agent.documents?.aadharcard_url,
      icon: CreditCard
    },
    {
      label: "License Document",
      url: agent.documents?.license_url,
      icon: FileText
    }
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 hide-scrollbar">

          {/* Header */}
          <div className="sticky top-0 bg-gray-900/90 backdrop-blur-xl flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Agent Details</h2>
                <p className="text-gray-400 text-sm">Complete agent information</p>
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

          {/* Content */}
          <div className="p-6 space-y-6">

            {/* Agent Profile */}
            <div className="flex items-center gap-4">
              <img
                src={agent.profile_photo_url || "/default-avatar.png"}
                alt={agent.agent_name}
                className="w-20 h-20 rounded-2xl object-cover border border-white/10"
              />
              <div>
                <h3 className="text-xl font-semibold text-white">{agent.agent_name}</h3>
                <p className="text-gray-400 text-sm">{agent.agent_email}</p>
                <p className="text-gray-400 text-sm">{agent.agent_phone}</p>
              </div>
            </div>

            {/* Agent Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <User className="w-5 h-5" />
                Agent Information
              </h3>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Wallet Address:</span>
                  <span className="text-white text-xs font-mono">{agent.wallet_address}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Agent DID:</span>
                  <span className="text-white text-xs font-mono">{agent.agent_did}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">License Number:</span>
                  <span className="text-white text-sm">{agent.license_number || "Not provided"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Registered On:</span>
                  <span className="text-white text-sm">
                    {new Date(agent.registration_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* KYC & Verification */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                KYC & Verification
              </h3>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">KYC Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${agent.kyc_status === "verified"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                    }`}>
                    {agent.kyc_status}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Approved:</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${agent.is_approved
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }`}>
                    {agent.is_approved ? "Approved" : "Not Approved"}
                  </span>
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

            {/* Associated Company */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Associated Company
              </h3>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Company Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${agent.associated_company?.status === "approved"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : agent.associated_company?.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                      : agent.associated_company?.status === "rejected"
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                    }`}>
                    {agent.associated_company?.status || "Not Associated"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Requested On:</span>
                  <span className="text-white text-sm">
                    {agent.associated_company?.request_date
                      ? new Date(agent.associated_company.request_date).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Company:</span>
                  <span className="text-white text-sm">
                    {agent.associated_company?.company
                      ? agent.associated_company.company.company_name
                      : "No Company"}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-900/100 p-6 flex justify-end gap-3 border-t border-white/10">
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

export default AgentDetailsModal;