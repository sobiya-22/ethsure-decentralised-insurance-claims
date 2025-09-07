import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import RoleSelect from './components/RoleSelect';
import CustomerKYC from './pages/CustomerKYC';
import AgentKYC from './pages/AgentKYC';
import AgentDashboard from './pages/dashboards/AgentDashboard';
import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import './App.css';
import AdminLogin from './components/AdminLogin';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/role-select" element={<RoleSelect/> } />
          <Route path="/customer-kyc" element={<CustomerKYC/> } />
          <Route path="/agent-kyc" element={<AgentKYC/> } />
          <Route path="/agent-dashboard" element={<AgentDashboard/> } />
          <Route path="/customer-dashboard" element={<CustomerDashboard/> } />
          <Route path="/admin-dashboard" element={<AdminDashboard/> } />
          <Route path = "/admin-login" element={<AdminLogin/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;