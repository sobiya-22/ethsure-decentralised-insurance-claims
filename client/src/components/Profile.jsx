import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit2, Save, X, User, Shield, FileText, Fingerprint, Key, Eye, EyeOff, Copy, Check, ArrowLeft } from 'lucide-react';
import { getCustomer, updateCustomer } from '../services/customerAPI';
import { getAgentDetails, updateAgentProfile } from '../services/agentAPI';
import { userStore } from '../context/userContext';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showDID, setShowDID] = useState(false);
  const [copiedDID, setCopiedDID] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const { user } = userStore((state) => state.user);
  const onClose = async () => {
    navigate(-1);
  }
  // Fetch user details based on wallet + role
  useEffect(() => {
      // For now, we'll just load some dummy data
      setFormData({
        name: "Sobiya Shaikh",
        email: "sobiya.shaikh@example.com",
        phone: "+91 98765 43210",
        address: "221B Baker Street, Mumbai, India",
        dateOfBirth: "2002-08-15",
        profilePhotoUrl: "",
        idDocumentUrl: "",
        kycStatus: "verified",
        did: "did:ethr:0x1234567890abcdef1234567890abcdef12345678",
        wallet: "0x1234567890abcdef1234567890abcdef12345678",
        licenseNumber: "LIC-987654",
        isApproved: true,
      });

      setLoading(false);
    }, []);
    const handleSave = async () => {
      if (!user?.wallet || !user?.role) return;

      try {
        setUpdating(true);
        let response;

        if (user.role.toLowerCase() === 'customer') {
          const updateData = {
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone,
            customer_address: formData.address,
            date_of_birth: formData.dateOfBirth
          };
          response = await updateCustomer(user.wallet.toLowerCase(), updateData);
        } else if (user.role.toLowerCase() === 'agent') {
          const updateData = {
            agent_name: formData.name,
            agent_email: formData.email,
            agent_phone: formData.phone,
            license_number: formData.licenseNumber,
            date_of_birth: formData.dateOfBirth
          };
          response = await updateAgentProfile(user.wallet.toLowerCase(), updateData);
        }

        if (response && onUpdateProfile) {
          onUpdateProfile(formData);
        }
        setIsEditing(false);
      } catch (err) {
        console.error('Failed to update profile:', err);
      } finally {
        setUpdating(false);
      }
    };

    const handleCancel = () => {
      setIsEditing(false);
    };

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
      const displayClasses = "text-white p-3 bg-white/5 rounded-lg mt-2 border border-white/10";

      if (role === 'agent') return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white/90 font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                License Number
              </Label>
              {isEditing ?
                <Input
                  value={formData.licenseNumber || ''}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  className={commonClasses}
                  placeholder="Enter license number"
                /> :
                <p className={displayClasses}>{formData.licenseNumber || 'Not provided'}</p>
              }
            </div>
            <div>
              <Label className="text-white/90 font-medium">Date of Birth</Label>
              {isEditing ?
                <Input
                  type="date"
                  value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className={commonClasses}
                /> :
                <p className={displayClasses}>
                  {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : 'Not provided'}
                </p>
              }
            </div>
          </div>

          <div>
            <Label className="text-white/90 font-medium">Approval Status</Label>
            <div className="mt-2">
              <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${formData.isApproved
                  ? 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30'
                  : 'text-amber-400 bg-amber-500/20 border-amber-500/30'
                }`}>
                {formData.isApproved ? 'Approved' : 'Pending Approval'}
              </span>
            </div>
          </div>
        </div>
      );

      if (role === 'customer') return (
        <div className="space-y-4">
          <div>
            <Label className="text-white/90 font-medium">Date of Birth</Label>
            {isEditing ?
              <Input
                type="date"
                value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className={commonClasses}
              /> :
              <p className={displayClasses}>
                {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : 'Not provided'}
              </p>
            }
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
    ];

    const commonClasses = "mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 hover:bg-white/10";
    const displayClasses = "text-white p-3 bg-white/5 rounded-lg mt-2 border border-white/10";
    const cardClasses = "glass border-white/10 hover:border-cyan-400/30 transition-all duration-300";

    if (loading) {
      return (
        <div className="text-white w-full flex items-center justify-center min-h-[400px] px-4">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="text-white w-full space-y-6 px-4 py-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg glass">
                <User className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  Profile <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Settings</span>
                </h1>
                <p className="text-gray-300 text-sm">
                  Manage your account information
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-sm"
              >
                <Edit2 className="w-4 h-4" /> Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={updating}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 text-sm"
                >
                  <Save className="w-4 h-4" /> {updating ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  disabled={updating}
                  className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-200 text-sm"
                >
                  <X className="w-4 h-4" /> Cancel
                </Button>
              </div>
            )}
            {isEditing && (
              <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200">
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/20">
          <div className="flex space-x-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-all duration-200 whitespace-nowrap ${activeTab === tab.id
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                  }`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              {/* Profile Picture */}
              <Card className={cardClasses}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white text-lg">
                    <User className="w-5 h-5 text-cyan-400" /> Profile Picture
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-3 border-2 border-white/20">
                    <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {formData.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Basic Information */}
              <Card className={cardClasses}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white text-lg">
                    <User className="w-5 h-5 text-cyan-400" /> Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white/90 font-medium text-sm">Full Name</Label>
                      {isEditing ?
                        <Input
                          value={formData.name || ''}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={commonClasses}
                          placeholder="Enter full name"
                        /> :
                        <p className={displayClasses}>{formData.name || 'Not provided'}</p>
                      }
                    </div>
                    <div>
                      <Label className="text-white/90 font-medium text-sm">Email</Label>
                      {isEditing ?
                        <Input
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={commonClasses}
                          placeholder="Enter email"
                        /> :
                        <p className={displayClasses}>{formData.email || 'Not provided'}</p>
                      }
                    </div>
                    <div>
                      <Label className="text-white/90 font-medium text-sm">Phone</Label>
                      {isEditing ?
                        <Input
                          type="tel"
                          value={formData.phone || ''}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={commonClasses}
                          placeholder="Enter phone number"
                        /> :
                        <p className={displayClasses}>{formData.phone || 'Not provided'}</p>
                      }
                    </div>
                    <div>
                      <Label className="text-white/90 font-medium text-sm flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Wallet Address
                      </Label>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-white p-3 bg-white/5 rounded-lg font-mono text-xs flex-1 border border-white/10 break-all">
                          {formData.wallet}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-white/90 font-medium text-sm">Address</Label>
                    {isEditing ?
                      <textarea
                        value={formData.address || ''}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full mt-2 p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 hover:bg-white/10 resize-none text-sm"
                        rows={2}
                        placeholder="Enter address"
                      /> :
                      <p className={displayClasses}>{formData.address || 'Not provided'}</p>
                    }
                  </div>
                  {getRoleSpecificFields()}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-6">
              <Card className={cardClasses}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white text-lg">
                    <Shield className="w-5 h-5 text-cyan-400" /> KYC Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/20">
                        <Shield className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">KYC Status</h3>
                        <p className="text-gray-400 text-xs">Know Your Customer verification</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(formData.kycStatus)}`}>
                      {formData.kycStatus || 'Pending'}
                    </span>
                  </div>

                  {/* DID Section */}
                  <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20">
                        <Fingerprint className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">Your DID</h3>
                        <p className="text-gray-400 text-xs">Decentralized Identifier</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-white/90 font-medium text-sm">DID Address</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 p-3 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-xs break-all">
                            {showDID ? formData.did : `${formData.did?.substring(0, 20)}...${formData.did?.substring(formData.did.length - 10)}`}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowDID(!showDID)}
                            className="border-white/20 text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
                          >
                            {showDID ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopyDID}
                            className="border-white/20 text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
                          >
                            {copiedDID ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-white/90 font-medium text-xs">DID Method</Label>
                          <p className="text-white p-2 bg-white/5 rounded-lg mt-1 border border-white/10 text-xs">Ethereum (ethr)</p>
                        </div>
                        <div>
                          <Label className="text-white/90 font-medium text-xs">Status</Label>
                          <span className="inline-block px-2 py-1 rounded-lg text-xs font-medium border bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mt-1">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default Profile;