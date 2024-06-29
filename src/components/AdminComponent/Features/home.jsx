import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import ProjectIcon from '../../../assets/icons/ProjectIcon.svg'; // Adjust the path as necessary

const featureDetails = [
  { name: 'DashBoard', description: 'This is your home page content. You can add more sections, features, or information here.' },
  { name: 'Add Headline', description: 'Add headlines to your application. This section allows you to create and manage headlines.' },
  { name: 'Add Category', description: 'Create and organize categories for your content. This section helps you manage categories efficiently.' },
  { name: 'Manage Posts', description: 'Manage your posts from this section. You can edit, delete, or view all posts here.' },
  { name: 'All Posts', description: 'View all posts in your application. This section provides a comprehensive list of all posts.' },
  { name: 'Visit Home Page', action: 'home' }, // Add an action key for navigation
];

const Home = () => {
  const [selectedFeature, setSelectedFeature] = useState(featureDetails[0]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleFeatureClick = (feature) => {
    if (feature.action === 'home') {
      navigate('/'); // Navigate to '/' route using navigate
    } else {
      setSelectedFeature(feature);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg" style={{ fontFamily: 'Kanit, sans-serif' }}>
      <h2 className="text-4xl text-center mt-12 font-semibold text-gray-800">
        Welcome to Hind Press DashBoard
      </h2>
      <p className="text-base text-center mt-6 text-gray-600 font-normal">
        {selectedFeature.description}
      </p>

      <div className="mt-10 flex flex-wrap justify-center">
        {featureDetails.map((feature, index) => (
          <button
            key={index}
            onClick={() => handleFeatureClick(feature)} // Update onClick handler
            className={`m-2 p-3 border rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
              selectedFeature.name === feature.name
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-800 border-gray-300'
            }`}
          >
            {feature.name}
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <img
          src={ProjectIcon}
          alt="Project Icon"
          className="w-12 h-12 text-gray-600 animate-bounce"
        />
      </div>
    </div>
  );
};

export default Home;
