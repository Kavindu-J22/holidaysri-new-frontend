// Import necessary libraries
import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "../../../pages/Nav/Nav";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const AllHotels = () => {
  // State variables
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [background, setBackground] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch hotels data from the backend
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/hotel/"
        );
        setHotels(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        alert("Error fetching hotels: " + error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleOpen = (hotel) => {
    // Handle opening modal or any other action
  };

  const goBack = () => {
    navigate(-1); // Navigate back one step in history
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid
            container
            style={{
              backgroundImage: `url("${background}")`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              minHeight: "100vh",
              paddingBottom: "16px",
            }}
          >
            <Nav />
            <Box
              marginBottom="0px"
              marginTop={{ lg: "80px", xs: "90px" }}
              marginLeft="32px"
            >
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  borderRadius: "30px",
                }}
                onClick={goBack}
              >
                Back
              </Button>{" "}
            </Box>
            <Typography
              sx={{
                color: "white",
                fontFamily: "poppins",
                marginTop: { lg: "8px", xs: "30px" },
                fontSize: { lg: "50px", xs: "32px" },
                paddingLeft: { lg: "35%", xs: "32px" },
                paddingTop: { lg: "80px", xs: "-80px" },
              }}
            >
              <Helmet>
                <title>Hotels</title>
              </Helmet>
              All Hotels
            </Typography>
            <Grid
              marginTop="20px"
              padding={{ lg: "72px", xs: "16px" }}
              width={{ lg: "100%", xs: "100%" }}
            >
              <Box>
                <Grid
                  container
                  spacing={3}
                  style={{
                    transform: hoveredIndex !== null ? "translateY(-10px)" : "",
                    transition: "transform 0.3s",
                  }}
                >
                  {loading ? (
                    <CircularProgress sx={{ color: "green" }} />
                  ) : (
                    hotels.map((hotel) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={hotel._id}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Card
                          sx={{
                            borderColor: "black",
                            borderRadius: "30px",
                            backgroundColor: "rgba(255,255,255, 0.3)",
                            transition: "transform 0.3s",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                            height: "auto",
                            minHeight: "700px",
                            width: { lg: "400px", xs: "350px" },
                            overflow: "auto",
                          }}
                          variant="outlined"
                          onClick={() => handleOpen(hotel)}
                        >
                          <img
                            src={hotel.images}
                            alt="hotel"
                            style={{
                              width: "100%",
                              borderTopLeftRadius: "30px",
                              borderTopRightRadius: "30px",
                            }}
                          />
                          <CardContent>
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{ color: "white" }}
                            >
                              Name: {hotel.hotelName}
                            </Typography>
                            <Typography variant="body1" sx={{ color: "white" }}>
                              Category: {hotel.category}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "white" }}>
                              Location: {hotel.location}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "white" }}>
                              Price: {hotel.price}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "white" }}>
                              Contact Number: {hotel.contactNumber}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "white" }}>
                              Email: {hotel.email}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "white" }}>
                              Description: {hotel.description}
                            </Typography>
                            <Grid
                              container
                              spacing={2}
                              marginTop={{ lg: "16px", xs: "16px" }}
                            >
                              {(hotel.googleMap ||
                                hotel.webUrl ||
                                hotel.whatsappNumber ||
                                hotel.fb) && (
                                <>
                                  <Grid item xs={12}>
                                    <Typography
                                      variant="body2"
                                      sx={{ color: "white" }}
                                    >
                                      Explore and contact:
                                    </Typography>
                                  </Grid>
                                </>
                              )}
                              {hotel.googleMap && (
                                <>
                                  <Grid item xs={3}>
                                    <a
                                      href={hotel.googleMap}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        textDecoration: "none",
                                        color: "white",
                                      }}
                                    >
                                      <Box width={{ lg: "60px", xs: "70px" }}>
                                        <img
                                          src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337543/output-onlinegiftools_9_zciqfy_ei8c1p.gif"
                                          alt="google map"
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        />
                                      </Box>
                                    </a>
                                  </Grid>
                                </>
                              )}
                              {hotel.webUrl && (
                                <>
                                  <Grid item xs={3}>
                                    <a
                                      href={hotel.webUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        textDecoration: "none",
                                        color: "white",
                                      }}
                                    >
                                      <Box width={{ lg: "60px", xs: "70px" }}>
                                        <img
                                          src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337545/output-onlinegiftools_8_rtdbms_vmppge.gif"
                                          alt="web"
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        />
                                      </Box>
                                    </a>
                                  </Grid>{" "}
                                </>
                              )}
                              {hotel.whatsappNumber && (
                                <>
                                  <Grid item xs={3}>
                                    <a
                                      href={`https://wa.me/${hotel.whatsappNumber}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        textDecoration: "none",
                                        color: "white",
                                      }}
                                    >
                                      <Box width={{ lg: "50px", xs: "60px" }}>
                                        <img
                                          src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337538/whatsapp_vjbu3d_qbwzhv.webp"
                                          alt="whatsapp"
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        />
                                      </Box>
                                    </a>
                                  </Grid>
                                </>
                              )}
                              {hotel.fb && (
                                <>
                                  <Grid item xs={3}>
                                    <a
                                      href={hotel.fb}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        textDecoration: "none",
                                        color: "white",
                                      }}
                                    >
                                      <Box width={{ lg: "50px", xs: "60px" }}>
                                        <img
                                          src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337538/Group_1_2_otxwfg_cno6lr.webp"
                                          alt="fb"
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        />
                                      </Box>
                                    </a>
                                  </Grid>
                                </>
                              )}
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AllHotels;
