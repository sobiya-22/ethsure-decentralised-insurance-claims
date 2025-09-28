import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, FileText, Check, AlertCircle, Camera, Upload, X } from "lucide-react";
import { useAccount } from "wagmi";

import { submitAgentKYC } from "@/services/agentAPI";

const AgentKYCForm = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const [formData, setFormData] = useState({
    agent_name: "",
    agent_email: "",
    agent_phone: "",
    license_number: "",
    date_of_birth: "",
    profile_photo_url: null,
    documents: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  // CSS classes for consistent styling
  const cardClass = "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 shadow-xl rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300";
  const inputClass = "mt-3 w-full bg-gray-800 border border-gray-600 text-white placeholder:text-gray-400 p-4 text-lg rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200";
  const buttonClass = "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-3 text-lg rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed";

  const steps = [
    { id: 1, title: 'Personal Information', completed: currentStep > 1 },
    { id: 2, title: 'Profile Photo', completed: currentStep > 2 },
    { id: 3, title: 'Document Upload', completed: currentStep > 3 },
    { id: 4, title: 'Review & Submit', completed: false }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleFileUpload = (event, field = "documents") => {
    const files = event.target.files;
    if (field === "documents") {
      setFormData(prev => ({ ...prev, [field]: Array.from(files) }));
    } else {
      setFormData(prev => ({ ...prev, [field]: files[0] }));
    }
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.agent_name.trim()) newErrors.agent_name = "Name is required";
    if (!formData.agent_email.trim()) newErrors.agent_email = "Email is required";
    if (!formData.agent_phone.trim()) newErrors.agent_phone = "Phone is required";
    if (!formData.license_number.trim()) newErrors.license_number = "License Number is required";
    if (!formData.date_of_birth) newErrors.date_of_birth = "Date of Birth is required";

    // Email validation
    if (formData.agent_email && !/\S+@\S+\.\S+/.test(formData.agent_email)) {
      newErrors.agent_email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.profile_photo_url) newErrors.profile_photo_url = "Profile photo is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.documents || formData.documents.length === 0) {
      newErrors.documents = "At least one document is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = validateStep3();
    } else {
      isValid = true;
    }

    if (isValid && currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!isConnected || !address) {
        alert("Please connect your wallet first!");
        return;
      }

      const payload = {
        ...formData,
        wallet_address: address,
      };

      console.log("Submitting Agent KYC:", payload);
      await submitAgentKYC(payload);
      alert("KYC submitted successfully!");
      navigate("/agent-dashboard");
    } catch (err) {
      console.error("KYC submission failed:", err);
      alert("Submission failed. Please try again.");
    }
  };

  const FileUploadSection = ({ title, icon: Icon, field, accept = "image/*,.pdf", multiple = false }) => (
    <div>
      <h3 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4 flex items-center gap-2">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
        {title}
      </h3>
      <div className="border-2 border-dashed border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:border-cyan-400/50 hover:bg-white/5 transition-all duration-300">
        <Upload className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
        <p className="text-gray-300 mb-2 sm:mb-3 text-base sm:text-lg">
          {field === 'profile_photo_url' ? 'Upload your profile photo' : 'Upload supporting documents'}
        </p>
        <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
          Accepted formats: JPG, PNG, PDF (Max 10MB each)
        </p>
        <input 
          type="file" 
          accept={accept} 
          multiple={multiple}
          onChange={(e) => handleFileUpload(e, field)} 
          className="hidden" 
          id={field} 
        />
        <label 
          htmlFor={field} 
          className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 text-sm sm:text-base"
        >
          Choose File{multiple ? 's' : ''}
        </label>
        {field === 'profile_photo_url' && formData[field] && (
          <p className="text-emerald-400 text-xs sm:text-sm mt-3 sm:mt-4 flex items-center justify-center gap-2">
            <Check className="w-3 h-3 sm:w-4 sm:h-4" />
            {formData[field].name}
          </p>
        )}
        {field === 'documents' && formData[field].length > 0 && (
          <div className="text-emerald-400 text-xs sm:text-sm mt-3 sm:mt-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              {formData[field].length} file{formData[field].length > 1 ? 's' : ''} selected
            </div>
            <ul className="space-y-1">
              {formData[field].map((file, i) => (
                <li key={i} className="text-gray-300">{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {errors[field] && <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        {errors[field]}
      </p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Agent <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">KYC</span> Verification
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">Complete your verification to access agent features</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center mb-8 sm:mb-12 overflow-x-auto">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center flex-shrink-0">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  step.completed ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30 scale-110' : 
                  currentStep === step.id ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-blue-500/30 scale-110' : 'bg-gray-700'
                }`}>
                  {step.completed ? <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <span className="text-white text-sm sm:text-lg font-bold">{step.id}</span>}
                </div>
                <span className={`ml-2 sm:ml-4 text-sm sm:text-lg font-medium transition-all duration-200 ${
                  currentStep === step.id ? 'text-white scale-105' : 'text-gray-400'
                }`}>{step.title}</span>
              </div>
              {index < steps.length - 1 && <div className={`flex-1 h-1 mx-3 sm:mx-6 rounded-full transition-all duration-300 ${step.completed ? 'bg-emerald-500' : 'bg-gray-700'} min-w-[20px]`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-white text-xl sm:text-2xl">
                <User className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-cyan-400" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label className="text-white/90 font-medium text-lg">Full Name *</Label>
                  <Input 
                    type="text" 
                    value={formData.agent_name} 
                    onChange={(e) => handleInputChange("agent_name", e.target.value)} 
                    className={inputClass} 
                    placeholder="Enter your full name" 
                  />
                  {errors.agent_name && <p className="text-red-400 text-sm mt-1 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.agent_name}
                  </p>}
                </div>

                <div>
                  <Label className="text-white/90 font-medium text-lg">Email Address *</Label>
                  <Input 
                    type="email" 
                    value={formData.agent_email} 
                    onChange={(e) => handleInputChange("agent_email", e.target.value)} 
                    className={inputClass} 
                    placeholder="Enter your email address" 
                  />
                  {errors.agent_email && <p className="text-red-400 text-sm mt-1 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.agent_email}
                  </p>}
                </div>

                <div>
                  <Label className="text-white/90 font-medium text-lg">Phone Number *</Label>
                  <Input 
                    type="tel" 
                    value={formData.agent_phone} 
                    onChange={(e) => handleInputChange("agent_phone", e.target.value)} 
                    className={inputClass} 
                    placeholder="Enter your phone number" 
                  />
                  {errors.agent_phone && <p className="text-red-400 text-sm mt-1 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.agent_phone}
                  </p>}
                </div>

                <div>
                  <Label className="text-white/90 font-medium text-lg">License Number *</Label>
                  <Input 
                    type="text" 
                    value={formData.license_number} 
                    onChange={(e) => handleInputChange("license_number", e.target.value)} 
                    className={inputClass} 
                    placeholder="Enter your license number" 
                  />
                  {errors.license_number && <p className="text-red-400 text-sm mt-1 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.license_number}
                  </p>}
                </div>

                <div className="sm:col-span-2">
                  <Label className="text-white/90 font-medium text-lg">Date of Birth *</Label>
                  <Input 
                    type="date" 
                    value={formData.date_of_birth} 
                    onChange={(e) => handleInputChange("date_of_birth", e.target.value)} 
                    className={inputClass} 
                  />
                  {errors.date_of_birth && <p className="text-red-400 text-sm mt-1 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.date_of_birth}
                  </p>}
                </div>
              </div>

              <div className="flex justify-end pt-4 sm:pt-6">
                <Button onClick={handleNextStep} className={`${buttonClass} w-full sm:w-auto`}>
                  Next Step
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Profile Photo Upload */}
        {currentStep === 2 && (
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-white text-xl sm:text-2xl">
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-cyan-400" />
                Upload Profile Photo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 sm:space-y-8">
              <FileUploadSection 
                title="Profile Photo" 
                icon={Camera} 
                field="profile_photo_url" 
                accept="image/*"
                multiple={false}
              />
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(1)} 
                  className="border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-xl transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                >
                  Back
                </Button>
                <Button onClick={handleNextStep} className={`${buttonClass} w-full sm:w-auto`}>
                  Next Step
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Document Upload */}
        {currentStep === 3 && (
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-white text-xl sm:text-2xl">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-cyan-400" />
                Document Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 sm:space-y-8">
              <FileUploadSection 
                title="Supporting Documents" 
                icon={FileText} 
                field="documents" 
                accept="image/*,.pdf"
                multiple={true}
              />
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(2)} 
                  className="border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-xl transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                >
                  Back
                </Button>
                <Button onClick={handleNextStep} className={`${buttonClass} w-full sm:w-auto`}>
                  Next Step
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Review & Submit */}
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
                <p className="text-amber-200 text-lg">Please review all information carefully. KYC verification typically takes 24-48 hours to process.</p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-medium text-white mb-4">Submitted Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                  {[
                    { label: 'Name', value: formData.agent_name },
                    { label: 'Email', value: formData.agent_email },
                    { label: 'Phone', value: formData.agent_phone },
                    { label: 'License Number', value: formData.license_number },
                    { label: 'Date of Birth', value: formData.date_of_birth, span: 'md:col-span-2' }
                  ].map((item, index) => (
                    <div key={index} className={`p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 ${item.span || ''}`}>
                      <span className="text-gray-400">{item.label}:</span> 
                      <span className="text-white ml-3 font-medium">{item.value || '-'}</span>
                    </div>
                  ))}
                  <div className="md:col-span-2 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                    <span className="text-gray-400">Profile Photo:</span> 
                    <span className="text-white ml-3 font-medium">
                      {formData.profile_photo_url ? formData.profile_photo_url.name : 'Not uploaded'}
                    </span>
                  </div>
                  <div className="md:col-span-2 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                    <span className="text-gray-400">Documents:</span> 
                    <div className="ml-3 font-medium">
                      {formData.documents.length > 0 ? (
                        <ul className="mt-2 space-y-1">
                          {formData.documents.map((file, i) => (
                            <li key={i} className="text-white">• {file.name}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-white">No documents uploaded</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(3)} 
                  className="border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-xl transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-xl transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                >
                  Submit KYC
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AgentKYCForm;