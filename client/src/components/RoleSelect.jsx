import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3AuthConnect } from "@web3auth/modal/react";
const RoleSelect = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const navigate = useNavigate();
    const {isConnected} = useWeb3AuthConnect();
    const roles = [
        { id: 'customer', name: 'Customer' },
        { id: 'agent', name: 'Agent' },
        { id: 'nominee', name: 'Nominee' },
        { id: 'company', name: 'Insurance Company' }
    ];

    const handleRoleSelect = (roleId) => {
        setSelectedRole(roleId);
        console.log('Selected role:', roleId);
        // navigate(`/${roleId}-dashboard`);
        
    };
    const handleContinue = () => {
    if (selectedRole) {
        navigate(`/${selectedRole}-dashboard`);
        localStorage.setItem("role", JSON.stringify(selectedRole));
    } else {
        alert('Please select a role to continue.');
    }
};
    // useEffect(() => {
    //     if (!isConnected) {
    //         navigate('./');
    //     }
    // },[isConnected]);
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl floating-animation"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="enhanced-card p-10 w-full max-w-lg relative z-10 fade-in">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl mx-auto mb-4 flex items-center justify-center pulse-glow">
                        <span className="text-2xl font-bold text-white">E</span>
                    </div>
                    <h2 className="text-white text-3xl font-bold mb-2">
                        Choose Your Role
                    </h2>
                    <p className="text-gray-300">
                    Select your role:
                    </p>
                </div>

                <div className="space-y-4 mb-8">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => handleRoleSelect(role.id)}
                            className={`w-full py-5 px-8 rounded-2xl border-2 transition-all duration-300 text-lg font-semibold hover:scale-105 ${selectedRole === role.id
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
                            className="btn-primary px-12 py-4 rounded-2xl text-lg font-semibold"
                        >
                            Continue as {roles.find(r => r.id === selectedRole)?.name}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoleSelect;