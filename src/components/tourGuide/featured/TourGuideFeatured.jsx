import { motion, useScroll, useTransform } from "framer-motion";
import "./tourGuideFeatured.css";
import { useRef } from "react";

const TourGuideFeatured = () => {
  return (
    <div 
      className="tourguidefeatured"
    >
      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1639763703351-c27defbb51b1?q=80&w=2521&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Tourism board approved tour guides</h1>
          <h2>123 people</h2>
        </div>
      </div>
    </div>
  );
};

export default TourGuideFeatured;
