import React, { useEffect, useState } from "react";
import { Grid, Box, Button, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";

const Allevents = () => {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoding] = useState(true);



  useEffect(() => {
    async function getAllEventsByLocation() {
      try {
        const res = await axios.get(
          `https://holidaysri-backend-9xm4.onrender.com/event/`
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
  }, []);

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
      <Nav/>
      <Grid item xs={12}>
        <Box marginBottom="0px" marginTop="16px" marginLeft="32px">
          <a
            href={`/destination/${location._id}`}
            style={{ textDecoration: "none" }}
          >
            <Button
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
          </a>
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
            {location.locationName}
          </Typography>
        </Box>
        <Grid container justifyContent="center" alignItems="center">
          <Box
            sx={{
              width: { lg: "1100px", xs: "300px" },
            }}
          >
            {loading ? (
            <>
              <CircularProgress sx={{ color: "green", marginTop: "16px" }} />
            </>
          ) : (
            <>
            {events.length === 0 ? (
              <Typography
                fontSize={{ lg: "24px", xs: "22px" }}
                sx={{ color: "white", fontFamily: "poppins" }}
                marginTop="16px"
              >
                No Recent Events
              </Typography>
            ) : (
              <Typography
                fontSize={{ lg: "24px", xs: "22px", fontFamily: "poppins" }}
                sx={{ color: "white" }}
                marginTop="16px"
              >
                Upcoming Recent Events
              </Typography>
            )}
            </>
          )}
            
          </Box>
          
          {events.map((event) => (
            <Box
              key={event._id}
              sx={{
                width: { lg: "1100px", xs: "280px" },
                borderColor: "black",
                borderRadius: "30px",
                backgroundColor: "rgba(255,255,255, 0.5)",

                padding: "24px",
                marginTop: { lg: "16px", xs: "16px" },
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                  <Box width={{ lg: "100%" }} height={{ lg: "100%" }}>
                    <img
                      src={event.images}
                      width="100%"
                      height="100%"
                      style={{ borderRadius: "10px" }}
                      alt="Event"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: "400",
                      fontSize: { lg: "24px", xs: "20px" },
                      textAlign: "left",
                    }}
                  >
                    {event.eventName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: "400",
                      fontSize: { lg: "16px", xs: "16px" },
                      textAlign: "left",
                      marginTop: "8px",
                    }}
                  >
                    {event.description}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Allevents;
