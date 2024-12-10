import React, { useRef, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Modal,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import Nav from "../../pages/Nav/Nav";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Customtextfield from "../../components/hotel/Login/Customtextfield";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 600, xs: 280, md: 900 },
  backgroundColor: "rgba(48, 103, 84, 0.9)",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};
const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 600, xs: 280, md: 900 },
  backgroundColor: "rgba(95, 95, 95, 1)",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};
const updateModalStyle = {
  ...styles,
  width: { lg: 800, xs: 300, sm: 700, md: 900 },
};

const AllPayments = () => {
  const gridRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedPaymentForUpdate, setSelectedPaymentForUpdate] = useState(null);
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");

  const [paymentRequestDetails, setPaymentRequestDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Added state for search term
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getAllPaymentRequests();
  }, []);

  const getAllPaymentRequests = async () => {
    try {
      const res = await axios.get(
        "https://holidaysri-backend-9xm4.onrender.com/paymentrequest/"
      );
      setPaymentRequestDetails(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payment requests:", error);
      setLoading(false);
      alert("Error fetching payments: " + error.message);
    }
  };
  function getStatusColor(status) {
    switch (status) {
      case "Approved":
        return "#08f117";
      case "Pending":
        return "#eeff06";
      case "Rejected":
        return "#fe0606";
      default:
        return "black"; // Default color
    }
  }
  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateOpen = (event) => {
    setSelectedPaymentForUpdate(event);
    setUpdatedStatus(event.status);
    setUpdatedAmount(event.amount);
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleAmountChange = (event) => {
    setUpdatedAmount(event.target.value);
  };

  const handleStatusChange = (event) => {
    setUpdatedStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPayments = () => {
    const email = searchTerm.trim().toLowerCase();

    return paymentRequestDetails.filter(
      (payment) => payment.email.toLowerCase().includes(email)
    );
  };

  const updatePaymentRequest = async () => {
    try {
      const updatedPayment = {
        status: updatedStatus,
        amount: updatedAmount,
      };
      await axios.put(
        `https://holidaysri-backend-9xm4.onrender.com/paymentrequest/updatePayment/${selectedPaymentForUpdate._id}`,
        updatedPayment
      );
      // Reload the payment request details after update
      getAllPaymentRequests();
      // Close the update modal
      handleUpdateClose();
    } catch (error) {
      console.error("Error updating payment requests:", error);
      alert("Error updating payment requests: " + error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>All Payment Requests</title>
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
            </Button>{" "}
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
                All Payment Requests
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Search by email"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
                margin="normal"
                sx={{ marginTop: "16px",        borderRadius:'30px'    ,   backgroundColor: "white",
                }}
              />
              <Grid container spacing={2} marginTop="8px">
                {filteredPayments().length === 0 ? (
                  <Typography
                    variant="h5"
                    style={{ textAlign: "center", marginTop: "20px", color: "white" }}
                  >
                    No Payment Requests available at the moment.
                  </Typography>
                ) : (
                  filteredPayments().map((event, index) => {
                    return (
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
                          Amount: {event.amount}
                        </Typography>
                        <Typography
                          id="modal-modal-description"
                          color="black"
                          sx={{
                            mt: 1,
                            fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                          }}
                        >
                          Requested Date: {event.date}
                        </Typography>
                        <Typography
                          id="modal-modal-description"
                          color="black"
                          sx={{
                            mt: 1,
                            fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                          }}
                        >
                          Account Number: {event.accNumber}
                        </Typography>
                        <Grid container sx={{ mt: 1 }}>
                          <Grid item lg={6} xs={6} sm={7} md={5}>
                            <Typography
                              id="modal-modal-description"
                              color="black"
                            >
                              Bank: {event.bank}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 1 }}>
                          <Grid item lg={10} xs={6} sm={10} md={10}>
                          <Typography id="modal-modal-description">
  Status: <span style={{ color: getStatusColor(event.status) }}>{event.status === "Approved" ? "Paid" :event.status}</span>
</Typography>
                          </Grid>
                        </Grid>

                        <Button
                          onClick={() => handleOpen(event)}
                          variant="outlined"
                          sx={{
                            color: "black",
                            borderColor: "black",
                            borderRadius: "30px",
                            mt: 2,
                          }}
                        >
                          Details
                        </Button>
                        <Button
                          onClick={() => handleUpdateOpen(event)}
                          variant="outlined"
                          sx={{
                            color: "black",
                            borderColor: "black",
                            borderRadius: "30px",
                            mt: 2,
                          }}
                        >
                          Update
                        </Button>
                      </Grid>
                    );
                  })
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/* Details Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="white"
            sx={{ marginBottom: "20px" }}
          >
            Payment Details
          </Typography>
          {selectedEvent ? (
            <Box>
              <Typography
                id="modal-modal-description"
                color="white"
                sx={{
                  mt: 1,
                  fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                }}
              >
                Email: {selectedEvent.email}
              </Typography>
              <Typography
                id="modal-modal-description"
                color="white"
                sx={{
                  mt: 1,
                  fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                }}
              >
                Amount: {selectedEvent.amount}
              </Typography>
              <Typography
                id="modal-modal-description"
                color="white"
                sx={{
                  mt: 1,
                  fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                }}
              >
                Requested Date: {selectedEvent.date}
              </Typography>
              <Typography
                id="modal-modal-description"
                color="white"
                sx={{
                  mt: 1,
                  fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                }}
              >
                Account Number: {selectedEvent.accNumber}
              </Typography>
              <Typography
                id="modal-modal-description"
                color="white"
                sx={{
                  mt: 1,
                  fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                }}
              >
                Bank: {selectedEvent.bank}
              </Typography>
              <Typography
                id="modal-modal-description"
                color="white"
                sx={{
                  mt: 1,
                  fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                }}
              >
                Requested Created Date: {selectedEvent.createdAt}
              </Typography>
              <Typography
                id="modal-modal-description"
                color="white"
                sx={{
                  mt: 1,
                  fontSize: { lg: "16px", xs: "16px", sm: "14px" },
                }}
              >
                Status: {selectedEvent.status} 
              </Typography>
            </Box>
          ) : (
            <CircularProgress color="inherit" />
          )}
        </Box>
      </Modal>

      {/* Update Modal */}
      <Modal
        open={updateOpen}
        onClose={handleUpdateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={updateModalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="white"
            sx={{ marginBottom: "20px" }}
          >
            Update Payment Request
          </Typography>
          {selectedPaymentForUpdate ? (
            <Box>
              <Grid item lg={4} xs={12} sm={6} md={6}>
                          <Customtextfield
                            id="maximum"
                            label="Amount"
                            type="text"
                            width={{ lg: "200px" }}
                            value={updatedAmount}
                            onChange={handleAmountChange}
                          />
                        </Grid>
              <TextField
                select
                label="Status"
                value={updatedStatus}
                onChange={handleStatusChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Paid</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </TextField>
              <Button
                onClick={updatePaymentRequest}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Update
              </Button>
            </Box>
          ) : (
            <CircularProgress color="inherit" />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default AllPayments;
