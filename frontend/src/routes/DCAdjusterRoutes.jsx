import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/DCAdjuster/Dashboard';
import Claims from '../pages/DCAdjuster/Claims';

const DCAdjuster = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/claims" element={<Claims />} />
    </Routes>
  );
};

export default DCAdjuster;