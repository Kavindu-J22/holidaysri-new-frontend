import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";

const SubscriptionPage = () => {
  
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Subscription Packages
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              border: 1,
              borderRadius: 2,
              padding: 3,
              textAlign: "center",
              borderColor: "primary.main"
            }}
          >
            <Typography variant="h5" gutterBottom>
              Basic Package
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
            $1/Advertisement
            </Typography>
            <a href="/Checkout"><Button variant="contained" color="primary">
              Subscribe
            </Button></a>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              border: 1,
              borderRadius: 2,
              padding: 3,
              textAlign: "center",
              borderColor: "primary.main"
            }}
          >
            <Typography variant="h5" gutterBottom>
              Standard Package
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              $2/2 Advertisements
            </Typography>
            <Button variant="contained" color="primary">
              Subscribe
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              border: 1,
              borderRadius: 2,
              padding: 3,
              textAlign: "center",
              borderColor: "primary.main"
            }}
          >
            <Typography variant="h5" gutterBottom>
              Premium Package
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
            $10/10 Advertisements
            </Typography>
            <Button variant="contained" color="primary">
              Subscribe
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubscriptionPage;
