import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit2, Save, X, User, Shield, FileText, Settings, Bell, Lock, Upload, AlertCircle, Key, Eye, EyeOff, Fingerprint, Copy, Check } from 'lucide-react';
import DocVault from './DocVault';

const Profile = ({ user, onUpdateProfile, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showWallet, setShowWallet] = useState(false);
  const [showDID, setShowDID] = useState(false);
  const [copiedDID, setCopiedDID] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '', email: user?.email || '', phone: user?.phone || '', address: user?.address || '',
    company: user?.company || '', department: user?.department || '', employeeId: user?.employeeId || '',
    licenseNumber: user?.licenseNumber || '', specialization: user?.specialization || '', experience: user?.experience || '',
    kycStatus: user?.kycStatus || 'Pending', riskProfile: user?.riskProfile || 'Medium', annualIncome: user?.annualIncome || '',
    occupation: user?.occupation || '', emergencyContact: user?.emergencyContact || '', emergencyPhone: user?.emergencyPhone || '',
    did: user?.did || 'did:ethr:0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
  });

  const handleSave = () => { onUpdateProfile?.(formData); setIsEditing(false); };
  const handleCancel = () => { setFormData({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', address: user?.address || '', company: user?.company || '', department: user?.department || '', employeeId: user?.employeeId || '', licenseNumber: user?.licenseNumber || '', specialization: user?.specialization || '', experience: user?.experience || '', kycStatus: user?.kycStatus || 'Pending', riskProfile: user?.riskProfile || 'Medium', annualIncome: user?.annualIncome || '', occupation: user?.occupation || '', emergencyContact: user?.emergencyContact || '', emergencyPhone: user?.emergencyPhone || '', did: user?.did || 'did:ethr:0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' }); setIsEditing(false); };
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const handleCopyDID = async () => {
    try {
      await navigator.clipboard.writeText(formData.did);
      setCopiedDID(true);
      setTimeout(() => setCopiedDID(false), 2000);
    } catch (err) {
      console.error('Failed to copy DID:', err);
    }
  };

  const getRoleSpecificFields = () => {
    const role = user?.role?.toLowerCase();
    const commonClasses = "mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 hover:bg-white/10";
    const displayClasses = "text-white p-4 bg-white/5 rounded-xl mt-2 border border-white/10 hover:bg-white/10 transition-all duration-200";

    if (role === 'agent') return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-white/90 font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" />
              License Number
            </Label>
            {isEditing ? <Input value={formData.licenseNumber} onChange={(e) => handleInputChange('licenseNumber', e.target.value)} className={commonClasses} placeholder="Enter license number" /> : <p className={displayClasses}>{user?.licenseNumber || 'Not provided'}</p>}
          </div>
          <div>
            <Label className="text-white/90 font-medium">Specialization</Label>
            {isEditing ? <Input value={formData.specialization} onChange={(e) => handleInputChange('specialization', e.target.value)} className={commonClasses} placeholder="e.g., Health Insurance, Auto Insurance" /> : <p className={displayClasses}>{user?.specialization || 'Not specified'}</p>}
          </div>
        </div>
        <div>
          <Label className="text-white/90 font-medium">Years of Experience</Label>
          {isEditing ? <Input type="number" value={formData.experience} onChange={(e) => handleInputChange('experience', e.target.value)} className={commonClasses} placeholder="Enter years of experience" /> : <p className={displayClasses}>{user?.experience || 'Not specified'} years</p>}
        </div>
      </div>
    );
    
    if (role === 'customer') return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-white/90 font-medium">Annual Income</Label>
            {isEditing ? <Input value={formData.annualIncome} onChange={(e) => handleInputChange('annualIncome', e.target.value)} className={commonClasses} placeholder="Enter annual income" /> : <p className={displayClasses}>{user?.annualIncome || 'Not provided'}</p>}
          </div>
          <div>
            <Label className="text-white/90 font-medium">Occupation</Label>
            {isEditing ? <Input value={formData.occupation} onChange={(e) => handleInputChange('occupation', e.target.value)} className={commonClasses} placeholder="Enter occupation" /> : <p className={displayClasses}>{user?.occupation || 'Not provided'}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-white/90 font-medium">Emergency Contact</Label>
            {isEditing ? <Input value={formData.emergencyContact} onChange={(e) => handleInputChange('emergencyContact', e.target.value)} className={commonClasses} placeholder="Emergency contact name" /> : <p className={displayClasses}>{user?.emergencyContact || 'Not provided'}</p>}
          </div>
          <div>
            <Label className="text-white/90 font-medium">Emergency Phone</Label>
            {isEditing ? <Input value={formData.emergencyPhone} onChange={(e) => handleInputChange('emergencyPhone', e.target.value)} className={commonClasses} placeholder="Emergency contact phone" /> : <p className={displayClasses}>{user?.emergencyPhone || 'Not provided'}</p>}
          </div>
        </div>
      </div>
    );
    
    if (role === 'company') return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-white/90 font-medium">Department</Label>
            {isEditing ? <Input value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)} className={commonClasses} placeholder="Enter department" /> : <p className={displayClasses}>{user?.department || 'Not specified'}</p>}
          </div>
          <div>
            <Label className="text-white/90 font-medium">Employee ID</Label>
            {isEditing ? <Input value={formData.employeeId} onChange={(e) => handleInputChange('employeeId', e.target.value)} className={commonClasses} placeholder="Enter employee ID" /> : <p className={displayClasses}>{user?.employeeId || 'Not provided'}</p>}
          </div>
        </div>
      </div>
    );
    return null;
  };

  const getStatusColor = (status) => {
    const colors = { 
      verified: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30', 
      pending: 'text-amber-400 bg-amber-500/20 border-amber-500/30', 
      rejected: 'text-red-400 bg-red-500/20 border-red-500/30' 
    };
    return colors[status?.toLowerCase()] || 'text-gray-400 bg-gray-700/50 border-gray-600/30';
  };

  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'did', label: 'DID', icon: Fingerprint },
    { id: 'documents', label: 'DocVault', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const commonClasses = "mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 hover:bg-white/10";
  const displayClasses = "text-white p-4 bg-white/5 rounded-xl mt-2 border border-white/10 hover:bg-white/10 transition-all duration-200";
  const cardClasses = "glass shine border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300 hover:scale-[1.02]";

  return (
    <div className="text-white w-full space-y-8 pt-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl glass shine">
                <User className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                  Profile <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Settings</span>
                </h1>
                <p className="text-xl text-gray-300 mt-2">
                  Manage your account information and preferences
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105">
                <Edit2 className="w-5 h-5" /> Edit Profile
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105">
                  <Save className="w-5 h-5" /> Save
                </Button>
                <Button onClick={handleCancel} variant="outline" className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-xl transition-all duration-200">
                  <X className="w-5 h-5" /> Cancel
                </Button>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-200">
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/20">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                className={`flex items-center gap-3 py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'border-cyan-400 text-cyan-400 transform scale-105' 
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                }`}
              >
                <tab.icon className="w-5 h-5" /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'personal' && (
            <div className="space-y-8">
              {/* Profile Picture */}
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <User className="w-6 h-6 text-cyan-400" /> Profile Picture
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 border-2 border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}</span>
                  </div>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6 py-2 rounded-xl transition-all duration-200 hover:scale-105">
                    <Upload className="w-4 h-4 mr-2" /> Upload Photo
                  </Button>
                </CardContent>
              </Card>

              {/* Basic Information */}
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <User className="w-6 h-6 text-cyan-400" /> Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white/90 font-medium">Full Name</Label>
                      {isEditing ? <Input value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className={commonClasses} placeholder="Enter full name" /> : <p className={displayClasses}>{user?.name}</p>}
                    </div>
                    <div>
                      <Label className="text-white/90 font-medium">Email</Label>
                      {isEditing ? <Input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className={commonClasses} placeholder="Enter email" /> : <p className={displayClasses}>{user?.email}</p>}
                    </div>
                    <div>
                      <Label className="text-white/90 font-medium">Phone</Label>
                      {isEditing ? <Input type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className={commonClasses} placeholder="Enter phone number" /> : <p className={displayClasses}>{user?.phone || 'Not provided'}</p>}
                    </div>
                    <div>
                      <Label className="text-white/90 font-medium flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Wallet Address
                      </Label>
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-white p-4 bg-white/5 rounded-xl font-mono text-sm flex-1 border border-white/10">{showWallet ? user?.wallet : `${user?.wallet?.slice(0, 8)}...${user?.wallet?.slice(-6)}`}</p>
                        <Button variant="ghost" size="sm" onClick={() => setShowWallet(!showWallet)} className="text-gray-400 hover:text-white p-3 rounded-xl transition-all duration-200">
                          {showWallet ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-white/90 font-medium">Address</Label>
                    {isEditing ? <textarea value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} className="w-full mt-2 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 hover:bg-white/10 resize-none" rows={3} placeholder="Enter address" /> : <p className={displayClasses}>{user?.address || 'Not provided'}</p>}
                  </div>
                  {getRoleSpecificFields()}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-8">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <Shield className="w-6 h-6 text-cyan-400" /> KYC Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-amber-500/20">
                        <AlertCircle className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">KYC Status</h3>
                        <p className="text-gray-400 text-sm">Know Your Customer verification</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-xl text-sm font-medium border ${getStatusColor(user?.kycStatus)}`}>{user?.kycStatus || 'Pending'}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white/90 font-medium">Risk Profile</Label>
                      {isEditing ? <select value={formData.riskProfile} onChange={(e) => handleInputChange('riskProfile', e.target.value)} className="w-full mt-2 p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200">
                        <option value="Low" className="bg-gray-800 text-white">Low Risk</option>
                        <option value="Medium" className="bg-gray-800 text-white">Medium Risk</option>
                        <option value="High" className="bg-gray-800 text-white">High Risk</option>
                      </select> : <p className={displayClasses}>{user?.riskProfile || 'Medium'}</p>}
                    </div>
                    <div>
                      <Label className="text-white/90 font-medium">Verification Level</Label>
                      <p className={displayClasses}>{user?.role === 'Agent' ? 'Level 2' : 'Level 1'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'did' && (
            <div className="space-y-8">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <Fingerprint className="w-6 h-6 text-cyan-400" /> Decentralized Identifier (DID)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-cyan-500/20">
                        <Fingerprint className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">Your DID</h3>
                        <p className="text-gray-400 text-sm">Your unique decentralized identifier on the blockchain</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white/90 font-medium">DID Address</Label>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm break-all">
                            {showDID ? formData.did : `${formData.did.substring(0, 20)}...${formData.did.substring(formData.did.length - 10)}`}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowDID(!showDID)}
                            className="border-white/20 text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-200"
                          >
                            {showDID ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopyDID}
                            className="border-white/20 text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-200"
                          >
                            {copiedDID ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-white/90 font-medium">DID Method</Label>
                          <p className="text-white p-4 bg-white/5 rounded-xl mt-2 border border-white/10">Ethereum (ethr)</p>
                        </div>
                        <div>
                          <Label className="text-white/90 font-medium">Network</Label>
                          <p className="text-white p-4 bg-white/5 rounded-xl mt-2 border border-white/10">Ethereum Mainnet</p>
                        </div>
                        <div>
                          <Label className="text-white/90 font-medium">Status</Label>
                          <span className="inline-block px-4 py-2 rounded-xl text-sm font-medium border bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mt-2">Active</span>
                        </div>
                        <div>
                          <Label className="text-white/90 font-medium">Created</Label>
                          <p className="text-white p-4 bg-white/5 rounded-xl mt-2 border border-white/10">Jan 15, 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <h3 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
                      <Key className="w-5 h-5 text-purple-400" />
                      DID Capabilities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="p-2 rounded-lg bg-emerald-500/20">
                          <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-white text-sm">Identity Verification</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="p-2 rounded-lg bg-emerald-500/20">
                          <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-white text-sm">Document Signing</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="p-2 rounded-lg bg-emerald-500/20">
                          <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-white text-sm">Credential Issuance</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="p-2 rounded-lg bg-emerald-500/20">
                          <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-white text-sm">Secure Authentication</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'documents' && (
            <DocVault user={user} />
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <Settings className="w-6 h-6 text-cyan-400" /> Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { icon: Lock, title: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account', color: 'bg-blue-500/20 text-blue-400' },
                    { icon: Bell, title: 'Email Notifications', desc: 'Receive updates about your policies and claims', color: 'bg-green-500/20 text-green-400' },
                    { icon: Key, title: 'Change Password', desc: 'Update your account password', color: 'bg-purple-500/20 text-purple-400' }
                  ].map((setting, idx) => (
                    <div key={idx} className="flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${setting.color}`}>
                          <setting.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">{setting.title}</h3>
                          <p className="text-gray-400 text-sm">{setting.desc}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 transition-all duration-200 hover:scale-105">
                        {setting.title === 'Change Password' ? 'Change' : setting.title === 'Two-Factor Authentication' ? 'Enable' : 'Configure'}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
    </div>
  );
};

export default Profile;