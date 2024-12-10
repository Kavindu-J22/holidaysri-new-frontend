import "./tourPackageFeatured.css";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TourPackageFeatured = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0, 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="tour-package-featured"
    >
      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?q=80&w=2456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>3 days tour package</h1>
        </div>
      </div>

      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1580910527739-556eb89f9d65?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>4 days tour package</h1>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1484712401471-05c7215830eb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>5 days tour package</h1>
        </div>
      </div>
    </motion.div>
  );
};

export default TourPackageFeatured;
