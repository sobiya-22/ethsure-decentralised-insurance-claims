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
           // <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            //</ProtectedRoute>
          }
        />

        <Route
          path="/agent-dashboard"
          element={
           // <ProtectedRoute allowedRoles={["agent"]}>
              <AgentDashboard />
           // </ProtectedRoute>
          }
        />

        <Route
          path="/company-dashboard"
          element={
            //<ProtectedRoute allowedRoles={["company"]}>
              <CompanyDashboard />
            //</ProtectedRoute>
          }
        />

        <Route
          path="/nominee-dashboard"
          element={
            //<ProtectedRoute allowedRoles={["nominee"]}>
              <NomineeDashboard />
            //</ProtectedRoute>
          }
        />

      </Routes>

  );
}

export default App;
