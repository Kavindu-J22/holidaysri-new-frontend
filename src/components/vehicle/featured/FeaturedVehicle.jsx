import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./featuredVehicle.css";
import { useRef } from "react";
import AOS from "aos";

const FeaturedVehicle = () => {
  AOS.init({ duration: 1000 });

  const [selectedCategory, setSelectedCategory] = useState("");

  // Function to set the selected category

  const handleExplore = (driverStatus) => {
    console.log("Explore clicked with driverStatus:", driverStatus);
    setSelectedCategory(driverStatus);
  };

  return (
    <div className="car-featured">
      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1488228044901-ba509ffe12a8?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>With Driver</h1>
          <h2>20 Vehicles</h2>
          <Link
            to="/all-vehicles-category?driverStatus=With%20Driver"
            onClick={() => handleExplore("With Driver")}
            className="vhexbtn"
          >
            Explore
          </Link>
        </div>
      </div>

      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1511527844068-006b95d162c2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Without Driver</h1>
          <h2>15 Vehicles</h2>
          <Link
            to="/all-vehicles-category?driverStatus=Without%20Driver"
            onClick={() => handleExplore("Without Driver")}
            className="vhexbtn"
          >
            Explore
          </Link>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1615764812975-751f90d0b867?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Airport Taxi</h1>
          <h2>05 Taxis</h2>
          <Link
            to="/all-vehicles-category?category=Airport%20Taxi"
            className="vhexbtn"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedVehicle;
