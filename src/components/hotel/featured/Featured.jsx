import React, { useState, useEffect, useRef } from "react";
import "./featured.css";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const Featured = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0, 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const navigate = useNavigate();
  const intervalRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState([]);

  const destination = () => {
    navigate("/destinations");
  };

  const items = [
    {
      name: "Kandy",
      properties: "123 properties",
      images: [
        "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/134507231.jpg?k=1dd610782f0156abeebe99d65e1271328345b3d3d4c7b9828641fde1df129db9&o=",
        "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/134507165.jpg?k=3929bed3b95bd10e4cf3849f7ac5ea2b7ccc91ec2c6793fe2fd8705fc116ca0e&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/134507217.jpg?k=069affb865047dea38291b9cceb8b7627bce0e0b8716843a751cb336ed8a38d8&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/134507245.jpg?k=1de548c58eccfafbdb38e3d0a68f0edb526523e6e76d0c6091d7680440c97ea2&o=",
      ],
    },
    {
      name: "Galle",
      properties: "256 properties",
      images: [
        "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/130155704.jpg?k=a333eed9ec73bdae0b91802760515b5105e315c94fad42e7215be2a800b6f6b7&o=",
        "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/131511292.jpg?k=be7319dac06267ef647bd4e5d87fdf1c62a3ea2311a8b811d1d32904cb1103a3&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/294635242.jpg?k=5300b22b1bb5e0e70aab2d06e9d74de142a0f9d6bf85a7fb7a9d4f841c457cf0&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/134339241.jpg?k=7d0a55898562f3bb3b209919c2ca04c2fada741602b0a69e0862fd569cbf99fa&o=",
      ],
    },
    {
      name: "Colombo",
      properties: "512 properties",
      images: [
        "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/184253281.jpg?k=f2cd29e84ca1365904c740eb59bf28d1bc6c5760f8c09e7d5ecb1cfa2bbf62c9&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/184253287.jpg?k=d5729a501ada2e4f03b24fd56459fdf4a3422ea71e7e350f50cdda46c22a5d1c&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/184253290.jpg?k=f128e4211be842d53f68da6472f1bd4973b27a0dbd2e6ed85bbed8efc246d67f&o=",
        "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/184253291.jpg?k=1bb4afb4231fc6294c111b9109da82083062c625ca814b72c3efdd46396f3186&o=",
      ],
    },
  ];

  useEffect(() => {
    setCurrentImageIndex(new Array(items.length).fill(0));
    intervalRefs.current = new Array(items.length).fill(null);
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    intervalRefs.current[index] = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const updated = [...prev];
        updated[index] = (updated[index] + 1) % items[index].images.length;
        return updated;
      });
    }, 500);
  };

  const handleMouseLeave = (index) => {
    setHoveredIndex(null);
    clearInterval(intervalRefs.current[index]);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="featured"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="featuredItem"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          onClick={destination}
        >
          <img
            src={item.images[currentImageIndex[index]]}
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>{item.name}</h1>
            <h2>{item.properties}</h2>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default Featured;
