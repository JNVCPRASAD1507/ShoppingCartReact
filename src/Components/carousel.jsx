import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"

import {Data}  from "../Products/Cards";

const Carousel = () => {
    const [slides, setSlides] = useState([]);
    const sliderRef = useRef(null); // Reference to the Slider component
    const [autoplay, setAutoplay] = useState(true); // State for autoplay toggle
  
    useEffect(() => {
      // Check if data is already in localStorage
      const storedSlides = localStorage.getItem("slides");
      if (storedSlides) {
        setSlides(JSON.parse(storedSlides));
      } else {
        localStorage.setItem("slides", JSON.stringify(Data));
        setSlides(Data);
      }
    }, []);
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: autoplay,
      autoplaySpeed: 2000,
    };

  return (
    <>
    <div className="section">
    <div className="carousel-container">
      <Slider {...settings} ref={sliderRef}>
        {slides.map((slide) => (
          <div key={slide._id} style={{height:'90%'}}>
            <img
              src={slide.MblImg}
              alt={slide.name}
              style={{
                width: "100%", // Fixed width
                height: "500px", // Fixed height
                objectFit: "fill", // Maintain aspect ratio while covering the space
              }}
            />
            {/* Uncomment to show additional details */}
            {/* <h3>{slide.name}</h3>
            <p>{slide.category}</p> */}
          </div>
        ))}
      </Slider>
    </div>
  </div>

   
    </>
  );
};

export default Carousel;
