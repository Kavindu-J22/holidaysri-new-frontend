import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const PasswordResetSent = () => {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100vh',
                textAlign: 'center',
                padding: '20px',
                backgroundImage:
                'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733336447/pexels-photo-1072179_frjk63_js026i.webp")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                paddingLeft: { lg: "0px", xs: "16px" },
                paddingBottom: "24px",
            }}
        >
            <Typography 
                variant="h4" 
                sx={{ marginBottom: '20px', fontWeight: 'bold', color: '#c5bfbf' }}
            >
                Password Reset Email Sent
            </Typography>
            <Typography 
                variant="body1" 
                sx={{ marginBottom: '20px', color: '#c5bfbf' }}
            >
                Please check your email or spam box for the password reset link.
            </Typography>
            <a className='btol' 
                variant="contained" 
                color="primary" 
                component={Link} 
                href="/login" 
                sx={{ marginTop: '20px' }}
            >
                Back to Login
            </a>
        </Box>
    );
};

export default PasswordResetSent;
