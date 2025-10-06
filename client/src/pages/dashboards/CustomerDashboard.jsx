import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import CustomerContent from "@/components/Customer/CustomerContent";
import PayEMIContent from "@/components/Customer/PayEMIContent";
import PoliciesContent from "@/components/Customer/PoliciesContent";
import AgentKYCForm from "@/components/AgentKYCForm";
import DocVault from "@/components/DocVault";
import { Users, FileText, Folder, CreditCard } from "lucide-react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { getCustomer, checkCustomerKYCStatus } from "../../services/customerAPI";

const CustomerDashboard = () => {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [kycStatus, setKycStatus] = useState(null);
  const [currentView, setCurrentView] = useState("overview");

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!isConnected || !address) {
        navigate("/");
        return;
      }
        // setLoading(true);
      try {
        const response = await getCustomer(address.toLowerCase());
        const customerData = response.data?.data?.customer || response.data?.data;

        setCustomer(customerData);

        const kycRes = await checkCustomerKYCStatus(address.toLowerCase());
        setKycStatus(kycRes.data?.kyc_status);

        // Don't automatically navigate to KYC, let user decide from dashboard
        // if (kycRes.data?.kyc_status === "pending") {
        //   setCurrentView("kyc");
        //   return;
        // }
      } catch (err) {
        console.error("Error fetching customer:", err);
      } finally {
        // setLoading(false);
      }
    };

    fetchCustomerData();
  }, [isConnected, address, navigate]);

  // if (loading) return <p className="text-center mt-20 text-white">Loading...</p>;

  // Dynamic user object for sidebar/profile
  const user = {
    name: customer?.customer_name || "Customer",
    role: "Customer",
    email: customer?.customer_email || "N/A",
    wallet: address,
    company: customer?.company || "EthSure Insurance",
  };

  const sidebarItems = [
    { id: "overview", icon: Users, label: "Overview", onClick: () => setCurrentView("overview") },
    { id: "policies", icon: FileText, label: "Policies", onClick: () => setCurrentView("policies") },
    { id: "pay-emi", icon: CreditCard, label: "Pay EMI", onClick: () => setCurrentView("pay-emi") },
    { id: "docvault", icon: Folder, label: "DocVault", onClick: () => setCurrentView("docvault") },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "pay-emi":
        return <PayEMIContent customer={customer} />;
      case "policies":
        return <PoliciesContent customer={customer} />;
      case "docvault":
        return <DocVault user={user} />;
      case "kyc":
        return <AgentKYCForm />;
      default:
        console.log({customer});
        return (
          <CustomerContent
            customer={customer}
            kycStatus={kycStatus}
            onPayEMIClick={() => setCurrentView("pay-emi")}
            currentView={currentView}
            setCurrentView={setCurrentView}
            onKYCSubmit={() => setCurrentView("kyc")}
          />
        );
    }
  };
  {/*remove double sidebar */}
  const isFullPageView = ["kyc"].includes(currentView);

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      user={user}
      currentView={currentView}
      fullPageView={isFullPageView}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default CustomerDashboard;
