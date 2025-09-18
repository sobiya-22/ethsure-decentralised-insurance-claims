import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import WalletConnect from '@/components/WalletConnect';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEmailSignup = (e) => {
    e.preventDefault();
    // Handle email signup logic
    console.log('Email signup:', formData);
    // Redirect to dashboard after successful signup
    navigate('/dashboard');
  };

  const handleWalletConnect = (address) => {
    setIsWalletConnected(true);
    setWalletAddress(address);
    console.log('Wallet connected for signup:', address);
    
    // Auto-redirect to dashboard after wallet connection
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const handleWalletDisconnect = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
    console.log('Wallet disconnected');
  };

  return (
    <div className="min-h-screen text-white w-full relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-emerald-400/10 to-purple-500/20 blur-3xl" />
      <div className="w-full max-w-md glass glow-border p-8 rounded-2xl shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
              <span className="text-2xl font-bold text-white">ES</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold gradient-text">Join EthSure</h1>
          <p className="text-gray-300 mt-2">Create your decentralized insurance account</p>
        </div>

        {/* Wallet Connection Section */}
        <div className="mb-8">
          <WalletConnect
            onConnect={handleWalletConnect}
            onDisconnect={handleWalletDisconnect}
            isConnected={isWalletConnected}
            walletAddress={walletAddress}
          />
        </div>

        <div className="flex items-center mb-6">
          <Separator className="flex-1 bg-white/20" />
          <span className="px-4 text-gray-300 text-sm font-medium">OR</span>
          <Separator className="flex-1 bg-white/20" />
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm text-gray-300">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm text-gray-300">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-gray-300">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-gray-300">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm text-gray-300">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className="text-blue-600 bg-gray-700 border-gray-600"
            />
            <Label htmlFor="acceptTerms" className="text-sm text-gray-300">
              I agree to the{' '}
              <Link to="/terms" className="text-blue-400 hover:text-blue-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </Link>
            </Label>
          </div>

          <Button type="submit" className="w-full button-pill h-12">
            Create Account with Email
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-2">
            <span>←</span> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
