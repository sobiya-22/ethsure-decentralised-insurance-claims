import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building, User, Check, Clock, ArrowLeft, ArrowRight, Shield, FileText, Send, Upload, X, Loader2 } from "lucide-react";
import { userStore } from "@/context/userContext";
import toast from "react-hot-toast";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

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
    terms_accepted: false,
    pan_card_url: "",
    aadhar_card_url: "",
    license_document_url: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    pan_card: null,
    aadhar_card: null,
    license_document: null
  });
  const [uploadingStates, setUploadingStates] = useState({
    pan_card: false,
    aadhar_card: false,
    license_document: false
  });

  const cardClass = "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 shadow-2xl rounded-2xl overflow-hidden hover:border-amber-400/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] transition-all duration-500 backdrop-blur-sm";
  const inputClass = "w-full bg-gray-800/80 border border-gray-600 text-white placeholder:text-gray-400 p-4 text-base rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300 focus:outline-none focus:shadow-lg focus:shadow-amber-400/10";
  const buttonClass = "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 px-8 py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-amber-500/25 font-medium";
  const secondaryButtonClass = "bg-gray-700 hover:bg-gray-600 border border-gray-600 px-8 py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-medium";

  useEffect(() => {
    if (user?.agent) {
      setFormData(prev => ({
        ...prev,
      }));
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setErrors(prev => ({
      ...prev,
      [field]: ""
    }));
  };

  const uploadToCloudinary = async (file, fileType) => {
    const toastId = toast.loading(`Uploading ${fileType.replace('_', ' ')}...`);
    
    try {
      setUploadingStates(prev => ({ ...prev, [fileType]: true }));

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size should be less than 5MB");
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        throw new Error("Only JPG, PNG, and PDF files are allowed");
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'ethsure-agent-documents');

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const imageUrl = response.data.secure_url;
      
      // Update form data with the URL
      setFormData(prev => ({
        ...prev,
        [`${fileType}_url`]: imageUrl
      }));

      setUploadedFiles(prev => ({
        ...prev,
        [fileType]: file
      }));

      toast.success(`${fileType.replace('_', ' ')} uploaded successfully!`, { id: toastId });
      return imageUrl;

    } catch (error) {
      console.error(`Error uploading ${fileType}:`, error);
      toast.error(error.message || `Failed to upload ${fileType.replace('_', ' ')}`, { id: toastId });
      throw error;
    } finally {
      setUploadingStates(prev => ({ ...prev, [fileType]: false }));
    }
  };

  const handleFileUpload = async (fileType, file) => {
    if (!file) return;
    await uploadToCloudinary(file, fileType);
  };

  const handleRemoveFile = (fileType) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: null
    }));
    setFormData(prev => ({
      ...prev,
      [`${fileType}_url`]: ""
    }));
    toast.success(`${fileType.replace('_', ' ')} removed`);
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
      if (!formData.pan_card_url) newErrors.pan_card = "PAN card document is required";
      if (!formData.aadhar_card_url) newErrors.aadhar_card = "Aadhar card document is required";
      if (!formData.license_document_url) newErrors.license_document = "License document is required";
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

    const toastId = toast.loading("Sending association request...");
    setIsSubmitting(true);

    try {
      const data = {
        agent_wallet_address: user.wallet_address,
        company_name: "NexVault",
        license_number: formData.license_number,
        experience_years: parseInt(formData.experience_years),
        specialization: formData.specialization,
        previous_companies: formData.previous_companies,
        why_ethsure: formData.why_ethsure,
        expected_commission: parseFloat(formData.expected_commission),
        terms_accepted: formData.terms_accepted,
        pancard_url: formData.pan_card_url,
        aadharcard_url: formData.aadhar_card_url,
        license_url: formData.license_document_url
      };

      console.log("Sending association request:", data);

      const res = await axios.post(`${BASE_URL}/api/agent/send-association`, { data });

      if (res.data.success) {
        toast.success("Association request sent successfully!", { id: toastId });
        
        // Fetch updated user data
        const updatedUserRes = await axios.get(`${BASE_URL}/api/users/${user.wallet_address}`);
        setUser(updatedUserRes.data.user);
        
        navigate("/agent/dashboard");
      } else {
        toast.error(res.data.message || "Failed to send association request", { id: toastId });
      }
    } catch (err) {
      console.error("Association request error:", err);
      toast.error(err.response?.data?.message || "Error sending association request", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Professional Details", icon: User },
    { number: 2, title: "Association Info", icon: Building },
    { number: 3, title: "Documents & Terms", icon: FileText }
  ];

  const DocumentUploadBox = ({ fileType, label, accept = ".pdf,.jpg,.jpeg,.png" }) => {
    const isUploading = uploadingStates[fileType];
    const file = uploadedFiles[fileType];
    const error = errors[fileType];

    return (
      <div className="space-y-3">
        <Label className="text-gray-300 font-medium">{label} *</Label>
        <div className={`border-2 border-dashed ${error ? 'border-red-500' : 'border-gray-600'} rounded-2xl p-6 text-center hover:border-amber-400/50 transition-all duration-300 relative`}>
          {isUploading ? (
            <div className="py-4">
              <Loader2 className="w-12 h-12 text-amber-400 mx-auto mb-4 animate-spin" />
              <p className="text-gray-400">Uploading...</p>
            </div>
          ) : file ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-green-400">
                <Check className="w-5 h-5" />
                <span className="font-medium">Uploaded Successfully</span>
              </div>
              <p className="text-gray-400 text-sm truncate max-w-xs mx-auto">{file.name}</p>
              <Button
                type="button"
                onClick={() => handleRemoveFile(fileType)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 text-sm rounded-lg"
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          ) : (
            <>
              <Input
                type="file"
                onChange={(e) => handleFileUpload(fileType, e.target.files[0])}
                className="hidden"
                id={`${fileType}-upload`}
                accept={accept}
              />
              <label htmlFor={`${fileType}-upload`} className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Click to upload {label.toLowerCase()}</p>
                <p className="text-gray-500 text-sm">PDF, JPG, PNG (Max 5MB)</p>
              </label>
            </>
          )}
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Associate with Ethsure
          </h1>
          <p className="text-gray-400 text-lg">Join India's leading insurance provider as an authorized agent</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between px-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  currentStep >= step.number ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/25' : 'border-gray-600 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <p className={`mt-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-amber-400' : 'text-gray-400'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-4 rounded-full transition-all duration-300" 
                  style={{
                    background: currentStep > step.number ? 'rgb(245, 158, 11)' : 'rgb(75, 85, 99)'
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Pre-filled Agent Info */}
        <Card className={cardClass}>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-400 text-sm">Agent Name</Label>
                <p className="text-white font-medium">{user?.agent?.agent_name || "Not provided"}</p>
              </div>
              <div>
                <Label className="text-gray-400 text-sm">Wallet Address</Label>
                <p className="text-white font-mono text-sm">{user?.wallet_address}</p>
              </div>
              <div>
                <Label className="text-gray-400 text-sm">KYC Status</Label>
                <p className="text-white font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  {user?.agent?.kyc_status || "pending"}
                </p>
              </div>
              <div>
                <Label className="text-gray-400 text-sm">Company</Label>
                <p className="text-white font-medium">NexVault Secure Insurance</p>
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
              <div className="space-y-3">
                <Label className="text-gray-300 font-medium">IRDAI Insurance Agent License *</Label>
                <Input
                  type="text"
                  value={formData.license_number}
                  onChange={(e) => handleInputChange("license_number", e.target.value.toUpperCase())}
                  className={inputClass}
                  placeholder="Enter your license number"
                />
                {errors.license_number && <p className="text-red-400 text-sm">{errors.license_number}</p>}
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

              <div className="space-y-3">
                <Label className="text-gray-300 font-medium">Specialization *</Label>
                <Input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => handleInputChange("specialization", e.target.value)}
                  className={inputClass}
                  placeholder="e.g., Life Insurance, Health Insurance, Motor Insurance, etc."
                />
                {errors.specialization && <p className="text-red-400 text-sm">{errors.specialization}</p>}
              </div>

              <div className="space-y-3">
                <Label className="text-gray-300 font-medium">Previous Companies (Optional)</Label>
                <Textarea
                  value={formData.previous_companies}
                  onChange={(e) => handleInputChange("previous_companies", e.target.value)}
                  className={inputClass}
                  placeholder="List companies you've worked with previously"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleNextStep} className={buttonClass}>
                  Next Step
                  <ArrowRight className="w-5 h-5 ml-2" />
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

              <div className="flex justify-between pt-4">
                <Button onClick={handlePrevStep} className={secondaryButtonClass}>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNextStep} className={buttonClass}>
                  Next Step
                  <ArrowRight className="w-5 h-5 ml-2" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DocumentUploadBox 
                  fileType="pan_card"
                  label="PAN Card"
                />
                <DocumentUploadBox 
                  fileType="aadhar_card"
                  label="Aadhar Card"
                />
              </div>

              <DocumentUploadBox 
                fileType="license_document"
                label="Insurance License Document"
              />

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
                      I agree to abide by Ethsure's code of conduct, commission structure, and all policies governing agent-company relationships. I confirm that all information provided is accurate to the best of my knowledge.
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
                  disabled={isSubmitting || Object.values(uploadingStates).some(state => state)}
                  className={buttonClass}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      Send Association Request
                      <Send className="w-5 h-5 ml-2" />
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