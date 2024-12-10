import React, { useState, useEffect } from "react";
import { IoIosTime } from "react-icons/io";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import Nav from "../Nav/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Slideshow from "./Slideshow";

function Allpackages() {
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
        setPackages(res.data);
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

  return (
    <>
      <Helmet>
        <title>All Packages</title>
      </Helmet>
      <Nav />
      <Grid
        container
        sx={{
          backgroundImage: `url(${"https://res.cloudinary.com/dqdcmluxj/image/upload/v1733351037/christoph-theisinger-9PPYa3LK6II-unsplash_frxn5m_irc9d3.webp"})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          minHeight: "100vh",
          paddingBottom: "16px",
          paddingTop: "50px",
        }}
      >
        <section className="package" id="package" data-aos="fade">
          <Box
            marginBottom="0px"
            marginTop={{ lg: "-60px", xs: "-100px" }}
            marginLeft="32px"
          >
            <Button onClick={() => window.history.back()} style={{ textDecoration: "none" }}
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                borderRadius: "30px",
              }}
            >
              Back
            </Button>
          </Box>
          <div className="container">
            <Grid
              sx={{
                marginBottom: "24px",
                marginTop: { lg: "-30px", xs: "-30px" },
              }}
            >
              <h2 className="h2 section-title">All Packages</h2>
            </Grid>

          {/* Static Card Section */}
            <Grid item xs={12} sx={{ marginTop: "40px" }}>
              <ul className="package-list">
                <li data-aos="slide-up">
                  <div className="package-card">
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
              </ul>
            </Grid>

            <ul className="package-list">
              {packages.length > 0 ? (
                packages.map((pkg, index) => (
                  <li key={index} data-aos="slide-up">
                    <div className="package-card">
                      <Slideshow
                        images={pkg.images}
                        packages={pkg.description}
                      />
                      <div className="card-content">
                        <h3 className="h3 card-title">
                          {pkg.packageName}
                        </h3>
                        <p className="card-text">{pkg.description}</p>
                        <p className="card-text">{pkg.activities}</p>
                        <ul className="card-meta-list">
                          <li className="card-meta-item">
                            <div className="meta-box">
                              <BsFillPeopleFill />
                              <p className="text">{pkg.category}</p>
                            </div>
                          </li>
                          <li className="card-meta-item">
                            <div className="meta-box">
                              <FaLocationDot />
                              <p className="text">{pkg.location}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="card-price">
                        <p className="price">$ {pkg.price}</p>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleBookNow(pkg.price, pkg.packageName)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <Grid item xs={12} lg={8}>
                  {loading ? (
                    <CircularProgress sx={{ color: "green" }} />
                  ) : (
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
                  )}
                </Grid>
              )}
            </ul>
          </div>
        </section>
      </Grid>
    </>
  );
}

export default Allpackages;
