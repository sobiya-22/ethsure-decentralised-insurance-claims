// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Dashboard Components
import Layout from "./pages/dashboards/Layout";
import Home from "./pages/dashboards/Home";
import PolicyDetails from "./pages/dashboards/PolicyDetails";
import AgentDetails from "./pages/dashboards/AgentDetails";
import ClaimProcess from "./pages/dashboards/ClaimProcess";
import UploadDocuments from "./pages/dashboards/UploadDocuments";

// Public Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import RoleSelect from "./components/RoleSelect";

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/role-select" element={<RoleSelect />} />

      {/* Dashboard Layout */}
      <Route path="/customer-dashboard" element={<Layout />}>
        <Route index element={<Home />} /> {/* Default page */}
        <Route path="home" element={<Home />} />
        <Route path="policy" element={<PolicyDetails />} />
        <Route path="agent" element={<AgentDetails />} />
        <Route path="claims" element={<ClaimProcess />} />
        <Route path="upload" element={<UploadDocuments />} />
      </Route>
    </Routes>
  );
}

export default App;
