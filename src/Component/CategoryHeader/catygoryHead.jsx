import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/FireBase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const CategoryHead = () => {
  const [categories, setCategories] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const snapshot = await getDocs(categoriesRef);
        const categoriesList = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name
        }));
        setCategories(categoriesList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3 flex justify-evenly items-center">
        <div className="text-red-700 font-bold">
          {/* <a href="#" className="hover:text-red-900">Same Day Delivery</a> */}
        </div>
        <div className="hidden md:flex space-x-9 font-bold">
          {categories.map((category, index) => (
            <a key={index} href="#" onClick={() => handleCategoryClick(category.name)} className="text-gray-700 hover:text-gray-900">{category.name}</a>
          ))}
        </div>
        <div className="md:hidden">
          <button
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Sidebar for smaller screens */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-200 bg-opacity-75 z-50">
          <div className="absolute inset-y-0 left-0 bg-white w-64 z-50 shadow">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Categories</h2>
                <button
                  className="text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={toggleSidebar}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a onClick={() => handleCategoryClick(category.name)} className="block text-gray-700 hover:text-gray-900">{category.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryHead;
