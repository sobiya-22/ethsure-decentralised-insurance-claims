import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Shield, Check, Clock, ArrowLeft, ArrowRight, Upload, FileText, Users, Loader2, X, AlertCircle } from "lucide-react";
import { userStore } from "@/context/userContext";
import toast from "react-hot-toast";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const ClaimPolicyForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = userStore((state) => state.user);
  const policy = location.state?.policy;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    claimant_type: "",
    claimant_name: "",
    claimant_phone: "",
    claimant_email: "",
    claimant_relation: "",
    claimant_id_number: "",
    claim_reason: "",
    claim_description: "",
    incident_date: "",
    claim_amount: policy.coverage_amount,
    death_certificate_url: "",
    medical_reports_url: "",
    claimant_id_url: "",
    police_report_url: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    death_certificate: null,
    medical_reports: null,
    claimant_id: null,
    police_report: null
  });
  const [uploadingStates, setUploadingStates] = useState({
    death_certificate: false,
    medical_reports: false,
    claimant_id: false,
    police_report: false
  });

  const cardClass = "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 shadow-2xl rounded-2xl overflow-hidden hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500 backdrop-blur-sm";
  const inputClass = "w-full bg-gray-800/80 border border-gray-600 text-white placeholder:text-gray-400 p-4 text-base rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 focus:outline-none focus:shadow-lg focus:shadow-cyan-400/10";
  const buttonClass = "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/25 font-medium";
  const secondaryButtonClass = "bg-gray-700 hover:bg-gray-600 border border-gray-600 px-8 py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-medium";

  useEffect(() => {
    if (!policy) {
      toast.error("No policy selected. Redirecting...");
      navigate(-1);
    }
  }, [policy, navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const uploadToCloudinary = async (file, fileType) => {
    const toastId = toast.loading(`Uploading ${fileType.replace('_', ' ')}...`);
    
    try {
      setUploadingStates(prev => ({ ...prev, [fileType]: true }));

      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size should be less than 5MB");
      }

      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        throw new Error("Only JPG, PNG, and PDF files are allowed");
      }

      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formDataUpload.append('folder', 'ethsure-claim-documents');

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        formDataUpload
      );

      const imageUrl = response.data.secure_url;
      
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
      if (!formData.claimant_type) newErrors.claimant_type = "Please select who is claiming";
      if (!formData.claimant_name.trim()) newErrors.claimant_name = "Claimant name is required";
      if (!/^\d{10}$/.test(formData.claimant_phone)) newErrors.claimant_phone = "Valid 10-digit phone number is required";
      if (!formData.claimant_email.trim()) newErrors.claimant_email = "Email is required";
      
      if (formData.claimant_type === "nominee" || formData.claimant_type === "other") {
        if (!formData.claimant_relation.trim()) newErrors.claimant_relation = "Relation is required";
        if (!formData.claimant_id_number.trim()) newErrors.claimant_id_number = "ID number is required";
      }
    }

    if (currentStep === 2) {
      if (!formData.claim_reason) newErrors.claim_reason = "Claim reason is required";
      if (!formData.claim_description.trim()) newErrors.claim_description = "Claim description is required";
      if (!formData.incident_date) newErrors.incident_date = "Incident date is required";
      if (!formData.claim_amount || formData.claim_amount <= 0) newErrors.claim_amount = "Valid claim amount is required";
    }

    if (currentStep === 3) {
      if (formData.claim_reason === "death" && !formData.death_certificate_url) {
        newErrors.death_certificate = "Death certificate is required";
      }
      if (!formData.claimant_id_url) newErrors.claimant_id = "Claimant ID is required";
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

    const toastId = toast.loading("Submitting claim request...");
    setIsSubmitting(true);

    try {
      const claimData = {
        policy_id: policy._id,
        customer_wallet_address: user.wallet_address,
        ...formData,
        claim_amount: parseFloat(formData.claim_amount),
        newStatus: "request-claim"
      };

      console.log("Submitting claim data:", claimData);

      const response = await axios.post(`${BASE_URL}/api/policy/claim-policy/${policy._id}`, claimData);

      if (response.data.success) {
        toast.success("Claim request submitted successfully!", { id: toastId });
        navigate("/customer/dashboard");
      } else {
        toast.error(response.data.message || "Failed to submit claim", { id: toastId });
      }
    } catch (error) {
      console.error("Error submitting claim:", error);
      toast.error(error.response?.data?.message || "Failed to submit claim request", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const DocumentUploadBox = ({ fileType, label, required = false }) => {
    const isUploading = uploadingStates[fileType];
    const file = uploadedFiles[fileType];
    const error = errors[fileType];

    return (
      <div className="space-y-2">
        <Label className="text-gray-300">{label} {required && "*"}</Label>
        <div className={`border-2 border-dashed ${error ? 'border-red-500' : 'border-gray-600'} rounded-xl p-4 text-center hover:border-cyan-400/50 transition-all duration-300 relative bg-gray-800/50`}>
          {isUploading ? (
            <div className="py-2">
              <Loader2 className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-spin" />
              <p className="text-gray-400 text-sm">Uploading...</p>
            </div>
          ) : file ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-green-400">
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">Uploaded</span>
              </div>
              <p className="text-gray-400 text-xs truncate max-w-xs mx-auto">{file.name}</p>
              <Button
                type="button"
                onClick={() => handleRemoveFile(fileType)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 text-xs rounded-lg mt-2"
              >
                <X className="w-3 h-3 mr-1" />
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
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor={`${fileType}-upload`} className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 text-sm mb-1">Click to upload</p>
                <p className="text-gray-500 text-xs">PDF, JPG, PNG (Max 5MB)</p>
              </label>
            </>
          )}
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    );
  };

  const steps = [
    { number: 1, title: "Claimant Details", icon: User },
    { number: 2, title: "Claim Information", icon: FileText },
    { number: 3, title: "Documents", icon: Upload }
  ];

  if (!policy) return null;

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
              Claim Policy
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Submit your insurance claim request</p>
        </div>

        {/* Policy Information Card */}
        <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg font-semibold text-cyan-400">Policy Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Policy ID:</span>
              <span className="text-white ml-2 font-mono">POL_{policy.onchain_policyID}</span>
            </div>
            <div>
              <span className="text-gray-400">Policy Holder:</span>
              <span className="text-white ml-2">{policy.fullName}</span>
            </div>
            <div>
              <span className="text-gray-400">Coverage Amount:</span>
              <span className="text-emerald-400 ml-2 font-semibold">₹{policy.coverage_amount?.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-400">Status:</span>
              <span className="text-white ml-2 capitalize">{policy.status}</span>
            </div>
          </div>
        </Card>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                  currentStep >= step.number
                    ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <span className={`ml-3 font-medium ${
                  currentStep >= step.number ? 'text-cyan-400' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-8 rounded-full transition-all duration-500 ${
                    currentStep > step.number ? 'bg-cyan-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Claimant Details */}
        {currentStep === 1 && (
          <Card className={cardClass}>
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-2xl font-semibold text-cyan-400 flex items-center gap-3">
                <User className="w-6 h-6" />
                Claimant Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <Label className="text-gray-300 font-medium">Who is claiming the policy? *</Label>
                <Select value={formData.claimant_type} onValueChange={(value) => handleInputChange("claimant_type", value)}>
                  <SelectTrigger className={inputClass}>
                    <SelectValue placeholder="Select claimant type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20">
                    <SelectItem value="self" className="text-white">Policy Holder (Self)</SelectItem>
                    <SelectItem value="nominee" className="text-white">Nominee</SelectItem>
                    <SelectItem value="other" className="text-white">Other (Family Member / Legal Representative)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.claimant_type && <p className="text-red-400 text-sm">{errors.claimant_type}</p>}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Claimant Full Name *</Label>
                  <Input
                    value={formData.claimant_name}
                    onChange={(e) => handleInputChange("claimant_name", e.target.value)}
                    className={inputClass}
                    placeholder="Enter claimant's full name"
                  />
                  {errors.claimant_name && <p className="text-red-400 text-sm">{errors.claimant_name}</p>}
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Phone Number *</Label>
                  <Input
                    value={formData.claimant_phone}
                    onChange={(e) => handleInputChange("claimant_phone", e.target.value.replace(/\D/g, ''))}
                    className={inputClass}
                    maxLength={10}
                    placeholder="10-digit phone number"
                  />
                  {errors.claimant_phone && <p className="text-red-400 text-sm">{errors.claimant_phone}</p>}
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Email Address *</Label>
                  <Input
                    type="email"
                    value={formData.claimant_email}
                    onChange={(e) => handleInputChange("claimant_email", e.target.value)}
                    className={inputClass}
                    placeholder="claimant@example.com"
                  />
                  {errors.claimant_email && <p className="text-red-400 text-sm">{errors.claimant_email}</p>}
                </div>

                {(formData.claimant_type === "nominee" || formData.claimant_type === "other") && (
                  <>
                    <div className="space-y-3">
                      <Label className="text-gray-300 font-medium">Relation to Policy Holder *</Label>
                      <Input
                        value={formData.claimant_relation}
                        onChange={(e) => handleInputChange("claimant_relation", e.target.value)}
                        className={inputClass}
                        placeholder="e.g., Spouse, Son, Daughter"
                      />
                      {errors.claimant_relation && <p className="text-red-400 text-sm">{errors.claimant_relation}</p>}
                    </div>

                    <div className="space-y-3 lg:col-span-2">
                      <Label className="text-gray-300 font-medium">Claimant ID Number (Aadhar/PAN) *</Label>
                      <Input
                        value={formData.claimant_id_number}
                        onChange={(e) => handleInputChange("claimant_id_number", e.target.value)}
                        className={inputClass}
                        placeholder="Enter Aadhar or PAN number"
                      />
                      {errors.claimant_id_number && <p className="text-red-400 text-sm">{errors.claimant_id_number}</p>}
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleNextStep} className={buttonClass}>
                  Next Step <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Claim Information */}
        {currentStep === 2 && (
          <Card className={cardClass}>
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-2xl font-semibold text-cyan-400 flex items-center gap-3">
                <FileText className="w-6 h-6" />
                Claim Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Reason for Claim *</Label>
                  <Select value={formData.claim_reason} onValueChange={(value) => handleInputChange("claim_reason", value)}>
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Select claim reason" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="death" className="text-white">Death of Policy Holder</SelectItem>
                      <SelectItem value="critical_illness" className="text-white">Critical Illness</SelectItem>
                      <SelectItem value="accident" className="text-white">Accident</SelectItem>
                      <SelectItem value="maturity" className="text-white">Policy Maturity</SelectItem>
                      <SelectItem value="other" className="text-white">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.claim_reason && <p className="text-red-400 text-sm">{errors.claim_reason}</p>}
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300 font-medium">Incident Date *</Label>
                  <Input
                    type="date"
                    value={formData.incident_date}
                    onChange={(e) => handleInputChange("incident_date", e.target.value)}
                    className={inputClass}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.incident_date && <p className="text-red-400 text-sm">{errors.incident_date}</p>}
                </div>

                <div className="space-y-3 lg:col-span-2">
                  <Label className="text-gray-300 font-medium">Claim Amount *</Label>
                  <Input
                    type="number"
                    value={formData.claim_amount}
                    onChange={(e) => handleInputChange("claim_amount", e.target.value)}
                                      className={inputClass}
                                      
                    placeholder="Enter claim amount"
                    max={policy.coverage_amount}
                  />
                  <p className="text-gray-400 text-sm">Maximum claimable amount: ₹{policy.coverage_amount?.toLocaleString()}</p>
                  {errors.claim_amount && <p className="text-red-400 text-sm">{errors.claim_amount}</p>}
                </div>

                <div className="space-y-3 lg:col-span-2">
                  <Label className="text-gray-300 font-medium">Detailed Description *</Label>
                  <Textarea
                    value={formData.claim_description}
                    onChange={(e) => handleInputChange("claim_description", e.target.value)}
                    className={`${inputClass} min-h-[120px]`}
                    placeholder="Provide detailed information about the claim, including circumstances, timeline, and any relevant details..."
                  />
                  {errors.claim_description && <p className="text-red-400 text-sm">{errors.claim_description}</p>}
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

        {/* Step 3: Documents */}
        {currentStep === 3 && (
          <Card className={cardClass}>
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-2xl font-semibold text-cyan-400 flex items-center gap-3">
                <Upload className="w-6 h-6" />
                Supporting Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                <p className="text-blue-300 text-sm">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Please upload clear, legible copies of all required documents. All documents will be verified by the insurance company.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DocumentUploadBox 
                  fileType="claimant_id"
                  label="Claimant ID Proof (Aadhar/PAN/Driving License)"
                  required={true}
                />

                {formData.claim_reason === "death" && (
                  <DocumentUploadBox 
                    fileType="death_certificate"
                    label="Death Certificate"
                    required={true}
                  />
                )}

                {(formData.claim_reason === "critical_illness" || formData.claim_reason === "accident") && (
                  <DocumentUploadBox 
                    fileType="medical_reports"
                    label="Medical Reports"
                    required={false}
                  />
                )}

                {formData.claim_reason === "accident" && (
                  <DocumentUploadBox 
                    fileType="police_report"
                    label="Police Report (If applicable)"
                    required={false}
                  />
                )}
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Claim <Check className="w-5 h-5 ml-2" />
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

export default ClaimPolicyForm;