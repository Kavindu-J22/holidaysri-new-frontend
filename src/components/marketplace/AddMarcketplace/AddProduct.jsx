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

import Customtextfield from "../../hotel/Login/Customtextfield";
import axios from "axios"; // Import axios for making HTTP requests

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

const AddProduct = (props) => {
  const [open, setOpen] = React.useState(false);
  //const [editingProduct, setEditingProduct] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  //const [images, setImages] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [productName, setproductName] = useState("");
  const [category, setcategory] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [productDetails, setProductDetails] = useState([]);

  const [uploadEnabled, setUploadEnabled] = useState(false); // State to track upload button enable/disable

  // State variables for error messages
  const [nicError, setNicError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [allFieldsRequiredError, setAllFieldsRequiredError] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const [locations, setLocations] = useState([]);

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
  const handleEdit = (product) => {
    setEditingProduct(product);
    setproductName(product.productName);
    setcategory(product.category);
    setLocation(product.location);
    setContactNumber(product.contactNumber);
    setPrice(product.price);
    setDescription(product.description);
    setExistingImages(product.images || []);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
    //window.location.reload();
    setSelectedImages([]);
    setExistingImages([]);
  };

  const handleFileChange = (event) => {
    /*const selectedImage = event.target.files[0];
    // Handle the selected image, you may want to upload it or perform other actions
    setImages(selectedImage);*/
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
 

  };

  const handleAddVehicle = async () => {
    // Check if all fields are filled
    if (
      !productName ||
      !category ||
      !location ||
      !contactNumber ||
      !price ||
      !description 
      
    ) {
      alert("All fields are required");
      return;
    }

    // Validate Contact Number
    if (!isValidContactNumber(contactNumber)) {
      alert("Invalid contact number");
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
      //const imageUrl = cloudinaryResponse.data.secure_url;
      uploadedImageUrls.push(cloudinaryResponse.data.secure_url);
    }
      const vehicleData = {
        productName,
        category,
        location,
        description,
        price,
        contactNumber,
        images: [...existingImages, ...uploadedImageUrls],
      };

      if (editingProduct) {
        await axios.put(
          `https://holidaysri-backend-9xm4.onrender.com/product/updateProduct/${editingProduct._id}`,
          vehicleData
        );
        alert("Product details updated successfully!");
        window.location = `/add-product`;
      } else {
        await axios.post(
          "https://holidaysri-backend-9xm4.onrender.com/product/add",
          vehicleData
        );
        alert("Product added successfully!");
        window.location = `/add-product`;
      }

      handleClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred.");
    }
  };

  useEffect(() => {
    async function getAllproducts() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/product/"
        );
        setProductDetails(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products: " + error.message);
      }
    }
    getAllproducts();
  }, []);

  function handleDeleteVehicle(id) {
    const r = window.confirm("Do you really want to Delete this Product?");
    if (r == true) {
      axios
        .delete(
          `https://holidaysri-backend-9xm4.onrender.com/product/delete/${id}`
        )
        .then((res) => {
          alert("Product Deleted Successfully");
          window.location.reload();
          setProductDetails();
        });
    }
  }

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
              fontSize: { lg: "50px", xs: "14px" },
              letterSpacing: { lg: "20px", xs: "8px" },
            }}
          >
            Add Products & Foods
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
                width: { lg: "200px", xs: "68%" },
                backgroundColor: "white",
                color: "black",
                marginTop: { lg: "32px", xs: "0px" },
                height: "48px",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "black",
                  boxShadow: "none",
                },
              }}
              onClick={handleOpen}
            >
              ADD Products/Food
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
              label="Product Name"
              value={productName}
              onChange={(e) => setproductName(e.target.value)}
            />
            <FormControl fullWidth>
              <Typography marginTop="16px">Product Category</Typography>
              <Select
                sx={{ width: "60%", marginTop: "15px" }}
                id="product-category"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              >
                <MenuItem value={"food"}>Food</MenuItem>
                <MenuItem value={"gift packages"}>Gift packages</MenuItem>
                <MenuItem value={"souvenirs"}>Souvenirs</MenuItem>
                <MenuItem value={"collectibles"}>Collectibles</MenuItem>
              </Select>
            </FormControl>
           
            <FormControl fullWidth>
              <Typography marginTop="16px">Location</Typography>
              <Select
                sx={{ width: "60%", marginTop: "15px" }}
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
            />
            <Customtextfield
              label="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <Customtextfield
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              marginTop="8px"
            />
            <div>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="uploadImageInput"
                onChange={handleFileChange}
                multiple // Allow multiple file selection
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
                    marginTop: "16px",
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
            >
               {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </Box>
        </Modal>
        <Grid container justifyContent="center" alignItems="center">
          <>
            <Box
              sx={{
                width: { lg: "1100px", xs: "300px" },
              }}
            >
              <Typography marginTop="16px" sx={{ color: "white" }}>
                Available Products:
              </Typography>
            </Box>
            {productDetails.map((product) => (
              <Box
                key={product._id}
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
                        {product.images.map((image, index) => (
                          <Grid item key={index} xs={6} lg={4}>
                            <Box
                              sx={{
                                width: { lg: "200px", xs: "100px" },
                                height: { lg: "200px", xs: "100px" },
                              }}
                            >
                              <img
                                src={image}
                                style={{ width: "100%", height: "100%" }}
                                alt={`Image ${index + 1}`}
                              />
                            </Box>
                          </Grid>
                        ))}
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
                      }}
                    >
                      Product Name: {product.productName}
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
                      Product Category: {product.category}
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
                      Product Location: {product.location}
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
                      Product Description: {product.description}
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
                      Product Price: {product.price}
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
                      Contact Number: {product.contactNumber}
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "white",
                        borderColor: "white",
                        borderRadius: "30px",
                        marginTop: "16px",
                      }}
                      onClick={() => handleEdit(product)}
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
                      onClick={() => handleDeleteVehicle(product._id)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </>
          {/*.map ends */}
        </Grid>
      </Box>

    
      <Box></Box>
    </div>
  );
};

export default AddProduct;
