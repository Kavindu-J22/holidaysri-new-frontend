import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./featuredMarket.css";

const FeaturedMarket = () => {
  return (
    <div
      className="fp" 
    >
      <div className="fpItem">
        <img
          src="https://images.unsplash.com/photo-1562914657-1cfb9811f0f6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Wood card with design</span>
        <span className="fpCity">Hand craft</span>
        <span className="fpPrice">Starting from $120</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://images.unsplash.com/photo-1492105232359-ca132c09762c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Genuine leather items</span>
        <span className="fpCity">Hand craft</span>
        <span className="fpPrice">Starting from $50</span>
        <div className="fpRating">
          <button>9.3</button>
          <span>Exceptional</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://images.unsplash.com/photo-1565548058654-6ba93b5e3135?q=80&w=2176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Wool cloths</span>
        <span className="fpCity">Clothing</span>
        <span className="fpPrice">Starting from $99</span>
        <div className="fpRating">
          <button>8.8</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://images.unsplash.com/photo-1617825320616-c7a430ab1adc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Handmade necklace</span>
        <span className="fpCity">Hand craft</span>
        <span className="fpPrice">Starting from $10</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMarket;
