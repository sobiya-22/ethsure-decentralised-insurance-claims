import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, MapPin, CreditCard, FileText, X, Clock, CheckCircle, AlertCircle } from "lucide-react";

const PolicyRequestDetailsModal = ({ policyRequest, isOpen, onClose, onApprove, onReject }) => {
  if (!policyRequest) return null;

  const statusConfig = {
    pending: { icon: Clock, color: 'amber', text: 'Pending' },
    approved: { icon: CheckCircle, color: 'emerald', text: 'Approved' },
    rejected: { icon: AlertCircle, color: 'red', text: 'Rejected' }
  };

  const status = policyRequest.status || 'pending';
  const config = statusConfig[status] || statusConfig.pending;
  const StatusIcon = config.icon;

  const formatCurrency = (amount) => amount ? `₹${amount.toLocaleString()}` : 'N/A';
  const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'N/A';

  const InfoField = ({ label, value, icon: Icon, className = "" }) => (
    <div className={className}>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className={`text-white ${Icon ? 'flex items-center gap-2' : ''}`}>
        {Icon && <Icon className="w-4 h-4 text-gray-400" />}
        {value || 'N/A'}
      </p>
    </div>
  );

  const CardSection = ({ title, icon: Icon, iconColor, children }) => (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <Icon className={`w-5 h-5 text-${iconColor}-400`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-400" />
              Policy Request Details
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Request Status */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">Request Status</CardTitle>
                <Badge className={`px-3 py-1 rounded-full text-sm font-medium border bg-${config.color}-500/20 text-${config.color}-400 border-${config.color}-500/30`}>
                  <div className="flex items-center gap-2">
                    <StatusIcon className="w-4 h-4" />
                    {config.text}
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-400">Request ID</p>
                  <p className="font-mono text-white">#{policyRequest._id?.slice(-8) || 'N/A'}</p>
                </div>
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-400">Requested Date</p>
                  <p className="text-white">{formatDate(policyRequest.createdAt)}</p>
                </div>
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-400">Customer Wallet</p>
                  <p className="font-mono text-xs text-gray-300">{policyRequest.customer_wallet || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Details */}
          <CardSection title="Personal Information" icon={User} iconColor="blue">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoField label="Full Name" value={policyRequest.fullName} />
              <InfoField label="Date of Birth" value={policyRequest.dateOfBirth} />
              <InfoField label="Gender" value={policyRequest.gender} />
              <InfoField label="Marital Status" value={policyRequest.maritalStatus} />
              <InfoField label="Phone Number" value={policyRequest.phone} icon={Phone} />
              <InfoField label="Email" value={policyRequest.email} icon={Mail} />
              <InfoField label="Address" value={policyRequest.address} icon={MapPin} className="md:col-span-2" />
            </div>
          </CardSection>

          {/* Identification */}
          <CardSection title="Identification Documents" icon={FileText} iconColor="green">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoField label="Aadhar Number" value={policyRequest.aadharNumber} />
              <InfoField label="PAN Number" value={policyRequest.panNumber} />
            </div>
          </CardSection>

          {/* Financial Information */}
          <CardSection title="Financial Information" icon={CreditCard} iconColor="purple">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoField label="Annual Income" value={formatCurrency(policyRequest.annualIncome)} />
              <InfoField label="Occupation" value={policyRequest.occupation} />
              <InfoField label="Coverage Amount" value={formatCurrency(policyRequest.coverage_amount)} />
              <InfoField label="Premium Amount" value={formatCurrency(policyRequest.premium_amount)} />
              <InfoField label="Premium Frequency" value={policyRequest.premium_frequency} />
              <InfoField label="Policy Duration" value={policyRequest.policy_duration ? `${policyRequest.policy_duration} years` : 'N/A'} />
            </div>
          </CardSection>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button variant="outline" onClick={onClose} className="flex-1 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300">
              Close
            </Button>
            {status === 'pending' && (
              <>
                <Button onClick={() => onReject?.(policyRequest)} className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 border-0">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Reject Request
                </Button>
                <Button onClick={() => onApprove?.(policyRequest)} className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 border-0">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Request
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyRequestDetailsModal;