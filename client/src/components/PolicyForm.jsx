import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, User, Calendar, Phone, Mail, MapPin, CreditCard, FileText } from "lucide-react";
import { createPolicy } from "@/services/policyAPI";
import { InlineLoader } from "@/components/ui/Loader";
import { useToast } from "@/components/ui/toast-provider";

const PolicyForm = ({ agent, customer, onClose, onSuccess, isReadOnly = false }) => {
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: customer?.customer_name || "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    phone: customer?.customer_phone || "",
    email: customer?.customer_email || "",
    address: "",
    
    // Identification
    aadharNumber: "",
    panNumber: "",
    
    // Financial Info
    annualIncome: "",
    occupation: "",
    coverage_amount: 1000000,
    premium_amount: 50000,
    premium_frequency: "annual",
    policy_duration: 20,
  });

  const handleInputChange = (field, value) => {
    // Validation for Aadhar number (12 digits only)
    if (field === 'aadharNumber') {
      // Remove any non-digit characters and limit to 12 digits
      const cleanedValue = value.replace(/\D/g, '').slice(0, 12);
      setFormData(prev => ({
        ...prev,
        [field]: cleanedValue
      }));
      return;
    }

    // Validation for PAN number (10 characters: 5 letters + 4 digits + 1 letter)
    if (field === 'panNumber') {
      // Convert to uppercase and remove any non-alphanumeric characters
      const cleanedValue = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [field]: cleanedValue
      }));
      return;
    }

    // For all other fields, update normally
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Validation functions
  const validateAadhar = (aadhar) => {
    return /^\d{12}$/.test(aadhar);
  };

  const validatePAN = (pan) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
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

    console.log("Form data before validation:", formData);
    console.log("Required fields check:", requiredFields);

    // Check for empty required fields
    const emptyFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value || value.trim() === '')
      .map(([key]) => key);

          if (emptyFields.length > 0) {
            showError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
            setLoading(false);
            return;
          }

    // Validate Aadhar number
    if (!validateAadhar(formData.aadharNumber)) {
      showError("Please enter a valid 12-digit Aadhar number");
      setLoading(false);
      return;
    }

    // Validate PAN number
    if (!validatePAN(formData.panNumber)) {
      showError("Please enter a valid PAN number (Format: ABCDE1234F)");
      setLoading(false);
      return;
    }

    try {
      // Calculate dates
      const issueDate = new Date();
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + formData.policy_duration);

      // Prepare policy data
      const policyData = {
        customer_wallet: customer?.wallet_address || customer?.wallet,
        agent_wallet: agent?.wallet_address,
        issueDate: issueDate.toISOString(),
        expiryDate: expiryDate.toISOString(),
        ...formData,
        status: "created"
      };

      console.log("Sending policy data:", policyData);
      console.log("Customer data:", customer);
      console.log("Agent data:", agent);
      console.log("Customer wallet:", customer?.wallet_address || customer?.wallet);
      console.log("Agent wallet:", agent?.wallet_address);

      const response = await createPolicy(policyData);
      
      console.log("Policy creation response:", response);
      
      if (response.data?.success) {
        // Show success toast notification
        showSuccess("Thank you for your policy request! Your agent will reach out to you soon.");
        onSuccess?.(response.data);
        onClose();
      } else {
        throw new Error(response.data?.message || "Failed to create policy");
      }
    } catch (error) {
      console.error("Error creating policy:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
      showError(`Failed to create policy. Please try again.\n\nError: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

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
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold mb-2">Selected Agent</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {agent?.agent_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'A'}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold">{agent?.agent_name}</p>
                  <p className="text-gray-400 text-sm">{agent?.agent_email}</p>
                </div>
              </div>
            </div>

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
                    readOnly={isReadOnly}
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

            {/* Submit Buttons */}
            {!isReadOnly && (
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
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {loading ? <InlineLoader /> : "Create Policy Request"}
                </Button>
              </div>
            )}
            
            {/* Read-only mode close button */}
            {isReadOnly && (
              <div className="flex justify-center pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Close
                </Button>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyForm;
