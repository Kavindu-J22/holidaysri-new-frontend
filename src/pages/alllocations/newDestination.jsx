import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Paper,
  Avatar,
  Rating,
  Grid,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Favorite, Map, Save } from "@mui/icons-material";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Send as SendIcon } from '@mui/icons-material';
import { IoIosChatboxes } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaImages } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoDocuments } from "react-icons/io5";
import { Share as ShareIcon } from '@mui/icons-material';


const handleShare = (locationName, locationUrl) => {
  const shareData = {
    title: `Explore ${locationName}`,
    text: `Check out this amazing location: ${locationName}`,
    url: locationUrl, // Ensure you pass a valid URL
  };

  if (navigator.share) {
    // Use Web Share API if available
    navigator
      .share(shareData)
      .then(() => console.log('Location shared successfully!'))
      .catch((error) => console.error('Error sharing location:', error));
  } else {
    // Fallback: Copy URL to clipboard
    navigator.clipboard.writeText(locationUrl).then(() => {
      alert('Link copied to clipboard! Share it with your friends.');
    });
  }
};

const generateColorFromEmail = (email) => {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `#${((hash >> 24) & 0xFF).toString(16).padStart(2, '0')}${((hash >> 16) & 0xFF).toString(16).padStart(2, '0')}${((hash >> 8) & 0xFF).toString(16).padStart(2, '0')}`;
    return color;
  };

const ImageSlider = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setFade(false); // Start fading out
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
          setFade(true); // Start fading in
        }, 300); // Wait for fade-out effect to complete (500ms)
      }, 4000); // Change image every 3.5 seconds
  
      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [images]);
  
    // Handle next image
    const handleNextImage = () => {
      if (images.length > 0) {
        setFade(false); // Start fading out
        setTimeout(() => {
          setCurrentImageIndex((prev) => (prev + 1) % images.length);
          setFade(true); // Start fading in
        }, 500);
      }
    };
  
    // Handle previous image
    const handlePrevImage = () => {
      if (images.length > 0) {
        setFade(false); // Start fading out
        setTimeout(() => {
          setCurrentImageIndex(
            (prev) => (prev - 1 + images.length) % images.length
          );
          setFade(true); // Start fading in
        }, 500);
      }
    };
  
    return (
        <Box position="relative" mb={3} textAlign="center">
        <div
            style={{
            width: "100%",
            height: "500px", 
            objectFit: "cover",
            position: "relative",
            overflow: "hidden",
            margin: "0 auto", 
            borderRadius: "10px",
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
                transition: "opacity 0.5s ease-in-out",
                opacity: fade ? 1 : 0,
            }}
            />
        </div>
  
        {/* Navigation buttons */}
        <IconButton
          onClick={handlePrevImage}
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            backgroundColor: "#ffffff88",
          }}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          onClick={handleNextImage}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            backgroundColor: "#ffffff88",
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    );
  };

const DestinationDetailPage = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [userComment, setUserComment] = useState("");
  const [currrentDistrict, setCurrrentDistrict] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [alluserRatings, setAlluserRatings] = useState(0);
  const [visibleComments, setVisibleComments] = useState(5);
  const navigate = useNavigate();
  const locationUrl = id
  ? `https://holidaysri.com/destination/${encodeURIComponent(id.replace(/\s+/g, '-').toLowerCase())}`
  : 'https://holidaysri.com/destinations'; // Fallback to a default value


  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `https://holidaysri-backend.onrender.com/location/get/${id}`
        );
        setLocation(response.data.location);
        setCurrrentDistrict(response.data.location.district);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocation();
  }, [id]);

  const calculateFinalRating = () => {
    if (!location?.ratings || location.ratings.length === 0) return 0;

    const totalRatings = location.ratings.length;
    const weightedSum = location.ratings.reduce(
      (sum, { rating }) => sum + rating,
      0
    );
    return (weightedSum / totalRatings).toFixed(1);
  };

    // useEffect to update the state with totalRatings only once
  useEffect(() => {
    if (location?.ratings) {
      const totalRatings = location.ratings.length;
      setAlluserRatings(totalRatings);  // Update totalRatings only when location.ratings changes
    }
  }, [location?.ratings]);

  
  const handleAddComment = async () => {
    const userEmail = localStorage.getItem("userEmail");
  
    if (!userEmail) {
      // If no userEmail in localStorage, prompt user to log in
      alert("You must be logged in to add a comment.");
      // Optionally, redirect to the login page
      // window.location.href = "/login";
      return;
    }
  
    if (!userComment.trim()) {
      // Check if the comment is empty or contains only whitespace
      alert("Please write something before submitting the comment.");
      return;
    }
  
    try {
      // Post the new comment
      await axios.post(`https://holidaysri-backend.onrender.com/location/${id}/feedback`, {
        userEmail,
        comment: userComment,
      });
  
      alert("Comment added successfully!");
      setUserComment("");
  
      // Optionally, refresh the location data to show the updated comment section
      const response = await axios.get(`https://holidaysri-backend.onrender.com/location/get/${id}`);
      setLocation(response.data.location);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  

  const handleAddRating = async () => {
    const userEmail = localStorage.getItem("userEmail");
  
    if (!userEmail) {
      // If no userEmail in localStorage, prompt user to log in
      alert("You must be logged in to add a rating.");
      // Optionally, redirect to the login page
      // window.location.href = "/login";
      return;
    }
  
    if (!userRating || userRating === 0) {
      // Check if userRating is 0 or undefined
      alert("Please provide a valid rating before submitting.");
      return;
    }
  
    try {
      // Check if the user has already rated
      const hasRated = location.ratings.some(
        (rating) => rating.userEmail === userEmail
      );
  
      if (hasRated) {
        alert("You have already rated this location!");
        return;
      }
  
      // Proceed to add the rating if the user hasn't rated yet
      await axios.post(`https://holidaysri-backend.onrender.com/location/${id}/rating`, {
        userEmail,
        rating: userRating,
      });
  
      alert("Rating added successfully!");
      setUserRating(0);
  
      // Optionally, refresh the location data to show the updated ratings
      const response = await axios.get(`https://holidaysri-backend.onrender.com/location/get/${id}`);
      setLocation(response.data.location);
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };
  
  
  

  const ratingsDistribution = [1, 2, 3, 4, 5].map(
    (star) =>
      location?.ratings?.filter((r) => r.rating === star).length || 0
  );

  const feedbackWithRatings = location?.feedback?.map((feedback) => ({
    ...feedback,
    rating: location.ratings?.find((r) => r.userEmail === feedback.userEmail)
      ?.rating,
  }));

  const handleFavorite = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
        alert("Please log in first to add this to your favorites.");
        return;
    }

    try {
        // Check if the item is already in favorites
        const response = await axios.get(`https://holidaysri-backend.onrender.com/allfavorite/user/${userEmail}`);
        const isFavorite = response.data.some(fav => fav.item === id && fav.category === "destination");

        if (isFavorite) {
            alert("This item is already in your favorites.");
            return;
        }

        // Add to favorites
        await axios.post("https://holidaysri-backend.onrender.com/allfavorite/add-favorite", {
            email: userEmail,
            category: "destination",
            item: id,
        });

        alert("Added to favorites successfully!");
    } catch (error) {
        console.error("Error adding to favorites:", error);
        alert("An error occurred while adding to favorites.");
    }
};

const handleSavelocation = async (locationName) => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
        alert("Please log in first to save this location.");
        return;
    }

    try {
        // Check if the item is already in the save list
        const response = await axios.get(`https://holidaysri-backend.onrender.com/saveList/user/${userEmail}`);
        const isSaved = response.data.some(save => save.itemId === id && save.category === "destination");

        if (isSaved) {
            alert("This location is already in your save List.");
            return;
        }

        // Save location
        await axios.post("https://holidaysri-backend.onrender.com/saveList/add-item", {
            email: userEmail,
            itemId: id,
            category: "destination",
            itemName: locationName, // Use the passed locationName
            url: `/destination/${id}`,
        });

        alert("Location added to your Save List successfully!");
    } catch (error) {
        console.error("Error saving location:", error);
        alert("An error occurred while saving the location.");
    }
};


  const handleMapRedirect = () => {
    // Logic to redirect to the map URL
    window.open(location.map, "_blank");
  };

  const climateEmojis = {
    "Dry zone": "🌵(hot temperatures)",
    "Intermediate zone": "🍃(moderately cool)",
    "Montane zone": "🥶(Cool to cold)",
    "Semi-Arid zone": "🌾(arid & dry)",
    "Oceanic zone": "🌊(Moderate & sea experience)",
    "Tropical Wet zone": "🌴(Warm & humidity)",
    "Tropical Submontane": "🌿(Moderately warm)",
    "Tropical Dry Zone":"🍂(high temperatures)",
    "Tropical Monsoon Climate": "🌧️(Warm & rainy)",
    "Tropical Savanna Climate": "🌞(wet and dry)",
  };

    // Handle show more functionality
    const handleShowMore = () => {
        setVisibleComments((prev) => prev + 10); // Load 10 more comments
      };

    const renderStars = (rating) => {
        const filledStars = '⭐'.repeat(Math.floor(rating)); // Filled stars
        const emptyStars = '☆'.repeat(5 - Math.floor(rating)); // Empty stars
        return filledStars + emptyStars;
      };


      const categories = [
        { label: 'Hotels & Accommodations', icon: '🏨', path: `Hotels/${currrentDistrict}` },
        { label: 'Cafes & Restaurants', icon: '☕', path: `restaurants/${currrentDistrict}` },
        { label: 'Foods & Beverages', icon: '🍽️', path: `Foods/${currrentDistrict}` },
        { label: 'Live Rides Updates', icon: '🎢', path: `liveRides/${currrentDistrict}` },
        { label: 'Vehicle Rentals & Hire Services', icon: '🚗', path: `Vehicles/${currrentDistrict}` },
        { label: 'Travel Budys', icon: '🧑‍🤝‍🧑', path: `travelBudys/${currrentDistrict}` },
        { label: 'Tour Guiders', icon: '👨‍🏫', path: `Guiders/${currrentDistrict}` },
        { label: 'Tour Packages', icon: '📦', path: `Packages/${currrentDistrict}` },
        { label: 'Events Updates', icon: '🎉', path: `Events/${currrentDistrict}` },
        { label: 'Delivery Partners', icon: '🚚', path: `Delivery/${currrentDistrict}` },
        { label: 'Fitness & Health', icon: '💪', path: `Fitness/${currrentDistrict}` },
        { label: 'Help & donate civilians', icon: '💰', path: `Donations/${currrentDistrict}` },
      ];

      const handleGoogleSearch = (type, locationName) => {
        const query = `${locationName} Sri Lanka`;
        const url =
          type === 'images'
            ? `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`
            : `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(url, '_blank');
      };

      const formatNumber = (number) => {
        if (number >= 1000000) {
          return (number / 1000000).toFixed(1) + 'M'; // Format as millions
        } else if (number >= 1000) {
          return (number / 1000).toFixed(1) + 'K'; // Format as thousands
        }
        return number; // Return the number as is if less than 1000
      };

  return (
<Box
  style={{
    padding: '10px',
    marginTop: '70px',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '15px',
    maxWidth: '100%',
    background: 'linear-gradient(to right,rgba(27, 26, 26, 0.61),rgb(41, 39, 39))',
    backdropFilter: 'blur(10px)',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    borderRadius: '10px',
  }}
>
  {location ? (
    <>
    <Box>
        <div style={{ width: "100%", height: "500px", marginBottom: "20px" }}>
            <ImageSlider images={location.images} />
        </div>
    </Box>

    <Box sx={{ 
        padding: { xs: 2, sm: 3 }, 
        borderRadius: 2, 
        boxShadow: 3, 
        background: 'linear-gradient(135deg, rgba(248, 246, 246, 0.94) 0%, rgba(220, 220, 220, 0.74) 100%)', 
        mx: 'auto', 
        mb: 2 
        }}>
    {/* Location Name with Circle and Background Image */}
    <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 2, 
        flexDirection: { xs: 'column', sm: 'row' },
        textAlign: { xs: 'center', sm: 'left' }
    }}>
        <Box
        sx={{
            width: { xs: 50, sm: 50 },
            height: { xs: 50, sm: 50 },
            borderRadius: '50%',
            backgroundImage: `url(${location.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginRight: { sm: 2 },
            boxShadow: 2,
            mb: 1,
        }}
        />

      <Box sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack items on smaller screens, row layout on desktop
        textAlign: { xs: 'center', sm: 'left' }, // Center text on smaller screens
        justifyContent: { xs: 'center', sm: 'space-between' }, // Space items evenly in desktop mode
      }}>

      <Box sx={{   
        pb:1,
      }}>

        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333',pb: 0.2 }}>
        {location.locationName}
        </Typography>
        <Typography sx={{ fontSize: '10px', color: 'rgba(97, 98, 100, 0.94)' }}>
        {location.locationType}
        </Typography>

        </Box>

      {/* Share Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          fontSize: { xs: '0.7rem', sm: '0.8rem' }, // Smaller text size
          padding: { xs: '5px 12px', sm: '6px 15px' }, // Smaller padding for compact look
          borderRadius: '16px', // Slightly reduced border radius
          textTransform: 'none',
          background: 'rgb(19, 61, 85)',
          display: 'flex',
          alignItems: 'center',
          marginLeft: { xs: 0, md: '15px' }, // Margin-left only for desktop mode (md and up)
          '&:hover': {
              backgroundColor: 'rgb(41, 82, 105)', // Darker purple on hover
          }
        }}
        startIcon={
          <ShareIcon
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' }, // Adjust icon size
            }}
          />
        }
        onClick={() => handleShare(location.locationName, locationUrl)} // Pass location details to handleShare
      >
        Share
      </Button>

      </Box>

    </Box>

        {/* Location Info */}
        <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: '500', color: '#555', mb: 1 }}>
            <strong>Province :</strong> {location.province}, Sri lanka
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: '500', color: '#555', mb: 1 }}>
            <strong>District :</strong> {location.district} district
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: '500', color: '#555', mb: 1 }}>
            <strong>Distance from Colombo :</strong> {location.distanceFromColombo} KM <span style={{ color: 'rgba(55, 77, 119, 0.77)', fontSize: '10px' }}>(approx)</span>
            </Typography>
            <Typography 
            variant="body1" 
            sx={{ 
                fontSize: { xs: '0.9rem', sm: '1rem' }, 
                fontWeight: '500', 
                color: '#555', 
                mb: 1 
            }}
        >
            <strong>Climate :</strong> 
            <span>{location.climate}</span>&nbsp;
            <span style={{ color: 'rgba(55, 77, 119, 0.77)', fontSize: '10px' }}>{climateEmojis[location.climate] || "🌍"}</span>
        </Typography>
        </Box>

      {/* Action Buttons (Save & Favorite) */}
      <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between', 
            mb: 3, 
            gap: 2 
        }}>
            <Button
            variant="outlined"
            color="error"
            sx={{
                fontSize: { xs: 10, sm: 12 }, 
                padding: '8px 20px', 
                borderRadius: '20px', 
                textTransform: 'none'
            }}
            startIcon={<Favorite />}
            onClick={handleFavorite}
            >
            Add to Favorites
            </Button>
            <Button
                variant="contained"
                color="success"
                sx={{
                    fontSize: { xs: 10, sm: 12 },
                    padding: '8px 20px',
                    borderRadius: '20px',
                    background: 'rgb(12, 109, 64)',
                    textTransform: 'none',
                }}
                startIcon={<Save />}
                onClick={() => handleSavelocation(location.locationName)} // Pass locationName dynamically
            >
                Save Location
            </Button>
        </Box>

        {/* Location Description */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            Description
        </Typography>
        <Typography 
            variant="body2" 
            sx={{ 
                fontSize: { xs: '0.9rem', sm: '1rem' }, 
                color: '#666', 
                mb: 3, 
                display: 'flex', 
                justifyContent: 'space-between', // Adjust alignment
                textAlign: 'justify', // Justify the text
                lineHeight: 1.5 // Optional, to ensure readability
            }}
        >
            {location.details}
        </Typography>

        {/* Location Map with Redirect Button */}
        {location.map && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Button
                variant="contained"
                color="primary"
                sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' },
                borderRadius: '20px',
                padding: '8px 20px',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                }}
                onClick={handleMapRedirect}
                startIcon={<Map />}
            >
                View on Map
            </Button>
            </Box>
        )}
        </Box>


        <Box mb={2} sx={{ 
          padding: '16px', 
          background: 'linear-gradient(135deg,rgba(247, 249, 252, 0.19) 0%,rgba(228, 235, 245, 0.3) 100%)', 
          borderRadius: '12px', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', 
          overflow: 'hidden'
      }}>
      <Typography
        variant="h6"
        mb={1}
        sx={{
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'left',
        }}
      >
        Average Rating: {calculateFinalRating()} / 5 ⭐
      </Typography>

      <Typography
        mb={2}
        sx={{
          color: 'rgba(236, 230, 230, 0.74)',
          textAlign: 'left',
          fontSize: '10px',
        }}
      >
        {formatNumber(alluserRatings)} Unique Ratings
      </Typography>
        <Box sx={{ width: '100%', height: '170px', display: 'flex', justifyContent: 'center' }}>
          <Bar
            data={{
              labels: ["1 ⭐", "2 ⭐", "3 ⭐", "4 ⭐", "5 ⭐"],
              datasets: [
                {
                  data: ratingsDistribution,
                  backgroundColor: [
                    "#ff4b5c",  // Professional Red
                    "#ffa41b",  // Vibrant Orange
                    "#ffeb3b",  // Bright Yellow
                    "#4caf50",  // Standard Green
                    "#2196f3",  // Classic Blue
                  ],
                  borderColor: [
                    "#cc3a47",
                    "#cc8314",
                    "#ccb32a",
                    "#3b8c3a",
                    "#1b7ac4",
                  ],
                  borderWidth: 1,
                  borderRadius: 5,
                  hoverBackgroundColor: [
                    "#ff6b7a",
                    "#ffbf47",
                    "#fff176",
                    "#6fbf73",
                    "#64b5f6",
                  ],
                },
              ],
            }}
            options={{
              indexAxis: "y",
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: '#333',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  ticks: {
                    color: '#fff',
                  },
                  grid: {
                    color: 'rgba(0, 0, 0, 0)',
                  },
                },
                y: {
                  ticks: {
                    color: '#fff',
                  },
                  grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                  },
                },
              },
              elements: {
                bar: {
                  borderSkipped: false,
                  shadowOffsetX: 2,
                  shadowOffsetY: 2,
                  shadowBlur: 5,
                  shadowColor: 'rgba(0, 0, 0, 0.2)',
                },
              },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
            padding: { xs: 2, sm: 3 }, // Smaller padding on extra small screens
            backgroundColor: 'rgba(252, 253, 255, 0.24)',
            borderRadius: 2,
            boxShadow: 2,
        }}
        >
      <Typography
      variant="h5"
      mb={2}
      sx={{
        fontWeight: 'bold',
        color: '#fff',
        fontSize: { xs: '1rem', sm: '1.5rem' }, // Responsive font size
        display: 'flex',
        alignItems: 'center', // Align icon and text
      }}
    >
      <FaUsers sx={{ color: '#34495E', marginRight: '20px' }} />&nbsp;
      Reviews & Ratings
      <span
        style={{
          fontSize: '0.9rem', // Smaller font size for comments count
          color: 'rgba(236, 230, 230, 0.74)', // Change color for comment count
          marginLeft: '8px',
        }}
      >
        ( {formatNumber(feedbackWithRatings?.length)} Reviews )
      </span>
    </Typography>

      {feedbackWithRatings?.slice(0, visibleComments).map(({ userEmail, comment, rating }, idx) => (
        <Paper
          key={idx}
          style={{
            padding: '10px',
            marginBottom: '5px',
            background: 'linear-gradient(135deg, rgb(53, 51, 51) 0%, rgb(26, 25, 25) 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row', // For desktop
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
            border: '1px solid rgba(255, 255, 255, 0.3)', // Light border for definition
          }}
        >

            {/* Email Avatar with Deterministic Background and First Letter */}
            <Avatar
                sx={{
                backgroundColor: generateColorFromEmail(userEmail),
                width: { xs: 25, sm: 30 }, // Responsive size
                height: { xs: 25, sm: 30 },
                marginRight: { xs: 2, sm: 3 },
                }}
            >
                {userEmail?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, color: 'rgba(255, 255, 255, 0.59)' }}>
                <strong>{userEmail}</strong>
                </Typography>
                <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginTop: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: 'rgba(255, 255, 255, 0.59)', textAlign: 'justify', marginRight: '10px' }}
                >
                {comment || 'No comment provided'}
                </Typography>
                
                {rating ? (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginTop: 1, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
                >
                  {renderStars(rating)}
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginTop: 1, fontSize: { xs: '0.5rem', sm: '0.7rem' }, color: 'rgba(255, 255, 255, 0.59)' }}
                >
                  Rating Not provided
                </Typography>
              )}
            </Box>
            </Paper>
        ))}

        {/* Show More Button */}
        {feedbackWithRatings?.length > visibleComments && (
          <Button
            variant="contained"
            onClick={handleShowMore}
            sx={{
              mt: 2,
              fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Responsive font size
              padding: { xs: '6px 12px', sm: '10px 15px' }, // Responsive padding
              background: 'rgb(18, 78, 50)', // Gradient background
              color: '#fff', // White text
              borderRadius: '8px', // Rounded corners
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Subtle shadow
              textTransform: 'none', // Normal case text
              '&:hover': {
                background: 'rgb(14, 61, 45)', // Hover gradient
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)', // Increased shadow on hover
              },
              '&:active': {
                boxShadow: 'inset 0 3px 10px rgba(0, 0, 0, 0.3)', // Inner shadow on click
              },
            }}
          >
            Show More
          </Button>

        )}
        </Box>


        <Box
            mt={2}
            sx={{
                padding: { xs: 2, sm: 3 }, // Responsive padding for smaller screens
                background: 'rgba(248, 246, 246, 0.29)',
                borderRadius: 2,
                boxShadow: 2,
            }}
            >
            <Typography
                variant="h5"
                mb={2}
                sx={{
                fontWeight: 'bold',
                color: '#fff',
                fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Responsive font size
                }}
            >
                <IoIosChatboxes  sx={{ color: '#fff', marginRight: '20px' }} />&nbsp;
                Add Your Review
                
            </Typography>

            <Paper
                sx={{
                padding: { xs: 2, sm: 3 }, // Responsive padding
                marginBottom: 2,
                background: 'linear-gradient(135deg, rgb(53, 51, 51) 0%, rgb(26, 25, 25) 100%)',
                borderRadius: 2,
                }}
            >
                {/* Comment Section */}
                <TextField
                label=".✒️ Write Your Comment here.."
                fullWidth
                multiline
                rows={3}
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                sx={{
                    marginBottom: '16px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(240, 239, 239, 0.48)',
                    padding: '10px',
                    fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                }}
                />

                {/* Rating Section with Star Icons */}
                <Typography
                variant="body1"
                sx={{
                    marginBottom: 2,
                    color: 'rgba(236, 227, 200, 0.95)',
                    fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                }}
                >
                Rate This Location:
                </Typography>
                <Rating
                  name="rating"
                  value={userRating}
                  onChange={(e, newValue) => setUserRating(newValue)}
                  sx={{
                      marginBottom: 2,
                      fontSize: { xs: '2rem', sm: '2.2rem' }, // Responsive size for Rating
                      '& .MuiRating-icon': {
                          color: 'rgba(243, 198, 64, 0.95)', // Color for filled stars
                      },
                      '& .MuiRating-iconEmpty': {
                          color: 'rgba(241, 220, 157, 0.73)', // Color for empty stars (border)
                      },
                  }}
                  size="large"
              />


                <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on small screens
                    gap: 2, // Add spacing between buttons
                    justifyContent: 'space-between',
                }}
                >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleAddRating}
                sx={{
                  padding: { xs: '8px', sm: '8px 20px' }, // Responsive padding
                  textTransform: 'none',
                  fontSize: { xs: '12px', sm: '12px' }, // Responsive font size
                  fontWeight: 'bold',
                  borderRadius: '30px',
                  backgroundColor: 'rgba(128, 0, 128, 0.27)', // Purple transparency
                  border: '2px solid rgba(128, 5, 128, 0.66)', // Purple border
                  color: '#fff', // Purple text color
                  '&:hover': {
                    backgroundColor: 'rgba(128, 0, 128, 0.58)', // Darker purple on hover
                  }
                }}
              >
                Submit Rating ⭐
              </Button>

              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddComment}
                sx={{
                  padding: { xs: '8px', sm: '8px 20px' }, // Responsive padding
                  textTransform: 'none',
                  fontSize: { xs: '12px', sm: '12px' }, // Responsive font size
                  fontWeight: 'bold',
                  borderRadius: '30px',
                  backgroundColor: 'rgba(0, 132, 255, 0.25)', // Blue transparency
                  border: '2px solid rgba(0, 132, 255, 0.25)', // Blue border
                  color: '#fff', // Blue text color
                  '&:hover': {
                    backgroundColor: 'rgba(0, 132, 255, 0.45)', // Darker blue on hover
                  }
                }}
                endIcon={<SendIcon />}
              >
                Submit Comment
              </Button>

                </Box>
            </Paper>
            </Box>

       <Box
      sx={{
        padding: '20px',
        borderRadius: '5px',
        background: 'linear-gradient(135deg, rgba(247, 240, 227, 0.92) 0%, rgba(220, 220, 220, 0.69) 100%)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        marginTop: '20px',
        paddingTop: '25px',
      }}
    >
    {/* Title Section */}
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', mb: 3 }}>
      <Typography variant="h5" fontWeight="bold"  sx={{ fontSize: '1.2rem', mr: 1 }}>
         🐾
        </Typography>
        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { sm: '1rem' }, color: 'rgb(54, 63, 80)' }}>
          Discover {location.locationName} by Category :
        </Typography>
      </Box>

      {/* Categories Grid */}
      <Grid container spacing={2}>
        {categories.map((category, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate(`/${category.path}`)}
              sx={{
                background: 'linear-gradient(135deg,rgb(27, 46, 46) 0%,rgb(39, 59, 95) 100%)',
                color: '#fff',
                padding: '15px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                textTransform: 'none',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgb(39, 59, 95) 0%, rgb(27, 46, 46) 100%)',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Box sx={{ marginRight: '10px', fontSize: '1.5rem' }}>
                {category.icon}
              </Box>
              {category.label}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Descriptive Text Section */}
      <Typography
        variant="body1"
        mt={4}
        color="textSecondary"
        sx={{
          fontSize: { xs: '0.875rem', sm: '1rem' },
          textAlign: 'justify', // Align text to justify
          lineHeight: 1.6, // Enhance readability
        }}
      >
        Discover a variety of exciting options in <strong>{location.locationName}</strong>. 
        Use the <strong>Side menu</strong> to explore unique categories such as professionals like 
        <strong> Doctors</strong> and <strong>Lawyers</strong>. Don't miss out to check 
        <strong style={{ color: 'rgb(40, 12, 59)' }}> Other Special Categories</strong>, It's including exclusive gift packs, 
        stylish fashion items, <strong>Emergency Services</strong> and much more. Utilize the filter or search options to easily find your ideal results and uncover 
        the hidden gems of {location.locationName}.
        <br />
        <br />
        <strong>
        Also, If you have any <strong style={{ color: 'rgb(40, 12, 59)' }}>questions or Help or more information</strong> about {location.locationName}, simply <strong style={{ color: 'rgb(40, 12, 59)' }}>click the ? icon</strong>  in the bottom-right corner. Our support agent will assist you and address all your queries promptly. have a Great Journy !
        </strong> 
      </Typography>


      {/* Additional Buttons Section */}
      <Box mt={4}>
        <Button
          variant="contained" // Changed to 'contained' for a filled background
          color="primary"
          fullWidth
          onClick={() => handleGoogleSearch('images', location.locationName)}
          sx={{
            marginBottom: '10px',
            textTransform: 'none',
            fontSize: '1rem',
            padding: '10px',
            borderRadius: '50px',
            background: 'rgb(8, 104, 110)', // Gradient background for the button
            color: '#fff',
            '&:hover': {
              background: 'rgb(19, 89, 94)',
            },
          }}
        >
          <FaImages style={{ marginRight: '10px', fontSize: '1.2rem' }} />
          View More Images of {location.locationName} in Google
          <FcGoogle style={{ marginLeft: '10px', fontSize: '1.2rem' }} />
        </Button>
        <Button
          variant="contained" // Changed to 'contained' for a filled background
          color="secondary"
          fullWidth
          onClick={() => handleGoogleSearch('info', location.locationName)}
          sx={{
            textTransform: 'none',
            fontSize: '1rem',
            padding: '10px',
            borderRadius: '50px',
            background: 'rgb(143, 34, 79)', // Gradient background for the button
            color: '#fff',
            '&:hover': {
              background: 'rgb(117, 28, 63)',
            },
          }}
        >
          <IoDocuments style={{ marginRight: '10px', fontSize: '1.2rem' }} />
          Know More About {location.locationName} in Google
          <FcGoogle style={{ marginLeft: '10px', fontSize: '1.2rem' }} />
        </Button>
      </Box>

    </Box>

    </>
  ) : (
    <Typography
      variant="h5"
      textAlign="center"
      sx={{
        color: '#fff', // Set text color to white
        fontStyle: 'italic', // Make the text italic
      }}
    >
      Loading destination details...
    </Typography>
  )}
</Box>

  );
};

export default DestinationDetailPage;
