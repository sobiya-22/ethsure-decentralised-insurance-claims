import React from 'react';

const Header = ({ user, onProfileClick }) => (
  <header className="glass-effect border-b border-white/10 fixed top-0 left-0 right-0 z-50 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
        <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 fade-in">
          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-xl lg:rounded-xl pulse-glow flex items-center justify-center">
            <span className="text-white font-bold text-sm sm:text-base lg:text-lg">E</span>
          </div>
          <span className="text-lg xs:text-xl sm:text-2xl font-bold gradient-text">EthSure</span>
        </div>
        <div className="flex items-center space-x-2 xs:space-x-3">
          <button onClick={onProfileClick} className="flex items-center space-x-1 xs:space-x-2 glass rounded-full p-1.5 xs:p-2 hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-white/40">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm font-medium">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </span>
            </div>
          </button>
          <div className="text-white/60 text-xs sm:text-sm hidden xs:block">
            {user?.wallet ? `$${user.wallet.slice(0, 4).slice(-2)}...${user.wallet.slice(-4)}` : '0x1...8'}
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;