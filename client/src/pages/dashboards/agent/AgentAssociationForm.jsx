import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building, User, Check, Clock, ArrowLeft, ArrowRight, Shield, FileText, Send } from "lucide-react";
import { userStore } from "@/context/userContext"
import toast from "react-hot-toast";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AgentAssociationForm = () => {
  const navigate = useNavigate();
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    license_number: "",
    experience_years: "",
    specialization: "",
    previous_companies: "",
    why_ethsure: "",
    expected_commission: "",
    terms_accepted: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    license_document: null,
    resume: null
  });

  const cardClass = "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 shadow-2xl rounded-2xl overflow-hidden hover:border-amber-400/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] transition-all duration-500 backdrop-blur-sm";
  const inputClass = "w-full bg-gray-800/80 border border-gray-600 text-white placeholder:text-gray-400 p-4 text-base rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300 focus:outline-none focus:shadow-lg focus:shadow-amber-400/10";
  const buttonClass = "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 px-8 py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-amber-500/25 font-medium";
  const secondaryButtonClass = "bg-gray-700 hover:bg-gray-600 border border-gray-600 px-8 py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-medium";

  useEffect(() => {
    // Pre-fill agent data if available (remaingn)
    if (user?.agent) {
      setFormData(prev => ({
        ...prev,
        license_number: user.agent.license_number || ""
      }));
    }
  }, [user]);

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

  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.license_number.trim()) newErrors.license_number = "License number is required";
      if (!formData.experience_years || formData.experience_years < 0) newErrors.experience_years = "Valid experience years is required";
      if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required";
    }
    
    if (currentStep === 2) {
      if (!formData.why_ethsure.trim()) newErrors.why_ethsure = "Please explain why you want to join Ethsure";
      if (!formData.expected_commission || formData.expected_commission < 0) newErrors.expected_commission = "Valid expected commission is required";
    }
    
    if (currentStep === 3) {
      if (!formData.terms_accepted) newErrors.terms_accepted = "You must accept the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (!validateStep()) return;
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        wallet_address: user.wallet_address,
        company_name: "Ethsure", 
        license_number: formData.license_number,
        experience_years: parseInt(formData.experience_years),
        specialization: formData.specialization,
        previous_companies: formData.previous_companies,
        why_ethsure: formData.why_ethsure,
        expected_commission: parseFloat(formData.expected_commission),
        terms_accepted: formData.terms_accepted
      };

      console.log("Sending association request:", payload);

      const res = await axios.post(`${BASE_URL}/api/agent/association-request`, payload);

      if (res.data.success) {
        toast.success("Association request sent to Ethsure successfully!");

        const updatedUserRes = await axios.get(`${BASE_URL}/api/users/${user.wallet_address}`);
        setUser(updatedUserRes.data.user);
        navigate("/agent/dashboard");
      } else {
        toast.error(res.data.message || "Failed to send association request");
      }
    } catch (err) {
      console.error("Association request error:", err);
      toast.error(err.response?.data?.message || "Error sending association request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Professional Details", icon: User },
    { number: 2, title: "Association Info", icon: Building },
    { number: 3, title: "Documents & Terms", icon: FileText }
  ];

  return (
    <div className="text-white w-full relative py-4">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center m-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-amber-500/20 rounded-2xl">
              <Building className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Associate with Ethsure
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Join India's leading insurance provider as an authorized agent</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                  currentStep >= step.number
                    ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/25'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <span className={`ml-3 font-medium ${
                  currentStep >= step.number ? 'text-amber-400' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-8 rounded-full transition-all duration-500 ${
                    currentStep > step.number ? 'bg-amber-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pre-filled Agent Info */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-400/30 rounded-2xl mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-cyan-300 font-medium">Agent Name</Label>
                <p className="text-white font-semibold text-lg">{user?.agent?.agent_name || "Not provided"}</p>
              </div>
              <div>
                <Label className="text-cyan-300 font-medium">Wallet Address</Label>
                <p className="text-white font-mono text-sm truncate">{user?.wallet_address}</p>
              </div>
              <div>
                <Label className="text-cyan-300 font-medium">KYC Status</Label>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mx-3 ${
                  user?.agent?.kyc_status === "verified" 
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}>
                  {user?.agent?.kyc_status || "pending"}
                </div>
              </div>
              <div>
                <Label className="text-cyan-300 font-medium">Company</Label>
                <p className="text-white font-semibold flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  Ethsure Insurance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Professional Details */}
        {currentStep === 1 && (
          <Card className={cardClass}>
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-2xl font-semibold text-amber-400 flex items-center gap-3">
                <User className="w-6 h-6" />
                Professional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Insurance License Number *</Label>
                  <Input
                    value={formData.license_number}
                    onChange={(e) => handleInputChange("license_number", e.target.value.toUpperCase())}
                    className={inputClass}
                    placeholder="Enter your license number"
                  />
                  {errors.license_number && <p className="text-red-400 text-sm flex items-center gap-1"><Clock className="w-4 h-4" /> {errors.license_number}</p>}
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Years of Experience *</Label>
                  <Input
                    type="number"
                    value={formData.experience_years}
                    onChange={(e) => handleInputChange("experience_years", e.target.value)}
                    className={inputClass}
                    min="0"
                    max="50"
                    placeholder="e.g., 5"
                  />
                  {errors.experience_years && <p className="text-red-400 text-sm">{errors.experience_years}</p>}
                </div>

                <div className="space-y-3 lg:col-span-2">
                  <Label className="text-gray-300 font-medium">Specialization *</Label>
                  <Input
                    value={formData.specialization}
                    onChange={(e) => handleInputChange("specialization", e.target.value)}
                    className={inputClass}
                    placeholder="e.g., Life Insurance, Health Insurance, Motor Insurance, etc."
                  />
                  {errors.specialization && <p className="text-red-400 text-sm">{errors.specialization}</p>}
                </div>

                <div className="space-y-3 lg:col-span-2">
                  <Label className="text-gray-300 font-medium">Previous Companies (Optional)</Label>
                  <Input
                    value={formData.previous_companies}
                    onChange={(e) => handleInputChange("previous_companies", e.target.value)}
                    className={inputClass}
                    placeholder="List companies you've worked with previously"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleNextStep} className={buttonClass}>
                  Next Step <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Association Information */}
        {currentStep === 2 && (
          <Card className={cardClass}>
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-2xl font-semibold text-amber-400 flex items-center gap-3">
                <Building className="w-6 h-6" />
                Association Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Why do you want to associate with Ethsure? *</Label>
                  <Textarea
                    value={formData.why_ethsure}
                    onChange={(e) => handleInputChange("why_ethsure", e.target.value)}
                    className={`${inputClass} min-h-[120px] resize-vertical`}
                    placeholder="Tell us why you're interested in partnering with Ethsure and what you can bring to our network..."
                  />
                  {errors.why_ethsure && <p className="text-red-400 text-sm">{errors.why_ethsure}</p>}
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Expected Commission Rate (%) *</Label>
                  <Input
                    type="number"
                    value={formData.expected_commission}
                    onChange={(e) => handleInputChange("expected_commission", e.target.value)}
                    className={inputClass}
                    min="0"
                    max="50"
                    step="0.1"
                    placeholder="e.g., 15.5"
                  />
                  {errors.expected_commission && <p className="text-red-400 text-sm">{errors.expected_commission}</p>}
                  <p className="text-gray-400 text-sm">Standard commission rates at Ethsure range from 10% to 25% based on experience and performance</p>
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

        {/* Step 3: Documents & Terms */}
        {currentStep === 3 && (
          <Card className={cardClass}>
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-2xl font-semibold text-amber-400 flex items-center gap-3">
                <FileText className="w-6 h-6" />
                Documents & Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <Label className="text-gray-300 font-medium">License Document *</Label>
                  <div className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:border-amber-400/50 transition-all duration-300">
                    <Input 
                      type="file" 
                      onChange={(e) => handleFileUpload('license_document', e.target.files[0])}
                      className="hidden" 
                      id="license-upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="license-upload" className="cursor-pointer">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">Upload your insurance license document</p>
                      <p className="text-gray-500 text-sm">PDF, JPG, PNG (Max 5MB)</p>
                    </label>
                  </div>
                  {uploadedFiles.license_document && (
                    <p className="text-green-400 text-sm flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      {uploadedFiles.license_document.name}
                    </p>
                  )}
                  {errors.license_document && <p className="text-red-400 text-sm">{errors.license_document}</p>}
                </div>

                <div className="space-y-4">
                  <Label className="text-gray-300 font-medium">Professional Resume (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:border-amber-400/50 transition-all duration-300">
                    <Input 
                      type="file" 
                      onChange={(e) => handleFileUpload('resume', e.target.files[0])}
                      className="hidden" 
                      id="resume-upload"
                      accept=".pdf,.doc,.docx"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">Upload your professional resume</p>
                      <p className="text-gray-500 text-sm">PDF, DOC, DOCX (Max 5MB)</p>
                    </label>
                  </div>
                  {uploadedFiles.resume && (
                    <p className="text-green-400 text-sm flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      {uploadedFiles.resume.name}
                    </p>
                  )}
                </div>
              </div> */}

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-600">
                  <Input
                    type="checkbox"
                    checked={formData.terms_accepted}
                    onChange={(e) => handleInputChange("terms_accepted", e.target.checked)}
                    className="w-5 h-5 mt-1 rounded focus:ring-amber-400 focus:ring-2"
                  />
                  <div>
                    <Label className="text-gray-300 font-medium cursor-pointer">
                      I accept the Terms and Conditions *
                    </Label>
                    <p className="text-gray-400 text-sm mt-1">
                      I agree to abide by Ethsure's code of conduct, commission structure, and all policies governing agent-company relationships. 
                      I confirm that all information provided is accurate to the best of my knowledge.
                    </p>
                  </div>
                </div>
                {errors.terms_accepted && <p className="text-red-400 text-sm">{errors.terms_accepted}</p>}
              </div>

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
                      Sending Request...
                    </>
                  ) : (
                    <>
                      Send Association Request <Send className="w-5 h-5 ml-2" />
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

export default AgentAssociationForm;