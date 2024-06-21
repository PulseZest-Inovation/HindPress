// Sidebar.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Home, Category, Info, Menu, ExitToApp } from '@mui/icons-material';
import { signOut } from 'firebase/auth';
import { auth } from '../../../utils/FireBase/firebaseConfig'; // Adjust the path as per your project structure

const Sidebar = ({ onItemClick, onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is mobile
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Perform additional logout actions if needed (e.g., clear session)
      if (onLogout) {
        onLogout();
      }
      window.location.href = '/login'; // Navigate to login page
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer}
        style={styles.menuButton}
      >
        <Menu />
      </IconButton>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={isMobile ? open : true} // Only control open state on mobile
        onClose={handleDrawerClose} // Close handler for temporary variant
        style={styles.drawer}
      >
        <div
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
          style={styles.drawerContent}
        >
          <List>
            {[
              { text: 'Home', icon: <Home />, section: 'home' },
              { text: 'Add Category', icon: <Category />, section: 'add-category' },
              { text: 'Info', icon: <Info />, section: 'info' },
              { text: 'Logout', icon: <ExitToApp />, action: handleLogout }, // Logout button with Firebase logout
            ].map((item, index) => (
              <ListItem button key={item.text} onClick={item.action || (() => onItemClick(item.section))}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

const styles = {
  menuButton: {
    marginRight: 16,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerContent: {
    width: 240,
    backgroundColor: '#2C3E50', // Dark blueish background color
    color: '#FFFFFF', // White text color
    height: '100%',
  },
};

export default Sidebar;
