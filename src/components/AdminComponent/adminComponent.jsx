// AdminComponent.js
import React, { useState } from 'react';
import Sidebar from "../DashBoardFeatures/SideBar/sideBar";
import Home from './Features/home';
import AddCategoryComponent from './Features/addCategory';
import ManageCategory from './Features/manageCategory';

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
        {selectedSection === 'manage-category' && <ManageCategory />}
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
