import React, { useState, useEffect } from "react";
import ImageCarousel from "./ImageCarousel";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const WelcomeSection = () => {
  const { t } = useTranslation();
  const handleFreeTrialClick = () => {
    window.location.href = "/sign-up"; // Redirect to the specified URL
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
      <motion.div
        className="w-full max-w-[1200px] mx-auto px-8 flex flex-col lg:flex-row items-center justify-between overflow-hidden mb-8 z-30"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="content max-w-lg text-center lg:text-left flex-1 z-20 lg:mr-8 overflow-hidden mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-5 mt-24">
            <div className="drop-shadow-md">COOLCHAT -</div>
            <div className="drop-shadow-md">MAKE IT COOL</div>
          </h1>
          <p className="text-xl mb-8 drop-shadow">{t("web_des")}</p>
          <div className="mb-4 signup-form max-w-lg lg:max-w-md text-center lg:text-left flex flex-col sm:flex-row gap-3 z-20 lg:mr-8 xl:pb-[24px] justify-center lg:justify-start">
            <button
              className="btn-signup rounded-lg text-[#4880FF] bg-[#fff] hover:-translate-y-1 transition duration-300 font-semibold py-2 px-6 w-full sm:w-auto align-middle"
              onClick={handleFreeTrialClick}
            >
              {t("free_trial")}
            </button>
            <a href="https://youtu.be/lNOFD5Oyo6U">
              <button className="btn-signup rounded-lg text-white bg-transparent border-white border-2 hover:-translate-y-1 transition duration-300 font-semibold py-2 px-6 w-full sm:w-auto align-middle">
                Xem demo
              </button>
            </a>
          </div>
        </div>

        <div className="illustration lg:max-w-lg lg:mt-0 flex justify-end items-center relative zoom-restrict">
          <ImageCarousel />
        </div>
      </motion.div>
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
