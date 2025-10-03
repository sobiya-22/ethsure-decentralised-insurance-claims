import React from 'react';

const Header = ({ user, onProfileClick }) => (
  <header className="glass-effect border-b border-white/10 fixed top-0 left-0 right-0 z-50 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center space-x-4 fade-in">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-xl pulse-glow flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-2xl font-bold gradient-text">EthSure</span>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={onProfileClick} className="flex items-center space-x-2 glass rounded-full p-2 hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-white/40">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </span>
            </div>
          </button>
          <div className="text-white/60 text-sm hidden sm:block">
            {user?.wallet ? `${user.wallet.slice(0, 6)}...${user.wallet.slice(-4)}` : '0x1234...5678'}
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;