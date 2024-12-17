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
  Modal,
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

  const [popupOpen, setPopupOpen] = useState(false); // State for popup visibility
  const [userName, setUserName] = useState("");

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

    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      alert("Invalid email Address. Please Check and enter a valid email address.");
      return;
  }

  if (/[A-Z]/.test(email)) {
      alert("Email should not contain capital letters.");
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
          contactNumber,
          countryCode,
          password,
          role: selectedRole,
          RegisterType: "Manualy Registerd User",
        }
      );
      setUserName(name); // Set the user's name for the popup
      setPopupOpen(true); // Show the popup
      // Redirect or perform additional actions here
    } catch (error) {
      console.error("Error during registration:", error);

      // Handle different error responses
      if (error.response) {
        // Error response from the server
        if (error.response.status === 400) {
          alert("This user email is already registered in our services. Please try with another one or check again if it's correct.");
        } else if (error.response.status === 500) {
          alert("User registration failed. Please try again later.");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      } else {
        alert("Network error. Please check your internet connection.");
      }
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
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
              padding: "9px",
              background: "linear-gradient(55deg, rgb(11, 78, 41), rgb(34, 139, 80))",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              transition: "all 0.4s ease-in-out", // Smooth transition
              '&:hover': {
                background: "linear-gradient(45deg, rgb(34, 139, 80), rgb(17, 90, 50))", // Reverse gradient on hover
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)", // Stronger shadow on hover
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
            backgroundColor: "rgba(255, 255, 255, 0.7)",  // semi-transparent background
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
              <MenuItem value="+93">+93 - Afghanistan 🇦🇫</MenuItem>
              <MenuItem value="+355">+355 - Albania 🇦🇱</MenuItem>
              <MenuItem value="+213">+213 - Algeria 🇩🇿</MenuItem>
              <MenuItem value="+1">+1 - United States 🇺🇸</MenuItem>
              <MenuItem value="+376">+376 - Andorra 🇦🇩</MenuItem>
              <MenuItem value="+244">+244 - Angola 🇦🇴</MenuItem>
              <MenuItem value="+54">+54 - Argentina 🇦🇷</MenuItem>
              <MenuItem value="+374">+374 - Armenia 🇦🇲</MenuItem>
              <MenuItem value="+61">+61 - Australia 🇦🇺</MenuItem>
              <MenuItem value="+43">+43 - Austria 🇦🇹</MenuItem>
              <MenuItem value="+994">+994 - Azerbaijan 🇦🇿</MenuItem>
              <MenuItem value="+599">+599 - Aruba 🇦🇼</MenuItem> {/* Added missing country */}
              <MenuItem value="+247">+247 - Ascension Island 🇦🇨</MenuItem> {/* Added missing country */}
              <MenuItem value="+672">+672 - Antarctica 🇦🇶</MenuItem> {/* Added missing country */}
              <MenuItem value="+3744">+3744 - Artsakh (Nagorno-Karabakh) 🇦🇲</MenuItem> {/* Added missing country */}

              <MenuItem value="+973">+973 - Bahrain 🇧🇭</MenuItem>
              <MenuItem value="+880">+880 - Bangladesh 🇧🇩</MenuItem>
              <MenuItem value="+1">+1 - Canada 🇨🇦</MenuItem>
              <MenuItem value="+32">+32 - Belgium 🇧🇪</MenuItem>
              <MenuItem value="+229">+229 - Benin 🇧🇯</MenuItem>
              <MenuItem value="+975">+975 - Bhutan 🇧🇹</MenuItem>
              <MenuItem value="+591">+591 - Bolivia 🇧🇴</MenuItem>
              <MenuItem value="+387">+387 - Bosnia and Herzegovina 🇧🇦</MenuItem>
              <MenuItem value="+267">+267 - Botswana 🇧🇼</MenuItem>
              <MenuItem value="+55">+55 - Brazil 🇧🇷</MenuItem>
              <MenuItem value="+673">+673 - Brunei 🇧🇳</MenuItem>
              <MenuItem value="+359">+359 - Bulgaria 🇧🇬</MenuItem>
              <MenuItem value="+591">+591 - Bolivia 🇧🇴</MenuItem> {/* Duplicate removed */}
              <MenuItem value="+591">+591 - Barbados 🇧🇧</MenuItem> {/* Added missing country */}
              <MenuItem value="+375">+375 - Belarus 🇧🇾</MenuItem> {/* Added missing country */}
              <MenuItem value="+501">+501 - Belize 🇧🇿</MenuItem> {/* Added missing country */}
              <MenuItem value="+226">+226 - Burkina Faso 🇧🇫</MenuItem> {/* Added missing country */}

              <MenuItem value="+855">+855 - Cambodia 🇰🇭</MenuItem>
              <MenuItem value="+237">+237 - Cameroon 🇨🇲</MenuItem>
              <MenuItem value="+238">+238 - Cape Verde 🇨🇻</MenuItem>
              <MenuItem value="+56">+56 - Chile 🇨🇱</MenuItem>
              <MenuItem value="+86">+86 - China 🇨🇳</MenuItem>
              <MenuItem value="+57">+57 - Colombia 🇨🇴</MenuItem>
              <MenuItem value="+269">+269 - Comoros 🇰🇲</MenuItem>
              <MenuItem value="+53">+53 - Cuba 🇨🇺</MenuItem> {/* Added missing country */}
              <MenuItem value="+357">+357 - Cyprus 🇨🇾</MenuItem> {/* Added missing country */}

              <MenuItem value="+45">+45 - Denmark 🇩🇰</MenuItem>
              <MenuItem value="+253">+253 - Djibouti 🇩🇯</MenuItem>
              <MenuItem value="+1">+1 - Dominica 🇩🇲</MenuItem>
              <MenuItem value="+1">+1 - Dominican Republic 🇩🇴</MenuItem>


              <MenuItem value="+20">+20 - Egypt 🇪🇬</MenuItem>
              <MenuItem value="+503">+503 - El Salvador 🇸🇻</MenuItem>
              <MenuItem value="+240">+240 - Equatorial Guinea 🇬🇶</MenuItem>
              <MenuItem value="+291">+291 - Eritrea 🇪🇷</MenuItem>
              <MenuItem value="+372">+372 - Estonia 🇪🇪</MenuItem>
              <MenuItem value="+251">+251 - Ethiopia 🇪🇹</MenuItem>
              <MenuItem value="+500">+500 - Falkland Islands 🇫🇰</MenuItem>
              <MenuItem value="+593">+593 - Ecuador 🇪🇨</MenuItem>

              <MenuItem value="+679">+679 - Fiji 🇫🇯</MenuItem>
              <MenuItem value="+358">+358 - Finland 🇫🇮</MenuItem>
              <MenuItem value="+33">+33 - France 🇫🇷</MenuItem>
              <MenuItem value="+500">+500 - Falkland Islands 🇫🇰</MenuItem>
              <MenuItem value="+298">+298 - Faroe Islands 🇫🇴</MenuItem>

              <MenuItem value="+220">+220 - Gambia 🇬🇲</MenuItem>
              <MenuItem value="+995">+995 - Georgia 🇬🇪</MenuItem>
              <MenuItem value="+49">+49 - Germany 🇩🇪</MenuItem>
              <MenuItem value="+233">+233 - Ghana 🇬🇭</MenuItem>
              <MenuItem value="+30">+30 - Greece 🇬🇷</MenuItem>
              <MenuItem value="+502">+502 - Guatemala 🇬🇹</MenuItem>
              <MenuItem value="+44">+44 - Guernsey 🇬🇬</MenuItem>
              <MenuItem value="+224">+224 - Guinea 🇬🇳</MenuItem>
              <MenuItem value="+245">+245 - Guinea-Bissau 🇬🇼</MenuItem>
              <MenuItem value="+592">+592 - Guyana 🇬🇾</MenuItem>

              <MenuItem value="+504">+504 - Honduras 🇭🇳</MenuItem>
              <MenuItem value="+36">+36 - Hungary 🇭🇺</MenuItem>
              <MenuItem value="+509">+509 - Haiti 🇭🇹</MenuItem>

              <MenuItem value="+98">+98 - Iran 🇮🇷</MenuItem>
              <MenuItem value="+964">+964 - Iraq 🇮🇶</MenuItem>
              <MenuItem value="+353">+353 - Ireland 🇮🇪</MenuItem>
              <MenuItem value="+972">+972 - Israel 🇮🇱</MenuItem>
              <MenuItem value="+39">+39 - Italy 🇮🇹</MenuItem>
              <MenuItem value="+225">+225 - Ivory Coast 🇮🇨</MenuItem>
              <MenuItem value="+1">+1 - Iceland 🇮🇸</MenuItem>
              <MenuItem value="+91">+91 - India 🇮🇳</MenuItem>
              <MenuItem value="+62">+62 - Indonesia 🇮🇩</MenuItem>
              <MenuItem value="+98">+98 - Iran 🇮🇷</MenuItem>
              <MenuItem value="+354">+354 - Iceland 🇮🇸</MenuItem>

              <MenuItem value="+81">+81 - Japan 🇯🇵</MenuItem>
              <MenuItem value="+962">+962 - Jordan 🇯🇴</MenuItem>
              <MenuItem value="+1">+1 - Jamaica 🇯🇲</MenuItem>

              <MenuItem value="+965">+965 - Kuwait 🇰🇼</MenuItem>
              <MenuItem value="+996">+996 - Kyrgyzstan 🇰🇬</MenuItem>
              <MenuItem value="+254">+254 - Kenya 🇰🇪</MenuItem>
              <MenuItem value="+850">+850 - North Korea 🇰🇵</MenuItem>
              <MenuItem value="+82">+82 - South Korea 🇰🇷</MenuItem>
              <MenuItem value="+965">+965 - Kuwait 🇰🇼</MenuItem>
              <MenuItem value="+996">+996 - Kyrgyzstan 🇰🇬</MenuItem>

              <MenuItem value="+961">+961 - Lebanon 🇱🇧</MenuItem>
              <MenuItem value="+266">+266 - Lesotho 🇱🇸</MenuItem>
              <MenuItem value="+231">+231 - Liberia 🇱🇸</MenuItem>
              <MenuItem value="+218">+218 - Libya 🇱🇾</MenuItem>
              <MenuItem value="+370">+370 - Lithuania 🇱🇹</MenuItem>
              <MenuItem value="+352">+352 - Luxembourg 🇱🇺</MenuItem>

              <MenuItem value="+261">+261 - Madagascar 🇲🇬</MenuItem>
              <MenuItem value="+265">+265 - Malawi 🇲🇼</MenuItem>
              <MenuItem value="+60">+60 - Malaysia 🇲🇾</MenuItem>
              <MenuItem value="+960">+960 - Maldives 🇲🇻</MenuItem>
              <MenuItem value="+223">+223 - Mali 🇲🇱</MenuItem>
              <MenuItem value="+356">+356 - Malta 🇲🇹</MenuItem>
              <MenuItem value="+692">+692 - Marshall Islands 🇲🇭</MenuItem>
              <MenuItem value="+52">+52 - Mexico 🇲🇽</MenuItem>
              <MenuItem value="+373">+373 - Moldova 🇲🇩</MenuItem>
              <MenuItem value="+377">+377 - Monaco 🇲🇨</MenuItem>
              <MenuItem value="+976">+976 - Mongolia 🇲🇳</MenuItem>
              <MenuItem value="+382">+382 - Montenegro 🇲🇪</MenuItem>
              <MenuItem value="+1664">+1664 - Montserrat 🇲🇸</MenuItem>
              <MenuItem value="+212">+212 - Morocco 🇲🇦</MenuItem>
              <MenuItem value="+258">+258 - Mozambique 🇲🇿</MenuItem>
              <MenuItem value="+95">+95 - Myanmar 🇲🇲</MenuItem>

              <MenuItem value="+227">+227 - Niger 🇳🇪</MenuItem>
              <MenuItem value="+234">+234 - Nigeria 🇳🇬</MenuItem>
              <MenuItem value="+683">+683 - Niue 🇳🇺</MenuItem>
              <MenuItem value="+672">+672 - Norfolk Island 🇳🇫</MenuItem>
              <MenuItem value="+47">+47 - Norway 🇳🇴</MenuItem>
              <MenuItem value="+977">+977 - Nepal 🇳🇵</MenuItem>
              <MenuItem value="+505">+505 - Nicaragua 🇳🇮</MenuItem>
              <MenuItem value="+31">+31 - Netherlands 🇳🇱</MenuItem>
              <MenuItem value="+64">+64 - New Zealand 🇳🇿</MenuItem>

              <MenuItem value="+968">+968 - Oman 🇴🇲</MenuItem>

              <MenuItem value="+51">+51 - Peru 🇵🇪</MenuItem>
              <MenuItem value="+63">+63 - Philippines 🇵🇭</MenuItem>
              <MenuItem value="+48">+48 - Poland 🇵🇱</MenuItem>
              <MenuItem value="+351">+351 - Portugal 🇵🇹</MenuItem>
              <MenuItem value="+680">+680 - Palau 🇵🇼</MenuItem>
              <MenuItem value="+595">+595 - Paraguay 🇵🇾</MenuItem>
              <MenuItem value="+1">+1 - Panama 🇵🇦</MenuItem>
              <MenuItem value="+675">+675 - Papua New Guinea 🇵🇬</MenuItem>
              <MenuItem value="+92">+92 - Pakistan 🇵🇰</MenuItem>
              <MenuItem value="+974">+974 - Qatar 🇶🇦</MenuItem>
              <MenuItem value="+262">+262 - Réunion 🇷🇪</MenuItem>
              <MenuItem value="+1">+1 - Puerto Rico 🇵🇷</MenuItem>
              <MenuItem value="+1">+1 - Saint Pierre and Miquelon 🇵🇲</MenuItem>

              <MenuItem value="+974">+974 - Qatar 🇶🇦</MenuItem>

              <MenuItem value="+7">+7 - Russia 🇷🇺</MenuItem>
              <MenuItem value="+250">+250 - Rwanda 🇷🇼</MenuItem>
              <MenuItem value="+40">+40 - Romania 🇷🇴</MenuItem>
              <MenuItem value="+262">+262 - Réunion 🇷🇪</MenuItem>

              <MenuItem value="+249">+249 - Sudan 🇸🇩</MenuItem>
              <MenuItem value="+597">+597 - Suriname 🇸🇷</MenuItem>
              <MenuItem value="+268">+268 - Eswatini 🇸🇿</MenuItem>
              <MenuItem value="+239">+239 - São Tomé and Príncipe 🇸🇹</MenuItem>
              <MenuItem value="+378">+378 - San Marino 🇸🇲</MenuItem>
              <MenuItem value="+221">+221 - Senegal 🇸🇳</MenuItem>
              <MenuItem value="+248">+248 - Seychelles 🇸🇨</MenuItem>
              <MenuItem value="+232">+232 - Sierra Leone 🇸🇱</MenuItem>
              <MenuItem value="+65">+65 - Singapore 🇸🇬</MenuItem>
              <MenuItem value="+963">+963 - Syria 🇸🇾</MenuItem>
              <MenuItem value="+421">+421 - Slovakia 🇸🇰</MenuItem>
              <MenuItem value="+386">+386 - Slovenia 🇸🇮</MenuItem>
              <MenuItem value="+252">+252 - Somalia 🇸🇴</MenuItem>
              <MenuItem value="+41">+41 - Switzerland 🇨🇭</MenuItem>
              <MenuItem value="+677">+677 - Solomon Islands 🇸🇧</MenuItem>
              <MenuItem value="+27">+27 - South Africa 🇿🇦</MenuItem>
              <MenuItem value="+82">+82 - South Korea 🇰🇷</MenuItem>
              <MenuItem value="+34">+34 - Spain 🇪🇸</MenuItem>
              <MenuItem value="+94">+94 - Sri Lanka 🇱🇰</MenuItem>
              <MenuItem value="+211">+211 - South Sudan 🇸🇸</MenuItem>
              <MenuItem value="+290">+290 - Saint Helena 🇸🇭</MenuItem>
              <MenuItem value="+1">+1 - Saint Kitts and Nevis 🇰🇳</MenuItem>
              <MenuItem value="+1">+1 - Saint Lucia 🇱🇨</MenuItem>
              <MenuItem value="+1">+1 - Saint Vincent and the Grenadines 🇻🇨</MenuItem>
              <MenuItem value="+1758">+1758 - Saint Lucia 🇱🇨</MenuItem>
              <MenuItem value="+1849">+1849 - Saint Martin 🇸🇽</MenuItem>

              <MenuItem value="+993">+993 - Turkmenistan 🇹🇲</MenuItem>
              <MenuItem value="+66">+66 - Thailand 🇹🇭</MenuItem>
              <MenuItem value="+670">+670 - Timor-Leste 🇹🇱</MenuItem>
              <MenuItem value="+228">+228 - Togo 🇹🇬</MenuItem>
              <MenuItem value="+1">+1 - Trinidad and Tobago 🇹🇹</MenuItem>
              <MenuItem value="+216">+216 - Tunisia 🇹🇳</MenuItem>
              <MenuItem value="+90">+90 - Turkey 🇹🇷</MenuItem>

              <MenuItem value="+1">+1 - United States 🇺🇸</MenuItem>
              <MenuItem value="+380">+380 - Ukraine 🇺🇦</MenuItem>
              <MenuItem value="+971">+971 - United Arab Emirates 🇦🇪</MenuItem>
              <MenuItem value="+44">+44 - United Kingdom 🇬🇧</MenuItem>
              <MenuItem value="+598">+598 - Uruguay 🇺🇾</MenuItem>
              <MenuItem value="+998">+998 - Uzbekistan 🇺🇿</MenuItem>

              <MenuItem value="+58">+58 - Venezuela 🇻🇪</MenuItem>
              <MenuItem value="+84">+84 - Vietnam 🇻🇳</MenuItem>
              <MenuItem value="+1">+1 - Virgin Islands 🇻🇮</MenuItem>
              <MenuItem value="+679">+679 - Vanuatu 🇻🇺</MenuItem>
              <MenuItem value="+379">+379 - Vatican City 🇻🇦</MenuItem>
              <MenuItem value="+1">+1 - Saint Vincent and the Grenadines 🇻🇨</MenuItem>

              <MenuItem value="+967">+967 - Yemen 🇾🇪</MenuItem>

              <MenuItem value="+260">+260 - Zambia 🇿🇲</MenuItem>
              <MenuItem value="+263">+263 - Zimbabwe 🇿🇼</MenuItem>

            </Select>
        </FormControl>

          <TextField
            fullWidth
            label="Contact Number ( Ex: 071-2223331 )"
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

             {/* Popup Modal */}
             <Modal
              open={popupOpen}
              onClose={() => setPopupOpen(false)}
              aria-labelledby="registration-success-title"
              aria-describedby="registration-success-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xs: 300, sm: 400, md: 450 }, // Adjust width for different screen sizes
                  backgroundColor: "rgba(1, 22, 20, 0.64)", // Gradient background
                  backdropFilter: "blur(2px)",
                  border: "none",
                  boxShadow: 24,
                  p: { xs: 2, sm: 3, md: 4 }, // Adjust padding for different screen sizes
                  borderRadius: "15px",
                  textAlign: "center",
                  color: "#fff", // White text color for contrast
                }}
              >
                {/* Icon or Image for Coins */}
                <Box
                  component="img"
                  src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1734337684/hsc_resll6_1_q0eksv.webp" // Replace with actual coin image URL
                  alt="Coins"
                  sx={{
                    width: { xs: 60, sm: 70, md: 80 }, // Adjust image size for different screen sizes
                    height: { xs: 60, sm: 70, md: 80 },
                    margin: "0 auto 15px",
                  }}
                />

                <Typography
                  id="registration-success-title"
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "15px",
                    fontSize: { xs: "18px", sm: "20px", md: "24px" }, // Responsive font size
                    color: "#fff",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", // Text shadow for depth
                  }}
                >
                  Congratulations, {userName}!
                </Typography>

                <Typography
                  id="registration-success-description"
                  sx={{
                    marginBottom: "20px",
                    fontSize: { xs: "14px", sm: "15px", md: "16px" }, // Responsive font size
                    lineHeight: "1.5",
                    color: "#fdfdfd",
                  }}
                >
                  You are successfully registered! 🎉 <br />
                  As a welcome gift, you have earned{" "}
                  <strong style={{ color: "#ffd700" }}>100 HSC</strong> for free. <br />
                  Use it to earn money and enjoy your journey!
                </Typography>

                {/* Login Button */}
                <Button
                  variant="contained"
                  onClick={() => (window.location = "/login")}
                  sx={{
                    marginTop: "15px",
                    width: "100%",
                    padding: { xs: "10px", sm: "12px" }, // Adjust padding for mobile
                    fontWeight: "bold",
                    backgroundImage: "linear-gradient(90deg, rgb(248, 196, 83), rgb(252, 121, 20))", // Gradient color
                    color: "#fff",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Text shadow
                    "&:hover": {
                      backgroundImage: "linear-gradient(90deg, rgb(252, 121, 20), rgb(248, 196, 83))", // Reverse gradient on hover
                    },
                    borderRadius: "8px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)", // Button shadow
                    textTransform: "uppercase", // Optional: Makes the text uppercase
                  }}
                >
                  Login Now
                </Button>
              </Box>
            </Modal>

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
