import React, { useState, useEffect } from "react";

import { IoIosTime } from "react-icons/io";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import Nav from "../Nav/Nav";
import axios from "axios";
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
import { useLocation } from "react-router-dom";

function Packagedata() {
  AOS.init({ duration: 1000 });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  console.log(id);

  const [partners, setPartners] = useState([]);
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    async function getPartners() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/package/"
        );
        setPartners(res.data);
        setLoding(false);
      } catch (error) {
        console.error("Error fetching partners:", error);
        setLoding(false);
        alert("Error fetching partners: " + error.message);
      }
    }
    getPartners();
  }, []);

  const [locationname, setlocationname] = useState([]);
  const [background, setbackground] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://holidaysri-backend-9xm4.onrender.com/location/get/${id}`
        );
        setbackground(response.data.location.backgroundImage);
        console.log(background);
        setlocationname(response.data.location.locationName);
      } catch (error) {
        console.error("Error fetching location:", error);
        alert("Error fetching location: " + error.message);
      }
    };
    fetchData();
  }, [id]);
  return (
    <>
      <Nav />
      <Grid
        container
        sx={{
          backgroundImage:
          'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733336447/pexels-photo-1072179_frjk63_js026i.webp")',
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          minHeight: "100vh",
          paddingBottom: "16px",
        }}
      >
        <section className="package" id="package" data-aos="fade">
          <Box marginBottom="0px" marginTop={{lg:"-12px",xs:'24px'}} marginLeft={{lg:"32px",xs:"8px"}}>
            <a href={`/destination/${id}`} style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  borderRadius: "30px",
                }}
              >
                Back
              </Button>{" "}
            </a>
          </Box>
          <div className="container">
            <Grid
              sx={{
                marginBottom: "24px",
                marginTop: { lg: "30px", xs: "20px" },
              }}
            >
              <h2 className="h2 section-title"> Packages in {locationname} </h2>
            </Grid>

            <ul className="package-list">
              {loading ? (
                <>
                  <CircularProgress
                    sx={{ color: "green", marginTop: "16px" }}
                  />
                </>
              ) : (
                <>
                  {partners.some(
                    (partner) => partner.location === locationname
                  ) ? (
                    partners.map((partner, index) => {
                      if (partner.location === locationname) {
                        return (
                          <li data-aos="slide-up">
                            <div className="package-card">
                              <figure className="card-banner">
                                <img
                                  src={partner.images}
                                  alt="reg"
                                  loading="lazy"
                                />
                              </figure>
                              <div className="card-content">
                                <h3 className="h3 card-title">
                                  {partner.packageName} 
                                </h3>
                                <p className="card-text">
                                  {partner.description}
                                </p>
                                <p className="card-text">
                                  {partner.activities}
                                </p>
                                <ul className="card-meta-list">
                                  <li className="card-meta-item">
                                    <div className="meta-box">
                                      <ion-icon>
                                        <BsFillPeopleFill />
                                      </ion-icon>
                                      <p className="text">{partner.category}</p>
                                    </div>
                                  </li>
                                  <li className="card-meta-item">
                                    <div className="meta-box">
                                      <ion-icon>
                                        <FaLocationDot />
                                      </ion-icon>
                                      <p className="text">{partner.location}</p>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div className="card-price">
                                <p className="price">{partner.price}</p>
                                <button className="btn btn-secondary">
                                  Book Now
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      }
                      return null;
                    })
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
                        <Typography>
                          Currently No Packages in {locationname}
                        </Typography>
                      </Card>
                    </Box>
                  )}
                </>
              )}
            </ul>
          </div>
        </section>
      </Grid>
    </>
  );
}

export default Packagedata;
