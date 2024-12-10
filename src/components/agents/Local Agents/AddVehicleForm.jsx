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
import { useNavigate, useLocation } from "react-router-dom";

// Validating NIC
const isValidNIC = (nic) => {
  // Check if NIC has exactly 12 characters and all are numbers
  if (/^\d{12}$/.test(nic)) {
    return true;
  }
  // Check if NIC has 9 numbers followed by a letter 'v' (case insensitive)
  else if (/^\d{9}v$/i.test(nic)) {
    return true;
  }
  // If neither pattern matches, NIC is invalid
  else {
    return false;
  }
};

// Validating Contact Number
const isValidContactNumber = (contactNumber) => {
  return contactNumber.length === 10 && !isNaN(contactNumber);
};

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

const AddVehicleForm = (props) => {
  const [open, setOpen] = React.useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [gender, setGender] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [Vehiclecategory, setVehiclecategory] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [ac, setAc] = useState("");
  const [price, setPrice] = useState("");
  const [nic, setNic] = useState("");
  const [driverStatus, setDriverStatus] = useState("");
  const [description, setDescription] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [uploadEnabled, setUploadEnabled] = useState(false); // State to track upload button enable/disable
  const [locations, setLocations] = useState([]);
  // State variables for error messages
  const [nicError, setNicError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [allFieldsRequiredError, setAllFieldsRequiredError] = useState("");
  const navigate = useNavigate();
  const locate = useLocation();
  const [status, setStatus] = useState(useLocation().state?.status);
  const [isVehicleCreated, setIsVehicleCreated] = useState(false);

  const upromoCode = location.state?.promoCode;

  const handleBackClick = () => {
    navigate(-1); // Navigate back one page
  };
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
  const [storedEmail, setStoredEmail] = useState("");
  const paymentStatus = localStorage.getItem('Paymentstatus');
  const orderId = localStorage.getItem('order_id');
  console.log(paymentStatus);
  console.log(orderId);

  useEffect(() => {
    // Retrieve email from localStorage on component mount
    const email_local = localStorage.getItem("userEmail");
    setStoredEmail(email_local);
    console.log(storedEmail)
  }, []);
  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setVehicleNumber(vehicle.vehicleNumber);
    setVehiclecategory(vehicle.Vehiclecategory);
    setLocation(vehicle.location);
    setContactNumber(vehicle.contactNumber);
    setPrice(vehicle.price);
    setCapacity(vehicle.capacity);
    setAc(vehicle.ac);
    setNic(vehicle.nic);
    setDescription(vehicle.description);
    setPromoCode(upromoCode);
    setGender(vehicle.gender);
    setDriverStatus(vehicle.driverStatus);
    setExistingImages(vehicle.images || []);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditingVehicle(null);
    setSelectedImages([]);
    setExistingImages([]);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleAddVehicle = async () => {
    // Check if all fields are filled
    if (
      !vehicleNumber ||
      !Vehiclecategory ||
      !location ||
      !contactNumber ||
      !price ||
      !ac ||
      !nic ||
      !capacity ||
      !description ||
      !promoCode ||
      !gender ||
      !driverStatus
    ) {
      alert("All fields are required");
      return;
    }

    try {
      if ( paymentStatus != 'payed' && !orderId ) {
        console.log("Not passed")
        alert("Payment Required");
        return;
      };
      
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
        vehicleNumber,
        Vehiclecategory,
        location,
        email: storedEmail,
        contactNumber,
        price,
        nic,
        capacity,
        ac,
        description,
        promoCode,
        gender,
        driverStatus,
        images: [...existingImages, ...uploadedImageUrls],
      };

      if (editingVehicle) {
        await axios.put(
          `https://holidaysri-backend-9xm4.onrender.com/vehicle/update/${editingVehicle._id}`,
          vehicleData
        );
        alert("Vehicle details updated successfully!");
        window.location = `/add-vehicle`;
      } else {
        await axios.post(
          "https://holidaysri-backend-9xm4.onrender.com/vehicle/add",
          vehicleData
        );
        alert("Vehicle added successfully!");
        setStatus(null);
        window.location = `/add-vehicle`;
        localStorage.setItem('Paymentstatus', "");
        localStorage.setItem('order_id',  "");
      }

      handleClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred.");
    }
  };

  useEffect(() => {
    async function getAllVehicles() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/vehicle/"
        );
        setVehicleDetails(res.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        alert("Error fetching vehicles: " + error.message);
      }
    }
    getAllVehicles();
  }, []);

  function handleDeleteVehicle(id) {
    const r = window.confirm("Do you really want to Delete this Vehicle?");
    if (r == true) {
      axios
        .delete(
          `https://holidaysri-backend-9xm4.onrender.com/vehicle/delete/${id}`
        )
        .then((res) => {
          alert("Delete Successfully");
          window.location.reload();
          setVehicleDetails();
        });
    }
  }
  const filteredVehicles = vehicleDetails
    .slice()
    .reverse()
    .filter((vehicle) => vehicle.email === storedEmail);

  return (
    <div
      style={{
        paddingTop: "16px",
        paddingBottom: "16px",
        backgroundImage:
          'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733336852/pexels-aj-ahamad-19149700_b9hzgv_g4n2zh.webp")',
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
            Add Local Vehicles
          </Typography>
        </Box>
        {/* <Grid container justifyContent="center" alignItems="center">
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
              Back
            </Button>{" "}
          </Box>
        </Grid> */}
        <Grid container justifyContent="center" alignItems="center">
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              padding: "24px",
              borderRadius: "10px",
              marginTop: "24px",
            }}
          >
            <Box >
              <Customtextfield
                label="Vehicle Number"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                required
                marginTop="16px"
                marginBottom="16px"
                error={vehicleNumber === "" ? "Vehicle Number is required" : ""}
              />
              <FormControl fullWidth>
                <Typography marginTop="16px">Vehicle Category</Typography>
                <Select
                  sx={{ width: "95%", marginTop: "15px" }}
                  id="vehicle-category"
                  value={Vehiclecategory}
                  onChange={(e) => setVehiclecategory(e.target.value)}
                  required
                >
                  <MenuItem value={"Car"}>Car</MenuItem>
                  <MenuItem value={"Van"}>Van</MenuItem>
                  <MenuItem value={"SUV"}>SUV</MenuItem>
                  <MenuItem value={"Tuk Tuk"}>Tuk Tuk</MenuItem>
                  <MenuItem value={"Scooters and Bicks"}>
                    Scooters and Bikes
                  </MenuItem>
                  <MenuItem value={"Off Road"}>Off Road</MenuItem>
                  <MenuItem value={"Camp Van"}>Camp Van</MenuItem>
                  <MenuItem value={"Airport Taxi"}>Airport Taxi</MenuItem>
                </Select>
                {Vehiclecategory === "" && (
                  <Typography color="error">
                    Vehicle Category is required
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth>
                <Typography marginTop="16px">Driver Status</Typography>
                <Select
                  sx={{ width: "95%", marginTop: "15px" }}
                  id="vehicle-category"
                  value={driverStatus}
                  onChange={(e) => setDriverStatus(e.target.value)}
                  required
                >
                  <MenuItem value={"With Driver"}>With Driver</MenuItem>
                  <MenuItem value={"Without Driver"}>Without Driver</MenuItem>
                </Select>
                {driverStatus === "" && (
                  <Typography color="error">
                    Driver Status is required
                  </Typography>
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
                marginTop="16px"
                onChange={(e) => setPrice(e.target.value)}
                required
                error={price === "" ? "Price is required" : ""}
              />
              <Customtextfield
                label="Contact Number"
                value={contactNumber}
                marginTop="16px"
                onChange={(e) =>
                  setContactNumber(e.target.value.replace(/\D+/g, ""))
                }
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
                label="Capacity"
                value={capacity}
                marginTop="16px"
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
              <FormControl fullWidth>
                <Typography marginTop="16px">AC/Non-AC</Typography>
                <Select
                  sx={{ width: "95%", marginTop: "15px" }}
                  id="vehicle-category"
                  value={ac}
                  onChange={(e) => setAc(e.target.value)}
                  required
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
              <Customtextfield
                label="NIC"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                required
                marginTop="16px"
                error={nic === "" ? "NIC Number is required" : ""}
              />
              {/* <Customtextfield
                label="PromoCode"
                value={upromoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                required
                marginTop="16px"
                error={promoCode === "" ? "Promo Code is required" : ""}
              /> */}
              <FormControl fullWidth>
                <Typography marginTop="16px">Driver Gender</Typography>
                <Select
                  sx={{ width: "95%", marginTop: "8px" }}
                  id="demo-simple-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  error={gender === "" ? "Gender is required" : ""}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
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
                  location === "" ||
                  price === "" ||
                  contactNumber === "" ||
                  description === "" ||
                  nic === "" ||
                  promoCode === "" ||
                  gender === "" ||
                  vehicleNumber === "" ||
                  Vehiclecategory === "" ||
                  driverStatus === "" || isVehicleCreated
                }
              >
                {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Box>
    </div>
  );
};

export default AddVehicleForm;
