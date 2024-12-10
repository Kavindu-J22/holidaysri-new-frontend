import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,Modal
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";
import { Helmet } from "react-helmet";
import EmptyNotification from "../../components/System/EmptyNotification";

const Events = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoding] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://holidaysri-backend-9xm4.onrender.com/location/get/${id}`
        );
        setLocation(response.data.location);
      } catch (error) {
        console.error("Error fetching location:", error);
        alert("Error fetching location: " + error.message);
      }
    };

    fetchData();
  }, [id]);
  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { lg: 600, xs: 280 },
    backgroundColor: "rgba(48, 103, 84, 0.9)",
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
    minHeight: "auto", // Set the minimum height
    maxHeight: "400px", // Limit the height to viewport height
    overflowY: "auto", // Make the content scrollable if it exceeds the height
  };
  useEffect(() => {
    async function getAllEventsByLocation() {
      try {
        const res = await axios.get(
          `https://holidaysri-backend-9xm4.onrender.com/event/getEventsByLocation/${id}`
        );
        setEvents(res.data);
        setLoding(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoding(false);
        alert("Error fetching events: " + error.message);
      }
    }
    getAllEventsByLocation();
  }, [id]);
  const Imageproducts = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(intervalId);
    }, [images]);

    if (!images || images.length === 0) {
      return <div>No images available</div>;
    }

    return (
      <div
        style={{
          position: "relative",
          maxWidth: "600px",
          margin: "auto",
          overflow: "hidden",
          borderRadius: "20px",
        }}
      >
        <Box sx={{ width: "100%", height: "230px" }}>
          <img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            width="100%"
            height="100%"
            style={{
              width: '100%',
              height: '250px',
              borderRadius: '20px',
              objectFit: 'cover',
            }}            alt={`Product ${currentImageIndex + 1}`}
          />
        </Box>
      </div>
    );
  };
  if (!location) {
    // If location is still loading, return a loading indicator or placeholder
    return <div>Loading...</div>;
  }
  return (
    <Grid
      container
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733336447/pexels-photo-1072179_frjk63_js026i.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingBottom: "16px",
      }}
    >
      <Nav />
      <Grid item xs={12}>
        <Box
          marginBottom="0px"
          marginTop={
            events.length === 0
              ? { lg: "-306px", xs: "-250px" }
              : { lg: "106px", xs: "100px" }
          }
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
              {" "}
              Back
            </Button>
          
        </Box>
        <Grid>
          <Box textAlign="center" marginTop={{ lg: "2%", xs: "3%" }}>
            <Typography
              sx={{
                color: "white",
                fontFamily: "inter",
                marginTop: "8px",
                fontSize: { lg: "50px", xs: "32px" },
                letterSpacing: "20px",
              }}
            >
              
              {location.locationName}
            </Typography>
          </Box>
        </Grid>

        <Grid container>
          <Box>
            {loading ? (
              <>
                <CircularProgress sx={{ color: "green", marginTop: "16px" }} />
              </>
            ) : (
              <>
                {events.length === 0 ? (
                  <></>
                ) : (
                  <Typography
                    fontSize={{ lg: "24px", xs: "22px", fontFamily: "poppins" }}
                    sx={{ color: "white" }}
                    marginTop="16px"
                    textAlign={{ xs: "center", lg: "left" }}
                    marginLeft={{ lg: "40px", xs: "16px" }}
                    marginBottom="16px"
                  >
                    Upcoming Recent Events
                  </Typography>
                )}
              </>
            )}
          </Box>
</Grid>
          <Grid >

          <Box
            paddingLeft={{ lg: "10px", xs: "16px" }}
            paddingRight={{ lg: "40px", xs: "16px" }}
          >
            <Grid
              container
              spacing={3}
              style={{
                transform: hoveredIndex !== null ? "translateY(-10px)" : "",
                transition: "transform 0.3s",
              }}
            >
              {events.length === 0 && (
                <>
                  <EmptyNotification
                    svg={
                      <svg
                        width="34"
                        height="31"
                        viewBox="0 0 34 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.5 27.2H28.9V13.6H18.7V27.2H22.1V17H25.5V27.2ZM1.7 27.2V1.7C1.7 1.24913 1.87911 0.81673 2.19792 0.497918C2.51673 0.179107 2.94913 0 3.4 0H27.2C27.6509 0 28.0833 0.179107 28.4021 0.497918C28.7209 0.81673 28.9 1.24913 28.9 1.7V10.2H32.3V27.2H34V30.6H0V27.2H1.7ZM8.5 13.6V17H11.9V13.6H8.5ZM8.5 20.4V23.8H11.9V20.4H8.5ZM8.5 6.8V10.2H11.9V6.8H8.5Z"
                          fill="black"
                        />
                      </svg>
                    }
                    title="No added hotels"
                    body={`Currently, there are no added hotels `}
                    width={{
                      lg: "850px",
                      xs: "320px",
                      md: "750px",
                      sm: "650px",
                    }}
                    marginLefts={{
                      lg: "10%",
                      xs: "0%",
                      sm: "1%",
                      md: "5%",
                      xl: "5%",
                    }}
                  />
                </>
              )}

              {events.map((event, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={event._id}
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
                      minHeight: "auto",
                      width: { lg: "400px", xs: "350px" },

                      overflow: "auto",
                    }}
                    variant="outlined"
                  >
                    <Box width={{ lg: "100%" }} height="230px" >
                      <Imageproducts images={event.images} />
                    </Box>
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ color: "white" }}
                      >
                        {event.eventName}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "white",marginTop:'4px' }}>
                      <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 17.4167C2 18.975 3.3 20.1667 5 20.1667H19C20.7 20.1667 22 18.975 22 17.4167V10.0834H2V17.4167ZM19 3.66671H17V2.75004C17 2.20004 16.6 1.83337 16 1.83337C15.4 1.83337 15 2.20004 15 2.75004V3.66671H9V2.75004C9 2.20004 8.6 1.83337 8 1.83337C7.4 1.83337 7 2.20004 7 2.75004V3.66671H5C3.3 3.66671 2 4.85837 2 6.41671V8.25004H22V6.41671C22 4.85837 20.7 3.66671 19 3.66671Z" fill="#F8F8F8"/>
</svg>
{" "}
                        {event.date}
                      </Typography>
                     
                      <Typography variant="body" sx={{ color: "white",marginTop:'8px' }}>
                      Maximum Crowd : {event.maximumCrowd}
                      </Typography><br></br>
                      <Typography variant="body" sx={{ color: "white",marginTop:'8px' }}>
                       Ticket Price : <text style={{color:'#98FF98',fontWeight:'600'}}>LKR {event.ticketPrice} </text>
                      </Typography>

                                        {/* location */}
                    
                                        <Grid container spacing={1} marginTop="8px" display="flex" alignItems="center">
                          <Grid item xs="auto">
                            <Typography variant="body1" component="div" sx={{ color: "white", fontSize: "9px" }}>
                              <Box display="flex" width={{ lg: "50px", xs: "50px" }}>
                                <img
                                  src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337543/output-onlinegiftools_9_zciqfy_ei8c1p.gif"
                                  alt="google map"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                />
                              </Box>
                              {" "}
                              {event.location}
                            </Typography>
                          </Grid>

                          {/* WhatsApp */}
                          <Grid item xs="auto" marginLeft="15px">
                            <Typography variant="h6" sx={{ color: "white" }}>
                              <Box width={{ lg: "45px", xs: "45px" }}>
                                <a
                                  href={`https://wa.me/${event.contactNumber}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337538/whatsapp_vjbu3d_qbwzhv.webp"
                                    alt="whatsapp"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                </a>
                              </Box>
                            </Typography>
                          </Grid>

                          {/* Facebook */}
                          <Grid item xs="auto" marginLeft="15px">
                            <Typography variant="h6" sx={{ color: "white" }}>
                              <Box width={{ lg: "55px", xs: "45px" }}>
                                <a
                                  href={event.facebookLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733432165/Facebook_1_tnmdws_hmepat.gif"
                                    alt="facebook"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                </a>
                              </Box>
                            </Typography>
                          </Grid>

                          {/* Website */}
                          <Grid item xs="auto" marginLeft="15px">
                            <Typography variant="h6" sx={{ color: "white" }}>
                              <Box width={{ lg: "45px", xs: "45px" }}>
                                <a
                                  href={event.websiteLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733432167/Mobile_Browser_vcdnyp_ogxw6b.gif"
                                    alt="website"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                </a>
                              </Box>
                            </Typography>
                          </Grid>
                        </Grid>
                   


                      <Button
                            onClick={() => handleOpen(event)}
                            variant="outlined"
                            sx={{
                              width: "100%",
                              color: "white",
                              borderColor: "white",
                              borderRadius: "30px",
                              marginTop: "16px",
                              "&:hover": {
                                borderColor: "black",
                              },
                            }}
                          >
                            View More
                          </Button>
                     
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {selectedEvent && (
              <Typography
                variant="body2"
                sx={{ color: "white", marginTop: "8px" }}
              >
                {selectedEvent.description}
              </Typography>
            )}
          </Box>
        </Modal>
    </Grid>
  );
};

export default Events;
