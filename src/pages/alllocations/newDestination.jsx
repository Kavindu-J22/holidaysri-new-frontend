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
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Favorite, Map, Save } from "@mui/icons-material";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Send as SendIcon } from '@mui/icons-material';
import { IoIosChatboxes } from "react-icons/io";
import { FaUsers } from "react-icons/fa";


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
  const [userRating, setUserRating] = useState(0);
  const [visibleComments, setVisibleComments] = useState(5);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/location/get/${id}`
        );
        setLocation(response.data.location);
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
      await axios.post(`http://localhost:8000/location/${id}/feedback`, {
        userEmail,
        comment: userComment,
      });
  
      alert("Comment added successfully!");
      setUserComment("");
  
      // Optionally, refresh the location data to show the updated comment section
      const response = await axios.get(`http://localhost:8000/location/get/${id}`);
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
      await axios.post(`http://localhost:8000/location/${id}/rating`, {
        userEmail,
        rating: userRating,
      });
  
      alert("Rating added successfully!");
      setUserRating(0);
  
      // Optionally, refresh the location data to show the updated ratings
      const response = await axios.get(`http://localhost:8000/location/get/${id}`);
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
        const response = await axios.get(`http://localhost:8000/allfavorite/user/${userEmail}`);
        const isFavorite = response.data.some(fav => fav.item === id && fav.category === "destination");

        if (isFavorite) {
            alert("This item is already in your favorites.");
            return;
        }

        // Add to favorites
        await axios.post("http://localhost:8000/allfavorite/add-favorite", {
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
        const response = await axios.get(`http://localhost:8000/saveList/user/${userEmail}`);
        const isSaved = response.data.some(save => save.itemId === id && save.category === "destination");

        if (isSaved) {
            alert("This location is already in your save List.");
            return;
        }

        // Save location
        await axios.post("http://localhost:8000/saveList/add-item", {
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
    "Tropical": "🌴",
    "Dry": "🌵",
    "Temperate": "🌳",
    "Continental": "🏞️",
    "Polar": "❄️",
    "Mediterranean": "🍇",
    "Arid": "🌵",
    "Humid Subtropical": "🌿",
    "Oceanic": "🌊",
  };

    // Handle show more functionality
    const handleShowMore = () => {
        setVisibleComments((prev) => prev + 10); // Load 10 more comments
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
    background: 'linear-gradient(to right, #ffffff, #f0f0f0)',
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
        backgroundColor: '#ffffff', 
        mx: 'auto', 
        mb: 3 
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
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
        {location.locationName}
        </Typography>
    </Box>

        {/* Location Info */}
        <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: '500', color: '#555', mb: 1 }}>
            <strong>Province:</strong> {location.province}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: '500', color: '#555', mb: 1 }}>
            <strong>District:</strong> {location.district}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: '500', color: '#555', mb: 1 }}>
            <strong>Distance from Colombo:</strong> {location.distanceFromColombo} KM
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: '500', color: '#555', mb: 1 }}>
            <strong>Climate:</strong> {location.climate} {climateEmojis[location.climate] || "🌍"}
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
        <Typography variant="body2" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, color: '#666', mb: 3 }}>
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


      <Box mb={2} sx={{ padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <Typography variant="h6" mb={1}>
          Average Rating: {calculateFinalRating()} / 5 ⭐
        </Typography>
        <Box sx={{ width: '100%', height: '150px' }}>
          <Bar
            data={{
              labels: ["1 ⭐", "2 ⭐", "3 ⭐", "4 ⭐", "5 ⭐"],
              datasets: [
                {
                  data: ratingsDistribution,
                  backgroundColor: [
                    "#ff6f61",
                    "#ffb74d",
                    "#ffd54f",
                    "#81c784",
                    "#64b5f6",
                  ],
                },
              ],
            }}
            options={{
              indexAxis: "y",
              plugins: {
                legend: { display: false },
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
            padding: { xs: 2, sm: 3 }, // Smaller padding on extra small screens
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
            boxShadow: 2,
            margin: { xs: '5px', sm: '10px' }, // Adjust margin for smaller screens
        }}
        >
        <Typography
        variant="h5"
        mb={2}
        sx={{
            fontWeight: 'bold',
            color: '#34495E',
            fontSize: { xs: '1rem', sm: '1.5rem' }, // Responsive font size
            display: 'flex',
            alignItems: 'center', // Align icon and text
        }}
        >
        <FaUsers sx={{ color: '#34495E', marginRight: '20px' }} />&nbsp;   
        User Feedbacks & Ratings
        </Typography>

        {feedbackWithRatings?.slice(0, visibleComments).map(({ userEmail, comment, rating }, idx) => (
            <Paper
            key={idx}
            style={{
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row', // For desktop
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
                <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                <strong>{userEmail}</strong>
                </Typography>
                <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginTop: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                >
                {comment || 'No comment provided'}
                </Typography>
                {rating ? (
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginTop: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                >
                    Rating: {rating} ⭐
                </Typography>
                ) : (
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginTop: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                >
                    Rating: Not provided
                </Typography>
                )}
            </Box>
            </Paper>
        ))}

        {/* Show More Button */}
        {feedbackWithRatings?.length > visibleComments && (
            <Button
            variant="outlined"
            color="primary"
            onClick={handleShowMore}
            sx={{
                mt: 2,
                fontSize: { xs: '0.6rem', sm: '0.7rem' }, // Responsive font size
                padding: { xs: '5px 10px', sm: '10px 20px' }, // Responsive padding
            }}
            >
            Show More
            </Button>
        )}
        </Box>


        <Box
            mt={4}
            sx={{
                padding: { xs: 2, sm: 3 }, // Responsive padding for smaller screens
                backgroundColor: '#f9f9f9',
                borderRadius: 2,
                boxShadow: 2,
            }}
            >
            <Typography
                variant="h5"
                mb={2}
                sx={{
                fontWeight: 'bold',
                color: '#34495E',
                fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Responsive font size
                }}
            >
                <IoIosChatboxes  sx={{ color: '#34495E', marginRight: '20px' }} />&nbsp;
                Add Your Feedback
                
            </Typography>

            <Paper
                sx={{
                padding: { xs: 2, sm: 3 }, // Responsive padding
                marginBottom: 2,
                backgroundColor: '#ffffff',
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
                    backgroundColor: '#f0f0f0',
                    padding: '10px',
                    fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                }}
                />

                {/* Rating Section with Star Icons */}
                <Typography
                variant="body1"
                sx={{
                    marginBottom: 2,
                    color: '#34495E',
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
                    variant="contained"
                    color="primary"
                    onClick={handleAddComment}
                    sx={{
                    padding: { xs: '10px', sm: '8px 20px' }, // Responsive padding
                    textTransform: 'none',
                    fontSize: { xs: '12px', sm: '12px' }, // Responsive font size
                    fontWeight: 'bold',
                    borderRadius: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    }}
                    endIcon={<SendIcon />}
                >
                    Submit Comment
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddRating}
                    sx={{
                    padding: { xs: '10px', sm: '8px 20px' }, // Responsive padding
                    textTransform: 'none',
                    fontSize: { xs: '12px', sm: '12px' }, // Responsive font size
                    fontWeight: 'bold',
                    borderRadius: '30px',
                    }}
                >
                    Submit Rating ⭐
                </Button>
                </Box>
            </Paper>
            </Box>

    </>
  ) : (
    <Typography variant="h5" textAlign="center">
      Loading destination details...
    </Typography>
  )}
</Box>

  );
};

export default DestinationDetailPage;
