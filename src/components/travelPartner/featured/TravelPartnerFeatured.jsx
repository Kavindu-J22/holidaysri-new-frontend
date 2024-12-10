import { motion, useScroll, useTransform } from "framer-motion";
import "./travelpartnerfeatured.css";
import { useRef } from "react";

const TravelPartnerFeatured = () => {

  return (
    <div
      
      className="travelpartnerfeatured"
    >
      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=2615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Locals</h1>
          <h2>123 people</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1484712401471-05c7215830eb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Foreigners</h1>
          <h2>13 people</h2>
        </div>
      </div>
    </div>
  );
};

export default TravelPartnerFeatured;
