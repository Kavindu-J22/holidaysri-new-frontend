import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Customtextfield from './Customtextfield';
import CircularProgress from '@mui/material/CircularProgress';
import { signInWithGooglePopup } from '../Login/firebase'; // Ensure this is correctly imported from your Firebase setup
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false); // New state for Google sign-in loading
    const [showContactPopup, setShowContactPopup] = useState(false);
    const [countryCode, setCountryCode] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [name, setName] = useState("");

    const underline = {
        underlineOnHover: {
            textDecoration: "none",
            color: "inherit",
            borderBottom: "1px solid transparent",
            transition: "border-bottom 0.3s ease",
        },
    };

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        try {
            const response = await signInWithGooglePopup();

            if (!response || !response.user) {
                throw new Error("Google Sign-In failed. No user data returned.");
            }

            const email = response.user.email;
            const userName = email.split("@")[0]; // Extract first part of email as the name
            setUserEmail(email);
            setName(userName);

            // API Payload
            const payload = {
                name: userName,
                email: email,
                contactNumber: "",
                countryCode: "",
                password: "Holidaysri1111", // Default password
                role: "user",
                RegisterType: "Google Continued User",
            };

            // Save the user to MongoDB
            const apiResponse = await fetch("https://holidaysri-backend.onrender.com/api/auth/registeruser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (apiResponse.ok) {
                console.log("User saved successfully in the database.");
                // Show the contact details popup
                setShowContactPopup(true);
            } else if (apiResponse.status === 400) {
                console.log("User already exists in the database. Continuing login process...");
                // setShowContactPopup(false); // Don't Show popup even for existing users
                window.location.href = "/";
            } else {
                throw new Error("Error saving user to the database.");
            }

            // Save to localStorage
            localStorage.setItem("userRole", "user");
            localStorage.setItem("userEmail", email);
        } catch (error) {
            console.error("Error during Google Sign-In", error);
            alert("Google Sign-In failed. Please try again.");
        } finally {
            setGoogleLoading(false);
        }
    };
    
    const handleSaveContactDetails = async () => {
        if (!countryCode || !contactNumber) {
            alert("Please provide both country code and contact number.");
            return;
        }

        try {
            const updatePayload = {
                countryCode: countryCode,
                contactNumber: contactNumber,
            };

            const updateResponse = await fetch(`https://holidaysri-backend.onrender.com/api/user/update-contact/${userEmail}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatePayload),
            });

            if (updateResponse.ok) {
                alert(`🎉 **Welcome to Holidaysri, ${name}!** 🎉\n\n🌟 **Unlock exciting opportunities, enjoy amazing benefits, and start earning today!** 🌟\n\nLet the journey begin With Your New user Gift! 🚀`);
                setShowContactPopup(false);
                window.location.href = "/";
            } else {
                throw new Error("Error updating contact details.");
            }
        } catch (error) {
            console.error("Error saving contact details", error);
            alert("Failed to save contact details. Please try again.");
        }
    };

    const sendData = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }
    
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            alert("Invalid email");
            return;
        }
    
        if (/[A-Z]/.test(email)) {
            alert("Email should not contain capital letters");
            return;
        }
    
        setLoading(true);
    
        const newUser = { email, password };
    
        try {
            // Try user login
            const res1 = await axios.post("https://holidaysri-backend-9xm4.onrender.com/api/auth/userlogin", newUser);
            alert("Login Success");
    
            // Save user data to localStorage
            localStorage.setItem("authToken", res1.data.token);
            localStorage.setItem("userRole", res1.data.user.role);
            localStorage.setItem("userEmail", res1.data.email);
            localStorage.setItem("userId", res1.data.user._id);
            localStorage.setItem("userName", res1.data.user.name);
            localStorage.setItem("countryCode", res1.data.user.countryCode);
            localStorage.setItem("isAdvertiser", res1.data.user.isAdvertiser);
            localStorage.setItem("isAgent", res1.data.user.isAgent);
            localStorage.setItem("isGuider", res1.data.user.isGuider);
            localStorage.setItem("isPartner", res1.data.user.isPartner);
            localStorage.setItem("subscription", res1.data.user.subscription);
            localStorage.setItem("RegisterType", res1.data.user.RegisterType);
            
    
            // Clear form fields
            setEmail("");
            setPassword("");
    
            // Redirect to user dashboard
            window.location = "/";
        } catch (err1) {
            try {
                // If user login fails, try admin login
                const res2 = await axios.post("https://holidaysri-backend-9xm4.onrender.com/api/auth/adminlogin", newUser);
                alert("Welcome Admin");
    
                // Save admin data to localStorage
                localStorage.setItem("authToken", res2.data.token);
                localStorage.setItem("userRole", res2.data.admin.role);
                localStorage.setItem("userEmail", res2.data.email);
                localStorage.setItem("notificationStatus", "have");
    
                // Clear form fields
                setEmail("");
                setPassword("");
    
                // Redirect to admin dashboard
                window.location = "/admin";
            } catch (err2) {
                alert("Invalid Credentials");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate('/'); // This will navigate to the homepage
      };         

    return (
        <Box className="loginform" sx={{ width: { lg: '500px', xs: '330px', sm: "540px", md: "520px" }, marginLeft: { lg: '0px', xs: '0px', sm: '40px', md: "50px" }, marginTop: { xs: '30px', lg: '32px' } }}>

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

        <Typography 
        sx={{ 
            color: 'black', 
            fontSize: '22px', 
            fontWeight: '600', 
            display: 'flex', 
            justifyContent: 'center', 
            width: '100%' 
        }}
        >
        HOLIDAYSRI - LOGIN 🍃
        </Typography>

            <form onSubmit={sendData}>
                <div>
                    <Customtextfield color='#222' label="Email :" marginTop="16px" width={{ xl: "75%", lg: "75%", xs: "280px", md: "105%", sm: "110%" }}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Customtextfield color='#222' label="Password :" marginTop="16px" width={{ xl: "75%", lg: "75%", xs: "280px", md: "105%", sm: "110%" }}
                        type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                        borderRadius: "30px",
                        boxShadow: "none",
                        width: { lg: "100%", xs: '100%' },
                        backgroundColor: "rgb(8, 73, 67)",
                        color: "#fff",
                        marginTop: "32px",
                        height: "48px",
                        "&:hover": {
                            backgroundColor: "rgb(17, 97, 89)",
                            color: "white",
                            boxShadow: "none",
                        },
                    }}
                >
                    {loading ? <CircularProgress size={24} /> : "SIgn in"}
                </Button>
            </form>
            <Button
            variant="outlined"
            size="medium"
            sx={{
                borderRadius: "30px",
                borderColor: "black",
                boxShadow: "none",
                width: { lg: "100%", xs: '100%' },
                backgroundColor: "rgb(7, 59, 54)",
                color: "#fff",
                marginTop: "10px",
                height: "48px",
                display: 'flex',
                alignItems: 'center', // Vertically align the icon and text
                justifyContent: 'center', // Center the content horizontally
                "&:hover": {
                backgroundColor: "rgb(14, 82, 75)",
                color: "white",
                boxShadow: "none",
                },
            }}
            onClick={handleGoogleSignIn}
            >
            {googleLoading ? (
                <CircularProgress size={24} />
            ) : (
                <>
                <FcGoogle style={{ fontSize: '24px', marginRight: '10px' }} /> {/* Icon size and spacing */}
                Continue with Google
                </>
            )}
            </Button>

            

            <Typography
                sx={{
                    color: "#333",
                    fontSize: { lg: "14px", xs: '13px' },
                    marginTop: "15px",
                    marginLeft: { lg: "40%", xs: '8px' },
                }}
            >
                <a className='fogotpw'
                    href="/forgotPassword"
                    style={underline.underlineOnHover}
                    onMouseOver={(e) => {
                        e.currentTarget.style.borderBottom = "1px solid #000";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.borderBottom = "1px solid transparent";
                    }}
                >
                    Forgot Password?
                </a>
            </Typography>
            <Typography
            sx={{
                color: "#333",
                fontSize: { lg: "12px", xs: '14px' },
                marginTop: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center", // Center align the entire text block
                flexDirection: "column", // Stack text in a column format
            }}
            >
            New to HolidaySri? (Don't have an account?)
            <a
                href="/register"
                style={{
                fontWeight: '550',
                fontSize: '12px',
                color: 'rgb(3, 29, 21)', // Use a standout color
                marginTop: '7px', // Add spacing between the sentences
                textDecoration: 'none', // Remove underline by default
                "&:hover": {
                    textDecoration: 'underline', // Add underline on hover
                },
                }}
            >
                CLICK HERE TO SIGN-UP NOW !
            </a>
            </Typography>

            {/* Contact Details Popup */}
            {showContactPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        {/* Coin Image */}
                        <div className="coin-image-container">
                            <img
                                src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1734593799/download-removebg-preview_1-removebg-preview_u1ugnm.webp"
                                alt="Coin"
                                className="coin-image"
                            />
                        </div>
                        {/* Popup Content */}
                        <h2 className="popup-title">🎉 Congratulations {name}! 🎉</h2>
                        <p className="popup-text">
                            You have joined us as a new user. Here's your <strong>100 HSG (Gems) Gift</strong> 🎁.
                            <br />
                            To complete your registration, please provide the details below:
                        </p>
                        {/* Country Code Input */}
                        <label className="popup-label">
                            Country Code:
                            <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="popup-select"
                            >
                                <option value="">Select Country Code</option>
                                <option value="+93">+93 - Afghanistan 🇦🇫</option>
                                <option value="+355">+355 - Albania 🇦🇱</option>
                                <option value="+213">+213 - Algeria 🇩🇿</option>
                                <option value="+1">+1 - United States 🇺🇸</option>
                                <option value="+376">+376 - Andorra 🇦🇩</option>
                                <option value="+244">+244 - Angola 🇦🇴</option>
                                <option value="+54">+54 - Argentina 🇦🇷</option>
                                <option value="+374">+374 - Armenia 🇦🇲</option>
                                <option value="+61">+61 - Australia 🇦🇺</option>
                                <option value="+43">+43 - Austria 🇦🇹</option>
                                <option value="+994">+994 - Azerbaijan 🇦🇿</option>
                                <option value="+599">+599 - Aruba 🇦🇼</option>
                                <option value="+247">+247 - Ascension Island 🇦🇨</option>
                                <option value="+672">+672 - Antarctica 🇦🇶</option>
                                <option value="+3744">+3744 - Artsakh (Nagorno-Karabakh) 🇦🇲</option>
                                <option value="+973">+973 - Bahrain 🇧🇭</option>
                                <option value="+880">+880 - Bangladesh 🇧🇩</option>
                                <option value="+1">+1 - Canada 🇨🇦</option>
                                <option value="+32">+32 - Belgium 🇧🇪</option>
                                <option value="+229">+229 - Benin 🇧🇯</option>
                                <option value="+975">+975 - Bhutan 🇧🇹</option>
                                <option value="+591">+591 - Bolivia 🇧🇴</option>
                                <option value="+387">+387 - Bosnia and Herzegovina 🇧🇦</option>
                                <option value="+267">+267 - Botswana 🇧🇼</option>
                                <option value="+55">+55 - Brazil 🇧🇷</option>
                                <option value="+673">+673 - Brunei 🇧🇳</option>
                                <option value="+359">+359 - Bulgaria 🇧🇬</option>
                                <option value="+591">+591 - Barbados 🇧🇧</option>
                                <option value="+375">+375 - Belarus 🇧🇾</option>
                                <option value="+501">+501 - Belize 🇧🇿</option>
                                <option value="+226">+226 - Burkina Faso 🇧🇫</option>
                                <option value="+855">+855 - Cambodia 🇰🇭</option>
                                <option value="+237">+237 - Cameroon 🇨🇲</option>
                                <option value="+238">+238 - Cape Verde 🇨🇻</option>
                                <option value="+56">+56 - Chile 🇨🇱</option>
                                <option value="+86">+86 - China 🇨🇳</option>
                                <option value="+57">+57 - Colombia 🇨🇴</option>
                                <option value="+269">+269 - Comoros 🇰🇲</option>
                                <option value="+53">+53 - Cuba 🇨🇺</option>
                                <option value="+357">+357 - Cyprus 🇨🇾</option>
                                <option value="+45">+45 - Denmark 🇩🇰</option>
                                <option value="+253">+253 - Djibouti 🇩🇯</option>
                                <option value="+1">+1 - Dominica 🇩🇲</option>
                                <option value="+1">+1 - Dominican Republic 🇩🇴</option>
                                <option value="+20">+20 - Egypt 🇪🇬</option>
                                <option value="+503">+503 - El Salvador 🇸🇻</option>
                                <option value="+240">+240 - Equatorial Guinea 🇬🇶</option>
                                <option value="+291">+291 - Eritrea 🇪🇷</option>
                                <option value="+372">+372 - Estonia 🇪🇪</option>
                                <option value="+251">+251 - Ethiopia 🇪🇹</option>
                                <option value="+500">+500 - Falkland Islands 🇫🇰</option>
                                <option value="+593">+593 - Ecuador 🇪🇨</option>
                                <option value="+679">+679 - Fiji 🇫🇯</option>
                                <option value="+358">+358 - Finland 🇫🇮</option>
                                <option value="+33">+33 - France 🇫🇷</option>
                                <option value="+298">+298 - Faroe Islands 🇫🇴</option>
                                <option value="+220">+220 - Gambia 🇬🇲</option>
                                <option value="+995">+995 - Georgia 🇬🇪</option>
                                <option value="+49">+49 - Germany 🇩🇪</option>
                                <option value="+233">+233 - Ghana 🇬🇭</option>
                                <option value="+30">+30 - Greece 🇬🇷</option>
                                <option value="+502">+502 - Guatemala 🇬🇹</option>
                                <option value="+44">+44 - Guernsey 🇬🇬</option>
                                <option value="+224">+224 - Guinea 🇬🇳</option>
                                <option value="+245">+245 - Guinea-Bissau 🇬🇼</option>
                                <option value="+592">+592 - Guyana 🇬🇾</option>
                                <option value="+504">+504 - Honduras 🇭🇳</option>
                                <option value="+36">+36 - Hungary 🇭🇺</option>
                                <option value="+509">+509 - Haiti 🇭🇹</option>
                                <option value="+98">+98 - Iran 🇮🇷</option>
                                <option value="+964">+964 - Iraq 🇮🇶</option>
                                <option value="+353">+353 - Ireland 🇮🇪</option>
                                <option value="+972">+972 - Israel 🇮🇱</option>
                                <option value="+39">+39 - Italy 🇮🇹</option>
                                <option value="+225">+225 - Ivory Coast 🇮🇨</option>
                                <option value="+1">+1 - Iceland 🇮🇸</option>
                                <option value="+91">+91 - India 🇮🇳</option>
                                <option value="+62">+62 - Indonesia 🇮🇩</option>
                                <option value="+354">+354 - Iceland 🇮🇸</option>
                                <option value="+81">+81 - Japan 🇯🇵</option>
                                <option value="+962">+962 - Jordan 🇯🇴</option>
                                <option value="+1">+1 - Jamaica 🇯🇲</option>
                                <option value="+965">+965 - Kuwait 🇰🇼</option>
                                <option value="+996">+996 - Kyrgyzstan 🇰🇬</option>
                                <option value="+254">+254 - Kenya 🇰🇪</option>
                                <option value="+850">+850 - North Korea 🇰🇵</option>
                                <option value="+82">+82 - South Korea 🇰🇷</option>
                                <option value="+961">+961 - Lebanon 🇱🇧</option>
                                <option value="+266">+266 - Lesotho 🇱🇸</option>
                                <option value="+231">+231 - Liberia 🇱🇸</option>
                                <option value="+218">+218 - Libya 🇱🇾</option>
                                <option value="+370">+370 - Lithuania 🇱🇹</option>
                                <option value="+352">+352 - Luxembourg 🇱🇺</option>
                                <option value="+261">+261 - Madagascar 🇲🇬</option>
                                <option value="+265">+265 - Malawi 🇲🇼</option>
                                <option value="+60">+60 - Malaysia 🇲🇾</option>
                                <option value="+960">+960 - Maldives 🇲🇻</option>
                                <option value="+223">+223 - Mali 🇲🇱</option>
                                <option value="+356">+356 - Malta 🇲🇹</option>
                                <option value="+692">+692 - Marshall Islands 🇲🇭</option>
                                <option value="+52">+52 - Mexico 🇲🇽</option>
                                <option value="+373">+373 - Moldova 🇲🇩</option>
                                <option value="+377">+377 - Monaco 🇲🇨</option>
                                <option value="+976">+976 - Mongolia 🇲🇳</option>
                                <option value="+382">+382 - Montenegro 🇲🇪</option>
                                <option value="+1664">+1664 - Montserrat 🇲🇸</option>
                                <option value="+212">+212 - Morocco 🇲🇦</option>
                                <option value="+258">+258 - Mozambique 🇲🇿</option>
                                <option value="+95">+95 - Myanmar 🇲🇲</option>
                                <option value="+227">+227 - Niger 🇳🇪</option>
                                <option value="+234">+234 - Nigeria 🇳🇬</option>
                                <option value="+683">+683 - Niue 🇳🇺</option>
                                <option value="+672">+672 - Norfolk Island 🇳🇫</option>
                                <option value="+47">+47 - Norway 🇳🇴</option>
                                <option value="+977">+977 - Nepal 🇳🇵</option>
                                <option value="+505">+505 - Nicaragua 🇳🇮</option>
                                <option value="+31">+31 - Netherlands 🇳🇱</option>
                                <option value="+64">+64 - New Zealand 🇳🇿</option>
                                <option value="+968">+968 - Oman 🇴🇲</option>
                                <option value="+51">+51 - Peru 🇵🇪</option>
                                <option value="+63">+63 - Philippines 🇵🇭</option>
                                <option value="+48">+48 - Poland 🇵🇱</option>
                                <option value="+351">+351 - Portugal 🇵🇹</option>
                                <option value="+680">+680 - Palau 🇵🇼</option>
                                <option value="+595">+595 - Paraguay 🇵🇾</option>
                                <option value="+1">+1 - Panama 🇵🇦</option>
                                <option value="+974">+974 - Qatar 🇶🇦</option>
                                <option value="+262">+262 - Reunion 🇷🇪</option>
                                <option value="+40">+40 - Romania 🇷🇴</option>
                                <option value="+7">+7 - Russia 🇷🇺</option>
                                <option value="+250">+250 - Rwanda 🇷🇼</option>
                                <option value="+290">+290 - Saint Helena 🇸🇭</option>
                                <option value="+1869">+1869 - Saint Kitts and Nevis 🇰🇳</option>
                                <option value="+1758">+1758 - Saint Lucia 🇱🇨</option>
                                <option value="+1868">+1868 - Trinidad and Tobago 🇹🇹</option>
                                <option value="+1">+1 - Saint Vincent and the Grenadines 🇻🇨</option>
                                <option value="+248">+248 - Seychelles 🇸🇨</option>
                                <option value="+232">+232 - Sierra Leone 🇸🇱</option>
                                <option value="+65">+65 - Singapore 🇸🇬</option>
                                <option value="+421">+421 - Slovakia 🇸🇰</option>
                                <option value="+386">+386 - Slovenia 🇸🇮</option>
                                <option value="+252">+252 - Somalia 🇸🇴</option>
                                <option value="+27">+27 - South Africa 🇿🇦</option>
                                <option value="+34">+34 - Spain 🇪🇸</option>
                                <option value="+94">+94 - Sri Lanka 🇱🇰</option>
                                <option value="+249">+249 - Sudan 🇸🇩</option>
                                <option value="+597">+597 - Suriname 🇸🇷</option>
                                <option value="+47">+47 - Norway 🇳🇴</option>
                                <option value="+268">+268 - Eswatini 🇸🇿</option>
                                <option value="+46">+46 - Sweden 🇸🇪</option>
                                <option value="+41">+41 - Switzerland 🇨🇭</option>
                                <option value="+963">+963 - Syria 🇸🇾</option>
                                <option value="+886">+886 - Taiwan 🇹🇼</option>
                                <option value="+992">+992 - Tajikistan 🇹🇯</option>
                                <option value="+255">+255 - Tanzania 🇹🇿</option>
                                <option value="+66">+66 - Thailand 🇹🇭</option>
                                <option value="+228">+228 - Togo 🇹🇬</option>
                                <option value="+690">+690 - Tokelau 🇹🇰</option>
                                <option value="+676">+676 - Tonga 🇹🇴</option>
                                <option value="+1">+1 - Trinidad and Tobago 🇹🇹</option>
                                <option value="+216">+216 - Tunisia 🇹🇳</option>
                                <option value="+90">+90 - Turkey 🇹🇷</option>
                                <option value="+993">+993 - Turkmenistan 🇹🇲</option>
                                <option value="+1">+1 - Turks and Caicos Islands 🇹🇨</option>
                                <option value="+688">+688 - Tuvalu 🇹🇻</option>
                                <option value="+256">+256 - Uganda 🇺🇬</option>
                                <option value="+380">+380 - Ukraine 🇺🇦</option>
                                <option value="+971">+971 - United Arab Emirates 🇦🇪</option>
                                <option value="+44">+44 - United Kingdom 🇬🇧</option>
                                <option value="+1">+1 - United States 🇺🇸</option>
                                <option value="+598">+598 - Uruguay 🇺🇾</option>
                                <option value="+998">+998 - Uzbekistan 🇺🇿</option>
                                <option value="+678">+678 - Vanuatu 🇻🇺</option>
                                <option value="+379">+379 - Vatican City 🇻🇦</option>
                                <option value="+58">+58 - Venezuela 🇻🇪</option>
                                <option value="+84">+84 - Vietnam 🇻🇳</option>
                                <option value="+681">+681 - Wallis and Futuna 🇼🇫</option>
                                <option value="+967">+967 - Yemen 🇾🇪</option>
                                <option value="+260">+260 - Zambia 🇿🇲</option>
                                <option value="+263">+263 - Zimbabwe 🇿🇼</option>

                            </select>
                        </label>
                        <label className="popup-label">
                            Contact Number:
                            <input
                                type="tel"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value.replace(/\D/, ""))} // Removes non-numeric characters
                                placeholder="Enter Contact Number ( Ex: 0711112223 )"
                                className="popup-input"
                                pattern="[0-9]*" // Ensures only numbers are allowed
                                inputMode="numeric" // Opens numeric keyboard on mobile
                            />
                        </label>
                        {/* Submit Button */}
                        <button className="popup-submit-btn" onClick={handleSaveContactDetails}>
                            Submit & Start Your Journey
                        </button>
                    </div>
                </div>
            )}


<style jsx>{`
    /* Fullscreen Background Overlay with Dark and Blur Effect */
    .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7); /* Darker semi-transparent black */
        backdrop-filter: blur(10px); /* Increased blur for stronger background effect */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        border-radius: 30px;
    }

    /* Popup Container */
    .popup-content {
        background:rgba(245, 255, 253, 0.93);
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        width: 90%;
        max-width: 400px;
        text-align: center;
        padding: 20px;
        position: relative;
        animation: popupFadeIn 0.5s ease-in-out;
    }

    /* Coin Image at the Top */
    .coin-image-container {
        display: flex;
        justify-content: center;
        margin-top: -60px;
        margin-bottom: 10px;
    }

    .coin-image {
        width: 80px;
        height: 80px;
    }

    /* Popup Title */
    .popup-title {
        font-size: 1.6rem;
        font-weight: bold;
        margin: 10px 0;
        color: #2c3e50;
    }

    /* Popup Text */
    .popup-text {
        font-size: 1rem;
        color: #555;
        margin-bottom: 20px;
        line-height: 1.5;
    }

    /* Labels */
    .popup-label {
        display: block;
        font-weight: 500;
        margin: 10px 0 5px;
        color: #333;
        text-align: left;
        font-size: .8rem;
    }

    /* Input Fields */
    .popup-input,
    .popup-select {
        width: 100%;
        padding: 10px;
        font-size: .8rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-bottom: 15px;
        box-sizing: border-box;
        outline: none;
    }

    .popup-input:focus,
    .popup-select:focus {
        border-color: #2980b9;
        box-shadow: 0 0 5px rgba(41, 128, 185, 0.5);
    }

    /* Submit Button */
    .popup-submit-btn {
        background: linear-gradient(135deg,rgb(110, 26, 127),rgb(180, 131, 40)); /* Linear gradient from green shades */
        color: #fff;
        border: none;
        padding: 7px 20px;
        font-size: .9rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 10px;
        display: inline-block; /* Center button in its container */
        text-align: center; /* Center text inside button */
    }

    .popup-submit-btn:hover {
        background: linear-gradient(135deg,rgb(180, 136, 40),rgb(103, 26, 127)); /* Reverse gradient on hover */
        transform: scale(1.05); /* Slightly enlarge the button on hover */
    }

    /* Animation */
    @keyframes popupFadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`}</style>


            

        </Box>
    );
}

export default LoginForm;
