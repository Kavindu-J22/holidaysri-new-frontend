import React from 'react';
import './NotFound.scss'; 
import img1 from '../../assets/Scarecrow.png'
import Button from "./Button";

const NotFound = () => {

  return (
    <div className="display">
      <div className="display__img">
        <img src={img1} alt="404-Scarecrow" />
      </div>
      <div className="display__content">
        <h2 className="display__content--info">404 PAGE NOT FOUND</h2>
        <p className="display__content--text">
          The page you are looking for might be removed or is temporarily
          unavailable
        </p>
        <Button className="btn">Back to homepage</Button>
      </div>
    </div>
  );
};

export default NotFound;
