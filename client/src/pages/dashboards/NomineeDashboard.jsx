import React, { useState } from 'react';
// Removed Navbar on dashboards; compact header used instead
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import { Shield, FileText, Folder } from 'lucide-react';
import ProfileDrawer from '@/components/ProfileDrawer';

const NomineeDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
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
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      
      {/* Gradient Orbs */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/30 via-emerald-400/20 to-purple-500/30 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-purple-500/25 via-pink-400/20 to-blue-500/25 blur-3xl" />
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 glass border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500" />
            <div className="absolute inset-0 blur-md opacity-60 bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500 -z-10 rounded-lg" />
          </div>
          <span className="text-xl font-bold gradient-text">EthSure</span>
        </div>
        <div className="flex flex-col items-end gap-1">
        <button onClick={() => setDrawerOpen(true)} className="w-9 h-9 rounded-full overflow-hidden border border-black/10 bg-[#cfe3ff] flex items-center justify-center hover:scale-105 transition-transform">
            <span className="text-sm font-semibold text-black">NM</span>
          </button>
          <span className="text-xs text-gray-300 font-mono">0xabcd...0001</span>
        </div>
      </header>
      <Sidebar
        items={[
          { id: 'overview', icon: Shield, label: 'Overview' },
          { id: 'policies', icon: FileText, label: 'Policies' },
          { id: 'documents', icon: Folder, label: 'Documents' },
        ]}
        onLogout={() => window.location.assign('/')}
        topOffsetClass="top-16"
        widthClass="w-48"
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:ml-48 pt-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-6 gradient-text">Welcome to EthSure</h1>
          <button onClick={() => window.location.assign('/')} className="button-pill glass nav-link">Logout</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
      <ProfileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        profile={{ name: nominee.name, role: 'Nominee', email: nominee.email, wallet: '0xabcd...0001' }}
      />
    </div>
  );
};

export default NomineeDashboard;


