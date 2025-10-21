import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Shield, Check, Clock, ArrowLeft, ArrowRight, Upload, FileText } from "lucide-react";
import { userStore } from "../context/userContext";
import toast from "react-hot-toast";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserKYCForm = () => {
  const navigate = useNavigate();
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    aadhar_number: "",
    pan_number: "",
    dob: "",
    occupation: "",
    income: "",
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    aadhar: null,
    pan: null,
    photo: null
  });

  // Enhanced CSS classes
  const cardClass = "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 shadow-2xl rounded-2xl overflow-hidden hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500 backdrop-blur-sm";
  const inputClass = "w-full bg-gray-800/80 border border-gray-600 text-white placeholder:text-gray-400 p-4 text-base rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 focus:outline-none focus:shadow-lg focus:shadow-cyan-400/10";
  const buttonClass = "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/25 font-medium";
  const secondaryButtonClass = "bg-gray-700 hover:bg-gray-600 border border-gray-600 px-8 py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-medium";

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleFileUpload = (fileType, file) => {
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }
    setUploadedFiles(prev => ({ ...prev, [fileType]: file }));
  };

  const handleSendOTP = async () => {
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      toast.error("Enter valid 10-digit phone number");
      return;
    }
    setSendingOtp(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/kyc/send-otp`, {
        wallet_address: user.wallet_address,
        role: user.role,
        phone_number: formData.phone,
      });
      if (res.data.success) {
        setOtpSent(true);
        setResendTimer(60);
        toast.success("OTP sent successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return toast.error("Enter 6-digit OTP");
    setVerifyingOtp(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/kyc/verify-otp`, {
        wallet_address: user.wallet_address,
        otp
      });
      if (res.data.success) {
        setOtpVerified(true);
        toast.success("OTP verified successfully!");
      } else toast.error(res.data.message || "Invalid OTP");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error verifying OTP");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Valid 10-digit phone number is required";
      if (!/^\d{12}$/.test(formData.aadhar_number)) newErrors.aadhar_number = "12-digit Aadhar number is required";
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan_number.toUpperCase())) newErrors.pan_number = "Valid PAN number is required";
      if (!otpVerified) {
        toast.error("Please verify your mobile number first");
        return false;
      }
    }
    if (currentStep === 2) {
      if (!formData.dob) newErrors.dob = "Date of birth is required";
      if (!formData.occupation.trim()) newErrors.occupation = "Occupation is required";
      if (!formData.income) newErrors.income = "Income is required";
    }
    // if (currentStep === 3) {
    //   if (!uploadedFiles.aadhar) newErrors.aadhar = "Aadhar document is required";
    //   if (!uploadedFiles.pan) newErrors.pan = "PAN document is required";
    //   if (!uploadedFiles.photo) newErrors.photo = "Photograph is required";
    // }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (!validateStep()) return;
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async () => {
    console.log("handleSubmit called");
    if (!validateStep()) {
      console.log("Validation failed");
      return;
    }

    setIsSubmitting(true);
    console.log("Starting submission...");

    try {
      const payload = {
        wallet_address: user.wallet_address,
        role: user.role,
        ...formData,
      };

      console.log("Sending payload:", payload);
      console.log("URL:", `${BASE_URL}/api/kyc/submit`);

      const res = await axios.post(`${BASE_URL}/api/kyc/submit`, payload);


      if (res.data.success) {
        toast.success("KYC completed successfully!");
        const updatedUserRes = await axios.get(`${BASE_URL}/api/users/${user.wallet_address}`);
        setUser(updatedUserRes.data.user);
        navigate("/customer/dashboard");
      } else {
        toast.error(res.data.message || "Failed to submit KYC");
      }
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error message:", err.message);
      console.error("Error response data:", err.response?.data);
      console.error("Error response status:", err.response?.status);
      toast.error(err.response?.data?.message || "Submission error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Personal Details", icon: User },
    { number: 2, title: "Additional Info", icon: FileText },
    { number: 3, title: "Documents", icon: Upload }
  ];

  return (
    <div className="text-white w-full relative py-4">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center m-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-cyan-500/20 rounded-2xl">
              <Shield className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Complete Your KYC
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Secure your identity with our verification process</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${currentStep >= step.number
                  ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'border-gray-600 text-gray-400'
                  }`}>
                  {currentStep > step.number ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <span className={`ml-3 font-medium ${currentStep >= step.number ? 'text-cyan-400' : 'text-gray-400'
                  }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-8 rounded-full transition-all duration-500 ${currentStep > step.number ? 'bg-cyan-500' : 'bg-gray-600'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Personal Details */}
        {currentStep === 1 && (
          <Card className={cardClass}>
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-2xl font-semibold text-cyan-400 flex items-center gap-3">
                <User className="w-6 h-6" />
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Full Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={inputClass}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-400 text-sm flex items-center gap-1"><Clock className="w-4 h-4" /> {errors.name}</p>}
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Mobile Number *</Label>
                  <div className="flex gap-3">
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, ''))}
                      className={`${inputClass} flex-1`}
                      maxLength={10}
                      disabled={otpSent}
                      placeholder="10-digit mobile number"
                    />
                    {!otpSent ? (
                      <Button
                        onClick={handleSendOTP}
                        disabled={sendingOtp || formData.phone.length !== 10}
                        className="whitespace-nowrap"
                      >
                        {sendingOtp ? "Sending..." : "Send OTP"}
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">OTP Sent</span>
                      </div>
                    )}
                  </div>
                  {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
                </div>

                {otpSent && !otpVerified && (
                  <div className="col-span-full space-y-3">
                    <Label className="text-gray-300 font-medium">Enter OTP *</Label>
                    <div className="flex gap-3">
                      <Input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        className={`${inputClass} flex-1`}
                        maxLength={6}
                        placeholder="Enter 6-digit OTP"
                      />
                      <Button
                        onClick={handleVerifyOTP}
                        disabled={verifyingOtp || otp.length !== 6}
                        className="whitespace-nowrap"
                      >
                        {verifyingOtp ? "Verifying..." : "Verify OTP"}
                      </Button>
                    </div>
                    {resendTimer > 0 && (
                      <p className="text-gray-400 text-sm">Resend OTP in {resendTimer}s</p>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Aadhar Number *</Label>
                  <Input
                    value={formData.aadhar_number}
                    onChange={(e) => handleInputChange("aadhar_number", e.target.value.replace(/\D/g, ''))}
                    className={inputClass}
                    maxLength={12}
                    placeholder="12-digit Aadhar number"
                  />
                  {errors.aadhar_number && <p className="text-red-400 text-sm">{errors.aadhar_number}</p>}
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">PAN Number *</Label>
                  <Input
                    value={formData.pan_number}
                    onChange={(e) => handleInputChange("pan_number", e.target.value.toUpperCase())}
                    className={inputClass}
                    maxLength={10}
                    placeholder="e.g., ABCDE1234F"
                  />
                  {errors.pan_number && <p className="text-red-400 text-sm">{errors.pan_number}</p>}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleNextStep} disabled={!otpVerified} className={buttonClass}>
                  Next Step <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Additional Information */}
        {currentStep === 2 && (
          <Card className={cardClass}>
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-2xl font-semibold text-cyan-400 flex items-center gap-3">
                <FileText className="w-6 h-6" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Date of Birth *</Label>
                  <Input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    className={inputClass}
                  />
                  {errors.dob && <p className="text-red-400 text-sm">{errors.dob}</p>}
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Occupation *</Label>
                  <Input
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    className={inputClass}
                    placeholder="Your profession"
                  />
                  {errors.occupation && <p className="text-red-400 text-sm">{errors.occupation}</p>}
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Annual Income *</Label>
                  <Input
                    value={formData.income}
                    onChange={(e) => handleInputChange("income", e.target.value)}
                    className={inputClass}
                    placeholder="Annual income in INR"
                  />
                  {errors.income && <p className="text-red-400 text-sm">{errors.income}</p>}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button onClick={handlePrevStep} className={secondaryButtonClass}>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNextStep} className={buttonClass}>
                  Next Step <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Document Upload */}
        {currentStep === 3 && (
          <Card className={cardClass}>
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-2xl font-semibold text-cyan-400 flex items-center gap-3">
                <Upload className="w-6 h-6" />
                Document Upload (Not working for now please submit)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <Label className="text-gray-300 font-medium">Aadhar Card *</Label>
                  <div className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-all duration-300">
                    <Input 
                      type="file" 
                      onChange={(e) => handleFileUpload('aadhar', e.target.files[0])}
                      className="hidden" 
                      id="aadhar-upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="aadhar-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">Click to upload Aadhar card</p>
                      <p className="text-gray-500 text-sm">PDF, JPG, PNG (Max 5MB)</p>
                    </label>
                  </div>
                  {uploadedFiles.aadhar && (
                    <p className="text-green-400 text-sm flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      {uploadedFiles.aadhar.name}
                    </p>
                  )}
                  {errors.aadhar && <p className="text-red-400 text-sm">{errors.aadhar}</p>}
                </div>

                <div className="space-y-4">
                  <Label className="text-gray-300 font-medium">PAN Card *</Label>
                  <div className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-all duration-300">
                    <Input 
                      type="file" 
                      onChange={(e) => handleFileUpload('pan', e.target.files[0])}
                      className="hidden" 
                      id="pan-upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="pan-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">Click to upload PAN card</p>
                      <p className="text-gray-500 text-sm">PDF, JPG, PNG (Max 5MB)</p>
                    </label>
                  </div>
                  {uploadedFiles.pan && (
                    <p className="text-green-400 text-sm flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      {uploadedFiles.pan.name}
                    </p>
                  )}
                  {errors.pan && <p className="text-red-400 text-sm">{errors.pan}</p>}
                </div>

                <div className="space-y-4">
                  <Label className="text-gray-300 font-medium">Photograph *</Label>
                  <div className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-all duration-300">
                    <Input 
                      type="file" 
                      onChange={(e) => handleFileUpload('photo', e.target.files[0])}
                      className="hidden" 
                      id="photo-upload"
                      accept=".jpg,.jpeg,.png"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">Click to upload photograph</p>
                      <p className="text-gray-500 text-sm">JPG, PNG (Max 5MB)</p>
                    </label>
                  </div>
                  {uploadedFiles.photo && (
                    <p className="text-green-400 text-sm flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      {uploadedFiles.photo.name}
                    </p>
                  )}
                  {errors.photo && <p className="text-red-400 text-sm">{errors.photo}</p>}
                </div>
              </div> */}

              <div className="flex justify-between pt-4">
                <Button onClick={handlePrevStep} className={secondaryButtonClass}>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={buttonClass}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit KYC <Check className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserKYCForm;