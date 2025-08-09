import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ReserveHistory from './components/ReserveHistory';
import Report from './components/Report';
import AdminDashboard from './components/AdminDashboard';
import InternDashboard from './components/InternDashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');
    if (userToken || adminToken) {
      setIsAuthenticated(true);
      if (adminToken) setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-lightBlue">
        <nav className="bg-primaryBlue text-white p-4">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-xl font-bold">SLT Seat Reservation</h1>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="bg-danger text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login setAuth={setIsAuthenticated} setAdmin={setIsAdmin} /> : <Navigate to={isAdmin ? "/admin-dashboard" : "/intern-dashboard"} />} />
          <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to={isAdmin ? "/admin-dashboard" : "/intern-dashboard"} />} />
          <Route path="/reserve-history" element={isAuthenticated ? <ReserveHistory /> : <Navigate to="/login" />} />
          <Route path="/report" element={isAuthenticated && isAdmin ? <Report /> : <Navigate to="/login" />} />
          <Route path="/admin-dashboard" element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/intern-dashboard" element={isAuthenticated ? <InternDashboard /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;