// Sidebar.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Home, Category, Info, Menu, ExitToApp } from '@mui/icons-material';

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

  const handleLogout = () => {
    // Perform logout actions (e.g., clear session)
    // Here, we trigger the logout callback passed from parent component 
    if (onLogout) {
      onLogout();
    }
  };

  const handleLogoutAndNavigate = () => {
    handleLogout(); // Perform logout actions
    window.location.href = '/login'; // Navigate to login page
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
              { text: 'Manage Category', icon: <Category />, section: 'manage-category' },
              { text: 'Info', icon: <Info />, section: 'info' },
              { text: 'Logout', icon: <ExitToApp />, action: handleLogoutAndNavigate }, // Logout button with navigation
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
