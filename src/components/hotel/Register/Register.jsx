import React, { useState, useEffect } from "react";
import {
  Tab,
  Tabs,
  Typography,
  Box,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import PropTypes from "prop-types";
import Customtextfield from "../Login/Customtextfield";
import Background from "../../../assets/Register.jpg";
import "./register.css";
import Customer from "../../../assets/custumer.png";
import Seller from "../../../assets/seller.png";
import Localagent from "../../../assets/localagent.png";
import Foreginagent from "../../../assets/forigenagent.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ImMenu3 } from "react-icons/im";
import { IoMdCloseCircle } from "react-icons/io";
import CircularProgress from '@mui/material/CircularProgress';
import { Row } from "antd";

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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
const tabLabels = [
  { label: "user", index: 0 },
  { label: "agent", index: 1 },
  { label: "advertiser", index: 2 },
  { label: "guide", index: 3 },
  { label: "Travel partner", index: 4 },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Register = (props) => {
  const { size, state, ...rest } = props;
  const getlocation = useLocation();
  const { state: locationState } = getlocation;
  const queryParams = new URLSearchParams(getlocation.search);
  const agent = queryParams.get("agent");
  const [value, setValue] = React.useState(0);
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [partnerProfileImage, setPartnerProfileImage] = useState(null);
  const [role, setRole] = useState("");
  const [subrole, setSubRole] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [nic, setNic] = useState("");
  const [passport, setPassport] = useState("");
  const [country, setCountry] = useState("");

  const [location, setLocation] = useState("");
  const [certificateImage, setCertificateImage] = useState(null);
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();

  const { type, description } = locationState || {};

  const [gender, setGender] = useState(""); // new
  const [age, setAge] = useState(""); // new
  const [bio, setBio] = useState(""); // new
  const [interest, setInterest] = useState(""); // new

  const [countryCode, setCountryCode] = useState('+94'); // Default to Sri Lanka


  const [loading, setLoading] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState(""); // confirm passwod

  const [isPopupVisible, setPopupVisible] = useState(false); // popup registration menu

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    // Handle the selected image, you may want to upload it or perform other actions
    setImage(selectedImage);
    setCertificateImage(selectedImage);
    setProfileImage(selectedImage);
    setPartnerProfileImage(selectedImage);
  };
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    setLocations(
      locations.sort((a, b) => a.locationName.localeCompare(b.locationName))
    );
  }, [locations]);

  const handleCertificateImage = (event) => {
    const selectedImage = event.target.files[0];
    // Handle the selected image, you may want to upload it or perform other actions

    setCertificateImage(selectedImage);
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

  const [countryNames, setCountryNames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/positions")
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          const names = data.data.map((country) => country.name);
          setCountryNames(names);
        } else {
          setError(data.msg);
        }
      })
      .catch((err) => {
        setError("Error fetching data");
        console.error("Error fetching data:", err);
      });
  }, []);

  useEffect(() => {
    if (agent === "agent") {
      setValue(1);
      role === "agent";
    }
  }, [agent]);
  const handleChange = (event, newValue) => {
    const selectedRole = tabLabels[newValue].label;
    setRole(selectedRole);
    setValue(newValue);
  };

// Function to handle tab change from links
const handleLinkClick = (index) => {
  // Simulating the tab change using handleChange
  handleChange(null, index);

  const popupBox = document.querySelector('.popupboxregnew');

    if (popupBox) {
      popupBox.classList.add('hidden');
    }
};

const handleMenuClick = () => {
  setPopupVisible(!isPopupVisible);
};

 // Function to hide the popup when close icon or links are clicked
 const handleCloseClick = () => {
  const popupBox = document.querySelector('.popupboxregnew');

  if (popupBox) {
    popupBox.classList.add('hidden');
  } // Hide popup when close button is clicked
};

  //Validation
  const handleSubmitCustomer = (e) => {

    e.preventDefault();
    setLoading(true); // Start loading

    // Validate Contact Number
    if (!isValidContactNumber(contactNumber)) {
      alert("Invalid contact number");
      return;
    }
    if (!name || !email || !contactNumber || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

        // Validate email format
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
          alert("Invalid email format");
          setLoading(false); // Stop loading if validation fails
          return;
      }
  
      // Check if email contains capital letters
      if (/[A-Z]/.test(email)) {
          alert("Email should not contain capital letters");
          setLoading(false); // Stop loading if validation fails
          return;
      }
  

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    } // confirm password felid

    e.preventDefault();
    const newUser = {
      name,
      email,
      contactNumber,
      password,
    };
    console.log(newUser);
    //alert("Success");
    axios
      .post(
        "https://holidaysri-backend-9xm4.onrender.com/api/auth/registeruser",
        newUser
      )
      .then(() => {
        alert("Registration Success");
        // history.push('/')
        setLoading(false); // Stop loading when successful
        window.location = `/login`;
      })
      .catch((err) => {
        // Handle error response
        if (err.response) {
          setLoading(false); // Stop loading on failure
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Request failed with status code", err.response.status);
          // Display error message from the server if available
          alert("Registration failed1: " + err.response.data.desc);
        } else if (err.request) {
          // The request was made but no response was received
          console.error("No response received from the server");
          alert("Registration failed2: No response received from the server");
        } else {
          // Something else happened while setting up the request
          console.error("Error setting up the request:", err.message);
          alert("Registration failed3: " + err.message);
        }
      });
  };

  const handleSubmitAgent = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    // Validate Contact Number
    if (!isValidContactNumber(contactNumber)) {
      alert("Invalid contact number");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    } // confirm password felid

        // Validate email format
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
          alert("Invalid email format");
          setLoading(false); // Stop loading if validation fails
          return;
      }
  
      // Check if email contains capital letters
      if (/[A-Z]/.test(email)) {
          alert("Email should not contain capital letters");
          setLoading(false); // Stop loading if validation fails
          return;
      }
  

    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image); // Append the single selected image to formData

    formData.append("upload_preset", "aahllisc");

    try {
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/daa9e83as/image/upload",
        formData
      );

      const imageUrl = cloudinaryResponse.data.secure_url; // Get the image URL from the Cloudinary response

      const newUser = {
        subrole,
        name,
        nic,
        passport,
        email,
        country,
        contactNumber,
        password,
        image: imageUrl, // Use a different variable to store the image URL
      };
      console.log(newUser);
      await axios.post(
        "https://holidaysri-backend-9xm4.onrender.com/api/auth/registeragent",
        newUser
      );

      alert("Agent Registration Success");
      setLoading(false); // Stop loading when successful
      window.location = "/login";
    } catch (error) {
      setLoading(false); // Stop loading on failure
      console.error("Error registering agent:", error);
      alert("Error occurred during registration.");
    }
  };

  //Validation
  const handleSubmitSeller = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    // Validate Contact Number
    if (!isValidContactNumber(contactNumber)) {
      alert("Invalid contact number");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    } // confirm password felid

    if (!name || !email || !contactNumber || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

        // Validate email format
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
          alert("Invalid email format");
          setLoading(false); // Stop loading if validation fails
          return;
      }
  
      // Check if email contains capital letters
      if (/[A-Z]/.test(email)) {
          alert("Email should not contain capital letters");
          setLoading(false); // Stop loading if validation fails
          return;
      }
  

    e.preventDefault();
    const newUser = {
      name,
      email,
      contactNumber,
      password,
    };
    console.log(newUser);
    //alert("Success");
    axios
      .post(
        "https://holidaysri-backend-9xm4.onrender.com/api/auth/registerseller",
        newUser
      )
      .then(() => {
        alert("Advertiser Registration Success");
        // history.push('/')
        setLoading(false); // Stop loading when successful
        window.location = `/login`;
      })
      .catch((err) => {
        setLoading(false); // Stop loading on failure
        alert(err);
      });
  };

  //Validation
  // const handleSubmitPartner = async (e) => {
  //   // Validate NIC
  //   if (!isValidNIC(nic)) {
  //     alert("Invalid NIC number");
  //     return;
  //   }

  //   // Validate Contact Number
  //   if (!isValidContactNumber(contactNumber)) {
  //     alert("Invalid contact number");
  //     return;
  //   }

  //   if (!name || !nic || !email || !contactNumber || !password || !location) {
  //     alert("All fields are required");
  //     return;
  //   }
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData();
  //     formData.append("file", profileImage);
  //     formData.append("upload_preset", "aahllisc");
  //     const cloudinaryResponse = await axios.post(
  //       "https://api.cloudinary.com/v1_1/daa9e83as/image/upload",
  //       formData
  //     );
  //     const imageUrl = cloudinaryResponse.data.secure_url;
  //   const newUser = {
  //     subrole,
  //     name,
  //     nic,
  //     email,
  //     contactNumber,
  //     password,
  //     location,
  //     profileImage: imageUrl,
  //   };

  //   //alert("Success");
  //   axios
  //     .post(
  //       "https://holidaysri-backend-9xm4.onrender.com/api/auth/registerpartner",
  //       newUser
  //     )
  //     .then(() => {
  //       alert("Partner Registration Success");
  //       // history.push('/')
  //       window.location = `/login`;
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Error occurred.");
  //   }
  // };

  const prepareDataForPartnerRegistration = async () => {
    try {
      const formData = new FormData();
      formData.append("file", partnerProfileImage); // profileImage assumed to be a file object
      formData.append("upload_preset", "aahllisc");

      // Upload the image to Cloudinary
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/daa9e83as/image/upload",
        formData
      );

      

      // Get the secure URL of the uploaded image
      const imageUrl = cloudinaryResponse.data.secure_url;

      // Prepare the data for registration
      return {
        subrole,
        name,
        nic,
        email,
        country,
        contactNumber,
        password,
        location,
        age, //new
        bio, //new
        interest, //new
        gender, //new
        partnerProfileImage: imageUrl, // Set the image URL in the return object
      };
    } catch (error) {
      console.error(
        "Error preparing data for partner registration:",
        error.message
      );
      throw error;
    }
  };

  const handleCheckoutPartner = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if (!isValidContactNumber(contactNumber)) {
      alert("Invalid contact number");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    } // confirm password felid

    if (!name || !nic || !email || !contactNumber || !password || !location || !confirmPassword) {
      alert("All fields are required");
      return;
    }

        // Validate email format
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
          alert("Invalid email format");
          setLoading(false); // Stop loading if validation fails
          return;
      }
  
      // Check if email contains capital letters
      if (/[A-Z]/.test(email)) {
          alert("Email should not contain capital letters");
          setLoading(false); // Stop loading if validation fails
          return;
      }
  

    try {
      const newProduct = await prepareDataForPartnerRegistration();

      const backendUrl = "https://holidaysri-backend-9xm4.onrender.com";
      const id = "65f58296f707aa390b10db8a";

      // Fetch rates from the backend
      const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
      const rates = responseRates.data.rate;

      const finalRate = subrole === 'Foreign Partner' ? rates.partnerForeignRate : rates.partnerLocalRate;

      const finalEarning = subrole === 'Foreign Partner' ? rates.partnerForeignEarnRate : rates.partnerLocalEarnRate;

      const finalDiscount = subrole === 'Foreign Partner' ? rates.discountForeignPartnerPercentage : rates.discountLocalPartnerPercentage;

      const finalCurrency = subrole === 'Foreign Partner' ? "USD" : "LKR";

      // Navigate to checkout page with necessary details and function identifier
      navigate("/checkusers", {
        state: {
          discount: finalDiscount,
          rate: finalRate,
          path: "/login",
          currency: finalCurrency,
          items: "Partner Registration",
          earns: finalEarning,
          payment: "/paypartupdate",
          postFunctionData: {
            url: "https://holidaysri-backend.onrender.com/api/auth/registerpartner",
            data: newProduct,
          },
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error during checkout process:", error.message);
    }
  };

  // const handleSubmitGuide = async (e) => {
  //   // Validate NIC
  //   if (!isValidNIC(nic)) {
  //     alert("Invalid NIC number");
  //     return;
  //   }

  //   // Validate Contact Number
  //   if (!isValidContactNumber(contactNumber)) {
  //     alert("Invalid contact number");
  //     return;
  //   }

  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("file", certificateImage); // Append the single selected image to formData

  //   formData.append("upload_preset", "aahllisc");

  //   try {
  //     const cloudinaryResponse = await axios.post(
  //       "https://api.cloudinary.com/v1_1/daa9e83as/image/upload",
  //       formData
  //     );

  //     const imageUrl = cloudinaryResponse.data.secure_url; // Get the image URL from the Cloudinary response

  //     if (profileImage) {
  //       const profileImageFormData = new FormData();
  //       profileImageFormData.append("file", profileImage);
  //       profileImageFormData.append("upload_preset", "aahllisc");

  //       const profileImageResponse = await axios.post(
  //         "https://api.cloudinary.com/v1_1/daa9e83as/image/upload",
  //         profileImageFormData
  //       );
  //       const profileImageUrl = profileImageResponse.data.secure_url; // Get the profile image URL from the Cloudinary response

  //     const newUser = {
  //       name,
  //       nic,
  //       email,
  //       contactNumber,
  //       password,
  //       location,
  //       certificateImage: imageUrl,
  //       profileImage: profileImageUrl,
  //       experience,
  //     };
  //     console.log(newUser);
  //     await axios.post(
  //       "https://holidaysri-backend-9xm4.onrender.com/api/auth/registerGuide",
  //       newUser
  //     );

  //     alert("Guide Registration Success");
  //     window.location = "/login";
  //   }
  //   } catch (error) {
  //     console.error("Error registering agent:", error);
  //     alert("Error occurred during registration.");
  //   }
  // };

  const prepareDataForGuideRegistration = async () => {
    try {
      // Upload certificate image to Cloudinary
      const certificateFormData = new FormData();
      certificateFormData.append("file", certificateImage);
      certificateFormData.append("upload_preset", "aahllisc");
      const certificateResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/daa9e83as/image/upload",
        certificateFormData
      );
      const certificateImageUrl = certificateResponse.data.secure_url;

      // Upload profile image to Cloudinary if available
      let profileImageUrl = null;
      if (profileImage) {
        const profileImageFormData = new FormData();
        profileImageFormData.append("file", profileImage);
        profileImageFormData.append("upload_preset", "aahllisc");
        const profileImageResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/daa9e83as/image/upload",
          profileImageFormData
        );
        profileImageUrl = profileImageResponse.data.secure_url;
      }

      // Prepare the data for registration
      return {
        name,
        nic,
        email,
        contactNumber,
        password,
        location,
        certificateImage: certificateImageUrl,
        profileImage: profileImageUrl,
        experience,
      };
    } catch (error) {
      console.error(
        "Error preparing data for guide registration:",
        error.message
      );
      throw error;
    }
  };

  const handleCheckoutGuide = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading



    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    } // confirm password felid

    // Validate Contact Number
    if (!isValidContactNumber(contactNumber)) {
      alert("Invalid contact number");
      return;
    }

        // Validate email format
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
          alert("Invalid email format");
          setLoading(false); // Stop loading if validation fails
          return;
      }
  
      // Check if email contains capital letters
      if (/[A-Z]/.test(email)) {
          alert("Email should not contain capital letters");
          setLoading(false); // Stop loading if validation fails
          return;
      }
  

    if (
      !name ||
      !nic ||
      !email ||
      !contactNumber ||
      !password ||
      !location ||
      !certificateImage ||
      !profileImage ||
      !experience ||
      !confirmPassword
    ) {
      alert("All fields are required");
      return;
    }
    try {
      const newProduct = await prepareDataForGuideRegistration();

      const backendUrl = "https://holidaysri-backend-9xm4.onrender.com";
      const id = "65f58296f707aa390b10db8a";

      // Fetch rates from the backend
      const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
      const rates = responseRates.data.rate;

      // Navigate to checkout page with necessary details and function identifier
      navigate("/checkusers", {
        state: {
          discount: rates.discountguidePercentage,
          rate: rates.guideAdvertiseRate,
          path: "/login",
          currency: "LKR",
          items: "Guide Registration",
          earns: rates.earningRate,
          payment: "/payguiupdate",
          postFunctionData: {
            url: "https://holidaysri-backend.onrender.com/api/auth/registerGuide",
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

  return (
    <Grid
      sx={{
        backgroundImage:
          'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733336447/pexels-photo-1072179_frjk63_js026i.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100%",
        paddingLeft: { lg: "0px", xs: "16px" },
        paddingBottom: "24px",
      }}
    >
      <center>

        {/* pop up Box */}

      <div className={`popupboxregnew ${isPopupVisible ? 'visible' : ''}`}>
        <div className="rehmanuclosepopup" onClick={handleCloseClick}>
          <IoMdCloseCircle />
        </div>
        <div className="secpopupboxregnew">
          <div className="popupboxregnewtexts">
            <h2>Welcome to Holidaysri!</h2>
            <p>You can choose any registration option to continue our service.</p>
            <p>Earn money and explore your journey. Good luck!</p>
            <p className="SuberDes">{description}</p>
          </div>

          {/* Conditionally styled buttons */}
          <a
            href="#"
            onClick={() => handleLinkClick(0)}
            style={{
              backgroundColor: type === 'user' ? 'white' : '',
              color: type === 'user' ? 'black' : ''
            }}
            className={`glow-btn ${type === 'user' ? 'animate' : ''}`}
          >
            Register as a User
          </a>

          <a
            href="#"
            onClick={() => handleLinkClick(1)}
            style={{
              backgroundColor: type === 'agent' ? 'white' : '',
              color: type === 'agent' ? 'black' : ''
            }}
            className={`glow-btn ${type === 'agent' ? 'animate' : ''}`}
          >
            Register as an Agent
          </a>

          <a
            href="#"
            onClick={() => handleLinkClick(2)}
            style={{
              backgroundColor: type === 'advertiser' ? 'white' : '',
              color: type === 'advertiser' ? 'black' : ''
            }}
            className={`glow-btn ${type === 'advertiser' ? 'animate' : ''}`}
          >
            Register as an Advertiser
          </a>

          <a
            href="#"
            onClick={() => handleLinkClick(3)}
            style={{
              backgroundColor: type === 'guider' ? 'white' : '',
              color: type === 'guider' ? 'black' : ''
            }}
            className={`glow-btn ${type === 'guider' ? 'animate' : ''}`}
          >
            Register as a Guide
          </a>

          <a
            href="#"
            onClick={() => handleLinkClick(4)}
            style={{
              backgroundColor: type === 'travelPartner' ? 'white' : '',
              color: type === 'travelPartner' ? 'black' : ''
            }}
            className={`glow-btn ${type === 'travelPartner' ? 'animate' : ''}`}
          >
            Register as a Travel Partner
          </a>

          <a className="regpopuplogbtn" href="/login">
            ↘️ Already have a particular account? Login here! ↙️
          </a>
        </div>
      </div>

{/* pop up box end  */}


        <Grid
          paddingTop={{ lg: "7%", xs: "4%" }}
          paddingBottom={{ lg: "5%", xs: "4%" }}
          width={{ lg: "800px", md: "630px", sm: "650px", xl: "720px" }}
          height={{ lg: "100%", xs: "100vh" }}
          paddingRight={{ lg: "0px", xs: "4%" }}
          marginBottom={{ xs: "80%", lg: "0px" }}
        >
          <Grid className="registerform">
            <a onClick={() => window.history.back()}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "30px",
                  backgroundColor: "black",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "black",
                    boxShadow: "none",
                  },
                  marginLeft: {
                    lg: "-640px",
                    md: "-440px",
                    xs: "-260px",
                    sm: "-470px",
                  },
                }}
              >
                Back
              </Button>
            </a>

            <a className="Registermeninewico" onClick={handleMenuClick} ><ImMenu3 /></a>

            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              orientation="horizontal"
              variant="scrollable"
              sx={{
                color: "black",
                marginLeft: { lg: "42px", md: "-20px", xs: "8px", sm: "-20px" },
                marginTop: "16px",
                "& .Mui-selected": {
                  backgroundColor: "transparent !important",
                  color: "black !important",
                },
                "& .Mui-selected:hover": {
                  backgroundColor: "transparent !important",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#48BB78",
                  height: "2px",
                  borderRadius: "3px",
                },
                "& .MuiTabs-flexContainer": {
                  borderColor: "#F3EFF4",
                },
              }}
            >
              {tabLabels.map(({ label, index }) => (
                <Tab
                  key={index}
                  label={
                    <div>
                      <Typography
                        fontWeight={500}
                        sx={{
                          fontSize: { lg: "14px", xs: "14px" },
                        }}
                      >
                        {label}
                      </Typography>
                    </div>
                  }
                  {...a11yProps(index)}
                  sx={
                    index === 0
                      ? { justifyContent: "right !important", marginTop: "5px" }
                      : {}
                  }
                />
              ))}
            </Tabs>

            
            <CustomTabPanel value={value} index={0}>
      <Grid paddingLeft={{ lg: "32px" }} paddingRight={{ lg: "32px" }}>
        <Customtextfield
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          marginTop="16px"
          width={{
            xl: "98%",
            lg: "115%",
            xs: "270px",
            md: "110%",
            sm: "110%",
          }}
        />
        <Customtextfield
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          marginTop="16px"
          width={{
            xl: "98%",
            lg: "115%",
            xs: "270px",
            md: "110%",
            sm: "110%",
          }}
        />
          <Grid item xs={4} marginTop="16px">
            <FormControl fullWidth>
              <InputLabel
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: '18px',
                  marginBottom: '18px',
                  fontSize: '17px',
                }}
              >
                Country Code
              </InputLabel>
              <Select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                sx={{
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '18px',
                  },
                }}
              >
                <MenuItem value="+94">Sri Lanka (+94)</MenuItem>
                <MenuItem value="+1">United States (+1)</MenuItem>
                <MenuItem value="+44">United Kingdom (+44)</MenuItem>
                <MenuItem value="+91">India (+91)</MenuItem>
                <MenuItem value="+61">Australia (+61)</MenuItem>
                <MenuItem value="+81">Japan (+81)</MenuItem>
                <MenuItem value="+49">Germany (+49)</MenuItem>
                <MenuItem value="+33">France (+33)</MenuItem>
                <MenuItem value="+39">Italy (+39)</MenuItem>
                <MenuItem value="+86">China (+86)</MenuItem>
                <MenuItem value="+82">South Korea (+82)</MenuItem>
                <MenuItem value="+31">Netherlands (+31)</MenuItem>
                <MenuItem value="+41">Switzerland (+41)</MenuItem>
                {/* Add more country codes as needed */}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12} md={8}>
            <Customtextfield
              label="Contact Number"
              placeholder=": (+94) 071 2915 150"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              marginTop="8px"
              width={{
                xl: "98%",
                lg: "115%",
                xs: "270px",
                md: "110%",
                sm: "110%",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {countryCode}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        

        <Customtextfield
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          marginTop="16px"
          width={{
            xl: "98%",
            lg: "115%",
            xs: "270px",
            md: "110%",
            sm: "110%",
          }}
        />
        <Customtextfield
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          marginTop="16px"
          width={{
            xl: "98%",
            lg: "115%",
            xs: "270px",
            md: "110%",
            sm: "110%",
          }}
        />

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
          onClick={handleSubmitCustomer}
        >
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </Grid>
    </CustomTabPanel>


            <CustomTabPanel value={value} index={1}>
              <Grid paddingLeft={{ lg: "32px" }}>
                <Customtextfield
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />
                {role === "agent" && (
                  <>
                    <Typography marginTop="20px" textAlign="left">
                      Select
                    </Typography>
                    <Grid container marginTop={{ lg: "12px", xs: "12px" }}>
                      <Grid item xs="auto">
                        <Box
                          onClick={() => {
                            setSubRole("Foreign Agent");
                          }}
                          border={1}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: {
                              xs: "255px",
                              lg: "200px",
                            },
                            height: {
                              xs: "48px",
                              lg: "48px",
                            },
                            borderColor:
                              subrole === "Foreign Agent" ? "Black" : "Black",
                            borderRadius: "13px",
                            backgroundColor:
                              subrole === "Foreign Agent" ? "black" : "#FFFFFF",
                            cursor: "pointer",
                            marginTop: { lg: "0px", xs: "0px" },
                          }}
                        >
                          <Typography
                            sx={{
                              color:
                                subrole === "Foreign Agent" ? "white" : "black",
                            }}
                          >
                            Foreign Agent
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item marginLeft={{ lg: "12px" }}>
                        <Box
                          onClick={() => {
                            setSubRole("Local Agent");
                          }}
                          border={1}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: {
                              xs: "255px",
                              lg: "200px",
                            },
                            height: {
                              xs: "48px",
                              lg: "48px",
                            },
                            borderColor:
                              subrole === "Local Agent" ? "black" : "black",
                            borderRadius: "13px",
                            backgroundColor:
                              subrole === "Local Agent" ? "black" : "#FFFFFF",
                            cursor: "pointer",
                            marginTop: { lg: "0px", xs: "16px" },
                          }}
                        >
                          <Typography
                            sx={{
                              color:
                                subrole === "Local Agent" ? "white" : "black",
                            }}
                          >
                            Sri Lankan Agent
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    {subrole === "Local Agent" && (
                      <Customtextfield
                        label="NIC"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                        marginTop="16px"
                        marginBottom="16px"
                        width={{
                          xl: "98%",
                          lg: "115%",
                          xs: "270px",
                          md: "110%",
                          sm: "110%",
                        }}
                      />
                    )}
                    {subrole === "Foreign Agent" && (
                      <Customtextfield
                        label="Passport Number"
                        value={passport}
                        onChange={(e) => setPassport(e.target.value)}
                        marginTop="16px"
                        marginBottom="16px"
                        width={{
                          xl: "98%",
                          lg: "115%",
                          xs: "270px",
                          md: "110%",
                          sm: "110%",
                        }}
                      />
                    )}
                    {(subrole === "Foreign Agent" ||
                      subrole === "Local Agent") && (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          id="uploadImageInput"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="uploadImageInput">
                          <Button
                            variant="outlined"
                            sx={{
                              color: "black",
                              borderColor: "black",
                              marginTop: "16px",
                              "&:hover": {
                                color: "black",
                                borderColor: "black",
                              },
                            }}
                            component="span"
                          >
                            Upload image of{" "}
                            {subrole === "Local Agent" ? (
                              <>NIC Front/Back</>
                            ) : (
                              <>Passport</>
                            )}
                          </Button>
                        </label>
                        {image && <p>Selected Image: {image.name}</p>}
                      </div>
                    )}
                  </>
                )}

{subrole === "Foreign Agent" && (
                  <>
                    <Typography marginTop="16px" textAlign="left">
                      Origin Country
                    </Typography>
                    <Select
                      sx={{
                        width: "95%",
                        marginTop: "15px",
                        borderColor: "black",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                      }}
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      {countryNames.map((name, index) => (
                        <MenuItem key={index} value={name} >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
                <Customtextfield
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />

                
<Grid item xs={4} marginTop="16px">
            <FormControl fullWidth>
              <InputLabel
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: '18px',
                  marginBottom: '18px',
                  fontSize: '17px',
                }}
              >
                Country Code
              </InputLabel>
              <Select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                sx={{
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '18px',
                  },
                }}
              >
                <MenuItem value="+94">Sri Lanka (+94)</MenuItem>
                <MenuItem value="+1">United States (+1)</MenuItem>
                <MenuItem value="+44">United Kingdom (+44)</MenuItem>
                <MenuItem value="+91">India (+91)</MenuItem>
                <MenuItem value="+61">Australia (+61)</MenuItem>
                <MenuItem value="+81">Japan (+81)</MenuItem>
                <MenuItem value="+49">Germany (+49)</MenuItem>
                <MenuItem value="+33">France (+33)</MenuItem>
                <MenuItem value="+39">Italy (+39)</MenuItem>
                <MenuItem value="+86">China (+86)</MenuItem>
                <MenuItem value="+82">South Korea (+82)</MenuItem>
                <MenuItem value="+31">Netherlands (+31)</MenuItem>
                <MenuItem value="+41">Switzerland (+41)</MenuItem>
                {/* Add more country codes as needed */}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12} md={8}>
            <Customtextfield
              label="Contact Number"
              placeholder=": (+94) 071 2915 150"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              marginTop="8px"
              width={{
                xl: "98%",
                lg: "115%",
                xs: "270px",
                md: "110%",
                sm: "110%",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {countryCode}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>


                <Customtextfield
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />
                <Customtextfield
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                  />
                  
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
                  onClick={handleSubmitAgent}
                >
                  {loading ? <CircularProgress size={24} /> : "Register"}
                </Button>
              </Grid>
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={2}>
            <Grid paddingLeft={{ lg: "32px" }}>
              <Customtextfield
                label="Name"
                marginTop="16px"
                width={{xl:"98%", lg: "115%", xs: "270px",md:"110%",sm:"110%" }}
              />
              <Customtextfield
                label="Email"
                type="email" 
                marginTop="16px"
                width={{xl:"98%", lg: "115%", xs: "270px",md:"110%",sm:"110%" }}
              />
              <Customtextfield
                label="Contact Number"
                marginTop="16px"
                width={{xl:"98%", lg: "115%", xs: "270px",md:"110%",sm:"110%" }}
              />
              <Customtextfield
                label="Password"
                type="password" 
                marginTop="16px"
                width={{xl:"98%", lg: "115%", xs: "270px",md:"110%",sm:"110%" }}
              />
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
              >
                Register
              </Button>
            </Grid>
          </CustomTabPanel> */}

            <CustomTabPanel value={value} index={2}>
              <Grid paddingLeft={{ lg: "32px" }}>
                <Customtextfield
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />
                <Customtextfield
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />

                

<Grid item xs={4} marginTop="16px">
            <FormControl fullWidth>
              <InputLabel
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: '18px',
                  marginBottom: '18px',
                  fontSize: '17px',
                }}
              >
                Country Code
              </InputLabel>
              <Select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                sx={{
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '18px',
                  },
                }}
              >
                <MenuItem value="+94">Sri Lanka (+94)</MenuItem>
                <MenuItem value="+1">United States (+1)</MenuItem>
                <MenuItem value="+44">United Kingdom (+44)</MenuItem>
                <MenuItem value="+91">India (+91)</MenuItem>
                <MenuItem value="+61">Australia (+61)</MenuItem>
                <MenuItem value="+81">Japan (+81)</MenuItem>
                <MenuItem value="+49">Germany (+49)</MenuItem>
                <MenuItem value="+33">France (+33)</MenuItem>
                <MenuItem value="+39">Italy (+39)</MenuItem>
                <MenuItem value="+86">China (+86)</MenuItem>
                <MenuItem value="+82">South Korea (+82)</MenuItem>
                <MenuItem value="+31">Netherlands (+31)</MenuItem>
                <MenuItem value="+41">Switzerland (+41)</MenuItem>
                {/* Add more country codes as needed */}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12} md={8}>
            <Customtextfield
              label="Contact Number"
              placeholder=": (+94) 071 2915 150"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              marginTop="8px"
              width={{
                xl: "98%",
                lg: "115%",
                xs: "270px",
                md: "110%",
                sm: "110%",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {countryCode}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>


                <Customtextfield
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />
                <Customtextfield
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                  />
                  
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
                  onClick={handleSubmitSeller}
                >
                  {loading ? <CircularProgress size={24} /> : "Register"}
                </Button>
              </Grid>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={3}>
              <Grid paddingLeft={{ lg: "32px" }}>
                <Customtextfield
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="uploadProfileImageInput"
                  onChange={handleFileChange}
                />
                <Typography textAlign="left" marginTop="16px">
                  Profile Photo:
                </Typography>

                <label htmlFor="uploadProfileImageInput">
                  <Button
                    variant="outlined"
                    sx={{
                      color: "black",
                      borderColor: "black",
                      marginTop: "16px",
                      "&:hover": {
                        color: "black",
                        borderColor: "black",
                      },
                      marginLeft: {
                        lg: "-400px",
                        md: "-200px",
                        xs: "0px",
                        sm: "-240px",
                        xl: "-380px",
                      },
                    }}
                    component="span"
                  >
                    Upload Profile Image
                  </Button>
                </label>
                <div>
                  {profileImage && (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt={`Uploaded`}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        margin: "5px",
                      }}
                    />
                  )}
                </div>
                {profileImage && (
                  <p>Selected Profile Image: {profileImage.name}</p>
                )}
                <Customtextfield
                  label="NIC"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />

                <Customtextfield
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />

                
<Grid item xs={4} marginTop="16px">
            <FormControl fullWidth>
              <InputLabel
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: '18px',
                  marginBottom: '18px',
                  fontSize: '17px',
                }}
              >
                Country Code
              </InputLabel>
              <Select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                sx={{
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '18px',
                  },
                }}
              >
                <MenuItem value="+94">Sri Lanka (+94)</MenuItem>
                <MenuItem value="+1">United States (+1)</MenuItem>
                <MenuItem value="+44">United Kingdom (+44)</MenuItem>
                <MenuItem value="+91">India (+91)</MenuItem>
                <MenuItem value="+61">Australia (+61)</MenuItem>
                <MenuItem value="+81">Japan (+81)</MenuItem>
                <MenuItem value="+49">Germany (+49)</MenuItem>
                <MenuItem value="+33">France (+33)</MenuItem>
                <MenuItem value="+39">Italy (+39)</MenuItem>
                <MenuItem value="+86">China (+86)</MenuItem>
                <MenuItem value="+82">South Korea (+82)</MenuItem>
                <MenuItem value="+31">Netherlands (+31)</MenuItem>
                <MenuItem value="+41">Switzerland (+41)</MenuItem>
                {/* Add more country codes as needed */}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12} md={8}>
            <Customtextfield
              label="Contact Number"
              placeholder=": (+94) 071 2915 150"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              marginTop="8px"
              width={{
                xl: "98%",
                lg: "115%",
                xs: "270px",
                md: "110%",
                sm: "110%",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {countryCode}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>


                <div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="uploadImageInput"
                    onChange={handleCertificateImage}
                  />
                  <label htmlFor="uploadImageInput">
                    <Button
                      variant="outlined"
                      sx={{
                        color: "black",
                        borderColor: "black",
                        marginTop: "16px",
                        "&:hover": {
                          color: "black",
                          borderColor: "black",
                        },
                        marginLeft: {
                          lg: "-350px",
                          md: "-200px",
                          xs: "0px",
                          sm: "-240px",
                          xl: "-250px",
                        },
                      }}
                      component="span"
                    >
                      Upload image of Guide Certificate
                    </Button>
                  </label>
                  <div>
                    {certificateImage && (
                      <img
                        src={URL.createObjectURL(certificateImage)}
                        alt={`Uploaded`}
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          margin: "5px",
                        }}
                      />
                    )}
                  </div>
                  {certificateImage && (
                    <p>Selected Image: {certificateImage.name}</p>
                  )}

                  <Customtextfield
                    label="Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    marginTop="16px"
                    width={{
                      xl: "98%",
                      lg: "115%",
                      xs: "270px",
                      md: "110%",
                      sm: "110%",
                    }}
                  />
                  <FormControl fullWidth>
                    <Typography marginTop="16px" textAlign="left">
                      Location
                    </Typography>
                    <Select
                      sx={{ width: "95%", marginTop: "15px" }}
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    >
                      {locations.map((location) => (
                        <MenuItem
                          key={location._id}
                          value={location.locationName}
                        >
                          {location.locationName}
                        </MenuItem>
                      ))}
                    </Select>
                    {location === "" && (
                      <Typography color="error">
                        Location is required
                      </Typography>
                    )}
                  </FormControl>
                </div>
                <Customtextfield
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />
                <Customtextfield
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                  />
                  
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
                  onClick={handleCheckoutGuide}
                >
                  {loading ? <CircularProgress size={24} /> : "Register"}
                </Button>
              </Grid>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={4}>
              <Grid paddingLeft={{ lg: "32px" }}>
                <Customtextfield
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />
                <Typography textAlign="left" marginTop="16px">
                  Profile Photo:
                </Typography>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="uploadImageInput"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="uploadImageInput">
                    <Button
                      variant="outlined"
                      sx={{
                        color: "black",
                        borderColor: "black",
                        marginTop: "16px",
                        "&:hover": {
                          color: "black",
                          borderColor: "black",
                        },
                        marginLeft: {
                          lg: "-400px",
                          md: "-200px",
                          xs: "0px",
                          sm: "-240px",
                          xl: "-380px",
                        },
                      }}
                      component="span"
                    >
                      Upload Profile image
                    </Button>
                  </label>
                  <div>
                    {profileImage && (
                      <img
                        src={URL.createObjectURL(profileImage)}
                        alt={`Uploaded`}
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          margin: "5px",
                        }}
                      />
                    )}
                  </div>
                  {profileImage && <p>Selected Image: {profileImage.name}</p>}
                </div>
                <Typography marginTop="20px" textAlign="left">
                  Select
                </Typography>

                <Grid container marginTop={{ lg: "12px", xs: "12px" }}>
                  <Grid item xs="auto">
                    <Box
                      onClick={() => {
                        setSubRole("Foreign Partner");
                      }}
                      border={1}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: {
                          xs: "255px",
                          lg: "200px",
                        },
                        height: {
                          xs: "48px",
                          lg: "48px",
                        },
                        borderColor:
                          subrole === "Foreign Partner" ? "Black" : "Black",
                        borderRadius: "13px",
                        backgroundColor:
                          subrole === "Foreign Partner" ? "black" : "#FFFFFF",
                        cursor: "pointer",
                        marginTop: { lg: "0px", xs: "0px" },
                      }}
                    >
                      <Typography
                        sx={{
                          color:
                            subrole === "Foreign Partner" ? "white" : "black",
                        }}
                      >
                        Foreign Travel Partner
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item marginLeft={{ lg: "12px" }}>
                    <Box
                      onClick={() => {
                        setSubRole("Local Partner");
                      }}
                      border={1}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: {
                          xs: "255px",
                          lg: "200px",
                        },
                        height: {
                          xs: "48px",
                          lg: "48px",
                        },
                        borderColor:
                          subrole === "Local Partner" ? "black" : "black",
                        borderRadius: "13px",
                        backgroundColor:
                          subrole === "Local Partner" ? "black" : "#FFFFFF",
                        cursor: "pointer",
                        marginTop: {
                          lg: "0px",
                          xs: "16px",
                          sm: "0px",
                          md: "16px",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          color:
                            subrole === "Local Partner" ? "white" : "black",
                        }}
                      >
                        Sri Lankan Travel Partner
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Customtextfield
                  label={subrole === "Foreign Partner" ? "Passport" : "NIC"}
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />
                {subrole === "Foreign Partner" && (
                  <>
                    <Typography marginTop="16px" textAlign="left">
                      Origin Country
                    </Typography>
                    <Select
                      sx={{
                        width: "95%",
                        marginTop: "15px",
                        borderColor: "black",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                      }}
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      {countryNames.map((name, index) => (
                        <MenuItem key={index} value={name} >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
                <Customtextfield
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />

                <FormControl
                  style={{
                    marginTop: "16px",
                    width: "98%" // Adjust the width for different breakpoints if necessary
                  }}
                >
                  <InputLabel style={{fontWeight: "600"}}>Select Gender</InputLabel>
                  <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    label="Gender"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>

                <Customtextfield
                  label="Age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />

                <Customtextfield
                  label="Discription"
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />

                <Customtextfield
                  label="Interest"
                  type="text"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />

                
<Grid item xs={4} marginTop="16px">
            <FormControl fullWidth>
              <InputLabel
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: '18px',
                  marginBottom: '18px',
                  fontSize: '17px',
                }}
              >
                Country Code
              </InputLabel>
              <Select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                sx={{
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '18px',
                  },
                }}
              >
                <MenuItem value="+94">Sri Lanka (+94)</MenuItem>
                <MenuItem value="+1">United States (+1)</MenuItem>
                <MenuItem value="+44">United Kingdom (+44)</MenuItem>
                <MenuItem value="+91">India (+91)</MenuItem>
                <MenuItem value="+61">Australia (+61)</MenuItem>
                <MenuItem value="+81">Japan (+81)</MenuItem>
                <MenuItem value="+49">Germany (+49)</MenuItem>
                <MenuItem value="+33">France (+33)</MenuItem>
                <MenuItem value="+39">Italy (+39)</MenuItem>
                <MenuItem value="+86">China (+86)</MenuItem>
                <MenuItem value="+82">South Korea (+82)</MenuItem>
                <MenuItem value="+31">Netherlands (+31)</MenuItem>
                <MenuItem value="+41">Switzerland (+41)</MenuItem>
                {/* Add more country codes as needed */}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12} md={8}>
            <Customtextfield
              label="Contact Number"
              placeholder=": (+94) 071 2915 150"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              marginTop="8px"
              width={{
                xl: "98%",
                lg: "115%",
                xs: "270px",
                md: "110%",
                sm: "110%",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {countryCode}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>


                <FormControl fullWidth>
                  <Typography marginTop="16px" textAlign="left">
                    Partner in Location
                  </Typography>
                  <Select
                    sx={{
                      width: "95%",
                      marginTop: "15px",
                      borderColor: "black",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                    }}
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  >
                    {locations.map((location) => (
                      <MenuItem
                        key={location._id}
                        value={location.locationName}
                      >
                        {location.locationName}
                      </MenuItem>
                    ))}
                  </Select>
                  {location === "" && (
                    <Typography color="error">Location is required</Typography>
                  )}
                </FormControl>

                <Customtextfield
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                />
                <Customtextfield
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  marginTop="16px"
                  width={{
                    xl: "98%",
                    lg: "115%",
                    xs: "270px",
                    md: "110%",
                    sm: "110%",
                  }}
                  />
                  

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
                  onClick={handleCheckoutPartner}
                >
                  {loading ? <CircularProgress size={24} /> : "Register"}
                </Button>
              </Grid>
            </CustomTabPanel>
          </Grid>
        </Grid>
      </center>
    </Grid>
  );
};

export default Register;