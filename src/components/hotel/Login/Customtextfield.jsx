//react imports
import React, { useState } from "react";

//Third Party Imports
import { TextField, Typography, Grid, Box } from "@mui/material";


const Customtextfield = ( props) => {
  const {
    error,
    label,
    width,
    height,
    marginTop,
    color,
    marginBottom,
    marginLeft,
    marginRight,
    ...rest
  } = props;

  return (
    <Grid container>
      <Grid
        item
        sx={{
          marginTop: marginTop,
          marginBottom: marginBottom,
          marginLeft: marginLeft,
          marginRight: marginRight,
        }}
      >
        <Box width={{ lg: "590px",sm:'440px' }} height="auto">
          <Typography
            sx={{
                fontSize:'12px',
              color:color|| "black",
              marginBottom: "12px",
              textAlign: "left",
            }}
          >
            {label}
          </Typography>
        </Box>
        <TextField
  sx={{
    width: width || "90%",
    height: "44px",
    "& input": {
      backgroundColor: 'rgba(255, 255, 255, 0)', // Fully transparent background
      boxSizing: "unset !important",
      height: "10px",
      fontSize: "16px",
      fontFamily: 'inter',
      fontWeight: 400,
    },
    "& fieldset": {
      borderColor: 'black',
      borderRadius: "10px",
    },
    "& .MuiInput-root:before": {
      borderBottom: "transparent !important",
    },
    "& .MuiOutlinedInput-root": {
      background: 'rgba(255, 255, 255, 0)', // Fully transparent background
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid var(--error-300, rgba(6, 15, 20, 0.32)) !important",
    },
    "&.Mui-error": {
      borderRadius: "10px",
      background: "var(--White, #FFF)",
      boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
    },
    "& .custom-textfield": {
      height: "44px",
      borderRadius: "4px",
      backgroundColor: 'rgba(255, 255, 255, 0)', // Fully transparent background
      padding: "10px",
      boxSizing: "unset !important",
      fontSize: "16px",
      color: "#333",
    },
  }}
  {...rest}
/>

      </Grid>
    </Grid>
  );
};

export default Customtextfield;
