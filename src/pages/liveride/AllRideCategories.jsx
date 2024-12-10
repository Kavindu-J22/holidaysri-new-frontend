import React, { useRef, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Modal,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import Nav from "../Nav/Nav";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Customtextfield from "../../components/hotel/Login/Customtextfield";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 600, xs: 280, md: 900 },
  backgroundColor: "rgba(48, 103, 84, 0.9)",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};
const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 600, xs: 280, md: 900 },
  backgroundColor: "rgba(95, 95, 95, 1)",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};
const updateModalStyle = {
  ...styles,
  width: { lg: 800, xs: 300, sm: 700, md: 900 },
};

const AllridesCategory = () => {
  const gridRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedRideForUpdate, setSelectedRideForUpdate] = useState(null);
  const [updatedRoute, setUpdatedRoute] = useState("");
  const [updatedMaximum, setUpdatedMaximum] = useState(0);
  const [updatedAvailability, setUpdatedAvailability] = useState(0);
  const [updatedCurrentLocation, setUpdatedCurrentLocation] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("");
  
  const [editingLiveRide, setEditingLiveRide] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [liveRideDetails, setLiveRideDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getAllRides();
  }, []);

  const getAllRides = async () => {
    try {
      const res = await axios.get(
        "https://holidaysri-backend-9xm4.onrender.com/realTime/"
      );
      setLiveRideDetails(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching live rides:", error);
      setLoading(false);
      alert("Error fetching live rides: " + error.message);
    }
  };

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateOpen = (event) => {
    setSelectedRideForUpdate(event);
    setUpdatedRoute(event.Route);
    setUpdatedMaximum(event.Maximum);
    setUpdatedAvailability(event.Availability);
    setUpdatedCurrentLocation(event.CurrentLocation);
    setUpdatedStatus(event.Status);
    setUpdatedPhoneNumber(event.phoneNumber);
    setExistingImages(event.images || []);
    
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setEditingLiveRide(null);
    setSelectedImages([]);
    setExistingImages([]);
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRouteChange = (event) => {
    setUpdatedRoute(event.target.value);
  };

  const handleMaximumChange = (event) => {
    setUpdatedMaximum(event.target.value);
  };

  const handleAvailabilityChange = (event) => {
    setUpdatedAvailability(event.target.value);
  };

  const handleCurrentLocationChange = (event) => {
    setUpdatedCurrentLocation(event.target.value);
  };

  const handleStatusChange = (event) => {
    setUpdatedStatus(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setUpdatedPhoneNumber(event.target.value);
  };

  const filteredRides = () => {
    const params = new URLSearchParams(location?.search);
    const email = params?.get("email");
  
    if (email) {
      return liveRideDetails.filter(
        (liveRide) => 
          liveRide.email.toLowerCase() === email.toLowerCase() &&
          liveRide.DailyOrMonth === "Monthly" // Filter for Monthly
      );
    } else {
      return liveRideDetails.filter(
        (liveRide) => liveRide.DailyOrMonth === "Monthly" // Filter for Monthly
      );
    }
  };
  

  const updateRide = async () => {
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

      const updatedRide = {
        Route: updatedRoute,
        Maximum: updatedMaximum,
        Availability: updatedAvailability,
        CurrentLocation: updatedCurrentLocation,
        Status: updatedStatus,
        phoneNumber: updatedPhoneNumber,
        images: [...existingImages, ...uploadedImageUrls],
      };
      await axios.put(
        `https://holidaysri-backend-9xm4.onrender.com/realTime/update/${selectedRideForUpdate._id}`,
        updatedRide
      );
      // Reload the ride details after update
      getAllRides();
      // Close the update modal
      handleUpdateClose();
    } catch (error) {
      console.error("Error updating ride:", error);
      alert("Error updating ride: " + error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>All Live Rides</title>
      </Helmet>
      <Nav />
      <Grid
        container
        sx={{
          position: "relative",
          minHeight: "100vh",
          paddingBottom: "40px",
          paddingTop: { lg: "80px", xs: "80px" },
          overflow: "hidden",
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage:
              'url("https://i2.pickpik.com/photos/152/506/327/road-night-light-traffic-preview.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            filter: "blur(3px)",
            zIndex: -1,
          },
        }}
      >
        <Grid item xs={12}>
          {filteredRides().length === 0 && (
            <Typography
              variant="h5"
              style={{ textAlign: "center", marginTop: "20px", color: "white" }}
            >
              No rides available at the moment.
            </Typography>
          )}
          <Grid item xs={12}>
            <Box marginBottom="0px" marginLeft="32px" marginTop="16px">
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
            <Grid container justifyContent="center" alignItems="center">
              <Box
                sx={{
                  width: { lg: "1100px", xs: "300px", md: "100%", sm: "100%" },
                  marginLeft: { lg: "20px", xs: "20px", md: "5%", sm: "5%" },
                }}
              >
                <Typography
                  fontSize={{ lg: "24px", xs: "22px" }}
                  sx={{ color: "white" }}
                  marginTop="16px"
                >
                  All Rides
                </Typography>
                <Grid container spacing={2} marginTop="8px">
                  {filteredRides().map((event, index) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        lg={3}
                        md={4}
                        sm={4}
                        sx={{
                          borderColor: "black",
                          borderRadius: "30px",
                          backgroundColor: "rgba(255,255,255, 0.5)",
                          padding: "24px",
                          marginLeft: "8px",
                          marginTop: "8px",
                        }}
                        key={event._id}
                      >
                        <Typography
                          sx={{
                            color: "black",
                            fontWeight: "600",
                            fontSize: { lg: "20px", xs: "20px" },
                            textAlign: "left",
                          }}
                        >
                          Route: {event.Route}
                        </Typography>
                        <Typography
                          id="modal-modal-description"
                          color="black"
                          sx={{
                            mt: 1,
                            fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                          }}
                        >
                          Max Passenger Count: {event.Maximum}
                        </Typography>
                        <Typography
                          id="modal-modal-description"
                          color="black"
                          sx={{
                            mt: 1,
                            fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                          }}
                        >
                          Available-Passenger Count: {event.Availability}
                        </Typography>
                        <Grid container sx={{ mt: 1 }}>
                          <Grid item lg={6} xs={6} sm={7} md={5}>
                            <Typography
                              id="modal-modal-description"
                              color="black"
                            >
                              Status: {event.Status}
                            </Typography>
                          </Grid>
                          <Grid item lg={4} xs={6} sm={5} md={5}>
                            <Typography
                              id="modal-modal-description"
                              color="black"
                              marginTop={{ lg: "-4px", xs: "-3px" }}
                              marginLeft={{ lg: "-8px", xs: "-16px" }}
                            >
                              {event.Status === "Active" ? (
                                <svg
                                  width="7"
                                  height="7"
                                  viewBox="0 0 7 7"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.5 7C5.433 7 7 5.433 7 3.5C7 1.567 5.433 0 3.5 0C1.567 0 0 1.567 0 3.5C0 5.433 1.567 7 3.5 7Z"
                                    fill="#32D583"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="7"
                                  height="8"
                                  viewBox="0 0 7 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.5 7.21899C5.433 7.21899 7 5.65199 7 3.71899C7 1.786 5.433 0.218994 3.5 0.218994C1.567 0.218994 0 1.786 0 3.71899C0 5.65199 1.567 7.21899 3.5 7.21899Z"
                                    fill="#850919"
                                  />
                                </svg>
                              )}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "4px 12px",
                      border: "1px solid",
                      borderRadius: "20px",
                      display: "inline-block",
                      margin: "5px",
                      color: new Date(event.expirationDate) < new Date() ? "red" : "green",
                      borderColor: new Date(event.expirationDate) < new Date() ? "red" : "green",
                      backgroundColor: new Date(event.expirationDate) < new Date() ? "rgba(255, 0, 0, 0.1)" : "rgba(0, 128, 0, 0.1)",
                    }}
                  >
                    {new Date(event.expirationDate) < new Date() ? "Expired" : "Active"}
                  </Typography>

                        <Button
                          onClick={() => handleOpen(event)}
                          variant="outlined"
                          sx={{
                            color: "black",
                            borderColor: "black",
                            borderRadius: "30px",
                            marginTop: "16px",
                            width: "100%",
                          }}
                        >
                          View More
                        </Button>
                        <Button
                          onClick={() => handleUpdateOpen(event)}
                          variant="outlined"
                          sx={{
                            color: "black",
                            borderColor: "black",
                            borderRadius: "30px",
                            marginTop: "16px",
                            width: "100%",
                          }}
                        >
                          Update
                        </Button>

                        {new Date(event.expirationDate) < new Date() && (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "orange",
                            color: "white",
                            borderRadius: "30px",
                            marginTop: "16px",
                            marginLeft: "10px", // To add some space between the buttons
                          }}
                          onClick={() => navigate('/expiredaddpage')}
                        >
                          Renew
                        </Button>
                      )}

                      </Grid>
                    );
                  })}{" "}
                </Grid>
              </Box>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  {selectedEvent && (
                    <>
                      <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                        color="white"
                        fontWeight={600}
                      >
                        Vehicle Number: {selectedEvent.vehicleID}
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        color="white"
                        marginTop="8px"
                      >
                        {selectedEvent.Route}
                      </Typography>
                      <Grid container>
                        <Grid item xs={12} lg={6}>
                          <Typography
                            id="modal-modal-description"
                            color="white"
                            sx={{ mt: 2 }}
                          >
                            Maximum Passengers: {selectedEvent.Maximum}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Typography
                            id="modal-modal-description"
                            color="white"
                            sx={{ mt: 2 }}
                          >
                            Available Passengers: {selectedEvent.Availability}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <a
                            href={selectedEvent.CurrentLocation}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Typography
                              id="modal-modal-description"
                              color="white"
                              sx={{ mt: 2 }}
                            >
                              <svg
                                width="15"
                                height="21"
                                viewBox="0 0 15 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.49984 10.0208C6.86442 10.0208 6.25503 9.76838 5.80573 9.31907C5.35642 8.86976 5.104 8.26037 5.104 7.62496C5.104 6.98954 5.35642 6.38016 5.80573 5.93085C6.25503 5.48154 6.86442 5.22913 7.49984 5.22913C8.13525 5.22913 8.74464 5.48154 9.19395 5.93085C9.64325 6.38016 9.89567 6.98954 9.89567 7.62496C9.89567 7.93958 9.8337 8.25113 9.7133 8.54181C9.5929 8.83248 9.41642 9.0966 9.19395 9.31907C8.97147 9.54154 8.70736 9.71802 8.41668 9.83842C8.12601 9.95882 7.81446 10.0208 7.49984 10.0208ZM7.49984 0.916626C5.72068 0.916626 4.01439 1.62339 2.75633 2.88145C1.49827 4.13951 0.791504 5.8458 0.791504 7.62496C0.791504 12.6562 7.49984 20.0833 7.49984 20.0833C7.49984 20.0833 14.2082 12.6562 14.2082 7.62496C14.2082 5.8458 13.5014 4.13951 12.2433 2.88145C10.9853 1.62339 9.279 0.916626 7.49984 0.916626Z"
                                  fill="#F8F8F8"
                                />
                              </svg>{" "}
                              Current Location: {selectedEvent.CurrentLocation}
                            </Typography>
                          </a>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Typography
                            id="modal-modal-description"
                            color="white"
                            sx={{ mt: 2 }}
                          >
                            Status: {selectedEvent.Status}{" "}
                            {selectedEvent.Status === "Active" ? (
                              <svg
                                width="7"
                                height="7"
                                viewBox="0 0 7 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.5 7C5.433 7 7 5.433 7 3.5C7 1.567 5.433 0 3.5 0C1.567 0 0 1.567 0 3.5C0 5.433 1.567 7 3.5 7Z"
                                  fill="#32D583"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="7"
                                height="8"
                                viewBox="0 0 7 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.5 7.21899C5.433 7.21899 7 5.65199 7 3.71899C7 1.786 5.433 0.218994 3.5 0.218994C1.567 0.218994 0 1.786 0 3.71899C0 5.65199 1.567 7.21899 3.5 7.21899Z"
                                  fill="#850919"
                                />
                              </svg>
                            )}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Typography
                            id="modal-modal-description"
                            color="white"
                            sx={{ mt: 2 }}
                          >
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.612 13.4388L14.222 11.8288C14.4388 11.6146 14.7132 11.468 15.0118 11.4068C15.3103 11.3455 15.6202 11.3723 15.9039 11.4838L17.8661 12.2672C18.1527 12.3836 18.3985 12.5822 18.5724 12.838C18.7464 13.0938 18.8407 13.3954 18.8436 13.7047V17.2985C18.8419 17.5089 18.7977 17.7168 18.7135 17.9097C18.6294 18.1026 18.5071 18.2765 18.354 18.4208C18.2009 18.5652 18.0201 18.6771 17.8226 18.7498C17.6251 18.8225 17.415 18.8545 17.2048 18.8438C3.45512 17.9885 0.680744 6.34472 0.156056 1.88847C0.1317 1.66963 0.153954 1.44812 0.221353 1.23851C0.288753 1.02889 0.399771 0.835924 0.547105 0.672296C0.694438 0.508668 0.874747 0.378089 1.07617 0.28915C1.27759 0.200211 1.49556 0.154928 1.71574 0.156279H5.18731C5.49709 0.157196 5.79952 0.250772 6.0557 0.424969C6.31187 0.599167 6.51007 0.846021 6.62481 1.13378L7.40824 3.09597C7.52343 3.37848 7.55281 3.68868 7.49273 3.9878C7.43265 4.28692 7.28577 4.56171 7.07043 4.77784L5.46043 6.38784C5.46043 6.38784 6.38762 12.6625 12.612 13.4388Z"
                                fill="#F8F8F8"
                              />
                            </svg>{" "}
                            {selectedEvent.phoneNumber}
                          </Typography>
                        </Grid>
                      </Grid>{" "}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mt: 2,
                        }}
                      >
                        <Button
                          onClick={handleClose}
                          variant="outlined"
                          sx={{
                            color: "black",
                            borderColor: "black",
                            borderRadius: "30px",
                            marginTop: "16px",
                            "&:hover": {
                              borderColor: "red",
                            },
                          }}
                        >
                          Close
                        </Button>
                      </Box>{" "}
                    </>
                  )}
                </Box>
              </Modal>
              <Modal
                open={updateOpen}
                onClose={handleUpdateClose}
                aria-labelledby="modal-update-title"
                aria-describedby="modal-update-description"
              >
                <Box sx={updateModalStyle}>
                  {selectedRideForUpdate && (
                    <>
                      <Typography
                        id="modal-update-title"
                        variant="h6"
                        component="h2"
                        color="black"
                        fontWeight={600}
                      >
                        Update Ride Details
                      </Typography>
                      <Customtextfield
                        marginTop="16px"
                        label="Route"
                        value={updatedRoute}
                        onChange={handleRouteChange}
                      />
                      <Grid container marginTop={{ lg: "16px", xs: "16px" }}>
                        <Grid item lg={4} xs={12} sm={6} md={6}>
                          <Customtextfield
                            id="maximum"
                            label="Maximum Passengers"
                            type="number"
                            width={{ lg: "200px" }}
                            value={updatedMaximum}
                            onChange={handleMaximumChange}
                          />
                        </Grid>
                        <Grid
                          item
                          lg={4}
                          xs={12}
                          sm={4}
                          md={4}
                          marginTop={{
                            lg: "0px",
                            xs: "16px",
                            md: "0px",
                            sm: "0px",
                          }}
                        >
                          <Customtextfield
                            id="availability"
                            label="Available Passengers"
                            type="number"
                            width={{ lg: "200px" }}
                            value={updatedAvailability}
                            onChange={handleAvailabilityChange}
                          />
                        </Grid>
                        <Grid
                          item
                          lg={4}
                          sm={12}
                          md={12}
                          marginTop={{ lg: "0px", xs: "16px" }}
                        >
                          <Customtextfield
                            id="phoneNumber"
                            label="Contact Number"
                            width={{ lg: "200px" }}
                            value={updatedPhoneNumber}
                            onChange={handlePhoneNumberChange}
                          />
                        </Grid>
                      </Grid>
                      <Grid container marginTop={{ lg: "16px", xs: "16px" }}>
                        <Grid item lg={10} sm={9} md={9} xs={12}>
                          <Customtextfield
                            id="currentLocation"
                            label="Current Location"
                            value={updatedCurrentLocation}
                            onChange={handleCurrentLocationChange}
                          />
                        </Grid>
                        <Grid item lg={2} xs={12} md={2} sm={2}>
                          <Typography
                            sx={{ color: "black" }}
                            marginTop={{
                              lg: "0px",
                              xs: "16px",
                              sm: "0px",
                              md: "0px",
                            }}
                          >
                            Status
                          </Typography>
                          <Select
                            id="status"
                            sx={{ borderColor: "black" }}
                            value={updatedStatus}
                            onChange={handleStatusChange}
                          >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Offline">Offline</MenuItem>
                          </Select>
                          <div>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="uploadImageInput"
                onChange={handleFileChange}
                multiple // Allow multiple file selection
                required
              />
              <label htmlFor="uploadImageInput">
                <Button
                  variant="outlined"
                  sx={{
                    color: "black",
                    borderRadius: "30px",
                    borderColor: "black",
                    "&:hover": {
                      color: "black",
                      borderRadius: "30px",
                      borderColor: "black",
                    },
                    marginTop: "24px",
                    marginBottom: "16px",
                  }}
                  component="span"
                >
                  Upload images
                </Button>
              </label>
              {selectedImages === null && (
                <Typography color="error">Image is required</Typography>
              )}
              <div>
              {selectedImages.map((image, index) => (
                  <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      margin: "5px",
                    }}
                  />
                ))}
                {existingImages.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`existing-${index}`}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    margin: "5px",
                  }}
                />
              ))}
              </div>
            </div>
                        </Grid>
                      </Grid>

                      <Button
                        onClick={updateRide}
                        variant="outlined"
                        sx={{
                          color: "black",
                          borderColor: "black",
                          borderRadius: "30px",
                          marginTop: "24px",
                          marginLeft: {
                            lg: "80%",
                            sm: "75%",
                            md: "75%",
                            xs: "40%",
                          },
                          width: "150px",
                          "&:hover": {
                            borderColor: "red",
                          },
                        }}
                      >
                        Save
                      </Button>
                    </>
                  )}
                </Box>
              </Modal>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AllridesCategory;
