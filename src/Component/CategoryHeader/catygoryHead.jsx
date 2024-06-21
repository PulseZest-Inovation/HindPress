// Header.js
import React from 'react';

const CatygoryHead = () => {
  return (
    <div className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-red-700 font-bold">
          {/* <a href="#" className="hover:text-red-900">Same Day Delivery</a> */}
        </div>
        <div className="hidden md:flex space-x-9 font-bold">
          <a href="#" className="text-gray-700 hover:text-gray-900">Stationery</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Corporate Gifts</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Drinkware</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Labels & Packaging</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Apparel</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Awards and Certificates</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Signages</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Marketing & Promo</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Photo Gifts</a>
        </div>
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-gray-900 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default  CatygoryHead;
