import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser, useWeb3Auth } from "@web3auth/modal/react";
import { useAccount } from 'wagmi';
import { useAuth } from "../context/AuthContext";
import { Menu, X } from 'lucide-react';
const Navbar = () => {
  const { connect, isConnected } = useWeb3AuthConnect();
  const { web3Auth } = useWeb3Auth();
  const { disconnect } = useWeb3AuthDisconnect();
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const connectUser = async () => {
    try {
      const res = await login();
      if (res) {
        navigate(`./${res.role}-dashboard`);
        console.log('Stored user data context', user);
      }
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };
  const logou = () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.error("Disconnection failed:", error);
    }
  }
  return (
    <nav className="glass-effect border-b border-white/10 fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full">
      <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20 px-3 xs:px-4 sm:px-6">
        <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 fade-in">
          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-500 to-green-500 rounded-xl pulse-glow flex items-center justify-center">
            <span className="text-white font-bold text-sm sm:text-base lg:text-lg">E</span>
          </div>
          <span className="text-lg xs:text-xl sm:text-2xl font-bold gradient-text">EthSure</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <Link to="/" className="nav-link px-3 xl:px-4 py-2 text-sm xl:text-base rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300">Home</Link>
          <Link to="/about" className="nav-link px-3 xl:px-4 py-2 text-sm xl:text-base rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300">About</Link>
          <Link to="/services" className="nav-link px-3 xl:px-4 py-2 text-sm xl:text-base rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300">Services</Link>
          <Link to="/contact" className="nav-link px-3 xl:px-4 py-2 text-sm xl:text-base rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300">Contact</Link>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2 xs:space-x-3">
          {!isConnected && (
            <Button
              onClick={connectUser}
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 rounded-full px-3 xs:px-4 lg:px-6 py-1.5 xs:py-2 text-xs xs:text-sm"
            >
              Login
            </Button>
          )}
          {isConnected && (
            <Button
              onClick={logou}
              variant="outline"
              size="sm"
              className="border-red-400/20 text-red-400 hover:bg-red-400/10 hover:border-red-400/30 transition-all duration-300 rounded-full px-3 xs:px-4 lg:px-6 py-1.5 xs:py-2 text-xs xs:text-sm"
            >
              Logout
            </Button>
          )}
          <Link to="/signup">
            <Button size="sm" className="btn-primary px-3 xs:px-4 lg:px-6 py-1.5 xs:py-2 text-xs xs:text-sm rounded-full font-semibold">
              Get Started
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-white/10">
          <div className="p-4 space-y-3">
            <Link to="/" className="block nav-link px-4 py-3 text-sm rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="block nav-link px-4 py-3 text-sm rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/services" className="block nav-link px-4 py-3 text-sm rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>
              Services
            </Link>
            <Link to="/contact" className="block nav-link px-4 py-3 text-sm rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;