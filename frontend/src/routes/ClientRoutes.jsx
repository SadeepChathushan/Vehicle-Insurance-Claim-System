import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Client/Dashboard';
import Claim from '../pages/Client/Claim';
import Emergancy from '../pages/Client/EmergencyNumbers';
import Profile from '../pages/Client/Profile';

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/claims" element={<Claim />} />
      <Route path="/emergancy" element={<Emergancy />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default ClientRoutes;
