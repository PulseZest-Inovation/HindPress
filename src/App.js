import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './pages/LoginPage/loginPage'; // Adjust path as per your project structure
import AdminPage from './pages/AdminPage/adminPage'; // Adjust path as per your project structure

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [checkingAuth, setCheckingAuth] = useState(true); // State to track initial authentication check

  useEffect(() => {
    // Check authentication status on component mount (simulate initial auth check)
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true'; // Replace with your actual authentication check
    setIsLoggedIn(isAuthenticated);
    setCheckingAuth(false); // Once checked, set to false
  }, []);

  const handleLogin = (roles) => {
    setIsLoggedIn(true);
    setUserRoles(roles);
    localStorage.setItem('isLoggedIn', 'true'); // Store authentication status in localStorage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRoles([]);
    localStorage.removeItem('isLoggedIn'); // Remove authentication status from localStorage on logout
  };

  const PrivateRoute = ({ element, allowedRoles }) => {
    if (checkingAuth) {
      return null; // Render nothing while checking authentication status
    }

    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

  

    return element;
  };

  const PublicRoute = ({ element, restricted }) => {
    if (checkingAuth) {
      return null; // Render nothing while checking authentication status
    }

    if (isLoggedIn && restricted) {
      return <Navigate to="/admin" />;
    }

    if (isLoggedIn && !restricted) {
      return <Navigate to="/admin" />; // Redirect to admin page if already logged in and trying to access /login
    }

    return element;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute element={<LoginComponent onLogin={handleLogin} />} restricted />} />
        <Route path="/admin" element={<PrivateRoute element={<AdminPage />} allowedRoles={['admin']} />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
