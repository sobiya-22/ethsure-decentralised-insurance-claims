import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NomineeContent = () => {
  const nominee = {
    name: 'Priya Verma',
    email: 'priya@example.com',
    linkedPolicies: [
      { id: 'POL-1001', holder: 'John Doe', type: 'Health Insurance Plus', agent: 'Rajesh Sharma', status: 'active' },
      { id: 'POL-1027', holder: 'Jane Roe', type: 'Life Secure', agent: 'Anita Rao', status: 'active' },
    ],
  };

  return (
    <div className="text-white w-full relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gray-500/20 via-gray-400/10 to-gray-500/20 blur-3xl" />
      <div className="relative z-10 pt-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-6 text-white">Nominee <span className="gradient-text">Dashboard</span></h1>
          <button onClick={() => window.location.assign('/')} className="button-pill glass nav-link">Logout</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass shine ui-card lg:col-span-2 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
            <CardHeader><CardTitle className="font-bold">Policies You Are Nominee For</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nominee.linkedPolicies.map((p) => (
                  <div key={p.id} className="flex flex-col md:flex-row md:items-center md:justify-between bg-white/5 rounded p-4">
                    <div>
                      <p className="font-medium">{p.id} — {p.type}</p>
                      <p className="text-white text-sm">Policy Holder: {p.holder} • Agent: {p.agent}</p>
                    </div>
                    <div className="mt-3 md:mt-0 flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded bg-gray-700/50 text-gray-300">{p.status}</span>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass shine ui-card hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
          <CardHeader><CardTitle className="font-bold">What can a nominee do?</CardTitle></CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-1 text-white">
              <li>View policy status and agent details</li>
              <li>Upload supporting documents when needed</li>
              <li>Initiate beneficiary verification for claims</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NomineeContent;