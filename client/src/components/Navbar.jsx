import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser } from "@web3auth/modal/react";
import { usePlayground } from '../services/playground';

const Navbar = ({ hideAuthButtons = false }) => {
  const { connect, isConnected } = useWeb3AuthConnect();
  const { disconnect } = useWeb3AuthDisconnect();
  const { userInfo } = useWeb3AuthUser();
  const navigate = useNavigate();
  const { loading } = usePlayground();
  const location = useLocation();

  const connectUser = async () => {
    try {
      await connect(); 
      navigate("/role-select");
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  const shouldHideAuth = hideAuthButtons || location.pathname.includes('-dashboard');

  const logout = async () => {
    try {
      await disconnect();
      navigate("/");
    } catch (error) {
      console.error("Disconnection failed:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500 animate-pulse" />
              <div className="absolute inset-0 blur-md opacity-60 bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500 -z-10 rounded-lg" />
            </div>
            <span className="text-xl font-bold gradient-text">EthSure</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className="button-pill glass nav-link">Home</Link>
            <Link to="/about" className="button-pill glass nav-link">About</Link>
            <Link to="/services" className="button-pill glass nav-link">Services</Link>
            <Link to="/contact" className="button-pill glass nav-link">Contact</Link>
          </div>

          {!shouldHideAuth && (
            <div className="flex items-center space-x-3">
              <Button onClick={connectUser} variant="ghost" className="button-pill glass nav-link">Login</Button>
              <Button onClick={logout} variant="ghost" className="button-pill glass nav-link">LogOut</Button>
              <Link to="/signup">
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
