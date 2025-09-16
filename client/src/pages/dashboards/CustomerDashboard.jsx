import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      <Navbar />
      <div className="p-8 text-white relative">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
        <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-emerald-400/10 to-purple-500/20 blur-3xl" />
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-6 gradient-text">Welcome to EthSure</h1>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="button-pill glass" onClick={() => setDrawerOpen(true)}>My Profile</Button>
            <button onClick={() => window.location.assign('/')} className="button-pill glass nav-link">Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass ui-card">
            <CardHeader>
              <CardTitle>Policy Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Policy: Health Insurance Plus</p>
              <p>Agent: Rajesh Sharma</p>
              <p>Next EMI: 2025-10-15</p>
              <p>Due Amount: $120</p>
              <Button size="sm" className="mt-2">Pay EMI</Button>
            </CardContent>
          </Card>

          <Card className="glass ui-card">
            <CardHeader>
              <CardTitle>Balances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Total Paid: $1,080</p>
              <p>Remaining: $360</p>
              <p>Wallet Balance: 2.45 ETH</p>
            </CardContent>
          </Card>
        </div>

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
                <li className="flex justify-between">
                  <span>Premium Payment</span>
                  <span>$120 on 2025-09-15</span>
                </li>
                <li className="flex justify-between">
                  <span>Claim Submitted</span>
                  <span>#CLM-004 on 2025-08-02</span>
                </li>
              </ul>
            </CardContent>
          </Card>
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
