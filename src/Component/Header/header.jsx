import React from 'react';
import { FaQuestionCircle, FaSearch, FaShoppingCart } from 'react-icons/fa';
import logo from '../../assets/images/logo.png'; // Ensure the path is correct

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md fixed w-full top-0 z-5">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10" />
        <h1>Hind Press</h1>
      </div>
      <div className="flex items-center relative w-1/2 max-w-lg">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
       <button className="ml-4 px-8 py-3 bg-purple-600 text-white rounded-r-full hover:bg-purple-700 focus:outline-none">
  <FaSearch />
</button>

      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center text-gray-700 hover:text-purple-600 cursor-pointer">
          <FaQuestionCircle className="mr-1" /> 
          <span className="hidden md:inline">Help Center</span>
        </div>
       
        <div className="flex items-center text-gray-700 hover:text-purple-600 cursor-pointer relative">
          <FaShoppingCart className="mr-1" /> 
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
