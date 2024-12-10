import React from "react";
import "./navbar.css";

const Navbar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <div className="navItems">
          <button
            onClick={() => scrollToSection("hotels")}
            className="navButton"
          >
            Hotels
          </button>
          <button
            onClick={() => scrollToSection("vehicles")}
            className="navButton"
          >
            Vehicles
          </button>
          <button
            onClick={() => scrollToSection("marketPlace")}
            className="navButton"
          >
            All Advertisements
          </button>
          <button
            onClick={() => scrollToSection("travelPartner")}
            className="navButton"
          >
            Travel Partner
          </button>
          <button
            onClick={() => scrollToSection("tourGuide")}
            className="navButton"
          >
            Tour Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
