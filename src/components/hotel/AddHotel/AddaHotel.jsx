import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import Customtextfield from "../../../components/hotel/Login/Customtextfield";
import axios from "axios"; // Import axios for making HTTP requests
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 640, xs: 250 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
  height: { lg: "600px", xs: "550px" },
  overflow: "auto",
};
import { useNavigate } from 'react-router-dom';

const AddHotelForm = (props) => {
  const [storedEmail, setStoredEmail] = useState('');

  useEffect(() => {
    // Retrieve email from localStorage on component mount
    const email_local = localStorage.getItem("userEmail");
    setStoredEmail(email_local);
}, []);

  const [open, setOpen] = React.useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [email, setEmail] = useState("");
  const [fb, setFb] = useState("");
  const [googleMap, setGoogleMap] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [hotel, setHotel] = useState([]);
  const [uploadEnabled, setUploadEnabled] = useState(false); // State to track upload button enable/disable
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  const [fullboardPrice, setfullboardPrice] = useState("");
  const [halfboardPrice, sethalfboardPrice] = useState("");
  const [liquor, setliquor] = useState("");
  const [smoke, setsmoke] = useState("");
  const [roomType, setroomType] = useState("");
  const [roomCapacity, setroomCapacity] = useState("");
  const [parking, setparking] = useState("");
  const [internet, setinternet] = useState("");
  const [bbqFacilities, setbbqFacilities] = useState("");
  const [chef, setchef] = useState("");
  const [activities, setactivities] = useState("");
  const [cctv, setcctv] = useState("");



  useEffect(() => {
    async function getAllLocations() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/location/"
        );
        setLocations(res.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }
    getAllLocations();
  }, []);

  useEffect(() => {
    setLocations(
      locations.sort((a, b) => a.locationName.localeCompare(b.locationName))
    );
  }, [locations]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCheckoutHotel = async () => {
    try {
      const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
      const id = '65f58296f707aa390b10db8a';
      
      // Fetch rates from the backend
      const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
      const rates = responseRates.data.rate;
  
      // Navigate to checkout page with the fetched rates and discount
      navigate('/checkout', { 
        state: { 
          discount: rates.discounthotelPercentage, 
          rate: rates.hotelAdvertiseRate,
          path: '/add-Hotel-Form',
          currency: 'LKR',
          items: 'Hotel Advertisement',
          earns: rates.earningRate,
        } 
      });
    } catch (error) {
      console.error('Error fetching rates or navigating to checkout:', error.message);
    }
  };

  const handleEdit = async (vehicle) => {
    setEditingHotel(vehicle);
    setHotelName(vehicle.hotelName);
    setCategory(vehicle.category);
    setEmail(storedEmail);
    setLocation(vehicle.location);
    setContactNumber(vehicle.contactNumber);
    setPrice(vehicle.price);
    setDescription(vehicle.description);
    setFb(vehicle.fb);
    setGoogleMap(vehicle.googleMap);
    setWhatsappNumber(vehicle.whatsappNumber);
    setWebUrl(vehicle.webUrl);
    setfullboardPrice(vehicle.fullboardPrice);
    sethalfboardPrice(vehicle.halfboardPrice);
    setliquor(vehicle.liquor);
    setsmoke(vehicle.smoke);
    setroomType(vehicle.roomType);
    setroomCapacity(vehicle.roomCapacity);
    setparking(vehicle.parking);
    setinternet(vehicle.internet);
    setbbqFacilities(vehicle.bbqFacilities);
    setchef(vehicle.chef);
    setactivities(vehicle.activities);
    setcctv(vehicle.cctv);
    setExistingImages(vehicle.images || []);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingHotel(null);
    setSelectedImages([]);
    setExistingImages([]);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  }
  const handleAddVehicle = async () => {
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
      const vehicleData = {
        hotelName,
        category,
        email:storedEmail,
        location,
        contactNumber,
        price,
        fb,
        description,
        googleMap,
        webUrl,
        whatsappNumber,
        fullboardPrice,
        halfboardPrice,
        liquor,
        smoke,
        roomType,
        roomCapacity,
        parking,
        internet,
        bbqFacilities,
        chef,
        activities,
        cctv,
        images: [...existingImages, ...uploadedImageUrls],
      };

      if (editingHotel) {
        await axios.put(
          `https://holidaysri-backend-9xm4.onrender.com/hotel/updateHotel/${editingHotel._id}`,
          vehicleData
        );
        alert("Hotel details updated successfully!");
        window.location = `/add-Hotel`;
      } else {
        await axios.post(
          "https://holidaysri-backend-9xm4.onrender.com/hotel/add",
          vehicleData
        );
        alert("Hotel added successfully!");
        window.location = `/add-Hotel`
      }

      handleClose();
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Error occurred. An image upload is required. Please upload an image "
      );
    }
  };

  useEffect(() => {
    async function getAllVehicles() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/hotel/"
        );
        setHotel(res.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        alert("Error fetching vehicles: " + error.message);
      }
    }
    getAllVehicles();
  }, []);

  function handleDeleteVehicle(id) {
    const r = window.confirm("Do you really want to Delete this Hotel?");
    if (r == true) {
      axios
        .delete(
          `https://holidaysri-backend-9xm4.onrender.com/hotel/delete/${id}`
        )
        .then((res) => {
          alert("Delete Successfully");
          window.location.reload();
          setHotel();
        });
    }
  }

  const [adminOrSeller, setAdminOrSeller] = useState(false);

 useEffect(() => {
    // Function to get user role from localStorage
    const getUserRole = () => {
      return localStorage.getItem("userRole");
    };

    // Check if the user is admin or seller
    const userRole = getUserRole();
    setAdminOrSeller(userRole)
  }, []);

  const filteredHotels = hotel.slice().reverse().filter((vehicle) => vehicle.email === storedEmail);

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
        backgroundImage:
          'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337203/Hotel-Swimming-pool-Night5616x3744_tnmeim_rbugpk.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          margin: { lg: "40px", xs: "16px" },
          padding: { lg: "24px", xs: "10px" },
          borderRadius: "20px",
        }}
      >
        <Box textAlign="center" marginTop={{ lg: "4%", xs: "4%" }}>
          <Typography
            sx={{
              color: "white",
              fontFamily: "inter",
              fontSize: { lg: "50px", xs: "18px" },
              letterSpacing: "20px",
            }}
          >
            Add/Edit Hotels 
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
        </Button> {' '}
            
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
                onClick={handleCheckoutHotel}
              >
                ADD Hotel 
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
       
            <Customtextfield
              label="Hotel Name "
              value={hotelName}
              marginTop="16px"
              onChange={(e) => setHotelName(e.target.value)}
              required
              error={hotelName === "" ? "Hotel name is required" : ""}
            />
            <FormControl fullWidth>
              <Typography marginTop="16px">Category</Typography>
              <Select
                sx={{ width: "95%", marginTop: "15px" }}
                id="vehicle-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <MenuItem value={"Hotels"}>Hotels</MenuItem>
                <MenuItem value={"Apartments"}>Apartments</MenuItem>
                <MenuItem value={"resorts"}>Resorts</MenuItem>
                <MenuItem value={"Villas"}>Villas</MenuItem>
                <MenuItem value={"Bungalows"}>Bungalows</MenuItem>
              </Select>
              {category === "" && (
                <Typography color="error">Category is required</Typography>
              )}
            </FormControl>
            {/* <Customtextfield
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              error={location === "" ? "Location is required" : ""}
            /> */}
            <FormControl fullWidth>
              <Typography marginTop="16px">Location</Typography>
              <Select
                sx={{ width: "95%", marginTop: "15px" }}
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              >
                {locations.map((location) => (
                  <MenuItem key={location._id} value={location.locationName}>
                    {location.locationName}
                  </MenuItem>
                ))}
              </Select>
              {location === "" && (
                <Typography color="error">Location is required</Typography>
              )}
            </FormControl>
            <Customtextfield
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              marginTop="16px"
              error={price === "" ? "Price is required" : ""}
            />
             <Customtextfield
              label="Fullboard Price"
              value={fullboardPrice}
              onChange={(e) => setfullboardPrice(e.target.value)}
              required
              marginTop="16px"
              error={price === "" ? "Price is required" : ""}
            />
             <Customtextfield
              label="Halfboard Price"
              value={halfboardPrice}
              onChange={(e) => sethalfboardPrice(e.target.value)}
              required
              marginTop="16px"
              error={price === "" ? "Price is required" : ""}
            />
            <FormControl fullWidth>
              <Typography marginTop="16px">Liquor Use</Typography>
              <Select
                sx={{ width: "95%", marginTop: "15px" }}
                id="vehicle-category"
                value={liquor}
                onChange={(e) => setliquor(e.target.value)}
                required
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
             
            </FormControl>
            <FormControl fullWidth>
              <Typography marginTop="16px">Smoking</Typography>
              <Select
                sx={{ width: "95%", marginTop: "15px" }}
                id="vehicle-category"
                value={smoke}
                onChange={(e) => setsmoke(e.target.value)}
                required
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
             
            </FormControl>
            <FormControl fullWidth>
              <Typography marginTop="16px">Room Type</Typography>
              <Select
                sx={{ width: "95%", marginTop: "15px" }}
                id="vehicle-category"
                value={roomType}
                onChange={(e) => setroomType(e.target.value)}
                required
              >
                <MenuItem value={"AC"}>AC</MenuItem>
                <MenuItem value={"Non-AC"}>Non-AC</MenuItem>
              </Select>
             
            </FormControl>

            <Customtextfield
              label="Room Capacity"
              value={roomCapacity}
              onChange={(e) =>
                setroomCapacity(e.target.value)
              }
              marginTop="16px"
              required
              error={
                contactNumber === ""
                  && "Room Capacity is required"
              }
            />

            <FormControl fullWidth>
              <Typography marginTop="16px">Parking</Typography>
              <Select
                sx={{ width: "95%", marginTop: "15px" }}
                id="vehicle-category"
                value={parking}
                onChange={(e) => setparking(e.target.value)}
                required
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
             
            </FormControl>
            <FormControl fullWidth>
              <Typography marginTop="16px">Internet/Wifi</Typography>
              <Select
                sx={{ width: "95%", marginTop: "15px" }}
                id="vehicle-category"
                value={internet}
                onChange={(e) => setinternet(e.target.value)}
                required
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Typography marginTop="16px">BBQ Facilities</Typography>
              <Select
                sx={{ width: "95%", marginTop: "15px" }}
                id="vehicle-category"
                value={bbqFacilities}
                onChange={(e) => setbbqFacilities(e.target.value)}
                required
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Typography marginTop="16px">Chef</Typography>
              <Select
                sx={{ width: "95%", marginTop: "15px" }}
                id="vehicle-category"
                value={chef}
                onChange={(e) => setchef(e.target.value)}
                required
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <Customtextfield
              label="Activities"
              value={activities}
              onChange={(e) =>
                setactivities(e.target.value)
              }
              marginTop="16px"
              required
              error={
                contactNumber === ""
                  && "Room Capacity is required"
              }
            />

            <FormControl fullWidth>
              <Typography marginTop="16px">CCTV Facilities</Typography>
              <Select
                sx={{ width: "95%", marginTop: "15px" }}
                id="vehicle-category"
                value={cctv}
                onChange={(e) => setcctv(e.target.value)}
                required
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <Customtextfield
              label="Contact Number"
              value={contactNumber}
              onChange={(e) =>
                setContactNumber(e.target.value.replace(/\D+/g, ""))
              }
              marginTop="16px"
              required
              error={
                contactNumber === ""
                  ? "Contact number is required"
                  : !/^\d{10,}$/.test(contactNumber)
                  ? "Contact number must be at least 10 digits and contain only numbers"
                  : ""
              }
            />
            <Customtextfield
              label="Whatsapp Number"
              value={whatsappNumber}
              onChange={(e) =>
                setWhatsappNumber(e.target.value.replace(/\D+/g, ""))
              }
              marginTop="16px"
              required
              error={
                whatsappNumber === ""
                  ? "Whatsapp number is required"
                  : !/^\d{10,}$/.test(whatsappNumber)
                  ? "Whatsapp number must be at least 10 digits"
                  : ""
              }
            />
            <Customtextfield
              label="Facebook Page Link"
              value={fb}
              onChange={(e) => setFb(e.target.value)}
              required
              marginTop="16px"
              error={fb === "" ? "Facebook page link is required" : ""}
            />
            <Customtextfield
              label="Web link"
              value={webUrl}
              onChange={(e) => setWebUrl(e.target.value)}
              required
              marginTop="16px"
              error={webUrl === "" ? "Web link is required" : ""}
            />
            <Customtextfield
              label="Google Map Link"
              value={googleMap}
              onChange={(e) => setGoogleMap(e.target.value)}
              required
              marginTop="16px"
              error={googleMap === "" ? "Google map link is required" : ""}
            />
            <Customtextfield
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              marginTop="16px"
              required
              error={description === "" ? "Description is required" : ""}
            />
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
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                borderRadius: "30px",
                borderColor: "black",
                boxShadow: "none",
                width: { lg: "48%", xs: "48%" },
                color: "black",
                marginTop: "32px",
                height: "48px",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                  borderColor: "black",
                  boxShadow: "none",
                },
              }}
            >
              Cancel
            </Button>{" "}
            <Button
              variant="outlined"
              sx={{
                borderRadius: "30px",
                borderColor: "black",
                boxShadow: "none",
                width: { lg: "48%", xs: "48%" },
                color: "black",
                marginTop: "32px",
                height: "48px",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                  borderColor: "black",
                  boxShadow: "none",
                },
              }}
              onClick={handleAddVehicle}
              disabled={
                hotelName === "" ||
                category === "" ||
                location === "" ||
                price === "" ||
                contactNumber === "" ||
                whatsappNumber === "" ||
                fb === "" ||
                webUrl === "" ||
                googleMap === "" ||
                description === "" 
              }
            >
              {editingHotel ? "Update Hotel" : "Add Hotel"}
            </Button>
          </Box>
        </Modal>
        <Grid container justifyContent="center" alignItems="center">
          <>
            <Box
              sx={{
                width: { lg: "1100px", xs: "300px" },
              }}
            ></Box>
<Box>
            {filteredHotels.length > 0 ? (
                filteredHotels.map((vehicle) => (
                  <Box
                  key={vehicle._id}
                  border={3}
                  sx={{
                    width: { lg: "1100px", xs: "280px" },
                    borderColor: "black",
                    borderRadius: "30px",
                    backgroundColor: "rgba(48, 103, 84, 0.5)",
                    padding: "24px",
                    marginTop: { lg: "16px", xs: "16px" },
                  }}
                >
                  <Grid container spacing={2}>
                  <Grid item xs={12} lg={12}>
                <Box width={{ lg: "70%" }} height={{ lg: "70%" }}>
                    <Grid container spacing={2}>
                      {/*Image Array call*/}
                      <Grid container spacing={2} >
                      {/* Map through the images array of each location */}
                      {vehicle.images.map((image, index) => (
                     <Grid item key={index} xs={6} lg={3}>
                      <Box
                              sx={{
                                width: { lg: "200px", xs: "100px" },
                                height: { lg: "200px", xs: "100px" },
                              }}
                            >
                     <img
                     src={image}
                     width="100%"
                     height="100%"
                     style={{ borderRadius: "8px" }}
                     alt={`Image ${index + 1}`}
                    />
                    </Box>
                  </Grid>
                ))}
              </Grid>
                       {/*Image Array end*/}
                    </Grid>
                  </Box>
                </Grid>
                    <Grid item xs={12} lg={9}>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "24px", xs: "20px" },
                          textAlign: "left",
                          marginTop:"-40px"
                        }}
                      >
                        {vehicle.hotelName} 
                      </Typography>

                    <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "4px 12px",
                      border: "1px solid",
                      borderRadius: "20px",
                      display: "inline-block",
                      color: new Date(vehicle.expirationDate) < new Date() ? "red" : "green",
                      borderColor: new Date(vehicle.expirationDate) < new Date() ? "red" : "green",
                      backgroundColor: new Date(vehicle.expirationDate) < new Date() ? "rgba(255, 0, 0, 0.1)" : "rgba(0, 128, 0, 0.1)",
                    }}
                  >
                    {new Date(vehicle.expirationDate) < new Date() ? "Expired" : "Active"}
                  </Typography>

                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Category: {vehicle.category}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Location: {vehicle.location}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Contact Number: {vehicle.contactNumber}
                      </Typography>
                      <Grid container>
                        <Grid item xs={4}>
                        <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Full Board Price: {vehicle.fullboardPrice}
                      </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Half Board Price: {vehicle.halfboardPrice}
                      </Typography>
                        </Grid>
                       
                      </Grid>
                      <Grid container>
                        <Grid item xs={4}>
                        <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Liquor: {vehicle.liquor?"Yes":"No"}
                      </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Smoke: {vehicle.smoke?"Yes":"No"}
                      </Typography>
                        </Grid>
                        <Grid container>
                        <Grid item xs={4}>
                        <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        CCTV: {vehicle.cctv?"Yes":"No"}
                      </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        BBQ Facilities: {vehicle.bbqFacilities?"Yes":"No"}
                      </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Chef: {vehicle.chef?"Yes":"No"}
                      </Typography>
                        </Grid>
                      </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={3}>
                        <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Room Type: {vehicle.roomType}
                      </Typography>
                        </Grid>
                        <Grid item xs={3}>
                        <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Room Capacity: {vehicle.roomCapacity}
                      </Typography>
                        </Grid>
                        <Grid item xs={3}>
                        <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Parking: {vehicle.parking?"Yes":"No"}
                      </Typography>
                        </Grid>
                        <Grid item xs={3}>
                        <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Internet: {vehicle.internet?"Yes":"No"}
                      </Typography>
                        </Grid>
                      </Grid>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Activities: {vehicle.activities}
                      </Typography>
                      
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Price : {vehicle.price}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Whatsapp Number :
                        <a
                          href={`https://wa.me/${vehicle.whatsappNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          {vehicle.whatsappNumber}
                        </a>
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                          width: { lg: "700px", xs: "200px" },
                          whiteSpace: "nowrap", // Add this line to prevent wrapping
                          overflow: "hidden", // Optional: hide any overflow if the link exceeds the width
                          textOverflow: "ellipsis", // Optional: add ellipsis (...) if the link exceeds the width
                        }}
                      >
                        <a
                          href={vehicle.fb}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          FB page : {vehicle.fb}
                        </a>
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                          width: { lg: "700px", xs: "200px" },
                          whiteSpace: "nowrap", // Add this line to prevent wrapping
                          overflow: "hidden", // Optional: hide any overflow if the link exceeds the width
                          textOverflow: "ellipsis", // Optional: add ellipsis (...) if the link exceeds the width
                        }}
                      >
                        <a
                          href={vehicle.webUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          Web URL : {vehicle.webUrl}
                        </a>
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                          width: { lg: "700px", xs: "200px" },
                          whiteSpace: "nowrap", // Add this line to prevent wrapping
                          overflow: "hidden", // Optional: hide any overflow if the link exceeds the width
                          textOverflow: "ellipsis", // Optional: add ellipsis (...) if the link exceeds the width
                        }}
                      >
                        <a
                          href={vehicle.googleMap}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          Google Map Link : {vehicle.googleMap}
                        </a>
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: { lg: "16px", xs: "16px" },
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        Description: {vehicle.description}
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{
                          color: "white",
                          borderColor: "white",
                          borderRadius: "30px",
                          marginTop: "16px",
                        }}
                        onClick={() => handleEdit(vehicle)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="outlined"
                        sx={{
                          color: "white",
                          borderColor: "white",
                          borderRadius: "30px",
                          marginTop: "16px",
                        }}
                        onClick={() => handleDeleteVehicle(vehicle._id)}
                      >
                        Delete
                      </Button>

                      {new Date(vehicle.expirationDate) < new Date() && (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "green",
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
                  </Grid>
                </Box>
                ))
            ) : (
                <Typography variant="body1">No data available</Typography>
            )}
        </Box>
         
          
          </>
          {/*.map ends */}
        </Grid>
      </Box>

      <Box></Box>
    </div>
  );
};

export default AddHotelForm;
