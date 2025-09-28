import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, FileText, Check, Camera } from "lucide-react";
import { useAccount } from "wagmi";

import { submitCustomerKYC } from "@/services/customerAPI";

const CustomerKYCForm = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_address: "",
    date_of_birth: "",
    profile_photo_url: null,
    documents: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleFileUpload = (event, field) => {
    setFormData(prev => ({ ...prev, [field]: event.target.files[0] ? event.target.files[0] : null }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.customer_name) newErrors.customer_name = "Name is required";
    if (!formData.customer_phone) newErrors.customer_phone = "Phone is required";
    if (!formData.customer_address) newErrors.customer_address = "Address is required";
    if (!formData.date_of_birth) newErrors.date_of_birth = "Date of Birth is required";

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
    if (!formData.documents || formData.documents.length === 0) newErrors.documents = "At least one document is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    setCurrentStep(prev => prev + 1);
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

      console.log("Submitting Customer KYC:", payload);
      await submitCustomerKYC(payload);
      alert("KYC submitted successfully!");
      navigate("/customer-dashboard");
    } catch (err) {
      console.error("KYC submission failed:", err);
      alert("Submission failed. Please try again.");
    }
  };

  const cardClass = "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 shadow-xl rounded-2xl overflow-hidden";
  const inputClass = "w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all";

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">

        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <User className="w-5 h-5 text-cyan-400" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input type="text" value={formData.customer_name} onChange={(e) => handleInputChange("customer_name", e.target.value)} className={inputClass} placeholder="Full Name" />
                  {errors.customer_name && <p className="text-red-500 text-sm mt-1">{errors.customer_name}</p>}
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input type="tel" value={formData.customer_phone} onChange={(e) => handleInputChange("customer_phone", e.target.value)} className={inputClass} placeholder="Phone Number" />
                  {errors.customer_phone && <p className="text-red-500 text-sm mt-1">{errors.customer_phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Label>Address</Label>
                  <Input type="text" value={formData.customer_address} onChange={(e) => handleInputChange("customer_address", e.target.value)} className={inputClass} placeholder="Address" />
                  {errors.customer_address && <p className="text-red-500 text-sm mt-1">{errors.customer_address}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Label>Date of Birth</Label>
                  <Input type="date" value={formData.date_of_birth} onChange={(e) => handleInputChange("date_of_birth", e.target.value)} className={inputClass} />
                  {errors.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>}
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button onClick={handleNextStep}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Profile Photo Upload */}
        {currentStep === 2 && (
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Camera className="w-5 h-5 text-cyan-400" />
                Upload Profile Photo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Profile Photo</Label>
              <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "profile_photo_url")} className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-cyan-500 file:text-white" />
              {errors.profile_photo_url && <p className="text-red-500 text-sm mt-1">{errors.profile_photo_url}</p>}
              <div className="flex justify-between pt-4">
                <Button onClick={() => setCurrentStep(1)}>Back</Button>
                <Button onClick={handleNextStep}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Document Upload */}
        {currentStep === 3 && (
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <FileText className="w-5 h-5 text-cyan-400" />
                Document Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Upload Documents</Label>
              <Input type="file" multiple onChange={(e) => handleFileUpload(e, "documents")} className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-cyan-500 file:text-white" />
              {errors.documents && <p className="text-red-500 text-sm mt-1">{errors.documents}</p>}
              <div className="flex justify-between pt-4">
                <Button onClick={() => setCurrentStep(2)}>Back</Button>
                <Button onClick={handleNextStep}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Check className="w-5 h-5 text-cyan-400" />
                Review & Submit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(formData).map(([key, value]) => (
                  key !== "documents" && <div key={key}>
                    <Label>{key.replace("_", " ")}</Label>
                    <p>{value?.name || value || "-"}</p>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <Label>Uploaded Documents</Label>
                  {formData.documents.length > 0 ? (
                    <ul>{formData.documents.map((file, i) => <li key={i}>{file.name}</li>)}</ul>
                  ) : <p>No documents uploaded</p>}
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <Button onClick={() => setCurrentStep(3)}>Back</Button>
                <Button onClick={handleSubmit}>Submit KYC</Button>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
};

export default CustomerKYCForm;
