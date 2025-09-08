import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import AgentDashboard from './pages/dashboards/AgentDashboard';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import RoleSelect from './components/RoleSelect';
import './App.css';

function App() {
  return (
      // <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
           <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
      <Route path="/role-select" element={<RoleSelect />} />
      </Routes>
  );
}

export default App;