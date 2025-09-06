import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { useWalletAddress } from "@/hooks/useWalletAddress";
import { agentAPI } from "@/services/api";

const AgentKYC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { walletAddress, isConnecting } = useWalletAddress();
  const [formData, setFormData] = useState({
    agent_name: "",
    agent_email: "",
    agent_phone: "",
    license_number: "",
    profile_photo_url: ""
  });

  useEffect(() => {
    if (!walletAddress) {
      navigate("/");
    }
  }, [navigate, walletAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async (file, type) => {
    // In a real implementation, you would upload to IPFS or a file storage service
    // For now, we'll simulate with a placeholder URL
    const mockUrl = `https://mock-storage.com/${type}/${Date.now()}-${file.name}`;
    setFormData(prev => ({
      ...prev,
      [type]: mockUrl
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!walletAddress) {
        throw new Error('Wallet address not found');
      }

      const response = await agentAPI.submitKYC({
        wallet_address: walletAddress,
        ...formData
      });

      console.log('KYC submitted successfully:', response.data);
      navigate('/agent-dashboard');
    } catch (error) {
      console.error('Error submitting KYC:', error);
      alert('Failed to submit KYC. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white w-full">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">
              Complete Your Agent Profile
            </CardTitle>
            <CardDescription className="text-center text-gray-300">
              Please provide the following information to complete your agent verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agent_name" className="text-white">Full Name *</Label>
                  <Input
                    id="agent_name"
                    name="agent_name"
                    value={formData.agent_name}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="agent_email" className="text-white">Email *</Label>
                  <Input
                    id="agent_email"
                    name="agent_email"
                    type="email"
                    value={formData.agent_email}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agent_phone" className="text-white">Phone Number *</Label>
                  <Input
                    id="agent_phone"
                    name="agent_phone"
                    value={formData.agent_phone}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="license_number" className="text-white">License Number *</Label>
                  <Input
                    id="license_number"
                    name="license_number"
                    value={formData.license_number}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="profile_photo" className="text-white">Profile Photo</Label>
                <Input
                  id="profile_photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleFileUpload(e.target.files[0], 'profile_photo_url');
                    }
                  }}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/agent-dashboard')}
                  className="flex-1 border-gray-600 text-white hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? "Submitting..." : "Submit Profile"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentKYC;
