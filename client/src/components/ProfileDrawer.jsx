import React from 'react';

const ProfileDrawer = ({ isOpen, onClose, profile }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[380px] z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      aria-hidden={!isOpen}
    >
      <div className="h-full glass ui-card rounded-none shadow-xl flex flex-col text-white">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-xl font-semibold">My Profile</h3>
          <button onClick={onClose} className="button-pill glass nav-link">Close</button>
        </div>
        <div className="p-6 space-y-5 overflow-y-auto">
          <div className="flex items-center gap-4">
            <img src={profile?.avatar || '/default-avatar.jpg'} alt="avatar" className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover" />
            <div>
              <p className="font-medium text-lg">{profile?.name || 'User'}</p>
              <p className="text-gray-300">{profile?.role || 'Member'}</p>
            </div>
          </div>
          <div className="space-y-2 text-base">
            <p><span className="text-gray-300">Email:</span> <span className="text-white">{profile?.email || 'user@example.com'}</span></p>
            <p><span className="text-gray-300">Wallet:</span> <span className="text-white">{profile?.wallet || '0x742d...d8b6'}</span></p>
            {profile?.agent && <p><span className="text-gray-300">Agent:</span> <span className="text-white">{profile.agent}</span></p>}
            {profile?.company && <p><span className="text-gray-300">Company:</span> <span className="text-white">{profile.company}</span></p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;


