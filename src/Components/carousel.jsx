import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Data } from "../Products/Cards";
import { Box, Grid } from "@mui/material";

const Carousel = () => {
  const [slides, setSlides] = useState([]);
  const sliderRef = useRef(null);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
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
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 768, // tablets
        settings: {
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 480, // phones
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 3, md: 5 } }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={12}>
          <Slider {...settings} ref={sliderRef}>
            {slides.map((slide) => (
              <Box
                key={slide._id}
                sx={{
                  width: "100%",
                  height: { xs: "200px", sm: "300px", md: "400px" },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={slide.MblImg}
                  alt={slide.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "12px",
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Carousel;
