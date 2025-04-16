import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faRobot,
  faBook,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="transition ease-in-out delay-100 duration-200 cursor-pointer bg-[#F4F5F7] text-coolchat rounded-full w-[30px] h-[30px] grid place-content-center hover:bg-coolchat hover:text-white"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronRight} className="text-[16px]" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="transition ease-in-out delay-100 duration-200 cursor-pointer bg-[#F4F5F7] text-coolchat rounded-full w-[30px] h-[30px] grid place-content-center hover:bg-coolchat hover:text-white"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronLeft} className="text-[16px]" />
    </div>
  );
};

const HorizontalTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const { t } = useTranslation();

  const tabData = [
    {
      title: t("fea1"),
      icon: faRobot,
      content: t("fea1_des"),
      bgColor: "bg-amber-500",
      iconColor: "text-amber-500",
    },
    {
      title: t("fea2"),
      icon: faBook,
      content: t("fea2_des"),
      bgColor: "bg-cyan-500",
      iconColor: "text-cyan-500",
    },
    {
      title: t("fea3"),
      icon: faDollarSign,
      content: t("fea3_des"),
      bgColor: "bg-[#7fab3d]",
      iconColor: "text-[#7fab3d]",
    },
    // {
    //   title: "Task management",
    //   icon: faTasks,
    //   content: "Use Trello to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make your team’s projects a cohesive success every time.",
    //   bgColor: "bg-yellow-500",
    //   iconColor: "text-yellow-500",
    // },
    // {
    //   title: "Brainstorming",
    //   icon: faLightbulb,
    //   content: "Unleash your team’s creativity and keep ideas visible, collaborative, and actionable.",
    //   bgColor: "bg-rose-400",
    //   iconColor: "text-rose-400",
    // },
    // {
    //   title: "Resource hub",
    //   icon: faBook,
    //   content: "Save time with a well-designed hub that helps teams find information easily and quickly.",
    //   bgColor: "bg-teal-600",
    //   iconColor: "text-teal-600",
    // },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(3);
        setActiveIndex(0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      return (prevIndex + slidesToShow) % tabData.length;
    });
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      return (prevIndex - slidesToShow + tabData.length) % tabData.length;
    });
  };

  return (
    <div className="max-w-[1200px] mt-[50px] mx-auto px-[16px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-[16px] font-medium text-gray-600 mb-2 px-4 text-left md:text-left"
      >
        COOLCHAT IN ACTION
      </motion.div>

      {/* Container chính */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative flex flex-col md:flex-row md:items-end justify-between px-4"
      >
        {/* Container chứa nội dung */}
        <div className="flex-1 text-left md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {t("outstanding_features")}
          </h2>
        </div>

        {/* Container chứa button */}
        <div className="flex min-[700px]:hidden space-x-2 mt-4 md:mt-0 ease-in-out delay-100 duration-200 justify-end">
          <PrevArrow onClick={handlePrev} />
          <NextArrow onClick={handleNext} />
        </div>
      </motion.div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${activeIndex * (100 / slidesToShow)}%)`,
          }}
        >
          {tabData.map((tab, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="w-full md:w-1/3 flex-shrink-0 p-4 box-border mb-[16px]"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                <div className="relative">
                  <div className={`${tab.bgColor} p-2 flex  justify-start`}>
                    <div className="bg-white p-2 rounded-md shadow-md flex ">
                      <FontAwesomeIcon
                        icon={tab.icon}
                        className={`text-xl ${tab.iconColor}`}
                      />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {tab.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{tab.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalTabs;
