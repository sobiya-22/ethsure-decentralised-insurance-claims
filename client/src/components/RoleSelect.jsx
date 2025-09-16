import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const RoleSelect = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const Navigate = useNavigate();
    const roles = [
        { id: 'customer', name: 'Customer' },
        { id: 'agent', name: 'Agent' },
        { id: 'nominee', name: 'Nominee' },
        { id: 'insurance-company', name: 'Insurance Company' }
    ];

    const handleRoleSelect = (roleId) => {
        setSelectedRole(roleId);
        console.log('Selected role:', roleId);
        Navigate(`/${roleId}-dashboard`);
    };

    return (
        <div className="min-h-screen text-white w-full relative overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-emerald-400/10 to-purple-500/20 blur-3xl" />
            <div className="glass glow-border rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-white text-2xl font-semibold text-center mb-8 gradient-text">
                    Select your role:
                </h2>

                <div className="space-y-4">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => handleRoleSelect(role.id)}
                            className={`w-full py-4 px-6 rounded-full border-2 transition-all duration-200 text-lg font-semibold ${selectedRole === role.id
                                    ? 'border-blue-500 bg-blue-500/20 text-white shadow-[0_0_30px_rgba(59,130,246,0.2)]'
                                    : 'border-white/20 text-white hover:border-blue-400 hover:text-white'
                                }`}
                        >
                            {role.name}
                        </button>
                    ))}
                </div>

                {/* {selectedRole && (
          <div className="mt-8 text-center">
            <button
              onClick={() => alert(`Proceeding as ${roles.find(r => r.id === selectedRole)?.name}`)}
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              Continue
            </button>
          </div>
        )} */}
            </div>
        </div>
    );
};

export default RoleSelect;