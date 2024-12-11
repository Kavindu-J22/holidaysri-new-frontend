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
import { useNavigate } from "react-router-dom";
import { LocationOn, Hotel, DirectionsCar, Route as RouteIcon, LocalOffer, Event, AccessTime, Email, Work, Person, MyLocation, Category } from '@mui/icons-material';
import { FaSignInAlt } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { MdDashboardCustomize } from "react-icons/md";

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
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching data from all the APIs
    fetchData("https://holidaysri-backend-9xm4.onrender.com/location/").then(
      (data) =>setDestinations(data.reverse()) // No reverse here for Destinations
    );
    fetchData("https://holidaysri-backend-9xm4.onrender.com/hotel/").then(
      (data) => setHotels(data.reverse()) // Reverse the data here
    );
    fetchData("https://holidaysri-backend-9xm4.onrender.com/package/").then(
      (data) => setPackages(data.reverse()) // Reverse the data here
    );
    fetchData("https://holidaysri-backend-9xm4.onrender.com/vehicle/").then(
      (data) => setVehicles(data.reverse()) // Reverse the data here
    );
    fetchData("https://holidaysri-backend-9xm4.onrender.com/realTime/").then(
      (data) => setLiveRides(data.reverse()) // Reverse the data here
    );
    fetchData(
      "https://holidaysri-backend-9xm4.onrender.com/localPackage/"
    ).then((data) => setLocalPackages(data.reverse())); // Reverse the data here
    fetchData("https://holidaysri-backend-9xm4.onrender.com/event/").then(
      (data) => setEvents(data.reverse()) // Reverse the data here
    );
    fetchData(
      "https://holidaysri-backend-9xm4.onrender.com/api/agent/allAgentProfiles"
    ).then((data) => setAgents(data.reverse())); // Reverse the data here
    fetchData(
      "https://holidaysri-backend-9xm4.onrender.com/api/guide/allGuideProfiles"
    ).then((data) => setGuiders(data.reverse())); // Reverse the data here
    fetchData(
      "https://holidaysri-backend-9xm4.onrender.com/api/partner/allPartnerProfiles"
    ).then((data) => setPartners(data.reverse())); // Reverse the data here
    fetchData("https://holidaysri-backend-9xm4.onrender.com/product/").then(
      (data) => setAdvertisements(data.reverse()) // Reverse the data here
    );
  }, []);
  
  const filteredData = (data) => {
    return data
      .filter(
        (item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.locationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.district?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.hotelName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.vehicleNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.CurrentLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.Route?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.packageName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .reverse(); // Reverse the filtered data to maintain the last-to-first order
  };

  const AnimatedLogo = () => {
    return (
      <Box
        sx={{
          width: "100px",  // Adjust logo size
          height: "100px",  // Adjust logo size
          backgroundImage: "url('https://res.cloudinary.com/dqdcmluxj/image/upload/v1733868433/Hsllogo_dfvrap.png')",  // Replace with your logo path
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          animation: "upDown 2s ease-in-out infinite",
          marginBottom: "20px",
        }}
      />
    );
  };

  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");

  const handleProfileClick = () => {
    const role = localStorage.getItem("userRole");

    if (role === "admin") {
        window.location.href = "/admin";
    } else if (role === "seller") {
        window.location.href = "/foreign-dashboard";
    } else if (role === "agent") {
        window.location.href = "/local-dashboard";
    } else if (role === "guide") {
        window.location.href = "/Guider-Dashboard";
    }else if (role === "partner") {
        window.location.href = "/Partner-Dashboard";
    } else {
        window.location.href = "/MainuserDashboard";
    }
};

const images = [
  {
    src: "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733936634/Green_and_Yellow_Illustration_Minimalist_Travel_Agency_Facebook_Cover_1_wdgc4e.webp",
    title: "Beautiful Beach 🏝️",
    description: "Experience the serene beauty of sandy beaches and crystal-clear waters.",
  },
  {
    src: "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733936634/Colorful_Travel_Agency_Facebook_Cover_lnx2ax.webp",
    title: "Majestic Mountains 🏕️",
    description: "Explore breathtaking mountain ranges and connect with nature.",
  },
  {
    src: "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733936633/Peach_Travel_Facebook_Cover_b8oqdm.webp",
    title: "Historic Landmarks 🏯",
    description: "Discover the rich history and culture of iconic landmarks.",
  },
  {
    src: "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733936633/Ginger_Sunny_Just_Living_Photo_Collage_Facebook_Cover_pailhl.webp",
    title: "Vibrant Cityscapes 🌇",
    description: "Enjoy the energy and excitement of bustling cities around the world.",
  },
  {
    src: "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733936634/Yellow_And_White_Illustrated_Time_To_Travel_Facebook_Cover_vjptif.webp",
    title: "Tranquil Forests 🍃",
    description: "Immerse yourself in the calm and tranquility of lush green forests.",
  },
  {
    src: "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733936633/Blue_Creative_Photocentric_Travel_Facebook_Cover_jas9fd.webp",
    title: "Exotic Islands 🪸",
    description: "Relax and rejuvenate on the most stunning islands on the planet.",
  },
];

const [currentIndex, setCurrentIndex] = useState(0);

// Auto-advance the slider
useEffect(() => {
  const interval = setInterval(() => {
    handleNext();
  }, 3000); // Change slide every 3 seconds
  return () => clearInterval(interval);
}, [currentIndex]);

const handleNext = () => {
  setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
};

const handlePrevious = () => {
  setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
};
  
  return (
    <Box sx={{ paddingTop: "70px", paddingLeft: "20px", paddingRight: "20px", paddingBottom: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        minHeight: "100vh",
        color: "white",
     }}>

<Box
      sx={{
        paddingTop: '50px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        height: "auto",
        color: 'white',
        textAlign: 'center',
        borderRadius: '20px',
        marginBottom: '20px',
        '@media (max-width: 600px)': {
          paddingTop: '35px',
          paddingLeft: '10px',
          paddingRight: '10px',
          maxHeight: 'unset',
          borderRadius: '10px',
          minHeight: '40vh',
          height: "auto"
        },
      }}
    >
      {/* Welcome Section */}
      <Box
      sx={{
        marginBottom: '20px',
        maxHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 600px)': {
          maxHeight: 'unset',
          marginBottom: '10px',
        },
      }}
    >
      <AnimatedLogo />
      <Typography variant="h4" sx={{ marginBottom: '5px', fontSize: { xs: '1.5rem', sm: '2rem' }, fontWeight: "600", }}>
        Welcome to Holidaysri..!
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: '30px',
          fontSize: { xs: '0.9rem', sm: '1rem' },
          fontStyle: 'italic',
          color: 'lightgray',
        }}
      >
        Discover amazing places, travel packages, and services. Let's plan your next adventure together!
      </Typography>


      {(!authToken && !userRole) || !userEmail ? (
        // Display Sign In and Sign Up Buttons for logged-out users
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginRight: '10px',
              backgroundColor: 'rgb(12, 74, 97)',
              '&:hover': { backgroundColor: 'rgb(18, 96, 124)' },
              fontSize: { xs: '0.8rem', sm: '1rem' },
            }}
            onClick={() => navigate('/signin')} // Navigate to Sign In page
          >
            Sign In &nbsp; <FaSignInAlt /> 
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              backgroundColor: 'rgb(19, 130, 138)',
              '&:hover': { backgroundColor: 'rgb(25, 160, 170)' },
              fontSize: { xs: '0.8rem', sm: '1rem' },
            }}
            onClick={() => navigate('/signup')} // Navigate to Sign Up page
          >
            Sign Up &nbsp; <GiArchiveRegister />
          </Button>
        </Box>
      ) : (
        // Display user-specific info when logged in
        <Box>
          <Typography variant="h5" sx={{ marginBottom: '10px', fontSize: { xs: '1.2rem', sm: '1.5rem' }, fontWeight: "600", paddingTop: "10px", }}>
            Hello.. {userEmail.split('@')[0]} 🖐️
          </Typography>

          <Typography variant="body2" sx={{ marginBottom: '30px', fontSize: { xs: '0.8rem', sm: '1rem' }, paddingLeft: "10px", paddingRight: "10px", color: 'lightgray', }}>
            Your personalized experience awaits. Manage your bookings, view your progress, and more!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: 'rgb(18, 104, 82)',
              '&:hover': { backgroundColor: 'rgb(18, 104, 72, 0.7)' },
              fontSize: { xs: '0.8rem', sm: '1rem' },
            }}
            onClick={() => navigate('/dashboard')} // Navigate to the dashboard page
          >
            Go to your Dashboard &nbsp; <MdDashboardCustomize />
          </Button>
        </Box>
      )}
    </Box>

    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px 0",
        textAlign: "center",
      }}
    >
      {/* Image Container */}
      <Box
  sx={{
    position: "relative",
    overflow: "hidden",
    borderRadius: "85px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  }}
>
  <Box
    sx={{
      display: "flex",
      transition: "transform 0.5s ease-in-out",
      transform: `translateX(-${currentIndex * 100}%)`,
      width: `${images.length * 100}%`,
    }}
  >
    {images.map((image, index) => (
      <Box
        key={index}
        sx={{
          flex: "0 0 100%",
          textAlign: "center",
          position: "relative", // Ensure overlay is on top of the image
        }}
      >
        {/* Dark Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.1)", // Dark overlay
            borderRadius: "80px", // Matching border radius of image
            zIndex: 1, // Ensure the overlay is above the image
          }}
        />
        
        <Box
          component="img"
          src={image.src}
          alt={image.title}
          sx={{
            width: { xs: "18%", md: "1000px" },
            height: { xs: "200px", md: "330px" },
            objectFit: "cover",
            borderRadius: "80px",
            zIndex: 0, // Ensure image stays behind overlay
          }}
        />
      </Box>
    ))}
  </Box>
</Box>


      {/* Text Content */}
      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {images[currentIndex].title}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "10px", color: "gray" }}>
          {images[currentIndex].description}
        </Typography>
      </Box>

      {/* Navigation Buttons */}
      <Button
        onClick={handlePrevious}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          "&:hover": { backgroundColor: "black" },
        }}
      >
        {"<"}
      </Button>
      <Button
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          "&:hover": { backgroundColor: "black" },
        }}
      >
        {">"}
      </Button>
    </Box>

</Box>
        
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
      <Section title="Destinations" icon={<LocationIcon />} data={filteredData(destinations)} />
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


const Section = ({ title, icon, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change the image every 3 seconds
  useEffect(() => {
    if (data[0]?.images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data[0].images.length); // Handle images in the first item
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [data]);

  return (
  
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
                  textAlign: "center",
                  overflow: "hidden",
                  position: "relative",
                  color: "#fff",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Image Slider */}
                <Box
                  sx={{
                    height: { xs: '100px', sm: '180px' },
                    background: `url(${item.images?.[currentIndex] || item.images?.[0] || 'https://res.cloudinary.com/dqdcmluxj/image/upload/v1733916761/pie-chart-svgrepo-com_azn0zv.svg'}) center/cover no-repeat`,
                    borderRadius: '8px',
                    marginBottom: '15px',
                    transition: 'background-image 0.5s ease-in-out', // Smooth transition for image change
                  }}
                />    

                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {item.name && <><LocationOn sx={{ marginRight: 1 }} />{item.name}</>}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {item.locationName && <><LocationOn sx={{ marginRight: 1 }} />{item.locationName}</>}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {item.hotelName && <><Hotel sx={{ marginRight: 1 }} />{item.hotelName}</>}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {item.packageName && <><LocalOffer sx={{ marginRight: 1 }} />{item.packageName}</>}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {item.vehicleNumber && <><DirectionsCar sx={{ marginRight: 1 }} />{item.vehicleNumber}</>}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {item.Route && <><RouteIcon sx={{ marginRight: 1 }} />{item.Route}</>}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {item.localPackageName && <><LocalOffer sx={{ marginRight: 1 }} />{item.localPackageName}</>}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {item.eventName && <><Event sx={{ marginRight: 1 }} />{item.eventName}</>}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {item.productName && <>{item.productName}</>}
                </Typography>

                <Typography variant="body2" sx={{ color: "#ccc", marginBottom: "10px" }}>
                  {item.eventLocation && <><LocationOn sx={{ marginRight: 1 }} />{item.eventLocation}</>}
                </Typography>

                <Typography variant="body2" sx={{ color: "#ccc", marginBottom: "10px" }}>
                  {item.date && <><AccessTime sx={{ marginRight: 1 }} />{item.date}</>}
                </Typography>

                <Typography variant="body2" sx={{ color: "#ccc", marginBottom: "10px" }}>
                  {item.subrole && <><Work sx={{ marginRight: 1 }} />{item.subrole}</>}
                </Typography>

                <Typography variant="body2" sx={{ color: "#ccc", marginBottom: "10px" }}>
                  {item.email && <><Email sx={{ marginRight: 1 }} />{item.email}</>}
                </Typography>

                <Typography variant="body2" sx={{ color: "#ccc", marginBottom: "10px" }}>
                  {item.experience && <><Work sx={{ marginRight: 1 }} />{item.experience}</>}
                </Typography>

                <Typography variant="body2" sx={{ color: "#ccc", marginBottom: "10px" }}>
                  {item.vehicleOwnerName && <><Person sx={{ marginRight: 1 }} />{item.vehicleOwnerName}</>}
                </Typography>

                <Typography variant="body2" sx={{ color: "#ccc", marginBottom: "10px" }}>
                  {item.CurrentLocation && <><MyLocation sx={{ marginRight: 1 }} />{item.CurrentLocation}</>}
                </Typography>

                <Typography variant="body2" sx={{ color: "#ccc", marginBottom: "10px" }}>
                  {item.location && <><LocationOn sx={{ marginRight: 1 }} />{item.location}</>}
                </Typography>

                <Typography variant="body2" sx={{ color: "#ccc", marginBottom: "10px" }}>
                  {item.category && <><Category sx={{ marginRight: 1 }} />{item.category}</>}
                </Typography>

                <Typography variant="body2" sx={{ color: "#ccc", marginBottom: "20px" }}>
                  {item.Vehiclecategory && <><Category sx={{ marginRight: 1 }} />{item.Vehiclecategory}</>}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "15px", marginTop: "10px", color: "#d3f4e7" }}>
                  {item.price ? (
                    title === "Tour Packages" ? (
                      `${item.price} USD`
                    ) : (
                      `${item.price} LKR`
                    )
                  ) : null}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "15px", marginTop: "10px", color: "#d3f4e7" }}>
                  {item.ticketPrice}
                </Typography>

                {title === "Destinations" && (
                <Typography variant="body2" sx={{ color: "#ccc", marginBottom: "15px" }}>
                    <MyLocation /> {item.district} District
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
          No Results founded at this moment..🛫
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
};
  

export default HomePage;