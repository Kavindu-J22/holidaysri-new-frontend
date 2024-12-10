import { motion, useScroll, useTransform } from "framer-motion";
import "./vehicleList.css";
import { useRef } from "react";
import AOS from 'aos';

const VehicleList = () => {
  AOS.init({ duration: 1000 });
  return (
    <div
      className="vehicleList" 
    >
      <div className="pListItem">
        <img
          src="https://images.unsplash.com/photo-1610587144035-4ce2cefe4051?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>SUV</h1>
          <h2>233 suvs</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://images.unsplash.com/photo-1504648942819-979a70e29d29?q=80&w=2643&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Off road</h1>
          <h2>2331 off road vehicles</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://images.unsplash.com/photo-1603109108961-621f59ad567e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Camp van</h1>
          <h2>13 camp vans</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://images.unsplash.com/photo-1571986929789-95307bbfa7c2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Pick up truck</h1>
          <h2>2331 pick up trucks</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://images.unsplash.com/photo-1658662160331-62f7e52e63de?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Sedan</h1>
          <h2>2331 sedans</h2>
        </div>
      </div>
    </div>
  );
};

export default VehicleList;
