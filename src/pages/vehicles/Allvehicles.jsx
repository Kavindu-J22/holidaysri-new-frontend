import React, { useRef, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Modal,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import Nav from "../Nav/Nav";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; // Import useLocation hook
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
};
const Allvehicles = () => {
  const gridRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [loading, setLoding] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function getAllVehicles() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/vehicle/"
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

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const goBack = () => {
    navigate(-1); // Navigate back one step in history
  };

// Function to filter vehicles based on category
const filteredVehicles = () => {
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const currentDate = new Date(); // Get the current date

  // Filter vehicles based on both category and expirationDate
  return vehicleDetails.filter((vehicle) => {
    const expirationDate = vehicle.expirationDate ? new Date(vehicle.expirationDate) : null;

    // Show vehicles if they don't have an expiration date or if expirationDate > current date
    const isNotExpired = !expirationDate || expirationDate > currentDate;

    // Check if category exists, and return vehicles matching category and expirationDate
    if (category) {
      return (
        vehicle.Vehiclecategory.toLowerCase() === category.toLowerCase() &&
        isNotExpired
      );
    }

    // If no category is selected, return all vehicles with valid expirationDate or no expiration date
    return isNotExpired;
  });
};


  return (
    <>
      <Helmet>
        <title>All Vehicles</title>
      </Helmet>
      <Nav />
      <Grid
        container
        sx={{
          position: 'relative',
          minHeight: '100vh',
          paddingBottom: '16px',
          paddingTop: '60px',
          overflow: 'hidden',
          '::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage:
            'url("https://i2.pickpik.com/photos/152/506/327/road-night-light-traffic-preview.jpg")',            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            filter: 'blur(3px)',
            zIndex: -1,
          },
      
        }}
        
      >
        <Grid item xs={12}>
          <Box marginBottom="0px" marginLeft="32px" marginTop="24px" onClick={() => window.history.back()}>
            <Button
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

          <Box
            sx={{
              width: { lg: "1100px", xs: "300px" },
            }}
          >
            <Typography
              fontSize={{ lg: "24px", xs: "22px" }}
              sx={{ color: "white" }}
              marginTop="16px"
              marginLeft="32px"
            >
              All Vehicles
            </Typography>
          </Box>
          <Grid
            container
            spacing={2}
            sx={{
              paddingLeft: "16px",
              paddingRight: "16px",
              marginTop: "16px",
            }}
          >
            {loading ?<>
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
          </>:<>
          {filteredVehicles().length === 0 && (
            <>
            <EmptyNotification
              svg={
                <svg
                  width="30"
                  height="33"
                  viewBox="0 0 30 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.7812 0.974976C10.4083 0.974976 10.0506 1.12313 9.78688 1.38686C9.52316 1.65058 9.375 2.00826 9.375 2.38123V4.72498H7.7625C6.67861 4.72476 5.62814 5.10018 4.7899 5.78732C3.95165 6.47446 3.37744 7.43086 3.165 8.49373L2.79375 10.35H1.40625C1.03329 10.35 0.675604 10.4981 0.411881 10.7619C0.148158 11.0256 5.33379e-08 11.3833 5.33379e-08 11.7562C5.33379e-08 12.1292 0.148158 12.4869 0.411881 12.7506C0.675604 13.0143 1.03329 13.1625 1.40625 13.1625H2.23125L2.02312 14.2125C1.43927 14.3832 0.926514 14.7386 0.56175 15.2254C0.196986 15.7122 -0.000118377 16.3042 5.33379e-08 16.9125V24.4125C5.33379e-08 25.1584 0.296316 25.8738 0.823762 26.4012C1.35121 26.9287 2.06658 27.225 2.8125 27.225H27.1875C27.9334 27.225 28.6488 26.9287 29.1762 26.4012C29.7037 25.8738 30 25.1584 30 24.4125V16.9125C30.0001 16.3042 29.803 15.7122 29.4382 15.2254C29.0735 14.7386 28.5607 14.3832 27.9769 14.2125L27.7669 13.1625H28.5938L28.785 13.1493C29.1217 13.1031 29.4302 12.9366 29.6536 12.6805C29.8769 12.4244 30 12.096 30 11.7562L29.9869 11.565C29.9407 11.2283 29.7741 10.9198 29.518 10.6964C29.2619 10.4731 28.9336 10.35 28.5938 10.35H27.2044L26.835 8.49373C26.6226 7.43086 26.0483 6.47446 25.2101 5.78732C24.3719 5.10018 23.3214 4.72476 22.2375 4.72498H20.625V2.38123C20.625 2.00826 20.4768 1.65058 20.2131 1.38686C19.9494 1.12313 19.5917 0.974976 19.2188 0.974976H10.7812ZM7.7625 6.59998H22.2375C22.8878 6.59993 23.518 6.82522 24.0208 7.2375C24.5237 7.64978 24.8682 8.22357 24.9956 8.86122L26.0456 14.1H3.95625L5.00438 8.86122C5.13176 8.22388 5.47596 7.65034 5.97844 7.23809C6.48093 6.82585 7.11255 6.60037 7.7625 6.59998ZM5.625 20.6625C5.625 20.1652 5.82254 19.6883 6.17418 19.3366C6.52581 18.985 7.00272 18.7875 7.5 18.7875C7.99728 18.7875 8.47419 18.985 8.82582 19.3366C9.17746 19.6883 9.375 20.1652 9.375 20.6625C9.375 21.1598 9.17746 21.6367 8.82582 21.9883C8.47419 22.3399 7.99728 22.5375 7.5 22.5375C7.00272 22.5375 6.52581 22.3399 6.17418 21.9883C5.82254 21.6367 5.625 21.1598 5.625 20.6625ZM20.625 20.6625C20.625 20.1652 20.8225 19.6883 21.1742 19.3366C21.5258 18.985 22.0027 18.7875 22.5 18.7875C22.9973 18.7875 23.4742 18.985 23.8258 19.3366C24.1775 19.6883 24.375 20.1652 24.375 20.6625C24.375 21.1598 24.1775 21.6367 23.8258 21.9883C23.4742 22.3399 22.9973 22.5375 22.5 22.5375C22.0027 22.5375 21.5258 22.3399 21.1742 21.9883C20.8225 21.6367 20.625 21.1598 20.625 20.6625ZM7.5 30.975V29.1H3.75V30.975C3.75 31.4723 3.94754 31.9492 4.29918 32.3008C4.65081 32.6524 5.12772 32.85 5.625 32.85C6.12228 32.85 6.59919 32.6524 6.95082 32.3008C7.30246 31.9492 7.5 31.4723 7.5 30.975ZM26.25 29.1V30.975C26.25 31.4723 26.0525 31.9492 25.7008 32.3008C25.3492 32.6524 24.8723 32.85 24.375 32.85C23.8777 32.85 23.4008 32.6524 23.0492 32.3008C22.6975 31.9492 22.5 31.4723 22.5 30.975V29.1H26.25Z"
                    fill="black"
                  />
                </svg>
              }
              title="No added vehicles"
              body={`Currently, there are no vehicles added`}
              width={{
                lg: "850px",
                xs: "350px",
                md: "auto",
                sm: "auto",
              }}
              marginLefts={{lg:'16%',xs:'4%',sm:'25%',md:'30%',xl:'24%'}}
            />
          </>
          )}   
          
          </>}
            {filteredVehicles().map((product, index) => {
              return (
                <Grid item xs={12} sm={6} md={3} lg={3} key={product._id}>
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
                    <Box width={{ lg: "100%" }} height={{ lg: "220px" }}>
                      <img
                        src={product.images}
                        width="100%"
                        height="100%"
                        style={{ borderRadius: "30px" }}
                        alt="vehicle"
                      />
                    </Box>

                    <CardContent>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ color: "white" }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.7292 0.916626C16.4861 0.916626 16.2529 1.0132 16.081 1.18511C15.9091 1.35702 15.8125 1.59018 15.8125 1.83329V6.41663C15.8125 6.65974 15.9091 6.8929 16.081 7.06481C16.2529 7.23672 16.4861 7.33329 16.7292 7.33329H17.875V20.5104C17.875 20.6623 17.9354 20.808 18.0428 20.9155C18.1502 21.0229 18.296 21.0833 18.4479 21.0833C18.5999 21.0833 18.7456 21.0229 18.853 20.9155C18.9605 20.808 19.0208 20.6623 19.0208 20.5104V7.33329H20.1667C20.4098 7.33329 20.6429 7.23672 20.8148 7.06481C20.9868 6.8929 21.0833 6.65974 21.0833 6.41663V1.83329C21.0833 1.59018 20.9868 1.35702 20.8148 1.18511C20.6429 1.0132 20.4098 0.916626 20.1667 0.916626H16.7292ZM14.8958 2.83567C14.6678 2.77884 14.4337 2.75005 14.1987 2.74996H7.64179C7.00065 2.75001 6.37807 2.96515 5.87368 3.36094C5.36928 3.75672 5.01225 4.31027 4.85971 4.933L4.49625 6.41663H3.32292C3.17097 6.41663 3.02525 6.47699 2.9178 6.58443C2.81036 6.69187 2.75 6.8376 2.75 6.98954C2.75 7.14149 2.81036 7.28721 2.9178 7.39466C3.02525 7.5021 3.17097 7.56246 3.32292 7.56246H4.21575L4.01729 8.37234C3.64513 8.51112 3.32428 8.76037 3.09777 9.08665C2.87126 9.41294 2.74992 9.80067 2.75 10.1979V18.2187C2.75 18.6138 2.90694 18.9927 3.18629 19.272C3.46564 19.5514 3.84452 19.7083 4.23958 19.7083H5.84375C6.23881 19.7083 6.61769 19.5514 6.89704 19.272C7.1764 18.9927 7.33333 18.6138 7.33333 18.2187V16.7291H14.6667V18.2187C14.6667 18.6138 14.8236 18.9927 15.103 19.272C15.3823 19.5514 15.7612 19.7083 16.1563 19.7083H16.9583V18.5625H16.1563C16.0651 18.5625 15.9776 18.5262 15.9132 18.4618C15.8487 18.3973 15.8125 18.3099 15.8125 18.2187V16.7291H16.9583V8.24996H5.22683L5.97254 5.20571C6.06405 4.83206 6.27826 4.4999 6.5809 4.26241C6.88354 4.02492 7.2571 3.89583 7.64179 3.89579H14.1992C14.4448 3.89579 14.6818 3.94804 14.8963 4.04338L14.8958 2.83567ZM3.89583 16.7291H6.1875V18.2187C6.1875 18.3099 6.15128 18.3973 6.08682 18.4618C6.02235 18.5262 5.93492 18.5625 5.84375 18.5625H4.23958C4.14842 18.5625 4.06098 18.5262 3.99652 18.4618C3.93205 18.3973 3.89583 18.3099 3.89583 18.2187V16.7291ZM5.5 11.9166C5.5 11.6735 5.59658 11.4404 5.76849 11.2684C5.94039 11.0965 6.17355 11 6.41667 11C6.65978 11 6.89294 11.0965 7.06485 11.2684C7.23676 11.4404 7.33333 11.6735 7.33333 11.9166C7.33333 12.1597 7.23676 12.3929 7.06485 12.5648C6.89294 12.7367 6.65978 12.8333 6.41667 12.8333C6.17355 12.8333 5.94039 12.7367 5.76849 12.5648C5.59658 12.3929 5.5 12.1597 5.5 11.9166ZM15.5833 12.8333C15.3402 12.8333 15.1071 12.7367 14.9352 12.5648C14.7632 12.3929 14.6667 12.1597 14.6667 11.9166C14.6667 11.6735 14.7632 11.4404 14.9352 11.2684C15.1071 11.0965 15.3402 11 15.5833 11C15.8264 11 16.0596 11.0965 16.2315 11.2684C16.4034 11.4404 16.5 11.6735 16.5 11.9166C16.5 12.1597 16.4034 12.3929 16.2315 12.5648C16.0596 12.7367 15.8264 12.8333 15.5833 12.8333ZM12.7188 12.8333C12.8707 12.8333 13.0164 12.8937 13.1239 13.0011C13.2313 13.1085 13.2917 13.2543 13.2917 13.4062C13.2917 13.5582 13.2313 13.7039 13.1239 13.8113C13.0164 13.9188 12.8707 13.9791 12.7188 13.9791H9.28125C9.1293 13.9791 8.98358 13.9188 8.87614 13.8113C8.76869 13.7039 8.70833 13.5582 8.70833 13.4062C8.70833 13.2543 8.76869 13.1085 8.87614 13.0011C8.98358 12.8937 9.1293 12.8333 9.28125 12.8333H12.7188Z"
                            fill="#F8F8F8"
                          />
                        </svg>{" "}
                        {product.Vehiclecategory}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: "white",
                          marginTop: "8px",
                          marginLeft: { lg: "3px" },
                          fontSize:  { lg: "20px" },

                        }}
                      >
                        Price:  <text style={{color:'#98FF98',fontWeight:'600'}}>LKR {product.price} </text>
                      </Typography>



                      <Grid container spacing={2} marginTop="8px" display="flex" alignItems="center">
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
                                  href={`https://wa.me/${product.contactNumber}`}
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
              );
            })}
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
                      variant="h5"
                      component="h2"
                      color="white"
                    >
                      {selectedEvent.Vehiclecategory} - {selectedEvent.driverStatus}
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
                          Contact Number: {selectedEvent.contactNumber}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      id="modal-modal-description"
                      color="white"
                      sx={{ mt: 2 }}
                    >
                      Driver Gender: {selectedEvent.gender}
                    </Typography>{" "}
                    <Typography
                      id="modal-modal-description"
                      color="white"
                      sx={{ mt: 2 }}
                    >
                      Promo Code: {selectedEvent.promoCode}
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

export default Allvehicles;
