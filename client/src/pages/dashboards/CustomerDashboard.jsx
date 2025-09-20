import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import CustomerContent from "@/components/Customer/CustomerContent";
import PayEMIContent from "@/components/Customer/PayEMIContent";
import KYCForm from "@/components/KYCForm";
import DocVault from "@/components/DocVault";
import { Users, FileText, Folder, CreditCard } from "lucide-react";

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('overview'); // 'overview', 'pay-emi', etc.

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
  }, []);

  if (loading) return <p className="text-center mt-20 text-white">Loading...</p>;

  const sidebarItems = [
    { id: 'overview', icon: Users, label: 'Overview', onClick: () => setCurrentView('overview') },
    { id: 'policies', icon: FileText, label: 'Policies', onClick: () => setCurrentView('policies') },
    { id: 'pay-emi', icon: CreditCard, label: 'Pay EMI', onClick: () => setCurrentView('pay-emi') },
    { id: 'docvault', icon: Folder, label: 'DocVault', onClick: () => setCurrentView('docvault') },
  ];

  const user = {
    name: customer?.name || 'Customer',
    role: 'Customer',
    email: customer?.email || 'john@example.com',
    wallet: '0x742d...d8b6',
    company: 'EthSure Insurance'
  };

  const renderContent = () => {
    switch (currentView) {
      case 'pay-emi':
        return <PayEMIContent />;
      case 'policies':
        return <div className="text-white"><h2 className="text-2xl font-bold mb-4">Policies</h2><p>Policies content coming soon...</p></div>;
      case 'docvault':
        return <DocVault user={user} />;
      case 'kyc':
        return <KYCForm user={user} isOpen={true} onClose={() => setCurrentView('overview')} onSubmitKYC={(kycData) => { console.log('KYC submitted:', kycData); setCurrentView('overview'); }} />;
      default:
        return <CustomerContent onPayEMIClick={() => setCurrentView('pay-emi')} currentView={currentView} setCurrentView={setCurrentView} />;
    }
  };

  const isFullPageView = ['kyc'].includes(currentView);

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      user={user}
      widthClass="w-48"
      currentView={currentView}
      fullPageView={isFullPageView}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default CustomerDashboard;
