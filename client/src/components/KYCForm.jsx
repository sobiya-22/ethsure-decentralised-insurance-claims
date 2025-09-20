import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Check, AlertCircle, X, User, FileText, Camera, Shield } from 'lucide-react';

const KYCForm = ({ user, isOpen, onSubmitKYC, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    idType: '', idNumber: '', dateOfBirth: '', occupation: '', income: '',
    idDocument: null, addressProof: null, selfie: null
  });

  const handleSubmit = () => { onSubmitKYC?.(formData); onClose?.(); };
  const handleFileUpload = (field, file) => setFormData({...formData, [field]: file});
  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const steps = [
    { id: 1, title: 'Personal Information', completed: currentStep > 1 },
    { id: 2, title: 'Document Upload', completed: currentStep > 2 },
    { id: 3, title: 'Verification', completed: false }
  ];

  const isStep1Valid = formData.idType && formData.idNumber && formData.dateOfBirth && formData.occupation && formData.income;
  const isStep2Valid = formData.idDocument && formData.addressProof && formData.selfie;

  if (!isOpen) return null;

  const inputClass = "mt-3 bg-white/5 border-white/10 text-white placeholder:text-gray-400 p-4 text-lg rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 hover:bg-white/10";
  const selectClass = "w-full mt-3 p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 hover:bg-white/10";
  const buttonClass = "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-3 text-lg rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed";
  const cardClass = "glass shine border-white/20 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300";

  const FileUploadSection = ({ title, icon: Icon, field, accept = "image/*,.pdf" }) => (
    <div>
      <h3 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
        <Icon className="w-5 h-5 text-cyan-400" />
        {title}
      </h3>
      <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-cyan-400/50 hover:bg-white/5 transition-all duration-300">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-300 mb-3 text-lg">
          {field === 'idDocument' ? 'Upload your ID document (front and back)' :
           field === 'addressProof' ? 'Upload utility bill or bank statement' :
           'Take a selfie holding your ID document'}
        </p>
        <p className="text-gray-500 text-sm mb-6">
          {accept === "image/*" ? 'Accepted formats: JPG, PNG (Max 10MB)' : 'Accepted formats: JPG, PNG, PDF (Max 10MB)'}
        </p>
        <input type="file" accept={accept} onChange={(e) => handleFileUpload(field, e.target.files[0])} className="hidden" id={field} />
        <label htmlFor={field} className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl cursor-pointer transition-all duration-200 hover:scale-105">
          Choose File
        </label>
        {formData[field] && (
          <p className="text-emerald-400 text-sm mt-4 flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            {formData[field].name}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="text-white w-full space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl glass shine"><Shield className="w-8 h-8 text-cyan-400" /></div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Complete Your <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">KYC</span>
              </h1>
              <p className="text-xl text-gray-300 mt-2">Verify your identity to access all features</p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-200">
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex items-center mb-10">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                step.completed ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30 scale-110' : 
                currentStep === step.id ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-blue-500/30 scale-110' : 'bg-gray-700'
              }`}>
                {step.completed ? <Check className="w-6 h-6 text-white" /> : <span className="text-white text-lg font-bold">{step.id}</span>}
              </div>
              <span className={`ml-4 text-lg font-medium transition-all duration-200 ${
                currentStep === step.id ? 'text-white scale-105' : 'text-gray-400'
              }`}>{step.title}</span>
            </div>
            {index < steps.length - 1 && <div className={`flex-1 h-1 mx-6 rounded-full transition-all duration-300 ${step.completed ? 'bg-emerald-500' : 'bg-gray-700'}`} />}
          </React.Fragment>
        ))}
      </div>

      {currentStep === 1 && (
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white text-2xl">
              <User className="w-7 h-7 text-cyan-400" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="idType" className="text-white/90 font-medium text-lg">ID Type</Label>
                <select id="idType" value={formData.idType} onChange={(e) => handleInputChange('idType', e.target.value)} className={selectClass}>
                  <option value="" className="bg-gray-800">Select ID Type</option>
                  <option value="passport" className="bg-gray-800">Passport</option>
                  <option value="license" className="bg-gray-800">Driver's License</option>
                  <option value="national_id" className="bg-gray-800">National ID</option>
                </select>
              </div>
              <div>
                <Label htmlFor="idNumber" className="text-white/90 font-medium text-lg">ID Number</Label>
                <Input id="idNumber" type="text" value={formData.idNumber} onChange={(e) => handleInputChange('idNumber', e.target.value)} className={inputClass} placeholder="Enter your ID number" />
              </div>
              <div>
                <Label htmlFor="dateOfBirth" className="text-white/90 font-medium text-lg">Date of Birth</Label>
                <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={(e) => handleInputChange('dateOfBirth', e.target.value)} className={inputClass} />
              </div>
              <div>
                <Label htmlFor="occupation" className="text-white/90 font-medium text-lg">Occupation</Label>
                <Input id="occupation" type="text" value={formData.occupation} onChange={(e) => handleInputChange('occupation', e.target.value)} className={inputClass} placeholder="Enter your occupation" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="income" className="text-white/90 font-medium text-lg">Annual Income Range</Label>
                <select id="income" value={formData.income} onChange={(e) => handleInputChange('income', e.target.value)} className={selectClass}>
                  <option value="" className="bg-gray-800">Select Income Range</option>
                  <option value="0-25k" className="bg-gray-800">$0 - $25,000</option>
                  <option value="25k-50k" className="bg-gray-800">$25,000 - $50,000</option>
                  <option value="50k-100k" className="bg-gray-800">$50,000 - $100,000</option>
                  <option value="100k+" className="bg-gray-800">$100,000+</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end pt-6">
              <Button onClick={() => setCurrentStep(2)} disabled={!isStep1Valid} className={buttonClass}>
                Next Step
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white text-2xl">
              <FileText className="w-7 h-7 text-cyan-400" />
              Document Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <FileUploadSection title="ID Document" icon={Shield} field="idDocument" />
            <FileUploadSection title="Address Proof" icon={FileText} field="addressProof" />
            <FileUploadSection title="Selfie with ID" icon={Camera} field="selfie" accept="image/*" />
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl transition-all duration-200 hover:scale-105">
                Back
              </Button>
              <Button onClick={() => setCurrentStep(3)} disabled={!isStep2Valid} className={buttonClass}>
                Next Step
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white text-2xl">
              <Check className="w-7 h-7 text-cyan-400" />
              Review & Submit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
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
                  { label: 'ID Type', value: formData.idType.replace('_', ' ') },
                  { label: 'ID Number', value: formData.idNumber },
                  { label: 'Date of Birth', value: formData.dateOfBirth },
                  { label: 'Occupation', value: formData.occupation },
                  { label: 'Income Range', value: formData.income, span: 'md:col-span-2' }
                ].map((item, index) => (
                  <div key={index} className={`p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 ${item.span || ''}`}>
                    <span className="text-gray-400">{item.label}:</span> 
                    <span className="text-white ml-3 capitalize font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl transition-all duration-200 hover:scale-105">
                Back
              </Button>
              <Button onClick={handleSubmit} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-3 text-lg rounded-xl transition-all duration-200 hover:scale-105">
                Submit KYC
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KYCForm;