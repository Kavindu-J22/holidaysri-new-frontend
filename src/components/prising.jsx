import React, { useEffect } from 'react'; 
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { CheckCircle, Star, LocalDining, DirectionsCar, Group, BusinessCenter, MonetizationOn, EmojiPeople } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Hsllogo.png';
import Bg from "../assets/prisingbg.jpg"

const pricingOptions = [
  {
    title: 'Become a User',
    price: 'Free',
    features: [
      { text: 'Find Anything in any Destination (Hotel, Packages, Events, Guiders, etc.)', icon: <Star /> },
      { text: 'Find Vehicles and Live Ride', icon: <DirectionsCar /> },
      { text: 'Find Foods, Gifts and Souvenirs', icon: <LocalDining /> },
      { text: 'And More...', icon: <EmojiPeople /> },
    ],
    testData: { type: 'user', description: 'As a User, unlock access to exclusive travel deals, hidden gems, and all the tools you need to plan unforgettable adventures!' },
  },
  {
    title: 'Become an Agent',
    price: '13,000 LKR / 100 USD (Agent Code)',
    features: [
      { text: 'Find Anything in any Destination (Hotel, Packages, Events, Guiders, etc.)', icon: <Star /> },
      { text: 'Find Vehicles and Live Ride', icon: <DirectionsCar /> },
      { text: 'Find Foods, Gifts and Souvenirs', icon: <LocalDining /> },
      { text: 'Buy Agent Code and Earn Money', icon: <MonetizationOn /> },
      { text: 'Post any advertisement (Payments Included)', icon: <BusinessCenter /> },
      { text: 'Get Exclusive Discounts', icon: <CheckCircle /> },
      { text: 'Unlock Agent Dashboard with More Features', icon: <Group /> },
      { text: 'And More...', icon: <EmojiPeople /> },
    ],
    testData: { type: 'agent', description: 'As an Agent, create custom journeys for clients, access top travel resources, and elevate every trip with insider expertise!' },
  },
  {
    title: 'Become an Advertiser',
    price: 'Free ( Registration )',
    features: [
      { text: 'Find Anything in any Destination (Hotel, Packages, Events, Guiders, etc.)', icon: <Star /> },
      { text: 'Find Vehicles and Live Ride', icon: <DirectionsCar /> },
      { text: 'Find Foods, Gifts and Souvenirs', icon: <LocalDining /> },
      { text: 'Post any advertisement (Payments Included)', icon: <BusinessCenter /> },
      { text: 'Get Exclusive Discounts', icon: <CheckCircle /> },
      { text: 'Unlock Advertiser Dashboard with More Features', icon: <Group /> },
      { text: 'And More...', icon: <EmojiPeople /> },
    ],
    testData: { type: 'advertiser', description: 'As an Advertiser, showcase your brand to a global travel audience, boost visibility, and connect with explorers ready to discover your offerings!' },
  },
  {
    title: 'Become a Guider',
    price: '5000 LKR',
    features: [
      { text: 'Find Anything in any Destination (Hotel, Packages, Events, Guiders, etc.)', icon: <Star /> },
      { text: 'Find Vehicles and Live Ride', icon: <DirectionsCar /> },
      { text: 'Find Foods, Gifts and Souvenirs', icon: <LocalDining /> },
      { text: 'Get Exclusive Discounts', icon: <CheckCircle /> },
      { text: 'Unlock Guider Dashboard with More Features', icon: <Group /> },
      { text: 'Make Your Own Guider Profile', icon: <EmojiPeople /> },
      { text: 'Advertise Your Own Guider Profile and Earn Money (Public)', icon: <BusinessCenter /> },
      { text: 'And More...', icon: <EmojiPeople /> },
    ],
    testData: { type: 'guider', description: 'As a Guide, lead travelers with local insights, share expert tips, and craft unique experiences that they’ll remember forever!' },
  },
  {
    title: 'Become a Travel Partner',
    price: '3500 LKR (Local) / 20 USD (Foreign)',
    features: [
      { text: 'Find Anything in any Destination (Hotel, Packages, Events, Guiders, etc.)', icon: <Star /> },
      { text: 'Find Vehicles and Live Ride', icon: <DirectionsCar /> },
      { text: 'Find Foods, Gifts and Souvenirs', icon: <LocalDining /> },
      { text: 'Get Exclusive Discounts', icon: <CheckCircle /> },
      { text: 'Unlock Travel Partner Dashboard with More Features', icon: <Group /> },
      { text: 'Make Your Own Travel Partner Profile', icon: <EmojiPeople /> },
      { text: 'Unlock All Travel Partners All Details', icon: <CheckCircle /> },
      { text: 'Meet and Chat with all other Travel Partners (Foreign and Local)', icon: <Group /> },
      { text: 'Advertise Your Own Travel Partner Profile and Earn Money (Public)', icon: <BusinessCenter /> },
      { text: 'And More...', icon: <EmojiPeople /> },
    ],
    testData: { type: 'travelPartner', description: 'As a Travel Partner, connect with fellow experts, access exclusive tools, and grow your business within a thriving travel network!' },
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on load
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  const handleSubscribe = (testData) => {
    navigate('/register', { state: testData });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ 
          padding: 4, 
          backgroundImage: `url(${Bg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat', 
          paddingTop: '85px',
          minHeight: '100vh', 
          color: '#fff', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          '@media (max-width:600px)': { // Mobile styles 
              backgroundAttachment: 'fixed', // Optional: Makes background scroll with content
          }
      }}>
      <Box sx={{ mb: 4 }}>
        <img src={logo} alt="Logo" style={{ width: '100px' }} />
      </Box>
      <Typography variant="h4" fontWeight="600" align="center" gutterBottom>
        Choose Your Plan
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4, maxWidth: 600 }}>
        Subscribe to our services and gain access to exclusive features tailored for your travel needs. Choose the plan that best suits you!
      </Typography>
      <Button 
        variant="outlined" 
        onClick={handleBack} 
        sx={{ 
            mb: 4, 
            borderRadius: '20px', 
            borderColor: '#00ffd9', // Outline color
            color: '#00ffd9', // Text color
            '&:hover': {
            backgroundColor: '#00ffd9', // Background color on hover
            color: '#000', // Text color on hover
            }
        }}
        >
        Back
        </Button>

      <Grid container spacing={4} justifyContent="center">
        {pricingOptions.map((option, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              variant="outlined" 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                backdropFilter: 'blur(10px)', 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                borderRadius: '20px', 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', 
                border: '1px solid rgba(255, 255, 255, 0.3)', 
                height: '100%', 
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h4" color="#Fff" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                  {option.title}
                </Typography>
                <Typography variant="h5" color="#00ffd9" sx={{ mb: 2, fontWeight: 'bold' }}>
                  {option.price}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {option.features.map((feature, i) => (
                    <Typography key={i} color="#e8ebce" variant="body2" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', mb: 1 }}>
                      {feature.icon}
                      <span style={{ marginLeft: '8px' }}>{feature.text}</span>
                    </Typography>
                  ))}
                </Box>
              </CardContent>
              <Button 
                variant="contained" 
                sx={{
                  color: '#333',
                  fontWeight: '600', 
                  backgroundColor: '#00ffd9', 
                  '&:hover': {
                    backgroundColor: '#00dab5',
                  },
                  borderRadius: '20px',
                  margin: '16px', // Add margin for better spacing
                }} 
                size="large" 
                onClick={() => handleSubscribe(option.testData)}
              >
                Subscribe
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ 
        marginTop: 4, 
        padding: 2, 
        backgroundColor: '#2d2d2dd2', 
        borderRadius: '10px', 
        textAlign: 'center',
        width: '100%',
        maxWidth: 600,
      }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Already have an account? 
        </Typography>
        <Button 
        variant="outlined" 
        onClick={handleLogin} 
        sx={{ 
            borderRadius: '20px', 
            borderColor: '#00ffd9', // Outline color
            color: '#00ffd9', // Text color
            '&:hover': {
            backgroundColor: '#00ffd9', // Background color on hover
            color: '#000', // Text color on hover
            }
        }}
        >
        Login Here
        </Button>

      </Box>
    </Box>
  );
};

export default Pricing;
