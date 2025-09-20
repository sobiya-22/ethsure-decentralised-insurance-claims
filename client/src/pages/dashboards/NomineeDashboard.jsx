import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NomineeDashboard = () => {
  const nominee = {
    name: 'Priya Verma',
    email: 'priya@example.com',
    linkedPolicies: [
      { id: 'POL-1001', holder: 'John Doe', type: 'Health Insurance Plus', agent: 'Rajesh Sharma', status: 'active' },
      { id: 'POL-1027', holder: 'Jane Roe', type: 'Life Secure', agent: 'Anita Rao', status: 'active' },
    ],
  };

  return (
    <div className="min-h-screen text-white w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-emerald-400/10 to-purple-500/20 blur-3xl" />
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-6 gradient-text">Welcome to EthSure</h1>
          <button onClick={() => window.location.assign('/')} className="button-pill glass nav-link">Logout</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass ui-card">
            <CardHeader><CardTitle>Your Profile</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <p>Name: {nominee.name}</p>
              <p>Email: {nominee.email}</p>
              <p>Linked Policies: {nominee.linkedPolicies.length}</p>
            </CardContent>
          </Card>

          <Card className="glass ui-card lg:col-span-2">
            <CardHeader><CardTitle>Policies You Are Nominee For</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nominee.linkedPolicies.map((p) => (
                  <div key={p.id} className="flex flex-col md:flex-row md:items-center md:justify-between bg-white/5 rounded p-4">
                    <div>
                      <p className="font-medium">{p.id} — {p.type}</p>
                      <p className="text-gray-300 text-sm">Policy Holder: {p.holder} • Agent: {p.agent}</p>
                    </div>
                    <div className="mt-3 md:mt-0 flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded bg-green-600/70">{p.status}</span>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass ui-card">
          <CardHeader><CardTitle>What can a nominee do?</CardTitle></CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-1 text-gray-300">
              <li>View policy status and agent details</li>
              <li>Upload supporting documents when needed</li>
              <li>Initiate beneficiary verification for claims</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NomineeDashboard;


