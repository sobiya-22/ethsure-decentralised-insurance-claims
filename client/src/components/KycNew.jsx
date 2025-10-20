import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Phone, CreditCard, FileText, Check, AlertCircle, Shield, Clock } from "lucide-react";
import { useAccount } from "wagmi";
import { InlineLoader } from "@/components/ui/Loader";

import { 
  sendCustomerKYCOTP, 
  verifyCustomerKYCOTP, 
  resendCustomerKYCOTP,
  sendAgentKYCOTP,
  verifyAgentKYCOTP,
  resendAgentKYCOTP
} from "@/services/kycAPI";

// Wrapper functions to maintain compatibility with existing code
const submitAgentKYC = async (kycData) => {
  try {
    await sendAgentKYCOTP(kycData.wallet_address, kycData.agent_phone);
    return { success: true, message: "KYC process initiated" };
  } catch (error) {
    throw error;
  }
};

const submitCustomerKYC = async (kycData) => {
  try {
    await sendCustomerKYCOTP(kycData.wallet_address, kycData.customer_phone);
    return { success: true, message: "KYC process initiated" };
  } catch (error) {
    throw error;
  }
};

const KycNew = ({ role = "customer", onClose }) => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    aadhar_number: "",
    pan_number: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // CSS classes for consistent styling
  const cardClass = "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 shadow-xl rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300";
  const inputClass = "w-full bg-gray-800 border border-gray-600 text-white placeholder:text-gray-400 p-3 text-base rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 focus:outline-none";
  const buttonClass = "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-3 text-lg rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed";

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
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  // OTP Functions based on role
  const handleSendOTP = async () => {
    if (!formData.phone.trim()) {
      setErrors(prev => ({ ...prev, phone: "Phone number is required to send OTP" }));
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setErrors(prev => ({ ...prev, phone: "Please enter a valid 10-digit phone number" }));
      return;
    }

    setSendingOtp(true);
    try {
      const walletAddress = address.toLowerCase();
      let response;

      if (role === "agent") {
        response = await sendAgentKYCOTP(walletAddress, formData.phone);
      } else {
        response = await sendCustomerKYCOTP(walletAddress, formData.phone);
      }

      if (response.success) {
        setOtpSent(true);
        setResendTimer(60); // 60 seconds timer
        alert("OTP sent successfully to your mobile number!");
      } else {
        alert(response.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP send error:", error);
      alert(error.response?.data?.message || "An error occurred while sending OTP. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      alert("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setVerifyingOtp(true);
    try {
      const walletAddress = address.toLowerCase();
      let response;

      if (role === "agent") {
        response = await verifyAgentKYCOTP(walletAddress, otp);
      } else {
        response = await verifyCustomerKYCOTP(walletAddress, otp);
      }

      if (response.success) {
        setOtpVerified(true);
        alert("OTP verified successfully!");
      } else {
        alert(response.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verify error:", error);
      alert(error.response?.data?.message || "An error occurred while verifying OTP. Please try again.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleResendOTP = async () => {
    setSendingOtp(true);
    try {
      const walletAddress = address.toLowerCase();
      let response;

      if (role === "agent") {
        response = await resendAgentKYCOTP(walletAddress);
      } else {
        response = await resendCustomerKYCOTP(walletAddress);
      }

      if (response.success) {
        setResendTimer(60); // Reset timer to 60 seconds
        setOtp(""); // Clear previous OTP
        alert("OTP resent successfully!");
      } else {
        alert(response.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP resend error:", error);
      alert(error.response?.data?.message || "An error occurred while resending OTP. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = "Invalid phone number";
    
    if (!formData.aadhar_number.trim()) newErrors.aadhar_number = "Aadhar number is required";
    else if (!/^\d{12}$/.test(formData.aadhar_number.replace(/\D/g, ''))) newErrors.aadhar_number = "Aadhar number must be 12 digits";
    
    if (!formData.pan_number.trim()) newErrors.pan_number = "PAN number is required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan_number.toUpperCase())) newErrors.pan_number = "Invalid PAN format";

    if (!otpVerified) {
      alert("Please verify your mobile number with OTP before submitting KYC.");
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const kycData = {
        wallet_address: address.toLowerCase(),
        ...formData,
        role: role
      };

      let response;
      if (role === "agent") {
        response = await submitAgentKYC(kycData);
      } else {
        response = await submitCustomerKYC(kycData);
      }

      if (response.data.success || response.success) {
        alert("KYC submitted successfully!");
        if (onClose) {
          onClose();
        } else {
          // Navigate based on role
          navigate(role === "agent" ? "/agent-dashboard" : "/customer/dashboard");
        }
      } else {
        alert(response.data.message || response.message || "Failed to submit KYC. Please try again.");
      }
    } catch (error) {
      console.error("KYC submission error:", error);
      alert(error.response?.data?.message || "An error occurred while submitting KYC. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-white w-full relative">
      <div className="space-y-4 sm:space-y-6 px-3 xs:px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        {/* Header */}
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 xs:gap-3">
              <div className="p-1.5 xs:p-2 rounded-lg glass">
                <Shield className="w-5 h-5 xs:w-6 xs:h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Complete Your <span className="gradient-text">KYC</span>
                </h1>
                <p className="text-lg text-gray-300">
                  {role === "agent" ? "Agent" : "Customer"} Verification Process
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KYC Form */}
        <div className="w-full mx-auto no-scrollbar">
          <Card className={cardClass}>
            <CardContent className="px-4 py-4">
              <div className="space-y-4">
                {/* Personal Information Section */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                    <User className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Personal Information</h2>
                    <p className="text-gray-400 text-sm">Please provide your basic details for verification</p>
                  </div>
                </div>

                {/* OTP Verification Card */}
                {otpSent && !otpVerified && (
                  <Card className="glass border border-blue-500/30">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                            <Clock className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">Verify Mobile Number</h3>
                            <p className="text-gray-400 text-sm">Enter the 6-digit OTP sent to {formData.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            className={`${inputClass} flex-1`}
                            maxLength={6}
                          />
                          <Button
                            onClick={handleVerifyOTP}
                            disabled={verifyingOtp || otp.length !== 6}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
                          >
                            {verifyingOtp ? (
                              <InlineLoader />
                            ) : (
                              "Verify"
                            )}
                          </Button>
                        </div>
                        
                        <div className="flex justify-center">
                          <Button
                            onClick={handleResendOTP}
                            disabled={sendingOtp || resendTimer > 0}
                            variant="outline"
                            className="text-blue-400 border-blue-400/30 hover:bg-blue-400/10 px-4 py-2 rounded-lg transition-all duration-200"
                          >
                            {sendingOtp ? (
                              <InlineLoader />
                            ) : resendTimer > 0 ? (
                              `Resend OTP in ${resendTimer}s`
                            ) : (
                              "Resend OTP"
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* OTP Verified Success */}
                {otpVerified && (
                  <Card className="glass border border-green-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                          <Check className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-green-400">Mobile Number Verified</h3>
                          <p className="text-gray-400 text-sm">Your mobile number {formData.phone} has been verified successfully</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <Label className="text-white font-semibold text-lg">Full Name *</Label>
                   <Input
                     type="text"
                     placeholder="Enter your full name"
                     value={formData.name}
                     onChange={(e) => handleInputChange("name", e.target.value)}
                     className={inputClass}
                   />
                   {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                 </div>

                 <div className="space-y-2">
                   <Label className="text-white font-semibold text-lg">Mobile Number *</Label>
                   <div className="flex gap-2">
                     <Input
                       type="tel"
                       placeholder="Enter your 10-digit mobile number"
                       value={formData.phone}
                       onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, ''))}
                       className={`${inputClass} flex-1`}
                       maxLength={10}
                       disabled={otpSent}
                     />
                     {!otpSent ? (
                       <Button
                         onClick={handleSendOTP}
                         disabled={sendingOtp || !formData.phone.trim() || formData.phone.length !== 10}
                         className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-4 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 whitespace-nowrap"
                       >
                         {sendingOtp ? (
                           <InlineLoader />
                         ) : (
                           "Send OTP"
                         )}
                       </Button>
                     ) : (
                       <div className="flex items-center gap-2 px-3 py-3 rounded-xl bg-green-500/20 border border-green-500/30">
                         <Check className="w-4 h-4 text-green-400" />
                         <span className="text-green-400 text-sm font-medium whitespace-nowrap">OTP Sent</span>
                       </div>
                     )}
                   </div>
                   {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                 </div>

                 <div className="space-y-2">
                   <Label className="text-white font-semibold text-lg">Aadhar Number *</Label>
                   <Input
                     type="text"
                     placeholder="Enter 12-digit Aadhar number"
                     value={formData.aadhar_number}
                     onChange={(e) => handleInputChange("aadhar_number", e.target.value.replace(/\D/g, ''))}
                     className={inputClass}
                     maxLength={12}
                   />
                   {errors.aadhar_number && <p className="text-red-400 text-sm mt-1">{errors.aadhar_number}</p>}
                 </div>

                 <div className="space-y-2">
                   <Label className="text-white font-semibold text-lg">PAN Number *</Label>
                   <Input
                     type="text"
                     placeholder="Enter PAN number (e.g., ABCDE1234F)"
                     value={formData.pan_number}
                     onChange={(e) => handleInputChange("pan_number", e.target.value.toUpperCase())}
                     className={inputClass}
                     maxLength={10}
                   />
                   {errors.pan_number && <p className="text-red-400 text-sm mt-1">{errors.pan_number}</p>}
                 </div>
               </div>

              <div className="flex justify-center pt-6">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !otpVerified}
                  className={buttonClass}
                >
                  {isSubmitting ? (
                    <InlineLoader />
                  ) : !otpVerified ? (
                    <>
                      <Clock className="w-5 h-5 mr-2" />
                      Verify Mobile First
                    </>
                  ) : (
                    'Complete KYC'
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default KycNew;