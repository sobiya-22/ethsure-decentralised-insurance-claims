import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';


const Landing = () => {
  return (
    <div className="min-h-screen text-white w-full relative overflow-hidden pt-20">
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-emerald-400/10 to-purple-500/20 blur-3xl" />

      <Navbar/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 glass text-xs uppercase tracking-wider text-gray-300 px-3 py-1 rounded-full">
              Insurance on-chain
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
              Build trustworthy
              <span className="block gradient-text">decentralized claims</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Transparent, secure, and efficient insurance claims powered by smart contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link to="/signup">
                <Button size="lg" className="button-pill text-lg px-8 py-4 shine">
                  Get Started
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="glass text-gray-200 hover:text-white text-lg px-8 py-4">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 order-first lg:order-last">
            <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-blue-600 text-white">1</Badge>
                  <CardTitle className="text-white text-lg sm:text-xl">Connect Wallet</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-sm sm:text-base">
                  Securely connect your Web3 wallet to access the platform.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-600 text-white">2</Badge>
                  <CardTitle className="text-white text-lg sm:text-xl">Submit Claim</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-sm sm:text-base">
                  Upload documents and submit your insurance claim on-chain.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-purple-600 text-white">3</Badge>
                  <CardTitle className="text-white text-lg sm:text-xl">Get Paid</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-sm sm:text-base">
                  Receive instant payments through smart contracts.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Why Choose EthSure?</h2>
          <p className="text-lg sm:text-xl text-gray-300">Built on blockchain for transparency and trust</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
            <CardHeader>
              <CardTitle className="text-white">Transparent</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                All transactions and claims are recorded on the blockchain for complete transparency.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
            <CardHeader>
              <CardTitle className="text-white">Secure</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Smart contracts ensure secure and automated claim processing without intermediaries.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
            <CardHeader>
              <CardTitle className="text-white">Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Instant claim verification and payment processing through blockchain technology.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">Join thousands of users already using EthSure</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="button-pill text-lg px-8 py-4 shine">
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="glass text-gray-200 hover:text-white text-lg px-8 py-4">
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