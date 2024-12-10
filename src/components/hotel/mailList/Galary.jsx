import React from 'react';
import img1 from '../../../assets/gimg1.jpg'
import img2 from '../../../assets/gimg2.jpg'
import img3 from '../../../assets/gimg3.jpg'
import img4 from '../../../assets/gimg4.jpg'
import img5 from '../../../assets/gimg5.jpg'
import AOS from 'aos';
import { Grid, Box, Button, Typography, Modal } from "@mui/material";
import AdIcon from '@mui/icons-material/Campaign'; 
import { useNavigate } from 'react-router-dom';

function GallerySection() {
  const navigate = useNavigate();

  const handleAddClick = () => {
    alert('This part is Under Development Rigt now..!');

  };

  AOS.init({ duration: 1000, once: false});
  return (
    <section className="gallery" id="gallery" >
      <div className="container">
        <p className="section-subtitle">Photo Gallery</p>
        <h2 className="h2 section-title"><span className="keywordcolor">Photos</span> From Travellers</h2>
        <p className="section-text">
        Browse our photo gallery showcasing vibrant moments and stunning landscapes captured by Holidaysri travelers on their unforgettable journeys.        </p>
        <ul className="gallery-list">
          <li className="gallery-item" >
            <figure className="gallery-image">
              <img src={img2} alt="Gallery image" />
            </figure>
          </li>
          <li className="gallery-item" >
            <figure className="gallery-image">
            <img src={img3} alt="Gallery image" />
            </figure>
          </li>
          <li className="gallery-item" >
            <figure className="gallery-image">
            <img src={img1} alt="Gallery image" />
            </figure>
          </li>
          <li className="gallery-item" >
            <figure className="gallery-image">
            <img src={img4} alt="Gallery image" />
            </figure>
          </li>
          <li className="gallery-item" >
            <figure className="gallery-image">
            <img src={img5} alt="Gallery image" />
            </figure>
          </li>
        </ul>
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
                  Post Your Photos
                </Button>
            </Box>

    </section>
  );
}

export default GallerySection;
