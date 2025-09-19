import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';


const Landing = () => {
  return (
    <div className="min-h-screen text-white w-full relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Navigation */}
      <Navbar/>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="fade-in">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                🚀 Powered by Blockchain Technology
              </span>
            </div>
            <h1 className="text-hero mb-8">
              <span className="gradient-text">
                Decentralized
              </span>
              <br />
              <span className="gradient-text">
                Insurance
              </span>
              <br />
              <span className="text-white">Claims</span>
            </h1>
            <p className="text-body mb-10 max-w-lg">
              Revolutionizing insurance with blockchain technology. Experience transparent, secure, and lightning-fast claims processing like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/signup">
                <Button size="lg" className="btn-primary text-lg px-10 py-4 rounded-xl font-semibold">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-10 py-4 rounded-xl font-semibold">
                  Learn More
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">10K+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">$50M+</div>
                <div className="text-sm text-gray-400">Claims Processed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="space-y-8 slide-in-right">
            <div className="enhanced-card card-hover p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Connect Wallet</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Securely connect your Web3 wallet to access our decentralized platform with enterprise-grade security.
                  </p>
                </div>
              </div>
            </div>

            <div className="enhanced-card card-hover p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Submit Claim</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Upload documents and submit your insurance claim directly on-chain with immutable proof of submission.
                  </p>
                </div>
              </div>
            </div>

            <div className="enhanced-card card-hover p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Get Paid Instantly</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Receive instant payments through automated smart contracts - no waiting, no paperwork delays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20 fade-in">
          <h2 className="text-section mb-6">
            Why Choose <span className="gradient-text">EthSure</span>?
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Built on cutting-edge blockchain technology for unparalleled transparency, security, and trust in every transaction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="enhanced-card card-hover p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">100% Transparent</h3>
            <p className="text-gray-300 leading-relaxed">
              Every transaction and claim is permanently recorded on the blockchain, ensuring complete transparency and eliminating fraud.
            </p>
          </div>

          <div className="enhanced-card card-hover p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Bank-Grade Security</h3>
            <p className="text-gray-300 leading-relaxed">
              Advanced cryptographic security and smart contracts protect your data and automate claim processing without intermediaries.
            </p>
          </div>

          <div className="enhanced-card card-hover p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Lightning Fast</h3>
            <p className="text-gray-300 leading-relaxed">
              Instant claim verification and payment processing through blockchain technology - get paid in minutes, not months.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="enhanced-card p-16 text-center">
          <h2 className="text-section mb-6">Ready to Get Started?</h2>
          <p className="text-body mb-12 max-w-2xl mx-auto">
            Join thousands of users who trust EthSure for their insurance needs. Experience the future of decentralized insurance today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <Button size="lg" className="btn-primary text-lg px-12 py-4 rounded-xl font-semibold">
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-12 py-4 rounded-xl font-semibold">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
