import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import { Helmet } from "react-helmet";
import EmptyNotification from "../../components/System/EmptyNotification";

const Alltourguides = () => {
  const [partners, setPartners] = useState([]);
  const [location, setLocation] = useState(null);
  const [role, setRole] = useState(null);
  const [subs, setSubs] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoding] = useState(true);
  const navigate = useNavigate();

  const { id, locationName } = useParams();

  useEffect(() => {
    async function getPartners() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/api/guide/allGuideProfiles"
        );
        setPartners(res.data);
        console.log(res.data);
        setLoding(false);
      } catch (error) {
        console.error("Error fetching partners:", error);
        setLoding(false);
        alert("Error fetching partners: " + error.message);
      }
    }
    getPartners();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("userRole");
    setRole(user);
    const subs = localStorage.getItem("userSubs");
    setSubs(subs);
  }, []);

  const handleOpen = (partner) => {
    // Handle opening modal or any other action
  };

  const filteredPartners = partners
  .filter((partner) => {
    const currentDate = new Date(); // Get the current date
    if (!partner.expirationDate) return true; // No expiration date, show guide
    return new Date(partner.expirationDate) > currentDate; // Only show if expirationDate is in the future
  });


  const [loggedUserRole, setLoggedUserRole] = useState('');
  const [loggedUserSubscription, setLoggedUserSubscription] = useState('');

  useEffect(() => {
    // Retrieve userRole and userSubs from localStorage
    const userRole = localStorage.getItem("userRole");
    const userSubs = localStorage.getItem("userSubs");

    setLoggedUserRole(userRole || '');
    setLoggedUserSubscription(userSubs || '');
  }, []); 

  const goBack = () => {
    navigate(-1); // Navigate back one step in history
  };
  const Imageproducts = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(intervalId);
    }, [images]);

    if (!images || images.length === 0) {
      return <div>No images available</div>;
    }

    return (
      <div
        style={{
          position: "relative",
          maxWidth: "600px",
          margin: "auto",
          overflow: "hidden",
          borderRadius: "20px",
        }}
      >
        <Box sx={{ width: "100%", height: "200px" }}>
          <img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            width="100%"
            height="100%"
            style={{ borderRadius: "20px" }}
            alt={`Product ${currentImageIndex + 1}`}
          />
        </Box>
      </div>
    );
  };
  return (
    <>
      <Helmet>
        <title>
          {locationName ? `Tour Guides in ${locationName}` : "All Tour Guides"}
        </title>
      </Helmet>
      <Nav />
      <Grid
        container
        sx={{
          position: "relative",
          minHeight: "100vh",
          paddingBottom: "16px",
          paddingTop: "60px",
          overflow: "hidden",
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: `url(${"https://res.cloudinary.com/dqdcmluxj/image/upload/v1733442485/pexels-filippo-peisino-2678301_njycll_dxfggu.webp"})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            filter: "blur(5px)",
            zIndex: -1,
          },
        }}
      >
        <Grid item xs={12}>
          <Box marginBottom="0px" marginTop="32px" marginLeft="16px">
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                borderRadius: "30px",
              }}
              onClick={() => window.history.back()}
            >
              Back
            </Button>{" "}
          </Box>
          <Typography
            fontSize={{ lg: "24px", xs: "18px" }}
            sx={{ color: "white" }}
            marginTop={{ lg: "16px", xs: "24px" }}
            textAlign="center"
          >
            All Tour Guides to connect
          </Typography>
          <center>
            {loading ? (
              <>
                <CircularProgress sx={{ color: "green", marginTop: "16px" }} />
              </>
            ) : (
              <>
                <Grid
                  container
                  width={{ lg: "90%" }}
                  sx={{ marginTop: { lg: "32px", xs: "24px" } }}
                  spacing={2}
                  paddingLeft={{ lg: "0px", xs: "16px" }}
                  paddingRight={{ lg: "0px", xs: "16px" }}
                >
                  {!loading && filteredPartners.length === 0 && (
                    <>
                      <EmptyNotification
                        svg={
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.9998 15L14.1665 9.16671L19.9998 3.33337L25.8332 9.16671L19.9998 15ZM1.6665 33.3334V26.6667C1.6665 25.7223 1.99317 24.9306 2.6465 24.2917C3.29984 23.6528 4.08428 23.3334 4.99984 23.3334H10.4582C11.0137 23.3334 11.5415 23.4723 12.0415 23.75C12.5415 24.0278 12.9443 24.4028 13.2498 24.875C14.0554 25.9584 15.0487 26.8056 16.2298 27.4167C17.4109 28.0278 18.6676 28.3334 19.9998 28.3334C21.3609 28.3334 22.6321 28.0278 23.8132 27.4167C24.9943 26.8056 25.9732 25.9584 26.7498 24.875C27.1109 24.4028 27.5348 24.0278 28.0215 23.75C28.5082 23.4723 29.0148 23.3334 29.5415 23.3334H34.9998C35.9443 23.3334 36.7359 23.6528 37.3748 24.2917C38.0137 24.9306 38.3332 25.7223 38.3332 26.6667V33.3334H26.6665V29.5417C25.6943 30.2362 24.6454 30.7639 23.5198 31.125C22.3943 31.4861 21.2209 31.6667 19.9998 31.6667C18.8054 31.6667 17.6387 31.4795 16.4998 31.105C15.3609 30.7306 14.3054 30.1956 13.3332 29.5V33.3334H1.6665ZM6.6665 21.6667C5.27761 21.6667 4.09706 21.1806 3.12484 20.2084C2.15262 19.2362 1.6665 18.0556 1.6665 16.6667C1.6665 15.25 2.15262 14.0628 3.12484 13.105C4.09706 12.1473 5.27761 11.6678 6.6665 11.6667C8.08317 11.6667 9.27095 12.1462 10.2298 13.105C11.1887 14.0639 11.6676 15.2512 11.6665 16.6667C11.6665 18.0556 11.1876 19.2362 10.2298 20.2084C9.27206 21.1806 8.08428 21.6667 6.6665 21.6667ZM33.3332 21.6667C31.9443 21.6667 30.7637 21.1806 29.7915 20.2084C28.8193 19.2362 28.3332 18.0556 28.3332 16.6667C28.3332 15.25 28.8193 14.0628 29.7915 13.105C30.7637 12.1473 31.9443 11.6678 33.3332 11.6667C34.7498 11.6667 35.9376 12.1462 36.8965 13.105C37.8554 14.0639 38.3343 15.2512 38.3332 16.6667C38.3332 18.0556 37.8543 19.2362 36.8965 20.2084C35.9387 21.1806 34.7509 21.6667 33.3332 21.6667Z"
                              fill="black"
                            />
                          </svg>
                        }
                        title="No added guides"
                        body={`Currently, there are no tour guides added`}
                        width={{
                          lg: "850px",
                          xs: "350px",
                          md: "auto",
                          sm: "auto",
                        }}
                        marginLefts={{
                          lg: "14%",
                          xs: "8%",
                          sm: "18%",
                          md: "25%",
                          xl: "20%",
                        }}
                      />
                    </>
                  )}
                  {filteredPartners.length > 0 ? (
                    filteredPartners.map((partner, index) => (
                      <Grid item xs={12} lg={3} sm={4} md={3} key={index}>
                        <Box
                          marginTop="20px"
                          sx={{
                            marginLeft: { lg: "0%", sx: "0%" },
                            width: { lg: "auto", sx: "280px" },
                            transform:
                              hoveredIndex === index && "translateY(-10px)",
                            transition: "transform 0.3s",
                            cursor: "default",
                          }}
                        >
                          <Card
                            sx={{
                              borderColor: "black",
                              borderRadius: "30px",
                              backgroundColor: "rgba(255,255,255, 0.5)",
                              transition: "transform 0.3s",
                              "&:hover": {
                                transform: "scale(1.05)",
                              },
                            }}
                            variant="outlined"
                            onClick={() => handleOpen(partner)}
                          >
                            <CardContent>
                              {(
                                  <Box sx={{ height: "250px" }}>
                                    <img
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                      }}
                                      src={partner.profileImage}
                                      alt="Guide Profile"
                                    />
                                  </Box>
                                )}

                              <Typography
                                component="div"
                                textAlign="left"
                                sx={{
                                  color: "black",
                                  fontWeight: "400",
                                  fontSize: { lg: "24px", xs: "20px" },
                                  textAlign: "left",
                                }}
                              >
                                {partner.name}
                              </Typography>
                              { (
                                  <>
                                    <Typography
                                      textAlign="left"
                                      variant="body1"
                                      sx={{ color: "black", marginTop: "4px" }}
                                    >
                                      Email: {partner.email}
                                    </Typography>
                                  </>
                                )}

                              <Typography
                                textAlign="left"
                                variant="body1"
                                sx={{ color: "black", marginTop: "4px" }}
                              >
                                Experience: {partner.experience}
                              </Typography>
                              {(
                                  <>
                                    <Grid container sx={{ marginTop: "4px" }}>
                                      <a
                                        href={partner.certificateImage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Typography
                                          textAlign="left"
                                          variant="body1"
                                          sx={{
                                            color: "black",
                                            marginTop: "4px",
                                            textDecoration: "underline",
                                          }}
                                        >
                                          View Certificate{" "}
                                          <svg
                                            width="9"
                                            height="11"
                                            viewBox="0 0 9 11"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M1.26667 10.5L7.66667 3.3V9.75H9V0.75H1V2.25H6.73333L0.333333 9.45L1.26667 10.5Z"
                                              fill="black"
                                            />
                                          </svg>
                                        </Typography>
                                      </a>
                                    </Grid>
                                  </>
                                )}

                               {/* location */}
                    
                      <Grid container spacing={1} marginTop="8px" display="flex" alignItems="center">
                          <Grid item xs="auto">
                            <Typography variant="body1" component="div" sx={{ color: "white", fontSize: "9px" }}>
                              <Box display="flex" width={{ lg: "50px", xs: "50px" }}>
                                <img
                                  src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337543/output-onlinegiftools_9_zciqfy_ei8c1p.gif"
                                  alt="google map"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                />
                              </Box>
                              {" "}
                              {partner.location}
                            </Typography>
                          </Grid>

                          {/* WhatsApp */}
                          <Grid item xs="auto" marginLeft="15px">
                            <Typography variant="h6" sx={{ color: "white" }}>
                              <Box width={{ lg: "45px", xs: "45px" }}>
                                <a
                                  href={`https://wa.me/${partner.contactNumber}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337538/whatsapp_vjbu3d_qbwzhv.webp"
                                    alt="whatsapp"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                </a>
                              </Box>
                            </Typography>
                          </Grid>

                          {/* Facebook */}
                          <Grid item xs="auto" marginLeft="15px">
                            <Typography variant="h6" sx={{ color: "white" }}>
                              <Box width={{ lg: "55px", xs: "45px" }}>
                                <a
                                  href={partner.facebookLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337538/Group_1_2_otxwfg_cno6lr.webp"
                                    alt="facebook"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                </a>
                              </Box>
                            </Typography>
                          </Grid>

                          {/* Website */}
                          <Grid item xs="auto" marginLeft="15px">
                            <Typography variant="h6" sx={{ color: "white" }}>
                              <Box width={{ lg: "45px", xs: "45px" }}>
                                <a
                                  href={partner.websiteLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337545/output-onlinegiftools_8_rtdbms_vmppge.gif"
                                    alt="website"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                </a>
                              </Box>
                            </Typography>
                          </Grid>
                        </Grid>

                            </CardContent>
                          </Card>
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <>
                      <Grid item xs={12} lg={8}>
                        <Box
                          marginTop={{ lg: "20px", xs: "0px" }}
                          sx={{
                            marginLeft: { lg: "50%", sx: "0%" },
                            width: { lg: "auto", sx: "280px" },
                            transition: "transform 0.3s",
                            cursor: "default",
                          }}
                        >
                          <Card
                            sx={{
                              borderColor: "black",
                              borderRadius: "30px",
                              backgroundColor: "rgba(255,255,255, 0.3)",
                              padding: "32px",
                            }}
                            variant="outlined"
                          >
                            <Typography>Currently No Tour Guides</Typography>
                          </Card>
                        </Box>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}
          </center>
        </Grid>
      </Grid>
    </>
  );
};

export default Alltourguides;
