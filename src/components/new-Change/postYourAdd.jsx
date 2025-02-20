import React, { useState } from "react";
import { Container, Typography, Grid, Card, CardActionArea, CardContent, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PostAdvertisement = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const navigate = useNavigate();

  const categoryPaths = {
    "🏨 Hotels & Accommodations Advertisement": "/HotelAddsPublish",
    "🍽️ Cafes & Restaurants Advertisement": "/#",
    "🥤 Foods & Beverages Advertisement": "/#",
    "🎢 Live Rides Advertisement": "/#",
    "🚗 Vehicle Rentals & Hire Services Advertisement": "/#",
    "✈️ Travel Agents ( Promo Code ) Advertisement": "/#",
    "🧑‍🤝‍🧑 Travel Budys Advertisement": "/#",
    "🗺️ Tour Guider Advertisement": "/#",
    "📌 Other Special Categories Advertisement - Select From Belove List 👇 ": "",
    "🌍 Foreign Tour Packages": "/#",
    "🏝️ Local Tour Packages": "/#",
    "🎭 Events Advertisement": "/#",
    "📦 Delivery Partners Advertisement": "/#",
    "❤️ Donations / Raise Your Fund": "/#",
    "🤝 Com.Partners & Partnerships": "/#",
  };

  const subcategoryPaths = {
    "🏠 Sell Your Property": "/#",
    "👨‍⚕️ Doctor Advertisement": "/#",
    "⚖️ Lawyer Advertisement": "/#",
    "📊 Advisor & Counselor Advertisement": "/#",
    "🏗️ Architect Advertisement": "/#",
    "🎭 Entertainer Advertisement": "/#",
    "🎉 Event Planner Advertisement": "/#",
    "📸 Photographer Advertisement": "/#",
    "❤️ Caregivers Advertisement": "/#",
    "🔮 Astrologists Advertisement": "/#",
    "🔧 Other Professionals & Services Advertisement": "/#",
    "💻 Technology Related Services Advertisement": "/#",
    "🐶 Pet Care & Services Advertisement": "/#",
    "🚑 Emergency Services Advertisement": "/#",
    "📚 Educational & Tutoring Services Advertisement": "/#",
    "🎁 Gift Packs Advertisement": "/#",
    "🗿 Souvenirs & Collectibles Advertisement": "/#",
    "📱 Other Accessories & Tech Gadgets Advertisement": "/#",
    "👗 Fashion & Clothing Items Advertisement": "/#",
    "🛒 Daily Grocery Essentials Advertisement": "/#",
    "🌿 Organic Herbal Products Advertisement": "/#",
    "🏕️ Rent a Land for Camping or Parking Advertisement": "/#",
    "💪 Fitness & Health (Gym, Spas, Yoga, etc.)": "/#",
    "💼 Job Opportunities Advertisement": "/#",
    "₿ Crypto Consulting & Signals": "/#",
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    if (category !== "📌 Other Special Categories Advertisement - Select From Belove List 👇 ") {
      navigate(categoryPaths[category]);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    navigate(subcategoryPaths[subcategory]);
  };

  return (
    <div style={{ padding: "10px 20px", margin: "0 auto", maxWidth: "100%", marginTop: "70px" }}>
    <Container
        sx={{
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark transparent background
            backdropFilter: "blur(10px)", // Blurred glass effect
            padding: "40px", // Ensures inner content has space
            borderRadius: "10px",
        }}
        >
      <Box sx={{ textAlign: "center", px: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "white" }}>
        📢 Post Your Advertisement
        </Typography>
        <Typography variant="body1" sx={{ color: "rgb(248, 239, 219)" }}>
        Select an Advertisement category or subcategory to post your advertisement. Make sure to choose the right one for better visibility and engagement!
    </Typography>

      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: "rgb(252, 249, 242)", mb: 1 }}>
            🎯 Select an Category
        </Typography>
        <Grid container spacing={2} justifyContent="center">
            {Object.keys(categoryPaths).map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                sx={{
                    backgroundColor: selectedCategory === category ? "rgb(236, 238, 131)" : "#f5f5f5",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": { backgroundColor: "#ffe082" },
                    height: 60, // Fixed height for uniform size
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onClick={() => handleCategoryClick(category)}
                >
                <CardActionArea sx={{ height: "100%" }}>
                    <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                    <Typography variant="body1" align="center">
                        {category}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
            </Grid>
            ))}
        </Grid>
        </Box>

      {selectedCategory === "📌 Other Special Categories Advertisement - Select From Belove List 👇 " && (
        <Box sx={{ mt: 4,textAlign: "center" }}>
          <Typography variant="h6" gutterBottom sx={{ color: "rgb(252, 249, 242)", mb: 2 }}>
            📂 Select a Subcategory
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {Object.keys(subcategoryPaths).map((subcategory, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    backgroundColor: selectedSubcategory === subcategory ? "#ffcc80" : "#e3f2fd",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": { backgroundColor: "#b3e5fc" },
                  }}
                  onClick={() => handleSubcategoryClick(subcategory)}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="body2" align="center">
                        {subcategory}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
    </div>
  );
};

export default PostAdvertisement;
