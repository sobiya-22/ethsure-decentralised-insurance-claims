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
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md border border-gray-700">
                <h2 className="text-white text-xl font-light text-center mb-8">
                    Select your role:
                </h2>

                <div className="space-y-4">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => handleRoleSelect(role.id)}
                            className={`w-full py-4 px-6 rounded-full border-2 transition-all duration-200 text-lg font-light ${selectedRole === role.id
                                    ? 'border-blue-500 bg-blue-500 bg-opacity-20 text-blue-400'
                                    : 'border-gray-500 text-gray-300 hover:border-gray-400 hover:text-gray-200'
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