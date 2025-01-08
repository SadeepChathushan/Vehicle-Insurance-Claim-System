import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/DCAdjuster/Dashboard';

const DCAdjuster = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default DCAdjuster;