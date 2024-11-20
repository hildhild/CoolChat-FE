import React, { useState, useEffect } from "react";
import ImageCarousel from "./ImageCarousel";
import { useTranslation } from "react-i18next";

const WelcomeSection = () => {
  const {t} = useTranslation();
  const handleFreeTrialClick = () => {
    window.location.href =
      "https://agridential-dashboard.australiablockchain.au/register"; // Redirect to the specified URL
  };

  useEffect(() => {
    const handleZoom = () => {
      const zoomLevel = window.devicePixelRatio * 65;
      const imageContainer = document.querySelector(".zoom-restrict");

      if (zoomLevel > 150) {
        imageContainer.style.transform = `scale(${150 / zoomLevel})`;
        imageContainer.style.width = `${100 * (zoomLevel / 150)}%`;
      } else {
        imageContainer.style.transform = "scale(1)";
        imageContainer.style.width = "100%";
      }
    };

    window.addEventListener("resize", handleZoom);
    handleZoom();

    return () => window.removeEventListener("resize", handleZoom);
  }, []);

  return (
    <section className="welcome-section relative lg:bg-gradient-to-r bg-gradient-to-b from-[#4880FF] to-[#a3dffa] text-white mt-16 pt-20 pb-16 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1140px] mx-auto px-8 flex flex-col lg:flex-row items-center justify-between overflow-hidden mb-8 z-30">
        <div className="content max-w-lg text-center lg:text-left flex-1 z-20 lg:mr-8 overflow-hidden mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 mt-24 ">
            <div>COOLCHAT -</div>
            <div>MAKE IT COOL</div>
          </h1>
          <p className="text-base sm:text-lg mb-6">
            {t('web_des')}
          </p>
          <div className="signup-form max-w-lg lg:max-w-md text-center lg:text-left flex-1 z-20 lg:mr-8 xl:pb-[24px]">
            <button
              className="btn-signup rounded-lg text-[#4880FF] bg-[#fff] hover:-translate-y-1 transition duration-300 font-semibold py-2 px-6 w-full sm:w-auto mb-4 align-middle"
              onClick={handleFreeTrialClick}
            >
              {t('free_trial')}
            </button>
          </div>
        </div>
        <div className="illustration lg:max-w-lg lg:mt-0 flex justify-end items-center relative zoom-restrict">
          <ImageCarousel />
        </div>
      </div>
      <svg
        className="absolute bottom-0 left-0 w-full z-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 97"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 100h1000V48c-62.5 24-125 48-250 48-250 0-250-96-500-96C125 0 62.5 24 0 48v52z"
          fill="#ffffff"
        ></path>
      </svg>
    </section>
  );
};

export default WelcomeSection;
