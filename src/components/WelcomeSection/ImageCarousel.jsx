import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Welcome1 from "../../assets/welcome1.svg";
import Welcome2 from "../../assets/welcome2.svg";
import Welcome3 from "../../assets/welcome3.svg";


const ImageCarousel = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    touchMove: true,
    arrows: false, // Ẩn các nút điều hướng
    appendDots: (dots) => (
      <div className="relative">
        <ul className="-translate-y-8">{dots}</ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          // arrows: false,
          swipe: true,
          touchMove: true,
        },
      },
    ],
  };

  return (
    <div className="relative w-full max-w-screen-lg mx-auto mt-4 lg:mt-8">
      <Slider {...settings}>
        <div className="focus:outline-none mb-4">
          <img
            src={Welcome1}
            alt="Image 1"
            className="w-full h-auto object-contain max-w-full mb-4"
          />
        </div>
        <div className="focus:outline-none">
          <img
            src={Welcome2}
            alt="Image 2"
            className="w-full h-auto object-contain max-w-full mb-4"
          />
        </div>
        <div className="focus:outline-none">
          <img
            src={Welcome3}
            alt="Image 3"
            className="w-full h-auto object-contain max-w-full mb-4"
          />
        </div>
      </Slider>
    </div>
  );
};

export default ImageCarousel;
