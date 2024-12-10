import React, { useState, useEffect} from "react";
import { Box, Button, Typography, Modal, Grid ,Select,} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Customtextfield from "../../components/hotel/Login/Customtextfield";
import axios from "axios"; 
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 640, xs: 250 },
  maxHeight: "80vh", // Set maximum height to 80% of the viewport height
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
  overflowY: "auto", // Enable vertical scrolling
};
const Addpackage = (props) => {
  const [editingPackage, setEditingPackage] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false);
    window.location.reload();
  }

  const [packages,setPackages] = useState([]);
  const [images, setImages] = useState([]);
  const [packageName, setpackageName] = useState("");
  const [category,setcategory,] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [activities, setactivities] = useState("");
  
  
  const handleFileChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    // Append new images to the existing ones
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };
  

const handleEditPackage = (packages) => {
  setEditingPackage(packages);
  setpackageName(packages.packageName);
  setcategory(packages.category);
  setDescription(packages.description);
  setLocation(packages.location);
  setPrice(packages.price);
  setactivities(packages.activities);
  
  // Set the existing images
  setImages(packages.images);

  setOpen(true); // Open the modal for editing
};

  
const handleAddPackage = async(e) => {
  e.preventDefault();

   // Upload images to Cloudinary
   const uploadedImageUrls = [];
   for (const image of images) {
     const formData = new FormData();
     formData.append("file", image);
     formData.append("upload_preset", "aahllisc");
 
     try {
       const response = await axios.post(
         "https://api.cloudinary.com/v1_1/daa9e83as/image/upload",
         formData
       );
       uploadedImageUrls.push(response.data.secure_url);
     } catch (error) {
       console.error("Error uploading image:", error);
       alert("Error uploading image: " + error.message);
       return; // Exit function if any image upload fails
     }
   }

  const newPackage = {
    category,
    packageName,
    location,
    description,
    price,
    activities,
    images: uploadedImageUrls,
  };
  console.log("New Package:", newPackage); // Log new package object
  if (editingPackage) {
    // If editing event exists, update the existing event
    axios
      .put(
        `https://holidaysri-backend-9xm4.onrender.com/package/updatePackage/${editingPackage._id}`,
        newPackage
      )
      .then(() => {
        alert("The Package was Successfully updated");
        window.location = `/add-package`; // Redirect to location page after update
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    // Otherwise, add a new event
    axios
      .post("https://holidaysri-backend-9xm4.onrender.com/package/add", newPackage)
      .then(() => {
        alert("The New Package was Successfully saved");
        window.location = `/add-package`; // Redirect to location page after adding
      })
      .catch((err) => {
        alert(err);
      });
  }
};



useEffect(() => {
  async function getAllPackages() {
      try {
          const res = await axios.get("https://holidaysri-backend-9xm4.onrender.com/package/");
          setPackages(res.data);
      } catch (error) {
          console.error("Error fetching Packages:", error);
          alert("Error fetching Packages: " + error.message);
      }
  }
  getAllPackages();
}, []);



function handleDeletePackage(id){

const r = window.confirm ("Do you really want to Delete this Package?"); 
if(r ==true){
    axios.delete(`https://holidaysri-backend-9xm4.onrender.com/package/delete/${id}`).then ((res)=>{
        alert("Delete Successfully");
        window.location = `/add-package`;
        setPackages()
    })
}
}



  return (
    <div style={{paddingTop: "16px", paddingBottom: "16px",backgroundImage:
    'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733441065/pexels-alex-azabache-3723035_1_xs9aso_svjw7d.webp")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh", }}>
      <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.8)',margin:{lg:'40px',xs:'16px'},padding:{lg:'24px',xs:'10px'},borderRadius:'20px'}}>
        <Box textAlign="center" marginTop={{ lg: "4%", xs: "4%" }}>
          <Typography
            sx={{
              color: "white",
              fontFamily: "inter",
              marginTop: "8px",
              fontSize: { lg: "50px", xs: "18px" },
              letterSpacing: "20px",
            }}
          >
            Add Packages
          </Typography>
        </Box>
        <Grid container justifyContent="center" alignItems="center">
          <Box
            sx={{
              width: { lg: "1100px", xs: "300px" },
            }}
            marginTop="40px"
          >
            <Button
              variant="outlined"
              sx={{
                borderRadius: "30px",
                borderColor: "black",
                boxShadow: "none",
                width: { lg: "200px", xs: "48%" },
                backgroundColor: "white",
                color: "black",
                marginTop: { lg: "32px", xs: "20px" },
                height: "48px",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "black",
                  boxShadow: "none",
                },
              }}
              onClick={handleOpen}
            >
              ADD PACKAGE
            </Button>
          </Box>
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
        
           
          <Customtextfield label="Location name" value={location} onChange={(e) => setLocation(e.target.value)}  marginTop="8px" />
          
            <Customtextfield label="Package name"  value={packageName} onChange={(e) => setpackageName(e.target.value)}  marginTop="8px" />
            <div>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="uploadImageInput"
                onChange={handleFileChange}
                multiple 
              />
              <label htmlFor="uploadImageInput">
                <Button
                  variant="outlined"
                  sx={{
                    color: "black",
                    borderRadius: "30px",
                    borderColor: "black",
                    "&:hover": {
                      color: "black",
                      borderRadius: "30px",
                      borderColor: "black",
                    },
                    marginTop: "16px",
                    marginBottom: "16px",
                  }}
                  component="span"
                >
                  Upload image
                </Button>
              </label>
              
              {/* Display existing images if there are no newly uploaded images */}
              {!images.length && editingPackage && editingPackage.images.map((image, index) => (
                 <img
                 key={index}
                 src={image}
                 alt={`Uploaded ${index}`}
                 style={{
                   maxWidth: "100px",
                   maxHeight: "100px",
                  margin: "5px",
               }}
               />
               ))}
               {/* Display newly uploaded images for preview */}
               {images.length > 0 && images.map((image, index) => (
               <img
                key={index}
                 src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    margin: "5px",
                 }}
                />
                
                ))}

            </div>
            <Customtextfield label="pack" placeholder="Example: 10 pack"  value={category} onChange={(e) => setcategory(e.target.value)}  marginTop="8px" />
            <Customtextfield label="price"  value={price} onChange={(e) => setPrice(e.target.value)}  marginTop="8px" />

            <Customtextfield label="Activities"  value={activities} onChange={(e) => setactivities(e.target.value)}  marginTop="8px" />

            <Customtextfield label="Description"  value={description} onChange={(e) => setDescription(e.target.value)}  marginTop="8px" />

            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                borderRadius: "30px",
                borderColor: "black",
                boxShadow: "none",
                width: { lg: "48%", xs: "48%" },
                color: "black",
                marginTop: "32px",
                height: "48px",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                  borderColor: "black",
                  boxShadow: "none",
                },
              }}
            >
              Cancel
            </Button>{" "}
            <Button
              variant="outlined"
              sx={{
                borderRadius: "30px",
                borderColor: "black",
                boxShadow: "none",
                width: { lg: "50%", xs: "50%" },
                color: "black",
                marginTop: "32px",
                height: "48px",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                  borderColor: "black",
                  boxShadow: "none",
                },
              }}

              onClick={handleAddPackage}
            >
              Add
            </Button>
          </Box>
        </Modal>

        

        <Grid container justifyContent="center" alignItems="center">
          <Box
            sx={{
              width: { lg: "1100px", xs: "300px" },
            }}
          >
            <Typography
              fontSize={{ lg: "24px", xs: "22px" }}
              sx={{ color: "white" }}
              marginTop="32px"
            >
              Added Packages:
            </Typography>
          </Box>
          <> 
          {packages.map(packages => (
            <Box
              key={packages._id}
              border={3}
              sx={{
                width: { lg: "1100px", xs: "280px" },
                borderColor: "black",
                borderRadius: "30px",
                backgroundColor: "rgba(48, 103, 84, 0.5)",
                padding: "24px",
                marginTop: { lg: "16px", xs: "16px" },
              }}
            >
              <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <Box width={{ lg: "100%" }} height={{ lg: "100%" }}>
                    <Grid container spacing={2}>
                      {/*Image Array call*/}
                      <Grid container spacing={2} >
                      {/* Map through the images array of each location */}
                      {packages.images.map((image, index) => (
                     <Grid item key={index} xs={4} lg={2}>
                     <img
                     src={image}
                     width="100%"
                     height="100%"
                     style={{ borderRadius: "4px" }}
                     alt={`Image ${index + 1}`}
                    />
                  </Grid>
                ))}
              </Grid>
                       {/*Image Array end*/}
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={10}>
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "400",
                      fontSize: { lg: "24px", xs: "20px" },
                      textAlign: "left",
                    }}
                  >
                    Location :  {packages.location}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "400",
                      fontSize: { lg: "16px", xs: "16px" },
                      textAlign: "left",
                      marginTop: "8px",
                    }}
                  >
                    Package Name :  {packages.packageName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "400",
                      fontSize: { lg: "16px", xs: "16px" },
                      textAlign: "left",
                      marginTop: "8px",
                    }}
                  >
                    Pack  :  {packages.category}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "400",
                      fontSize: { lg: "16px", xs: "16px" },
                      textAlign: "left",
                      marginTop: "8px",
                    }}
                  >
                    Price  :  {packages.price}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "400",
                      fontSize: { lg: "16px", xs: "16px" },
                      textAlign: "left",
                      marginTop: "8px",
                    }}
                  >
                    Activities:  {packages.activities}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "400",
                      fontSize: { lg: "16px", xs: "16px" },
                      textAlign: "left",
                      marginTop: "8px",
                    }}
                  >
                    Description:  {packages.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "white",
                      borderColor: "white",
                      borderRadius: "30px",
                      marginTop: "16px",
                    }}
                    onClick = {() =>handleEditPackage(packages)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="outlined"
                    sx={{
                      color: "white",
                      borderColor: "white",
                      borderRadius: "30px",
                      marginTop: "16px",
                    }}
                    onClick = {() =>handleDeletePackage(packages._id)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Box>
             ))}
          </>
          {/*.map ends */}
        </Grid>
      </Box>
    </div>
  );
};

export default Addpackage;
