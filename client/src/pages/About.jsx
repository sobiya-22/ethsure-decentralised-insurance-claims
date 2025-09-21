import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen text-white w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-emerald-400/10 to-purple-500/20 blur-3xl" />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            About <span className="bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent">EthSure</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            We're revolutionizing the insurance industry by leveraging blockchain technology to create a more transparent, secure, and efficient claims processing system.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className={`transform transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">Our Mission</h2>
            <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6">
              To democratize insurance by making it accessible, transparent, and fair for everyone. We believe that insurance should work for the people, not against them.
            </p>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
              By using blockchain technology, we eliminate the need for intermediaries, reduce costs, and ensure that every transaction is recorded immutably for complete transparency.
            </p>
            <Link to="/services">
              <Button size="lg" className="button-pill w-full sm:w-auto">Learn More About Our Services</Button>
            </Link>
          </div>
          <div className={`space-y-4 sm:space-y-6 transform transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[50px] opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
              <CardHeader>
                <CardTitle className="text-white">Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  All transactions and claims are recorded on the blockchain, ensuring complete transparency and eliminating the possibility of fraud or manipulation.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
              <CardHeader>
                <CardTitle className="text-white">Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Smart contracts automatically execute claims processing, ensuring security and eliminating the need for trust in third parties.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Our Team</h2>
          <p className="text-lg sm:text-xl text-gray-300">Meet the experts behind EthSure</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan text-center transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
            <CardContent className="p-6">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center border border-white/20 bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                <span className="text-2xl font-bold text-white">JD</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">John Doe</h3>
              <p className="text-gray-400 mb-2">CEO & Founder</p>
              <p className="text-gray-300 text-sm">Blockchain expert with 10+ years in insurance technology</p>
            </CardContent>
          </Card>

          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan text-center transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
            <CardContent className="p-6">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center border border-white/20 bg-gradient-to-r from-emerald-500/20 to-teal-500/20">
                <span className="text-2xl font-bold text-white">JS</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Jane Smith</h3>
              <p className="text-gray-400 mb-2">CTO</p>
              <p className="text-gray-300 text-sm">Smart contract developer and DeFi specialist</p>
            </CardContent>
          </Card>

          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan text-center transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
            <CardContent className="p-6">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center border border-white/20 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                <span className="text-2xl font-bold text-white">MJ</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mike Johnson</h3>
              <p className="text-gray-400 mb-2">Head of Operations</p>
              <p className="text-gray-300 text-sm">Insurance industry veteran with deep regulatory knowledge</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '1400ms' }}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Our Values</h2>
          <p className="text-lg sm:text-xl text-gray-300">The principles that guide everything we do</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan text-center transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '1600ms' }}>
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Trust</h3>
              <p className="text-gray-300 text-sm">Building trust through transparency and reliability</p>
            </CardContent>
          </Card>

          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan text-center transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '1800ms' }}>
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg mx-auto mb-4 flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Innovation</h3>
              <p className="text-gray-300 text-sm">Continuously pushing the boundaries of what's possible</p>
            </CardContent>
          </Card>

          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan text-center transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '2000ms' }}>
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Community</h3>
              <p className="text-gray-300 text-sm">Putting our community first in everything we do</p>
            </CardContent>
          </Card>

          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan text-center transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '2200ms' }}>
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-lg mx-auto mb-4 flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Security</h3>
              <p className="text-gray-300 text-sm">Ensuring the highest level of security for our users</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className={`text-center transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '2400ms' }}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Join Us?</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">Be part of the future of insurance</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="button-pill text-lg px-8 py-4 hover:scale-105 hover:shadow-[0_15px_35px_rgba(96,165,250,0.3)] transition-all duration-300">
                Get Started Today
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="glass text-gray-200 hover:text-white text-lg px-8 py-4 hover:scale-105 hover:border-blue-400/50 hover:shadow-[0_15px_35px_rgba(96,165,250,0.2)] transition-all duration-300">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;