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
    <div className="min-h-screen text-white w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-12 fade-in">
          <Link to="/">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-3xl mx-auto mb-6 flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 pulse-glow">
              <span className="text-3xl font-bold text-white">E</span>
            </div>
          </Link>
          <h1 className="text-4xl font-bold gradient-text mb-3">Join EthSure</h1>
          <p className="text-gray-300 text-lg">Create your decentralized insurance account</p>
        </div>

        {/* Signup Card */}
        <div className="enhanced-card p-8 slide-in-right">
        {/* Wallet Connection Section */}
          <div className="mb-8">
          <WalletConnect
            onConnect={handleWalletConnect}
            onDisconnect={handleWalletDisconnect}
            isConnected={isWalletConnected}
            walletAddress={walletAddress}
          />
          </div>

          <div className="flex items-center mb-8">
            <Separator className="flex-1 bg-white/20" />
            <span className="px-6 text-gray-400 text-sm font-medium">Or continue with Email</span>
            <Separator className="flex-1 bg-white/20" />
          </div>
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm text-gray-300 font-medium">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm text-gray-300 font-medium">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-gray-300 font-medium">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-gray-300 font-medium">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm text-gray-300 font-medium">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg border border-white/10">
            <Checkbox
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className="mt-1"
            />
            <Label htmlFor="acceptTerms" className="text-sm text-gray-300 leading-relaxed">
              I agree to the{' '}
              <Link to="/terms" className="text-blue-400 hover:text-blue-300 font-medium">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-blue-400 hover:text-blue-300 font-medium">
                Privacy Policy
              </Link>
            </Label>
          </div>

          <Button type="submit" className="w-full btn-primary h-14 text-lg font-semibold">
            Create Account with Email
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
