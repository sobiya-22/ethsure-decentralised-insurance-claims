import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser } from "@web3auth/modal/react";
import { usePlayground } from '../services/playground';

const Navbar = ({ hideAuthButtons = false }) => {
  const { connect, isConnected } = useWeb3AuthConnect();
  const { disconnect } = useWeb3AuthDisconnect();
  const { userInfo } = useWeb3AuthUser();
  const navigate = useNavigate();
  const { loading } = usePlayground();

  const connectUser = async () => {
    try {
      await connect(); 
      navigate("/role-select");
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  const logout = async () => {
    try {
      await disconnect();
      navigate("/");
    } catch (error) {
      console.error("Disconnection failed:", error);
    }
  };

  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg"></div>
            <span className="text-xl font-bold">EthSure</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            <Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          </div>

          {/* Auth Buttons (conditionally shown) */}
          {!hideAuthButtons && (
            <div className="flex items-center space-x-4">
              <Button
                onClick={connectUser}
                variant="ghost"
                className="text-gray-300 hover:text-white"
              >
                Login
              </Button>

              <Button
                onClick={logout}
                variant="ghost"
                className="text-gray-300 hover:text-white"
              >
                LogOut
              </Button>

              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
