import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css';
import Home from './pages/Home';
// import NotFound from './pages/NotFound';
import AppLayout from './components/layout/AppLayout';
import HCAdjusterRoutes from './routes/HCAdjusterRoutes';
import DCAdjusterRoutes from './routes/DCAdjusterRoutes';
import AdminRoutes from './routes/AdminRoutes';
import ClientRoutes from './routes/ClientRoutes';
import SignIn from './components/Auth/SignIn';
import { useAuth } from './hooks/useAuth';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  const { user } = useAuth();
  console.log("user details - app -----------");
  console.log('App user:', user);  // Debug log to verify user
  console.log('App user role:', user?.role);  // Debug log to verify user role

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="*" element={<NotFound />} /> */}

        <Route element={<PrivateRoute allowedRoles={['ADMIN', 'CLIENT', 'DCADJUSTER', 'HCADJUSTER']} />}>
          <Route path="/" element={<AppLayout />}>
            <Route path="client/*" element={<PrivateRoute allowedRoles={['CLIENT']} />}>
              <Route path="*" element={<ClientRoutes />} />
            </Route>
            <Route path="dc-adjuster/*" element={<PrivateRoute allowedRoles={['DCADJUSTER']} />}>
              <Route path="*" element={<DCAdjusterRoutes />} />
            </Route>
            <Route path="admin/*" element={<PrivateRoute allowedRoles={['ADMIN']} />}>
              <Route path="*" element={<AdminRoutes />} />
            </Route>
            <Route path="hc-adjuster/*" element={<PrivateRoute allowedRoles={['HCADJUSTER']} />}>
              <Route path="*" element={<HCAdjusterRoutes />} />
            </Route>
          </Route>
        </Route>


{/* 
<Route element={<PrivateRoute />}>
  <Route path="/" element={<AppLayout />}>
    <Route path="client/*" element={<ClientRoutes />} />
    <Route path="dc-adjuster/*" element={<DCAdjusterRoutes />} />
    <Route path="admin/*" element={<AdminRoutes />} />
    <Route path="hc-adjuster/*" element={<HCAdjusterRoutes />} />
  </Route>
</Route> */}


      </Routes>
    </Router>
  );
};

export default App;