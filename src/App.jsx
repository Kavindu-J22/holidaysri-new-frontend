import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  CssBaseline,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import HotelIcon from "@mui/icons-material/Hotel";
import TourIcon from "@mui/icons-material/Tour";
import EventIcon from "@mui/icons-material/Event";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import GroupsIcon from "@mui/icons-material/Groups";
import GuideIcon from "@mui/icons-material/EmojiPeople";
import CampaignIcon from "@mui/icons-material/Campaign";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MenuIcon from "@mui/icons-material/Menu";
import Navbar from "./components/new-Change/navbar"; // Import your implemented Navbar component

// Old Imports
import LoginMobile from "./components/hotel/Login/LoginMobile";
import Register from "./components/hotel/Register/Register";


// Sidebar items with icons
const navItems = [
  { name: "Home", path: "/", icon: <HomeIcon /> },
  { name: "Destinations", path: "/destinations", icon: <TravelExploreIcon /> },
  { name: "Hotels", path: "/hotels", icon: <HotelIcon /> },
  { name: "Tour Packages", path: "/tour-packages", icon: <TourIcon /> },
  { name: "Events & Manage Events", path: "/events-manage", icon: <EventIcon /> },
  { name: "Vehicles", path: "/vehicles", icon: <DirectionsCarIcon /> },
  { name: "Promo Code & Agents", path: "/promo-agents", icon: <LocalOfferIcon /> },
  { name: "Travel Partner", path: "/travel-partner", icon: <GroupsIcon /> },
  { name: "Tour Guide", path: "/tour-guide", icon: <GuideIcon /> },
  { name: "Market Advertisements", path: "/market-ads", icon: <CampaignIcon /> },
  { name: "Photos From Travelers", path: "/photos", icon: <PhotoLibraryIcon /> },
];

// Component for rendering pages
const PageContent = ({ title }) => (
  <Box p={3}>
    <Typography variant="h4">{title}</Typography>
    <Typography variant="body1">
      Content for {title}. Replace this with your actual page content.
    </Typography>
  </Box>
);

// Main Layout Component
const SidebarWithNavbar = () => {
  return (
    <Router>
      <CssBaseline />
      {/* Conditionally render Navbar */}
      <NavbarWithConditionalRender />

      <Box sx={{ display: "flex" }}>
        {/* Conditionally render Sidebar */}
        <SideBarWithConditionalRender />

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "#f9f9f9",
            pt: (location.pathname === "/login" || location.pathname === "/register") ? 0 : 10,
            p: (location.pathname === "/login" || location.pathname === "/register") ? 0 : 5,
          }}
        >
          <Routes>
            <Route path="/" element={<PageContent title="Home" />} />
            <Route path="/destinations" element={<PageContent title="Destinations" />} />
            <Route path="/hotels" element={<PageContent title="Hotels" />} />
            <Route path="/tour-packages" element={<PageContent title="Tour Packages" />} />
            <Route path="/events-manage" element={<PageContent title="Events & Manage Events" />} />
            <Route path="/vehicles" element={<PageContent title="Vehicles" />} />
            <Route path="/promo-agents" element={<PageContent title="Promo Code & Agents" />} />
            <Route path="/travel-partner" element={<PageContent title="Travel Partner" />} />
            <Route path="/tour-guide" element={<PageContent title="Tour Guide" />} />
            <Route path="/market-ads" element={<PageContent title="Market Advertisements" />} />
            <Route path="/photos" element={<PageContent title="Photos From Travelers" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginMobile />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

// Navbar with conditional rendering based on the route
const NavbarWithConditionalRender = () => {
  const location = useLocation();
  const noNavbarRoutes = ["/login", "/register"];
  const isNoNavbarPage = noNavbarRoutes.includes(location.pathname);
  return !isNoNavbarPage && <Navbar />;
};

// Sidebar with conditional rendering based on the route
const SideBarWithConditionalRender = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false); // State to manage the sidebar toggle
  const [expanded, setExpanded] = useState(true); // State to manage the collapse/expand of the sidebar on mobile

  // Toggle sidebar for mobile
  const toggleSidebar = () => setOpen(!open);

  // Define routes where sidebar should not be visible
  const noSidebarRoutes = ["/login", "/register"];
  const isNoSidebarPage = noSidebarRoutes.includes(location.pathname);

  return (
    <>
      {!isNoSidebarPage && (
        <Box sx={{ display: "flex" }}>
          {/* Mobile Menu Toggle */}
<IconButton
  onClick={toggleSidebar}
  sx={{
    display: { xs: "flex", md: "none" },
    position: "absolute",
    top: 62,
    left: 5,
    zIndex: 3000, // Ensures the menu icon is always on top
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color of the button
    width: 40, // Set a fixed width for the button
    height: 40, // Set a fixed height for the button
    padding: 0, // Remove padding to keep the button a perfect square
    borderRadius: "50%", // Make the button round (optional)
    boxShadow: "none", // Optional: remove shadow for flat look
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)", // Hover effect for better UX
      color: "#333",
    },
    
  }}
>
  <MenuIcon />
</IconButton>



          {/* Sidebar Drawer */}
          <Drawer
            variant="temporary"
            open={open}
            onClose={toggleSidebar}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", marginTop: "55px" },
            }}
          >
         {/* Topic "Service Menu" */}
          <Typography
            variant="h6"
            sx={{
              marginLeft: "60px",
              marginTop: "15px",
              fontWeight: "bold",
            }}
          >
            Service Menu
          </Typography>
            <List
            sx={{mt:1}}>
              {navItems.map((item) => (
                <ListItem
                  button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{
                    backgroundColor: location.pathname === item.path ? "lightgray" : "transparent", // Active link highlight
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)", // Hover effect
                    },
                  }}
                >
                  <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                    {item.icon}
                  </IconButton>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>

          {/* Permanent Sidebar for desktop */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              width: 240,
              flexShrink: 0,
              "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", backgroundColor: "#fff" },
            }}
          >
            <Toolbar />
            <List>
              {navItems.map((item) => (
                <ListItem
                  button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{
                    backgroundColor: location.pathname === item.path ? "lightgray" : "transparent", // Active link highlight
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)", // Hover effect
                    },
                  }}
                >
                  <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                    {item.icon}
                  </IconButton>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
      )}
    </>
  );
};

export default SidebarWithNavbar;
