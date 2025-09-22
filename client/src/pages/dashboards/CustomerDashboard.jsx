import React, { useEffect, useState } from "react";
import DashboardLayout from "@/context/layouts/DashboardLayout";
import CustomerContent from "@/components/Customer/CustomerContent";
import PayEMIContent from "@/components/Customer/PayEMIContent";
import PoliciesContent from "@/components/Customer/PoliciesContent";
import KYCForm from "@/components/KYCForm";
import DocVault from "@/components/DocVault";
import { Users, FileText, Folder, CreditCard } from "lucide-react";
import { getCustomer } from "@/api/customerAPI";
//import { useWalletAddress } from "@/hooks/useWalletAddress";

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("overview");
  const { walletAddress } = useWalletAddress();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        if (walletAddress) {
          const data = await getCustomer(walletAddress);
          setCustomer(data);
        }
      } catch (err) {
        console.error("Error fetching customer:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [walletAddress]);

  if (loading) return <p className="text-center mt-20 text-white">Loading...</p>;

  const sidebarItems = [
    { id: "overview", icon: Users, label: "Overview", onClick: () => setCurrentView("overview") },
    { id: "policies", icon: FileText, label: "Policies", onClick: () => setCurrentView("policies") },
    { id: "pay-emi", icon: CreditCard, label: "Pay EMI", onClick: () => setCurrentView("pay-emi") },
    { id: "docvault", icon: Folder, label: "DocVault", onClick: () => setCurrentView("docvault") },
  ];

  const user = {
    name: customer?.name || "Customer",
    role: "Customer",
    email: customer?.email || "john@example.com",
    wallet: customer?.wallet || walletAddress,
    company: "EthSure Insurance",
  };

  const renderContent = () => {
    switch (currentView) {
      case "pay-emi":
        return <PayEMIContent />;
      case "policies":
        return <PoliciesContent />;
      case "docvault":
        return <DocVault user={user} />;
      case "kyc":
        return (
          <KYCForm
            user={user}
            isOpen={true}
            onClose={() => setCurrentView("overview")}
            onSubmitKYC={(kycData) => {
              console.log("KYC submitted:", kycData);
              setCurrentView("overview");
            }}
          />
        );
      default:
        return <CustomerContent onPayEMIClick={() => setCurrentView("pay-emi")} />;
    }
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      user={user}
      widthClass="w-48"
      currentView={currentView}
      fullPageView={["kyc", "policies"].includes(currentView)}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default CustomerDashboard;
