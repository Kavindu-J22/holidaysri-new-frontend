import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import RatesPage from "../../components/Offers/Offers";
import { BiSolidCategory } from "react-icons/bi";

const drawerWidth = 240;

const ProfilePage = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState('Profile');
    const isMobile = useMediaQuery('(max-width: 600px)');

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handlePageChange = (page) => {
        setSelectedPage(page);
        if (isMobile) setMobileOpen(false);
    };

    const drawerContent = (
        <Box sx={{ overflow: 'auto', marginTop: '70px' }}>
            <List>
                {[
                    'Profile',
                    'Rates',
                    'Advertisements',
                    'Earnings',
                    'Accounts',
                    'Settings'
                ].map((text, index) => (
                    <ListItem button key={index} onClick={() => handlePageChange(text)}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const renderPage = () => {
        switch (selectedPage) {
            case 'Profile':
                return <div>Profile Page Content</div>;
            case 'Rates':
                return <RatesPage/>;
            case 'Advertisements':
                return <div>Advertisements Page Content</div>;
            case 'Earnings':
                return <div>Earnings Page Content</div>;
            case 'Accounts':
                return <div>Accounts Page Content</div>;
            case 'Settings':
                return <div>Settings Page Content</div>;
            default:
                return <div>Welcome to the App</div>;
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {isMobile && (
                <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  position: 'fixed',  // Fixed position
                  top: 70,            // Adjusted top position
                  left: 22,           // Adjusted left position
                  zIndex: 1000,       // Ensure it stays on top
                  width: 40,          // Circle size
                  height: 40,
                  borderRadius: '50%',  // Makes it circular
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',  // Glass-like background
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',   // Soft shadow for depth
                  backdropFilter: 'blur(10px)',  // Glass blur effect
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',  // Subtle border
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',  // Slightly brighter on hover
                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',  // Enhance shadow
                  },
                  '& svg': {
                    fontSize: '22px',  // Icon size
                    color: '#333',    // Icon color
                  }
                }}
              >
                {mobileOpen ? <BiSolidCategory /> : <BiSolidCategory />}
              </IconButton>
              
            )}
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? mobileOpen : true}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                {drawerContent}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {renderPage()}
            </Box>
        </Box>
    );
};

export default ProfilePage;
