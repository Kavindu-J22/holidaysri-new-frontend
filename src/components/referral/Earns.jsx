import React, { useRef, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import Nav from "../../pages/Nav/Nav";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PaymentRequestModal = ({ open, handleClose, refreshData, totalAmount }) => {
  const [userEmail, setUserEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        setUserEmail(email);
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };
    getUserEmail();
  }, []);

  const handleSubmit = async () => {
    if (Number(amount) > Number(totalAmount)) {
      alert("Amount exceeds the total available amount.");
      return;
    }

    try {
      const newPayment = {
        email: userEmail,
        amount,
        date,
        accNumber,
        bank,
        branch,
      };

      await axios.post("https://holidaysri-backend-9xm4.onrender.com/paymentrequest/add", newPayment);
      alert("Payment request submitted successfully");
      handleClose();
      refreshData(); // Refresh data after adding the new payment
    } catch (error) {
      console.error("Error adding payment request:", error);
      alert("Failed to submit payment request");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', width: 300 }}>
        <h2>Request Pay</h2>
        <form>
          <TextField
            label="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            fullWidth
            disabled // Disable editing since it's auto-filled
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Account Number"
            value={accNumber}
            onChange={(e) => setAccNumber(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Bank"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

const Earns = () => {
  const gridRef = useRef(null);

  const [earnDetails, setEarnDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const filteredEarns = () => {
    const params = new URLSearchParams(location?.search);
    const email = params?.get("email");

    if (email) {
      return earnDetails.filter(
        (earns) => earns.email.toLowerCase() === email.toLowerCase()
      );
    } else {
      return earnDetails;
    }
  };

  const calculateTotalAmount = () => {
    return filteredEarns().reduce((total, earn) => total + earn.amount, 0);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    getAllEarning(); // Refresh the earnings after the modal is closed
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
          {filteredEarns().length === 0 && (
            <Typography
              variant="h5"
              style={{ textAlign: "center", marginTop: "20px", color: "white" }}
            >
              No earnings available at the moment.
            </Typography>
          )}
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
              <Button
                variant="contained"
                sx={{
                  marginLeft: "16px",
                  color: "white",
                  borderRadius: "30px",
                }}
                onClick={handleModalOpen}
              >
                Request Pay
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
                <Typography
                  fontSize={{ lg: "20px", xs: "18px" }}
                  sx={{ color: "white", marginTop: "8px" }}
                >
                  Total Amount: LKR {calculateTotalAmount()}
                </Typography>
                <Grid container spacing={2} marginTop="8px">
                  {filteredEarns().map((event, index) => {
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
                    );
                  })}{" "}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <PaymentRequestModal
        open={modalOpen}
        handleClose={handleModalClose}
        refreshData={getAllEarning}
        totalAmount={calculateTotalAmount()} // Pass the total amount to the modal
      />
    </>
  );
};

export default Earns;
