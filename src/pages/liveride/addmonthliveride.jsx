import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  Box,
  FormControl,
  CircularProgress
} from "@mui/material";
import './addrideform.css'; // Importing the CSS file for styling

const AddMonthRideForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImages, setSelectedImages] = useState([]);
  const [vehicleID, setVehicleID] = useState('');
  const [Route, setRoute] = useState('');
  const [vehicleOwnerName, setVehicleOwnerName] = useState('');
  const [price, setPrice] = useState('');
  const [Maximum, setMaximum] = useState('');
  const [ApxTime, setApxTime] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [Availability, setAvailability] = useState('');
  const [CurrentLocation, setCurrentLocation] = useState('');
  const [Description, setDescription] = useState('');
  const [statusField, setStatusField] = useState('Offline');
  const [images, setImages] = useState([]);
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [finalPath, setFinalPath] = useState(0);
  const [currency, setCurrency] = useState(0);
  const [rate, setRate] = useState(0);
  const [payment, setPayment] = useState('');
  const [items, setItems] = useState(0);
  const [earns, setEarns] = useState(0);
  const locate = useLocation();
  const [subscriptionField, setSubscriptionField] = useState('Daily');
  const [rideDate, setRideDate] = useState('');
  const [rideTime, setRideTime] = useState('');
  const [storedEmail, setStoredEmail] = useState("");
  const [userVehicles, setUserVehicles] = useState([]); // To store user vehicles data
  const [hasVehicles, setHasVehicles] = useState(false); // Flag to check if user has vehicles

  const [loading, setLoading] = useState(false); // Loading state

  const handleFileChange = event => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  };

  const prepareDataForRide = async () => {
    try {
      const uploadedImageUrls = [];
      
      // Upload images to Cloudinary
      for (const image of images) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'aahllisc');

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/daa9e83as/image/upload',
          formData
        );
        uploadedImageUrls.push(response.data.secure_url);
      }

      // Prepare the data for adding a ride
      return {
        vehicleID,
        Route,
        vehicleOwnerName,
        Maximum,
        phoneNumber,
        subscription: subscriptionField,
        email: storedEmail,
        price,
        Availability,
        CurrentLocation,
        Description,
        Status: statusField,
        images: uploadedImageUrls,
        rideDate,
        rideTime,
        ApxTime
      };
    } catch (error) {
      console.error('Error preparing data for ride:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("userEmail");
    setStoredEmail(user);

    // Fetch rates and discount amount from previous page
    if (locate.state) {
      const { discount, rate, path, currency, items, earns, payment } = locate.state;
      setDiscountPercentage(discount);
      setFinalPath(path);
      setCurrency(currency);
      setItems(items);
      setEarns(earns);
      setRate(rate);
      setPayment(payment);
    }

    // Fetch user's vehicle data
    const fetchUserVehicles = async () => {
      try {
        const responseVehicles = await axios.get(
          `https://holidaysri-backend-9xm4.onrender.com/vehicle/vehicle?email=${user}`
        );
        const vehicles = responseVehicles.data;
        setUserVehicles(vehicles);
        setHasVehicles(vehicles && vehicles.length > 0);
        console.log(vehicles.vehicles);

      } catch (error) {
        console.error("Error fetching user vehicles:", error);
      }
    };

    fetchUserVehicles();
  }, [locate.state]);

  const paymentStatus = localStorage.getItem('Paymentstatus');
  const orderId = localStorage.getItem('order_id');
  console.log(paymentStatus); // Should print 'payed'
  console.log(orderId); // Should print '12345-test-order'

  const goBack = () => {
    navigate('/foreign-dashboard');
  };

  const handleCheckoutLiveRide = async (e) => {
    e.preventDefault();

    // Create a list of required fields and their values
    const requiredFields = {
      "Vehicle Number": vehicleID,
      "Route": Route,
      "Rider Name": vehicleOwnerName,
      "Maximum No of Passengers": Maximum,
      "Price per ride": price,
      "Present passenger count": Availability,
      "Contact Number": phoneNumber,
      "Current Location": CurrentLocation,
      "Description": Description,
      "Ride Date": rideDate,
      "Ride Time": rideTime,
      "Images": images.length > 0,
      "Approximate Time Duration (minimum 1hrs)": ApxTime
    };

    // Find unfilled required fields
    const unfilledFields = Object.keys(requiredFields).filter(field => !requiredFields[field]);


    // Function to calculate expirationDate as one month from now
    const getExpirationDateOneMonthFromNow = () => {
      const expirationDate = new Date(); // Current date
      expirationDate.setMonth(expirationDate.getMonth() + 1); // Add one month to the current date
      return expirationDate.toISOString().slice(0, 10); // Return in 'YYYY-MM-DD' format
    };

    if (unfilledFields.length > 0) {
      alert(`The following fields are required: ${unfilledFields.join(', ')}`);
      return;
    }

    try {
      // Check if payment has been made
      if (userVehicles.length <= 0 && paymentStatus !== 'payed' && !orderId) {
        console.log("Payment not passed..");
        alert("Payment Required");
        return;
      }

      setLoading(true); // Start loading
      const newProduct = await prepareDataForRide();

      const newEvent = {
        vehicleID,
        Route,
        email: storedEmail, // Email from localStorage
        vehicleOwnerName,
        Maximum,
        price,
        phoneNumber,
        Availability,
        CurrentLocation,
        Description,
        Status: statusField,
        subscription: subscriptionField,
        rideDate,
        rideTime,
        images: newProduct.images,
        DailyOrMonth: "Monthly",
        ApxTime,
        expirationDate: getExpirationDateOneMonthFromNow(), // Set expirationDate to one month from today
      };

      await axios.post(
        "https://holidaysri-backend.onrender.com/realTime/add",
        newEvent
      );

      alert("The New Live Ride was Successfully added");
      navigate('/foreign-dashboard');
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleClose = () => {
    setSelectedImages([]);
  };

  return (
    <div style={{
      paddingTop: "16px",
      paddingBottom: "16px",
      backgroundImage: 'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733336447/pexels-photo-1072179_frjk63_js026i.webp")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
    }}>
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: "16px" }}>
        <Button
          variant="outlined"
          sx={{
            color: "#FFFFFF",
            borderColor: "#FFFFFF",
            borderRadius: "30px",
            marginLeft:'16px'
          }}
          onClick={goBack}
        >
          Back
        </Button>
        <Typography sx={{ color: "#FFFFFF", fontSize:'32px', paddingLeft: {lg:'4.3%',xs:"16px"}, paddingTop: "0px" }}>
          Add New Live Ride
        </Typography>
      </div>

      <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
        <div className="add-ride-form-container">
          <form onSubmit={handleCheckoutLiveRide}>
            {userVehicles.length != 0 ? (
            <Typography>
                Select vehicle number *
              <FormControl fullWidth margin="normal">
                <Select
                  name="vehicleID"
                  value={vehicleID}
                  onChange={(e) => setVehicleID(e.target.value)}
                  required
                >
                  {userVehicles.vehicles.map(vehicle => (
                    <MenuItem key={vehicle._id} value={vehicle.vehicleNumber}>
                      {vehicle.vehicleNumber}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Typography>
            ) : (
              <TextField
                label="Vehicle Number"
                name="vehicleID"
                value={vehicleID}
                onChange={(e) => setVehicleID(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
            )}
            
            <TextField
              label="Route"
              name="route"
              value={Route}
              onChange={(e) => setRoute(e.target.value)}
              required
              fullWidth
              placeholder='Kandy - Colombo'
              margin="normal"
            />
            <TextField
              label="Rider Name"
              name="vehicleOwnerName"
              value={vehicleOwnerName}
              onChange={(e) => setVehicleOwnerName(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price per ride"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Maximum No of Passengers"
              name="Maximum"
              value={Maximum}
              onChange={(e) => setMaximum(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Present passenger count"
              name="Availability"
              value={Availability}
              onChange={(e) => setAvailability(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Contact Number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Current Location"
              name="CurrentLocation"
              value={CurrentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="Description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <TextField
              label="Approximate Time Duration (minimum 1hrs)"
              name="ApxTime"
              type="number"
              value={ApxTime}
              onChange={(e) => setApxTime(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Ride Date"
              type="date"
              name="rideDate"
              value={rideDate}
              onChange={(e) => setRideDate(e.target.value)}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <TextField
              label="Ride Time"
              type="time"
              name="rideTime"
              value={rideTime}
              onChange={(e) => setRideTime(e.target.value)}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <Typography>Status</Typography>
              <Select
                name="status"
                value={statusField}
                onChange={(e) => setStatusField(e.target.value)}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
              </Select>
            </FormControl>

            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="uploadImageInput"
              onChange={handleFileChange}
              multiple
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

            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: 2 }}
              fullWidth
              disabled={loading} // Disable button while loading
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Ride'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMonthRideForm;
