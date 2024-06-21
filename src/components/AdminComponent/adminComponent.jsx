// AdminComponent.js
import React, { useState } from 'react';
import Sidebar from "../DashBoardFeatures/SideBar/sideBar";
import AddCategory from './Features/addCategory'; // Adjust path as per your project structure
import Home from './Features/home';
import AddCategoryComponent from './Features/addCategory';

const AdminComponent = () => {
  const [selectedSection, setSelectedSection] = useState('home');

  const handleSidebarItemClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <div style={styles.container}>
      <Sidebar onItemClick={handleSidebarItemClick} />
      <div style={styles.content}>
        {selectedSection === 'home' && <Home />}
        {selectedSection === 'add-category' && <AddCategoryComponent />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
  },
  content: {
    flex: 1,
    padding: '20px',
  },
};

export default AdminComponent;
