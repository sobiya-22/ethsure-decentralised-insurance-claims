import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import './App.css';
import RoleSelection from './pages/RoleSelection';
import AgentDashboard from './pages/dashboards/AgentDashboard';
import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import SignupAgent from './pages/SignupAgent';
import SignupCustomer from './pages/SignupCustomer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup-agent" element={<SignupAgent/>}/>
          <Route path="/signup-customer" element={<SignupCustomer/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/role-selection" element={<RoleSelection/>} />
          <Route path="/agent-dashboard" element={<AgentDashboard/>}/>
          <Route path="/customer-dashboard" element={<CustomerDashboard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;