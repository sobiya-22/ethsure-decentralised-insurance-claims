import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserDashboard from './pages/UserDashboard';
import AgentDashboard from './pages/AgentDashboard';
import InsuranceDashboard from './pages/InsuranceDashboard';
import './App.css';
import './index.css';

function App() {
  return (
    <h1 className="text-2xl font-bold border-2 text-purple-800">
      Hello world!
    </h1>
  )
}

export default App;