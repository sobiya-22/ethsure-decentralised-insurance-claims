import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { ToastProvider } from "./components/ui/toast-provider";
import { toast } from "react-hot-toast";
import { userStore } from "./context/userContext";
import ProtectedRoute from "./context/ProtectedRoute";

// Common Pages
import Landing from "./pages/Landing";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import DocVault from "./components/DocVault";
import RoleSelect from "./components/RoleSelect";
import UserKYCForm from "./components/UserKYCForm";
import Profile from "./components/Profile";
// Layouts
import DashboardLayout from "./layouts/DashboardLayout";

// Customer Pages
import CustomerOverview from "./pages/dashboards/customer/CustomerOverview";
import PayEMI from "./pages/dashboards/customer/PayEMI";
import PaymentMethod from "./pages/dashboards/customer/PaymentMethod";
import Policies from "./pages/dashboards/customer/Policies";
import PolicyForm from "./components/PolicyForm";
import ClaimPolicyForm from "./pages//dashboards/customer/ClaimPolicyForm"
// Agent Pages
import AgentOverview from "./pages/dashboards/agent/AgentOverview";
import PolicyManagement from "./pages/dashboards/agent/PolicyManagement";
import AgentAssociationForm from "./pages/dashboards/agent/AgentAssociationForm";
// Company Pages
import CompanyOverview from "./pages/dashboards/company/CompanyOverview";
import AgentManagement from "./pages/dashboards/company/AgentManagement";
import CustomerManagement from "./pages/dashboards/company/CustomerManagement";
import ClaimManagement from "./pages/dashboards/company/ClaimManagement";

// UI Icons
import { Users, FileText, Folder, CreditCard, Home } from "lucide-react";



function App() {
  const isAuth = userStore((state) => state.isAuth);
  const user = userStore((state) => state.user);

  // Sidebar items
  const customerSidebarItems = [
    { id: "overview", icon: Users, label: "Overview", path: "/customer/dashboard" },
    { id: "policies", icon: FileText, label: "Policies", path: "/customer/policies" },
    { id: "pay-emi", icon: CreditCard, label: "Pay EMI", path: "/customer/pay-emi" },
    { id: "docvault", icon: Folder, label: "DocVault", path: "/customer/docvault" },
  ];

  const agentSidebarItems = [
    { id: "overview", icon: Home, label: "Overview", path: "/agent/dashboard" },
    { id: "policy-management", icon: FileText, label: "Policy Management", path: "/agent/customers" },
    { id: "docvault", icon: Folder, label: "DocVault", path: "/agent/docvault" },
  ];

  const companySidebarItems = [
    { id: "overview", icon: Home, label: "Overview", path: "/company/dashboard" },
    { id: "agent-management", icon: FileText, label: "All Agents", path: "/company/all-agents" },
    { id: "customer-management", icon: Folder, label: "All Customers", path: "/company/all-customers" },
    { id: "claim-management", icon: Folder, label: "Claims", path: "/company/claims" },
  ];


  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/docvault" element={<DocVault />} />
      <Route path="/role-select" element={<RoleSelect />} />
      <Route path="/profile" element={<Profile/>}/>
      {/* Customer Dashboard Group */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute role="customer" isAuth={isAuth} user={user}>
            <DashboardLayout sidebarItems={customerSidebarItems} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<CustomerOverview />} />
        <Route path="policies" element={<Policies />} />
        <Route path="pay-emi" element={<PayEMI />} />
        <Route path="payment-methods" element={<PaymentMethod />} />
        <Route path="docvault" element={<DocVault />} />
        <Route path="kyc" element={<UserKYCForm />} />
        <Route path="buy-plan" element={<PolicyForm />} />
        <Route path="/customer/claim-policy" element={<ClaimPolicyForm />} />
      </Route>

      {/* Agent Dashboard Group */}
      <Route
        path="/agent"
        element={
          <ProtectedRoute role="agent" isAuth={isAuth} user={user}>
            <DashboardLayout sidebarItems={agentSidebarItems} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AgentOverview />} />
        <Route path="customers" element={<PolicyManagement />} />
        <Route path="docvault" element={<DocVault />} />
        <Route path="kyc" element={<UserKYCForm />} />
        <Route path="associate-company" element={<AgentAssociationForm/>} />
      </Route>

      {/* Company Dashboard Group */}
      <Route
        path="/company"
        element={
          <ProtectedRoute role="company" isAuth={isAuth} user={user}>
            <DashboardLayout sidebarItems={companySidebarItems} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<CompanyOverview />} />
        <Route path="all-agents" element={<AgentManagement />} />
        <Route path="all-customers" element={<CustomerManagement />} />
        <Route path="claims" element={<ClaimManagement />} />
      </Route>

    </Routes>
  );
}

export default App;
