import { CircularProgress, Box, Typography } from '@mui/material';
import loader from "../../assets/loader.mp4";

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', // Center the video
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: { xs: '100%', sm: '80%', md: '700px' }, // Responsive width
          height: 'auto',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        >
          <source src={loader} type="video/mp4" />
        </video>
      </Box>

      <CircularProgress
        sx={{
          color: '#00ffd9', // Cyan color with green-blue mix
          animation: 'spin 1s linear infinite',
          zIndex: 1,
          filter: 'brightness(1.5) drop-shadow(0 0 6px #00e5ff)', // Brighten and add glow
        }}
      />
      <Typography
        variant="h6"
        sx={{
          mt: 2,
          color: '#fff',
          animation: 'fadeIn 1s infinite alternate',
          zIndex: 1,
        }}
      >
        HolidaySri Loading...
      </Typography>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          /* Adjust video size for mobile view */
          @media (max-width: 600px) {
            video {
              max-width: 100%;
              height: auto;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Loader;
