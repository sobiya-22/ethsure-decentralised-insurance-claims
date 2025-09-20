import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser } from "@web3auth/modal/react";
import { useAccount } from 'wagmi'

const Navbar = () => {
  const { connect,isConnected } = useWeb3AuthConnect();
  // const { isConnected } = useAccount();
  const { disconnect } = useWeb3AuthDisconnect();
  const { userInfo } = useWeb3AuthUser();
  const navigate = useNavigate();
  const connectUser = async () => {
    try {
      await connect(); 
      if (isConnected) {
      navigate("/role-select");
    }
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };
    const logout = async() => {
      try {
        await disconnect();
        localStorage.removeItem("role");
        navigate("/");
      } catch (error) {
        console.error("Disconnection failed:", error);
      }
  }
  return (
    <nav className="glass-effect border-b border-white/10 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4 fade-in">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-xl pulse-glow flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-2xl font-bold gradient-text">EthSure</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
          <div className="flex items-center space-x-3">
            {!isConnected &&
              <Button
                onClick={connectUser}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                Login
              </Button>
            }
            {isConnected && 
              <Button
                onClick={logout}
                variant="outline"
                className="border-red-400/20 text-red-400 hover:bg-red-400/10 hover:border-red-400/30 transition-all duration-300"
              >
                Logout
              </Button>
            }
            <Link to="/signup">
              <Button className="btn-primary px-6 py-2 rounded-xl font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;