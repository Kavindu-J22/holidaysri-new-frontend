import React from 'react';
import { Box, Grid, Typography, keyframes } from '@mui/material';

const coins = [
  { id: 1, image: 'https://res.cloudinary.com/dqdcmluxj/image/upload/v1734136263/coin1_ssk005.webp', price: '$100' },
  { id: 2, image: 'https://res.cloudinary.com/dqdcmluxj/image/upload/v1734136263/coin2_vmzijp.webp', price: '$200' },
  { id: 3, image: 'https://res.cloudinary.com/dqdcmluxj/image/upload/v1734136264/coin3_yygpt0.webp', price: '$300' },
  { id: 4, image: 'https://res.cloudinary.com/dqdcmluxj/image/upload/v1734136263/coin4_r4bth7.webp', price: '$400' },
  { id: 5, image: 'https://res.cloudinary.com/dqdcmluxj/image/upload/v1734136263/coin5_siypyg.webp', price: '$500' },
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
        paddingRight: '5px',
        paddingLeft: '5px',
        paddingBottom: '45px',
        marginRight: '10px',
        marginLeft: '10px',
        marginBottom: '10px',
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
            color: 'white',
            textShadow: '2px 2px 5px rgba(255, 255, 255, 0.6)',
          }}
        >
          Coins Collection
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1rem',
          }}
        >
          Explore our exclusive coins collection and choose your favorite one.
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
                border: '1px solid #ddd',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                width: '100%',
                maxWidth: 250,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <img
                src={coin.image}
                alt={`Coin ${coin.id}`}
                style={{ width: '100%', height: 'auto', marginBottom: 8, borderRadius: '5px' }}
              />
              <Typography
                variant="h6"
                sx={{ color: 'white', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)' }}
              >
                {coin.price}
              </Typography>
            </Box>
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              padding: 4,
              border: '2px solid #ddd',
              borderRadius: '15px',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.6)',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              width: '100%',
              maxWidth: 300,
              transform: 'scale(1.1)',
            }}
          >
            <img
              src={coins[4].image}
              alt={`Coin ${coins[4].id}`}
              style={{ width: '100%', height: 'auto', marginBottom: 8, borderRadius: '10px' }}
            />
            <Typography
              variant="h5"
              sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
            >
              {coins[4].price}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CoinsPage;
