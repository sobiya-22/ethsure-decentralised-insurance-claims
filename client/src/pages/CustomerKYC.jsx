import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import { useWalletAddress } from "@/hooks/useWalletAddress";
import { customerAPI } from "@/services/api";

const CustomerKYC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { walletAddress, isConnecting } = useWalletAddress();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    date_of_birth: "",
    profile_photo_url: "",
    id_document_url: ""
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

      const response = await customerAPI.submitKYC({
        wallet_address: walletAddress,
        ...formData
      });

      console.log('KYC submitted successfully:', response.data);
      navigate('/customer-dashboard');
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
              Complete Your KYC
            </CardTitle>
            <CardDescription className="text-center text-gray-300">
              Please provide the following information to complete your verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer_name" className="text-white">Full Name *</Label>
                  <Input
                    id="customer_name"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="customer_email" className="text-white">Email *</Label>
                  <Input
                    id="customer_email"
                    name="customer_email"
                    type="email"
                    value={formData.customer_email}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer_phone" className="text-white">Phone Number *</Label>
                  <Input
                    id="customer_phone"
                    name="customer_phone"
                    value={formData.customer_phone}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="date_of_birth" className="text-white">Date of Birth *</Label>
                  <Input
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="customer_address" className="text-white">Address *</Label>
                <Textarea
                  id="customer_address"
                  name="customer_address"
                  value={formData.customer_address}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={3}
                />
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

              <div>
                <Label htmlFor="id_document" className="text-white">Identity Document</Label>
                <Input
                  id="id_document"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleFileUpload(e.target.files[0], 'id_document_url');
                    }
                  }}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/customer-dashboard')}
                  className="flex-1 border-gray-600 text-white hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? "Submitting..." : "Submit KYC"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerKYC;
