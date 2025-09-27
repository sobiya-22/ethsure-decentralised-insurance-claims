import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Check, AlertCircle, X, User, FileText, Camera, Shield, Home, Users, Folder } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';

// CSS classes moved outside component to prevent recalculation on every render
const inputClass = "mt-3 w-full bg-gray-800 border border-gray-600 text-white placeholder:text-gray-400 p-4 text-lg rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200";
const selectClass = "w-full mt-3 p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 hover:bg-white/10";
const buttonClass = "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-3 text-lg rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed";
const cardClass = "glass shine border-white/20 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300";

const KYCForm = ({ user, isOpen, onSubmitKYC, onClose, withLayout = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    idType: '', idNumber: '', dateOfBirth: '', occupation: '', income: '',
    idDocument: null, addressProof: null, selfie: null
  });

  const handleSubmit = () => { onSubmitKYC?.(formData); onClose?.(); };
  const handleFileUpload = (field, file) => setFormData(prev => ({ ...prev, [field]: file }));
  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const steps = [
    { id: 1, title: 'Personal Information', completed: currentStep > 1 },
    { id: 2, title: 'Document Upload', completed: currentStep > 2 },
    { id: 3, title: 'Verification', completed: false }
  ];

  const isStep1Valid = useMemo(() => 
    formData.idType && formData.idNumber && formData.dateOfBirth && formData.occupation && formData.income,
    [formData.idType, formData.idNumber, formData.dateOfBirth, formData.occupation, formData.income]
  );
  
  const isStep2Valid = useMemo(() => 
    formData.idDocument && formData.addressProof && formData.selfie,
    [formData.idDocument, formData.addressProof, formData.selfie]
  );

  if (!isOpen) return null;

  const FileUploadSection = ({ title, icon: Icon, field, accept = "image/*,.pdf" }) => (
    <div>
      <h3 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4 flex items-center gap-2">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
        {title}
      </h3>
      <div className="border-2 border-dashed border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:border-cyan-400/50 hover:bg-white/5 transition-all duration-300">
        <Upload className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
        <p className="text-gray-300 mb-2 sm:mb-3 text-base sm:text-lg">
          {field === 'idDocument' ? 'Upload your ID document (front and back)' :
           field === 'addressProof' ? 'Upload utility bill or bank statement' :
           'Take a selfie holding your ID document'}
        </p>
        <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
          {accept === "image/*" ? 'Accepted formats: JPG, PNG (Max 10MB)' : 'Accepted formats: JPG, PNG, PDF (Max 10MB)'}
        </p>
        <input type="file" accept={accept} onChange={(e) => handleFileUpload(field, e.target.files[0])} className="hidden" id={field} />
        <label 
          htmlFor={field} 
          className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 text-sm sm:text-base"
        >
          Choose File
        </label>
        {formData[field] && (
          <p className="text-emerald-400 text-xs sm:text-sm mt-3 sm:mt-4 flex items-center justify-center gap-2">
            <Check className="w-3 h-3 sm:w-4 sm:h-4" />
            {formData[field].name}
          </p>
        )}
      </div>
    </div>
  );

  const defaultUser = {
    name: "Rajesh Sharma",
    role: "Agent",
    email: "rajesh.sharma@ethsure.com",
    wallet: "0xA12B34C56D78E90F1234567890ABCDEF12345678",
    company: "EthSure"
  };

  const sidebarItems = [
    { id: 'overview', icon: Home, label: 'Overview', onClick: () => navigate('/agent-dashboard') },
    { id: 'customers', icon: Users, label: 'Customers', onClick: () => navigate('/agent/customers') },
    { id: 'claims', icon: FileText, label: 'Claims', onClick: () => navigate('/agent/claims') },
    { id: 'docvault', icon: Folder, label: 'DocVault', onClick: () => navigate('/agent-dashboard?view=docvault') },
  ];

  const getCurrentView = () => {
    const path = location.pathname;
    if (path.includes('/customers')) return 'customers';
    if (path.includes('/claims')) return 'claims';
    if (path.includes('/docvault')) return 'docvault';
    return 'overview';
  };

  const content = (
    <div className="text-white w-full space-y-6 sm:space-y-8 pt-12">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl glass shine"><Shield className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                Complete Your <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">KYC</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mt-2">Verify your identity to access all features</p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-200">
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </div>

      <div className="flex items-center mb-6 sm:mb-8 lg:mb-10 overflow-x-auto">
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

      {currentStep === 1 && (
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-white text-xl sm:text-2xl">
              <User className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-cyan-400" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-12 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label htmlFor="idType" className="text-white/90 font-medium text-lg">ID Type</Label>
                <select 
                  id="idType" 
                  value={formData.idType} 
                  onChange={(e) => handleInputChange('idType', e.target.value)} 
                  className={selectClass}
                >
                  <option value="" className="bg-gray-800">Select ID Type</option>
                  <option value="passport" className="bg-gray-800">Passport</option>
                  <option value="license" className="bg-gray-800">Driver's License</option>
                  <option value="national_id" className="bg-gray-800">National ID</option>
                </select>
              </div>
              <div>
                <Label htmlFor="idNumber" className="text-white/90 font-medium text-lg">ID Number</Label>
                <input 
                  id="idNumber" 
                  type="text" 
                  value={formData.idNumber} 
                  onChange={(e) => handleInputChange('idNumber', e.target.value)} 
                  className={inputClass}
                  placeholder="Enter your ID number" 
                  autoComplete="off"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth" className="text-white/90 font-medium text-lg">Date of Birth</Label>
                <input 
                  id="dateOfBirth" 
                  type="date" 
                  value={formData.dateOfBirth} 
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)} 
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor="occupation" className="text-white/90 font-medium text-lg">Occupation</Label>
                <input 
                  id="occupation" 
                  type="text" 
                  value={formData.occupation} 
                  onChange={(e) => handleInputChange('occupation', e.target.value)} 
                  className={inputClass}
                  placeholder="Enter your occupation" 
                  autoComplete="off"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="income" className="text-white/90 font-medium text-lg">Annual Income Range</Label>
                <select 
                  id="income" 
                  value={formData.income} 
                  onChange={(e) => handleInputChange('income', e.target.value)} 
                  className={selectClass}
                >
                  <option value="" className="bg-gray-800">Select Income Range</option>
                  <option value="0-3L" className="bg-gray-800">₹0 - ₹3,00,000</option>
                  <option value="3L-6L" className="bg-gray-800">₹3,00,000 - ₹6,00,000</option>
                  <option value="6L-12L" className="bg-gray-800">₹6,00,000 - ₹12,00,000</option>
                  <option value="12L+" className="bg-gray-800">₹12,00,000+</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end pt-4 sm:pt-6">
              <Button onClick={() => setCurrentStep(2)} disabled={!isStep1Valid} className={`${buttonClass} w-full sm:w-auto`}>
                Next Step
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-white text-xl sm:text-2xl">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-cyan-400" />
              Document Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 sm:space-y-8">
            <FileUploadSection title="ID Document" icon={Shield} field="idDocument" />
            <FileUploadSection title="Address Proof" icon={FileText} field="addressProof" />
            <FileUploadSection title="Selfie with ID" icon={Camera} field="selfie" accept="image/*" />
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-xl transition-all duration-200 hover:scale-105 w-full sm:w-auto">
                Back
              </Button>
              <Button onClick={() => setCurrentStep(3)} disabled={!isStep2Valid} className={`${buttonClass} w-full sm:w-auto`}>
                Next Step
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-xl transition-all duration-200 hover:scale-105 w-full sm:w-auto">
                Back
              </Button>
              <Button onClick={handleSubmit} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-xl transition-all duration-200 hover:scale-105 w-full sm:w-auto">
                Submit KYC
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  if (withLayout) {
    return (
      <DashboardLayout 
        sidebarItems={sidebarItems}
        user={user || defaultUser}
        widthClass="w-48"
        currentView={getCurrentView()}
        fullPageView={false}
      >
        {content}
      </DashboardLayout>
    );
  }

  return content;
};
export default KYCForm;