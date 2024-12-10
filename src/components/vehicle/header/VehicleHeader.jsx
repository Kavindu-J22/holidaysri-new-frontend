import React, { useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "./vehicleHeader.css";
import Fevehicle from "../../vehicle/featured/FeaturedVehicle";
import { useNavigate } from 'react-router-dom';
import AdIcon from '@mui/icons-material/Campaign'; 
import { Grid, Box, Button, Typography, Modal } from "@mui/material";

function VehicleHeader() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Function to set the selected category
  const handleExplore = (category) => {
    setSelectedCategory(category);
  };

  const handlePostAdClick = () => {
    const userRole = localStorage.getItem('userRole'); // checking localStorage for userRole
    if (userRole === 'seller') {
      navigate('/foreign-dashboard'); // redirect to /foreign-dashboard if userRole is seller
    } else if (userRole === 'agent') {
      navigate('/local-dashboard'); // redirect to /local-dashboard if userRole is agent
    } else {
      navigate('/prising'); // redirect to /access if userRole is neither seller nor agent
    }
  };


  AOS.init({ duration: 1000 });
  return (
    <section className="cta" id="contact">
      <div className="container">
        <div className="cta-content">
          <p className="section-subtitle">Rent a vehicle</p>
          <h2 className="h2 section-title">
            Rent a <span className="keywordcolor">vehicle</span> for any adventure.
          </h2>
          <p className="section-text">
            Great deals at great prices, from the biggest car hire companies...
          </p>
        </div>
        <a href="/all-vehicles">
          <button className="btn btn-secondary">View More</button>
        </a>
      </div>

      <Fevehicle />

      <div className="vhbodyconntent">
        <div className="vhideboxes">
          <div className="vhimgpart vbg1"></div>
          <h3>Cars</h3>
          <Link
            to={`/all-vehicles-category?category=Car`}
            onClick={() => handleExplore("Car")}
            className="vhexbtn"
          >
            Explore
          </Link>
        </div>

        <div className="vhideboxes">
          <div className="vhimgpart vbg2"></div>
          <h3>Vans</h3>
          <Link
            to={`/all-vehicles-category?category=Van`}
            onClick={() => handleExplore("Van")}
            className="vhexbtn"
          >
            Explore
          </Link>
        </div>

        <div className="vhideboxes">
          <div className="vhimgpart vbg3"></div>
          <h3>SUV</h3>
          <Link
            to={`/all-vehicles-category?category=SUV`}
            onClick={() => handleExplore("SUV")}
            className="vhexbtn"
          >
            Explore
          </Link>
        </div>

        <div className="vhideboxes">
          <div className="vhimgpart vbg4"></div>
          <h3>Tuk Tuk</h3>
          <Link
            to={`/all-vehicles-category?category=Tuk Tuk`}
            onClick={() => handleExplore("Tuk Tuk")}
            className="vhexbtn"
          >
            Explore
          </Link>
        </div>

        <div className="vhideboxes">
          <div className="vhimgpart vbg5"></div>
          <h3>Scooters and Bikes</h3>
          <Link
            to={`/all-vehicles-category?category=Scooters and Bicks`}
            onClick={() => handleExplore("Scooters and Bicks")}
            className="vhexbtn"
          >
            Explore
          </Link>
        </div>
      </div>

      <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '55px', // Adjust spacing as needed
                marginBottom: '25px',
              }}
            >
                  <Button
            variant="contained"
            startIcon={<AdIcon />}
            onClick={handlePostAdClick}
            sx={{
              backgroundColor: '#065a60',
              color: '#fff',
              padding: '12px 24px', // Increase padding (top/bottom, left/right)
              borderRadius: '12px', // Increase border radius
              fontSize: '12px', // Optional: increase font size
              '&:hover': {
                backgroundColor: '#0a9396',
              },
            }}
        >
             Post Your Advertisement
            </Button>
      </Box>

      <div className="container liveridecont">
        <div className="cta-content">
          <p className="section-subtitle">Live Rides</p>
          <h2 className="h2 section-title">Join a <span className="keywordcolor">live ride</span> now.</h2>
          <p className="section-text">
            Great deals at great prices, from the biggest car hire companies...
          </p>
        </div>
        <div className="liveridebtnsset">
        <a href="/newliveride">
          <button className="btn btn-secondary">View Ride</button>
        </a>
        <a onClick={handlePostAdClick}>
          <button className="btn btn-secondary">Add Ride</button>
        </a>
        </div>
      </div>
    </section>
  );
}

export default VehicleHeader;
