import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './Component/Header/header';
import Footer from './Component/footer/footer';
import Home from './Pages/home';  // Make sure to import the Home component

const App = () => {
  return (
    <div className="min-h-screen text-black">
      <Router>
        <Header />
        <div className="pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes here as needed */}
          </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
