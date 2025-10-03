import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser,useWeb3Auth } from "@web3auth/modal/react";
import { useAccount } from 'wagmi'
import useAuth from '../context/useAuth';
const Navbar = () => {
  const { connect, isConnected } = useWeb3AuthConnect();
  const { web3Auth } = useWeb3Auth();
  const { disconnect } = useWeb3AuthDisconnect();
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const connectUser = async() => {
    try {
      const res = await login();
      if (res) {
        navigate(`./${res.role}-dashboard`);
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
      <div className="flex justify-between items-center h-20 px-4">
          <div className="flex items-center space-x-4 fade-in">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-xl pulse-glow flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-2xl font-bold gradient-text">EthSure</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className="nav-link px-4 py-2 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300">Home</Link>
            <Link to="/about" className="nav-link px-4 py-2 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300">About</Link>
            <Link to="/services" className="nav-link px-4 py-2 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300">Services</Link>
            <Link to="/contact" className="nav-link px-4 py-2 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300">Contact</Link>
          </div>
          <div className="flex items-center space-x-3">
            {!isConnected &&
              <Button
                onClick={connectUser}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 rounded-full px-6 py-2"
              >
                Login
              </Button>
            }
            {isConnected && 
              <Button
                onClick={logou}
                variant="outline"
                className="border-red-400/20 text-red-400 hover:bg-red-400/10 hover:border-red-400/30 transition-all duration-300 rounded-full px-6 py-2"
              >
                Logout
              </Button>
            }
            <Link to="/signup">
              <Button className="btn-primary px-6 py-2 rounded-full font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;