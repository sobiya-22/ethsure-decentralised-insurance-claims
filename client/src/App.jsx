import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./components/ui/toast-provider";
import { toast } from "react-hot-toast";
import { userStore } from "./context/userContext";

// Common Pages
import Landing from "./pages/Landing";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import DocVault from "./components/DocVault";
import RoleSelect from "./components/RoleSelect";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";

// Customer Pages
import CustomerOverview from "./pages/dashboards/customer/CustomerOverview";
import PayEMI from "./pages/dashboards/customer/PayEMI";
import PaymentMethod from "./pages/dashboards/customer/PaymentMethod";
import Policies from "./pages/dashboards/customer/Policies";

// Agent Pages
import AgentOverview from "./pages/dashboards/agent/AgentOverview";
import PolicyManagement from "./pages/dashboards/agent/PolicyManagement";

// Company Pages
import CompanyOverview from "./pages/dashboards/company/CompanyOverview";
import AgentManagement from "./pages/dashboards/company/AgentManagement";
import CustomerManagement from "./pages/dashboards/company/CustomerManagement";
import ClaimManagement from "./pages/dashboards/company/ClaimManagement";

// UI Icons
import { Users, FileText, Folder, CreditCard, Home } from "lucide-react";

function App() {
  const { isAuth, user } = userStore();

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

  // Simple role protection (without ProtectedRoute component)
  const requireRole = (role, children) => {
    if (!isAuth) return <Navigate to="/" replace />;
    if (user?.role !== role) {
      // toast.error(`Access denied for ${role} route`);
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/docvault" element={<DocVault />} />
      <Route path="/role-select" element={<RoleSelect/>}/>
      {/* Customer Dashboard Group */}
      <Route
        path="/customer"
        element={requireRole("customer", <DashboardLayout sidebarItems={customerSidebarItems} />)}
      >
        <Route path="dashboard" element={<CustomerOverview />} />
        <Route path="policies" element={<Policies />} />
        <Route path="pay-emi" element={<PayEMI />} />
        <Route path="payment-methods" element={<PaymentMethod />} />
        <Route path="docvault" element={<DocVault />} />
      </Route>

      {/* Agent Dashboard Group */}
      <Route
        path="/agent"
        element={requireRole("agent", <DashboardLayout sidebarItems={agentSidebarItems} />)}
      >
        <Route path="dashboard" element={<AgentOverview />} />
        <Route path="customers" element={<PolicyManagement />} />
        <Route path="docvault" element={<DocVault />} />
      </Route>

      {/* Company Dashboard Group */}
      <Route
        path="/company"
        element={requireRole("company", <DashboardLayout sidebarItems={companySidebarItems} />)}
      >
        <Route path="dashboard" element={<CompanyOverview />} />
        <Route path="all-agents" element={<AgentManagement />} />
        <Route path="all-customers" element={<CustomerManagement />} />
        <Route path="claims" element={<ClaimManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
