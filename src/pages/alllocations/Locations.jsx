import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField,Button } from "@mui/material";
import Banner from "./Banner";
import axios from "axios";
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";


const Locations = (props) => {
  const [location, setLocation] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  useEffect(() => {
    async function getAllLocations() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/location/"
        );
        setLocation(res.data);
      } catch (error) {
        console.error("Error fetching Locations:", error);
        alert("Error fetching Locations: " + error.message);
      }
    }
    getAllLocations();
  }, []);
  const filteredLocations = location.filter((location) =>
    location.locationName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
<div
  style={{
    paddingTop: "15px",
    paddingLeft: "30px",
    paddingRight: "30px",
    background: "none",
    minHeight: "100vh", // Corrected capitalization
    width: "100%", // Ensure full width
  }}
    >
      <Box sx={{display:{lg:'block',xs:'none'}}}>
      <Banner />
      </Box>

      <Box
  sx={{
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    margin: { lg: "20px", xs: "65px 5px" },
    padding: { lg: "24px", xs: "10px" },
    borderRadius: "20px",
  }}
>
  <TextField
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    variant="outlined"
    fullWidth
    placeholder="Search by Destination name"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon sx={{ color: "white" }} />
        </InputAdornment>
      ),
      sx: {
        color: "white",
        padding: { lg: "12px", xs: "8px" },
        width: "100%",
        "::placeholder": { color: "rgba(255, 255, 255, 0.7)", fontSize: { lg: "16px", xs: "14px" } },
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Subtle background for contrast
        borderRadius: "10px",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255, 255, 255, 0.4)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "limegreen",
        },
      },
    }}
    sx={{ marginBottom: 2 }}
  />
  
  <Grid container spacing={3}>
    {filteredLocations.map((location, index) => (
      <Grid item xs={12} sm={6} lg={3} key={location._id}>
        <Link
          to={`/destination/${location._id}`}
          style={{ textDecoration: "none" }}
        >
          <Box
            sx={{
              width: "100%",
              height: "250px",
              borderRadius: "20px",
              background: hoveredIndex === index
                ? "linear-gradient(135deg, #1f4037, #99f2c8)"
                : "linear-gradient(135deg, #16222a, #3a6073)",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
              transition: "all 0.4s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
              },
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <ImageSlider images={location.images} />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                textAlign: "center",
                color: "white",
                background: "rgba(0, 0, 0, 0.7)",
                p: 2,
                transition: "background 0.4s ease",
              }}
            >
              <Typography
                sx={{
                  fontSize: hoveredIndex === index ? { lg: "1.8rem", xs: "1rem" } : { lg: "1.6rem", xs: "0.9rem" },
                  fontWeight: "600",
                  fontFamily: "'Poppins', sans-serif",
                  transition: "font-size 0.4s ease",
                }}
              >
                {location.locationName}
              </Typography>
              <Typography
                sx={{
                  fontSize: hoveredIndex === index ? { lg: "1rem", xs: "0.8rem" } : { lg: "0.9rem", xs: "0.7rem" },
                  fontFamily: "'Poppins', sans-serif",
                  opacity: 0.8,
                  transition: "font-size 0.4s ease",
                }}
              >
                {location.district} District
              </Typography>
            </Box>
          </Box>
        </Link>
      </Grid>
    ))}
  </Grid>
</Box>


    </div>
  );
};

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true); // Start fade-in
      }, 500); // Sync with CSS transition duration
    }, 3500); // Image display time before changing

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={images[currentImageIndex]}
        alt={`Location Image ${currentImageIndex + 1}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          transition: "opacity 0.5s ease-in-out", // Smooth transition
          opacity: fade ? 1 : 0, // Controls fade-in and fade-out
        }}
      />
    </div>
  );
};

export default Locations;
