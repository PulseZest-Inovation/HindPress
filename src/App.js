import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './Component/Header/header';
import Footer from './Component/footer/footer';
import Home from './Pages/home';
import LoginPage from './Pages/LoginPage/loginPage';
import AdminPage from './Pages/AdminPage/adminPage';
import CategoryPosts from './Component/CategoriesSection/CategoryPosts';
import WhatsAppButton from './Component/Whatsapp/Chat';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(isAuthenticated);
    setCheckingAuth(false);
  }, []);

  const handleLogin = (roles) => {
    setIsLoggedIn(true);
    setUserRoles(roles);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRoles([]);
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

    if (isLoggedIn && !restricted) {
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
            <Route path="/login" element={<PublicRoute element={<LoginPage onLogin={handleLogin} />} restricted />} />
            <Route path="/admin" element={<PrivateRoute element={<AdminPage />} allowedRoles={['admin']} />} />
            <Route path="/category/:categoryName" element={<CategoryPosts />} />
          </Routes>
          <WhatsAppButton phoneNumber="9598919119" />
        </div>
      
      </Router>
    </div>
  );
};

export default App;
