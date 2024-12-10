import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Modal, Grid, FormControl, Select, MenuItem, TextField } from "@mui/material";
import Customtextfield from "../../components/hotel/Login/Customtextfield";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 650, xs: 300 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
  maxHeight: 600,
  overflow: "auto",
};

const Addevent = (props) => {
  const [editingEvent, setEditingEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedImages([]);
    setExistingImages([]);
  };
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [eventLocation, setEventLocation] = useState("");
  const [eventName, setEventName] = useState("");
  const [maximumCrowd, setMaximumCrowd] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const [storedEmail, setStoredEmail] = useState('');

  

  useEffect(() => {
    // Retrieve email from localStorage on component mount
    const email_local = localStorage.getItem("userEmail");
    setStoredEmail(email_local);
  }, []);

  useEffect(() => {
    async function getAllLocations() {
      try {
        const res = await axios.get("https://holidaysri-backend-9xm4.onrender.com/location/");
        setLocations(res.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }
    getAllLocations();
  }, []);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventName(event.eventName);
    setEventLocation(event.eventLocation);
    setDescription(event.description);
    setMaximumCrowd(event.maximumCrowd);
    setTicketPrice(event.ticketPrice);
    setContactNo(event.contactNo);
    setDate(event.date);
    setExistingImages(event.images || []);
    setOpen(true); // Open the modal for editing
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    if (
      !eventName ||
      !eventLocation ||
      !storedEmail ||
      !description ||
      !maximumCrowd ||
      !ticketPrice ||
      !contactNo ||
      !date ||
      selectedImages.length === 0
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const uploadedImageUrls = [];

      for (const image of selectedImages) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "aahllisc");
        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/daa9e83as/image/upload",
          formData
        );
        uploadedImageUrls.push(cloudinaryResponse.data.secure_url);
      }

      const newEvent = {
        eventName,
        eventLocation,
        email: storedEmail,
        description,
        maximumCrowd,
        ticketPrice,
        contactNo,
        date,
        images: [...existingImages, ...uploadedImageUrls],
      };

      if (editingEvent) {
        await axios.put(
          `https://holidaysri-backend-9xm4.onrender.com/event/updateEvent/${editingEvent._id}`,
          newEvent
        );
        alert("The Event was Successfully updated");
        window.location = `/add-event`;
      } else {
        await axios.post("https://holidaysri-backend-9xm4.onrender.com/event/add", newEvent);
        alert("The New Event was Successfully saved");
        window.location = `/add-event`;
      }
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred.");
    }
  };

  useEffect(() => {
    async function getAllEvents() {
      try {
        const res = await axios.get("https://holidaysri-backend-9xm4.onrender.com/event/");
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching Events:", error);
        alert("Error fetching Events: " + error.message);
      }
    }
    getAllEvents();
  }, []);

  const handleCheckoutEvent = async () => {
    try {
      const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
      const id = '65f58296f707aa390b10db8a';
      
      // Fetch rates from the backend
      const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
      const rates = responseRates.data.rate;
  
      // Navigate to checkout page with the fetched rates and discount
      navigate('/checkout', { 
        state: { 
          discount: rates.discountEventPercentage, 
          rate: rates.eventRate,
          path: '/add-event-form',
          currency: 'LKR',
          items: 'Event Advertisement',
          earns: rates.earningRate,
        } 
      });
    } catch (error) {
      console.error('Error fetching rates or navigating to checkout:', error.message);
    }
  };

  function handleDeleteEvent(id) {
    const r = window.confirm("Do you really want to Delete this Event?");
    if (r == true) {
      axios.delete(`https://holidaysri-backend-9xm4.onrender.com/event/delete/${id}`).then((res) => {
        alert("Event Deleted Successfully");
        window.location = `/add-event`;
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
      });
    }
  }
  const [adminOrSeller, setAdminOrSeller] = useState(false);

  useEffect(() => {
     const getUserRole = () => {
       return localStorage.getItem("userRole");
     };
 
     const userRole = getUserRole();
     setAdminOrSeller(userRole)
   }, []);
  const filteredEvents = events.filter((event) => event.email === storedEmail);
  const handleBackClick = () => {
    const routes = {
      admin: '/admin',
      agent: '/local-dashboard',
      seller: '/foreign-dashboard',
    };
  
    navigate(routes[adminOrSeller]);
  };
  return (
    <div
      style={{
        paddingTop: "16px",
        paddingBottom: "16px",
        backgroundImage: 'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733441065/pexels-alex-azabache-3723035_1_xs9aso_svjw7d.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          margin: { lg: '40px', xs: '16px' },
          padding: { lg: '24px', xs: '10px' },
          borderRadius: '20px'
        }}
      >
        <Box textAlign="center" marginTop={{ lg: "4%", xs: "4%" }}>
          <Typography
            sx={{
              color: "white",
              fontFamily: "inter",
              marginTop: "8px",
              fontSize: { lg: "50px", xs: "18px" },
              letterSpacing: "20px",
            }}
          >
            Add Events
          </Typography>
        </Box>
        <Grid container justifyContent="center" alignItems="center">
          <Box
            sx={{
              width: { lg: "1100px", xs: "300px" },
            }}
            marginTop="40px"
          >
            <Button
              variant="outlined"
              sx={{
                borderRadius: "30px",
                borderColor: "black",
                boxShadow: "none",
                width: { lg: "200px", xs: "48%" },
                backgroundColor: "white",
                color: "black",
                marginTop: { lg: "32px", xs: "20px" },
                height: "48px",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "black",
                  boxShadow: "none",
                },
              }}
              onClick={handleBackClick}
            >
              Back to Dashboard
            </Button>{" "}
            <Button
              variant="outlined"
              sx={{
                borderRadius: "30px",
                borderColor: "black",
                boxShadow: "none",
                width: { lg: "200px", xs: "48%" },
                backgroundColor: "white",
                color: "black",
                marginTop: { lg: "32px", xs: "20px" },
                height: "48px",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "black",
                  boxShadow: "none",
                },
              }}
              onClick={handleCheckoutEvent}
            >
              ADD EVENT
            </Button>
          </Box>
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormControl fullWidth>
              <div>Location</div>
              <Select
                sx={{ width: "95%", marginTop: "15px" }}
                id="location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                required
              >
                {locations.map((location) => (
                  <MenuItem key={location._id} value={location.locationName}>
                    {location.locationName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <form onSubmit={handleAddEvent}>
              <div className="form-group">
                <label htmlFor="eventName">Event Name:</label>
                <Customtextfield
                  type="text"
                  id="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  fullWidth
                  required
                  sx={{ marginTop: "15px" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <Customtextfield
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  required
                  sx={{ marginTop: "15px" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="maximumCrowd">Maximum Crowd:</label>
                <Customtextfield
                  type="number"
                  id="maximumCrowd"
                  value={maximumCrowd}
                  onChange={(e) => setMaximumCrowd(e.target.value)}
                  fullWidth
                  required
                  sx={{ marginTop: "15px" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ticketPrice">Ticket Price:</label>
                <Customtextfield
                  type="number"
                  id="ticketPrice"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  fullWidth
                  required
                  sx={{ marginTop: "15px" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactNo">Contact Number:</label>
                <Customtextfield
                  type="text"
                  id="contactNo"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  fullWidth
                  required
                  sx={{ marginTop: "15px" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <Customtextfield
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth
                  required
                  sx={{ marginTop: "15px" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="images">Upload Images:</label>
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  style={{ marginTop: "15px" }}
                />
              </div>
              <div className="form-group">
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "15px",
                  }}
                >
                  {existingImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Event ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        margin: "5px",
                      }}
                    />
                  ))}
                </Box>
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: "15px" }}
              >
                {editingEvent ? "Update Event" : "Add Event"}
              </Button>
            </form>
          </Box>
        </Modal>

        <Grid container justifyContent="center" alignItems="center">
          <Box
            sx={{
              width: { lg: "1100px", xs: "300px" },
            }}
            marginTop="40px"
          >
            {filteredEvents.length === 0 ? (
              <Typography
                sx={{
                  color: "white",
                  fontFamily: "inter",
                  fontSize: { lg: "24px", xs: "18px" },
                  letterSpacing: "1px",
                  textAlign: "center",
                }}
              >
                No events found. Add your first event.
              </Typography>
            ) : (
              filteredEvents.map((event) => (
                <Box
                  key={event._id}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    padding: "16px",
                    marginBottom: "16px",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "inter",
                      fontSize: { lg: "24px", xs: "18px" },
                      letterSpacing: "1px",
                    }}
                  >
                    {event.eventName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "inter",
                      fontSize: { lg: "18px", xs: "14px" },
                      letterSpacing: "1px",
                    }}
                  >
                    Location: {event.eventLocation}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "inter",
                      fontSize: { lg: "18px", xs: "14px" },
                      letterSpacing: "1px",
                    }}
                  >
                    Description: {event.description}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "inter",
                      fontSize: { lg: "18px", xs: "14px" },
                      letterSpacing: "1px",
                    }}
                  >
                    Maximum Crowd: {event.maximumCrowd}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "inter",
                      fontSize: { lg: "18px", xs: "14px" },
                      letterSpacing: "1px",
                    }}
                  >
                    Ticket Price: {event.ticketPrice}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "inter",
                      fontSize: { lg: "18px", xs: "14px" },
                      letterSpacing: "1px",
                    }}
                  >
                    Contact Number: {event.contactNo}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "inter",
                      fontSize: { lg: "18px", xs: "14px" },
                      letterSpacing: "1px",
                    }}
                  >
                    Date: {event.date}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      marginTop: "15px",
                    }}
                  >
                    {event.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Event ${index}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          margin: "5px",
                        }}
                      />
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "15px" }}
                    onClick={() => handleEditEvent(event)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ marginTop: "15px", marginLeft: "10px" }}
                    onClick={() => handleDeleteEvent(event._id)}
                  >
                    Delete
                  </Button>
                </Box>
              ))
            )}
          </Box>
        </Grid>
      </Box>
    </div>
  );
};

export default Addevent;
