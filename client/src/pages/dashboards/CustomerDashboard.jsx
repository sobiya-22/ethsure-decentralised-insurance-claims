import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import CustomerContent from "@/components/Customer/CustomerContent";
import PayEMIContent from "@/components/Customer/PayEMIContent";
import PoliciesContent from "@/components/Customer/PoliciesContent";
import KYCForm from "@/components/KYCForm";
import DocVault from "@/components/DocVault";
import { Users, FileText, Folder, CreditCard } from "lucide-react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

import {
  getCustomer,
  checkCustomerKYCStatus,
  getAllCustomers, 
} from "../../services/customerAPI";

const CustomerDashboard = () => {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [kycStatus, setKycStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('overview'); 

  useEffect(() => {
  const fetchCustomerData = async () => {
    if (!isConnected || !address) {
      navigate("/");
      return;
    }
    try {
      const response = await getCustomer(address.toLowerCase());
      const customerData = response.data?.data;
      setCustomer(customerData);

       const kycRes = await checkCustomerKYCStatus(address.toLowerCase());
        setKycStatus(kycRes.data?.status);

        // If KYC is not verified, redirect to form
        if (kycRes.data?.status !== "verified") {
          navigate("/customer/kyc");
      }
    } catch (err) {
      console.error("Error fetching customer:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchCustomerData();
}, [isConnected, address , navigate]);

  if (loading) return <p className="text-center mt-20 text-white">Loading...</p>;

  const sidebarItems = [
    { id: 'overview', icon: Users, label: 'Overview', onClick: () => setCurrentView('overview') },
    { id: 'policies', icon: FileText, label: 'Policies', onClick: () => setCurrentView('policies') },
    { id: 'pay-emi', icon: CreditCard, label: 'Pay EMI', onClick: () => setCurrentView('pay-emi') },
    { id: 'docvault', icon: Folder, label: 'DocVault', onClick: () => setCurrentView('docvault') },
  ];

  const user = {
    name: customer?.name || "Customer",
    role: "Customer",
    email: customer?.email || "N/A",
    wallet: address,
    company: customer?.company || "EthSure Insurance",
  };

  const renderContent = () => {
    switch (currentView) {
      case 'pay-emi':
        return <PayEMIContent />;
      case 'policies':
        return <PoliciesContent />;
      case 'docvault':
        return <DocVault user={user} />;
      case 'kyc':
        return(
        <KYCForm
          walletAddress={address}   
          role="customer"           
          onClose={() => setCurrentView('overview')}
          onSubmitKYC={(kycData) => {
          console.log('KYC submitted:', kycData);
          setCurrentView('overview');
        }} 
      />
    );
      default:
        return(
        <CustomerContent
         customer={customer}
         kycStatus={kycStatus}
         onPayEMIClick={() => setCurrentView('pay-emi')} 
         currentView={currentView} 
         setCurrentView={setCurrentView} />
        );
    }
  };

  const isFullPageView = ['kyc', 'policies'].includes(currentView);

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
