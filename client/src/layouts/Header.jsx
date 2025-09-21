import React from 'react';

const Header = ({ user, onProfileClick }) => (
  <header className="glass-effect border-b border-white/10 fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900/95 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20 min-h-[5rem]">
        <div className="flex items-center space-x-3 sm:space-x-4 fade-in">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-lg sm:rounded-xl pulse-glow flex items-center justify-center">
            <span className="text-white font-bold text-sm sm:text-lg">E</span>
          </div>
          <span className="text-lg sm:text-xl font-bold gradient-text">EthSure</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button onClick={onProfileClick} className="flex items-center space-x-2 glass rounded-full p-1.5 sm:p-2 hover:bg-white/10 transition-colors">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm font-medium">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </span>
            </div>
          </button>
          <div className="text-white/60 text-xs sm:text-sm hidden sm:block">
            {user?.wallet ? `${user.wallet.slice(0, 6)}...${user.wallet.slice(-4)}` : '0x1234...5678'}
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;