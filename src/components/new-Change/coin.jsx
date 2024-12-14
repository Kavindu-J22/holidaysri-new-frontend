import React from 'react';
import { Box, Grid, Typography, Button, keyframes } from '@mui/material';

const coins = [
  { id: 1, image: 'https://res.cloudinary.com/dqdcmluxj/image/upload/v1734136263/coin1_ssk005.webp', price: '100 HSC - 300 LKR' },
  { id: 2, image: 'https://res.cloudinary.com/dqdcmluxj/image/upload/v1734136263/coin2_vmzijp.webp', price: '1000 HSC - 2900 LKR' },
  { id: 3, image: 'https://res.cloudinary.com/dqdcmluxj/image/upload/v1734136264/coin3_yygpt0.webp', price: '5000 HSC - 14,500 LKR' },
  { id: 4, image: 'https://res.cloudinary.com/dqdcmluxj/image/upload/v1734136263/coin4_r4bth7.webp', price: '10,000 HSC - 27,500 LKR' },
  { id: 5, image: 'https://res.cloudinary.com/dqdcmluxj/image/upload/v1734136263/coin5_siypyg.webp', price: '25,000 HSC - 70,000 LKR' },
];

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const CoinsPage = () => {
  return (
    <Box
      sx={{
        padding: 4,
        paddingRight: '20px',
        paddingLeft: '20px',
        paddingBottom: '65px',
        marginRight: '10px',
        marginLeft: '10px',
        marginBottom: '5px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '10px',
        marginTop: '70px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 2,
          animation: `${floatAnimation} 3s ease-in-out infinite`,
        }}
      >
        <img
          src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1734136783/hsc_resll6.webp"
          alt="Logo"
          style={{ width: '120px', height: '120px' }}
        />
      </Box>
      <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Cursive, sans-serif', // Example: Use a stylish font
            color: 'gold',
            textShadow: '2px 2px 5px rgba(255, 255, 255, 0.6)',
            fontWeight: 'bold',
          }}
        >
          HolidaySri Coin Collection
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1rem',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Discover our exclusive HolidaySri Coin Collection. These coins are not only a fantastic way to save but also to earn rewards with every purchase. You can purchase coins at different tiers, each with its unique benefits. Choose your package and start earning today!
        </Typography>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {coins.slice(0, 4).map((coin) => (
          <Grid
            item
            xs={12} sm={6} md={3}
            key={coin.id}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Box
              sx={{
                textAlign: 'center',
                padding: 3,
                border: '2px solid #ddd',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                marginBottom: '15px',
                width: '100%',
                maxWidth: 275,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.8)',
                },
              }}
            >
              <img
                src={coin.image}
                alt={`Coin ${coin.id}`}
                style={{ width: '100%', height: 'auto', marginBottom: 8, borderRadius: '10px' }}
              />
              <Typography
                variant="h6"
                sx={{ color: 'white', textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)', fontWeight: '600' }}
              >
                {coin.price}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  marginTop: 2,
                  backgroundColor: '#FFB74D',
                  color: '#fff',
                  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)',
                  '&:hover': {
                    backgroundColor: '#FF9800',
                  },
                  borderRadius: '8px',
                  padding: '8px 20px',
                  fontWeight: 'bold',
                }}
              >
                Purchase Now
              </Button>
            </Box>
          </Grid>
        ))}
        {/* Larger Last Box */}
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              padding: 4,
              border: '3px solid #ddd',
              borderRadius: '20px',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.8)',
              backgroundColor: 'rgba(248, 221, 162, 0.2)',
              width: '100%',
              maxWidth: 270,
              transform: 'scale(1.2)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.25)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 1)',
              },
            }}
          >
            <img
              src={coins[4].image}
              alt={`Coin ${coins[4].id}`}
              style={{ width: '100%', height: 'auto', marginBottom: 8, borderRadius: '15px' }}
            />
            <Typography
              variant="h6"
              sx={{ color: 'white', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)', fontWeight:'600' }}
            >
              {coins[4].price}
            </Typography>
            <Button
              variant="contained"
              sx={{
                marginTop: 2,
                backgroundColor: '#FFB74D',
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#FF9800',
                },
                borderRadius: '8px',
                padding: '8px 20px',
                fontWeight: 'bold',
              }}
            >
              Purchase Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CoinsPage;
