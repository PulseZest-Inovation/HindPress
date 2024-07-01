import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { FaQuestionCircle, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Ensure the path is correct
import { db } from '../../utils/FireBase/firebaseConfig';

const Header = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;

    try {
      const searchResults = [];

      // Search in posts
      const postQuery = query(collection(db, 'posts'), where('name', '>=', searchQuery), where('name', '<=', searchQuery + '\uf8ff'));
      const postQuerySnapshot = await getDocs(postQuery);
      const postResults = postQuerySnapshot.docs.map(doc => ({ id: doc.id, type: 'post', ...doc.data() }));
      searchResults.push(...postResults);

      // Search in categories
      const categoryQuery = query(collection(db, 'categories'), where('name', '>=', searchQuery), where('name', '<=', searchQuery + '\uf8ff'));
      const categoryQuerySnapshot = await getDocs(categoryQuery);
      const categoryResults = categoryQuerySnapshot.docs.map(doc => ({ id: doc.id, type: 'category', ...doc.data() }));
      searchResults.push(...categoryResults);

      // Add more queries for other collections if needed

      onSearchResults(searchResults);
      navigate('/search'); // Assuming you have a search results route
    } catch (error) {
      console.error("Error searching: ", error);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md fixed w-full top-0 z-10">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Hind Press</h1>
      </div>
      <form onSubmit={handleSearch} className="flex items-center relative w-1/2 max-w-lg">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-r-full hover:bg-purple-700 focus:outline-none">
          <FaSearch />
        </button>
      </form>
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
