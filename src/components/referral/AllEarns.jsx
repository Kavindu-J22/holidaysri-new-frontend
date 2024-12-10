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
import DeleteIcon from "@mui/icons-material/Delete";

const AllEarns = () => {
  const [earnDetails, setEarnDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [yearQuery, setYearQuery] = useState("");
  const [monthQuery, setMonthQuery] = useState("");
  const [dayQuery, setDayQuery] = useState("");
  const navigate = useNavigate();

  const [paidDetails, setPayedDetails] = useState([]);

  useEffect(() => {
    getAllPayed();
  }, []);

  const getAllPayed = async () => {
    try {
      const res = await axios.get(
        "https://holidaysri-backend-9xm4.onrender.com/paymentrequest/"
      );
      setPayedDetails(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching earnings:", error);
      setLoading(false);
      alert("Error fetching live earnings: " + error.message);
    }
  };

  useEffect(() => {
    getAllEarning();
  }, []);

  const getAllEarning = async () => {
    try {
      const res = await axios.get(
        "https://holidaysri-backend-9xm4.onrender.com/promo/getearns"
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

  // Helper function to format the date into a readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options); // Format as "Month Day, Year"
  };

  // Filter earnings based on readable year, month, and day
  const filterEarns = () => {
    return earnDetails.filter((earn) => {
      const createdAt = new Date(earn.createdAt);
      const matchesEmail = earn.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesYear =
        yearQuery === "" || createdAt.getFullYear().toString() === yearQuery;
      const matchesMonth =
        monthQuery === "" || (createdAt.getMonth() + 1).toString() === monthQuery;
      const matchesDay =
        dayQuery === "" || createdAt.getDate().toString() === dayQuery;

      return matchesEmail && matchesYear && matchesMonth && matchesDay;
    });
  };

  const filterPaid = () => {
    return paidDetails.filter((earn) => {
      const matchesEmail = earn.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesYear =
        yearQuery === "" || new Date(earn.createdAt).getFullYear().toString() === yearQuery;
      const matchesMonth =
        monthQuery === "" ||
        (new Date(earn.createdAt).getMonth() + 1).toString() === monthQuery;
      const matchesDay =
        dayQuery === "" || new Date(earn.createdAt).getDate().toString() === dayQuery;

      return matchesEmail && matchesYear && matchesMonth && matchesDay;
    });
  };

  const calculateTotalAmount = () => {
    return filterEarns().reduce((total, earn) => total + earn.amount, 0);
  };

  const calculatePaidAmount = () => {
    return filterPaid()
      .filter((earn) => earn.status === "Approved")
      .reduce((total, earn) => total + earn.amount, 0);
  };

  const handleDeleteFiltered = async () => {
    const filteredEarns = filterEarns();
    try {
      await axios.post(
        "https://holidaysri-backend-9xm4.onrender.com/promo/deleteearns",
        { earns: filteredEarns }
      );
      alert("Filtered records have been deleted and saved successfully.");
      getAllEarning();
    } catch (error) {
      console.error("Error deleting filtered records:", error);
      alert("Error deleting filtered records: " + error.message);
    }
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
                All Earnings
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

              {/* Year filter */}
              <TextField
                variant="outlined"
                placeholder="Filter by Year (e.g., 2023)"
                value={yearQuery}
                onChange={(e) => setYearQuery(e.target.value)}
                fullWidth
                sx={{
                  marginTop: "16px",
                  backgroundColor: "white",
                  borderRadius: "30px",
                }}
              />

              {/* Month filter */}
              <TextField
                variant="outlined"
                placeholder="Filter by Month (e.g., 8 for August)"
                value={monthQuery}
                onChange={(e) => setMonthQuery(e.target.value)}
                fullWidth
                sx={{
                  marginTop: "16px",
                  backgroundColor: "white",
                  borderRadius: "30px",
                }}
              />

              {/* Day filter */}
              <TextField
                variant="outlined"
                placeholder="Filter by Day (e.g., 11)"
                value={dayQuery}
                onChange={(e) => setDayQuery(e.target.value)}
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
                Total Amount: LKR {calculateTotalAmount()}
              </Typography>
              <Typography
                fontSize={{ lg: "20px", xs: "18px" }}
                sx={{ color: "white", marginTop: "8px" }}
              >
                Paid Amount: LKR {calculatePaidAmount()}
              </Typography>

              {searchQuery !== "" && (
                <>
                  <Typography
                    fontSize={{ lg: "20px", xs: "18px" }}
                    sx={{ color: "white", marginTop: "8px" }}
                  >
                    Remaining Amount: LKR {calculateTotalAmount() - calculatePaidAmount()}
                  </Typography>
                </>
              )}

              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                sx={{
                  marginTop: "8px",
                  marginBottom: "16px",
                  borderRadius: "30px",
                }}
                onClick={handleDeleteFiltered}
              >
                Delete Filtered Records
              </Button>

              <Grid container spacing={2} marginTop="20px">
                {filterEarns().map((earn, index) => (
                  <Grid item xs={12} key={index}>
                    <Box
                      sx={{
                        padding: "16px",
                        backgroundColor: "white",
                        borderRadius: "30px",
                        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Typography>Email: {earn.email}</Typography>
                      <Typography>Amount: {earn.amount}</Typography>
                      <Typography>
                        Created At: {formatDate(earn.createdAt)} {/* Readable date format */}
                      </Typography>
                      <Typography
                      id="modal-modal-description"
                      color="black"
                      sx={{
                        mt: 1,
                        fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                      }}
                    >
                      Promo Code: {earn.promoCode}
                    </Typography>
                    <Typography
                      id="modal-modal-description"
                      color="black"
                      sx={{
                        mt: 1,
                        fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                      }}
                    ></Typography>
                    </Box>
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

export default AllEarns;
