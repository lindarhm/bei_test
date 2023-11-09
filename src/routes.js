import React from 'react';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import Header from './components/Header';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';


function Routess() {
  return (
    <Router>
    <div>
      <Header />
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  </Router>
  );
};

export default Routess;

