import React from "react";
import "./marketplaceheader.css";
import { Grid, Box, Button, Typography, Modal } from "@mui/material";
import AdIcon from '@mui/icons-material/Campaign'; 
import { useNavigate } from 'react-router-dom';

function MarketPlaceHeader() {
  const navigate = useNavigate();

  const handleAddClick = () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'seller') {
      navigate('/foreign-dashboard');
    } else if (userRole === 'agent') {
      navigate('/local-dashboard');
    } else {
      navigate('/prising');
    }
  };

  return (
    <section className="cta" id="contact">
      <div className="container">
        <div className="cta-content">
          <p className="section-subtitle">Foods, Gifts & Souvenirs</p>
          <h2 className="h2 section-title">
            Discover perfect <span className="keywordcolor">Foods, gifts & souvenirs</span>
          </h2>
          <p className="section-text">
            All in one place for your desired gift and souvenier items...
          </p>
        </div>
        <a href="/all-marcketplace">
          <button className="btn btn-secondary">View More</button>
        </a>
      </div>
      <div className="mktingconntent">
        <div className="mktingboxes">
          <div className="mkting mkting1"></div>
          <h3 className="mktfont">Gift Packages</h3>
          <a className="vhexbtn" href="/market-section?category=gift%20packs">
            Explore
          </a>
        </div>

        <div className="mktingboxes">
          <div className="mkting mkting2"></div>
          <h3 className="mktfont">Souvenirs</h3>
          <a className="vhexbtn" href="/market-section?category=souvenirs">
            Explore
          </a>
        </div>

        <div className="mktingboxes">
          <div className="mkting mkting3"></div>
          <h3 className="mktfont">Collectibles</h3>
          <a className="vhexbtn" href="/market-section?category=collectibles">
            Explore
          </a>
        </div>

        <div className="mktingboxes">
          <div className="mkting mkting4"></div>
          <h3 className="mktfont">Food</h3>
          <a className="vhexbtn" href="/allfoods">
            Explore
          </a>
        </div>
      </div>

      <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '55px', // Adjust spacing as needed
              }}
            >
                  <Button
            variant="contained"
            startIcon={<AdIcon />}
            onClick={handleAddClick}
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

    </section>
  );
}

export default MarketPlaceHeader;
