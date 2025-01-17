import React, { useEffect, useState } from "react";
import { Box, TextField, MenuItem, Select, FormControl, InputLabel, Button, Grid, Typography } from "@mui/material";
import Banner from "./Banner";
import axios from "axios";
import { Flex } from "antd";
import ExploreIcon from "@mui/icons-material/Explore";

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true);
      }, 500);
    }, 3500);

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <img
        src={images[currentImageIndex]}
        alt={`Location Image ${currentImageIndex + 1}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          transition: "opacity 0.5s ease-in-out",
          opacity: fade ? 1 : 0,
        }}
      />
    </div>
  );
};

// Mapping of climates with relevant emojis
const climateEmojis = {
  "Dry zone": "🌵",
  "Intermediate zone": "🍃",
  "Montane zone": "🥶",
  "Semi-Arid zone": "🌾",
  "Oceanic zone": "🌊",
  "Tropical Wet zone": "🌴",
  "Tropical Submontane": "🌿",
  "Tropical Dry Zone":"🍂",
  "Tropical Monsoon Climate": "🌧️",
  "Tropical Savanna Climate": "🌞",
};

const ExploreDestinations = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [climate, setClimate] = useState("");
  const [showMore, setShowMore] = useState({});
  const [displayCount, setDisplayCount] = useState(9);

  const districtMapping = {
    "Western Province": ["Colombo", "Gampaha", "Kalutara"],
    "Central Province": ["Kandy", "Matale", "Nuwara Eliya"],
    "Southern Province": ["Galle", "Matara", "Hambantota"],
    "Northern Province": ["Jaffna", "Mannar", "Vavuniya", "Kilinochchi", "Mullaitivu"],
    "Eastern Province": ["Batticaloa", "Ampara", "Trincomalee"],
    "North Western Province": ["Kurunegala", "Puttalam"],
    "North Central Province": ["Anuradhapura", "Polonnaruwa"],
    "Uva Province": ["Badulla", "Monaragala"],
    "Sabaragamuwa Province": ["Kegalle", "Ratnapura"],
  };

  useEffect(() => {
    async function getAllLocations() {
      try {
        const res = await axios.get("http://localhost:8000/location/");
        setLocations(res.data);
        setFilteredLocations(res.data);
      } catch (error) {
        console.error("Error fetching Locations:", error);
        alert("Error fetching Locations: " + error.message);
      }
    }
    getAllLocations();
  }, []);

  useEffect(() => {
    // Modified filtering logic to include locationType in the search criteria
    const filtered = locations.filter((location) => {
      return (
        (location.locationName.toLowerCase().includes(searchTerm.toLowerCase()) || // Check if searchTerm matches locationName
         location.locationType?.toLowerCase().includes(searchTerm.toLowerCase())) && // Check if searchTerm matches locationType (NEW)
        (province === "" || location.province === province) &&
        (district === "" || location.district === district) &&
        (climate === "" || location.climate === climate)
      );
    });
    setFilteredLocations(filtered);
  }, [searchTerm, province, district, climate, locations]);

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;

    const totalRatings = ratings.length;
    const weightedSum = ratings.reduce((sum, { rating }) => sum + rating, 0);

    return (weightedSum / totalRatings).toFixed(1);
  };

  const toggleShowMore = (id) => {
    setShowMore((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 9);
  };

  const displayedDistricts = province ? districtMapping[province] || [] : [];

  return (
    <div style={{ padding: "10px 20px", margin: "0 auto", maxWidth: "100%", marginTop: "70px" }}>
      <Box sx={{ display: { lg: "block", xs: "none" } }}>
        <Banner />
      </Box>

      <Box sx={{ display: { lg: "none", xs: "block" }, textAlign: "center", marginBottom: "20px" }}>
      <Typography
        variant="h4"
        color="#34495E"
        fontWeight="bold"
        sx={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Adds text shadow
          display: "flex",
          alignItems: "center", // Aligns icon and text vertically
          justifyContent: "center", // Centers the icon and text horizontally
        }}
      >
        <ExploreIcon sx={{ marginRight: "8px" }} /> {/* Icon with some spacing */}
        Explore Destinations
      </Typography>
    </Box>

    {/* Search and Filter Section */}
    <Grid
      container
      spacing={0}
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
        padding: "10px", // Adds 10px padding inside the container
        backgroundColor: "rgba(255, 255, 255, 0.24)", // Light background color for the section
        backdropFilter: "blur(10px)",
        borderRadius: "8px", // Optional: Adds rounded corners for a polished look
      }}
    >
    {/* Search by Location Name */}
    <Grid item xs={12} md={5}>
      <TextField
        label={`Search by Location Name or Type (Across ${locations.length} locations) 🔍`}
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.37)", // Light background for input fields
          borderRadius: "8px", // Rounded corners
          margin: "5px 0", // Adds space around the input field
        }}
      />
    </Grid>

    {/* Province Filter */}
    <Grid item xs={12} md={2}>
      <FormControl fullWidth>
        <InputLabel style={{ color: "#34495E" }}>Filter by Province</InputLabel> {/* Darker label color */}
        <Select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          label="Filter by Province"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.37)", // Light background for select dropdown
            borderRadius: "8px", // Rounded corners
            margin: "5px 0",
          }}
        >
          <MenuItem value="">All Provinces</MenuItem>
          {Object.keys(districtMapping).map((prov) => (
            <MenuItem key={prov} value={prov}>
              {prov}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    {/* District Filter */}
    <Grid item xs={12} md={2}>
      <FormControl fullWidth>
        <InputLabel style={{ color: "#34495E" }}>Filter by District</InputLabel> {/* Darker label color */}
        <Select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          label="Filter by District"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.37)", // Light background for select dropdown
            borderRadius: "8px", // Rounded corners
            margin: "5px 0",
          }}
        >
          <MenuItem value="">All Districts</MenuItem>
          {province
            ? displayedDistricts.map((dist) => (
                <MenuItem key={dist} value={dist}>
                  {dist}
                </MenuItem>
              ))
            : [].concat(...Object.values(districtMapping)).map((dist) => (
                <MenuItem key={dist} value={dist}>
                  {dist}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </Grid>

    {/* Climate Filter */}
    <Grid item xs={12} md={2}>
      <FormControl fullWidth>
        <InputLabel style={{ color: "#34495E" }}>Filter by Climate</InputLabel> {/* Darker label color */}
        <Select
          value={climate}
          onChange={(e) => setClimate(e.target.value)}
          label="Filter by Climate"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.37)", // Light background for select dropdown
            borderRadius: "8px", // Rounded corners
            margin: "5px 0",
          }}
        >
          <MenuItem value="">All Climates</MenuItem>
          {[
            "Dry zone",
            "Intermediate zone",
            "Montane zone",
            "Semi-Arid zone",
            "Oceanic zone",
            "Tropical Wet zone",
            "Tropical Submontane",
            "Tropical Dry Zone",
            "Tropical Monsoon Climate",
            "Tropical Savanna Climate",
          ].map((cli) => (
            <MenuItem key={cli} value={cli}>
              {climateEmojis[cli]} {cli}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  </Grid>


    {/* Location Cards Section */}
    <div
      style={{
        display: "grid",
        gap: "20px",
        padding: "20px",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        backgroundColor: "rgba(0, 0, 0, 0.48)",
        backdropFilter: "blur(10px)",
        marginTop: "10px",
        borderRadius: "10px",
        gridTemplateRows: "auto",
      }}
    >
    {/* Check if filteredLocations is empty */}
    {filteredLocations.length === 0 ? (
      <div
        style={{
          gridColumn: "span 100%",
          textAlign: "center",
          padding: "20px",
          backgroundColor: "rgba(248, 248, 248, 0.29)",
          backdropFilter: "blur(5px)",
          borderRadius: "10px",
          color: "rgb(39, 50, 82)",
        }}
      >
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
          No locations found <span role="img" aria-label="search">🔍</span>
        </h3>
        <p style={{ fontSize: "16px", color: "#444" }}>
          Try modifying your search or filters.
        </p>
      </div>
    ) : (
      filteredLocations.slice(0, displayCount).map((location) => (
        <div
          key={location._id}
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "rgba(250, 249, 249, 0.87)",
            backdropFilter: "blur(10px)",
            color: "#34495E",
            position: "relative",
          }}
        >
          <div style={{ width: "100%", height: "200px" }}>
            <ImageSlider images={location.images} />
          </div>
          <div style={{ padding: "10px" }}>

            <p style={{ margin: "5px 0 0 0", color: "rgb(156, 157, 160)", fontSize: "9px" }}>
              {location.locationType}
            </p>
            <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", fontWeight: "bold" }}>
              {location.locationName}
            </h3>
            
            <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
              <strong>Province:</strong> {location.province}
            </p>
            <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
              <strong>District:</strong> {location.district}
            </p>
            <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
              <strong>Climate:</strong> {location.climate}
            </p>
            <p style={{ margin: "10px 0", color: "#34495E" }}>
              {showMore[location._id]
                ? location.details
                : `${location.details.substring(0, 100)}...`}
              {showMore[location._id] && location.details.length > 100 && (
                <span>{location.details.substring(100, 150)}...</span>
              )}
              <button
                onClick={() => toggleShowMore(location._id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#2980b9",
                  cursor: "pointer",
                  marginBottom: "5px",
                  fontSize: "12px",
                }}
              >
                {showMore[location._id] ? "Show Less" : "Show More"}
              </button>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <span
                        key={index}
                        style={{
                          color:
                            index < calculateAverageRating(location.ratings)
                              ? "#f1c40f"
                              : "#bdc3c7",
                          fontSize: "16px",
                        }}
                      >
                        ★
                      </span>
                    ))}
                </div>
                <span style={{ marginLeft: "10px", fontWeight: "bold", color: "#34495E" }}>
                  {calculateAverageRating(location.ratings)} / 5
                </span>
              </div>
              <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#34495E", // Custom background color
                    color: "#fff", // Custom text color
                    '&:hover': {
                      backgroundColor: "rgba(32, 97, 86, 0.87)", // Color on hover
                    },
                  }}
                  size="small"
                  onClick={() => window.location.href = `/destination/${location._id}`}
                >
                  Explore More
              </Button>

            </div>
          </div>
        </div>
      ))
    )}
  </div>

      {/* Load More Button */}
      {displayCount < filteredLocations.length && (
        <Button
          variant="contained"
          color="secondary"
          sx={{
            backgroundColor: "rgba(65, 15, 53, 0.99)", // Custom background color
            color: "#fff", // Custom text color
            '&:hover': {
              backgroundColor: "rgba(82, 24, 68, 0.99)", // Hover color
            },
          }}
          onClick={handleLoadMore}
          style={{ margin: "20px auto", display: "block" }}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default ExploreDestinations;
