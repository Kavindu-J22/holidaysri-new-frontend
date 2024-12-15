import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Button,
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
import HikingIcon from '@mui/icons-material/Hiking';
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import GavelIcon from "@mui/icons-material/Gavel";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import RedeemIcon from "@mui/icons-material/Redeem";
import CategoryIcon from "@mui/icons-material/Category";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Fastfood } from "@mui/icons-material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SpaIcon from "@mui/icons-material/Spa";
import WorkIcon from "@mui/icons-material/Work";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { BsFillMotherboardFill } from "react-icons/bs";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { AiFillPropertySafety } from "react-icons/ai";
import { FaSitemap } from "react-icons/fa6";
import { GiCampingTent } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";

                  // Pages

//New Imports
import Navbar from "./components/new-Change/navbar"; // Import your implemented Navbar component
import NewHome from "./components/new-Change/newHome"
import Coins from "./components/new-Change/coin"
import NewRegister from "./components/new-Change/newRegister"


// Old Imports
import LoginMobile from "./components/hotel/Login/LoginMobile";
import Register from "./components/hotel/Register/Register";
import AllLocation from "./pages/alllocations/Locations";
import Loader from "./components/loader/Loader";
import PrisingNew from "./components/prising"


// Sidebar items with icons
const navItems = [
  { name: "All Advertisements", path: "/", icon: <HomeIcon /> },
  { name: "Post Your Advertiesment", path: "/destinations", icon: <CampaignIcon /> },
  { name: "Plan Your Dream Tour with Us", path: "/destinations", icon: <AirplaneTicketIcon /> },
  { name: "Explore Destinations", path: "/destinations", icon: <TravelExploreIcon /> },
  { name: "Hotels & Accommodations", path: "/hotels", icon: <HotelIcon /> },
  { name: "Foods & Beverages", path: "/hotels", icon: <Fastfood /> },
  { name: "Live Rides Updates", path: "/vehicles", icon: <DepartureBoardIcon /> },
  { name: "Travel Agents & Promo codes", path: "/promo-agents", icon: <LocalOfferIcon /> },
  {
    name: "Other Categories",
    icon: <BsFillMotherboardFill />,
    subcategories: [
      { name: "Rent, Buy Or Sell Your Property", path: "/other-categories/doctors", icon: <AiFillPropertySafety /> },
      { name: "Meet Expert Doctors", path: "/other-categories/doctors", icon: <MedicalServicesIcon /> },
      { name: "Professional Lawyers", path: "/other-categories/lawyers", icon: <GavelIcon /> },
      { name: "Expert Consultants", path: "/other-categories/consultants", icon: <PersonSearchIcon /> },
      { name: "Talented Entertainers", path: "/other-categories/consultants", icon: <MusicNoteIcon  /> },
      { name: "Creative Photographers", path: "/other-categories/consultants", icon: <CameraAltIcon  /> },
      { name: "Exclusive Gift Packs", path: "/other-categories/gift-packs", icon: <RedeemIcon /> },
      { name: "Souvenirs & Collectibles", path: "/other-categories/collectibles", icon: <CategoryIcon /> },
      { name: "Other Items & Ect:", path: "/other-categories/collectibles", icon: <FaSitemap /> },
      { name: "Daily Grocery Essentials", path: "/other-categories/collectibles", icon: <ShoppingCartIcon /> },
      { name: "Organic Herbal Products", path: "/other-categories/collectibles", icon: <SpaIcon  /> },
      { name: "Rent a Land for Camping or Parking purpose's ", path: "/other-categories/collectibles", icon: <GiCampingTent /> },
      { name: "Clothing Items", path: "/other-categories/collectibles", icon: <GiClothes  /> },
      { name: "Exciting Job Opportunities", path: "/other-categories/consultants", icon: <WorkIcon  /> },
      { name: "Crypto Consulting & Signals", path: "/other-categories/consultants", icon: <TrendingUpIcon  /> },
    ],
  },
  { name: "Foreign Tour Packages ", path: "/tour-packages", icon: <TourIcon /> },
  { name: "Local Tour Packages", path: "/tour-packages", icon: <HikingIcon /> },
  { name: "Customize Tour Package", path: "/tour-packages", icon: <CardTravelIcon /> },
  { name: "Events & Manage Your Event", path: "/events-manage", icon: <EventIcon /> },
  { name: "Vehicle Rentals & Hire Services", path: "/vehicles", icon: <DirectionsCarIcon /> },
  { name: "Find Travel Budys", path: "/travel-partner", icon: <GroupsIcon /> },
  { name: "Expert Tour Guiders", path: "/tour-guide", icon: <GuideIcon /> },
  { name: "Travelers Gallery & Share Travel Memories With Others", path: "/photos", icon: <PhotoLibraryIcon /> },
  { name: "Exclusive Offers & Promotions", path: "/prising", icon: <FlashOnIcon /> },
  { name: "Pricing & Memberships", path: "/prising", icon: <AttachMoneyIcon /> },
  { name: "Holidaysri Coins", path: "/coins", icon: <CurrencyExchangeIcon /> },
  { name: "Com.Partners & Partnerships", path: "/partners", icon: <HandshakeIcon /> },
  { name: "Customer Support", path: "/partners", icon: <SupportAgentIcon /> },
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
  const [buttonState, setButtonState] = useState(false); // State to toggle button display
  const [coins, setCoins] = useState(0);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    // Simulate loading time (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false);  // Change loading state after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);  // Cleanup on component unmount
  }, []); // This useEffect runs once on mount

  useEffect(() => {
    if (userEmail) {
      // Fetch coins if userEmail exists
      axios
        .get(`http://localhost:8000/coin/coins/${userEmail}`)
        .then((response) => {
          if (response.data.success) {
            setCoins(response.data.coins);
          } else {
            console.error("Error fetching coins:", response.data.message);
            setCoins(0); // Fallback to 0 if the request fails
          }
        })
        .catch((error) => {
          console.error("Error fetching coins:", error);
          setCoins(0); // Fallback to 0 on error
        });
    } else {
      setCoins(0); // If no userEmail in local storage, set coins to 0
    }
  }, [userEmail]); // This runs every time userEmail changes

  // If still loading, show Loader
  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <CssBaseline />
      {/* Conditionally render Navbar */}
      <NavbarWithConditionalRender />

      {/* Fixed Button */}
      <Button
        onClick={() => setButtonState(!buttonState)}
        sx={{
          position: "fixed",
          top: "150px",
          right: "0",
          zIndex: 1000,
          backgroundColor: "rgba(0,0,0,0.6)", // Default background color
          boxShadow: "0 4px 8px rgba(64, 64, 64, 0.8)", // Dark gray shadow
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          borderRadius: "20px 0 0 20px", // Top-left and bottom-left border-radius only
          transition: "width 0.3s ease-in-out, background-color 0.3s ease", // Smooth transitions
          width: buttonState ? "210px" : "50px", // Dynamic width based on state
          overflow: "hidden", // Ensure content stays within the button
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.5)", // Hover background color
            boxShadow: "0 6px 12px rgba(64, 64, 64, 0.9)", // Darker shadow on hover
          },
        }}
      >
        {buttonState ? (
          <>
            <ChevronRight style={{ color: "#fff", marginRight: "8px" }} />
            <img
              src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1734136783/hsc_resll6.webp" // Replace with your coin image URL
              alt="Coin"
              style={{ width: "25px", height: "25px", marginRight: "8px" }}
            />
            <span>
              <a
                href="/coins"
                style={{
                  color: "gold", // Text color
                  fontWeight: "bold", // Make the text bold
                  textDecoration: "none", // Remove underline
                  cursor: "pointer", // Show pointer on hover
                }}
              >
                Total Coins: {coins} (Add +)
              </a>
            </span>
          </>
        ) : (
          <>
            <ChevronLeft style={{ color: "#fff" }} />
            <img
              src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1734136783/hsc_resll6.webp" // Replace with your coin image URL
              alt="Coin"
              style={{ width: "25px", height: "25px" }}
            />
          </>
        )}
      </Button>


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

    <Route path="/prising" element={<PrisingNew title="Prising page" />} />
    <Route path="/coins" element={<Coins title="Coins page" />} />

    {/* No-side bar pages */}
    <Route path="/register" element={<NewRegister />} />
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

  const [expandedCategory, setExpandedCategory] = useState(null); // Tracks expanded dropdowns

  const handleToggle = (categoryName) => {
    setExpandedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

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
  {navItems.map((item) =>
    item.subcategories ? (
      <React.Fragment key={item.name}>
        <ListItem
          button
          onClick={() => handleToggle(item.name)}
          sx={{
            backgroundColor: expandedCategory === item.name ? "rgba(0, 0, 0, 0.3)" : "transparent", // Highlight expanded category
            fontWeight: "600",
            "&:hover": {
              backgroundColor: {
                xs: "rgba(0, 0, 0, 0.2)",
                md: "rgba(0, 0, 0, 0.2)",
              },
            },
          }}
        >
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            {item.icon}
          </IconButton>
          <ListItemText
            primary={item.name}
            sx={{ color: "#222" }}
          />
          <Box
            sx={{
              width: 25,
              height: 25,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark transparency
              cursor: "pointer",
            }}
            onClick={() => handleExpandToggle(item.name)} // Add your expand/collapse logic here
          >
            {expandedCategory === item.name ? <ExpandMore sx={{ color: "#fff" }} /> : <ExpandLess sx={{ color: "#fff" }} />}
          </Box>

        </ListItem>
        <Collapse in={expandedCategory === item.name} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subcategories.map((subItem) => (
              <ListItem
                button
                key={subItem.name}
                component={Link}
                to={subItem.path}
                onClick={toggleSidebar}
                sx={{
                  pl: 4,
                  backgroundColor:
                    location.pathname === subItem.path ? "rgba(0, 0, 0, 0.3)" : "#d9f0e65d", // Active link highlight for subcategories
                    borderBottom: "1px solid #b2b3aafe",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: {
                      xs: "rgba(0, 0, 0, 0.2)",
                      md: "rgba(0, 0, 0, 0.2)",
                    },
                  },
                }}
              >
                <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                  {subItem.icon}
                </IconButton>
                <ListItemText primary={subItem.name} sx={{ color: "#222" }} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    ) : (
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
            backgroundColor: {
              xs: "rgba(0, 0, 0, 0.2)",
              md: "rgba(0, 0, 0, 0.2)",
            },
          },
        }}
      >
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          {item.icon}
        </IconButton>
        <ListItemText primary={item.name} sx={{ color: "#222" }} />
      </ListItem>
      )
      )}
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
  {navItems.map((item) =>
    item.subcategories ? (
      <React.Fragment key={item.name}>
        <ListItem
          button
          onClick={() => handleToggle(item.name)}
          sx={{
            backgroundColor: location.pathname === item.path ? "rgba(0, 0, 0, 0.3)" : "transparent",
            fontWeight: "600",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            {item.icon}
          </IconButton>
          <ListItemText
            primary={item.name}
            sx={{ color: "#222" }}
          />
          <Box
            sx={{
              width: 25,
              height: 25,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark transparency
              cursor: "pointer",
            }}
            onClick={() => handleExpandToggle(item.name)} // Add your expand/collapse logic here
          >
            {expandedCategory === item.name ? <ExpandMore sx={{ color: "#fff" }} /> : <ExpandLess sx={{ color: "#fff" }} />}
          </Box>
        </ListItem>
        <Collapse in={expandedCategory === item.name} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subcategories.map((subItem) => (
              <ListItem
                button
                key={subItem.name}
                component={Link}
                to={subItem.path}
                sx={{
                  pl: 4,
                  backgroundColor: location.pathname === subItem.path ? "rgba(0, 0, 0, 0.3)" : "#d9f0e65d",
                  borderBottom: "1px solid #b2b3aafe",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                  {subItem.icon}
                </IconButton>
                <ListItemText primary={subItem.name} sx={{ color: "#222" }} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    ) : (
      <ListItem
        button
        key={item.name}
        component={Link}
        to={item.path}
        sx={{
          backgroundColor: location.pathname === item.path ? "rgba(0, 0, 0, 0.3)" : "transparent",
          fontWeight: "600",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          {item.icon}
        </IconButton>
        <ListItemText primary={item.name} sx={{ color: "#222" }} />
      </ListItem>
        )
      )}
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
