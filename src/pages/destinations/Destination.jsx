import React, { useRef, useEffect, useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const imageLinksArray = [
  "https://fernandotravels.com.au/wp-content/uploads/2018/06/galle-fort.jpg",
  "https://www.suryalanka.com/wp-content/uploads/2020/06/featured-img2.jpg",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/515879655.jpg?k=52a5b8217dcafb83c3cc6df570d1ffdb007e66254353089f45c1c8673648d0bf&o=&hp=1",
  "https://www.attractionsinsrilanka.com/wp-content/uploads/2019/07/Galle-Fort-Beach.jpg",
  "https://www.andbeyond.com/wp-content/uploads/sites/5/galle-sri-lanka-tuk-tuk1.jpg",
  "https://www.archaeology.lk/wp-content/uploads/2020/11/galle_fort_sri_lanka_aerial_view_buddhika_dilshan.jpg",
];
const Destination = () => {
  const { id } = useParams();
  const gridRef = useRef(null);
  const [location, setLocation] = useState(null);

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

  useEffect(() => {
    const gridElement = gridRef.current;

    const scrollRight = () => {
      if (gridElement) {
        gridElement.scrollLeft += 1;

        if (
          gridElement.scrollLeft >=
          gridElement.scrollWidth - gridElement.clientWidth
        ) {
          gridElement.scrollLeft = 0;
        }

        requestAnimationFrame(scrollRight);
      }
    };

    const animationId = requestAnimationFrame(scrollRight);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const renderLogos = () => {
    const repetitions = 20;
    let count = 0;
    const logoElements = [];

    while (count < repetitions) {
      imageLinksArray.forEach((image, index) => {
        logoElements.push(
          <img
            key={`${index}-${count}`}
            src={image}
            alt={`image${index + 1}`}
            style={{
              margin: "8px",
              width: "90%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "30px",
            }}
          />
        );
      });

      count++;
    }

    return <>{logoElements}</>;
  };









  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      container
      style={{
        backgroundImage:
        'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733336447/pexels-photo-1072179_frjk63_js026i.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Grid item xs={12}>
        <Box textAlign="center" marginTop={{ lg: "4%", xs: "4%" }}>
          <Typography
            sx={{
              color: "white",
              fontWeight: "700",
              fontFamily: "inter",
              fontSize: { lg: "50px", xs: "32px" },
            }}
          >
            {location.locationName}
          </Typography>
         
        </Box>


        <Box
          marginTop={{ lg: "32px", xs: "32px" }}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            height: { lg: "250px" },
            overflowX: "auto",
            overflow: "hidden",
            animation: "scrollRight 60s linear infinite",
          }}
        >
          <Grid
            container
            sx={{
              flexWrap: "nowrap",
              display: "flex",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                height: { lg: "250px", xs: "200px" },
                overflowX: "auto",
                overflow: "hidden",
              }}
              ref={gridRef}
            >
              <Grid
                container
                sx={{
                  marginTop: { lg: "16px", xs: "16px" },
                  flexWrap: "nowrap",
                  display: "flex",
                  height: { lg: "200px", xs: "150px" },
                }}
              >
                {renderLogos()}
              </Grid>
            </Box>
          </Grid>
        </Box>





        <Box
          marginTop={{ lg: "32px", xs: "32px" }}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            height: { lg: "250px" },
            overflowX: "auto",
            overflow: "hidden",
            animation: "scrollRight 60s linear infinite",
          }}
        >
          <Grid
            container
            sx={{
              flexWrap: "nowrap",
              display: "flex",
            }}
          >

    <Grid
              ref={gridRef}
              sx={{
                display: { xs: "flex", lg: "none" },
                overflowX: "hidden", 
                width: "100%",
                marginLeft: "16px",
                marginRight: "16px",
               
                "-webkit-overflow-scrolling": "touch",
                animation: "scrollRight 60s linear infinite", 
              }}
            >
              {renderLogos()}
            </Grid>
    {/*<Box
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                height: { lg: "250px", xs: "200px" },
                overflowX: "auto",
                overflow: "hidden",
              }}
              ref={gridRef}
            >
              <Grid
                container
                sx={{
                  marginTop: { lg: "16px", xs: "16px" },
                  flexWrap: "nowrap",
                  display: "flex",
                  height: { lg: "200px", xs: "150px" },
                }}
              >
                {location.images.map((images, index) => (
                  <img
                    key={index}
                    src={images}
                    alt={`image${index + 1}`}
                    style={{
                      margin: "8px",
                      width: "90%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "30px",
                    }}
                  />
                ))}
              </Grid>
            </Box> */}
            
          </Grid>
        </Box>
        <Grid
          container
          spacing={3}
          marginLeft={{ lg: "16%" }}
          paddingLeft={{xs:'8%',lg:'0px'}}
          marginTop={{ lg: "30px",xs:'8px' }}
        >
          <Grid
            item
            lg={2}
            sx={{
              borderColor: "white",
            }}
          >
            <Link to={`/events/${id}`} style={{ textDecoration: "none" }}>
              <Box
                border={2}
                sx={{
                  height: "600px",
                  width: {lg:"250px",xs:'140px'},
                  color: "black",
                  borderColor: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  borderRadius: "16px",
                  padding: "30px",
                  paddingTop:{lg:"38px",xs:'20px'}
                }}
              >
                <Typography sx={{ fontSize: "18px", textAlign: "center",fontWeight:'700' }}>
                  View Events
                </Typography>
              </Box>
            </Link>
          </Grid>

          <Grid
            item
            lg={1}
            marginLeft={{ lg: "64px" }}
            borderRadius="16px"
            sx={{
              borderColor: "white",
            }}
          >
            <Link to={`/rides`} style={{ textDecoration: "none" }}>
              <Box
                border={2}
                sx={{
                  height: "100px",
                  width: {lg:"170px",xs:'140px'},
                  color: "black",
                  borderColor: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  borderRadius: "16px",
                  padding: "30px",
                  paddingTop:{lg:"38px",xs:'20px'}
                }}
              >
                <Typography sx={{ fontSize: "18px", textAlign: "center",fontWeight:'700' }}>
                  Find a Ride
                </Typography>
              </Box>
            </Link>
          </Grid>
         
          
        </Grid>
        

        <center>
          <Box
            border={3}
            sx={{
              width: { lg: "1050px", xs: "280px" },
              borderColor: "black",
              borderRadius: "30px",
              backgroundColor: "rgba(48, 103, 84, 0.5)",
              padding: "24px",
              marginLeft: {lg:"100px"},
              marginTop: { lg: "32px", xs: "32px" },
              marginBottom: "32px",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "400",
                fontSize: { lg: "24px", xs: "20px" },
                textAlign: "left",
                marginTop: { lg: "34px", xs: "32px" },
              }}
            >
              DETAILS
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontWeight: "400",
                fontSize: { lg: "16px", xs: "16px" },
                textAlign: "left",
                marginTop: "8px",
              }}
            >
              {location.details}
            </Typography>
          </Box>
        </center>
      </Grid>
    </Grid>
  );
};

export default Destination;
