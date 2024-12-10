import React from 'react';
import { Grid, Box, Button, Typography, Modal } from "@mui/material";
import AdIcon from '@mui/icons-material/Campaign'; 
import { useNavigate } from 'react-router-dom';

function TourGuideHeader() {
  const navigate = useNavigate();

  const handleAddClick = () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'seller') {
      navigate('/foreign-dashboard');
    } else if (userRole === 'agent') {
      navigate('/local-dashboard');
    } else if (userRole === 'guide') {
      navigate('/Guider-Dashboard');
    }else {
      navigate('/prising');
    }
  };

  return (
    <section className="cta" id="contact">
      <div className="container">
        <div className="cta-content">
          <p className="section-subtitle">Tour Guid</p>
          <h2 className="h2 section-title">Find the best <span className="keywordcolor">tour guide</span>.</h2>
          <p className="section-text">
            Find the best ever tour guide for your travel experince.
          </p>
        </div>
        <a href="/all-tourguides">
          <button className="btn btn-secondary">Find More</button>
        </a>
      </div>
      <div className="vhbodyconntent">
        <div class="about__image about__image-1" id="about">
          <img
            src="https://www.xola.com/wp-content/uploads/2023/10/happy-tour-guide.png"
            alt="about"
          />
        </div>

        <div class="about__content">
          <h3 class="section__subheader__g">GET STARTED</h3>
          <h2 class="section__header__g">What level of hiker are you?</h2>
          <p class="section__header__pg">
            Whether you're a novice seeking scenic strolls or an experienced
            trekker craving challenging ascents, we've curated a diverse range
            of trails to cater to every adventurer. Uncover your hiking
            identity, explore tailored recommendations, and embrace the great
            outdoors with a newfound understanding of your capabilities.
          </p>
          
          <Box
              sx={{
                display: 'flex',
                justifyContent: 'left',
                marginTop: '35px', // Adjust spacing as needed
                marginLeft: '5px',
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

        </div>
      </div>
    </section>
  );
}

export default TourGuideHeader;

