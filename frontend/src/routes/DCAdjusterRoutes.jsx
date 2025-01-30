import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/DCAdjuster/Dashboard';
import Claims from '../pages/DCAdjuster/Claims';
import Profile from '../pages/DCAdjuster/Profile';

const DCAdjuster = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/claims" element={<Claims />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default DCAdjuster;