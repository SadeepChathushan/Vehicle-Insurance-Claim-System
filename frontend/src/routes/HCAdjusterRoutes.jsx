import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from "../pages/HCAdjuster/Dashboard"; // Specify the file explicitly

const HCAdjuster = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default HCAdjuster;