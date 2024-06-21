import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './Pages/home';
import LoginComponent from './Pages/LoginPage/loginPage';
import AdminPage from './Pages/AdminPage/adminPage';
import CategoryPosts from './Component/CategoriesSection/CategoryPosts'; // Adjust path as per your project structure

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(isAuthenticated);
    setCheckingAuth(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const PrivateRoute = ({ element, allowedRoles }) => {
    if (checkingAuth) {
      return null;
    }

    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    return element;
  };

  const PublicRoute = ({ element, restricted }) => {
    if (checkingAuth) {
      return null;
    }

    if (isLoggedIn && restricted) {
      return <Navigate to="/admin" />;
    }

    return element;
  };

  return (
    <div className="min-h-screen text-black">
      <Router>
        <div className="pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<PublicRoute element={<LoginComponent onLogin={handleLogin} />} restricted />} />
            <Route path="/admin" element={<PrivateRoute element={<AdminPage />} />} />
            <Route path="/category/:categoryName" element={<CategoryPosts />} /> {/* Updated route with categoryName param */}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
