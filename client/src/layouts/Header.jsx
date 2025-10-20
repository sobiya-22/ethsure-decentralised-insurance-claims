import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('./profile');
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 
                 backdrop-blur-xl bg-gradient-to-r from-gray-900/98 via-gray-800/95 to-gray-900/98 
                 shadow-lg transition-all duration-300"
    >
      <div className="max-w-[95%] mx-auto px-2 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-12 sm:h-14 lg:h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 fade-in text-white">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 
                            bg-gradient-to-r from-purple-500 to-green-500 
                            rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm sm:text-base lg:text-lg">E</span>
            </div>
            <span className="text-lg sm:text-2xl font-bold">EthSure</span>
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="hidden sm:block text-white text-xs sm:text-sm font-mono truncate max-w-[160px]">
              {user?.wallet}
            </div>
            <button
              onClick={handleProfileClick}
              className="flex items-center justify-center glass rounded-full p-1.5 sm:p-2 
                         hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 
                              bg-gradient-to-r from-blue-500 to-purple-500 
                              rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name
                    ? user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                    : 'U'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
