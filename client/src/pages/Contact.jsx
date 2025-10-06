import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import { sendContactEmail } from '@/utils/email';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus({ state: 'loading', message: '' });
      await sendContactEmail(formData);
      setStatus({ state: 'success', message: 'Message sent successfully.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ state: 'error', message: err?.message || 'Failed to send message.' });
    }
  };

  return (
    <div className="min-h-screen text-white w-full relative overflow-hidden pt-20">
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-emerald-400/10 to-purple-500/20 blur-3xl pointer-events-none" />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            Get in <span className="bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Have questions about our services? Want to learn more about blockchain insurance? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan transform transition-all duration-500 relative z-10 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="text-white text-2xl">Send us a Message</CardTitle>
              <CardDescription className="text-gray-400">Fill out the form below and we'll get back to you within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                    <Input id="name" name="name" type="text" placeholder="Enter your full name" value={formData.name} onChange={handleInputChange} className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 transition-all duration-300 hover:bg-white/10" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 transition-all duration-300 hover:bg-white/10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                  <Input id="subject" name="subject" type="text" placeholder="What is this about?" value={formData.subject} onChange={handleInputChange} className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 transition-all duration-300 hover:bg-white/10" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Message</Label>
                  <textarea id="message" name="message" rows={6} placeholder="Tell us more about your inquiry..." value={formData.message} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 rounded-md px-3 py-2 resize-none transition-all duration-300 hover:bg-white/10" required />
                </div>
                {status.state === 'success' && (
                  <p className="text-emerald-400">{status.message}</p>
                )}
                {status.state === 'error' && (
                  <p className="text-red-400">{status.message}</p>
                )}
                <Button type="submit" disabled={status.state === 'loading'} className="w-full button-pill h-12 hover:scale-105 hover:shadow-[0_15px_35px_rgba(96,165,250,0.3)] transition-all duration-300">
                  {status.state === 'loading' ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className={`space-y-8 transform transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[50px] opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="transform transition-all duration-700 ease-out hover:scale-105">
              <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
              <p className="text-gray-300 text-lg mb-8">
                We're here to help and answer any questions you might have. We look forward to hearing from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 transform transition-all duration-500 hover:translate-x-2 hover:scale-105">
                <div className="w-12 h-12 rounded-lg glass border border-white/15 flex items-center justify-center flex-shrink-0 hover:border-blue-400/50 hover:shadow-[0_8px_20px_rgba(96,165,250,0.2)] transition-all duration-300">
                  <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                  <p className="text-gray-300">hello@ethsure.com</p>
                  <p className="text-gray-400 text-sm">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 transform transition-all duration-500 hover:translate-x-2 hover:scale-105">
                <div className="w-12 h-12 rounded-lg glass border border-white/15 flex items-center justify-center flex-shrink-0 hover:border-emerald-400/50 hover:shadow-[0_8px_20px_rgba(16,185,129,0.2)] transition-all duration-300">
                  <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-gray-400 text-sm">Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 transform transition-all duration-500 hover:translate-x-2 hover:scale-105">
                <div className="w-12 h-12 rounded-lg glass border border-white/15 flex items-center justify-center flex-shrink-0 hover:border-purple-400/50 hover:shadow-[0_8px_20px_rgba(168,85,247,0.2)] transition-all duration-300">
                  <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Office</h3>
                  <p className="text-gray-300">123 Blockchain Street</p>
                  <p className="text-gray-300">Crypto City, CC 12345</p>
                  <p className="text-gray-400 text-sm">United States</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 transform transition-all duration-500 hover:scale-105">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-lg glass border border-white/15 flex items-center justify-center transition-all duration-300 hover:translate-y-[-4px] hover:scale-110 hover:border-blue-400/50 hover:shadow-[0_12px_25px_rgba(96,165,250,0.25)] hover:rotate-12">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-lg glass border border-white/15 flex items-center justify-center transition-all duration-300 hover:translate-y-[-4px] hover:scale-110 hover:border-blue-400/50 hover:shadow-[0_12px_25px_rgba(96,165,250,0.25)] hover:rotate-12">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-lg glass border border-white/15 flex items-center justify-center transition-all duration-300 hover:translate-y-[-4px] hover:scale-110 hover:border-blue-400/50 hover:shadow-[0_12px_25px_rgba(96,165,250,0.25)] hover:rotate-12">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" aria-label="GitHub" className="w-10 h-10 rounded-lg glass border border-white/15 flex items-center justify-center transition-all duration-300 hover:translate-y-[-4px] hover:scale-110 hover:border-gray-400/50 hover:shadow-[0_12px_25px_rgba(156,163,175,0.25)] hover:rotate-12">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.017 12.017.017z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-lg sm:text-xl text-gray-300">Find answers to common questions about EthSure</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
            <CardHeader>
              <CardTitle className="text-white">How does blockchain insurance work?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Blockchain insurance uses smart contracts to automatically process claims, eliminating the need for intermediaries and ensuring transparency.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
            <CardHeader>
              <CardTitle className="text-white">Is my data secure?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Yes, all data is encrypted and stored on the blockchain, providing the highest level of security and privacy.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
            <CardHeader>
              <CardTitle className="text-white">How fast are claims processed?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Claims are processed instantly through smart contracts, typically within minutes instead of weeks.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '1400ms' }}>
            <CardHeader>
              <CardTitle className="text-white">What cryptocurrencies do you accept?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                We accept major cryptocurrencies including Bitcoin, Ethereum, and stablecoins like USDC and USDT.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;