import { motion, useScroll, useTransform } from "framer-motion";
import "./featuredmarketplace.css";
import { useRef } from "react";

const FeaturedMarketPlace = () => {

  return (
    <div
      className="gift-featured" 
    >
      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1592903297149-37fb25202dfa?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Gifts</h1>
          <h2>123 gifts</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Souvenirs</h1>
          <h2>454 souvenirs</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1624365167573-80c5d1b7681f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Collectibles</h1>
          <h2>532 collectibles</h2>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMarketPlace;
