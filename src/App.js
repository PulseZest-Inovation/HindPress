import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './utils/FireBase/firebaseConfig'; // Adjust the path as per your project structure
import Home from './Pages/home';
import LoginComponent from './Pages/LoginPage/loginPage';
import AdminPage from './Pages/AdminPage/adminPage';
import PostDetails from './Component/CategoriesSection/PostDetails';
import CategoryPosts from './Component/CategoriesSection/CategoryPosts';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Optional: Handle additional login actions (e.g., fetch user data)
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Optional: Handle additional logout actions (e.g., clear user data)
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

    return element;
  };

  return (
    <div className="min-h-screen text-black">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicRoute element={<LoginComponent onLogin={handleLogin} />} restricted />} />
          <Route path="/admin/*" element={<PrivateRoute element={<AdminPage />} />} />
          <Route path="/category/:categoryName" element={<CategoryPosts />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
