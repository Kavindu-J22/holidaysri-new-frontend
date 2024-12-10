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
import { useNavigate, useLocation } from "react-router-dom";

const AddFormAdmin = (props) => {
  const [storedEmail, setStoredEmail] = useState("");
  const [storedRole, setStoredRole] = useState("");

  useEffect(() => {
    // Retrieve email from localStorage on component mount
    const email_local = localStorage.getItem("userEmail");
    const user_role = localStorage.getItem("userRole");
    setStoredEmail(email_local);
    setStoredRole(user_role);
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
  const locate = useLocation();
  const status  = locate.state || {}; 

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
  };
  const handleAddVehicle = async () => {
    try {
      if (storedRole !== 'admin') return;
      
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
        email: storedEmail,
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
        window.location = `/admin`;
      } else {
        await axios.post(
          "https://holidaysri-backend-9xm4.onrender.com/hotel/add",
          vehicleData
        );
        alert("Hotel added successfully!");
        window.location = `/admin`;
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

  /*useEffect(() => {
    // Function to get user role from localStorage
    const getUserRole = () => {
      return localStorage.getItem("userRole");
    };

    // Check if the user is admin or seller
    const userRole = getUserRole();
    if (userRole === "admin" || userRole === "seller") {
      setAdminOrSeller(true); // Set state to true if user is admin or seller
    }
  }, []);*/

  const filteredHotels = hotel
    .slice()
    .reverse()
    .filter((vehicle) => vehicle.email === storedEmail);

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
            Add Hotels
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
        <Grid container justifyContent="center" alignItems="center" >
        <Box  sx={{backgroundColor:"#FFFFFF",padding:"24px",borderRadius:'10px',marginTop:'24px'}}>
       
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
           <MenuItem value={"Hotels"}>Restaurants</MenuItem>
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
        </Grid>
      </Box>

      <Box></Box>
    </div>
  );
};

export default AddFormAdmin;
