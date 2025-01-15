import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import RatesPage from "../../components/Offers/Offers";
import AddDestinations from "../../pages/alllocations/addLocations";
import { BiSolidCategory } from 'react-icons/bi';
import { ImProfile } from "react-icons/im";

const drawerWidth = 250;

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

    const menuItems = [
        { text: 'Profile', icon: <ImProfile /> },
        { text: 'Rates', icon: <ImProfile /> },
        { text: 'Advertisements', icon: <ImProfile /> },
        { text: 'Add Destinations', icon: <ImProfile /> },
        { text: 'Earnings', icon: <ImProfile /> },
        { text: 'Accounts', icon: <ImProfile /> },
        { text: 'Settings', icon: <ImProfile /> },
    ];

    const drawerContent = (
        <Box sx={{
            overflow: 'auto',
            marginTop: '70px',
            height: '100%',
            backgroundImage: 'url(/sidebar-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white'
        }}>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem 
                        button 
                        key={index} 
                        onClick={() => handlePageChange(item.text)}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                transition: 'all 0.3s ease',
                            },
                            backgroundColor: selectedPage === item.text ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                        }}
                    >
                        <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
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
                return <RatesPage />;
            case 'Advertisements':
                return <div>Advertisements Page Content</div>;
            case 'Add Destinations':
                    return <AddDestinations />;
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
                        position: 'fixed',
                        top: 70,
                        left: 22,
                        zIndex: 1000,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
                        },
                        '& svg': {
                            fontSize: '22px',
                            color: '#333',
                        }
                    }}
                >
                    <BiSolidCategory />
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
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(10px)',
                    },
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
