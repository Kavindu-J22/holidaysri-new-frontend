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

const AddRideForm = () => {
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

        // Function to calculate expirationDate
        const getExpirationDate = (rideDate, rideTime, ApxTime) => {
            // Combine rideDate and rideTime into a single Date object
            const rideDateTimeStr = `${rideDate}T${rideTime}:00.000+00:00`;
            const rideDateObj = new Date(rideDateTimeStr);

            // Add ApxTime (in hours) to the Date object
            const expirationDateObj = new Date(rideDateObj.getTime() + ApxTime * 60 * 60 * 1000); // ApxTime in milliseconds

            // Convert the expirationDate to ISO 8601 format
            return expirationDateObj.toISOString();
        };

        // Calculate expiration date using the getExpirationDate function
        const expirationDate = getExpirationDate(rideDate, rideTime, ApxTime);

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
            ApxTime,
            expirationDate // Add expiration date to the returned object
        };
    } catch (error) {
        console.error('Error preparing data for ride:', error.message);
        throw error;
    }
};

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


    if (unfilledFields.length > 0) {
      alert(`The following fields are required: ${unfilledFields.join(', ')}`);
      return;
    }

    try {

      setLoading(true); // Start loading

      const newProduct = await prepareDataForRide();

      const backendUrl = "https://holidaysri-backend-9xm4.onrender.com";
      const id = "65f58296f707aa390b10db8a";

      // Fetch rates from the backend
      const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
      const rates = responseRates.data.rate;


     // Get the current date and expiration date
     const currentDate = new Date();
     const expirationDate = new Date(newProduct.expirationDate);

     // Calculate the difference in time (in milliseconds)
     const timeDiff = expirationDate.getTime() - currentDate.getTime();

     // If the timeDiff is negative, calculate how many days have expired
     let expiredDays = 0;
     if (timeDiff < 0) {
       expiredDays = Math.ceil(Math.abs(timeDiff) / (1000 * 60 * 60 * 24));
     }

     // Calculate day count (for current or future days) - defaults to 1 if count is less than 1
     const dayCount = Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)), 1); 

     // Adjust discount, rate, and earns based on dayCount
     const adjustedDiscount = rates.discountDailyPercentage * dayCount;
     const adjustedRate = rates.liveRideDailyRate * dayCount;
     const adjustedEarns = rates.dailyEarnRate * dayCount;

     console.log(`Expired Days: ${expiredDays}`); // Log the expired days for debugging


    // Convert expiration date to an ISO formatted string (readable version)
    const formattedExpirationDateTime = (isoDateString) => {
      const date = new Date(isoDateString); // Use isoDateString parameter instead of newProduct.expirationDate

      const year = date.getUTCFullYear(); // Get the year
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Get the month (0-indexed, so add 1)
      const day = String(date.getUTCDate()).padStart(2, '0'); // Get the day

      const hours = date.getUTCHours(); // Get the hours
      const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Get the minutes
      const period = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM

      // Convert hours to 12-hour format
      const formattedHours = hours % 12 || 12; // If hours is 0, set it to 12

      return `${year}.${month}.${day} ${formattedHours}.${minutes} ${period}`;
    };

// Display alert with summary details
  alert(
    `🎉 Daily Live Ride Booking Confirmation..! 🎉\n\n` +
    `The daily live ride price is ${rates.liveRideDailyRate} LKR per day.\n\n` +
    `You selected a live ride date, and it ends at ${formattedExpirationDateTime(newProduct.expirationDate)}.\n\n` +
    `For the ${dayCount} Day, total charge will be ${adjustedRate} LKR.\n\n` +
    `If you use an Agent Code, we will discount ${adjustedDiscount} LKR from your total.\n\n` +
    `🌟 ✨ Be safe and good luck fulfilling your ride with a maximum passenger count! ✨ 🌟`
  );

   // Navigate to the next step
   navigate("/checkusers", {
    state: {
      discount: adjustedDiscount,
      rate: adjustedRate,
      path: "/foreign-dashboard",
      currency: "LKR",
      items: "Live Ride Advertisement",
      earns: adjustedEarns,
      payment: "/payheredailypay",
      postFunctionData: {
        url: "https://holidaysri-backend.onrender.com/realTime/add",
        data: newProduct,
      },
    },
  });

    setLoading(false); // Stop loading when successful

  } catch (error) {
    setLoading(false); // Stop loading on failure
    console.error("Error during checkout process:", error.message);
  }

  };


  const handleClose = () => {
    setOpen(false);
    setSelectedImages([]);
    setExistingImages([]);
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
        <style>
          {`
            @media (max-width: 600px) {
              h2 {
                padding-top: 8px;
              }
            }
          `}
        </style>
      </div>

      <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
        <div className="add-ride-form-container">
          <form onSubmit={handleCheckoutLiveRide}>
            <TextField
              label="Vehicle Number"
              name="vehicleID"
              value={vehicleID}
              onChange={(e) => setVehicleID(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
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
              name="maximum"
              type="number"
              value={Maximum}
              onChange={(e) => setMaximum(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Present passenger count"
              name="availability"
              type="number"
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
              name="currentLocation"
              value={CurrentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
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
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Ride Time"
              type="time"
              name="rideTime"
              value={rideTime}
              onChange={(e) => setRideTime(e.target.value)}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Description"
              name="description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              margin="normal"
              multiline
              rows={4}
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

export default AddRideForm;
