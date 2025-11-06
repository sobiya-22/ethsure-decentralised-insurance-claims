import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen text-white w-full relative overflow-y-auto pt-20 no-scrollbar">
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-emerald-400/10 to-purple-500/20 blur-3xl" />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`text-center mb-8 sm:mb-12 transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-[length:200%_200%] animate-gradient-x">EthSure</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 mb-8">
            We're revolutionizing the insurance industry by leveraging blockchain technology to create a more transparent, secure, and efficient claims processing system.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="glass border border-white/10 rounded-full px-4 py-2 text-sm text-gray-200">
              🔗 Blockchain Technology
            </div>
            <div className="glass border border-white/10 rounded-full px-4 py-2 text-sm text-gray-200">
              🛡️ Secure & Transparent
            </div>
            <div className="glass border border-white/10 rounded-full px-4 py-2 text-sm text-gray-200">
              ⚡ Fast Processing
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className={`transform transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-[length:200%_200%] animate-gradient-x mb-4 sm:mb-6">Our Mission</h2>
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
  <div
    className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`}
    style={{ transitionDelay: '600ms' }}
  >
    <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-[length:200%_200%] animate-gradient-x mb-4">
      Our Team
    </h2>
    <p className="text-lg sm:text-xl text-gray-300">
      Meet the brilliant minds behind EthSure
    </p>
  </div>

  <div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide snap-x snap-mandatory">
    {[
      {
        name: 'Sobiya Shaikh',
        role: 'Project Team Leader',
        img: '/Team/Sobiya_Shaikh.png',
        linkedin: 'https://www.linkedin.com/in/sobiyashaikh/',
      },
      {
        name: 'Sakshi Nehe',
        role: 'Project Team Member',
        img: '/Team/Sakshi_Nehe.jpg',
        linkedin: 'https://www.linkedin.com/in/sakshi-nehe/',
      },
      {
        name: 'Arundhati Sarvadnya',
        role: 'Project Team Member',
        img: '/Team/Arundhati_Sarvadnya.jpg',
        linkedin: 'http://www.linkedin.com/in/arundhati-sarvadnya/',
      },
      {
        name: 'Diksha Shejwal',
        role: 'Project Team Member',
        img: '/Team/Diksha_Shejwal.jpg',
        linkedin: 'https://www.linkedin.com/in/diksha-shejwal/',
      },
    ].map((member, i) => (
      <Card
        key={i}
        className={`min-w-[280px] sm:min-w-[320px] lg:min-w-[360px] glass shine border-white/10 hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-500 snap-center`}
      >
        <CardContent className="p-6 text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src={member.img}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover border-2 border-white/20"
            />
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-1 right-1 bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="none"
                className="w-4 h-4"
              >
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.4 8h4.2V24H.4V8zm7.6 0h4v2.2h.06c.56-1.06 1.92-2.2 3.94-2.2 4.2 0 4.97 2.76 4.97 6.36V24h-4.2v-7.88c0-1.88-.04-4.3-2.62-4.3-2.64 0-3.04 2.06-3.04 4.18V24H8V8z" />
              </svg>
            </a>
          </div>
          <h3 className="text-xl font-semibold text-white mb-1">
            {member.name}
          </h3>
          <p className="text-gray-400 text-sm mb-2">{member.role}</p>
          <p className="text-gray-300 text-sm">{member.bio}</p>
        </CardContent>
      </Card>
    ))}
  </div>
</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '1400ms' }}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-[length:200%_200%] animate-gradient-x mb-4">Our Values</h2>
          <p className="text-lg sm:text-xl text-gray-300">The principles that guide everything we do</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan text-center transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '1600ms' }}>
            <CardContent className="p-6">
              <div className="w-16 h-16 glass border border-white/10 rounded-lg mx-auto mb-4 flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Trust</h3>
              <p className="text-gray-300 text-sm">Building trust through transparency and reliability</p>
            </CardContent>
          </Card>

          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan text-center transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '1800ms' }}>
            <CardContent className="p-6">
              <div className="w-16 h-16 glass border border-white/10 rounded-lg mx-auto mb-4 flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Innovation</h3>
              <p className="text-gray-300 text-sm">Continuously pushing the boundaries of what's possible</p>
            </CardContent>
          </Card>

          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan text-center transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '2000ms' }}>
            <CardContent className="p-6">
              <div className="w-16 h-16 glass border border-white/10 rounded-lg mx-auto mb-4 flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Community</h3>
              <p className="text-gray-300 text-sm">Putting our community first in everything we do</p>
            </CardContent>
          </Card>

          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan text-center transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '2200ms' }}>
            <CardContent className="p-6">
              <div className="w-16 h-16 glass border border-white/10 rounded-lg mx-auto mb-4 flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-[length:200%_200%] animate-gradient-x mb-4">Ready to Join Us?</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">Be part of the future of insurance</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="button-pill text-lg px-8 py-4 hover:scale-105 hover:shadow-[0_15px_35px_rgba(96,165,250,0.3)] transition-all duration-300">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;