import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import CustomerDashboard from "./pages/dashboards/CustomerDashboard";
import AgentDashboard from "./pages/dashboards/AgentDashboard";
import CompanyDashboard from "./pages/dashboards/CompanyDashboard";
import NomineeDashboard from "./pages/dashboards/NomineeDashboard";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import RoleSelect from "./components/RoleSelect";
import ProtectedRoute from "./context/ProtectedRoute";
// Dashboard Components
import AgentCustomerView from "./components/Agent/AgentCustomerView";
import AgentClaimsView from "./components/Agent/AgentClaimsView";
import CreatePolicyModal from "./components/Agent/CreatePolicyModal";
import AddCustomerModal from "./components/Agent/AddCustomerModal";
import KYCForm from "./components/KYCForm";
// Company Components
import CompanyAgentsView from "./components/Company/CompanyAgentsView";
import CompanyCustomersView from "./components/Company/CompanyCustomersView";
import CompanyPoliciesView from "./components/Company/CompanyPoliciesView";
import CompanyClaimsView from "./components/Company/CompanyClaimsView";
import DocVault from "./components/DocVault";
import PaymentMethodContent from "./components/Customer/PaymentMethodContent";
import PoliciesContent from "./components/Customer/PoliciesContent";
import PayEMIContent from "./components/Customer/PayEMIContent";
import "./App.css";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route
          path="/customer-dashboard"
          element={
           <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agent-dashboard"
          element={
           <ProtectedRoute allowedRoles={["agent"]}>
              <AgentDashboard />
           </ProtectedRoute>
          }
        />

        <Route
          path="/company-dashboard"
          element={
            // <ProtectedRoute allowedRoles={["company"]}>
              <CompanyDashboard />
            // </ProtectedRoute> 
          }
        />

        {/* Company Dashboard Routes */}
        <Route path="/company/agents" element={<CompanyAgentsView withLayout={true} />} />
        <Route path="/company/customers" element={<CompanyCustomersView withLayout={true} />} />
        <Route path="/company/policies" element={<CompanyPoliciesView withLayout={true} />} />
        <Route path="/company/claims" element={<CompanyClaimsView withLayout={true} />} />

        <Route
          path="/nominee-dashboard"
          element={
            //<ProtectedRoute allowedRoles={["nominee"]}>
              <NomineeDashboard />
            //</ProtectedRoute>
          }
        />

        {/* Agent Dashboard Routes */}
        <Route path="/agent/customers" element={<AgentCustomerView withLayout={true} />} />
        <Route path="/agent/claims" element={<AgentClaimsView withLayout={true} />} />
        <Route path="/agent/create-policy" element={<CreatePolicyModal isOpen={true} onClose={() => window.history.back()} withLayout={true} />} />
        <Route path="/agent/add-customer" element={<AddCustomerModal isOpen={true} onClose={() => window.history.back()} withLayout={true} />} />
        <Route 
        path="/agent/kyc" 
        element={
        <KYCForm 
        walletAddress
        role="agent"
        isOpen={true} 
        onClose={() => window.history.back()} withLayout={true} 
        />} />
        {/* Customer Dashboard Routes */}
        <Route path="/customer/pay-emi" element={<PayEMIContent />} />
        <Route path="/customer/payment-methods" element={<PaymentMethodContent onBack={() => window.history.back()} />} />
        <Route path="/customer/policies" element={<PoliciesContent />} />

        <Route 
        path="/customer/kyc" 
        element={
        <KYCForm 
        walletAddress
        role = "customer"
        isOpen={true} 
        onClose={() => window.history.back()} 
        />} />

      </Routes>
  );
}

export default App;
