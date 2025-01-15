import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Grid, Box, CircularProgress, MenuItem, FormControl, InputLabel, Select, FormHelperText, Alert } from '@mui/material';


const provincesAndDistricts = {
    "Western Province": ["Colombo", "Gampaha", "Kalutara"],
    "Central Province": ["Kandy", "Matale", "Nuwara Eliya"],
    "Southern Province": ["Galle", "Matara", "Hambantota"],
    "Northern Province": ["Jaffna", "Mannar", "Vavuniya", "Kilinochchi", "Mullaitivu"],
    "Eastern Province": ["Batticaloa", "Ampara", "Trincomalee"],
    "North Western Province": ["Kurunegala", "Puttalam"],
    "North Central Province": ["Anuradhapura", "Polonnaruwa"],
    "Uva Province": ["Badulla", "Monaragala"],
    "Sabaragamuwa Province": ["Kegalle", "Ratnapura"],
  };

  const climateOptions = [
    "Tropical",
    "Dry",
    "Temperate",
    "Continental",
    "Polar",
    "Mediterranean",
    "Arid",
    "Humid Subtropical",
    "Oceanic",
  ];

const AddLocation = () => {
  // State for form data
  const [locationName, setLocationName] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [distanceFromColombo, setDistanceFromColombo] = useState('');
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [climate, setClimate] = useState('');
  const [map, setMap] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fade, setFade] = useState(false);

  // Cloudinary upload URL and preset
  const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/daa9e83as/image/upload";
  const CLOUDINARY_UPLOAD_PRESET = "ml_default";

    // Function to handle image upload to Cloudinary and convert to WebP
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
        try {
        setUploading(true);
        const { data } = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
        setUploading(false);
        return data.secure_url; // Return the URL of the uploaded image in WebP format
        } catch (error) {
        setUploading(false);
        setError('Error uploading image.');
        return null;
        }
    };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImages = await Promise.all(
      images.map((image) => uploadImage(image))
    );

    if (uploadedImages.includes(null)) {
      setError('One or more images failed to upload in this Location.');
      return;
    }

    const uploadedBackgroundImage = await uploadImage(backgroundImage);
    if (!uploadedBackgroundImage) {
      setError('Background image failed to upload.');
      return;
    }

    const locationData = {
      locationName,
      district,
      province,
      distanceFromColombo,
      images: uploadedImages,
      details,
      backgroundImage: uploadedBackgroundImage,
      climate,
      map,
    };

    try {
      const response = await axios.post('http://localhost:8000/location/add', locationData);
      setSuccess('Location added successfully!');
      setError('');
      // Reset form fields
      setLocationName('');
      setDistrict('');
      setProvince('');
      setDistanceFromColombo('');
      setImages([]);
      setDetails('');
      setBackgroundImage('');
      setClimate('');
      setMap('');
    } catch (err) {
      setError('Error adding location. Please try again.');
      setSuccess('');
    }
  };

  // Handle image input changes
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  // Handle background image change
  const handleBackgroundImageChange = (e) => {
    setBackgroundImage(e.target.files[0]);
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setDistrict(''); // Reset district when province is changed
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

    const handleDistanceChange = (e) => {
    const value = e.target.value;

    // Only allow numeric values and decimal points
    if (/^\d*\.?\d*$/.test(value)) {
      setDistanceFromColombo(value);
    }
  };

    useEffect(() => {
      if (success || error) {
        setFade(false); // Reset fade-in
        const fadeTimer = setTimeout(() => {
          setFade(true);  // Start fading
        }, 3000); // Start fade after 200ms
  
        const removeTimer = setTimeout(() => {
          setSuccess('');
          setError('');
        }, 3500); // Remove after fade out (0.5s)
  
        return () => {
          clearTimeout(fadeTimer);
          clearTimeout(removeTimer);
        };
      }
    }, [success, error]);


  return (
    <Box sx={{ padding: 3, maxWidth: 900, margin: '70px auto 0', backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Location
      </Typography>

      <>
            {success && (
              <Alert
                severity="success"
                style={{
                  marginBottom: '10px',
                  opacity: fade ? 0 : 1,
                  transition: 'opacity 0.3s ease-out',
                }}
              >
                {success}
              </Alert>
            )}
      
            {error && (
              <Alert
                severity="error"
                style={{
                  marginBottom: '10px',
                  opacity: fade ? 0 : 1,
                  transition: 'opacity 0.3s ease-out',
                }}
              >
                {error}
              </Alert>
            )}
          </>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Location Name */}
          <Grid item xs={12}>
            <TextField
              label="Location Name"
              fullWidth
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              required
            />
          </Grid>

        {/* Province */}
        <Grid item xs={12}>
            <FormControl fullWidth required error={error ? true : false}>
            <InputLabel>Province</InputLabel>
            <Select
                value={province}
                onChange={handleProvinceChange}
                label="Province"
            >
                {Object.keys(provincesAndDistricts).map((prov, index) => (
                <MenuItem key={index} value={prov}>
                    {prov}
                </MenuItem>
                ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        </Grid>

        {/* District */}
        <Grid item xs={12}>
            <FormControl fullWidth required error={error ? true : false}>
            <InputLabel>District</InputLabel>
            <Select
                value={district}
                onChange={handleDistrictChange}
                label="District"
                disabled={!province} // Disable the district dropdown if no province is selected
            >
                {province && provincesAndDistricts[province]?.map((dist, index) => (
                <MenuItem key={index} value={dist}>
                    {dist}
                </MenuItem>
                ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        </Grid>


        {/* Distance from Colombo */}
        <Grid item xs={12}>
            <TextField
                label="Distance from Colombo (KM)"
                fullWidth
                value={distanceFromColombo}
                onChange={handleDistanceChange}
                required
                inputProps={{
                    inputMode: 'decimal', // Allows numeric input with decimal point
                    pattern: '[0-9]+(\\.[0-9]*)?', // Allows integers and decimals
                }}
            />
        </Grid>

          {/* Images */}
          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Images (up to 6)
              <input
                type="file"
                hidden
                multiple
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </Button>
          </Grid>

          {/* Background Image */}
          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Background Image
              <input
                type="file"
                hidden
                onChange={handleBackgroundImageChange}
                accept="image/*"
                required
              />
            </Button>
          </Grid>

          {/* Details */}
          <Grid item xs={12}>
            <TextField
              label="Details"
              fullWidth
              multiline
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </Grid>

        {/* Climate Dropdown */}
        <Grid item xs={12}>
            <FormControl fullWidth required>
            <InputLabel>Climate</InputLabel>
            <Select
                value={climate}
                onChange={(e) => setClimate(e.target.value)}
                label="Climate"
            >
                {climateOptions.map((clim, index) => (
                <MenuItem key={index} value={clim}>
                    {clim}
                </MenuItem>
                ))}
            </Select>
            </FormControl>
        </Grid>

          {/* Map URL */}
          <Grid item xs={12}>
            <TextField
              label="Map URL"
              fullWidth
              value={map}
              onChange={(e) => setMap(e.target.value)}
              required
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={uploading}
              color="primary"
              sx={{ padding: '10px', fontSize: '16px' }}
            >
              {uploading ? <CircularProgress size={24} color="secondary" /> : 'Add Location'}
            </Button>
          </Grid>
        </Grid>
      </form>

              <>
            {success && (
              <Alert
                severity="success"
                style={{
                  marginBottom: '10px',
                  opacity: fade ? 0 : 1,
                  transition: 'opacity 0.3s ease-out',
                }}
              >
                {success}
              </Alert>
            )}
      
            {error && (
              <Alert
                severity="error"
                style={{
                  marginBottom: '10px',
                  opacity: fade ? 0 : 1,
                  transition: 'opacity 0.3s ease-out',
                }}
              >
                {error}
              </Alert>
            )}
          </>

    </Box>
  );
};

export default AddLocation;
