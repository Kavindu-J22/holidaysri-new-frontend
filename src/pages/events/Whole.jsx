import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Modal,
} from "@mui/material";
import { Helmet } from "react-helmet";
import axios from "axios";
import Nav from "../Nav/Nav";

const WholeEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    async function getAllEvents() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/event"
        );
        setEvents(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
        alert("Error fetching events: " + error.message);
      }
    }
    getAllEvents();
  }, []);
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
              width: "100%",
              height: "250px",
              borderRadius: "20px",
              objectFit: "cover",
            }}
            alt={`Product ${currentImageIndex + 1}`}
          />
        </Box>
      </div>
    );
  };
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
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "white", borderRadius: "30px" }}
            onClick={() => window.history.back()}
          >
            Back
          </Button>
        </Box>
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
            <Helmet>
              <title>All Events</title>
            </Helmet>
            All Events
          </Typography>
        </Box>
        <Grid container justifyContent="center" alignItems="center">
          <Box
            sx={{
              width: { lg: "1100px", xs: "300px", md: "1100px", sm: "1100px" },
            }}
          >
            {loading ? (
              <CircularProgress sx={{ color: "green", marginTop: "16px" }} />
            ) : (
              <>
                {events.length === 0 ? (
                  <Typography
                    fontSize={{ lg: "24px", xs: "22px" }}
                    sx={{
                      color: "white",
                      fontFamily: "poppins",
                      textAlign: { xs: "center", lg: "left" },
                    }}
                    marginTop="16px"
                  >
                    No Recent Events
                  </Typography>
                ) : (
                  <Typography
                    fontSize={{ lg: "24px", xs: "22px", fontFamily: "poppins" }}
                    sx={{
                      color: "white",
                      textAlign: { xs: "center", lg: "left" },
                    }}
                    marginTop="16px"
                    marginBottom="8px"
                  >
                    Upcoming Recent Events
                  </Typography>
                )}

                <Grid
                  container
                  spacing={3}
                  style={{
                    transform: hoveredIndex !== null ? "translateY(-10px)" : "",
                    transition: "transform 0.3s",
                  }}
                >
                  {" "}
                  {events.map((event) => (
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
                        <Box width={{ lg: "100%" }} height="230px">
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
                          <Typography
                            variant="h6"
                            sx={{ color: "white", marginTop: "4px" }}
                          >
                            <svg
                              width="24"
                              height="22"
                              viewBox="0 0 24 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2 17.4167C2 18.975 3.3 20.1667 5 20.1667H19C20.7 20.1667 22 18.975 22 17.4167V10.0834H2V17.4167ZM19 3.66671H17V2.75004C17 2.20004 16.6 1.83337 16 1.83337C15.4 1.83337 15 2.20004 15 2.75004V3.66671H9V2.75004C9 2.20004 8.6 1.83337 8 1.83337C7.4 1.83337 7 2.20004 7 2.75004V3.66671H5C3.3 3.66671 2 4.85837 2 6.41671V8.25004H22V6.41671C22 4.85837 20.7 3.66671 19 3.66671Z"
                                fill="#F8F8F8"
                              />
                            </svg>{" "}
                            {event.date}
                          </Typography>
                          <Grid container sx={{ marginTop: "8px" }}>
                            <Grid item xs="auto">
                              <Typography variant="h6" sx={{ color: "white" }}>
                                <Box width={{ lg: "50px", xs: "50px" }}>
                                  <img
                                    src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337543/output-onlinegiftools_9_zciqfy_ei8c1p.gif"
                                    alt="google map"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                </Box>{" "}
                                {event.eventLocation}
                              </Typography>
                            </Grid>
                            <Grid item xs={5} marginLeft="16px">
                              <Typography variant="h6" sx={{ color: "white" }}>
                                <Box width={{ lg: "45px", xs: "45px" }}>
                                  <img
                                    src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337538/whatsapp_vjbu3d_qbwzhv.webp"
                                    alt="whatsapp"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                </Box>{" "}
                                {event.contactNo}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Typography
                            variant="body"
                            sx={{ color: "white", marginTop: "8px" }}
                          >
                            Maximum Crowd : {event.maximumCrowd}
                          </Typography>
                          <br></br>
                          <Typography
                            variant="body"
                            sx={{ color: "white", marginTop: "8px" }}
                          >
                            Ticket Price :{" "}
                            <text
                              style={{ color: "#98FF98", fontWeight: "600" }}
                            >
                              LKR {event.ticketPrice}{" "}
                            </text>
                          </Typography>
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
              </>
            )}
          </Box>
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
    </Grid>
  );
};

export default WholeEvents;
