import React, { useState, useEffect } from 'react';

function Slideshow({ images, packages }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images, packages]);


  return (
    <div>
      {images.map((image, index) => (
        <figure
          key={index}
          style={{ display: index === currentSlide ? 'block' : 'none' }}
          className="card-banner"
        >
          
          <img src={image} alt={`Image ${index}`} loading="lazy" />
        </figure>
      ))}
    </div>
  );
}

export default Slideshow;
