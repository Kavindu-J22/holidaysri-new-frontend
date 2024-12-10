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

const AllPaymentRequests = () => {
  const gridRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedPaymentForUpdate, setSelectedPaymentForUpdate] = useState(null);
  const [updatedAmount, setUpdatedAmount] = useState(0);
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedAccNumber, setUpdatedAccNumber] = useState("");
  const [updatedBank, setUpdatedBank] = useState("");
  const [updatedBranch, setUpdatedBranch] = useState("");
  const [updatedCreated, setUpdatedCreated] = useState("");

  const [paymentRequestDetails, setPaymentRequestDetails] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateOpen = (event) => {
    setSelectedPaymentForUpdate(event);
    setUpdatedAmount(event.amount);
    setUpdatedDate(event.date);
    setUpdatedAccNumber(event.accNumber);
    setUpdatedBank(event.bank);
    setUpdatedBranch(event.branch);
    setUpdatedCreated(event.createdAt);
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

  const handleDateChange = (event) => {
    setUpdatedDate(event.target.value);
  };

  const handleAccNumberChange = (event) => {
    setUpdatedAccNumber(event.target.value);
  };

  const handleBankChange = (event) => {
    setUpdatedBank(event.target.value);
  };

  const handleBranchChange = (event) => {
    setUpdatedBranch(event.target.value);
  };

  const handleCreatedChange = (event) => {
    setUpdatedCreated(event.target.value);
  };

  const filteredPayments = () => {
    const params = new URLSearchParams(location?.search);
    const email = params?.get("email");

    if (email) {
      return paymentRequestDetails.filter(
        (payment) => payment.email.toLowerCase() === email.toLowerCase()
      );
    } else {
      return paymentRequestDetails;
    }
  };

  const updatePaymentRequest = async () => {
    try {
      const updatedPayment = {
        amount: updatedAmount,
        date: updatedDate,
        accNumber: updatedAccNumber,
        bank: updatedBank,
        branch: updatedBranch,
        createdAt: updatedCreated,
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
          {filteredPayments().length === 0 && (
            <Typography
              variant="h5"
              style={{ textAlign: "center", marginTop: "20px", color: "white" }}
            >
              No Payment Requests available at the moment.
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
                <Grid container spacing={2} marginTop="8px">
                  {filteredPayments().map((event, index) => {
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
                          <Grid item lg={6} xs={6} sm={7} md={5}>
                            <Typography
                              id="modal-modal-description"
                              color="black"
                            >
                              Status: {event.status}
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
                            marginTop: "16px",
                            width: "100%",
                          }}
                        >
                          View More
                        </Button>
                        <Button
                          onClick={() => handleUpdateOpen(event)}
                          variant="outlined"
                          sx={{
                            color: "black",
                            borderColor: "black",
                            borderRadius: "30px",
                            marginTop: "16px",
                            width: "100%",
                          }}
                        >
                          Update
                        </Button>
                      </Grid>
                    );
                  })}{" "}
                </Grid>
              </Box>

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
                        variant="h5"
                        component="h2"
                        color="white"
                        fontWeight={600}
                      >
                       Amount: {selectedEvent.amount}
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        color="white"
                        marginTop="8px"
                      >
                        Requested Date:{selectedEvent.date}
                      </Typography>
                      <Grid container>
                        <Grid item xs={12} lg={6}>
                          <Typography
                            id="modal-modal-description"
                            color="white"
                            sx={{ mt: 2 }}
                          >
                            Account Number: {selectedEvent.accNumber}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Typography
                            id="modal-modal-description"
                            color="white"
                            sx={{ mt: 2 }}
                          >
                            Bank: {selectedEvent.bank}
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
                            Branch: {selectedEvent.branch}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Typography
                            id="modal-modal-description"
                            color="white"
                            sx={{ mt: 2 }}
                          >
                            Reqeust Created Date: {selectedEvent.createdAt}
                          </Typography>
                        </Grid>
                      </Grid>{" "}
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
              <Modal
                open={updateOpen}
                onClose={handleUpdateClose}
                aria-labelledby="modal-update-title"
                aria-describedby="modal-update-description"
              >
                <Box sx={updateModalStyle}>
                  {selectedPaymentForUpdate && (
                    <>
                      <Typography
                        id="modal-update-title"
                        variant="h6"
                        component="h2"
                        color="black"
                        fontWeight={600}
                      >
                        Update Payment Request Details
                      </Typography>
                      <Grid container marginTop={{ lg: "16px", xs: "16px" }}>
                        <Grid item lg={4} xs={12} sm={6} md={6}>
                          <Customtextfield
                            id="maximum"
                            label="Account Number"
                            type="number"
                            width={{ lg: "200px" }}
                            value={updatedAccNumber}
                            onChange={handleAccNumberChange}
                          />
                        </Grid>
                        <Grid
                          item
                          lg={4}
                          xs={12}
                          sm={4}
                          md={4}
                          marginTop={{
                            lg: "0px",
                            xs: "16px",
                            md: "0px",
                            sm: "0px",
                          }}
                        >
                          <Customtextfield
                            id="availability"
                            label="Bank"
                            type="text"
                            width={{ lg: "200px" }}
                            value={updatedBank}
                            onChange={handleBankChange}
                          />
                        </Grid>
                        <Grid
                          item
                          lg={4}
                          sm={12}
                          md={12}
                          marginTop={{ lg: "0px", xs: "16px" }}
                        >
                          <Customtextfield
                            id="phoneNumber"
                            label="Branch"
                            width={{ lg: "200px" }}
                            value={updatedBranch}
                            onChange={handleBranchChange}
                          />
                        </Grid>
                      </Grid>

                      <Button
                        onClick={updatePaymentRequest}
                        variant="outlined"
                        sx={{
                          color: "black",
                          borderColor: "black",
                          borderRadius: "30px",
                          marginTop: "24px",
                          marginLeft: {
                            lg: "80%",
                            sm: "75%",
                            md: "75%",
                            xs: "40%",
                          },
                          width: "150px",
                          "&:hover": {
                            borderColor: "red",
                          },
                        }}
                      >
                        Save
                      </Button>
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

export default AllPaymentRequests;
