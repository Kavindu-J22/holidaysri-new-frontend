import React, { useRef, useEffect,useState  } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const Test = () => {
  const { id } = useParams();
  const gridRef = useRef(null); // Reference for grid element
  const [location, setLocation] = useState(null);
  const imageLinksArray = [
    "https://fernandotravels.com.au/wp-content/uploads/2018/06/galle-fort.jpg",
    "https://www.suryalanka.com/wp-content/uploads/2020/06/featured-img2.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/515879655.jpg?k=52a5b8217dcafb83c3cc6df570d1ffdb007e66254353089f45c1c8673648d0bf&o=&hp=1",
    "https://www.attractionsinsrilanka.com/wp-content/uploads/2019/07/Galle-Fort-Beach.jpg",
    "https://www.andbeyond.com/wp-content/uploads/sites/5/galle-sri-lanka-tuk-tuk1.jpg",
    "https://www.archaeology.lk/wp-content/uploads/2020/11/galle_fort_sri_lanka_aerial_view_buddhika_dilshan.jpg",
  ];
  const description =
    "Galle is a city on the southwest coast of Sri Lanka. It’s known for Galle Fort, the fortified old city founded by Portuguese colonists in the 16th century. Stone sea walls, expanded by the Dutch, encircle car-free streets with architecture reflecting Portuguese, Dutch and British rule. Notable buildings include the 18th-century Dutch Reformed Church. Galle Lighthouse stands on the fort’s southeast tip.";

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


  useEffect(() => {
    async function getLocation() {
      try {
        const response = await axios.get(`https://holidaysri-backend-9xm4.onrender.com/location/get/65f2c1bac6f9894f6cbc4627`);
        setLocation(response.data.location);
      } catch (error) {
        console.error("Error fetching location:", error);
        alert("Error fetching location: " + error.message);
      }
    }
    getLocation();
  }, [id]);

  if (!location) {
    return <div>Loading...</div>;
  }


  return (
    <Grid
      container
      style={{
        backgroundImage:
        'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733336447/pexels-photo-1072179_frjk63_js026i.webp")', backgroundSize: "cover",
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
              fontSize: { lg: "50px", xs: "32px" },
            }}
          >
            Holiday Sri
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontFamily: "inter",
              marginTop: "8px",
              fontSize: { lg: "50px", xs: "32px" },
              letterSpacing: "20px",
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
                {imageLinksArray.map((image, index) => (
                  <img
                    key={index}
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
                ))}
              </Grid>
            </Box>
          </Grid>
        </Box>

        <Box
          border={3}
          sx={{
            width: { lg: "850px", xs: "280px" },
            borderColor: "black",
            borderRadius: "30px",
            backgroundColor: "rgba(48, 103, 84, 0.5)",
            padding: "24px",
            marginLeft:"160px",
            marginTop: { lg: "30px", xs: "32px" },
            marginBottom: "32px",
          }}
        >
          <Button variant="outlined" sx={{ color: "white", borderColor: "white", borderRadius: "30px" }}>View Events</Button>
          <Button variant="outlined" sx={{ color: "white", borderColor: "white", borderRadius: "30px" }}>Find a Ride</Button>
          <Typography
            sx={{
              color: "white",
              fontWeight: "400",
              fontSize: { lg: "24px", xs: "20px" },
              textAlign: "left",
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
              marginTop: '8px'
            }}
          >
             {location.details}
          </Typography>

        </Box>
      </Grid>
    </Grid>
  );
};

export default Test;
