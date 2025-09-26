import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { X, User, Mail, Phone, MapPin, Calendar, Shield, FileText, CreditCard, AlertCircle } from 'lucide-react';

const CustomerDetailsModal = ({ customer, isOpen, onClose }) => {
  if (!isOpen) return null;

  const customerDetails = {
    id: customer?.id || 1,
    name: customer?.name || "Unknown Customer",
    policy: customer?.policy || "No Policy",
    premium: customer?.premium || "N/A",
    status: customer?.status || "Unknown",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    dateOfBirth: "1985-03-15",
    occupation: "Software Engineer",
    annualIncome: "$85,000",
    emergencyContact: "John Johnson (Spouse) - +1 (555) 987-6543",
    kycStatus: "Verified",
    riskProfile: "Low Risk",
    totalPolicies: 2,
    totalClaims: 1,
    lastClaimDate: "2023-11-15",
    nextPremiumDue: "2024-02-15",
    paymentMethod: "Credit Card ending in 4567"
  };

  const policies = [
    {
      id: "POL-2024-001",
      type: "Health Insurance Premium",
      premium: "Ξ0.15/month",
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      coverage: "$500,000"
    },
    {
      id: "POL-2024-002", 
      type: "Life Insurance",
      premium: "Ξ0.08/month",
      status: "Active",
      startDate: "2023-06-01",
      endDate: "2024-05-31",
      coverage: "$250,000"
    }
  ];

  const claims = [
    {
      id: "CLM-2024-001",
      type: "Health",
      amount: "Ξ0.25",
      status: "Approved",
      date: "2023-11-15",
      description: "Emergency room visit for appendicitis"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-white/10 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{customerDetails.name}</h2>
                <p className="text-gray-400">Customer ID: CUST-{customerDetails.id.toString().padStart(4, '0')}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-white">{customerDetails.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-white">{customerDetails.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-white">{customerDetails.address}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-white">DOB: {customerDetails.dateOfBirth}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-white">Occupation: {customerDetails.occupation}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-white">Income: {customerDetails.annualIncome}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KYC & Risk Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5" />
                  KYC Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
                      {customerDetails.kycStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Risk Profile</span>
                    <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                      {customerDetails.riskProfile}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Emergency Contact</span>
                    <span className="text-white text-sm">{customerDetails.emergencyContact}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <FileText className="w-5 h-5" />
                  Account Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total Policies</span>
                    <span className="text-white font-semibold">{customerDetails.totalPolicies}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total Claims</span>
                    <span className="text-white font-semibold">{customerDetails.totalClaims}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Last Claim</span>
                    <span className="text-white text-sm">{customerDetails.lastClaimDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Next Premium</span>
                    <span className="text-white text-sm">{customerDetails.nextPremiumDue}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Policies */}
          <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5" />
                Active Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policies.map((policy) => (
                  <div key={policy.id} className="p-4 rounded-lg bg-white/5 border border-white/10 hover-scale-102 hover-glow-cyan-subtle">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{policy.type}</span>
                      <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
                        {policy.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Policy ID</span>
                        <p className="text-white">{policy.id}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Premium</span>
                        <p className="text-white">{policy.premium}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Coverage</span>
                        <p className="text-white">{policy.coverage}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Valid Until</span>
                        <p className="text-white">{policy.endDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Claims History */}
          <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="w-5 h-5" />
                Claims History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {claims.map((claim) => (
                  <div key={claim.id} className="p-3 rounded-lg bg-white/5 border border-white/10 hover-scale-102 hover-glow-cyan-subtle">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">{claim.type} Claim - {claim.id}</p>
                        <p className="text-gray-400 text-sm">{claim.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{claim.amount}</p>
                        <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                          {claim.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              Create New Policy
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" className="flex-1">
              <AlertCircle className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
