import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/CoolChat Logo/2.png";
import { Link, useNavigate } from "react-router-dom";
import "hamburgers/dist/hamburgers.css";
import "./DashboardHeader.css";
import SelectLanguage from "../SelectLanguage";
import { Avatar, Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";
import { FaBell } from "react-icons/fa";

const DashboardHeader = ({isExpanded, setIsExpanded}) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState("");
  const [showMenu1, setShowMenu1] = useState("");

  const menuItems = [
    { name: t("feature"), href: "feature-section" },
    { name: t("price"), href: "pricing-section" },
    { name: t("about_us"), href: "/" },
    { name: t("guide"), href: "/" },
  ];

  const handleSelectLangClick = () => {
    setShowMenu("login");
  };
  const handleSelectLangClick1 = () => {
    setShowMenu1("login");
  };

  return (
    <header className={`bg-white fixed top-0 right-0 z-50 shadow-md font-nunito ${isExpanded ? "w-[calc(100%-270px)]": "w-[calc(100%-60px)]"}`}>
      <div className="w-full flex justify-between items-center h-16 px-8">
        <button
          className={`hamburger hamburger--spin ${
            isExpanded ? "is-active" : ""
          }`}
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
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

        {/* Actions */}
        <div className="flex gap-7 justify-end items-center">
          <SelectLanguage
            handleClick={handleSelectLangClick}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
          <Badge content="99+" shape="circle" color="danger">
            <Button
              radius="full"
              isIconOnly
              aria-label="more than 99 notifications"
              variant="light"
            >
              <FaBell size={24} className="text-coolchat"/>
            </Button>
          </Badge>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User   
                className="cursor-pointer"
                name="Junior Garcia"
                description={(
                  <div href="https://twitter.com/jrgarciadev" size="sm" isExternal className="text-coolchat">
                    @jrgarciadev
                  </div>
                )}
                avatarProps={{
                  src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        
      </div>
    </header>
  );
};

export default DashboardHeader;
