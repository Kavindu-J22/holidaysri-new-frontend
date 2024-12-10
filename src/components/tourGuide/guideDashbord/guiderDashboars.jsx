import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Box
} from '@mui/material';
import {
  AccountCircle, Notifications, Group, Dashboard, Home, Logout, Menu as MenuIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Guiderprifile from './guiderProfile'
import DashboardBG from '../../../assets/ahentdashbg.jpg'

const GuiderDashboard = () => {
  // State for managing active page and drawer open status
  const [activePage, setActivePage] = useState('Profile');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

    // Effect to check user role on component mount
    useEffect(() => {
        const userRole = localStorage.getItem("userRole");
        if (userRole !== 'guide') {
          navigate('/access'); // Redirect if userRole is not 'guide'
        }
      }, [navigate]);

  // Function to render content based on active page
  const renderContent = () => {
    switch (activePage) {
      case 'Profile':
        return <Profile />;
      case 'Notification':
        return <Notification />;
      case 'ViewAllGuiders':
        return <ViewAllGuiders />;
      case 'MainUserDashboard':
        return <MainUserDashboard />;
      case 'Logout':
        return <LogoutPage />;
      default:
        return <Profile />;
    }
  };

  // Function to toggle the sidebar
  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  const handleSignout = () => {
    // Remove userRole and authToken from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    // Redirect to login page or any other page after signout
    window.location.href = '/';
}

  return (
    <div>
      {/* AppBar (Top bar with menu icon) */}
     <AppBar position="fixed" sx={{ backgroundColor: '#312a2a80' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
            sx={{ marginRight: '16px' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Holidaysri - Guider Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <List>
            <ListItem button onClick={() => setActivePage('Profile')}>
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={() => setActivePage('Notification')}>
              <ListItemIcon><Notifications /></ListItemIcon>
              <ListItemText primary="Notification" />
            </ListItem>
            <ListItem button onClick={() => navigate('/all-tourguides')}>
              <ListItemIcon><Group /></ListItemIcon>
              <ListItemText primary="View All Guiders" />
            </ListItem>
            <ListItem button onClick={() => navigate('/MainUserDashboard')}>
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText primary="Main User Dashboard" />
            </ListItem>
            <ListItem button onClick={() => navigate('/')}>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Back to Home" />
            </ListItem>
            <ListItem button onClick={handleSignout}>
              <ListItemIcon><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box
        sx={{
          padding: '80px 20px 20px',
          backgroundColor: '#f5f5f5',
          backgroundImage: `url(${DashboardBG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        {renderContent()}
      </Box>
    </div>
  );
};

// Individual components for each page (you can replace this with your actual content)
const Profile = () => (
  <div>
    <Guiderprifile />
  </div>
);

const Notification = () => (
  <div>
    <Typography variant="h4">Notification Page</Typography>
    <p>Here is the list of notifications for the guider.</p>
  </div>
);

const ViewAllGuiders = () => (
  <div>
    <Typography variant="h4">View All Guiders</Typography>
    <p>All guiders are displayed here.</p>
  </div>
);

const MainUserDashboard = () => (
  <div>
    <Typography variant="h4">Main User Dashboard</Typography>
    <p>The main dashboard content is shown here.</p>
  </div>
);

const LogoutPage = () => (
  <div>
    <Typography variant="h4">Logout</Typography>
    <p>You have been logged out.</p>
  </div>
);

export default GuiderDashboard;
