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
import { useParams } from "react-router-dom";
import Nav from "../Nav/Nav";
import { Helmet } from "react-helmet";
import EmptyNotification from "../../components/System/EmptyNotification";

const Food = () => {
  const [products, setProducts] = useState([]);
  const [location, setLocation] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoding] = useState(true);

  const { id, locationName } = useParams();
  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/product/"
        );
        setProducts(res.data);
        setLoding(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoding(false);
        alert("Error fetching products: " + error.message);
      }
    }
    getProducts();
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
        <Box sx={{width:'100%',height:'200px'}}>
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://holidaysri-backend-9xm4.onrender.com/location/get/${id}`
        );
        setLocation(response.data.location);
      } catch (error) {
        console.error("Error fetching location:", error);
        alert("Error fetching location: " + error.message);
      }
    };

    fetchData();
  }, [id]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterProducts = (category) => {
    if (category === "food") {
      const foods = products.filter(
        (product) =>
          product.category === "food" && product.location === locationName
      );
      setFilteredProducts(foods);
    }
  };

  useEffect(() => {
    filterProducts("food");
  }, [products]);

  const handleOpen = (product) => {
    // Handle opening modal or any other action
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid
            container
            sx={{
              position: 'relative',
              minHeight: { lg: "30vh", xs: "10vh" },
              paddingBottom: '16px',
              overflow: 'hidden',
              '::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundImage:
                'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733336447/pexels-photo-1072179_frjk63_js026i.webp")',           backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                filter: 'blur(1px)',
                zIndex: -1,
              },
          
            }}
            
          >
            <Nav />
            <Grid xs={12} marginBottom="0px" marginTop={{lg:"86px",xs:'90px'}} marginLeft="32px">
              
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
              
            </Grid>
            <Typography
              sx={{
                color: "white",
                fontFamily: "poppins",
                marginTop: "8px",
                fontSize: { lg: "50px", xs: "24px" },
                paddingLeft: { lg: "30%", xs: "32px",xl:"30%" },
                paddingTop: { lg: "80px", xs: "32px" },
                paddingBottom: { lg: "80px", xs: "32px" },
              }}
            >
              <Helmet>
                <title>{locationName} Foods</title>
              </Helmet>
              Foods items around {locationName}
              {loading ? (
                <>
                  <CircularProgress
                    sx={{
                      color: "green",
                      marginLeft: { lg: "32px", xs: "8px" },
                    }}
                  />
                </>
              ) : (
                <>
                  
                </>
              )}
            </Typography>
          </Grid>

          <Grid sx={{ width: "100%" }}  marginTop="20px">
            <Box
             
              sx={{
                backgroundImage:
                  'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733440550/pexels-prateek-katyal-2740697_jdoxoj_bupb6h.webp")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                width:"100%",
                paddingBottom: "16px",
                paddingLeft: { lg: "24px", xs: "8px" },
                paddingRight: { lg: "24px", xs: "16px" },
              }}
            >
              <Grid
                container
                spacing={3}
                style={{
                  transform: hoveredIndex !== null ? "translateY(-10px)" : "",
                  transition: "transform 0.3s",
                  cursor: "default",
                }}
              >

{filteredProducts.length === 0 && (
                     <>
                     <Box sx={{marginTop:'24px'}}>

                     <EmptyNotification
                       svg={
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.5947 36.4166H31.223C32.553 36.4166 33.6455 35.3874 33.8038 34.0891L36.4163 7.99575H28.4997V1.58325H25.3805V7.99575H17.5113L17.9863 11.7008C20.6938 12.4449 23.2272 13.7908 24.7472 15.2791C27.0272 17.5274 28.5947 19.8549 28.5947 23.6549V36.4166ZM1.58301 34.8333V33.2499H25.3805V34.8333C25.3805 35.6883 24.668 36.4166 23.7497 36.4166H3.16634C2.29551 36.4166 1.58301 35.6883 1.58301 34.8333ZM25.3805 23.7499C25.3805 11.0833 1.58301 11.0833 1.58301 23.7499H25.3805ZM1.58301 26.9166H25.333V30.0833H1.58301V26.9166Z" fill="black"/>
</svg>

                        
                       }
                       title="No added Food items"
                       body={`Currently, there are no added Food items around ${locationName}`}
                       width={{
                         lg: "850px",
                         xs: "320px",
                         md: "750px",
                         sm: "650px",
                       }}
                       marginLefts={{
                         lg: "30%",
                         xs: "12%",
                         sm: "12%",
                         md: "15%",
                         xl: "39%",
                       }}
                     />
                     </Box>
                     
                   </>
                  )}


                {filteredProducts.map((product, index) => (
                  <Grid item xs={12} sm={6} md={3} key={product._id}>
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

<Imageproducts images={product.images} />

                      <CardContent>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ color: "white" }}
                        >
                          {product.productName}
                        </Typography>
                        
                        <Typography variant="h6" sx={{ color: "white" }}>
                          Price: <text style={{color:'#98FF98',fontWeight:'600'}}>LKR {product.price} </text>
                        </Typography>
                        <Typography variant="body2" sx={{ color: "white" }}>
                          Description: {product.description}
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
                                    src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733432165/Facebook_1_tnmdws_hmepat.gif"
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
                   

                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Food;
