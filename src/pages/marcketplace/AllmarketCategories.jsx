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
import { useLocation } from "react-router-dom";
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

const AllmarketsCategory = () => {
  const gridRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [marketDetails, setMarketDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const EventSlideshow = ({ images }) => {
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
        <Box sx={{ width: "100%", height: "250px" }}>
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
  useEffect(() => {
    async function getAllMarkets() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/product/"
        );
        setMarketDetails(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching marketplace details:", error);
        setLoading(false);
        alert("Error fetching Marketplace details: " + error.message);
      }
    }
    getAllMarkets();
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

  const filteredMarkets = () => {
    const params = new URLSearchParams(location?.search);
    const category = params?.get("category");

    if (category) {
      return marketDetails.filter(
        (market) => market.category.toLowerCase() === category.toLowerCase()
      );
    } else {
      return marketDetails;
    }
  };

  return (
    <>
      <Helmet>
        <title>All MarketPlace Products</title>
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
            backgroundImage:
            'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733441533/pexels-itsehsanh-25662347_vre8jt_hkdaa2.webp")',
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            filter: "blur(3px)",
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
            <Grid container >
              <Box
                sx={{
                  width: { lg: "1100px", xs: "300px" },
                }}
              >
                <Typography
                  fontSize={{ lg: "24px", xs: "22px" }}
                  sx={{ color: "white",marginLeft:'32px' }}
                  marginTop="16px"
                >
                  All Products
                </Typography>
              </Box>
              <Grid container spacing={2} sx={{paddingLeft:'16px',paddingRight:'16px',marginTop:'16px'}}>



             



                {filteredMarkets().map((product, index) => {
                  return (
                    <>
                     <>
              {loading ? (
                <>
                  <CircularProgress sx={{ color: "green" }} />
                </>
              ) : (
                <>
                {!loading && product.length===0 &&
                <>
<Grid container>
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
                              d="M12.246 14.5L13.828 4H5.6L2.162 13C2.056 13.32 2 13.652 2 14C2 16.208 4.3 18 7.142 18C9.762 18 11.928 16.472 12.246 14.5ZM20 18C22.84 18 25.142 16.208 25.142 14C25.142 13.918 25.136 13.836 25.132 13.758L24.114 4H15.886L14.866 13.75C14.8613 13.8333 14.8586 13.9166 14.858 14C14.858 16.208 17.16 18 20 18ZM30 20.092V28H10V20.104C9.124 20.42 8.16 20.6 7.142 20.6C6.752 20.6 6.374 20.554 6 20.502V33.2C6 34.74 7.258 36 8.796 36H31.2C32.74 36 34 34.738 34 33.2V20.504C33.6219 20.562 33.2404 20.5948 32.858 20.602C31.8828 20.601 30.9154 20.4284 30 20.092ZM37.84 13L34.398 4H26.172L27.752 14.484C28.06 16.464 30.226 18 32.858 18C35.698 18 38 16.208 38 14C38 13.652 37.944 13.32 37.84 13Z"
                              fill="black"
                            />
                          </svg>
                        }
                        title="No product added"
                        body={`Currently, there are no products to found`}
                        width={{
                          lg: "850px",
                          xs: "350px",
                          md: "700px",
                          sm: "500px",
                        }}
                        marginLefts={{
                          lg: "14%",
                          xs: "6%",
                          sm: "3%",
                          md: "1%",
                          xl: "20%",
                        }}
                      />
                    </>
                  </Grid>
                </>
                }
                  
                </>
              )}
            </>




                    <Grid item xs={12} sm={4} md={4} lg={3} key={product._id}>
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
                          <EventSlideshow images={product.images} />
                        </Box>

                        <CardContent sx={{ marginTop: "18px" }}>
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{ color: "white" }}
                          >
                            {product.productName}
                          </Typography>
                          
                          <Typography
                            variant="body1"
                            sx={{
                              color: "white",
                              marginTop: "8px",
                              marginLeft: { lg: "3px" },
                            }}
                          >
                            Price: <text style={{color:'#98FF98',fontWeight:'600', fontSize:'20px'}}>LKR {product.price} </text>
                          </Typography>

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
                                    src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733432167/Mobile_Browser_vcdnyp_ogxw6b.gif"
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
                    </>
                    
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
                        {selectedEvent.productName}- {selectedEvent.category}
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
                      </Grid>
                      <Typography
                        id="modal-modal-description"
                        color="white"
                        sx={{ mt: 2 }}
                      >
                        Description: {selectedEvent.description}
                      </Typography>{" "}
                      <Typography
                        id="modal-modal-description"
                        color="white"
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

export default AllmarketsCategory;
