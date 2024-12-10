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
  InputLabel,
} from "@mui/material";
import Customtextfield from "../../components/hotel/Login/Customtextfield";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate, useLocation } from "react-router-dom";

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

const AddSellerForm = (props) => {
  const [open, setOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("food");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [subscription, setSubscription] = useState('Monthly');
  const [subscriptionOptions, setSubscriptionOptions] = useState(['Monthly']);
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [finalPath, setFinalPath] = useState(0);
  const [currency, setCurrency] = useState(0);
  const [items, setItems] = useState(0);
  const [earns, setEarns] = useState(0);
  const navigate = useNavigate();
  const locate = useLocation();

  const handleBackClick = () => {
    navigate(-1); // Navigate back one page
  };
  const handleCategoryChange1 = (event) => {
    setCategoryFilter(event.target.value);
  };
  const [storedEmail, setStoredEmail] = useState("");

  useEffect(() => {
    if (category === 'food') {
      setSubscriptionOptions(['Monthly', 'Daily']);
    } else {
      setSubscriptionOptions(['Monthly']);
      setSubscription('Monthly');
    }
  }, [category]);

  useEffect(() => {
    // Retrieve email from localStorage on component mount
    const email_local = localStorage.getItem("userEmail");
    setStoredEmail(email_local);

    // Fetch rates and discount amount from previous page
    if (locate.state) {
      const { discount, path, currency, items, earns } = locate.state;
      setDiscountPercentage(discount);
      setFinalPath(path);
      setCurrency(currency);
      setItems(items);
      setEarns(earns);
    }
  }, [locate.state]);
  
  const filteredProducts =
    categoryFilter === "all"
      ? products.filter((product) => product.email === storedEmail)
      : products.filter(
          (product) =>
            product.category === categoryFilter && product.email === storedEmail
        );
  const handleFileChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubscriptionChange = (e) => {
    setSubscription(e.target.value);
  };

  const prepareDataForCheckout = async () => {
    try {
      const uploadedImageUrls = [];
      for (const image of images) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "aahllisc");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/daa9e83as/image/upload",
          formData
        );
        uploadedImageUrls.push(response.data.secure_url);
      }

      return {
        productName,
        category,
        location,
        email: storedEmail,
        description,
        subscription,
        price,
        contactNumber,
        images: uploadedImageUrls
      };
    } catch (error) {
      console.error('Error preparing data for checkout:', error.message);
      throw error;
    }
  };

  const handleCheckout = async () => {
    if (
      !productName ||
      !category ||
      !location ||
      !storedEmail ||
      !description ||
      !subscription ||
      !price ||
      !contactNumber ||
      !images  
    ) {
      alert("All fields are required");
      return;
    }
    
    try {
      const newProduct = await prepareDataForCheckout();

      const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
      const id = '65f58296f707aa390b10db8a';
      
      // Fetch rates from the backend
      const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
      const rates = responseRates.data.rate;

      // Determine rate based on subscription state
      const subscriptionRate = (subscription === 'Monthly' && category === 'food') ? rates.monthlyFoodRate
                      : (subscription === 'Daily' && category === 'food') ? rates.dailyFoodRate
                      : rates.productsAdvertiseRate;

      const earnRate = subscription === 'Monthly' ? rates.monthlyEarnRate : rates.dailyEarnRate;

      const discountRate = subscription === 'Monthly' ? rates.discountMonthlyPercentage : rates.discountDailyPercentage;

      // Navigate to checkout page with necessary details and function identifier
      navigate('/checkupdate', { 
        state: { 
          discount: discountRate, 
          rate: subscriptionRate,
          path: '/foreign-dashboard',
          currency: 'LKR',
          items: 'Product Advertisement',
          earns: earnRate,
          postFunctionData: {
            url: "https://holidaysri-backend-9xm4.onrender.com/product/add",
            data: newProduct
          } 
        } 
      });
    } catch (error) {
      console.error('Error during checkout process:', error.message);
    }
  };

  const handleEdit = (product) => {
    // Set editingProduct state and populate the input fields with existing details
    setEditingProduct(product);
    setProductName(product.productName);
    setCategory(product.category);
    setLocation(product.location);
    setDescription(product.description);
    setSubscription(product.subscription);
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
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        alert("Error fetching vehicles: " + error.message);
      }
    }
    getAllVehicles();
  }, []);

  function handleDeleteProduct(id) {
    const r = window.confirm("Do you really want to Delete this Vehicle?");
    if (r == true) {
      axios
        .delete(
          `https://holidaysri-backend-9xm4.onrender.com/product/delete/${id}`
        )
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
              fontSize: { lg: "30px", xs: "18px" },
              letterSpacing: "10px",
            }}
          >
            Add Products / Food Items
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
            </Button>
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
            <Box>
              <Customtextfield
                label="Product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <Typography marginTop="16px">Select Product Category</Typography>
              <Select
                sx={{ width: "95%", marginTop: "8px",marginBottom:'16px' }}
                value={category}
                onChange={handleCategoryChange}
              >
                <MenuItem sx={{ color: "black" }} value={"food"}>
                  food
                </MenuItem>
                <MenuItem sx={{ color: "black" }} value={"gift packs"}>
                  gift Packages
                </MenuItem>
                <MenuItem sx={{ color: "black" }} value={"souvenirs"}>
                  souvenirs
                </MenuItem>
                <MenuItem sx={{ color: "black" }} value={"collectibles"}>
                  collectibles
                </MenuItem>
              </Select>
              <InputLabel id="subscription-label">Subscription</InputLabel>
        <Select
          labelId="subscription-label"
          value={subscription}
          onChange={handleSubscriptionChange}
          disabled={category !== 'food'}
        >
          {subscriptionOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
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
                onClick={handleCheckout}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Grid>
      </Box>
    </div>
  );
};

export default AddSellerForm;
