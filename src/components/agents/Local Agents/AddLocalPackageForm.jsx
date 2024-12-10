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
import { useNavigate, useLocation } from 'react-router-dom';


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

const AddLocalPackageForm = (props) => {
  const [open, setOpen] = React.useState(false);
  const [editingLocalPackage, setEditingLocalPackage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [localPackageName, setlocalPackageName] = useState("");
  const [category, setcategory] = useState("");
  const [location, setLocation] = useState("");
  const [mobile, setmobile] = useState("");
  const [price, setPrice] = useState("");
  const [LocalPackage, setLocalPackage] = useState([]);

  const [activities, setactivities] = useState("");
  const [description, setDescription] = useState("");
  const [uploadEnabled, setUploadEnabled] = useState(false); // State to track upload button enable/disable
  const [locations, setLocations] = useState([]);
  // State variables for error messages
  const navigate = useNavigate();
  const locate = useLocation();
  const status = locate.state || {}; // Get status from location state
  const paymentStatus = localStorage.getItem('Paymentstatus');
  const orderId = localStorage.getItem('order_id');
  console.log(paymentStatus);
  console.log(orderId);
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
  const [storedEmail, setStoredEmail] = useState('');

  useEffect(() => {
    // Retrieve email from localStorage on component mount
    const email_local = localStorage.getItem("userEmail");
    setStoredEmail(email_local);
  }, []);
  const handleEdit = (localPackage) => {

    setEditingLocalPackage(localPackage);
    setlocalPackageName(localPackage.localPackageName);
    setcategory(localPackage.category);
    setLocation(localPackage.location);
    setmobile(localPackage.mobile);
    setPrice(localPackage.price);
    setDescription(localPackage.description);
    setactivities(localPackage.activities);
    setExistingImages(localPackage.images || []);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditingLocalPackage(null);
    setSelectedImages([]);
    setExistingImages([]);
  };



  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };


  const handleAddPackage = async () => {

    // Check if all fields are filled
    if (
      !localPackageName ||
      !category ||
      !location ||
      !mobile ||
      !price ||
      !description ||
      !activities

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

      const packageData = {
        localPackageName,
        category,
        location,
        email: storedEmail,
        mobile,
        price,
        description,
        activities,
        images: [...existingImages, ...uploadedImageUrls],
      };

      if (editingLocalPackage) {
        await axios.put(
          `https://holidaysri-backend-9xm4.onrender.com/localPackage/update/${editingLocalPackage._id}`,
          packageData
        );
        alert("Local package details updated successfully!");
        window.location = `/add-local-package`;
      } else {
        await axios.post(
          "https://holidaysri-backend-9xm4.onrender.com/localPackage/add",
          packageData
        );
        alert("Local package added successfully!");
        window.location = `/add-local-package`;
      }

      handleClose();

    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred.");
    }
  };

  useEffect(() => {
    async function getAllPackages() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/localPackage"
        );
        setLocalPackage(res.data);
      } catch (error) {
        console.error("Error fetching Local package:", error);
        alert("Error fetching Local package: " + error.message);
      }
    }
    getAllPackages();
  }, []);

  function handleDeleteLocalPackage(id) {
    const r = window.confirm("Do you really want to Delete this Local package?");
    if (r == true) {
      axios
        .delete(`https://holidaysri-backend-9xm4.onrender.com/localPackage/delete/${id}`)
        .then((res) => {
          alert("Delete Successfully");
          window.location.reload();
          setLocalPackage();
        });
    }
  }
  const filteredPackages = LocalPackage.slice().reverse().filter((localPackage) => localPackage.email === storedEmail);

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
          padding: { lg: "24px", xs: "10px",md:'20px',sm:'20px' },
          borderRadius: "20px",
        }}
      >
        <Box textAlign="center" marginTop={{ lg: "4%", xs: "4%" }}>
          <Typography
            sx={{
              color: "white",
              fontFamily: "inter",
              fontSize: { lg: "50px", xs: "18px",md:'32px',sm:'32px' },
              letterSpacing: "20px",
            }}
          >
            Add Local Package
          </Typography>
        </Box>
        {/* <Grid container justifyContent="center" alignItems="center">
          <Box
            sx={{
              width: { lg: "1100px", xs: "300px",md:"600px",sm:'500px' },
            }}
            marginTop="40px"
          >
            <Button
              variant="outlined"
              sx={{
                borderRadius: "30px",
                borderColor: "black",
                boxShadow: "none",
                width: { lg: "200px", xs: "48%",sm:'200px',md:'200px' },
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
            </Button> {' '}
           
          </Box>
        </Grid> */}
       
        <Grid container justifyContent="center" alignItems="center">
          <>
           
            <Box
            sx={{
              backgroundColor: "#FFFFFF",
              padding: "24px",
              borderRadius: "10px",
              marginTop: "24px",
              width:{lg:'600px',xs:'300px',sm:'500px',md:"600px"}
            }}
          >
            <Customtextfield
              label="Package Name"
              value={localPackageName}
              onChange={(e) => setlocalPackageName(e.target.value)}
              required
              marginTop="16px"
              marginBottom="16px"
              error={localPackageName === "" ? "package name is required" : ""}
            />
            <FormControl fullWidth>
              <Customtextfield
                label="People Count"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
                required
                marginTop="16px"
                marginBottom="16px"
                error={category === "" ? "category is required" : ""}
              />
            </FormControl>
            <FormControl fullWidth>
              <Customtextfield
                label="Activities"
                value={activities}
                onChange={(e) => setactivities(e.target.value)}
                required
                marginTop="16px"
                marginBottom="16px"
                error={activities === "" ? "activities are  required" : ""}
              />

            </FormControl>

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
              label="Price in US Dollars ($)"
              value={price}
              marginTop="16px"
              onChange={(e) => setPrice(e.target.value)}
              required
              error={price === "" ? "Price is required" : ""}
            />
            <Customtextfield
              label="Contact Number"
              value={mobile}
              marginTop="16px"
              onChange={(e) =>
                setmobile(e.target.value.replace(/\D+/g, ""))
              }
              required
              error={
                mobile === ""
                  ? "Contact number is required"
                  : !/^\d{10,}$/.test(mobile)
                    ? "Contact number must be at least 10 digits and contain only numbers"
                    : ""
              }
            />
            <Customtextfield
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              marginTop="16px"
              required
              error={description === "" ? "Description is required" : ""}
            />
            <div >
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
              onClick={handleAddPackage}
              disabled={
                location === "" ||
                price === "" ||
                mobile === "" ||
                description === "" ||
                localPackageName === "" ||
                category === "" ||
                activities === ""
              }
            >
              {editingLocalPackage ? "Update Local Package" : "Add Local Package"}
            </Button>
          </Box>
          </>
          {/*.map ends */}
        </Grid>
      </Box>


      <Box></Box>
    </div>
  );
};

export default AddLocalPackageForm;
