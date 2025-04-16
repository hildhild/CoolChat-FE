import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../assets/CoolChat Logo/5.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import ZaloLogo from "../assets/Zalo.svg";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#303030] text-white" id="footer">
      <div className="w-full max-w-[1200px] px-[32px] my-[0px] mx-[auto]">
        <div className="md:flex border-b-[0.8px] border-[#8787875c]">
          <div className="md:w-[400px] px-[32px] sm:px-[16px] py-[32px] grid grid-cols-1 sm:grid-cols-3 md:block w-full">
            <div className="w-full md:w-[60%] flex sm:justify-center pr-[30%] sm:pr-0">
              <img
                className="object-contain mb-[16px] sm:pr-[20px] md:pr-0"
                src={Logo}
                alt="auschain"
              />
            </div>
            <div className="text-[14px] text-[#9a9a9a] mb-[16px]">
              <strong>{t("address1_1")}</strong> {t("address1_2")}
            </div>
            <div className="text-[14px] text-[#9a9a9a]">
              <strong>{t("address2_1")}</strong> {t("address2_2")}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 w-full">
            <div className="col-span-1 px-[32px] py-[32px]">
              <div className=" mb-3 font-semibold uppercase">
                {t("about_us")}
              </div>
              <div className="mb-3">
                <a
                  href="#"
                  className="text-[14px] transition duration-200 delay-100 text-[#9a9a9a] no-underline hover:underline-offset-4 hover:underline hover:text-white"
                >
                  {t("about_us")}
                </a>
              </div>
              <div className="mb-3">
                <a
                  href="#"
                  className="text-[14px] transition duration-200 delay-100 text-[#9a9a9a] no-underline hover:underline-offset-4 hover:underline hover:text-white"
                >
                  {t("our_values")}
                </a>
              </div>
              <div className="mb-3">
                <a
                  href="#"
                  className="text-[14px] transition duration-200 delay-100 text-[#9a9a9a] no-underline hover:underline-offset-4 hover:underline hover:text-white"
                >
                  {t("careers")}
                </a>
              </div>
              <div className="mb-3">
                <a
                  href="#"
                  className="text-[14px] transition duration-200 delay-100 text-[#9a9a9a] no-underline hover:underline-offset-4 hover:underline hover:text-white"
                >
                  {t("awards")}
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="text-[14px] transition duration-200 delay-100 text-[#9a9a9a] no-underline hover:underline-offset-4 hover:underline hover:text-white"
                >
                  Blog
                </a>
              </div>
            </div>
            <div className="col-span-1 px-[32px] py-[32px]">
              <div className=" mb-3 font-semibold uppercase">{t("price")}</div>
              <div className="mb-3">
                <a
                  href="#"
                  className="text-[14px] transition duration-200 delay-100 text-[#9a9a9a] no-underline hover:underline-offset-4 hover:underline hover:text-white"
                >
                  {t("for_enterprise")}
                </a>
              </div>
              <div className="mb-3">
                <a
                  href="#"
                  className="text-[14px] transition duration-200 delay-100 text-[#9a9a9a] no-underline hover:underline-offset-4 hover:underline hover:text-white"
                >
                  {t("for_university")}
                </a>
              </div>
              <div className="mb-3">
                <a
                  href="#"
                  className="text-[14px] transition duration-200 delay-100 text-[#9a9a9a] no-underline hover:underline-offset-4 hover:underline hover:text-white"
                >
                  {t("for_individual_group")}
                </a>
              </div>
              <div className="mb-3">
                <a
                  href="#"
                  className="text-[14px] transition duration-200 delay-100 text-[#9a9a9a] no-underline hover:underline-offset-4 hover:underline hover:text-white"
                >
                  {t("for_student")}
                </a>
              </div>
            </div>
            <div className="col-span-1 px-[32px] py-[32px]">
              <div className=" mb-3 font-semibold uppercase">
                {t("contact_support")}
              </div>
              <div className="text-[#9a9a9a] mb-3 text-[14px]">
                <strong>Hotline:</strong> 0357677243
              </div>
              <div className="text-[#9a9a9a] mb-3 text-[14px]">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:ccc.support@gmail.com"
                  className="break-all transition duration-200 delay-100 text-[#9a9a9a] no-underline hover:underline-offset-4 hover:underline hover:text-white"
                >
                  coolchat019@gmail.com
                </a>
              </div>
              <div className="mb-3">
                <a
                  href="#"
                  className="text-[14px] transition duration-200 delay-100 text-[#9a9a9a] no-underline hover:underline-offset-4 hover:underline hover:text-white"
                >
                  {t("document")}
                </a>
              </div>
              <div className="flex mt-4 items-center gap-3">
                <a
                  href="https://www.youtube.com/@hild_____"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:-translate-y-0.5"
                >
                  <FontAwesomeIcon icon={faYoutube} className="text-[25px]" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:-translate-y-0.5"
                >
                  <FontAwesomeIcon
                    icon={faFacebookSquare}
                    className="text-[25px]"
                  />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img
                    src={ZaloLogo}
                    alt="Zalo"
                    className="w-[25px] h-[25px] transition duration-300 transform hover:scale-110 hover:-translate-y-0.5"
                  />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:-translate-y-0.5"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="text-[25px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-[20px] pb-[32px] text-[13px] block md:flex justify-between px-[32px] sm:px-[16px]">
          <div className="flex mb-[10px] md:mb-0">
            <a
              href="#"
              className="transition duration-200 delay-100 text-[#9a9a9a] mr-[20px] no-underline hover:underline-offset-4 hover:underline hover:text-white"
            >
              {t("privacy_policy")}
            </a>
            <a
              href="#"
              className="transition duration-200 delay-100 text-[#9a9a9a] no-underline hover:underline-offset-4 hover:underline hover:text-white"
            >
              {t("terms_of_service")}
            </a>
          </div>
          <div className="text-[#9a9a9a] ">{t("copyright")}</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
