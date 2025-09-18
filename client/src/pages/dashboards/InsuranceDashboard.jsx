import React, { useState } from 'react';
// Removed Navbar on dashboards; we'll render a compact header with logo + actions
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import { Users, FileText, Briefcase, Shield } from 'lucide-react';
import ProfileDrawer from '@/components/ProfileDrawer';

const InsuranceDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
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
          <span className="text-sm font-semibold text-black">IC</span>
        </button>
        <span className="text-xs text-gray-300 font-mono">0x1234...abcd</span>
      </div>
    </header>
    <div className="flex pt-16">
      {/* Sidebar (left) */}
      <Sidebar
        items={[
          { id: 'overview', icon: Shield, label: 'Overview' },
          { id: 'agents', icon: Users, label: 'Agents' },
          { id: 'customers', icon: Briefcase, label: 'Customers' },
          { id: 'policies', icon: FileText, label: 'Policies' },
          { id: 'claims', icon: FileText, label: 'Claims' },
        ]}
        onLogout={() => window.location.assign('/')}
        topOffsetClass="top-16"
        widthClass="w-48"
      />

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 md:ml-48">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold gradient-text">Welcome to EthSure</h1>
        <div className="flex items-center gap-3">
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass ui-card"><CardContent className="p-6"><p className="text-gray-300">Total Policies</p><p className="text-3xl font-bold">120</p></CardContent></Card>
        <Card className="glass ui-card"><CardContent className="p-6"><p className="text-gray-300">Active Agents</p><p className="text-3xl font-bold">8</p></CardContent></Card>
        <Card className="glass ui-card"><CardContent className="p-6"><p className="text-gray-300">Total Claims</p><p className="text-3xl font-bold">45</p></CardContent></Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="glass ui-card">
          <CardHeader><CardTitle>Claims Analytics</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr>
                    <th className="py-2 px-4">Month</th>
                    <th className="py-2 px-4">Claims</th>
                    <th className="py-2 px-4">Paid (ETH)</th>
                    <th className="py-2 px-4">Rejected</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-white/10"><td className="py-2 px-4">July</td><td className="py-2 px-4">10</td><td className="py-2 px-4">Ξ2.5</td><td className="py-2 px-4">1</td></tr>
                  <tr className="hover:bg-white/10"><td className="py-2 px-4">June</td><td className="py-2 px-4">15</td><td className="py-2 px-4">Ξ3.1</td><td className="py-2 px-4">2</td></tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="glass ui-card">
          <CardHeader><CardTitle>Agent Management</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center bg-white/5 p-3 rounded"><span>Agent Smith</span><Button size="sm" variant="destructive">Remove</Button></li>
              <li className="flex justify-between items-center bg-white/5 p-3 rounded"><span>Agent Doe</span><Button size="sm" variant="destructive">Remove</Button></li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass ui-card">
          <CardHeader><CardTitle>Agents & Customers</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="bg-white/5 p-3 rounded">Agent Smith – 12 customers</li>
              <li className="bg-white/5 p-3 rounded">Agent Doe – 9 customers</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="glass ui-card">
          <CardHeader><CardTitle>Upcoming EMI Dues</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between bg-white/5 p-3 rounded"><span>John Doe (Agent Smith)</span><span>$120 due 2025-10-15</span></li>
              <li className="flex justify-between bg-white/5 p-3 rounded"><span>Jane Roe (Agent Doe)</span><span>$85 due 2025-10-18</span></li>
            </ul>
          </CardContent>
        </Card>
      </section>
      </main>
    </div>
    <ProfileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} profile={{ name: 'Insurance Admin', role: 'Company', email: 'company@ethsure.com', wallet: '0x1234...abcd' }} />
  </div>
  );
};

export default InsuranceDashboard;