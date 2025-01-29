import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Agents/Dashboard';
import Claims from '../pages/Agents/Claims';
import CmpltClaims from '../pages/Agents/CmpltClaims';

const Agent = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/claims" element={<Claims />} />
      <Route path="/cmplt" element={<CmpltClaims />} />
    </Routes>
  );
};

export default Agent;