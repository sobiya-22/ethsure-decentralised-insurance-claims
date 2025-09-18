import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import WalletConnect from '@/components/WalletConnect';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isWalletConnected, setIsWalletConnected] = useState(false);
  // const [walletAddress, setWalletAddress] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = (e) => {
    e.preventDefault();
    // Handle email login logic
    // console.log('Email login:', { email, password });
    // Redirect to dashboard after successful login
    navigate('/dashboard');
  };

  const handleWalletConnect = (address) => {
    // setIsWalletConnected(true);
    // setWalletAddress(address);
    // console.log('Wallet connected:', address);
    
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
          <h1 className="text-3xl font-bold gradient-text">Welcome Back</h1>
          <p className="text-gray-300 mt-2">Sign in to your EthSure account</p>
        </div>

        {/* Wallet Connection Section */}
        {/* <div className="mb-8">
          <WalletConnect
            onConnect={handleWalletConnect}
            onDisconnect={handleWalletDisconnect}
            // isConnected={isWalletConnected}
            walletAddress={walletAddress}
          />
        </div> */}

        <div className="flex items-center mb-6">
          <Separator className="flex-1 bg-white/20" />
          <span className="px-4 text-gray-300 text-sm font-medium">OR</span>
          <Separator className="flex-1 bg-white/20" />
        </div>

        {/* Email Login Form */}
        {/* <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <Label htmlFor="remember" className="text-sm text-gray-300">Remember me</Label>
            </div>
            <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12">
            Sign In with Email
          </Button>
        </form> */}

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Sign up
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

export default Login;
