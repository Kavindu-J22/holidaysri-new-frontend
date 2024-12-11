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
        background: `url('https://res.cloudinary.com/dqdcmluxj/image/upload/v1733950122/lodback_rehp6e.webp') no-repeat center center`, // Replace with your image URL
        backgroundSize: 'cover', // Ensures the image covers the entire background
        textAlign: 'center',
        position: 'relative',
      }}
    >

      {/* Logo Behind the GIF */}
      <img
        src={logo}
        alt="Logo"
        style={{
          position: 'absolute',
          width: '220px',
          height: '220px',
          marginBottom: '115px',
          opacity: 0.4,
          zIndex: 1, // Place logo behind the GIF
          animation: 'fadeInlogo 0.8s ease-in-out infinite alternate',
        }}
      />

      {/* Lottie Animation with Border Radius */}
      <div
        style={{
          borderRadius: '100px',
          overflow: 'hidden', // Ensures border-radius applies to the GIF
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for a modern look
          position: 'relative',
          opacity: 0.7, // Slight transparency for the logo
          zIndex: 2, // Place GIF above the logo
        }}
      >
        <Lottie animationData={animationData} loop style={{ width: 300, height: 300 }} />
      </div>

      {/* Text Below the GIF */}
      <h1
        style={{
          marginTop: '50px',
          fontSize: '24px',
          color: '#333',
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
          width: '50px',
          height: '50px',
          border: '5px solid #ddd',
          borderTop: '5px solid #4CAF50', // Customizable color for the circular loader
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite', // Animation for spinning
          position: 'relative',
          zIndex: 2, // Place loader above the logo
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
