import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Customtextfield from './Customtextfield';
import CircularProgress from '@mui/material/CircularProgress';
import { signInWithGooglePopup } from '../Login/firebase'; // Ensure this is correctly imported from your Firebase setup
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { ImMenu3 } from "react-icons/im";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false); // New state for Google sign-in loading

    const underline = {
        underlineOnHover: {
            textDecoration: "none",
            color: "inherit",
            borderBottom: "1px solid transparent",
            transition: "border-bottom 0.3s ease",
        },
    };

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true); // Start Google sign-in loading
        try {
            const response = await signInWithGooglePopup();

            if (!response || !response.user) {
                throw new Error("Google Sign-In failed. No user data returned.");
            }

            console.log(response);
            const userEmail = response.user.email;
            localStorage.setItem("userRole", "user");
            localStorage.setItem("userEmail", userEmail);

            window.location.href = '/MainuserDashboard';
        } catch (error) {
            console.error("Error signing in with Google", error);
            alert("Google Sign-In failed. Please try again.");
        } finally {
            setGoogleLoading(false); // Stop Google sign-in loading
        }
    };

    const sendData = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        )) {
            alert("Invalid email");
            return;
        }else if (/[A-Z]/.test(email)) {
            alert("Email should not contain capital letters");
            return;
        }

        setLoading(true);

        const newUser = {
            email,
            password,
        };

        try {
            const res1 = await axios.post("https://holidaysri-backend-9xm4.onrender.com/api/auth/userlogin", newUser);
            alert("Login Success");

            localStorage.setItem("authToken", res1.data.token);
            localStorage.setItem("userRole", res1.data.user.role);
            localStorage.setItem("userEmail", res1.data.email);
            localStorage.setItem("notificationStatus", "have");

            setEmail("");
            setPassword("");

            window.location = "/MainuserDashboard";
        } catch (err) {
            try {
                const res2 = await axios.post("https://holidaysri-backend-9xm4.onrender.com/api/auth/adminlogin", newUser);
                alert("Welcome Admin");

                localStorage.setItem("authToken", res2.data.token);
                localStorage.setItem("userRole", res2.data.admin.role);
                localStorage.setItem("userEmail", res2.data.email);
                localStorage.setItem("notificationStatus", "have");

                setEmail("");
                setPassword("");

                window.location = "/admin";
            } catch (err) {
                try {
                    const res3 = await axios.post("https://holidaysri-backend-9xm4.onrender.com/api/auth/guidelogin", newUser);
                    alert("Welcome Guide");

                    localStorage.setItem("authToken", res3.data.token);
                    localStorage.setItem("userRole", res3.data.guide.role);
                    localStorage.setItem("userEmail", res3.data.email);
                    localStorage.setItem("userSubs", res3.data.guide.subscription);
                    localStorage.setItem("notificationStatus", "have");

                    setEmail("");
                    setPassword("");

                    window.location = "/Guider-Dashboard";
                } catch (err) {
                    try {
                        const res4 = await axios.post("https://holidaysri-backend-9xm4.onrender.com/api/auth/partnerlogin", newUser);
                        alert("Welcome Travel Partner");

                        localStorage.setItem("authToken", res4.data.token);
                        localStorage.setItem("userRole", res4.data.partner.role);
                        localStorage.setItem("userEmail", res4.data.email);
                        localStorage.setItem("userSubs", res4.data.partner.subscription);
                        localStorage.setItem("notificationStatus", "have");
                        
                        setEmail("");
                        setPassword("");

                        window.location = "/Partner-Dashboard";
                    } catch (err) {
                        try {
                            const res5 = await axios.post("https://holidaysri-backend-9xm4.onrender.com/api/auth/sellerlogin", newUser);
                            alert("Welcome Advertiser");

                            localStorage.setItem("authToken", res5.data.token);
                            localStorage.setItem("userRole", res5.data.seller.role);
                            localStorage.setItem("userEmail", res5.data.email);
                            localStorage.setItem("notificationStatus", "have");

                            setEmail("");
                            setPassword("");

                            window.location = "/foreign-dashboard";
                        } catch (err) {
                            try {
                                const res6 = await axios.post("https://holidaysri-backend-9xm4.onrender.com/api/auth/agentlogin", newUser);
                                alert("Welcome Agent");

                                localStorage.setItem("authToken", res6.data.token);
                                localStorage.setItem("userRole", res6.data.agent.role);
                                localStorage.setItem("userEmail", res6.data.email);
                                localStorage.setItem("userName", res6.data.name);
                                localStorage.setItem("subRole", res6.data.agent.subrole); // Added this line to store the subRole
                                localStorage.setItem("notificationStatus", "have");
                                
                                setEmail("");
                                setPassword("");

                                 // Check the subRole from localStorage and alert accordingly
                                const storedSubRole = res6.data.agent.subrole;

                                if (storedSubRole === "Foreign Agent") {
                                    alert("Welcome Foreign Agent to your Dashboard..!");
                                } else if (storedSubRole === "Local Agent") {
                                    alert("Welcome Local Agent to your Dashboard..!");
                                }

                                // Redirecting to the local dashboard
                                window.location = "/local-dashboard";
                                
                            } catch (err) {
                                alert("Invalid Credentials");
                            }
                        }
                    }
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="loginform" sx={{ width: { lg: '500px', xs: '330px', sm: "540px", md: "520px" }, marginLeft: { lg: '0px', xs: '0px', sm: '40px', md: "50px" }, marginTop: { xs: '30px', lg: '32px' } }}>
            <Typography sx={{ color: 'black', fontSize: '20px', fontWeight: '600' }}>HOLIDAYSRI - LOGIN 🍃</Typography>
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

        </Box>
    );
}

export default LoginForm;
