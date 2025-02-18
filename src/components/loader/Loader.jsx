import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/Animation -.json'; // Adjust path as needed
import logo from '../../assets/BlackLogo.png'; // Import your logo image (adjust path as needed)

const Loafer = () => {
  return (
<div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'black', // Replace with your image URL
        backgroundSize: 'cover', // Ensures the image covers the entire background
        textAlign: 'center',
        position: 'relative',
      }}
    >

      {/* Logo Behind the GIF */}
      <img
        src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1738033679/clideo_editor_d5e6636056944e7f9dbf6bc6d9acae0d-ezgif.com-crop_1_p7heeg.gif"
        alt="Logo"
        style={{  
          width: '250px',
          height: 'auto',
          marginBottom: '5px',
        }}
      />


      {/* Text Below the GIF */}
      <h1
        style={{
          marginTop: '10px',
          marginBottom: '10px',
          fontSize: '22px',
          color: '#444',
          fontFamily: "'Roboto', sans-serif", // Modern font
          animation: 'fadeIn 1s ease-in-out infinite alternate', // Simple animation
          position: 'relative',
          zIndex: 2, // Place text above the logo
        }}
      >
        Holidaysri Loading...
      </h1>

      {/* Circular Loader Below the Text */}
      <div
      style={{
        marginTop: '15px',
        width: '40px', // Slightly increased size for better visibility
        height: '40px',
        border: '4px solid #ddd',
        borderTop: '4px solid rgb(83, 180, 245)', // Main color for the spinner
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite', // Spinning animation
        position: 'relative',
        zIndex: 2, // Place above other elements
        boxShadow: '0 0 20px rgb(164, 201, 250)', // "Glove" glow effect
        background: 'linear-gradient(45deg, rgba(15, 83, 172, 0.1), rgba(255, 255, 255, 0.1))', // Subtle inner glow
      }}
    ></div>


      {/* Keyframes for Animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes fadeIn {
            0% { opacity: 0.1; }
            100% { opacity: 1; }
          }

          @keyframes fadeInlogo {
            0% { opacity: 0.1; }
            100% { opacity: 0.4; }
          }
        `}
      </style>
    </div>
  );
};

export default Loafer;
