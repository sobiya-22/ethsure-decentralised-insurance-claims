import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3AuthConnect, useWeb3AuthUser,useWeb3Auth } from "@web3auth/modal/react";
import { getWalletAddress } from '../utils/blockchainOperations';
import {useAuth} from '../context/AuthContext';
const RoleSelect = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const navigate = useNavigate();
    const { isConnected } = useWeb3AuthConnect();
    const { userInfo } = useWeb3AuthUser();
    const { web3Auth } = useWeb3Auth();
    const { assignRole } = useAuth();
    console.log(userInfo);
    const roles = [
        { id: 'customer', name: 'Customer' },
        { id: 'agent', name: 'Agent' },
        { id: 'nominee', name: 'Nominee' },
        // ---! do not add any company in role select,
        // since there's one company there acc creation should be hidden!---
    ];

    const handleRoleSelect = (roleId) => {
        setSelectedRole(roleId);
        console.log('Selected role:', roleId);
    };
    const handleContinue = async() => {
        if (selectedRole) {
            let wallet_address = await getWalletAddress(web3Auth);
            let name = userInfo?.name;
            let profile_photo_url = userInfo?.profileImage;
            console.log(wallet_address, " ", name, " ", selectedRole, " ", profile_photo_url);
            const res = await assignRole(wallet_address, selectedRole, name, profile_photo_url);
            // console.log(res);
            navigate(`/${res}-dashboard`);
        }
    };

    return (
        <div className="min-h-screen text-white w-full relative overflow-y-auto no-scrollbar">
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-emerald-400/10 to-purple-500/20 blur-3xl" />
            <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">

                <div className="enhanced-card p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg relative z-10 fade-in">
                    <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center pulse-glow">
                            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">E</span>
                        </div>
                        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2">
                            {userInfo?.name}
                        </h2>
                        <p className="text-gray-300 text-sm sm:text-base">
                            Select your role:
                        </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => handleRoleSelect(role.id)}
                                className={`w-full py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-8 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-base sm:text-lg font-semibold hover:scale-105 ${selectedRole === role.id
                                    ? 'border-blue-500 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg'
                                    : 'border-white/20 text-gray-300 hover:border-white/40 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {role.name}
                            </button>
                        ))}
                    </div>

                    {selectedRole && (
                        <div className="text-center">
                            <button
                                onClick={handleContinue}
                                className="btn-primary px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold w-full sm:w-auto"
                            >
                                Continue as {roles.find(r => r.id === selectedRole)?.name}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoleSelect;
