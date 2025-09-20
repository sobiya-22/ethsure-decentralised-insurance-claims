import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, User, Shield, Calendar, DollarSign, FileText, CheckCircle } from 'lucide-react';

const CreatePolicyModal = ({ isOpen, onClose, customers = [] }) => {
  const [formData, setFormData] = useState({
    customerId: '', policyType: '', coverageAmount: '', premiumAmount: '', startDate: '', endDate: '', beneficiary: '', description: '', riskAssessment: 'Low', paymentFrequency: 'Monthly'
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const policyTypes = [
    { value: 'health', label: 'Health Insurance', description: 'Medical coverage and hospitalization' },
    { value: 'life', label: 'Life Insurance', description: 'Death benefit and financial security' },
    { value: 'auto', label: 'Auto Insurance', description: 'Vehicle damage and liability coverage' },
    { value: 'property', label: 'Property Insurance', description: 'Home and property protection' },
    { value: 'travel', label: 'Travel Insurance', description: 'Trip cancellation and medical coverage' },
    { value: 'business', label: 'Business Insurance', description: 'Commercial liability and property' }
  ];
  const paymentFrequencies = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'semi-annual', label: 'Semi-Annual' },
    { value: 'annual', label: 'Annual' }
  ];
  const riskAssessments = [
    { value: 'low', label: 'Low Risk', color: 'text-emerald-400' },
    { value: 'medium', label: 'Medium Risk', color: 'text-yellow-400' },
    { value: 'high', label: 'High Risk', color: 'text-red-400' }
  ];

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleNext = () => {
    if (currentStep === 1 && formData.customerId) setCurrentStep(2);
    else if (currentStep === 2 && formData.policyType && formData.coverageAmount && formData.premiumAmount) setCurrentStep(3);
  };
  const handlePrevious = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onClose();
    setFormData({ customerId: '', policyType: '', coverageAmount: '', premiumAmount: '', startDate: '', endDate: '', beneficiary: '', description: '', riskAssessment: 'Low', paymentFrequency: 'Monthly' });
    setCurrentStep(1);
  };

  const selectedCustomer = customers.find(c => c.id.toString() === formData.customerId);
  const selectedPolicyType = policyTypes.find(p => p.value === formData.policyType);

  if (!isOpen) return null;

  return (
    <div className="text-white w-full space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl glass shine"><Shield className="w-8 h-8 text-cyan-400" /></div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">Create New <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Policy</span></h1>
              <p className="text-xl text-gray-300 mt-2">Step {currentStep} of 3 - Create a comprehensive insurance policy</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-200">
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${step <= currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'bg-gray-700 text-gray-400'}`}>
                {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-1 mx-2 transition-all duration-300 ${step < currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-700'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6 animate-fadeInUp">
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card className="glass border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white"><User className="w-5 h-5" />Select Customer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customer" className="text-white">Customer</Label>
                    <select id="customer" value={formData.customerId} onChange={(e) => handleInputChange('customerId', e.target.value)} className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 hover:bg-white/10">
                      <option value="">Select a customer</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>{customer.name} - {customer.policy}</option>
                      ))}
                    </select>
                  </div>
                  {selectedCustomer && (
                    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 animate-fadeInUp">
                      <h4 className="font-medium text-blue-400 mb-2">Selected Customer</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-gray-400">Name:</span><p className="text-white">{selectedCustomer.name}</p></div>
                        <div><span className="text-gray-400">Current Policy:</span><p className="text-white">{selectedCustomer.policy}</p></div>
                        <div><span className="text-gray-400">Status:</span><p className="text-green-400">{selectedCustomer.status}</p></div>
                        <div><span className="text-gray-400">Premium:</span><p className="text-white">{selectedCustomer.premium}</p></div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <Card className="glass border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white"><Shield className="w-5 h-5" />Policy Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="policyType" className="text-white">Policy Type</Label>
                    <select id="policyType" value={formData.policyType} onChange={(e) => handleInputChange('policyType', e.target.value)} className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 hover:bg-white/10">
                      <option value="">Select policy type</option>
                      {policyTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                    {selectedPolicyType && (
                      <p className="text-gray-400 text-sm mt-1">{selectedPolicyType.description}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="coverageAmount" className="text-white">Coverage Amount</Label>
                      <Input id="coverageAmount" type="text" placeholder="e.g., $500,000" value={formData.coverageAmount} onChange={(e) => handleInputChange('coverageAmount', e.target.value)} className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 hover:bg-white/10" />
                    </div>
                    <div>
                      <Label htmlFor="premiumAmount" className="text-white">Premium Amount</Label>
                      <Input id="premiumAmount" type="text" placeholder="e.g., Ξ0.15/month" value={formData.premiumAmount} onChange={(e) => handleInputChange('premiumAmount', e.target.value)} className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 hover:bg-white/10" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate" className="text-white">Start Date</Label>
                      <Input id="startDate" type="date" value={formData.startDate} onChange={(e) => handleInputChange('startDate', e.target.value)} className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 hover:bg-white/10" />
                    </div>
                    <div>
                      <Label htmlFor="endDate" className="text-white">End Date</Label>
                      <Input id="endDate" type="date" value={formData.endDate} onChange={(e) => handleInputChange('endDate', e.target.value)} className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 hover:bg-white/10" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="beneficiary" className="text-white">Beneficiary</Label>
                    <Input id="beneficiary" type="text" placeholder="Beneficiary name" value={formData.beneficiary} onChange={(e) => handleInputChange('beneficiary', e.target.value)} className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 hover:bg-white/10" />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <textarea id="description" placeholder="Additional policy details..." value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-all duration-300 hover:bg-white/10" rows={3} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <Card className="glass border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white"><DollarSign className="w-5 h-5" />Payment & Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="paymentFrequency" className="text-white">Payment Frequency</Label>
                    <select id="paymentFrequency" value={formData.paymentFrequency} onChange={(e) => handleInputChange('paymentFrequency', e.target.value)} className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 hover:bg-white/10">
                      {paymentFrequencies.map((freq) => (
                        <option key={freq.value} value={freq.value}>{freq.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="riskAssessment" className="text-white">Risk Assessment</Label>
                    <select id="riskAssessment" value={formData.riskAssessment} onChange={(e) => handleInputChange('riskAssessment', e.target.value)} className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 hover:bg-white/10">
                      {riskAssessments.map((risk) => (
                        <option key={risk.value} value={risk.value}>{risk.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white"><FileText className="w-5 h-5" />Policy Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-gray-400">Customer:</span><span className="text-white">{selectedCustomer?.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Policy Type:</span><span className="text-white">{selectedPolicyType?.label}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Coverage:</span><span className="text-white">{formData.coverageAmount}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Premium:</span><span className="text-white">{formData.premiumAmount}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Payment:</span><span className="text-white">{formData.paymentFrequency}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Risk Level:</span><span className={`${riskAssessments.find(r => r.value === formData.riskAssessment)?.color}`}>{formData.riskAssessment}</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={currentStep === 1 ? onClose : handlePrevious} disabled={isSubmitting}>
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </Button>
          <div className="flex gap-3">
            {currentStep < 3 ? (
              <Button onClick={handleNext} disabled={(currentStep === 1 && !formData.customerId) || (currentStep === 2 && (!formData.policyType || !formData.coverageAmount || !formData.premiumAmount))} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                {isSubmitting ? 'Creating Policy...' : 'Create Policy'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePolicyModal;