import React, { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProfileDrawer from "@/components/ProfileDrawer";


const AgentDashboard = () => {
  const customersRef = useRef(null);
  const claimsRef = useRef(null);
  const userManagementRef = useRef(null);

  const [activeMenu, setActiveMenu] = useState("");
  const [profileImage, setProfileImage] = useState("/default-avatar.jpg");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const agent = {
    name: "Rajesh Sharma",
    wallet: "0xA12B34C56D78E90F1234567890ABCDEF12345678",
    verified: true,
    customers: [
      { id: 1, name: "Alice", policy: "Health Insurance" },
      { id: 2, name: "Bob", policy: "Auto Insurance" },
      { id: 3, name: "Charlie", policy: "Property Insurance" },
    ],
  };

  return (
    <div className="min-h-screen text-white w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-emerald-400/10 to-purple-500/20 blur-3xl" />
      <Navbar hideAuthButtons />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Welcome to EthSure</h1>
          <p className="text-gray-400 mt-1">Overview of your assignments and workload.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="button-pill glass" onClick={() => setDrawerOpen(true)}>My Profile</Button>
          <Button variant="ghost" className="button-pill glass" onClick={() => window.location.assign('/')}>Logout</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="glass ui-card"><CardContent className="p-6"><p className="text-gray-300">Assigned Claims</p><p className="text-3xl font-bold">5</p></CardContent></Card>
        <Card className="glass ui-card"><CardContent className="p-6"><p className="text-gray-300">Pending Reviews</p><p className="text-3xl font-bold">2</p></CardContent></Card>
        <Card className="glass ui-card"><CardContent className="p-6"><p className="text-gray-300">Resolved Claims</p><p className="text-3xl font-bold">12</p></CardContent></Card>
      </div>

      {/* Customers */}
      <Card ref={customersRef} className="glass ui-card mb-8">
        <CardHeader><CardTitle>My Customers</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {agent.customers.map((c) => (
              <li key={c.id} className="flex justify-between items-center p-4 bg-white/5 rounded hover:bg-white/10">
                <div>
                  <p className="text-white font-medium">{c.name}</p>
                  <p className="text-gray-400 text-sm">{c.policy}</p>
                </div>
                <Button size="sm">View Policy</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Claims */}
      <Card ref={claimsRef} className="glass ui-card mb-8">
        <CardHeader><CardTitle>Claims to Review</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-gray-400">Claim ID</th>
                  <th className="py-2 px-4 text-gray-400">User</th>
                  <th className="py-2 px-4 text-gray-400">Amount</th>
                  <th className="py-2 px-4 text-gray-400">Status</th>
                  <th className="py-2 px-4 text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-white/10"><td className="py-2 px-4 text-white">#12345</td><td className="py-2 px-4 text-white">Alice</td><td className="py-2 px-4 text-blue-400">Ξ0.25</td><td className="py-2 px-4 text-yellow-400">Pending</td><td className="py-2 px-4"><Button size="sm" variant="secondary">Approve</Button></td></tr>
                <tr className="hover:bg-white/10"><td className="py-2 px-4 text-white">#12346</td><td className="py-2 px-4 text-white">Bob</td><td className="py-2 px-4 text-blue-400">Ξ0.1</td><td className="py-2 px-4 text-yellow-400">Pending</td><td className="py-2 px-4"><Button size="sm" variant="secondary">Approve</Button></td></tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card ref={userManagementRef} className="glass ui-card">
        <CardHeader><CardTitle>User Management</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between items-center hover:bg-white/10 p-2 rounded"><span className="text-white">Alice</span><Button size="sm" variant="destructive">Block</Button></li>
            <li className="flex justify-between items-center hover:bg-white/10 p-2 rounded"><span className="text-white">Bob</span><Button size="sm" variant="destructive">Block</Button></li>
          </ul>
        </CardContent>
      </Card>
      </main>
      <ProfileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        profile={{ name: agent.name, role: 'Agent', wallet: agent.wallet, avatar: profileImage, company: 'EthSure' }}
      />
    </div>
  );
};

export default AgentDashboard;
