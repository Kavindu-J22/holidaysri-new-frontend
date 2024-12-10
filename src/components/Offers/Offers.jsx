import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./offers.css";
import { Button, TextField, Typography, Paper, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TextPage = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const id = "65f58296f707aa390b10db8a";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://holidaysri-backend-9xm4.onrender.com/rate/get/${id}`);
        setData(response.data.rate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://holidaysri-backend-9xm4.onrender.com/rate/updateRate/${id}`, data);
      alert('Record updated successfully!');
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='maintaxcont'>
      <Paper elevation={3} style={{ padding: '50px', borderRadius: '15px', maxWidth: '70%', margin: '20px auto', backgroundColor: '#e5e6f8f9' }}>
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#121f65",
            borderRadius: "30px",
            marginBottom: '20px'
          }}
          onClick={goBack}
        >
          Back
        </Button>

        <Typography variant="h4" component="h2" gutterBottom align="center" style={{ color: '#222',fontSize:'28px', fontWeight: 800, marginBottom: '30px' }}>🪙 RATES & DISCOUNTS 🪙</Typography>
        
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" component="h3" gutterBottom color="#333" fontSize="16px" fontWeight="600">MAIN CATEGORIES 💸</Typography>
            </Grid>


  {/* 01. Hotel Category
  Hotel Rate ( Hottel Price )
  Hotel Discount */}


            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555" fontSize="14px" fontWeight="600">🏩 Hotel Category :</Typography>
            </Grid>
            {[
              { label: 'Hotel Rate ( Hottel Price : LKR )', name: 'hotelAdvertiseRate' },
              { label: 'Hotel Discount : LKR', name: 'discounthotelPercentage' }
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}

{/* 02. Package Category
  Package Rate (Pckage Price)
  Package Discount
  Package Deduction Rate
  Package Earning Rate */}


        <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555" fontSize="14px" fontWeight="600">🏝️ Package Category :</Typography>
            </Grid>
            {[
              { label: 'Package Rate (Pckage Price : LKR)', name: 'packageAdvertiseRate' },
              { label: 'Package Discount : LKR', name: 'discountpackagePercentage' },
              { label: 'Package Deduction Rate', name: 'packageDeductRate' },
              { label: 'Package Earning Rate', name: 'packageEarnRate' }
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}

{/* 03. Products Category
  Products Rate( Product Price)
  Products Discount */}

      <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555" fontSize="14px" fontWeight="600">📦 Products Category :</Typography>
            </Grid>
            {[
              { label: 'Products Rate( Product Price : LKR )', name: 'productsAdvertiseRate' },
              { label: 'Products Discount : LKR ', name: 'discountProductsPercentage' }
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}

{/* 04. Vehicle Category
  Vehicle Rate (Vehicle Price)
  Vehicle Discount */}

        <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555" fontSize="14px" fontWeight="600">🚘 Vehicle Category :</Typography>
            </Grid>
            {[
              { label: 'Vehicle Rate (Vehicle Price : LKR )', name: 'vehicleAdvertiseRate' },
              { label: 'Vehicle Discount : LKR', name: 'discountvehiclePercentage' }
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}

{/* 05. Agent Category
  Agent Rate (Agent Price : Not In Use )
  Agent Discount */}

      <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555" fontSize="14px" fontWeight="600">🤵‍♂️ Agent Category :</Typography>
            </Grid>
            {[
              { label: 'Agent Rate (Agent Price : Not In Use )', name: 'agentAdvertiseRate' },
              { label: 'Agent Discount', name: 'discountagentPercentage' }
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}

{/* 06. Guide Category
  Guide Rate ( Guider Registration Fee )
  Guide Discount */}

        <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555" fontSize="14px" fontWeight="600">🧑‍✈️ Guide Category :</Typography>
            </Grid>
            {[
             { label: 'Guide Rate ( Guider Registration Fee : LKR )', name: 'guideAdvertiseRate' },
             { label: 'Guide Discount : LKR ', name: 'discountguidePercentage' }
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}

{/* 07. Event Category
  Event Rate (Price : LKR)
  Event Discount */}

      <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555" fontSize="14px" fontWeight="600">🎊  Event Category :</Typography>

            </Grid>
            {[
              { label: 'Event Rate ( Event Price : LKR )', name: 'eventRate' },
              { label: 'Event Discount : LKR', name: 'discountEventPercentage' }
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}

{/* 08. Partner Category
  Local Partner Registration Rate ( Price : LKR )
  Local Partner Discount
  Partner Local Earn Rate
  Foreign Partner Registration Rate ( Price : USD)
  Foreign Partner Discount
  Partner Foreign Earn Rate */}

        <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555" fontSize="14px" fontWeight="600">👥   Partner Category :</Typography>

        </Grid>
        <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555">🏴 Local Partners :</Typography>
        </Grid>
            {[
              { label: 'Local Partner Registration Rate ( Price : LKR )', name: 'partnerLocalRate' },
              { label: 'Local Partner Discount : LKR ', name: 'discountLocalPartnerPercentage' },
              { label: 'Local Partner Earn Rate : LKR ', name: 'partnerLocalEarnRate' }  
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}

        <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555">🏳️ Foreign Partners :</Typography>

        </Grid>
        {[
              { label: 'Foreign Partner Registration Rate ( Price : USD )', name: 'partnerForeignRate' },
              { label: 'Foreign Partner Discount : USD', name: 'discountForeignPartnerPercentage' },
              { label: 'Foreign Partner Earn Rate : USD', name: 'partnerForeignEarnRate' }
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}
{/* 09. Promo Code Category
  Promo Code Local Rate ( Price : LKR )
  Promo Code Local Discount
  Promo Code Local Earn Rate ( Price : LKR )
    Promo Code Foreign Rate (Price :  USD )
  Promo Code Foreign Discount
  Promo Code Foreign Earn Rate (Price :  USD  */}

      <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555" fontSize="14px" fontWeight="600">💵  Promo Code Category :</Typography>

      </Grid>
      <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555">🎟️ Local Promo Codes  :</Typography>

      </Grid>
            {[
             { label: 'Promo Code Local Agent Rate ( Price : LKR )', name: 'promoCodeLocalRate' },
             { label: 'Promo Code Local Agent Discount : LKR', name: 'discountPromoCodeLocalPercentage' },
             { label: 'Promo Code Local Agent Earn Rate : LKR', name: 'promoCodeLocalEarnRate' }
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}

      <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555">🎫  Foreign Promo Codes  :</Typography>

      </Grid>
      {[
             { label: 'Promo Code  Foreign Agent Rate ( Price : USD )', name: 'promoCodeForeignRate' },
             { label: 'Promo Code Foreign  Agent Discount : USD', name: 'discountPromoCodeForeignPercentage' },
             { label: 'Promo Code Foreign  Agent Earn Rate : USD', name: 'promoCodeForeignEarnRate' }

            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}

{/* 10. Live Ride Category
  Live Ride Monthly Rate ( Price : LKR )
  Live Ride Daily Rate ( Price : LKR )
  Live Ride Discount 
  */}

      <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555" fontSize="14px" fontWeight="600">🛺 Live Ride Category :</Typography>
            </Grid>
            {[
              { label: 'Live Ride Daily Rate  ( Price : LKR )', name: 'liveRideDailyRate' },
              { label: 'Live Ride Monthly Rate ( Price : LKR )', name: 'liveRideMonthlyRate' },
              { label: 'Live Ride Discount : LKR', name: 'discountLiveRidePercentage' },
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}

{/* 11. Food Category
  Daily Food Rate (Price : LKR)
  Monthly Food Rate (Price : LKR)
  
  */}

<Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555" fontSize="14px" fontWeight="600">🍱 Food Category :</Typography>
            </Grid>
            {[
              { label: 'Daily Food Rate (Price : LKR)', name: 'dailyFoodRate' },
              { label: 'Monthly Food Rate (Price : LKR)', name: 'monthlyFoodRate' }
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}


          <Grid item xs={12}>
              <Typography variant="h6" component="h3" gutterBottom color="#333" fontSize="16px" fontWeight="600">SPECIAL CATEGORIES 💡</Typography>
          </Grid>


{/* 12. Main Time Based Discount Rates
  Daily Payment Discount ( Live Ride Daily Ect : )
  Monthly Payment Discount ( Live ride Motnthly Ect: ) */}

        <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555" fontSize="14px" fontWeight="600">🗓️  Main Time Based Discount Rates :</Typography>

            </Grid>
            {[
              { label: 'Daily Payment Discount ( For Live Ride Daily and Daily Food : LKR )', name: 'discountDailyPercentage' },
              { label: 'Monthly Payment Discount ( For Live ride Monthly and Monthly Food : LKR )', name: 'discountMonthlyPercentage' }
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}



{/* 13. Main Time Based Earn Rates
  Daily Earning Rate 
  Monthly Earning Rate
  */}

<Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555" fontSize="14px" fontWeight="600">💰   Main Time Based Earn Rates :</Typography>

            </Grid>
            {[
              { label: 'Daily Earning Rate ( For Live Ride Daily and Daily Food : LKR )', name: 'dailyEarnRate' },
              { label: 'Monthly Earning Rate ( For Live ride Monthly and Monthly Food : LKR )', name: 'monthlyEarnRate' }
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}


{/* 14. Main Earning Rate
Earning Rate (Price : LKR )            */}

<Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="#555" fontSize="14px" fontWeight="600">Main Earning Rate</Typography>
            </Grid>
            {[
              { label: 'Earning Rate ( Hotels, Vehicles and Ect Main Earning Amount : LKR ', name: 'earningRate' }
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  value={data[field.name] || ''}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                  InputProps={{ style: { color: '#333' } }}
                />
              </Grid>
            ))}



            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                sx={{ borderRadius: '30px', margin: '20px', backgroundColor: "#121f65", }}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default TextPage;
