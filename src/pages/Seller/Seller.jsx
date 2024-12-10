import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  Select,
  MenuItem,FormControl 
} from "@mui/material";
import Customtextfield from "../../components/hotel/Login/Customtextfield";
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

const Seller = (props) => {
  const [open, setOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false);
    window.location.reload();
  }
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("food");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();
  const locate = useLocation();
  
  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };
  const [storedEmail, setStoredEmail] = useState('');

  useEffect(() => {
    // Retrieve email from localStorage on component mount
    const email_local = localStorage.getItem("userEmail");
    setStoredEmail(email_local);
}, []);

  const filteredProducts = 
  categoryFilter === "all" 
  ? products.filter((product) => product.email === storedEmail)
  : products.filter((product) => product.category === categoryFilter && product.email === storedEmail);
  const handleFileChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  
  const handleAddProduct = async (e) => {
    e.preventDefault();
  
   // Upload images to Cloudinary
    const uploadedImageUrls = [];
    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "aahllisc");
  
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/daa9e83as/image/upload",
          formData
        );
        uploadedImageUrls.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
        return; // Exit function if any image upload fails
      }
    }
  
    // Prepare data for adding product
    const newProduct = {
      productName,
      category,
      location,
      email:storedEmail,
      description,
      price,
      contactNumber,
      images: uploadedImageUrls, // Assign uploaded image URLs to product
    };
  
    if (editingProduct) {
      // If editing product exists, update the existing product
      axios
        .put(
          `https://holidaysri-backend-9xm4.onrender.com/product/updateProduct/${editingProduct._id}`,
          newProduct
        )
        .then(() => {
          alert("The Product was Successfully updated");
          window.location.reload(); // Reload the page after update
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      // Otherwise, add a new product
      axios
        .post("https://holidaysri-backend-9xm4.onrender.com/product/add", newProduct)
        .then(() => {
          alert("The New Product was Successfully saved");
          window.location.reload(); // Reload the page after adding
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  
  const handleEdit = (product) => {
    // Set editingProduct state and populate the input fields with existing details
    setEditingProduct(product);
    setProductName(product.productName);
    setCategory(product.category);
    setLocation(product.location);
    setDescription(product.description);
    setPrice(product.price);
    setContactNumber(product.contactNumber);
    setOpen(true); // Open the modal for editing
  };
  useEffect(() => {
    async function getAllVehicles() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/product/"
        );
        console.log('Fetched product data:', res.data);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        alert("Error fetching vehicles: " + error.message);
      }
    }
    getAllVehicles();
  }, []);

  const handleCheckoutProduct = async () => {
    try {
      const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
      const id = '65f58296f707aa390b10db8a';
      
      // Fetch rates from the backend
      const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
      const rates = responseRates.data.rate;
  
      // Navigate to checkout page with the fetched rates and discount
      navigate('/seller-form', { 
        state: { 
          discount: rates.discountProductsPercentage, 
          path: '/foreign-dashboard',
          currency: 'LKR',
          items: 'Products Advertisement',
          earns: rates.earningRate,
        } 
      });
    } catch (error) {
      console.error('Error fetching rates or navigating to checkout:', error.message);
    }
  };

  function handleDeleteProduct(id) {
    const r = window.confirm("Do you really want to Delete this Vehicle?");
    if (r == true) {
      axios
        .delete(`https://holidaysri-backend-9xm4.onrender.com/product/delete/${id}`)
        .then((res) => {
          alert("Delete Successfully");
          window.location.reload();
          setProducts();
        });
    }
  }
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
  const [adminOrSeller, setAdminOrSeller] = useState(false);

  useEffect(() => {
     const getUserRole = () => {
       return localStorage.getItem("userRole");
     };
 
     const userRole = getUserRole();
     setAdminOrSeller(userRole)
   }, []);
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
            Add Products
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
        </Button> 
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
              onClick={handleCheckoutProduct}
            >
              ADD Product
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
              label="Product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <Typography marginTop="16px">Select Product Category</Typography>
            <Select
              sx={{ width: "95%", marginTop: "8px" }}
              value={category}
              onChange={handleChange}
            >
              <MenuItem sx={{color:'black'}} value={"food"}>food</MenuItem>
              <MenuItem sx={{color:'black'}} value={"gift packs"}>gift Packages</MenuItem>
              <MenuItem sx={{color:'black'}} value={"souvenirs"}>souvenirs</MenuItem>
              <MenuItem sx={{color:'black'}} value={"collectibles"}>collectibles</MenuItem>
            </Select>
           
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
              label="Description"
              marginTop="16px"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Customtextfield
              label="Price"
              value={price}
              marginTop="16px"
              onChange={(e) => setPrice(e.target.value)}
            />
            <Customtextfield
              label="ContactNumber"
              value={contactNumber}
              marginTop="16px"
              onChange={(e) => setContactNumber(e.target.value)}
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
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded ${index}`}
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
              onClick={handleAddProduct}
            >
              Add
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
          Select Product Category
        </Typography>
        <Select
          value={categoryFilter}
          onChange={handleCategoryChange}
          sx={{
            width: "60%",
            marginTop: "8px",
            color: "black",
            backgroundColor: "white",
          }}
          id="demo-simple-select"
        >
          <MenuItem value={"all"} sx={{ color: "black" }}>
            All
          </MenuItem>
          <MenuItem value={"food"} sx={{ color: "black" }}>
            Food
          </MenuItem>
          <MenuItem value={"gift packs"} sx={{ color: "black" }}>
            Gift Packages
          </MenuItem>
          <MenuItem value={"souvenirs"} sx={{ color: "black" }}>
            Souvenirs
          </MenuItem>
          <MenuItem value={"collectibles"} sx={{ color: "black" }}>
            Collectibles
          </MenuItem>
        </Select>
        <Typography
          fontSize={{ lg: "24px", xs: "22px" }}
          sx={{ color: "white" }}
          marginTop="32px"
        >
          {categoryFilter === "all" ? "All Products" : `All ${categoryFilter}`}
        </Typography>
      </Box>
      {filteredProducts.map((product) => (
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
          <Grid item xs={12} lg={3}>
          <Box width={{ lg: "70%" }} height={{ lg: "70%" }}>
           {product.images && product.images.length > 0 && product.images.map((image, index) => (
             <img
              key={index}
               src={image}
               width="100%"
               height="100%"
               style={{ borderRadius: "30px" }}
               alt={`Product ${index + 1}`}
               />
                ))}
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
               Item: {product.productName}
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
                Location : {product.location}
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
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "400",
                  fontSize: { lg: "16px", xs: "16px" },
                  textAlign: "left",
                  marginTop: "8px",
                }}
              >
                Description: {product.description}
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
                Price: {product.price}
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
                onClick={() => handleDeleteProduct(product._id)}
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

      <Modal
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Customtextfield
            label="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Customtextfield
            label="Product Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Customtextfield
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Customtextfield
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Customtextfield
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Customtextfield
            label="ContactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
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
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
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
            sx={{
              borderRadius: "30px",
              borderColor: "black",
              boxShadow: "none",
              width: { lg: "100%", xs: "100%" },
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
            onClick={handleAddProduct}
          >
            Add
          </Button>
        </Box>
      </Modal>
      <Box></Box>
    </div>
  );
};

export default Seller;
