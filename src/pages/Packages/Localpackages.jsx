import React, { useRef, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Modal,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Nav from "../Nav/Nav";
import { Helmet } from "react-helmet";
import EmptyNotification from "../../components/System/EmptyNotification";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 600, xs: 280 },
  backgroundColor: "rgba(48, 103, 84, 0.9)",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
  minHeight: "auto", // Set the minimum height
  maxHeight: "500px", // Limit the height to viewport height
  overflowY: "auto", // Make the content scrollable if it exceeds the height
};
const Localpackages = () => {
  const gridRef = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  console.log(id);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoding] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [vehicleDetails, setVehicleDetails] = useState([]);

  useEffect(() => {
    async function getAllVehicles() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/localPackage"
        );
        setVehicleDetails(res.data);
        setLoding(false);
        console.log(vehicleDetails);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setLoding(false);
        alert("Error fetching vehicles: " + error.message);
      }
    }
    getAllVehicles();
  }, []);

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
  const [locationname, setlocationname] = useState([]);
  const [background, setbackground] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://holidaysri-backend-9xm4.onrender.com/location/get/${id}`
        );
        setbackground(response.data.location.backgroundImage);
        setlocationname(response.data.location.locationName);
      } catch (error) {
        console.error("Error fetching location:", error);
        alert("Error fetching location: " + error.message);
      }
    };
    fetchData();
  }, [id]);
  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const filterProducts = () => {
    const filteredVehicles = vehicleDetails.filter(
      (vehicle) => vehicle.location === locationname
    );
    setFilteredProducts(filteredVehicles);
  };

  useEffect(() => {
    filterProducts();
  }, [vehicleDetails]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Nav />
      <Grid
        container
        sx={{
          position: "relative",
          minHeight: "100vh",
          paddingBottom: "16px",
          overflow: "hidden",
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage:
              'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733336447/pexels-photo-1072179_frjk63_js026i.webp")',
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            filter: "blur(3px)",
            zIndex: -1,
          },
        }}
      >
        <Grid item xs={12}>
          <Box
            marginBottom="0px"
            marginTop={{ lg: "85px", xs: "90px" }}
            marginLeft="32px"
          >
            
              <Button onClick={() => window.history.back()} style={{ textDecoration: "none" }}
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  borderRadius: "30px",
                }}
              >
                Back
              </Button>{" "}
            
          </Box>
          <Box textAlign="center" marginTop={{ lg: "2%", xs: "3%" }}>
            <Typography
              sx={{
                color: "white",
                fontFamily: "poppins",
                marginTop: { lg: "8px", xs: "20px" },
                fontSize: { lg: "50px", xs: "32px" },
              }}
            >
              All local packages around {locationname}
            </Typography>
          </Box>

          <Grid
            container
            spacing={2}
            marginTop={{ lg: "16px", xs: "8px" }}
            paddingLeft="8px"
            paddingRight="8px"
          >
            {loading ? (
              <>
                <Box
                  sx={{
                    marginLeft: {
                      lg: "19%",
                      xs: "6%",
                      sm: "20%",
                      md: "25%",
                      xl: "21%",
                    },
                  }}
                >
                  <CircularProgress
                    sx={{ color: "green", marginTop: "16px" }}
                  />
                </Box>
              </>
            ) : (
              <>
                <>
                  {filteredProducts.length != 0 ? (
                    <>
                      {filteredProducts.map((product, index) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={3}
                          lg={3}
                          key={product._id}
                        >
                          <Card
                            sx={{
                              borderColor: "black",
                              borderRadius: "30px",
                              backgroundColor: "rgba(255,255,255, 0.3)",
                              transition: "transform 0.3s",
                              "&:hover": {
                                transform: "scale(1.05)",
                              },
                              marginLeft: "8px",
                              marginRight: "8px",
                            }}
                            variant="outlined"
                            onClick={() => handleOpen(product)}
                          >
                            <Box
                              width={{ lg: "100%" }}
                              height={{ lg: "200px" }}
                              sx={{ marginBottom: "8px" }}
                            >
                              <Imageproducts images={product.images} />
                            </Box>

                            <CardContent sx={{ marginTop: "8px" }}>
                              <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                  color: "white",
                                  width: "100%",
                                  marginLeft: "-6px",
                                }}
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 22C9.25 19.6667 7.22933 17.5083 5.938 15.525C4.64667 13.5417 4.00067 11.6167 4 9.75C4 7.46667 4.80433 5.60433 6.413 4.163C8.02167 2.72167 9.884 2.00067 12 2C14.116 1.99933 15.9787 2.741 17.588 4.225C19.1973 5.709 20.0013 7.70067 20 10.2L22.1 8.1L23.5 9.5L19 14L14.5 9.5L15.9 8.1L18 10.2C18 8.38333 17.421 6.896 16.263 5.738C15.105 4.58 13.684 4.00067 12 4C10.316 3.99933 8.89533 4.55767 7.738 5.675C6.58067 6.79233 6.00133 8.159 6 9.775C6 11.1583 6.49167 12.6333 7.475 14.2C8.45833 15.7667 9.96667 17.4833 12 19.35C12.3333 19.05 12.6417 18.7583 12.925 18.475L13.775 17.625C13.6917 17.4417 13.625 17.2583 13.575 17.075C13.525 16.8917 13.5 16.7 13.5 16.5C13.5 15.8 13.7417 15.2083 14.225 14.725C14.7083 14.2417 15.3 14 16 14C16.7 14 17.2917 14.2417 17.775 14.725C18.2583 15.2083 18.5 15.8 18.5 16.5C18.5 17.2 18.2583 17.7917 17.775 18.275C17.2917 18.7583 16.7 19 16 19C15.8667 19 15.7457 18.9917 15.637 18.975C15.5283 18.9583 15.416 18.9333 15.3 18.9C14.8167 19.4 14.304 19.9083 13.762 20.425C13.22 20.9417 12.6327 21.4667 12 22Z"
                                    fill="#F8F8F8"
                                  />
                                </svg>{" "}
                                {product.localPackageName}
                              </Typography>
                              <Grid container marginTop="8px">
                                <Grid item xs={6}>
                                  <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ color: "white" }}
                                    fontSize=""
                                  >
                                    <svg
                                      width="15"
                                      height="21"
                                      viewBox="0 0 15 21"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6.14286 4.09524H8.19048V2.04762H6.14286V4.09524ZM7.16667 10.2381C5.86984 10.2381 4.63274 9.96917 3.45536 9.43133C2.27798 8.89349 1.12619 8.29217 0 7.62738V6.14286C0 5.57976 0.200666 5.09789 0.602 4.69724C1.00333 4.29659 1.48521 4.09592 2.04762 4.09524H4.09524V1.02381C4.09524 0.73373 4.19352 0.490746 4.3901 0.294857C4.58667 0.0989684 4.82965 0.00068254 5.11905 0H9.21429C9.50437 0 9.74769 0.0982858 9.94426 0.294857C10.1408 0.491429 10.2388 0.734413 10.2381 1.02381V4.09524H12.2857C12.8488 4.09524 13.331 4.2959 13.7324 4.69724C14.1337 5.09857 14.334 5.58044 14.3333 6.14286V7.62738C13.2071 8.29286 12.0554 8.89452 10.878 9.43236C9.7006 9.9702 8.46349 10.2388 7.16667 10.2381ZM2.04762 20.4762V19.4524C1.48452 19.4524 1.00265 19.2521 0.602 18.8514C0.201349 18.4508 0.00068254 17.9685 0 17.4048V9.93095C0.955556 10.5111 1.94114 11.006 2.95676 11.4155C3.97238 11.825 5.03441 12.098 6.14286 12.2345V13.3095H8.19048V12.2345C9.2996 12.098 10.362 11.825 11.3776 11.4155C12.3932 11.006 13.3785 10.5111 14.3333 9.93095V17.4048C14.3333 17.9679 14.133 18.4501 13.7324 18.8514C13.3317 19.2527 12.8495 19.4531 12.2857 19.4524V20.4762H10.2381V19.4524H4.09524V20.4762H2.04762Z"
                                        fill="#F8F8F8"
                                      />
                                    </svg>{" "}
                                    {product.category}
                                  </Typography>
                                </Grid>
                              </Grid>

                              <Typography
                                variant="body1"
                                sx={{
                                  color: "white",
                                  marginTop: "8px",
                                  marginLeft: { lg: "3px" },
                                  fontSize: "20px",
                                }}
                              >
                                Price:  <text style={{color:'#98FF98',fontWeight:'600'}}>LKR {product.price}</text>
                              </Typography>


{/* location */}
                    
<Grid container spacing={1} marginTop="8px" display="flex" justifyContent='center' alignItems="center">
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
                              {product.location}
                            </Typography>
                          </Grid>

                          {/* WhatsApp */}
                          <Grid item xs="auto" marginLeft="15px">
                            <Typography variant="h6" sx={{ color: "white" }}>
                              <Box width={{ lg: "45px", xs: "45px" }}>
                                <a
                                  href={`https://wa.me/${product.mobile}`}
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
                                  href={product.facebookLink}
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
                                  href={product.websiteLink}
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


                              <Button
                                onClick={() => handleOpen(event)}
                                variant="outlined"
                                sx={{
                                  width: "100%",
                                  color: "white",
                                  borderColor: "white",
                                  borderRadius: "30px",
                                  marginTop: "16px",
                                  "&:hover": {
                                    borderColor: "black",
                                  },
                                }}
                              >
                                View More
                              </Button>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </>
                  ) : (
                    <>
                      {!loading && (
                        <>
                          <EmptyNotification
                            svg={
                              <svg
                                width="40"
                                height="34"
                                viewBox="0 0 40 34"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M28 6H32V34H8V6H12V4C12 2.93913 12.4214 1.92172 13.1716 1.17157C13.9217 0.421427 14.9391 0 16 0H24C25.0609 0 26.0783 0.421427 26.8284 1.17157C27.5786 1.92172 28 2.93913 28 4V6ZM34 6H36C37.0609 6 38.0783 6.42143 38.8284 7.17157C39.5786 7.92172 40 8.93913 40 10V30C40 31.0609 39.5786 32.0783 38.8284 32.8284C38.0783 33.5786 37.0609 34 36 34H34V6ZM6 6V34H4C2.93913 34 1.92172 33.5786 1.17157 32.8284C0.421427 32.0783 0 31.0609 0 30V10C0 7.8 1.8 6 4 6H6ZM16 4V6H24V4H16Z"
                                  fill="black"
                                />
                              </svg>
                            }
                            title="No added local packages"
                            body={`Currently, there are no local packages around ${locationname}`}
                            width={{
                              lg: "850px",
                              xs: "350px",
                              md: "auto",
                              sm: "auto",
                            }}
                            marginLefts={{
                              lg: "19%",
                              xs: "6%",
                              sm: "10%",
                              md: "20%",
                              xl: "23%",
                            }}
                            margintops="24px"
                          />
                        </>
                      )}
                    </>
                  )}
                </>
              </>
            )}

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {selectedEvent && (
                  <>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      color="white"
                    >
                      Category: {selectedEvent.category}
                    </Typography>
                    <Grid container>
                      <Grid item xs={12} lg={6}>
                        <Typography
                          id="modal-modal-description"
                          color="white"
                          sx={{ mt: 2 }}
                        >
                          Price: {selectedEvent.price}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Typography
                          id="modal-modal-description"
                          color="white"
                          sx={{ mt: 2 }}
                        >
                          Contact Number: {selectedEvent.mobile}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      id="modal-modal-description"
                      color="white"
                      sx={{ mt: 2 }}
                    >
                      {selectedEvent.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 2,
                      }}
                    >
                      <Button
                        onClick={handleClose}
                        variant="outlined"
                        sx={{
                          color: "black",
                          borderColor: "black",
                          borderRadius: "30px",
                          marginTop: "16px",
                          "&:hover": {
                            borderColor: "red",
                          },
                        }}
                      >
                        Close
                      </Button>
                    </Box>{" "}
                  </>
                )}
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Localpackages;
