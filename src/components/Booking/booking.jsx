import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const BookingPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    hotelName: "",
    personCount: "",
    roomsCount: "",
    checkinDate: "",
    checkoutDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, such as sending data to the backend
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      userName: "",
    hotelName: "",
    personCount: "",
    roomsCount: "",
    checkinDate: "",
    checkoutDate: ""
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Booking Page
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="fullName"
          label="Full Name"
          value={formData.userName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          value={formData.hotelName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={formData.personCount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="checkInDate"
          label="Check-in Date"
          type="date"
          value={formData.roomsCount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="checkOutDate"
          label="Check-out Date"
          type="date"
          value={formData.checkinDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="numberOfGuests"
          label="Number of Guests"
          type="number"
          value={formData.checkoutDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default BookingPage;
