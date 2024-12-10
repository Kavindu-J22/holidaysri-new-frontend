import React from 'react';
import { useNavigate } from "react-router-dom";
import './Button.scss'; 

function Button() {

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    };
    return (
        <button className="bttn" onClick={navigateToHome}>Back to homepage</button>
    );
}

export default Button;