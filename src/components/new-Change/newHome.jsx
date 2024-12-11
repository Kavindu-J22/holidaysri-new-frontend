import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Hotel as HotelIcon,
  LocalOffer as LocalOfferIcon,
  DirectionsCar as DirectionsCarIcon,
  DirectionsBus as DirectionsBusIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";

// Custom hook to fetch data from API
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const HomePage = () => {
  const [destinations, setDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [packages, setPackages] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [liveRides, setLiveRides] = useState([]);
  const [localPackages, setLocalPackages] = useState([]);
  const [events, setEvents] = useState([]);
  const [agents, setAgents] = useState([]);
  const [guiders, setGuiders] = useState([]);
  const [partners, setPartners] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetching data from all the APIs
    fetchData("https://holidaysri-backend-9xm4.onrender.com/location/").then(
      setDestinations
    );
    fetchData("https://holidaysri-backend-9xm4.onrender.com/hotel/").then(
      setHotels
    );
    fetchData("https://holidaysri-backend-9xm4.onrender.com/package/").then(
      setPackages
    );
    fetchData("https://holidaysri-backend-9xm4.onrender.com/vehicle/").then(
      setVehicles
    );
    fetchData("https://holidaysri-backend-9xm4.onrender.com/realTime/").then(
      setLiveRides
    );
    fetchData(
      "https://holidaysri-backend-9xm4.onrender.com/localPackage/"
    ).then(setLocalPackages);
    fetchData("https://holidaysri-backend-9xm4.onrender.com/event/").then(
      setEvents
    );
    fetchData(
      "https://holidaysri-backend-9xm4.onrender.com/api/agent/allAgentProfiles"
    ).then(setAgents);
    fetchData(
      "https://holidaysri-backend-9xm4.onrender.com/api/guide/allGuideProfiles"
    ).then(setGuiders);
    fetchData(
      "https://holidaysri-backend-9xm4.onrender.com/api/partner/allPartnerProfiles"
    ).then(setPartners);
    fetchData("https://holidaysri-backend-9xm4.onrender.com/product/").then(
      setAdvertisements
    );
  }, []);

  // Function to filter data by search term
  const filteredData = (data) => {
    return data.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Box sx={{ paddingTop: "90px", paddingLeft: "20px", paddingRight: "20px", paddingBottom: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        minHeight: "100vh",
        color: "white",
     }}>
        
      {/* Search Bar */}
      <Box
        sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
        }}
        >
        <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search anything you want..!"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
            ),
            sx: {
                color: "white", // Text color
                padding: { lg: "12px", xs: "8px" },
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.25)", // Transparent white background
                borderRadius: "10px",
                "::placeholder": {
                color: "rgba(255, 255, 255, 0.7)", // Placeholder color
                fontSize: { lg: "16px", xs: "14px" },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent", // Transparent border initially
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.4)", // Border color on hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "limegreen", // Green border on focus
                },
            },
            }}
        />
        </Box>


      {/* Sections */}
      <Section title="Destinations" icon={<LocationIcon />} data={(destinations)} />
      <Section title="Hotels & Accommodations" icon={<HotelIcon />} data={filteredData(hotels)} />
      <Section title="Tour Packages" icon={<LocalOfferIcon />} data={filteredData(packages)} />
      <Section title="Vehicles" icon={<DirectionsCarIcon />} data={filteredData(vehicles)} />
      <Section title="Live Rides" icon={<DirectionsBusIcon />} data={(liveRides)} />
      <Section title="Local Packages" icon={<LocalOfferIcon />} data={filteredData(localPackages)} />
      <Section title="Events" icon={<EventIcon />} data={filteredData(events)} />
      <Section title="Promocode Agents" icon={<PersonIcon />} data={filteredData(agents)} />
      <Section title="Tour Guiders" icon={<PersonIcon />} data={filteredData(guiders)} />
      <Section title="Travel Partners" icon={<BusinessIcon />} data={filteredData(partners)} />
      <Section title="Market Advertisements" icon={<BusinessIcon />} data={filteredData(advertisements)} />
    </Box>
  );
};

const Section = ({ title, icon, data }) => (
    <Box sx={{ marginBottom: "40px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", }}>
      <Typography
        variant="h5"
        sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            fontWeight: "700", // Increased font weight (bold)
            fontSize: "1.5rem", // Increased font size
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", // Black text shadow
        }}
        >
        {icon}
        <span style={{ marginLeft: "10px" }}>{title}</span>
        </Typography>

      {data.length > 0 ? (
        <Grid container spacing={2}>
          {data.slice(0, 6).map((item, index) => (
            <Grid item xs={6} sm={6} md={4} key={index}>
              <Box
                sx={{
                  background: "rgba(0, 0, 0, 0.7)",
                  borderRadius: "10px",
                  padding: "15px",
                  margin: "5px",
                  textAlign: "center",
                  overflow: "hidden",
                  position: "relative",
                  color: "#fff",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box
                  sx={{
                    height: { xs: "100px", sm: "180px" },
                    background: `url(${item.images?.[0]}) center/cover no-repeat`,
                    borderRadius: "8px",
                    marginBottom: "15px",
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {item.name}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {item.locationName}
                </Typography>
                <Typography variant="body2" sx={{ color: "#ccc", marginBottom: "20px" }}>
                  {item.location}
                </Typography>

                {title === "Destinations" && (
                <Typography variant="body2" sx={{ color: "#ccc", marginBottom: "15px" }}>
                    {item.district} District
                </Typography>

                )}

                <Button
                variant="contained"
                sx={{
                    backgroundColor: "#075a48", // Dark green color
                    color: "#fff",
                    width: "110px", // Reduced width
                    borderRadius: "20px", // Rounded corners for a modern look
                    textTransform: "capitalize", // To make the text look cleaner
                    fontWeight: "bold", // Bold text
                    fontSize: "13px", // Slightly smaller font
                    padding: "6px 8px", // Adjust padding for a compact look
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
                    marginBottom: "10px",
                    "&:hover": { 
                    backgroundColor: "#093f34", // Slightly darker green on hover
                    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)", // Enhanced shadow on hover
                    },
                }}
                >
                View More
                </Button>

              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "#ccc",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "20px",
            borderRadius: "10px",
            width: "95%",
          }}
        >
          This category currently has no advertisements.
        </Typography>
      )}
      {data.length > 0 && (
        <Button
        variant="outlined"
        sx={{
            display: "block",
            marginTop: "40px",
            width: "30%",
            textAlign: "center",
            padding: "12px 20px", // Added padding for better spacing
            fontWeight: "bold",
            color: "#fff",
            borderColor: "rgb(6, 97, 88)", // Dark green border
            backgroundColor: "rgb(6, 57, 52)", // Dark green background
            borderRadius: "8px", // Rounded corners
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow effect
            "&:hover": {
            backgroundColor: "rgba(6, 57, 52, 0.422)", // Lighter green on hover
            borderColor: "rgb(6, 97, 88)",
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)", // Deeper shadow on hover
            },
            transition: "background-color 0.3s, border-color 0.3s, box-shadow 0.3s", // Smooth transition for shadow and colors
        }}
        >
        View All
        </Button>


      )}
    </Box>
  );
  

export default HomePage;