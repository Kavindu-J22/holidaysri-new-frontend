import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";
import Nav from "../../pages/Nav/Nav";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const AllArchivedEarns = () => {
  const [earnDetails, setEarnDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateQuery, setDateQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllEarning();
  }, []);

  const getAllEarning = async () => {
    try {
      const res = await axios.get(
        "https://holidaysri-backend-9xm4.onrender.com/paymentrequest/"
      );
      setEarnDetails(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching earnings:", error);
      setLoading(false);
      alert("Error fetching live earnings: " + error.message);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const filterEarns = () => {
    return earnDetails.filter((earn) => {
      const matchesEmail = earn.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      
      const matchesDate =
        dateQuery === "" ||
        new Date(earn.createdAt) <= new Date(dateQuery);

      return matchesEmail && matchesDate;
    });
  };

  const calculateTotalAmount = () => {
    return filterEarns()
      .filter((earn) => earn.status === "Approved") // Filter events with status "Approved"
      .reduce((total, earn) => total + earn.amount, 0); // Calculate the total amount
  };

  return (
    <>
      <Helmet>
        <title>All Earnings</title>
      </Helmet>
      <Nav />
      <Grid
        container
        sx={{
          position: "relative",
          minHeight: "100vh",
          paddingBottom: "40px",
          paddingTop: { lg: "80px", xs: "80px" },
          overflow: "hidden",
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage:
              'url("https://i2.pickpik.com/photos/152/506/327/road-night-light-traffic-preview.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            filter: "blur(3px)",
            zIndex: -1,
          },
        }}
      >
        <Grid item xs={12}>
          <Box marginBottom="0px" marginLeft="32px" marginTop="16px">
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                borderRadius: "30px",
              }}
              onClick={goBack}
            >
              Back
            </Button>
          </Box>
          <Grid container justifyContent="center" alignItems="center">
            <Box
              sx={{
                width: { lg: "1100px", xs: "300px", md: "100%", sm: "100%" },
                marginLeft: { lg: "20px", xs: "20px", md: "5%", sm: "5%" },
              }}
            >
              <Typography
                fontSize={{ lg: "24px", xs: "22px" }}
                sx={{ color: "white" }}
                marginTop="16px"
              >
                Paid Payment Requests
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Search by email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                sx={{
                  marginTop: "16px",
                  backgroundColor: "white",
                  borderRadius: "30px",
                }}
              />
              <TextField
                variant="outlined"
                placeholder="Filter by createdAt (e.g., 2024-08-11T05:06:21.830Z)"
                value={dateQuery}
                onChange={(e) => setDateQuery(e.target.value)}
                fullWidth
                sx={{
                  marginTop: "16px",
                  backgroundColor: "white",
                  borderRadius: "30px",
                }}
              />
              <Typography
                fontSize={{ lg: "20px", xs: "18px" }}
                sx={{ color: "white", marginTop: "8px" }}
              >
               Paid Total Amount: LKR {calculateTotalAmount()}
              </Typography>
              <Grid container spacing={2} marginTop="8px">
              {filterEarns()
  .filter((event) => event.status === "Approved") 
  .map((event, index) => (
                  <Grid
                    item
                    xs={12}
                    lg={3}
                    md={4}
                    sm={4}
                    sx={{
                      borderColor: "black",
                      borderRadius: "30px",
                      backgroundColor: "rgba(255,255,255, 0.5)",
                      padding: "24px",
                      marginLeft: "8px",
                      marginTop: "8px",
                    }}
                    key={event._id}
                  >
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: "600",
                        fontSize: { lg: "20px", xs: "20px" },
                        textAlign: "left",
                      }}
                    >
                      Email: {event.email}
                    </Typography>
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: "600",
                        fontSize: { lg: "20px", xs: "20px" },
                        textAlign: "left",
                      }}
                    >
                      Amount: LKR {event.amount}
                    </Typography>
                    <Typography
                      id="modal-modal-description"
                      color="black"
                      sx={{
                        mt: 1,
                        fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                      }}
                    >
                      Promo Code: {event.promoCode} 
                    </Typography>
                    <Typography
                      id="modal-modal-description"
                      color="black"
                      sx={{
                        mt: 1,
                        fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                      }}
                    >
                    Date: {new Date(event.createdAt).toLocaleString()} 
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AllArchivedEarns;
