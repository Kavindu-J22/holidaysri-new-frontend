// import React from "react";
// import bgVideo from "../../../assets/bg.mp4";
// import Hsllogo from "../../../assets/Hsllogo.png";
// import { motion, spring } from "framer-motion";
// import { Link } from "react-scroll";
// import { Cursor, useTypewriter } from "react-simple-typewriter";
// import "./landing.css";
// import { Button, Modal, Box, Typography, Grid } from "@mui/material";
// import Login from "../Login/Login";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: { lg: "42%", sm: "41%" },
//   borderRadius: "30px",
//   border: "1px solid black",
// };

// const Main = () => {
//   const [text] = useTypewriter({
//     words: [
//       "Hotels",
//       "Vehicles",
//       "Tour Packages",
//       "Travel Partners",
//       "Tour Guides",
//       "Gifts and Souvenirs",
//     ],
//     loop: {},
//     typeSpeed: 120,
//     deleteSpeed: 80,
//   });
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   return (
//     <div className="main">
//       <div className="overlay"></div>
//       <video src={bgVideo} autoPlay loop muted />
//       <div className="content">

      

//         <motion.h1
//           initial={{ y: "-2rem", opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, type: spring }}
//           className="title"
//         >
          
//           Holiday Sri
//         </motion.h1>
//         <p className="desc">
//           Find <span>{text}</span>
//           <Cursor />
//         </p>
//         <div className="navbar">
//           <div className="navContainer">
//             <div className="navItems">
//               <Link to="hotels" spy={true} smooth={true} duration={500} className="navButton">Hotels</Link>
//               <Link
//                 to="vehicles"
//                 spy={true}
//                 smooth={true}
//                 duration={500}
//                 className="navButton"
//               >
//                 Vehicles
//               </Link>
//               <Link
//                 to="tour-packages"
//                 spy={true}
//                 smooth={true}
//                 duration={500}
//                 className="navButton"
//               >
//                 Tour Packages
//               </Link>
//               <Link
//                 to="travel-partner"
//                 spy={true}
//                 smooth={true}
//                 duration={500}
//                 className="navButton"
//               >
//                 Travel Partner
//               </Link>
//               <Link
//                 to="tour-guide"
//                 spy={true}
//                 smooth={true}
//                 duration={500}
//                 className="navButton"
//               >
//                 Tour Guide
//               </Link>
//               <Link
//                 to="market-place"
//                 spy={true}
//                 smooth={true}
//                 duration={500}
//                 className="navButton"
//               >
//                 Market Place
//               </Link>    
            
//             </div>
//             <Button
//               onClick={handleOpen}
//               variant="outlined"
//               sx={{
//                 color: "white",
//                 borderColor: "white",
//                 borderRadius: 300,
//                 height: "30px",
//                 marginTop: "5px",
//                 marginLeft: "30px",
//                 "&:hover": {
//                   color: "48BB78",
//                   boxShadow: "none",
//                   borderColor: "#48BB78",
//                 },
//               }}
//             >
//               Login
//             </Button>
//           </div>
//         </div>
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <Grid
//               sx={{
//                 position: "absolute",
//                 zIndex: 2,
//                 marginTop: "10px",
//                 marginLeft: "93%",
//               }}
//             >
//               <svg
//                 onClick={handleClose}
//                 style={{ cursor: "pointer" }}
//                 width="28"
//                 height="28"
//                 viewBox="0 0 28 28"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <circle cx="14" cy="14" r="14" fill="#2A2A2A" />
//                 <path
//                   d="M19 9L9 19M9 9L19 19"
//                   stroke="#FFF7F7"
//                   stroke-width="1.21875"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//                 <circle cx="14" cy="14" r="11.5" stroke="#FBF8F8" />
//               </svg>
//             </Grid>
//             <Login onClose={handleClose} />
           
//           </Box>
//         </Modal>
        
//         <div className="hamburgerMenu">
//           <a href="/login" style={{textDecoration:'none'}}>
//           <div  spy={true} smooth={true} duration={500} className="glass">
//             Login
//           </div>
//             </a>    
          
//           <Link
//             to="hotels"
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="glass"
//           >
//             Hotels
//           </Link>
//           <Link
//             to="vehicles"
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="glass"
//           >
//             Vehicles
//           </Link>
//           <Link
//             to="tour-packages"
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="glass"
//           >
//             Tour Packages
//           </Link>
//           <Link
//             to="travel-partner"
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="glass"
//           >
//             Travel Partner
//           </Link>
//           <Link
//             to="tour-guide"
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="glass"
//           >
//             Tour Guide
//           </Link>
//           <Link
//             to="market-place"
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="glass"
//           >
//             Market Place
//           </Link>
//         </div>

//         <div className="Mainlogo">
//         <img className="logoimg" src={Hsllogo} alt="" />
//         </div>

//         <div className="travelAgent">
//           <p className="travelAgentDesc">Be a travel agent and earn money!</p>
//           <div className="travelAgentButtonWrap">
//             <a href="/landing" className="travelAgentButton">Local Travel Agent</a>|
//             <a href="/foreign-dashboard" className="travelAgentButton">Foreign Travel Agent</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;
