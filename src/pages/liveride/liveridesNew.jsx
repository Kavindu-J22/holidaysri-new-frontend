import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa"; // Importing the Map Marker icon from Font Awesome
import "./liveride.css";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import { CheckCircle, AccessTime } from '@mui/icons-material'; // Import suitable icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faTimesCircle, faHourglassStart, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 600, xs: 280, md: 600, sm: 600 },
  backgroundColor: "rgba(48, 103, 84, 0.9)",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};
import { he } from "date-fns/locale";
import Nav from "../Nav/Nav";

const LiveRide = () => {
  const [rides, setRides] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [showStartSoon, setShowStartSoon] = useState(false);
  const [showNotStarted, setShowNotStarted] = useState(false);
  const [showOngoing, setShowOngoing] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const handleOpen = (ride) => {
    setSelectedEvent(ride);
    setOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <Box sx={{ width: "100%", height: "200px" }}>
          <img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            width="100%"
            height="100%"
            style={{ borderRadius: "20px" }}
            alt={`Product ${currentImageIndex + 1}`}
          />
        </Box>
      </div>
    );
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://holidaysri-backend-9xm4.onrender.com/realTime/"
      );
      setRides(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const determinePosition = (ride) => {
    const currentDate = new Date();
    const rideStartDateTime = new Date(`${ride.rideDate}T${ride.rideTime}`);
    const thirtyMinutes = 30 * 60 * 1000;
    const approximateTime = ride.ApxTime * 60 * 60 * 1000;

    if (ride.Status !== "Active" && rideStartDateTime <= currentDate && currentDate - rideStartDateTime < approximateTime) {
      return "Offline 🧐(Ongoing 🚙- Contact Rider..!)";
    }

    if (rideStartDateTime > currentDate && rideStartDateTime - currentDate <= thirtyMinutes) {
      return "Start Soon..⏰";
    }

    if (rideStartDateTime > currentDate) {
      return "Not Started..⏳";
    }

    if (currentDate > rideStartDateTime && currentDate - rideStartDateTime > approximateTime) {
      return "Ride Over..! ⏱️";
    }

    if (rideStartDateTime <= currentDate && currentDate - rideStartDateTime < approximateTime) {
      return "Ongoing.. 🚙";
    }

    return "not Define ❓";
  };

  const filteredRides = rides.filter((ride) => {
    const searchTermMatch = ride.Route.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = !showActiveOnly || ride.Status === "Active";

    const startSoonMatch = !showStartSoon || determinePosition(ride) === "Start Soon..⏰";
    const notStartedMatch = !showNotStarted || determinePosition(ride) === "Not Started..⏳";
    const ongoingMatch = !showOngoing || determinePosition(ride) === "Ongoing.. 🚙";

    // Add a check for expiration date
    const currentDate = new Date();
    const expirationDate = new Date(ride.expirationDate); // Assuming ride.expirationDate is a valid date string
    const isNotExpired = expirationDate >= currentDate;

    // Check if the ride is marked as "ride" and the position is "Ride Over..! ⏱️"
    const isRideOverAndDailyOrMonth = ride.DailyOrMonth === "Daily" && determinePosition(ride) === "Ride Over..! ⏱️";

    // Only include the ride if all conditions are met and it's not marked as "Ride Over" with DailyOrMonth = "ride"
    return searchTermMatch && statusMatch && startSoonMatch && notStartedMatch && ongoingMatch && isNotExpired && !isRideOverAndDailyOrMonth;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = () => {
    setShowActiveOnly(!showActiveOnly);
  };

  const handleStartSoonChange = () => {
    setShowStartSoon(!showStartSoon);
  };

  const handleNotStartedChange = () => {
    setShowNotStarted(!showNotStarted);
  };

  const handleOngoingChange = () => {
    setShowOngoing(!showOngoing);
  };

// Helper function to convert 24-hour format to 12-hour format with AM/PM
const convertTo12HourFormat = (time24) => {
  if (!time24 || typeof time24 !== 'string' || !time24.includes(':')) {
    return 'Invalid Time'; // Return a fallback message if time24 is invalid
  }

  const [hours, minutes] = time24.split(':');
  let hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12; // Convert 0 to 12 for midnight
  return `${hour}:${minutes} ${ampm}`;
  
};

const getDisplayDate = (ride) => {
  if (ride.DailyOrMonth === "Monthly") {
    // Combine rideDate and rideTime into a single Date object
    const rideDateTimeStr = `${ride.rideDate}T${ride.rideTime}:00.000+00:00`;
    const rideDateObj = new Date(rideDateTimeStr);
    
    // Add ApxTime (in hours) to the Date object
    const expirationDateObj = new Date(rideDateObj.getTime() + ride.ApxTime * 60 * 60 * 1000); // ApxTime in milliseconds
    
    // Return the formatted date string
    return formatISODate(expirationDateObj);
  } else if (ride.DailyOrMonth === "Daily") {
    // For Daily, return the formatted expiration date
    return formatISODate(ride.expirationDate);
  }
  
  // Default case
  return "Not Defined";
};



const formatISODate = (isoDateString) => {
  const date = new Date(isoDateString);

  const year = date.getUTCFullYear(); // Get the year
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Get the month (0-indexed, so add 1)
  const day = String(date.getUTCDate()).padStart(2, '0'); // Get the day

  const hours = date.getUTCHours(); // Get the hours
  const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Get the minutes
  const period = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12; // If hours is 0, set it to 12

  return `${year}.${month}.${day} ${formattedHours}.${minutes} ${period}`;
};

  return (
    <>
          <Nav />
          <Grid
    container
      sx={{
        position: 'relative',
        minHeight: '100vh',
        marginTop:'70px',
        paddingBottom: '16px',
        overflow: 'hidden',
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage:
          'url("https://res.cloudinary.com/iplus/image/upload/v1711784494/pexels-photo-1072179_frjk63.jpg")', 
                    backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          filter: 'blur(3px)',
          zIndex: -1,
        },
    
      }}
    >
      
      <div className="live-ride-container">
      <Box sx={{width:{lg:'1450px'}}}>
      <div className="search-bar">
        <TextField
          type="text"
          variant="standard"
          fullWidth
          placeholder="Search by route..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="filters-container">
          <div className="filter-item">
            <label>Show Active Rides Only 🎯</label>
            <Checkbox
              checked={showActiveOnly}
              onChange={handleStatusChange}
            />
          </div>
          
          <div className="filter-item">
            <label>Start Soon Rides ⏰</label>
            <Checkbox
              checked={showStartSoon}
              onChange={handleStartSoonChange}
            />
          </div>

          <div className="filter-item">
            <label>Not Started Rides ⏳</label>
            <Checkbox
              checked={showNotStarted}
              onChange={handleNotStartedChange}
            />
          </div>

          <div className="filter-item">
            <label>Ongoing Rides 🚙</label>
            <Checkbox
              checked={showOngoing}
              onChange={handleOngoingChange}
            />
          </div>
        </div>


      </div>
        </Box>

        <Box marginBottom="0px" marginLeft="32px" marginTop='32px'>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                borderRadius: "30px",
              }}
              onClick={() => window.history.back()}
            >
              Back
            </Button>{" "}
        </Box>
        
        <Grid
          container
          spacing={2}
          marginTop={{ lg: "16px", xs: "8px" }}
          paddingLeft="8px"
          paddingRight="8px"
        >
          {filteredRides.map((ride) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={ride._id}>
              <Card
                sx={{
                  borderRadius: "26px",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  margin: "8px",
                  padding: "16px",
                  height: "100%", // Allow the card to take full height of its container
                }}
                variant="outlined"
              >
                <Grid container sx={{ marginBottom: "8px" }}>
                  <Grid item xs={11}>
                    <h3>{ride.Route}</h3>
                  </Grid>
                  <Grid item xs={1} sx={{ width: "25px", height: "25px" }}>
                    <Box sx={{ width: "25px", height: "25px" }}>
                      {ride.Status === "Active" ? (
                        <>
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.5 11C8.53757 11 11 8.53757 11 5.5C11 2.46243 8.53757 0 5.5 0C2.46243 0 0 2.46243 0 5.5C0 8.53757 2.46243 11 5.5 11Z"
                              fill="#32D583"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.5 11C8.53757 11 11 8.53757 11 5.5C11 2.46243 8.53757 0 5.5 0C2.46243 0 0 2.46243 0 5.5C0 8.53757 2.46243 11 5.5 11Z"
                              fill="#850919"
                            />
                          </svg>
                        </>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Box width={{ lg: "100%" }} height={{ lg: "200px" }} sx={{marginBottom:'8px'}}>
                  <Imageproducts images={ride.images} />
                </Box>

                <p>
                  Vehicle Number: <strong>{ride.vehicleID} </strong>
                </p>

                <p>
                  Rider Name: <strong>{ride.vehicleOwnerName} </strong>
                </p>
                <p>
                  Maximum No of Passengers: <strong>{ride.Maximum}</strong>
                </p>
                <p>
                  Present passenger count: <strong>{ride.Availability}</strong>
                </p>

                <p> Availability : <strong>{ride.Availability} / {ride.Maximum} </strong>
                  {ride.Maximum <= ride.Availability ? (
                    <span style={{ color: 'rgb(239, 37, 10)', fontWeight:'600', padding:'5px',border:'1px solid', borderRadius:'10px', marginLeft:'10px' }}>Full</span> // Show 'Full' in red if full
                  ) : (
                    <span style={{ color: 'rgb(11, 255, 194)', fontWeight:'600', padding:'5px',border:'1px solid', borderRadius:'10px', marginLeft:'10px' }}>
                      {ride.Maximum - ride.Availability} more
                    </span> // Show remaining capacity in blue if not full
                  )}
                </p>

                <p>
                  {/* date */}
                  Starting date: <strong>{ride.rideDate}</strong>
                </p>

                <p>
                  {/* time */}

                  Starting Time: <strong>{convertTo12HourFormat(ride.rideTime)}</strong>
                </p>

                <p>
                  Aprox: Time Duration (by:hrs): <strong>{ride.ApxTime} hrs</strong>
                </p>

                <p style={{ fontSize: '12px', color: "rgb(75, 60, 29)" }}>
                  Estimated Ride Ending: <strong>{getDisplayDate(ride)}</strong>
                </p>

                <p>
                  {/* Position */}
                  Position: <strong>{determinePosition(ride)}</strong>
                </p> 
                
                {ride.price && <>
                  <p>
                  Price per ride: <strong style={{color:'#98FF98',fontWeight:'600'}}>LKR {ride.price}</strong>
                </p>
                </>}

                {/* location */}
                    
                <Grid container spacing={1} marginTop="8px" display="flex" alignItems="center" marginBottom="10px">
                          <Grid item xs="auto">
                            <Typography variant="body1" component="div" sx={{ color: "white", fontSize: "9px" }}>
                              <Box display="flex" width={{ lg: "50px", xs: "50px" }}>
                              <a
                                  href={ride.CurrentLocation}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                <img
                                  src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337543/output-onlinegiftools_9_zciqfy_ei8c1p.gif"
                                  alt="google map"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                />
                                </a>
                              </Box>
                              {" "}
                              Rider-Location
                            </Typography>
                          </Grid>

                          {/* WhatsApp */}
                          <Grid item xs="auto" marginLeft="15px">
                            <Typography variant="h6" sx={{ color: "white" }}>
                              <Box width={{ lg: "45px", xs: "45px" }}>
                                <a
                                  href={`https://wa.me/${ride.phoneNumber}`}
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
                                  href={ride.facebookLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337538/Group_1_2_otxwfg_cno6lr.webp"
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
                                  href={ride.websiteLink}
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


                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "20px",
                            border: "1px solid",
                            padding: "8px",
                            backgroundColor: ride.DailyOrMonth === "Monthly" ? "rgba(144, 238, 144, 0.13)" : "rgba(255, 255, 102, 0.136)", // Light green and yellow with 0.5 opacity
                            borderColor: ride.DailyOrMonth === "Monthly" ? "green" : "orange",
                            color: ride.DailyOrMonth === "Monthly" ? "green" : "rgb(255, 170, 13)", // Set text color based on DailyOrMonth
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for an embedded look
                            transition: "box-shadow 0.3s ease", // Smooth shadow transition on hover
                            "&:hover": {
                              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", // Enhance shadow on hover for more depth
                            },
                          }}
                        >
                  {ride.DailyOrMonth === "Monthly" ? (
                    <>
                      <CheckCircle sx={{ color: "green", marginRight: "8px" }} />
                      <strong>Monthly Verified Rider</strong>
                    </>
                  ) : (
                    <>
                      <AccessTime sx={{ color: "orange", marginRight: "8px" }} />
                      <strong>Daily Verified Rider</strong>
                    </>
                  )}
                </Box>

                <Button
                  onClick={() => handleOpen(ride)}
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
              </Card>
            </Grid>
          ))}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <p>
                <strong>{selectedEvent?.Route}</strong>
              </p>
              <p>
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.612 15.4388L16.222 13.8288C16.4388 13.6146 16.7132 13.468 17.0118 13.4068C17.3103 13.3455 17.6202 13.3723 17.9039 13.4838L19.8661 14.2672C20.1527 14.3836 20.3985 14.5822 20.5724 14.838C20.7464 15.0938 20.8407 15.3954 20.8436 15.7047V19.2985C20.8419 19.5089 20.7977 19.7168 20.7135 19.9097C20.6294 20.1026 20.5071 20.2765 20.354 20.4208C20.2009 20.5652 20.0201 20.6771 19.8226 20.7498C19.6251 20.8225 19.415 20.8545 19.2048 20.8438C5.45512 19.9885 2.68074 8.34472 2.15606 3.88847C2.1317 3.66963 2.15395 3.44812 2.22135 3.23851C2.28875 3.02889 2.39977 2.83592 2.5471 2.6723C2.69444 2.50867 2.87475 2.37809 3.07617 2.28915C3.27759 2.20021 3.49556 2.15493 3.71574 2.15628H7.18731C7.49709 2.1572 7.79952 2.25077 8.0557 2.42497C8.31187 2.59917 8.51007 2.84602 8.62481 3.13378L9.40824 5.09597C9.52343 5.37849 9.55281 5.68868 9.49273 5.9878C9.43265 6.28692 9.28577 6.56171 9.07043 6.77784L7.46043 8.38784C7.46043 8.38784 8.38762 14.6625 14.612 15.4388Z"
                    fill="black"
                  />
                </svg>{" "}
                <strong>{selectedEvent?.phoneNumber}</strong>
              </p>
              <p>
                Description: <strong>{selectedEvent?.Description}</strong>
              </p>
              <p>
                Status: <strong>{selectedEvent?.Status}</strong>
              </p>
            </Box>
          </Modal>
        </Grid>
      </div>
    </Grid>
    
    </>
    
  );
};

export default LiveRide;
