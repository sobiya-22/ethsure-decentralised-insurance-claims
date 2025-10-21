import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, User, Calendar, Phone, Mail, MapPin, CreditCard, FileText, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { userStore } from "@/context/userContext";
import toast from "react-hot-toast";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PolicyForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = userStore((state) => state.user);

  const selectedAgent = location.state?.selectedAgent;

  const [formData, setFormData] = useState({
    fullName: user?.customer?.customer_name || "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    phone: user?.customer?.customer_phone || "",
    email: user?.customer?.customer_email || "",
    address: "",

    aadharNumber: "",
    panNumber: "",

    annualIncome: "",
    occupation: "",
    coverage_amount: 1000000,
    premium_amount: 50000,
    premium_frequency: "annual",
    policy_duration: 10,
  });

  const onClose = async () => {
    navigate(-1);
  };

  const handleInputChange = (field, value) => {
    if (field === 'aadharNumber') {
      const cleanedValue = value.replace(/\D/g, '').slice(0, 12);
      setFormData(prev => ({
        ...prev,
        [field]: cleanedValue
      }));
      return;
    }

    if (field === 'panNumber') {
      const cleanedValue = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [field]: cleanedValue
      }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateAadhar = (aadhar) => {
    return /^\d{12}$/.test(aadhar);
  };

  const validatePAN = (pan) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };

  const handleCreatePolicy = async (e) => {
  e.preventDefault();
  setLoading(true);

  const requiredFields = {
    fullName: formData.fullName,
    dateOfBirth: formData.dateOfBirth,
    gender: formData.gender,
    phone: formData.phone,
    email: formData.email,
    address: formData.address,
    aadharNumber: formData.aadharNumber,
    panNumber: formData.panNumber,
    annualIncome: formData.annualIncome,
    occupation: formData.occupation
  };

  const emptyFields = Object.entries(requiredFields)
    .filter(([key, value]) => !value || value.trim() === '')
    .map(([key]) => key);

  if (emptyFields.length > 0) {
    toast.error(`Please fill in all required fields: ${emptyFields.join(', ')}`);
    setLoading(false);
    return;
  }

  if (!validateAadhar(formData.aadharNumber)) {
    toast.error("Please enter a valid 12-digit Aadhar number");
    setLoading(false);
    return;
  }

  if (!validatePAN(formData.panNumber)) {
    toast.error("Please enter a valid PAN number (Format: ABCDE1234F)");
    setLoading(false);
    return;
  }

  if (!selectedAgent) {
    toast.error("No agent selected. Please go back and select an agent.");
    setLoading(false);
    return;
  }

  try {
    const policyData = {
      customer_wallet_address: user?.wallet_address || user?.wallet,
      agent_wallet_address: selectedAgent.wallet_address,
      ...formData,
      status: "created"
    };

    console.log("Sending policy data:", policyData);

    const response = await axios.post(`${BASE_URL}/api/policy/create`, policyData, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("Policy creation response:", response.data);

    if (response.data?.success) {
      toast.success("Thank you for your policy request! Your agent will reach out to you soon.");
      navigate('/customer/dashboard');
    } else {
      toast.error(response.data?.message || "Failed to create policy");
    }
  } catch (error) {
    console.error("Error creating policy:", error);
    toast.error(`Failed to create policy. Please try again.\n\nError: ${error.response?.data?.message || error.message}`);
  } finally {
    setLoading(false);
  }
};

  const InlineLoader = () => (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      <span>Creating Policy...</span>
    </div>
  );

  return (
    <div className="text-white w-full relative bg-transparent">
      <div className="space-y-6 px-3 xs:px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        {/* Header */}
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 xs:gap-3">
              <div className="p-1.5 xs:p-2 rounded-lg glass"><FileText className="w-5 h-5 xs:w-6 xs:h-6 text-cyan-400" /></div>
              <div>
                <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Create <span className="gradient-text">Policy Request</span>
                </h1>
                <p className="text-sm xs:text-base text-gray-300">
                  Fill out the form below to request a new insurance policy
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 xs:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white border border-white/20 hover:border-white/40"
            >
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </div>

        {/* Form Content */}
        <div
          className="max-h-[75vh] overflow-y-auto pr-2 policy-form-scroll"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
          }}
        >
          <div className="glass border border-white/20 shadow-2xl p-6">
            <div className="space-y-6">
              {/* Agent Info */}
              {selectedAgent && (
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Selected Agent
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center overflow-hidden border border-white/20">
                      {selectedAgent.profile_photo_url && typeof selectedAgent.profile_photo_url === "string" ? (
                        <img
                          src={selectedAgent.profile_photo_url}
                          alt={selectedAgent.agent_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-sm">
                          {selectedAgent.agent_name
                            ?.split(' ')
                            .map(n => n[0])
                            .join('')
                            .toUpperCase() || 'A'}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-lg">{selectedAgent.agent_name}</p>
                      <p className="text-gray-400 text-sm">{selectedAgent.agent_email}</p>
                      <p className="text-gray-500 text-xs font-mono mt-1">
                        Wallet: {selectedAgent.wallet_address?.slice(0, 8)}...{selectedAgent.wallet_address?.slice(-6)}
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium border border-emerald-500/30">
                      Verified
                    </div>
                  </div>
                </div>
              )}

              {/* Rest of the form remains the same */}
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Personal Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-300">Full Name *</Label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName || ""}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      readOnly={false}
                      required
                      autoComplete="name"
                      placeholder="Enter your full name"
                      className="flex h-9 xs:h-10 w-full rounded-md border border-white/20 bg-white/5 px-2 xs:px-3 py-1.5 xs:py-2 text-sm xs:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent focus:border-blue-400"
                      style={{
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        pointerEvents: 'auto',
                        zIndex: 10
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth" className="text-gray-300">Date of Birth *</Label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth || ""}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      required
                      autoComplete="bday"
                      className="flex h-9 xs:h-10 w-full rounded-md border border-white/20 bg-white/5 px-2 xs:px-3 py-1.5 xs:py-2 text-sm xs:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent focus:border-blue-400"
                      style={{
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="gender" className="text-gray-300">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20">
                        <SelectItem value="Male" className="text-white hover:bg-white/10 focus:bg-white/10">Male</SelectItem>
                        <SelectItem value="Female" className="text-white hover:bg-white/10 focus:bg-white/10">Female</SelectItem>
                        <SelectItem value="Other" className="text-white hover:bg-white/10 focus:bg-white/10">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="maritalStatus" className="text-gray-300">Marital Status</Label>
                    <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange("maritalStatus", value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20">
                        <SelectItem value="Single" className="text-white hover:bg-white/10 focus:bg-white/10">Single</SelectItem>
                        <SelectItem value="Married" className="text-white hover:bg-white/10 focus:bg-white/10">Married</SelectItem>
                        <SelectItem value="Divorced" className="text-white hover:bg-white/10 focus:bg-white/10">Divorced</SelectItem>
                        <SelectItem value="Widowed" className="text-white hover:bg-white/10 focus:bg-white/10">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone || ""}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      autoComplete="tel"
                      placeholder="Enter your phone number"
                      className="flex h-9 xs:h-10 w-full rounded-md border border-white/20 bg-white/5 px-2 xs:px-3 py-1.5 xs:py-2 text-sm xs:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent focus:border-blue-400"
                      style={{
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email *</Label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      autoComplete="email"
                      placeholder="Enter your email"
                      className="flex h-9 xs:h-10 w-full rounded-md border border-white/20 bg-white/5 px-2 xs:px-3 py-1.5 xs:py-2 text-sm xs:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent focus:border-blue-400"
                      style={{
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-gray-300">Address *</Label>
                  <textarea
                    id="address"
                    value={formData.address || ""}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                    autoComplete="street-address"
                    placeholder="Enter your full address"
                    className="flex min-h-[60px] w-full rounded-md border border-white/20 bg-white/5 px-2 xs:px-3 py-1.5 xs:py-2 text-sm xs:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent focus:border-blue-400"
                    rows={3}
                    style={{
                      color: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderColor: 'rgba(255, 255, 255, 0.2)'
                    }}
                  />
                </div>
              </div>

              {/* Identification */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Identification
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="aadharNumber" className="text-gray-300">Aadhar Number *</Label>
                    <input
                      id="aadharNumber"
                      type="text"
                      value={formData.aadharNumber || ""}
                      onChange={(e) => handleInputChange("aadharNumber", e.target.value)}
                      required
                      placeholder="123456789012"
                      maxLength={12}
                      className="flex h-9 xs:h-10 w-full rounded-md border border-white/20 bg-white/5 px-2 xs:px-3 py-1.5 xs:py-2 text-sm xs:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent focus:border-blue-400"
                      style={{
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                    <p className="text-xs text-gray-400 mt-1">Enter 12 digits only (no spaces or special characters)</p>
                  </div>

                  <div>
                    <Label htmlFor="panNumber" className="text-gray-300">PAN Number *</Label>
                    <input
                      id="panNumber"
                      type="text"
                      value={formData.panNumber || ""}
                      onChange={(e) => handleInputChange("panNumber", e.target.value)}
                      required
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      className="flex h-9 xs:h-10 w-full rounded-md border border-white/20 bg-white/5 px-2 xs:px-3 py-1.5 xs:py-2 text-sm xs:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent focus:border-blue-400"
                      style={{
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                    <p className="text-xs text-gray-400 mt-1">Format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)</p>
                  </div>
                </div>
              </div>

              {/* Financial Info */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Financial Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="annualIncome" className="text-gray-300">Annual Income *</Label>
                    <input
                      id="annualIncome"
                      type="number"
                      value={formData.annualIncome || ""}
                      onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                      required
                      autoComplete="off"
                      placeholder="500000"
                      className="flex h-9 xs:h-10 w-full rounded-md border border-white/20 bg-white/5 px-2 xs:px-3 py-1.5 xs:py-2 text-sm xs:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent focus:border-blue-400"
                      style={{
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="occupation" className="text-gray-300">Occupation *</Label>
                    <Select value={formData.occupation} onValueChange={(value) => handleInputChange("occupation", value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select occupation" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20">
                        <SelectItem value="Salaried" className="text-white hover:bg-white/10 focus:bg-white/10">Salaried</SelectItem>
                        <SelectItem value="Self-Employed" className="text-white hover:bg-white/10 focus:bg-white/10">Self-Employed</SelectItem>
                        <SelectItem value="Business" className="text-white hover:bg-white/10 focus:bg-white/10">Business</SelectItem>
                        <SelectItem value="Student" className="text-white hover:bg-white/10 focus:bg-white/10">Student</SelectItem>
                        <SelectItem value="Retired" className="text-white hover:bg-white/10 focus:bg-white/10">Retired</SelectItem>
                        <SelectItem value="Other" className="text-white hover:bg-white/10 focus:bg-white/10">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="coverage_amount" className="text-gray-300">Coverage Amount</Label>
                    <input
                      id="coverage_amount"
                      type="number"
                      value={formData.coverage_amount || ""}
                      onChange={(e) => handleInputChange("coverage_amount", e.target.value)}
                      autoComplete="off"
                      className="flex h-9 xs:h-10 w-full rounded-md border border-white/20 bg-white/5 px-2 xs:px-3 py-1.5 xs:py-2 text-sm xs:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent focus:border-blue-400"
                      style={{
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="premium_amount" className="text-gray-300">Premium Amount</Label>
                    <input
                      id="premium_amount"
                      type="number"
                      value={formData.premium_amount || ""}
                      onChange={(e) => handleInputChange("premium_amount", e.target.value)}
                      autoComplete="off"
                      className="flex h-9 xs:h-10 w-full rounded-md border border-white/20 bg-white/5 px-2 xs:px-3 py-1.5 xs:py-2 text-sm xs:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent focus:border-blue-400"
                      style={{
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="premium_frequency" className="text-gray-300">Premium Frequency</Label>
                    <Select value={formData.premium_frequency} onValueChange={(value) => handleInputChange("premium_frequency", value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20">
                        <SelectItem value="monthly" className="text-white hover:bg-white/10 focus:bg-white/10">Monthly</SelectItem>
                        <SelectItem value="quarterly" className="text-white hover:bg-white/10 focus:bg-white/10">Quarterly</SelectItem>
                        <SelectItem value="semi-annual" className="text-white hover:bg-white/10 focus:bg-white/10">Semi-Annual</SelectItem>
                        <SelectItem value="annual" className="text-white hover:bg-white/10 focus:bg-white/10">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="policy_duration" className="text-gray-300">Policy Duration (Years)</Label>
                    <input
                      id="policy_duration"
                      type="number"
                      value={formData.policy_duration || ""}
                      onChange={(e) => handleInputChange("policy_duration", e.target.value)}
                      autoComplete="off"
                      className="flex h-9 xs:h-10 w-full rounded-md border border-white/20 bg-white/5 px-2 xs:px-3 py-1.5 xs:py-2 text-sm xs:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent focus:border-blue-400"
                      style={{
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleCreatePolicy}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {loading ? <InlineLoader /> : "Create Policy Request"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyForm;