import React, { useState } from "react";
import {
  Grid,
  Button,
  CircularProgress,
  Typography,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Link,
} from "@mui/material";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    countryCode: "+94", // Default country code
    password: "",
    confirmPassword: "",
  });

  const handleMenuClick = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleCloseClick = () => {
    setPopupVisible(false);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setPopupVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, email, contactNumber, countryCode, password, confirmPassword } = formData;

    if (!name || !email || !contactNumber || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!selectedRole) {
      alert("Please select a role before submitting.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/registeruser",
        {
          name,
          email,
          contactNumber: `${countryCode}${contactNumber}`,
          password,
          role: selectedRole,
        }
      );
      alert("Registration successful!");
      console.log(response.data);
      window.location = `/login`;
      // Redirect or perform additional actions here
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  return (
    <Grid
    sx={{
      height: "100%",
      paddingLeft: { lg: "0px", xs: "16px" },
      paddingBottom: "24px",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {/* Popup Box */}
    {isPopupVisible && (
    <Box
    sx={{
      display: isPopupVisible ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Backdrop
      zIndex: 1000,
      opacity: isPopupVisible ? 1 : 0,
      backdropFilter: 'blur(5px)', // Apply blur effect to background
      transition: 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease',
      transform: isPopupVisible ? 'scale(1)' : 'scale(0.9)', // Smooth scale effect for popup
    }}
  >
    <Box
      sx={{
        backgroundColor: 'rgb(237, 253, 249)',
        borderRadius: '15px',
        padding: '20px',
        width: '90%', // Default width (90% of screen width)
        maxWidth: '400px', // Maximum width for larger screens
        position: 'relative',
        zIndex: 1,
        boxShadow: 3,
        animation: isPopupVisible ? 'slideIn 0.5s ease-out' : 'none',
        '@keyframes slideIn': {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        '@media (max-width: 600px)': { // For mobile screens
          width: '80%', // Reduce the width on mobile devices
          maxWidth: '400px', // Maximum width for smaller screens
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
          fontSize: '24px',
        }}
        onClick={handleCloseClick}
      >
        <IoMdCloseCircle size={30} color="#333" />
      </Box>
      <Typography variant="h5" sx={{ fontWeight: '600', marginBottom: '10px' }}>
        Welcome to HolidaySri!
      </Typography>
      <Typography variant="body2" sx={{ color: '#555', marginBottom: '20px' }}>
        Select a role to continue using our service.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {['User', 'Agent', 'Advertiser', 'Tour Guider', 'Travel Partner'].map((role) => (
          <Button
            key={role}
            onClick={() => handleRoleSelect(role)}
            variant="contained"
            sx={{
              width: '100%',
              borderRadius: '20px',
              fontWeight: '600',
              boxShadow: 'none',
              padding: "9px",
              backgroundColor: 'rgb(41, 104, 12)',
              '&:hover': {
                backgroundColor: 'rgb(93, 148, 20)', // Custom hover color
                boxShadow: 'none',
              },
              marginBottom: '10px',
            }}
          >
            🐾 Continue as {role} 🔓
          </Button>
        ))}
      </Box>
    </Box>
  </Box>
    )}
  
    {/* Sign Up Form */}
    <Grid
      sx={{
        paddingTop: { lg: "1.5%", xs: "4%" },
        paddingBottom: { lg: "2%", xs: "4%" },
        width: { lg: "800px", md: "630px", sm: "650px", xl: "720px" },
        paddingRight: { lg: "0px", xs: "4%" },
      }}
    >
        <Grid
            className="registerform"
            sx={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",  // semi-transparent background
            borderRadius: "15px",
            boxShadow: 3,
            padding: "20px",
            backdropFilter: "blur(10px)",  // backdrop blur effect
            }}
        >

            {/* Back Button */}
        <Button
        onClick={handleBackClick} // This should be the function to handle back navigation
        variant="outlined"
        sx={{
            color: "black", // Text color black
            borderColor: "black", // Border color black
            marginBottom: "20px", // Spacing between the button and the form
            padding: "8px 16px", // Padding for the button
            borderRadius: "30px", // Rounded corners for the button
            "&:hover": {
            backgroundColor: "black", // Background color when hovered
            color: "white", // Change text color to white on hover
            },
        }}
        >
        Back
        </Button>


        <Typography variant="h5" sx={{ marginBottom: "15px", fontWeight: "600" }}>HOLIDAYSRI - REGISTER 🍃</Typography>
        <Typography variant="body2" sx={{ marginBottom: "20px", color: "gray" }}>
          Please fill in the details to create your account.
        </Typography>
  
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          margin="normal"
          variant="outlined"
        />
        <Box display="flex" alignItems="center" gap={2} marginTop={2}>
        <FormControl variant="outlined" fullWidth>
            <InputLabel>Country Code</InputLabel>
            <Select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                label="Country Code"
            >
                <MenuItem value="+1">+1 - United States</MenuItem>
                <MenuItem value="+44">+44 - United Kingdom</MenuItem>
                <MenuItem value="+91">+91 - India</MenuItem>
                <MenuItem value="+61">+61 - Australia</MenuItem>
                <MenuItem value="+33">+33 - France</MenuItem>
                <MenuItem value="+49">+49 - Germany</MenuItem>
                <MenuItem value="+81">+81 - Japan</MenuItem>
                <MenuItem value="+1">+1 - Canada</MenuItem>
                <MenuItem value="+39">+39 - Italy</MenuItem>
                <MenuItem value="+34">+34 - Spain</MenuItem>
                <MenuItem value="+55">+55 - Brazil</MenuItem>
                <MenuItem value="+66">+66 - Thailand</MenuItem>
                <MenuItem value="+52">+52 - Mexico</MenuItem>
                <MenuItem value="+20">+20 - Egypt</MenuItem>
                <MenuItem value="+234">+234 - Nigeria</MenuItem>
                <MenuItem value="+27">+27 - South Africa</MenuItem>
                <MenuItem value="+54">+54 - Argentina</MenuItem>
                <MenuItem value="+62">+62 - Indonesia</MenuItem>
                <MenuItem value="+64">+64 - New Zealand</MenuItem>
                <MenuItem value="+63">+63 - Philippines</MenuItem>
                <MenuItem value="+94">+94 - Sri Lanka</MenuItem>
                <MenuItem value="+7">+7 - Russia</MenuItem>
                <MenuItem value="+41">+41 - Switzerland</MenuItem>
                <MenuItem value="+46">+46 - Sweden</MenuItem>
                <MenuItem value="+971">+971 - United Arab Emirates</MenuItem>
                <MenuItem value="+48">+48 - Poland</MenuItem>
                <MenuItem value="+381">+381 - Serbia</MenuItem>
                <MenuItem value="+356">+356 - Malta</MenuItem>
                <MenuItem value="+961">+961 - Lebanon</MenuItem>
                <MenuItem value="+972">+972 - Israel</MenuItem>
                <MenuItem value="+353">+353 - Ireland</MenuItem>
                <MenuItem value="+380">+380 - Ukraine</MenuItem>
                <MenuItem value="+82">+82 - South Korea</MenuItem>
                <MenuItem value="+54">+54 - Argentina</MenuItem>
                <MenuItem value="+64">+64 - New Zealand</MenuItem>
                <MenuItem value="+254">+254 - Kenya</MenuItem>
                <MenuItem value="+213">+213 - Algeria</MenuItem>
                <MenuItem value="+886">+886 - Taiwan</MenuItem>
                <MenuItem value="+62">+62 - Indonesia</MenuItem>
                <MenuItem value="+20">+20 - Egypt</MenuItem>
                <MenuItem value="+354">+354 - Iceland</MenuItem>
                <MenuItem value="+354">+354 - Iceland</MenuItem>
                <MenuItem value="+228">+228 - Togo</MenuItem>
                <MenuItem value="+673">+673 - Brunei</MenuItem>
                <MenuItem value="+593">+593 - Ecuador</MenuItem>
                <MenuItem value="+503">+503 - El Salvador</MenuItem>
                <MenuItem value="+263">+263 - Zimbabwe</MenuItem>
                <MenuItem value="+977">+977 - Nepal</MenuItem>
                <MenuItem value="+972">+972 - Israel</MenuItem>
                <MenuItem value="+971">+971 - UAE</MenuItem>
                <MenuItem value="+249">+249 - Sudan</MenuItem>
                <MenuItem value="+855">+855 - Cambodia</MenuItem>
                <MenuItem value="+56">+56 - Chile</MenuItem>
                <MenuItem value="+63">+63 - Philippines</MenuItem>
                <MenuItem value="+358">+358 - Finland</MenuItem>
                <MenuItem value="+234">+234 - Nigeria</MenuItem>
                <MenuItem value="+254">+254 - Kenya</MenuItem>
                <MenuItem value="+91">+91 - India</MenuItem>
                <MenuItem value="+52">+52 - Mexico</MenuItem>
                <MenuItem value="+256">+256 - Uganda</MenuItem>
            </Select>
        </FormControl>

          <TextField
            fullWidth
            label="Contact Number (Do not use leading Zero)"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            type="text"
            variant="outlined"
          />
        </Box>
        <TextField
          fullWidth
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type="password"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          type="password"
          margin="normal"
          variant="outlined"
        />



        <Typography variant="body2" sx={{ marginBottom: "0px", marginTop: "15px", color: "gray" }}>
        <span style={{ 
            fontWeight: "500", 
            fontSize: "1.4em",  
            color: "gray" 
        }}>
            I
        </span>
        f You Are Accept all Terms and Conditions ✅, Select Role You Want To Continue. 
        <Link href="/terms" underline="hover" sx={{ marginLeft: "5px", color: "rgb(72, 105, 102)" }}>
            Click here To View Terms and Conditions.
        </Link>
        </Typography>

  
        <Button
          onClick={handleMenuClick}
          variant="contained"
          sx={{
            borderRadius: "30px",
            backgroundColor: "rgb(50, 77, 21)",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "rgb(90, 107, 16)",
              boxShadow: "none",
            },
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          {selectedRole ? `Continue as ${selectedRole} 🔑` : "Select Role 🔐"}
        </Button>
  
        <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
                borderRadius: "30px",
                marginTop: "15px",
                width: "200px",  // Adjust the width as needed
                backgroundColor: "rgb(8, 87, 79)",  // Custom background color (purple as an example)
                color: "#ffffff",  // Text color (white)
                display: "flex",
                justifyContent: "center",  // Center the button
                marginLeft: "auto",  // Center the button horizontally
                marginRight: "auto",  // Center the button horizontally
                boxShadow: "none",  // Remove box-shadow if desired
                padding: "7px",
                "&:hover": {
                backgroundColor: "rgb(7, 65, 59)",  // Change color on hover (darker purple)
                boxShadow: "none",  // Remove box-shadow on hover
                },
            }}
            >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>

            <Typography
            variant="body2"
            sx={{
                marginBottom: "0px",
                marginTop: "15px",
                color: "#333",
                textAlign: "center", // Centers the text
            }}
            >
            <Link
                href="/login"
                underline="hover"
                sx={{
                color: "#333", // Matches Typography color
                fontWeight: "500", // Optional: Makes the link more prominent
                }}
            >
                ☚ Back to Login
            </Link>
            </Typography>

      </Grid>
    </Grid>
  </Grid>
  
  );
};

export default Register;
