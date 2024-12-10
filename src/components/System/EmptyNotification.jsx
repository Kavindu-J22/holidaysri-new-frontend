// React Imports
import React from "react";

// Third Party Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Project Components

const EmptyNotification = ({
  svg,
  title,
  body,
  width,
  marginLefts,
  margintops
}) => {
  const widthValue = width || { lg: "744px", xs: "310px" };
 
  return (
    <>
    <Box
      border={1}
      width={widthValue}
      sx={{
        borderColor: "black",
        backgroundColor: "rgba(255,255,255, 0.3)",
        borderRadius: "12px",
        padding: "24px",
        marginLeft:marginLefts,
        marginTop:margintops?margintops:"0px"
      }}
    >
      <center>
        <Box>{svg}</Box>

        <Typography marginTop='8px' sx={{
                          color: "black",
                          fontSize: { lg: "20px", xs: "18px" },
                        }}>
          {title}
        </Typography>

        <Typography variant="h5" width={{ lg: "auto" }}>
          {body}
        </Typography>
        
      </center>
    </Box>
    </>
    
  );
};

export default EmptyNotification;
