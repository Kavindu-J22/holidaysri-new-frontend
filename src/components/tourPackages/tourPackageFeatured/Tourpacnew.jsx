import React, { useState, useEffect } from "react";
import img1 from '../../../assets/imgpcreg.jpg'
import img2 from '../../../assets/imgpcadv.jpg'
import img3 from '../../../assets/imgpcbch.jpg'
import { IoIosTime } from "react-icons/io";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import AOS from 'aos';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Box,
    Button,
    Typography,
    Card,
    CardContent,
    CircularProgress
  } from "@mui/material";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Slideshow from "../../../pages/Packages/Slideshow";
import AdIcon from '@mui/icons-material/Campaign'; 

function PackageSection() {
  AOS.init({ duration: 1000 });



  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPackages() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/package/"
        );
        // Only take the first three packages
        const firstThreePackages = res.data.slice(0, 2);
        setPackages(firstThreePackages);
        localStorage.setItem("Discount", 15);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setLoading(false);
        alert("Error fetching packages: " + error.message);
      }
    }

    getPackages();
  }, []);

  const handleBookNow = async (price, packageName) => {
    try {
      const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
      const id = '65f58296f707aa390b10db8a';
      
      // Fetch rates from the backend
      const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
      const rates = responseRates.data.rate;
  
      // Navigate to checkout page with the fetched rates and discount
      navigate('/checkout', { 
        state: { 
          discount: rates.packageDeductRate, 
          rate: price,
          path: '/all-packages',
          currency: 'USD',
          items: packageName,
          earns: rates.packageEarnRate,
        } 
      });
    } catch (error) {
      console.error('Error fetching rates or navigating to checkout:', error.message);
    }
  };

  const handleCustomizeWedding = () => {
    alert("This part is under construction right now");
  };



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
    <section className="package" id="package" >
      <div className="container">
        <p className="section-subtitle">Popular Packages</p>
        <h2 className="h2 section-title">Checkout Our <span className="keywordcolor">Packages</span></h2>
        <p className="section-text">
        Discover exclusive travel packages at Holidaysri, crafted to offer unique adventures and unforgettable experiences for every traveler.
        </p>
        

        <ul className="package-list">

                  {/* Static Card Section */}
        <Grid item xs={12} sx={{ marginTop: "40px" }}>
              
                <li data-aos="slide-up">
                  <div className="package-card" style={{ marginBottom: "40px" }}>
                    <Slideshow
                      images={[
                        "https://www.brides.com/thmb/Drx8BL_uJXvolhPv7k0yYVVUtA0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/guests-at-reception-toasting-logal-cole-photography-recirc-0923-60cb1c61779a48bc95dd61e42a5d2b06.jpg",
                        "https://hctg-images.imgix.net/images/venues/waiopai-gardens/20230822WaiopaiGardens03.jpg?auto=format%2Ccompress&fit=clamp&h=430&s=e02146a383afcea53ec784ef121fe619",
                        "https://cdn.speedsize.com/60594423-b60e-4dfc-bb30-f46193ea9dfc/https://www.wedgewoodweddings.com/hs-fs/hubfs/Tunnel-BeachWedding-PacificView.jpg?width=750&name=Tunnel-BeachWedding-PacificView.jpg/mxw_480,f_auto"
                      ]}
                      packages="This is a custom wedding package that includes a variety of services tailored for your special day."
                    />
                    <div className="card-content">
                      <h3 className="h3 card-title">Customize Wedding Package</h3>
                      <p className="card-text">This is a custom wedding package that includes a variety of services tailored for your special day.</p>
                      <p className="card-text">Activities: Venue decoration, Catering, Photography, and more.</p>
                      <ul className="card-meta-list">
                        <li className="card-meta-item">
                          <div className="meta-box">
                            <BsFillPeopleFill />
                            <p className="text">Wedding</p>
                          </div>
                        </li>
                        <li className="card-meta-item">
                          <div className="meta-box">
                            <FaLocationDot />
                            <p className="text">Your Chosen Venue</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="card-price">
                      <button
                        className="btn btn-secondary"
                        onClick={handleCustomizeWedding}
                      >
                        Customize Now
                      </button>
                    </div>
                  </div>
                </li>
              
            </Grid>
            
              {packages.length > 0 ? (
                packages.map((packages, index) => (
                  <li key={index} data-aos="slide-up">
                    <div className="package-card">
                      <Slideshow
                        images={packages.images}
                        packages={packages.description}
                      />

                      <div className="card-content">
                        <h3 className="h3 card-title">
                          {packages.packageName}
                        </h3>
                        <p className="card-text">{packages.description}</p>
                        <p className="card-text">{packages.activities}</p>
                        <ul className="card-meta-list">
                          <li className="card-meta-item">
                            <div className="meta-box">
                              <ion-icon>
                                <BsFillPeopleFill />
                              </ion-icon>
                              <p className="text">{packages.category}</p>
                            </div>
                          </li>
                          <li className="card-meta-item">
                            <div className="meta-box">
                              <ion-icon>
                                <FaLocationDot />
                              </ion-icon>
                              <p className="text">{packages.location}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="card-price">
                        <p className="price">${packages.price}</p>
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleBookNow(packages.price, packages.packageName)}
                          >
                            Book Now
                          </button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <>
                  <Grid item xs={12} lg={8}>
                    {loading ? (
                      <>
                        <CircularProgress sx={{ color: "green" }} />
                      </>
                    ) : (
                      <>
                        <Box
                          marginTop={{ lg: "20px", xs: "0px" }}
                          sx={{
                            marginLeft: { lg: "0%", sx: "0%" },
                            width: { lg: "auto", sx: "280px" },
                            transition: "transform 0.3s",
                            cursor: "default",
                          }}
                        >
                          <Card
                            sx={{
                              borderColor: "black",
                              borderRadius: "30px",
                              backgroundColor: "rgba(255,255,255, 0.3)",
                              padding: "32px",
                            }}
                            variant="outlined"
                          >
                            <Typography>Currently No Packages</Typography>
                          </Card>
                        </Box>
                      </>
                    )}
                  </Grid>
                </>
              )}
            </ul>


        <a href='/all-packages'>
        <button className="btn btn-primary">View All Packages</button>
        </a>
         
        <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '25px', // Adjust spacing as needed
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
    </section>
  );
}

export default PackageSection;
