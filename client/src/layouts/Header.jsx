import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../context/userContext';
import { User } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const user = userStore((state) => state.user);
  const profileUrl = user?.customer?.profile_photo_url || user?.company?.profile_photo_url || user?.agent?.profile_photo_url || null;
  const user_name = user?.customer?.customer_name || user?.company?.company_name || user?.agent?.agebt_name || null;
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 
                 backdrop-blur-xl bg-gradient-to-r from-gray-900/98 via-gray-800/95 to-gray-900/98 
                 shadow-lg transition-all duration-300"
    >
      <div className="max-w-[95%] mx-auto px-2 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-12 sm:h-14 lg:h-16">

          <div className="flex items-center space-x-2 sm:space-x-3 fade-in text-white">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 
                  rounded-xl flex items-center justify-center shadow-md overflow-hidden">
              <img
                src="https://res.cloudinary.com/drcmowihw/image/upload/v1756992149/EthSure_ugpws3.png"
                alt="EthSure Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-lg sm:text-2xl font-bold">EthSure</span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">

            <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-mono">


              <a
                href={`https://sepolia.etherscan.io/address/${user?.wallet_address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-inherit hover:text-cyan-300 transition"
                title="View on Sepolia Etherscan"
              >
                {user?.wallet_address}
              </a>
            </div>

            <button
              onClick={handleProfileClick}
              className="flex items-center justify-center glass rounded-full p-1.5 sm:p-2 
               hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 
                    bg-gradient-to-r from-blue-500 to-purple-500 
                    rounded-full flex items-center justify-center overflow-hidden">

                {profileUrl ? (
                  <img
                    src={profileUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-br from-cyan-400 to-blue-400 
            bg-clip-text text-transparent">
                    {user_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </span>
                )}
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;