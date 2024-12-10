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

const AllFoods = () => {
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

  const ProductSlideshow = ({ images }) => {
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
        <Box sx={{width:'100%',height:'250px'}}>
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

  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterProducts = () => {
    const foods = products.filter((product) => product.category === "food");
    setFilteredProducts(foods);
  };

  useEffect(() => {
    filterProducts();
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
            style={{
              backgroundImage:
                'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733336447/pexels-photo-1072179_frjk63_js026i.webp")',
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              minHeight: { lg: "30vh", xs: "10vh" },
              paddingBottom: "16px",
            }}
          >
            <Nav />
            <Grid
              xs={12}
              marginBottom="0px"
              marginTop={{ lg: "86px", xs: "90px" }}
              marginLeft="32px"
            >
              <a href={`/`} style={{ textDecoration: "none" }}>
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
              </a>
            </Grid>
            <Typography
              sx={{
                color: "white",
                fontFamily: "poppins",
                marginTop: "8px",
                fontSize: { lg: "50px", xs: "24px" },
                paddingLeft: { lg: "450px", xs: "32px" },
                paddingTop: { lg: "80px", xs: "32px" },
                paddingBottom: { lg: "80px", xs: "32px" },
              }}
            >
              <Helmet>
                <title>{`${locationName} Foods`}</title>
              </Helmet>
              All Foods  Around {locationName?locationName:"Sri Lanka"}
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
                  {filteredProducts.length === 0 && (
                    <Box
                      sx={{
                        borderColor: "black",
                        borderRadius: "30px",
                        backgroundColor: "rgba(255,255,255, 0.3)",
                        padding: "24px",
                        marginTop: { lg: "16px", xs: "16px" },
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: { lg: "20px", xs: "18px" },
                        }}
                      >
                        No Added Food Items
                      </Typography>
                    </Box>
                  )}
                </>
              )}
            </Typography>
          </Grid>

          <Grid sx={{ width: "100%" }} marginTop="20px">
            <Box
              style={{
                backgroundImage:
                  'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733440550/pexels-prateek-katyal-2740697_jdoxoj_bupb6h.webp")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
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
                        marginLeft: { lg: "8px", xs: "20px" },
                        marginRight: { lg: "8px", xs: "20px" },
                      }}
                      variant="outlined"
                      onClick={() => handleOpen(product)}
                    >
                      <ProductSlideshow images={product.images} />

                      <CardContent>
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{ color: "white" }}
                        >
                          Name: {product.productName}
                         
                        </Typography>

                        <Typography  variant="h6"
                          component="div"
                          sx={{ color: "white" }}>
                          <Box width={{ lg: "50px", xs: "50px" }}>
                                        <img
                                          src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337543/output-onlinegiftools_9_zciqfy_ei8c1p.gif"
                                          alt="google map"
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        />
                                      </Box>{" "} {product.location}
                        </Typography>
                        
                        <Typography variant="h6" sx={{ color: "white" }}>
                          Price:  <text style={{color:'#98FF98',fontWeight:'600'}}>LKR {product.price} </text>
                        </Typography>
                        <Typography variant="h6" sx={{ color: "white" }}>
                        <Box width={{ lg: "45px", xs: "45px" }}>
                                        <img
                                          src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733337538/whatsapp_vjbu3d_qbwzhv.webp"
                                          alt="whatsapp"
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        />
                                      </Box>{" "} {product.contactNumber}
                        </Typography>
                        <Typography variant="body" sx={{ color: "white" }}>
                          Description: {product.description}
                        </Typography>
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

export default AllFoods;
