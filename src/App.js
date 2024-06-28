import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

 
import Home from './Pages/home';
import LoginComponent  from './Pages/LoginPage/loginPage';
import AdminPage from './Pages/AdminPage/adminPage';
import PostDetails from './Component/CategoriesSection/PostDetails'; // Import PostDetails component
import CategoryPosts from './Component/CategoriesSection/CategoryPosts';

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

  const PrivateRoute = ({ element }) => {
    if (checkingAuth) {
      return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    return element;
  };

  const PublicRoute = ({ element, restricted }) => {
    if (checkingAuth) {
      return <div>Loading...</div>;
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
            <Route path="/login" element={<PublicRoute element={<LoginComponent onLogin={handleLogin} />} restricted />} />
            <Route path="/admin" element={<PrivateRoute element={<AdminPage />} />} />
            <Route path="/category/:categoryName" element={<CategoryPosts />} />
            <Route path="/posts/:postId" element={<PostDetails />} /> {/* Route for post details */}
          </Routes>
        
        </div>
      
      </Router>
    </div>
  );
};

export default App;
