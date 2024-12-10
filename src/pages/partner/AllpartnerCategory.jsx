import React, { useRef, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Modal,
  CircularProgress,
  CardContent,
  Card,
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
const AllpartnersCategory = () => {
  const gridRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [partnerDetails, setPartnerDetails] = useState([]);
  const [loading, setLoding] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(() => {
    async function getAllPartners() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/api/partner/allPartnerProfiles/"
        );
  
        // Filter partners based on expirationDate condition
        const filteredPartners = res.data.filter((partner) => {
          // Display if expirationDate is not present or if it's in the future
          return !partner.expirationDate || new Date(partner.expirationDate) > new Date();
        });
  
        setPartnerDetails(filteredPartners); // Set filtered partners
        setLoding(false);
        console.log(filteredPartners);
      } catch (error) {
        console.error("Error fetching partners:", error);
        setLoding(false);
        alert("Error fetching partners: " + error.message);
      }
    }
    getAllPartners();
  }, []);
  

  const handleOpen = (event) => {
    const userRole = localStorage.getItem("userRole");
    
    if (userRole !== "partner") {
      const confirmAction = window.confirm(
        "To view more details about this partner and explore additional partners, you need to be a partner with us. Would you like to become a partner?"
      );
      if (confirmAction) {
        navigate("/register"); // Redirect to registration page
      }
      return; // Do nothing if cancel is clicked
    }
  
    // If userRole is 'partner', proceed as normal
    setSelectedEvent(event);
    setOpen(true);
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  const goBack = () => {
    navigate(-1); // Navigate back one step in history
  };

  /*// Function to filter vehicles based on category
  const filteredVehicles = () => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      return vehicleDetails.filter(vehicle => vehicle.Vehiclecategory.toLowerCase() === category.toLowerCase());
    } else {
      return vehicleDetails;
    }
  };
*/ const filteredPartners = () => {
    const params = new URLSearchParams(location?.search);
    const subrole = params?.get("subrole");

    console.log("Sub Role:", subrole);

    if (subrole) {
      // Filter based on both category and driver status
      return partnerDetails.filter((partner) => {
        console.log("Partner:", partner);
        return partner.subrole.toLowerCase() === subrole.toLowerCase();
      });
    } else if (subrole) {
      // Filter based only on category
      return partnerDetails.filter((partner) => {
        console.log("Partner:", partner);
        return partner.subrole.toLowerCase() === subrole.toLowerCase();
      });
    } else {
      // Return all vehicles if no filters are applied
      return partnerDetails;
    }
  };

  return (
    <>
      <Helmet>
        <title>All Partners</title>
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
            backgroundImage: `url(${"https://res.cloudinary.com/dqdcmluxj/image/upload/v1733351037/christoph-theisinger-9PPYa3LK6II-unsplash_frxn5m_irc9d3.webp"})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            filter: "blur(4px)",
            zIndex: -1,
          },
        }}
      >
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Box marginBottom="0px" marginLeft="32px" marginTop="32px">
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

            <Grid marginLeft="32px">
              <Box
                sx={{
                  width: { lg: "1100px", xs: "300px" },
                }}
              ></Box>
              <Grid
                container
                width={{ lg: "90%" }}
                sx={{ marginTop: { lg: "32px", xs: "24px" } }}
                spacing={2}
                paddingLeft={{ lg: "0px", xs: "16px" }}
                paddingRight={{ lg: "0px", xs: "16px" }}
              >
                {/* Render a message if no vehicles are available */}
                {loading ? (
                  <>
                    <Box sx={{ marginLeft: "32px" }}>
                      <CircularProgress sx={{ color: "green" }} />
                    </Box>
                  </>
                ) : (
                  filteredPartners().length === 0 && (
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
                        title="No added partners"
                        body={`Currently, there are no travel partners added`}
                        width={{
                          lg: "850px",
                          xs: "350px",
                          md: "auto",
                          sm: "auto",
                        }}
                        marginLefts={{
                          lg: "16%",
                          xs: "4%",
                          sm: "25%",
                          md: "30%",
                          xl: "24%",
                        }}
                      />
                    </>
                  )
                )}
                {filteredPartners().map((event, index) => {
                  return (
                    <Grid item xs={11} sm={4} md={3} lg={3} key={index}>
                      <Card
                        sx={{
                          borderColor: "black",
                          borderRadius: "30px",
                          backgroundColor: "rgba(255,255,255, 0.3)",
                          transition: "transform 0.3s",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                        variant="outlined"
                        onClick={() => handleOpen(partner)}
                      >
                        <CardContent>
                          { (
                              <>
                                {" "}
                                <Box sx={{ height: "250px" }}>
                                  <img
                                    style={{ width: "100%", height: "100%" }}
                                    src={
                                      event.profileImage ||
                                      event.partnerProfileImage
                                    }
                                  />
                                </Box>{" "}
                              </>
                            )}

                          <Typography
                            sx={{
                              color: "black",
                              fontWeight: "400",
                              fontSize: { lg: "24px", xs: "20px" },
                              textAlign: "left",
                            }}
                          >
                            {event.name}
                          </Typography>
                          { (
                              <> 
                              <p className="matchwithyou">Match Your Travel Partner, View More🫱🫲!</p>                             
                              </>
                            )}
                             {event.country && <>
                        <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        color="black"
                      >
                        {event.country?event.country:"Sri Lanka"}
                      </Typography>
                      </>
                      }

                      {/* location */}
                    
                      <Grid
                        container
                        spacing={1}
                        marginTop="8px"
                        display="flex"
                        alignItems="center"
                        sx={{
                          // Apply blur and disable interactions if userRole is not 'partner'
                          filter: localStorage.getItem("userRole") !== "partner" ? "blur(5px)" : "none",
                          pointerEvents: localStorage.getItem("userRole") !== "partner" ? "none" : "auto",
                        }}
                      >
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
                            {event.location}
                          </Typography>
                        </Grid>

                        {/* WhatsApp */}
                        <Grid item xs="auto" marginLeft="15px">
                          <Typography variant="h6" sx={{ color: "white" }}>
                            <Box width={{ lg: "45px", xs: "45px" }}>
                              <a
                                href={`https://wa.me/${event.contactNumber}`}
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
                                href={event.facebookLink}
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
                                href={event.websiteLink}
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

  
                        </CardContent>{" "}
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

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
                        {selectedEvent.name}
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        color="white"
                      >
                        Email: {selectedEvent.email}
                      </Typography>

                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        color="white"
                      >
                        Gender: {selectedEvent.gender}
                      </Typography>

                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        color="white"
                      >
                        Age: {selectedEvent.age} Years
                      </Typography>

                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        color="white"
                      >
                        Interests: {selectedEvent.interest}
                      </Typography>

                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        color="white"
                      >
                        Description: {selectedEvent.bio}
                      </Typography>

                      <Grid container>
                        <Grid item xs={12} lg={6}>
                          <Typography
                            id="modal-modal-description"
                            color="white"
                            variant="h6"
                            sx={{ mt: 2 }}
                          >
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.612 13.4388L14.222 11.8288C14.4388 11.6146 14.7132 11.468 15.0118 11.4068C15.3103 11.3455 15.6202 11.3723 15.9039 11.4838L17.8661 12.2672C18.1527 12.3836 18.3985 12.5822 18.5724 12.838C18.7464 13.0938 18.8407 13.3954 18.8436 13.7047V17.2985C18.8419 17.5089 18.7977 17.7168 18.7135 17.9097C18.6294 18.1026 18.5071 18.2765 18.354 18.4208C18.2009 18.5652 18.0201 18.6771 17.8226 18.7498C17.6251 18.8225 17.415 18.8545 17.2048 18.8438C3.45512 17.9885 0.680744 6.34472 0.156056 1.88847C0.1317 1.66963 0.153954 1.44812 0.221353 1.23851C0.288753 1.02889 0.399771 0.835924 0.547105 0.672296C0.694438 0.508668 0.874747 0.378089 1.07617 0.28915C1.27759 0.200211 1.49556 0.154928 1.71574 0.156279H5.18731C5.49709 0.157196 5.79952 0.250772 6.0557 0.424969C6.31187 0.599167 6.51007 0.846021 6.62481 1.13378L7.40824 3.09597C7.52343 3.37848 7.55281 3.68868 7.49273 3.9878C7.43265 4.28692 7.28577 4.56171 7.07043 4.77784L5.46043 6.38784C5.46043 6.38784 6.38762 12.6625 12.612 13.4388Z"
                                fill="#F8F8F8"
                              />
                            </svg>{" "}
                            {selectedEvent.contactNumber}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Typography
                            variant="h6"
                            id="modal-modal-description"
                            color="white"
                            sx={{ mt: 2 }}
                          >
                            <svg
                              width="15"
                              height="21"
                              viewBox="0 0 15 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.49984 10.0208C6.86442 10.0208 6.25503 9.76838 5.80573 9.31907C5.35642 8.86976 5.104 8.26037 5.104 7.62496C5.104 6.98954 5.35642 6.38016 5.80573 5.93085C6.25503 5.48154 6.86442 5.22913 7.49984 5.22913C8.13525 5.22913 8.74464 5.48154 9.19395 5.93085C9.64325 6.38016 9.89567 6.98954 9.89567 7.62496C9.89567 7.93958 9.8337 8.25113 9.7133 8.54181C9.5929 8.83248 9.41642 9.0966 9.19395 9.31907C8.97147 9.54154 8.70736 9.71802 8.41668 9.83842C8.12601 9.95882 7.81446 10.0208 7.49984 10.0208ZM7.49984 0.916626C5.72068 0.916626 4.01439 1.62339 2.75633 2.88145C1.49827 4.13951 0.791504 5.8458 0.791504 7.62496C0.791504 12.6562 7.49984 20.0833 7.49984 20.0833C7.49984 20.0833 14.2082 12.6562 14.2082 7.62496C14.2082 5.8458 13.5014 4.13951 12.2433 2.88145C10.9853 1.62339 9.279 0.916626 7.49984 0.916626Z"
                                fill="#F8F8F8"
                              />
                            </svg>{" "}
                            {selectedEvent.location}
                          </Typography>
                        </Grid>
                      </Grid>{" "}
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
      </Grid>
    </>
  );
};

export default AllpartnersCategory;
