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

const gift = [
  "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733441294/nina-mercado-_qN6tmGjmtg-unsplash_dpwofp_lzruvt.webp",
];
const colo = [
  "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733441297/gints-gailis-dxGlF2-5CFE-unsplash_xmutex_p0uquh.webp",
];
const survnior = [
  "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733441290/daniel-hooper-hQIJon1QhZ8-unsplash_oekny5_evnmrq.webp",
];
const Marcketplace = () => {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [product, setproduct] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoding] = useState(true);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  useEffect(() => {
    async function getAllVehicles() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/product/"
        );
        setproduct(res.data);
        setLoding(false);
        console.log(product);
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
  const [locationname, setlocationname] = useState("");
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
  const handleOpen = (product) => {
    setSelectedEvent(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selected, setselected] = useState("");

  useEffect(() => {
    // Initially, set filteredProducts to contain only "gift packs"
    const defaultGiftPacks = product.filter(
      (item) => item.category != "food" && item.location === locationname
    );
    setFilteredProducts(defaultGiftPacks);
  }, [product, locationname]);

  const handleFilter = (category) => {
    // Filter products based on the selected category
    if (category === "gift packs") {
      setselected("gift packs");
      const giftpacks = product.filter(
        (item) =>
          item.category === "gift packs" && item.location === locationname
      );
      setFilteredProducts(giftpacks);
    } else if (category === "collectibles") {
      setselected("collectibles");
      const collectibles = product.filter(
        (item) =>
          item.category === "collectibles" && item.location === locationname
      );
      setFilteredProducts(collectibles);
    } else if (category === "souvenirs") {
      setselected("souvenirs");
      const souvenirs = product.filter(
        (item) =>
          item.category === "souvenirs" && item.location === locationname
      );
      setFilteredProducts(souvenirs);
    }
  };
  return (
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
            'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733441533/pexels-itsehsanh-25662347_vre8jt_hkdaa2.webp")',
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          filter: "blur(3px)",
          zIndex: -1,
        },
      }}
    >
      <Helmet>
        <title>Our MarketPlace</title>
      </Helmet>
      <Nav />
      <Grid item xs={12}>
        <Box
          marginBottom="0px"
          marginTop={{ lg: "80px", xs: "90px" }}
          marginLeft="32px"
        >
          <Button
            onClick={() => window.history.back()}
            style={{ textDecoration: "none" }}
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

        <Grid container>
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
              Products
            </Typography>
          </Box>
          <Grid
            container
            sx={{
              marginLeft: {
                xl: "13%",
                lg: "4%",
                xs: "1%",
                md: "16px",
                sm: "16px",
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                margin: { lg: "40px", xs: "16px" },
                padding: { lg: "24px", xs: "10px" },
                paddingLeft: { lg: "5%" },
                borderRadius: "20px",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    lg: "20px",
                    xs: "18px",
                    color: "white",
                    marginBottom: "8px",
                  },
                }}
              >
                Select What you like
              </Typography>
              <Grid container spacing={3}>
                <Grid
                  item
                  lg={3}
                  xs={4}
                  sx={{
                    borderColor: "white",
                  }}
                >
                  <Box
                    sx={{
                      width: { lg: "250px", xs: "100px" },
                      height: { lg: "250px", xs: "100px" },
                      borderColor: "black",
                      borderRadius: "30px",
                      backgroundImage: `url("${gift}")`,
                      backgroundSize: "cover",
                      backgroundColor:
                        hoveredIndex === 1
                          ? "rgba(15, 40, 29, 0.3)"
                          : "rgba(48, 103, 84, 0.5)",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "background-color 0.5s ease",
                    }}
                    onClick={() => handleFilter("gift packs")}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        textAlign: "center",
                        color: "white",

                        backgroundColor:
                          hoveredIndex === 1
                            ? "rgba(15, 40, 29, 0.5)"
                            : {
                                lg: "rgba(15, 40, 29, 0.7)",
                                xs: "rgba(15, 40, 29, 0.6)",
                              },
                        p: 2,
                        transition: "background-color 0.5s ease",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize:
                            hoveredIndex === 1
                              ? { lg: "26px", xs: "12px" }
                              : { lg: "20px", xs: "12px" },
                          fontFamily: "poppins",
                          transition: "font-size 0.5s ease",
                        }}
                      >
                        Gift Packages
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  item
                  lg={3}
                  xs={3}
                  marginLeft={{ lg: "64px" }}
                  borderRadius="16px"
                  sx={{
                    borderColor: "white",
                  }}
                >
                  <Box
                    sx={{
                      width: { lg: "250px", xs: "100px" },
                      height: { lg: "250px", xs: "100px" },
                      borderColor: "black",
                      borderRadius: "30px",
                      backgroundColor:
                        hoveredIndex === 2
                          ? "rgba(15, 40, 29, 0.3)"
                          : "rgba(48, 103, 84, 0.5)",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      backgroundImage: `url("${survnior}")`,
                      backgroundSize: "cover",
                      transition: "background-color 0.5s ease",
                    }}
                    onClick={() => handleFilter("souvenirs")}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        textAlign: "center",
                        color: "white",
                        backgroundColor:
                          hoveredIndex === 2
                            ? "rgba(15, 40, 29, 0.5)"
                            : {
                                lg: "rgba(15, 40, 29, 0.7)",
                                xs: "rgba(15, 40, 29, 0.6)",
                              },
                        p: 2,
                        transition: "background-color 0.5s ease",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize:
                            hoveredIndex === 2
                              ? { lg: "26px", xs: "12px" }
                              : { lg: "20px", xs: "12px" },
                          fontFamily: "poppins",
                          transition: "font-size 0.5s ease",
                        }}
                      >
                        Souvenirs
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  item
                  lg={3}
                  xs={3}
                  marginLeft={{ lg: "64px", xs: "24px" }}
                  borderRadius="16px"
                  sx={{
                    borderColor: "white",
                  }}
                >
                  <Box
                    sx={{
                      width: { lg: "250px", xs: "100px" },
                      height: { lg: "250px", xs: "100px" },
                      borderColor: "black",
                      borderRadius: "30px",
                      backgroundColor:
                        hoveredIndex === 3
                          ? "rgba(15, 40, 29, 0.3)"
                          : "rgba(48, 103, 84, 0.5)",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      backgroundImage: `url("${colo}")`,
                      backgroundSize: "cover",
                      transition: "background-color 0.5s ease",
                    }}
                    onClick={() => handleFilter("collectibles")}
                    onMouseEnter={() => handleMouseEnter(3)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        textAlign: "center",
                        color: "white",
                        backgroundColor:
                          hoveredIndex === 3
                            ? "rgba(15, 40, 29, 0.5)"
                            : {
                                lg: "rgba(15, 40, 29, 0.7)",
                                xs: "rgba(15, 40, 29, 0.6)",
                              },
                        p: 2,
                        transition: "background-color 0.5s ease",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize:
                            hoveredIndex === 3
                              ? { lg: "26px", xs: "12px" }
                              : { lg: "20px", xs: "12px" },
                          fontFamily: "poppins",
                          transition: "font-size 0.5s ease",
                        }}
                      >
                        Collectibles
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid container sx={{ paddingLeft: "16px", paddingRight: "16px" }}>
            {filteredProducts.length === 0 ? (
              <>
                {loading ? (
                  <>
                    <CircularProgress sx={{ color: "green" }} />
                  </>
                ) : (
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
                )}
              </>
            ) : (
              filteredProducts.map((product, index) => (
                <>
                  {product.length === 0 && (
                    <>
                      {loading ? (
                        <>
                          <CircularProgress sx={{ color: "green" }} />
                        </>
                      ) : (
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
                                body={`Currently, there are no  products to found`}
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
                      )}
                    </>
                  )}

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
                        marginTop: "16px",
                      }}
                      variant="outlined"
                      onClick={() => handleOpen(product)}
                    >
                      <Box
                        key={product._id}
                        sx={{
                          borderColor: "black",
                          borderRadius: "30px",
                          backgroundColor: "rgba(255,255,255, 0.3)",
                          padding: "24px",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} lg={12}>
                            <Box
                              width={{ lg: "100%" }}
                              height={{ lg: "auto" }}
                              sx={{ marginBottom: "8px" }}
                            >
                              <Imageproducts images={product.images} />
                            </Box>
                          </Grid>
                          <Grid item xs={12} lg={12}>
                            <Typography
                              sx={{
                                color: "white",
                                fontWeight: "400",
                                fontSize: { lg: "24px", xs: "20px" },
                                textAlign: "left",
                              }}
                            >
                              {product.productName}
                            </Typography>
                            <Grid container>
                              <Grid item xs={8}>
                                <Typography
                                  id="modal-modal-description"
                                  color="white"
                                  sx={{ mt: 2 }}
                                  fontSize="20px"
                                >
                                  Price:{" "}
                                  <text
                                    style={{
                                      color: "#98FF98",
                                      fontWeight: "600",
                                    }}
                                  >
                                    LKR {product.price}
                                  </text>
                                </Typography>
                              </Grid>
                            </Grid>

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
                              onClick={() => handleOpen(product)}
                              variant="outlined"
                              sx={{
                                width: "100%",
                                color: "white",
                                borderColor: "white",
                                borderRadius: "30px",
                                marginTop: "16px",
                              }}
                            >
                              View More
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Card>
                  </Grid>
                </>
              ))
            )}
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
                    {selectedEvent.productName} - {selectedEvent.category}
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
                  </Grid>
                  <Typography
                    id="modal-modal-description"
                    color="white"
                    sx={{ mt: 2 }}
                  >
                    {selectedEvent.description}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <Button
                      onClick={handleClose}
                      variant="outlined"
                      sx={{
                        color: "black",
                        borderColor: "black",
                        borderRadius: "30px",
                        marginTop: "16px",
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
  );
};

export default Marcketplace;
