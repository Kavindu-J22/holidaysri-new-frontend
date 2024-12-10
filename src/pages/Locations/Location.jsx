import React, { useState, useEffect} from "react";
import { Box, Button, Typography, Modal, Grid } from "@mui/material";
import Customtextfield from "../../components/hotel/Login/Customtextfield";
import axios from "axios"; 
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 580, xs: 280 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
};
const Location = (props) => {
  const [openlocation, setOpenlocation] = React.useState(false);
  const [editingLocation, setEditingLocation] = useState("");
  const [editingEvent, setEditingEvent] = useState("");
  const handleOpenlocation = () => setOpenlocation(true);
  const handleCloselocation = () => setOpenlocation(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false);
    window.location.reload();
  }
  const [images, setImages] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [distanceFromColombo, setDistanceFromColombo] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState([]);
  const [eventLocation, setEventLocation] = useState("");
  const [eventName,setEventName] = useState("");
  const [description,setDescription] = useState("");
  const [event,setEvent] = useState([]);
 
  
  const handleFileChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    // Handle the selected images, you may want to upload them or perform other actions
    setImages(selectedImages);
  };


  
  const handleAddLocation = async(e) => { 
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
  
    const newLocation = {
      locationName,
      district,
      province,
      distanceFromColombo,
      details,
      images: uploadedImageUrls,
    };
  
    if (editingLocation) {
      // If editing location exists, update the existing location
      axios
        .put(
          `https://holidaysri-backend-9xm4.onrender.com/location/updateLocation/${editingLocation._id}`,
          newLocation
        )
        .then(() => {
          alert("The Location was Successfully updated");
          window.location.reload(); // Reload the page after update
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      // Otherwise, add a new location
      axios
        .post("https://holidaysri-backend-9xm4.onrender.com/location/add", newLocation)
        .then(() => {
          alert("The New Location was Successfully saved");
          window.location = `/location`;
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  const handleEditlocation = (location) => {
    // Set editingLocation state and populate the input fields with existing details
    setEditingLocation(location);
    setLocationName(location.locationName);
    setDistrict(location.district);
    setProvince(location.province);
    setDistanceFromColombo(location.distanceFromColombo);
    setDetails(location.details);
    setOpenlocation(true); // Open the modal for editing
  };
  
  

  useEffect(() => {
    async function getAllLocations() {
        try {
            const res = await axios.get("https://holidaysri-backend-9xm4.onrender.com/location/");
            setLocation(res.data);
        } catch (error) {
            console.error("Error fetching Locations:", error);
            alert("Error fetching Locations: " + error.message);
        }
    }
    getAllLocations();
}, []);



function handleDeleteLocation(id){

  const r = window.confirm ("Do you really want to Delete this Location?"); 
  if(r ==true){
      axios.delete(`https://holidaysri-backend-9xm4.onrender.com/location/delete/${id}`).then ((res)=>{
          alert("Delete Successfully");
          window.location = `/location`;
          setLocation()
      })
  }
}




const handleEditEvent = (event) => {
  // Set editingEvent state and populate the input fields with existing details
  setEditingEvent(event);
  setEventName(event.eventName);
  setEventLocation(event.eventLocation);
  setDescription(event.description);
  setOpen(true); // Open the modal for editing
};

const handleAddEvent = async(e) => {
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

  const newEvent = {
    eventName,
    eventLocation,
    description,
    images: uploadedImageUrls,
  };

  if (editingEvent) {
    // If editing event exists, update the existing event
    axios
      .put(
        `https://holidaysri-backend-9xm4.onrender.com/event/updateEvent/${editingEvent._id}`,
        newEvent
      )
      .then(() => {
        alert("The Event was Successfully updated");
        window.location = `/location`; // Redirect to location page after update
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    // Otherwise, add a new event
    axios
      .post("https://holidaysri-backend-9xm4.onrender.com/event/add", newEvent)
      .then(() => {
        alert("The New Event was Successfully saved");
        window.location = `/location`; // Redirect to location page after adding
      })
      .catch((err) => {
        alert(err);
      });
  }
};


useEffect(() => {
  async function getAllEvents() {
      try {
          const res = await axios.get("https://holidaysri-backend-9xm4.onrender.com/event/");
          setEvent(res.data);
      } catch (error) {
          console.error("Error fetching Events:", error);
          alert("Error fetching Events: " + error.message);
      }
  }
  getAllEvents();
}, []);



function handleDeleteEvent(id){

const r = window.confirm ("Do you really want to Delete this Event?"); 
if(r ==true){
    axios.delete(`https://holidaysri-backend-9xm4.onrender.com/event/delete/${id}`).then ((res)=>{
        alert("Delete Successfully");
        window.location = `/location`;
        setEvent()
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
            Add Location or Event
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
              onClick={handleOpenlocation}
            >
              ADD LOCATION
            </Button>{" "}
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
              ADD EVENt
            </Button>
          </Box>
        </Grid>

        <Modal
          open={openlocation}
          onClose={handleCloselocation}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
           
            <Customtextfield label="Location name" value={locationName} onChange={(e) => setLocationName(e.target.value)} marginTop="8px" />
            <Customtextfield label="District" value={district} onChange={(e) => setDistrict(e.target.value)} marginTop="8px" />
            <Customtextfield label="Province" value={province} onChange={(e) => setProvince(e.target.value)} marginTop="8px" />
            <Customtextfield label="Distance from Colombo" value={distanceFromColombo} onChange={(e) => setDistanceFromColombo(e.target.value)}  marginTop="8px" />
            
            <div>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="uploadImageInput"
                onChange={handleFileChange}
                multiple // Allow multiple file selection
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
                  Upload images
                </Button>
              </label>

              {/* Display selected images (if needed) */}
              <div>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded ${index}`}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      margin: "5px",
                    }}
                  />
                ))}
              </div>
            </div> 
            <Customtextfield label="Details" value={details} onChange={(e) => setDetails(e.target.value)} />
            <Button
              variant="outlined"
              onClick={handleCloselocation}
              sx={{
                borderRadius: "30px",
                borderColor: "black",
                boxShadow: "none",
                width: { lg: "48%", xs: "38%" },
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
              onClick={handleAddLocation}
            >
              Add 
            </Button>
          </Box>
        </Modal>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
        
            <Customtextfield label="Location name" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)}  marginTop="8px" />
            <Customtextfield label="Event name"  value={eventName} onChange={(e) => setEventName(e.target.value)}  marginTop="8px" />
            <div>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="uploadImageInput"
                onChange={handleFileChange}
                multiple // Allow multiple file selection
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

              {/* Display selected images (if needed) */}
              <div>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded ${index}`}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      margin: "5px",
                    }}
                  />
                ))}
              </div>
            </div>
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

              onClick={handleAddEvent}
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
              marginTop="16px"
            >
              Locations:
            </Typography>
          </Box>
          {/*.map start */}
          <>
          {location.map(location => (
            <Box
              key={location._id}
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
                      <Grid container>
                      {/* Map through the images array of each location */}
                      {location.images.map((image, index) => (
                     <Grid item key={index} xs={4} lg={2}>
                                              <Box sx={{ width: { lg: '150px',xs:'70px' }, height: { lg: '150px',xs:'70px' },marginTop:'6px',marginLeft:{lg:'10px',xs:'10px'} }}>
                                              <img
                     src={image}
                     style={{ width: "100%", height: "100%" }}

                     alt={`Image ${index + 1}`}
                    />
                                              </Box>

                    
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
                      Location Name: {location.locationName}
                  
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
                    District: {location.district}
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
                    Province: {location.province}
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
                    Distace from Colombo: {location.distanceFromColombo}
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
                    Description  {location.details}
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "white",
                      borderColor: "white",
                      borderRadius: "30px",
                      marginTop: "16px",
                    }}
                   
                    onClick = {() =>handleEditlocation(location)}
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
                    onClick = {() =>handleDeleteLocation(location._id)}
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
              Events:
            </Typography>
          </Box>
          {/*.map start */}
          <> 
          {event.map(event => (
            <Box
              key={event._id}
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
                      {event.images.map((image, index) => (
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
                    Location Name:  {event.eventLocation}
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
                    Event Name :  {event.eventName}
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
                    Description:  {event.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "white",
                      borderColor: "white",
                      borderRadius: "30px",
                      marginTop: "16px",
                    }}
                    onClick = {() =>handleEditEvent(event)}
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
                    onClick = {() =>handleDeleteEvent(event._id)}
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

export default Location;
