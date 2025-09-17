import React, { useEffect, useState } from "react";
// Removed Navbar on dashboards; custom header with logo + actions is used
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { Users, FileText, Folder } from "lucide-react";
import ProfileDrawer from "@/components/ProfileDrawer";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
      //   const email = localStorage.getItem("userEmail");
      //   const response = await fetch(`http://localhost:5000/api/users/${email}`);
      //   const data = await response.json();
      //   setCustomer(data);

      //   const customerRole = data.roles?.find((r) => r.role_type === "customer");
      //   if (customerRole?.kyc_status !== "verified") {
      //     navigate("/customer-kyc");
      //   }
      } catch (err) {
        console.error("Error fetching customer:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [navigate]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <>
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500" />
            <div className="absolute inset-0 blur-md opacity-60 bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500 -z-10 rounded-lg" />
          </div>
          <span className="text-xl font-bold gradient-text">EthSure</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setDrawerOpen(true)} className="w-9 h-9 rounded-full overflow-hidden border border-black/10 bg-[#cfe3ff] flex items-center justify-center">
            <span className="text-sm font-semibold text-black">CU</span>
          </button>
          <span className="text-xs text-gray-300 font-mono">0x742d...d8b6</span>
        </div>
      </header>
      <div className="min-h-screen text-white relative">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
        <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-emerald-400/10 to-purple-500/20 blur-3xl" />

        <div className="flex">
          {/* Sidebar */}
          <Sidebar
            items={[
              { id: 'agents', icon: Users, label: 'Agents' },
              { id: 'policies', icon: FileText, label: 'Policies' },
              { id: 'docvault', icon: Folder, label: 'DocVault' },
            ]}
            onLogout={() => window.location.assign('/')}
            topOffsetClass="top-16"
            widthClass="w-48"
          />

          {/* Main */}
          <main className="flex-1 p-8 md:ml-48">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold mb-6 gradient-text">Welcome to EthSure</h1>
              <div className="flex items-center gap-3">
                
              </div>
            </div>

            {/* KYC Alert */}
            <div className="glass ui-card p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                <div>
                  <p className="font-semibold">KYC pending</p>
                  <p className="text-gray-300 text-sm">Please complete your KYC to activate all features.</p>
                </div>
                <Button size="sm" className="ml-auto">Complete KYC</Button>
              </div>
            </div>

            {/* Active Policy Section */}
            <Card className="glass ui-card mb-8">
              <CardHeader><CardTitle>Active Policy</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <p>Policy: Health Insurance Plus</p>
                <p>Agent: Rajesh Sharma</p>
                <p>Next EMI: 2025-10-15 • Due: $120</p>
                <div className="flex gap-2 pt-2">
                  <Button size="sm">View Details</Button>
                  <Button size="sm" variant="outline">Pay EMI</Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass ui-card">
                <CardHeader>
                  <CardTitle>Uploaded Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between bg-white/5 p-3 rounded">
                      <span>ID Proof.pdf</span>
                      <Button size="sm" variant="outline">View</Button>
                    </li>
                    <li className="flex items-center justify-between bg-white/5 p-3 rounded">
                      <span>Medical Report.pdf</span>
                      <Button size="sm" variant="outline">View</Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass ui-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between"><span>Premium Payment</span><span>$120 on 2025-09-15</span></li>
                    <li className="flex justify-between"><span>Claim Submitted</span><span>#CLM-004 on 2025-08-02</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
      <ProfileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        profile={{ name: customer?.name || 'Customer', role: 'Customer', email: customer?.email || 'john@example.com', wallet: '0x742d...d8b6' }}
      />
    </>
  );
};

export default CustomerDashboard;
