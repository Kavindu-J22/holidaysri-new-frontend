import React from "react";
import "./Banner.css";
import { Grid } from "@mui/material";

export default function Banner() {
  return (
    <div className="video-container">
      <Grid sx={{width:'300px'}}>

      <video autoPlay muted loop style={{width:"100%", height:"100%", borderRadius:"40px",}}>
        <source
          src="https://res.cloudinary.com/dqdcmluxj/video/upload/v1733431924/Sri_Lanka_-_Heart_of_the_Indian_Ocean_eb32zv.mp4"
          type="video/mp4"
        />
      </video>
      </Grid>
     
      <div className="content">
      <Grid display={{ md: "block", xs: "none" }}>
        <h2
          style={{
            textAlign: "center",
            fontFamily: "'Dancing Script', cursive", // Use the new decorative font
            color: "#d3d4c7c1",
            marginTop: "280px",
            marginBottom: "2px",
            fontWeight: "200",
          }}
        >
          Discover Paradise: Embark on a Journey Through Sri Lanka's Enchanting Beauty{" "}
        </h2>
      </Grid>
      </div>
    </div>
  );
}
