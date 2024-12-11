import React, { useState, useEffect } from "react";
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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HandshakeIcon from '@mui/icons-material/Handshake';

                  // Pages

//New Imports
import Navbar from "./components/new-Change/navbar"; // Import your implemented Navbar component
import NewHome from "./components/new-Change/newHome"

// Old Imports
import LoginMobile from "./components/hotel/Login/LoginMobile";
import Register from "./components/hotel/Register/Register";
import AllLocation from "./pages/alllocations/Locations";
import Loader from "./components/loader/Loader";


// Sidebar items with icons
const navItems = [
  { name: "All Advertisements", path: "/", icon: <HomeIcon /> },
  { name: "Explore Destinations", path: "/destinations", icon: <TravelExploreIcon /> },
  { name: "Hotels & Accommodations", path: "/hotels", icon: <HotelIcon /> },
  { name: "Tour Packages & Ent. ", path: "/tour-packages", icon: <TourIcon /> },
  { name: "Events & Manage Events", path: "/events-manage", icon: <EventIcon /> },
  { name: "Vehicles & Live Rides", path: "/vehicles", icon: <DirectionsCarIcon /> },
  { name: "Promo Codes & Agents", path: "/promo-agents", icon: <LocalOfferIcon /> },
  { name: "Travel Partner", path: "/travel-partner", icon: <GroupsIcon /> },
  { name: "Tour Guide", path: "/tour-guide", icon: <GuideIcon /> },
  { name: "Market Advertisements", path: "/market-ads", icon: <CampaignIcon /> },
  { name: "Photos From Travelers", path: "/photos", icon: <PhotoLibraryIcon /> },
  { name: "Pricing & Memberships", path: "/pricing", icon: <AttachMoneyIcon /> },
  { name: "Partners & Partnerships", path: "/partners", icon: <HandshakeIcon /> },
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Change 3000 to the desired loading time in milliseconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />; // Show Loading component when loading
  }


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
    pt: location.pathname === "/login" || location.pathname === "/register" ? 0 : 10,
    p: location.pathname === "/login" || location.pathname === "/register" ? 0 : 0,
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2)), 
      url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733860731/wallpaperflare.com_wallpaper_1_kdsccv.webp")
    `, // Add a white transparent overlay
    backgroundSize: "cover", // Ensures the image covers the entire container
    backgroundPosition: "center", // Centers the image
    backgroundRepeat: "no-repeat", // Prevents image repetition
    minHeight: "100vh", // Makes sure the height covers the full viewport
    backgroundAttachment: "fixed", // Keeps the background image fixed during scrolling
  }}
>
  <Routes>
    <Route path="/" element={<NewHome title="Home" />} />
    <Route path="/destinations" element={<AllLocation title="Destinations" />} />
    <Route path="/hotels" element={<PageContent title="Hotels" />} />
    <Route path="/tour-packages" element={<PageContent title="Tour Packages" />} />
    <Route path="/events-manage" element={<PageContent title="Events & Manage Events" />} />
    <Route path="/vehicles" element={<PageContent title="Vehicles" />} />
    <Route path="/promo-agents" element={<PageContent title="Promo Code & Agents" />} />
    <Route path="/travel-partner" element={<PageContent title="Travel Partner" />} />
    <Route path="/tour-guide" element={<PageContent title="Tour Guide" />} />
    <Route path="/market-ads" element={<PageContent title="Market Advertisements" />} />
    <Route path="/photos" element={<PageContent title="Photos From Travelers" />} />

    {/* No-side bar pages */}
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
            position: "fixed",
            top: 62,
            left: 5,
            zIndex: 5000, // Ensures the menu icon is always on top
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Background color of the button
            width: 40, // Set a fixed width for the button
            height: 40, // Set a fixed height for the button
            padding: 0, // Remove padding to keep the button a perfect square
            borderRadius: "50%", // Make the button round (optional)
            boxShadow: "none", // Optional: remove shadow for flat look
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.3)", // Hover effect for better UX
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
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              paddingTop: "55px",
              backgroundImage: `url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733864317/wallpaperflare.com_wallpaper_yv6p0n.webp")`, // Set your background image URL
              backgroundSize: "cover", // Ensure the image covers the drawer area
              backgroundPosition: "center", // Center the image
              backgroundRepeat: "no-repeat", // Prevent image repetition
              display: "flex", // Make the drawer content flexible
              flexDirection: "column", // Arrange items in a column
              minHeight: "100vh", // Ensure the drawer takes full height of the screen
              overflowY: "auto", // Enable scrolling when content exceeds the height
            },
          }}
        >
  {/* Service Menu Topic */}
  <Typography
    variant="h6"
    sx={{
      marginLeft: "60px",
      marginTop: "15px",
      fontWeight: "bold",
      color: "#333", // Ensure text is visible over the background image
    }}
  >
    Service Menu
  </Typography>

  {/* Navigation List */}
  <List sx={{ mt: 1 }}>
    {navItems.map((item) => (
      <ListItem
        button
        key={item.name}
        component={Link}
        to={item.path}
        onClick={toggleSidebar}
        sx={{
          backgroundColor: location.pathname === item.path ? "rgba(0, 0, 0, 0.3)" : "transparent", // Active link highlight
          fontWeight: "600",
          "&:hover": {
            backgroundColor: { xs: "rgba(0, 0, 0, 0.2)", md: "rgba(0, 0, 0, 0.2)" }, // Hover effect
          },
        }}
      >
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          {item.icon}
        </IconButton>
        <ListItemText
          primary={item.name}
          sx={{ color: "#222" }} // Ensure text is visible
        />
      </ListItem>
    ))}
  </List>

  {/* Footer Section */}
  <Box
    sx={{
      textAlign: "center",
      padding: "16px",
      color: "white",
      fontSize: "12px",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Slight overlay for readability
      marginTop: "auto", // Ensure footer is pushed to the bottom
    }}
  >
    <Typography variant="body2" sx={{ mb: 1 }}>
      © holidaysri.com PVT (LTD)
    </Typography>
    <Typography variant="body2">
      <Link to="/privacy-policy" style={{ color: "white", textDecoration: "none", marginRight: "8px" }}>
        Privacy Policy
      </Link>
      |
      <Link to="/terms-conditions" style={{ color: "white", textDecoration: "none", marginLeft: "8px", marginRight: "8px" }}>
        Term & Condition
      </Link>
      |
      <Link to="/refund-policy" style={{ color: "white", textDecoration: "none", marginLeft: "8px" }}>
        Refund Policy
      </Link>
    </Typography>
  </Box>
</Drawer>




    {/* Permanent Sidebar for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundImage: `url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733864317/wallpaperflare.com_wallpaper_yv6p0n.webp")`, // Set your background image URL
            backgroundSize: "cover", // Ensure the image covers the drawer area
            backgroundPosition: "center", // Center the image
            backgroundRepeat: "no-repeat", // Prevent image repetition
            display: "flex", // Make the drawer content flexible
            flexDirection: "column", // Arrange items in a column
            justifyContent: "space-between", // Space between top and bottom content
            overflow: "hidden", // Hide any overflow
            overflowY: "scroll", // Allow scrolling but hide scrollbar
            scrollbarWidth: "none", // For Firefox
            "&::-webkit-scrollbar": {
              display: "none", // For Chrome, Safari, and Edge
            },
          },
        }}
      >

  {/* Service Menu Section */}
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
    <Typography
      variant="h6"
      sx={{
        marginLeft: "16px", // Space from left edge
        fontWeight: "bold",
        color: "#333", // Ensure text is visible over the background image
      }}
    >
      Service Menu
    </Typography>
  </Box>

  {/* Navigation List */}
  <List sx={{ mt: 1 }}>
    {navItems.map((item) => (
      <ListItem
        button
        key={item.name}
        component={Link}
        to={item.path}
        sx={{
          backgroundColor: location.pathname === item.path ? "rgba(0, 0, 0, 0.3)" : "transparent", // Active link highlight
          fontWeight: "600",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.2)", // Hover effect
          },
        }}
      >
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          {item.icon}
        </IconButton>
        <ListItemText
          primary={item.name}
          sx={{ color: "#222" }} // Ensure text is visible
        />
      </ListItem>
    ))}
  </List>

  {/* Footer Section */}
  <Box
    sx={{
      textAlign: "center",
      padding: "16px",
      color: "white",
      fontSize: "12px",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Slight overlay for readability
      marginTop: "auto", // Ensure footer is pushed to the bottom
    }}
  >
    <Typography variant="body2" sx={{ mb: 1 }}>
      © holidaysri.com PVT (LTD)
    </Typography>
    <Typography variant="body2">
      <Link to="/privacy-policy" style={{ color: "white", textDecoration: "none", marginRight: "8px" }}>
        Privacy Policy
      </Link>
      |
      <Link to="/terms-conditions" style={{ color: "white", textDecoration: "none", marginLeft: "8px", marginRight: "8px" }}>
        Term & Condition
      </Link>
      |
      <Link to="/refund-policy" style={{ color: "white", textDecoration: "none", marginLeft: "8px" }}>
        Refund Policy
      </Link>
    </Typography>
  </Box>
</Drawer>

        </Box>
      )}
    </>
  );
};

export default SidebarWithNavbar;
