import React from 'react';
import "./travelPartnerHeader.css"
import { Grid, Box, Button, Typography, Modal } from "@mui/material";
import AdIcon from '@mui/icons-material/Campaign'; 
import { useNavigate } from 'react-router-dom';

function TravelPartnerHeader() {

  const navigate = useNavigate();

  const handleAddClick = () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'seller') {
      navigate('/foreign-dashboard');
    } else if (userRole === 'agent') {
      navigate('/local-dashboard');
    } else if (userRole === 'partner') {
      navigate('/Partner-Dashboard');
    }else {
      navigate('/prising');
    }
  };

  return (
    <section className="cta" id="contact">
      <div className="container">
        <div className="cta-content">
          <p className="section-subtitle">Travel Partner</p>
          <h2 className="h2 section-title">Find a perfect <span className="keywordcolor">Travel partner</span> for travel with.</h2>
          <p className="section-text">
          Easily find your desired partner to travel.
          </p>
        </div>
        <a href='/all-partners'>
        <button className="btn btn-secondary">Find More</button></a>
      </div>
      <div className='vbodyconntent'>
        
        <div className='tpboxess'>
          <div className='tpboxesimg tpboxesimg1'></div>
          <h3>Local Travel Partner</h3>
          <a className='vexbtn' href='/partner-section?subrole=Local%20Partner'>Explore</a>
        </div>

        <div className='tpboxess'>
          <div className='tpboxesimg tpboxesimg2'></div>
          <h3>Foreign Travel Partner</h3>
          <a className='vexbtn' href='/partner-section?subrole=Foreign%20Partner'>Explore</a>
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

export default TravelPartnerHeader;

