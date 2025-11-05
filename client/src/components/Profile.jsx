import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, User, Shield, Eye, EyeOff, Copy, Check, ArrowLeft, Mail, Phone, MapPin, Calendar, FileText, Fingerprint } from 'lucide-react';
import { userStore } from '@/context/userContext';
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showDID, setShowDID] = useState(false);
  const [copiedDID, setCopiedDID] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  // const user = userStore((state) => state.user);
  const user = {
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    role: "customer"
  };

  useEffect(() => {
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
    setUpdating(true);
    setTimeout(() => {
      setIsEditing(false);
      setUpdating(false);
    }, 1000);
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

  const handleCopyWallet = async () => {
    try {
      await navigator.clipboard.writeText(formData.wallet);
      setCopiedWallet(true);
      setTimeout(() => setCopiedWallet(false), 2000);
    } catch (err) {
      console.error('Failed to copy wallet:', err);
    }
  };

  const getRoleSpecificFields = () => {
    const role = user?.role?.toLowerCase();

    if (role === 'agent') return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              License Number
            </label>
            {isEditing ? (
              <input
                value={formData.licenseNumber || ''}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 outline-none"
                placeholder="Enter license number"
              />
            ) : (
              <p className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">{formData.licenseNumber || 'Not provided'}</p>
            )}
          </div>
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              Date of Birth
            </label>
            {isEditing ? (
              <input
                type="date"
                value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 outline-none"
              />
            ) : (
              <p className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not provided'}
              </p>
            )}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
          <label className="text-sm font-medium text-gray-300 mb-2 block">Approval Status</label>
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
            formData.isApproved
              ? 'text-emerald-400 bg-emerald-500/20 border border-emerald-500/30'
              : 'text-amber-400 bg-amber-500/20 border border-amber-500/30'
          }`}>
            <Shield className="w-4 h-4" />
            {formData.isApproved ? 'Approved' : 'Pending Approval'}
          </span>
        </div>
      </div>
    );

    if (role === 'customer') return (
      <div className="group">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <Calendar className="w-4 h-4 text-cyan-400" />
          Date of Birth
        </label>
        {isEditing ? (
          <input
            type="date"
            value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 outline-none"
          />
        ) : (
          <p className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
            {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not provided'}
          </p>
        )}
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
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'verification', label: 'Verification', icon: Shield },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="mx-auto space-y-6 space-x-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
              <p className="text-gray-400 mt-1">Manage your account information and preferences</p>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <Edit2 className="w-4 h-4" /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={updating}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-lg font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Save className="w-4 h-4" /> {updating ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={handleCancel}
                disabled={updating}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg font-medium text-white transition-all duration-200 disabled:opacity-50"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          )}
        </div>

        <div className="border-b border-white/10">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === 'personal' && (
            <>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border-2 border-white/20 shadow-lg">
                    <span className="text-3xl font-bold bg-gradient-to-br from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {formData.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{formData.name}</h2>
                    <p className="text-gray-400 capitalize">{user.role} Account</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <User className="w-4 h-4 text-cyan-400" />
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          value={formData.name || ''}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 outline-none"
                          placeholder="Enter full name"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">{formData.name || 'Not provided'}</p>
                      )}
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 outline-none"
                          placeholder="Enter email"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">{formData.email || 'Not provided'}</p>
                      )}
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <Phone className="w-4 h-4 text-cyan-400" />
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone || ''}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 outline-none"
                          placeholder="Enter phone number"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">{formData.phone || 'Not provided'}</p>
                      )}
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        Wallet Address
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-mono text-sm text-white overflow-hidden">
                          <div className="flex items-center gap-2">
                            <span className="truncate">{formData.wallet}</span>
                          </div>
                        </div>
                        <button
                          onClick={handleCopyWallet}
                          className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-200 group"
                          title="Copy wallet address"
                        >
                          {copiedWallet ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.address || ''}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 resize-none outline-none"
                        rows={3}
                        placeholder="Enter address"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">{formData.address || 'Not provided'}</p>
                    )}
                  </div>

                  {getRoleSpecificFields()}
                </div>
              </div>
            </>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                    <Shield className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">KYC Verification</h2>
                    <p className="text-gray-400 text-sm">Know Your Customer verification status</p>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                        <FileText className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">Verification Status</h3>
                        <p className="text-gray-400 text-sm">Identity verification complete</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-lg font-semibold border ${getStatusColor(formData.kycStatus)}`}>
                      {formData.kycStatus?.charAt(0).toUpperCase() + formData.kycStatus?.slice(1) || 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                    <Fingerprint className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Decentralized Identity</h2>
                    <p className="text-gray-400 text-sm">Your unique DID on the blockchain</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">DID Address</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-mono text-sm text-white break-all">
                        {showDID ? formData.did : `${formData.did?.substring(0, 24)}...${formData.did?.substring(formData.did.length - 16)}`}
                      </div>
                      <button
                        onClick={() => setShowDID(!showDID)}
                        className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-200 group"
                        title={showDID ? 'Hide DID' : 'Show DID'}
                      >
                        {showDID ? (
                          <EyeOff className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                        )}
                      </button>
                      <button
                        onClick={handleCopyDID}
                        className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-200 group"
                        title="Copy DID"
                      >
                        {copiedDID ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <label className="text-xs font-medium text-gray-400 mb-2 block">DID Method</label>
                      <p className="text-white font-semibold">Ethereum (ethr)</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <label className="text-xs font-medium text-gray-400 mb-2 block">Status</label>
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
