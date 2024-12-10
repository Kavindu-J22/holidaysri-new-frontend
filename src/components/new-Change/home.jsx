import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Drawer, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";

// Sidebar items
const navItems = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Hotels", path: "/hotels" },
  { name: "Tour Packages", path: "/tour-packages" },
  { name: "Events & Manage Events", path: "/events-manage" },
  { name: "Vehicles", path: "/vehicles" },
  { name: "Promo Code & Agents", path: "/promo-agents" },
  { name: "Travel Partner", path: "/travel-partner" },
  { name: "Tour Guide", path: "/tour-guide" },
  { name: "Market Advertisements", path: "/market-ads" },
  { name: "Photos From Travelers", path: "/photos" },
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

// Main component
const SidebarLayout = () => {
  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {navItems.map((item) => (
                <ListItem button key={item.name} component={Link} to={item.path}>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Main Content Area */}
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f9f9f9", p: 3 }}>
          <Toolbar />
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
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default SidebarLayout;
