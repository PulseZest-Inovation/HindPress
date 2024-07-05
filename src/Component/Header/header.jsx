import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaQuestionCircle, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { db } from '../../utils/FireBase/firebaseConfig';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [postResults, setPostResults] = useState([]);
  const [categoryResults, setCategoryResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (searchQuery.trim() === '') {
          setPostResults([]);
          setCategoryResults([]);
          return;
        }

        const allPosts = await getDocs(collection(db, 'posts'));
        const allCategories = await getDocs(collection(db, 'categories'));

        const posts = allPosts.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(post => post.name.toLowerCase().includes(searchQuery.toLowerCase()));

        const categories = allCategories.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(category => category.name.toLowerCase().includes(searchQuery.toLowerCase()));

        setPostResults(posts);
        setCategoryResults(categories);
      } catch (error) {
        console.error("Error searching: ", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleResultClick = (result) => {
    if (result.type === 'post') {
      navigate(`/posts/${result.id}`);
    } else if (result.type === 'category') {
      navigate(`/category/${result.name}`);
    }
    setSearchQuery('');
    setPostResults([]);
    setCategoryResults([]);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md fixed w-full top-0 z-10">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-10 mr-2" style={{ objectFit: 'contain' }} />
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
        <button type="submit" className="px-4 py-3 bg-purple-600 text-white rounded-r-full hover:bg-purple-700 focus:outline-none">
          <FaSearch />
        </button>
      </form>
      {(postResults.length > 0 || categoryResults.length > 0) && (
        <div className="absolute top-full left-0 bg-white w-full z-10 shadow-lg flex">
          {postResults.length > 0 && (
            <div className="w-1/2 border-r border-gray-200">
              <h2 className="text-xl font-semibold p-4">Posts</h2>
              <ul className="divide-y divide-gray-200">
                {postResults.map((post, index) => (
                  <li key={index} className="py-2 px-4 cursor-pointer hover:bg-gray-100" onClick={() => handleResultClick({ type: 'post', ...post })}>
                    <span>{post.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {categoryResults.length > 0 && (
            <div className="w-1/2">
              <h2 className="text-xl font-semibold p-4">Categories</h2>
              <ul className="divide-y divide-gray-200">
                {categoryResults.map((category, index) => (
                  <li key={index} className="py-2 px-4 cursor-pointer hover:bg-gray-100" onClick={() => handleResultClick({ type: 'category', ...category })}>
                    <span>{category.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <div className="flex items-center space-x-6">
        <div className="flex items-center text-gray-700 hover:text-purple-600 cursor-pointer">
          <FaQuestionCircle className="mr-1" />
          <span className="hidden md:inline">Help Center</span>
        </div>
        <div className="relative">
          <FaShoppingCart className="text-gray-700 hover:text-purple-600 cursor-pointer" />
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
