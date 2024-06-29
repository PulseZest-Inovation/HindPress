// AdminComponent.js
import React, { useState } from 'react';
import Sidebar from "../DashBoardFeatures/SideBar/sideBar";
import Home from './Features/home';
import AddCategoryComponent from './Features/addCategory';
import AddPosts from './Features/AddPosts';
import AllPosts from './Features/allPosts';
import AddHeadLine from './Features/addHeadLine';
import Info from '../../components/AdminComponent/Features/info';

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
        {selectedSection === 'add-headline' && <AddHeadLine />}
        {selectedSection === 'add-category' && <AddCategoryComponent />}
        {selectedSection === 'manage-posts' && <AddPosts />}
        {selectedSection === 'all-category' && <AllPosts />}
        {selectedSection === 'info' && <Info />}
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
