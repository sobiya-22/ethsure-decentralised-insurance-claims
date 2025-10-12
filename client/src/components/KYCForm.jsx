import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, FileText, Check, AlertCircle, Smartphone, Key, Clock } from "lucide-react";
import { useAccount } from "wagmi";

import { 
  sendCustomerKYCOTP, 
  verifyCustomerKYCOTP, 
  resendCustomerKYCOTP,
  sendAgentKYCOTP,
  verifyAgentKYCOTP,
  resendAgentKYCOTP
} from "@/services/kycAPI";
import { submitAgentKYC } from "@/services/agentAPI";
import { submitCustomerKYC } from "@/services/customerAPI";

const KYCForm = ({ role = "customer" }) => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const [formData, setFormData] = useState({
    phone_number: "",
    otp: "",
    idType: "",
    idNumber: "",
    dateOfBirth: "",
    occupation: "",
    income: "",
    documents: [],
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  // Timer for resend OTP
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileUpload = (event) => {
    setFormData((prev) => ({
      ...prev,
      documents: Array.from(event.target.files),
    }));
    setErrors((prev) => ({ ...prev, documents: "" }));
  };

  // ---------- OTP FLOW ----------
  const handleSendOTP = async () => {
    try {
      if (!formData.phone_number) {
        setErrors({ phone_number: "Phone number is required" });
        return;
      }

      if (!/^\d{10}$/.test(formData.phone_number)) {
        setErrors({ phone_number: "Please enter a valid 10-digit phone number" });
        return;
      }

      if (!isConnected || !address) {
        alert("Please connect your wallet first!");
        return;
      }

      setSendingOtp(true);
      const walletAddress = address.toLowerCase();
      let response;

      if (role === "agent") {
        response = await sendAgentKYCOTP(walletAddress, formData.phone_number);
      } else {
        response = await sendCustomerKYCOTP(walletAddress, formData.phone_number);
      }

      if (response.success) {
        alert("OTP sent successfully!");
        setOtpSent(true);
        setResendTimer(60); // 60 seconds timer
      } else {
        alert(response.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      if (!formData.otp) {
        setErrors({ otp: "Please enter the OTP" });
        return;
      }

      if (formData.otp.length !== 6) {
        setErrors({ otp: "Please enter a valid 6-digit OTP" });
        return;
      }

      setVerifyingOtp(true);
      const walletAddress = address.toLowerCase();
      let response;

      if (role === "agent") {
        response = await verifyAgentKYCOTP(walletAddress, formData.otp);
      } else {
        response = await verifyCustomerKYCOTP(walletAddress, formData.otp);
      }

      if (response.success) {
        alert("OTP verified successfully!");
        setOtpVerified(true);
        setCurrentStep(2);
      } else {
        alert(response.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      alert(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setSendingOtp(true);
      const walletAddress = address.toLowerCase();
      let response;

      if (role === "agent") {
        response = await resendAgentKYCOTP(walletAddress);
      } else {
        response = await resendCustomerKYCOTP(walletAddress);
      }

      if (response.success) {
        alert("OTP resent successfully!");
        setResendTimer(60); // Reset timer to 60 seconds
        setFormData(prev => ({ ...prev, otp: "" })); // Clear previous OTP
      } else {
        alert(response.message || "Failed to resend OTP.");
      }
    } catch (err) {
      console.error("Error resending OTP:", err);
      alert(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  // ---------- STEP VALIDATION ----------
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.idType) newErrors.idType = "ID Type is required";
    if (!formData.idNumber) newErrors.idNumber = "ID Number is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.occupation) newErrors.occupation = "Occupation is required";
    if (!formData.income) newErrors.income = "Income range is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.documents || formData.documents.length === 0) {
      newErrors.documents = "At least one document is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 2 && !validateStep1()) return;
    if (currentStep === 3 && !validateStep2()) return;
    setCurrentStep((prev) => prev + 1);
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async () => {
    try {
      if (!isConnected || !address) {
        alert("Please connect your wallet first!");
        return;
      }

      setLoading(true);

      const payload = {
        ...formData,
        wallet_address: address.toLowerCase(),
        role: role
      };

      console.log("Submitting KYC payload:", payload);

      let response;
      if (role === "agent") {
        response = await submitAgentKYC(payload);
      } else {
        response = await submitCustomerKYC(payload);
      }

      if (response.data.success || response.success) {
        alert("KYC submitted successfully!");
        navigate(role === "agent" ? "/agent-dashboard" : "/customer-dashboard");
      } else {
        alert(response.data.message || response.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("KYC submission failed:", err);
      alert(err.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- STYLES ----------
  const cardClass =
    "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 shadow-xl rounded-2xl overflow-hidden";
  const inputClass =
    "w-full p-2 xs:p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all text-sm xs:text-base";
  const selectClass =
    "w-full p-2 xs:p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all text-sm xs:text-base";

  return (
    <div className="container mx-auto p-3 xs:p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6 xs:space-y-8 sm:space-y-12 lg:space-y-16">

        {/* ---------- STEP 1: OTP Verification ---------- */}
        {currentStep === 1 && (
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-white text-xl sm:text-2xl">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-cyan-400" />
                KYC Verification - {role === "agent" ? "Agent" : "Customer"} OTP Step
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 sm:space-y-8">
              <div>
                <Label htmlFor="phone_number" className="text-white/90 font-medium text-lg">
                  Phone Number
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="phone_number"
                    type="text"
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange("phone_number", e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter your 10-digit phone number"
                    className={`${inputClass} flex-1`}
                    maxLength={10}
                    disabled={otpSent}
                  />
                  {!otpSent && (
                    <Button
                      onClick={handleSendOTP}
                      disabled={sendingOtp || !formData.phone_number || formData.phone_number.length !== 10}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 whitespace-nowrap"
                    >
                      {sendingOtp ? "Sending..." : "Send OTP"}
                    </Button>
                  )}
                </div>
                {errors.phone_number && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
                )}
              </div>

              {otpSent && !otpVerified && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <p className="text-blue-400 font-medium">OTP sent to {formData.phone_number}</p>
                    </div>
                    <p className="text-white/60 text-sm">Please enter the 6-digit OTP to verify your phone number</p>
                  </div>

                  <div>
                    <Label htmlFor="otp" className="text-white/90 font-medium text-lg">
                      Enter OTP
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      value={formData.otp}
                      onChange={(e) => handleInputChange("otp", e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter the 6-digit OTP"
                      className={inputClass}
                      maxLength={6}
                    />
                    {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
                  </div>

                  <div className="flex items-center gap-3">
                    <Button 
                      onClick={handleVerifyOTP} 
                      disabled={verifyingOtp || formData.otp.length !== 6} 
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      {verifyingOtp ? "Verifying..." : "Verify OTP"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleResendOTP}
                      disabled={sendingOtp || resendTimer > 0}
                      className="border-white/20 text-white hover:bg-white/5"
                    >
                      {sendingOtp ? "Sending..." : resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                    </Button>
                  </div>
                </div>
              )}

              {otpVerified && (
                <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <p className="text-green-400 font-medium">Phone number verified successfully!</p>
                  </div>
                  <p className="text-white/60 text-sm mt-1">You can now proceed to the next step</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ---------- STEP 2: Personal Info ---------- */}
        {otpVerified && currentStep === 2 && (
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-white text-xl sm:text-2xl">
                <User className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-cyan-400" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* ID Type */}
                <div>
                  <Label className="text-white/90 font-medium text-base sm:text-lg">ID Type</Label>
                  <select
                    value={formData.idType}
                    onChange={(e) => handleInputChange("idType", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select ID Type</option>
                    <option value="aadhar">Aadhar Card</option>
                    <option value="pan">PAN Card</option>
                    <option value="passport">Passport</option>
                    <option value="driving_license">Driving License</option>
                  </select>
                  {errors.idType && <p className="text-red-500 text-sm mt-1">{errors.idType}</p>}
                </div>

                {/* ID Number */}
                <div>
                  <Label className="text-white/90 font-medium text-base sm:text-lg">ID Number</Label>
                  <Input
                    type="text"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
                    placeholder="Enter ID Number"
                    className={inputClass}
                  />
                  {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
                </div>

                {/* Date of Birth */}
                <div>
                  <Label className="text-white/90 font-medium text-base sm:text-lg">Date of Birth</Label>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className={inputClass}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>

                {/* Occupation */}
                <div>
                  <Label className="text-white/90 font-medium text-base sm:text-lg">Occupation</Label>
                  <Input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    placeholder="Enter Occupation"
                    className={inputClass}
                  />
                  {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
                </div>

                {/* Income Range */}
                <div className="sm:col-span-2">
                  <Label className="text-white/90 font-medium text-base sm:text-lg">Annual Income Range</Label>
                  <select
                    value={formData.income}
                    onChange={(e) => handleInputChange("income", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select Income Range</option>
                    <option value="below_3">Below ₹3 Lakhs</option>
                    <option value="3_to_5">₹3-5 Lakhs</option>
                    <option value="5_to_10">₹5-10 Lakhs</option>
                    <option value="10_to_25">₹10-25 Lakhs</option>
                    <option value="above_25">Above ₹25 Lakhs</option>
                  </select>
                  {errors.income && <p className="text-red-500 text-sm mt-1">{errors.income}</p>}
                </div>
              </div>

              <div className="flex justify-end pt-4 sm:pt-6">
                <Button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ---------- STEP 3: Document Upload ---------- */}
        {currentStep === 3 && (
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-white text-xl sm:text-2xl">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-cyan-400" />
                Document Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <Label className="text-white/90 font-medium text-lg">
                  Upload Documents
                </Label>
                <p className="text-white/60 text-sm">Please upload ID proof, address proof, and photo</p>
                <Input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="bg-white/5 border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 cursor-pointer"
                />
                {formData.documents.length > 0 && (
                  <div className="text-white/70 text-sm">
                    {formData.documents.length} file(s) selected
                  </div>
                )}
                {errors.documents && (
                  <p className="text-red-500 text-sm mt-1">{errors.documents}</p>
                )}
              </div>

              <div className="flex justify-between pt-4 sm:pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(2)}
                  className="border-white/20 text-white hover:bg-white/5"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ---------- STEP 4: Review & Submit ---------- */}
        {currentStep === 4 && (
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-white text-xl sm:text-2xl">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-cyan-400" />
                Review & Submit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 sm:space-y-8">
              <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-amber-400" />
                  <h3 className="font-medium text-amber-400 text-xl">Important Notice</h3>
                </div>
                <p className="text-amber-200 text-lg">
                  Please review your information before final submission. KYC verification typically takes 24–48 hours.
                </p>
              </div>

              {/* Review info */}
              <div className="space-y-4 bg-white/5 rounded-xl p-6">
                <h3 className="text-white font-semibold text-lg mb-4">Review Your Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/60">Phone Number:</p>
                    <p className="text-white">{formData.phone_number}</p>
                  </div>
                  <div>
                    <p className="text-white/60">ID Type:</p>
                    <p className="text-white">{formData.idType}</p>
                  </div>
                  <div>
                    <p className="text-white/60">ID Number:</p>
                    <p className="text-white">{formData.idNumber}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Date of Birth:</p>
                    <p className="text-white">{formData.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Occupation:</p>
                    <p className="text-white">{formData.occupation}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Income Range:</p>
                    <p className="text-white">{formData.income}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-white/60">Documents Uploaded:</p>
                    <p className="text-white">{formData.documents.length} file(s)</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 sm:pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(3)}
                  className="border-white/20 text-white hover:bg-white/5"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  {loading ? "Submitting..." : "Submit KYC"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default KYCForm;