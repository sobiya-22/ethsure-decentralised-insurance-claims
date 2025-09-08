import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/dashboards/Home";
import PolicyDetails from "./pages/dashboards/PolicyDetails";
import AgentDetails from "./pages/dashboards/AgentDetails";
import ClaimProcess from "./pages/dashboards/ClaimProcess";
import UploadDocuments from "./pages/dashboards/UploadDocuments";
import "./CustomerDashboard.css";

export default function App() {
  const [isVerified, setIsVerified] = useState(false);
  
  const navigate = useNavigate();
  
  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="sidebar-title">EthSure</h1>
        <button onClick={() => navigate("/customer-dashboard/home")}>Home</button>
        <button onClick={() => navigate("/customer-dashboard/policy")}>Policy Details</button>
        <button onClick={() => navigate("/customer-dashboard/agent")}>Agent Details</button>
        <button onClick={() => navigate("/customer-dashboard/claims")}>Claim Process</button>
        <button onClick={() => navigate("/customer-dashboard/upload")}>Upload Documents</button>
        <button className="logout-btn">Logout</button>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/help">Help</Link>
        </nav>

        {/* Content Area */}
        <div className="content-area">
          {!isVerified && (
            <div className="verify-banner">
              ⚠ Please verify first
              <button onClick={() => setIsVerified(true)}>Verify</button>
            </div>
          )}

    

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer-dashboard/home" element={<Home />} />
            <Route path="/customer-dashboard/policy" element={<PolicyDetails />} />
            <Route path="/customer-dashboard/agent" element={<AgentDetails />} />
            <Route path="/customer-dashboard/claims" element={<ClaimProcess />} />
            <Route path="/customer-dashboard/upload" element={<UploadDocuments />} />
            <Route path="/about" element={<h2>About Us</h2>} />
            <Route path="/contact" element={<h2>Contact</h2>} />
            <Route path="/help" element={<h2>Help</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
