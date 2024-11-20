import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/CoolChat Logo/2.png";
import { useNavigate } from "react-router-dom";
import "hamburgers/dist/hamburgers.css"; 
import "./Header.css"; 
import SelectLanguage from "../SelectLanguage";

const Header = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState('');
  const [showMenu1, setShowMenu1] = useState('');

  const menuItems = [
    { name: t('feature'), href: "feature-section" },
    { name: t('price'), href: "pricing-section" },
    { name: t('about_us'), href: "/" },
    { name: t('guide'), href: "/" },
  ];

  const handleSelectLangClick = () => {
    setShowMenu('login')
  }
  const handleSelectLangClick1 = () => {
    setShowMenu1('login')
  }

  return (
    <header className="bg-white fixed top-0 w-full z-50 shadow-md font-nunito">
      <div className="max-w-[1140px] mx-auto flex justify-between items-center h-16 px-[32px]">
        {/* Logo */}
        <button
          className="flex-shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </button>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() =>
                window.scrollTo({
                  top: document.getElementById(item.href).offsetTop,
                  behavior: "smooth",
                })
              }
              className="text-base text-gray-700 font-semibold hover:text-[#4880FF] hover:-translate-y-1 transition duration-300"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center space-x-8 ml-8">
          <SelectLanguage handleClick={handleSelectLangClick} showMenu={showMenu} setShowMenu={setShowMenu} />
          <a
            href="https://agridential-dashboard.australiablockchain.au/login"
            className="text-base text-gray-700 font-semibold hover:text-[#4880FF] hover:-translate-y-1 transition duration-300 text-center"
          >
            {t('login')}
          </a>
          <a
            href="https://agridential-dashboard.australiablockchain.au/register"
            className="bg-[#4880FF] text-white py-2 px-5 font-semibold rounded-lg hover:-translate-y-1 transition duration-300 whitespace-nowrap"
          >
            {t('signup')}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center justify-center">
          <div className="mr-6">
            <SelectLanguage handleClick={handleSelectLangClick1} showMenu={showMenu1} setShowMenu={setShowMenu1} />
          </div>
          <button
            className={`hamburger hamburger--spin ${
              isMobileMenuOpen ? "is-active" : ""
            }`}
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              width: "25px",
              height: "25px",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <nav className="p-8 space-y-6 bg-gray-100">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  window.scrollTo({
                    top: document.getElementById(item.href).offsetTop,
                    behavior: "smooth",
                  });
                  setIsMobileMenuOpen(false);
                }}
                className="block text-lg text-gray-800 font-semibold hover:text-[#4880FF] hover:-translate-y-1 transition duration-300 text-center"
              >
                {item.name}
              </button>
            ))}
            <a
              href="https://agridential-dashboard.australiablockchain.au/login"
              className="block text-lg text-gray-800 font-semibold hover:text-[#4880FF] hover:-translate-y-1 transition duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('login')}
            </a>
            <a
              href="https://agridential-dashboard.australiablockchain.au/register"
              className="block text-lg text-white font-semibold bg-[#4880FF] hover:bg-[#7fab3d] hover:-translate-y-1 transition duration-300 py-3 rounded mt-4 mx-auto w-full text-center"
            >
              {t('signup')}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
