import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, FileText, Check, AlertCircle } from "lucide-react";
import { useAccount } from "wagmi";

// Import your service APIs
import { submitAgentKYC } from "@/services/agentAPI";
import { submitCustomerKYC } from "@/services/customerAPI";

const KYCForm = ({role }) => {
  const navigate = useNavigate();
 const { address, isConnected } = useAccount();

  //const wallet_address = address
  const [formData, setFormData] = useState({
    idType: "",
    idNumber: "",
    dateOfBirth: "",
    occupation: "",
    income: "",
    documents: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field on change
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileUpload = (event) => {
    setFormData((prev) => ({
      ...prev,
      documents: Array.from(event.target.files),
    }));
    setErrors((prev) => ({ ...prev, documents: "" }));
  };

  // Validate fields for Step 1
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

  // Validate fields for Step 2
  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.documents || formData.documents.length === 0) {
      newErrors.documents = "At least one document is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;

    setCurrentStep((prev) => prev + 1);
  };

  //handle submit
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

    console.log("Submitting KYC payload:", payload);

    if (role === "customer") {
      await submitCustomerKYC(payload);
      navigate("/customer-dashboard");
    } else if (role === "agent") {
      await submitAgentKYC(payload); 
      navigate("/agent-dashboard");
    }

    alert("KYC submitted successfully!");
  } catch (err) {
    console.error("KYC submission failed:", err);
    alert("Submission failed. Please try again.");
  }
};

  const cardClass =
    "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 shadow-xl rounded-2xl overflow-hidden";
  const inputClass =
    "w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all";
  const selectClass =
    "w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all";

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
        {/* Step 1: Personal Information */}
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
                  <Label
                    htmlFor="idType"
                    className="text-white/90 font-medium text-lg"
                  >
                    ID Type
                  </Label>
                  <select
                    id="idType"
                    value={formData.idType}
                    onChange={(e) => handleInputChange("idType", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select ID Type</option>
                    <option value="passport">Passport</option>
                    <option value="license">Driver's License</option>
                    <option value="national_id">National ID</option>
                  </select>
                  {errors.idType && (
                    <p className="text-red-500 text-sm mt-1">{errors.idType}</p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="idNumber"
                    className="text-white/90 font-medium text-lg"
                  >
                    ID Number
                  </Label>
                  <Input
                    id="idNumber"
                    type="text"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
                    className={inputClass}
                    placeholder="Enter your ID number"
                  />
                  {errors.idNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="dateOfBirth"
                    className="text-white/90 font-medium text-lg"
                  >
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    className={inputClass}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="occupation"
                    className="text-white/90 font-medium text-lg"
                  >
                    Occupation
                  </Label>
                  <Input
                    id="occupation"
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    className={inputClass}
                    placeholder="Enter your occupation"
                  />
                  {errors.occupation && (
                    <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <Label
                    htmlFor="income"
                    className="text-white/90 font-medium text-lg"
                  >
                    Annual Income Range
                  </Label>
                  <select
                    id="income"
                    value={formData.income}
                    onChange={(e) => handleInputChange("income", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select Income Range</option>
                    <option value="0-3L">₹0 - ₹3,00,000</option>
                    <option value="3L-6L">₹3,00,000 - ₹6,00,000</option>
                    <option value="6L-12L">₹6,00,000 - ₹12,00,000</option>
                    <option value="12L+">₹12,00,000+</option>
                  </select>
                  {errors.income && (
                    <p className="text-red-500 text-sm mt-1">{errors.income}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4 sm:pt-6">
                <Button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-xl transition-all duration-200 hover:scale-105"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Document Upload */}
        {currentStep === 2 && (
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
                <Input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="bg-white/5 border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 cursor-pointer"
                />
                {errors.documents && (
                  <p className="text-red-500 text-sm mt-1">{errors.documents}</p>
                )}
                <p className="text-sm text-white/60">
                  Upload government-issued ID and proof of address (PDF, JPG, PNG).
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-xl transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-xl transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review & Submit */}
{currentStep === 3 && (
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
          Please review your information before final submission. KYC verification typically takes 24-48 hours.
        </p>
      </div>

      {/* Display Review Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <Label className="text-white/90 font-medium text-lg">ID Type</Label>
          <p className="text-white/80 text-lg">{formData.idType || "-"}</p>
        </div>

        <div>
          <Label className="text-white/90 font-medium text-lg">ID Number</Label>
          <p className="text-white/80 text-lg">{formData.idNumber || "-"}</p>
        </div>

        <div>
          <Label className="text-white/90 font-medium text-lg">Date of Birth</Label>
          <p className="text-white/80 text-lg">{formData.dateOfBirth || "-"}</p>
        </div>

        <div>
          <Label className="text-white/90 font-medium text-lg">Occupation</Label>
          <p className="text-white/80 text-lg">{formData.occupation || "-"}</p>
        </div>

        <div className="sm:col-span-2">
          <Label className="text-white/90 font-medium text-lg">Annual Income</Label>
          <p className="text-white/80 text-lg">{formData.income || "-"}</p>
        </div>

        <div className="sm:col-span-2">
          <Label className="text-white/90 font-medium text-lg">Uploaded Documents</Label>
          {formData.documents.length > 0 ? (
            <ul className="text-white/80 list-disc ml-5">
              {formData.documents.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-white/80">No documents uploaded</p>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(2)}
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

export default KYCForm;
