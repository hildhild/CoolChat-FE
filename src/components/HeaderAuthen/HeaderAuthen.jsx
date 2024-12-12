import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/CoolChat Logo/2.png";
import { useNavigate } from "react-router-dom";
import "hamburgers/dist/hamburgers.css"; 
import "./HeaderAuthen.css"; 
import SelectLanguage from "../SelectLanguage";

const HeaderAuthen = () => {
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
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </button>

        {/* Actions */}
        <div className="hidden lg:flex items-center space-x-8 ml-8">
          <SelectLanguage handleClick={handleSelectLangClick} showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center justify-center">
          <div className="mr-6">
            <SelectLanguage handleClick={handleSelectLangClick1} showMenu={showMenu1} setShowMenu={setShowMenu1} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAuthen;
