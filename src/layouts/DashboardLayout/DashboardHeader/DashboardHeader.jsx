import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import "hamburgers/dist/hamburgers.css";
import "./DashboardHeader.css";
import { SelectLanguage } from "../../../components";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsExpanded } from "../../../store/slices/SidebarSlice";
import { toast } from "react-toastify";
import { setToken } from "../../../store/slices/UserSlice";

const DashboardHeader = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState("");
  const [showMenu1, setShowMenu1] = useState("");
  const isExpanded = useSelector((state) => state.sidebar.isExpanded);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(setToken(""));
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Đăng xuất thành công");
  };

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
    <header
      className={`bg-white fixed top-0 right-0 z-40 shadow-md font-nunito ${
        isExpanded
          ? "w-full md:w-[calc(100%-270px)]"
          : "w-full md:w-[calc(100%-60px)]"
      }`}
    >
      <div className="w-full flex justify-between items-center h-16 px-5">
        <button
          className={`hamburger hamburger--spin ${
            isExpanded ? "is-active" : ""
          }`}
          type="button"
          onClick={() => dispatch(toggleIsExpanded())}
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
          <div className="md:flex hidden gap-7 justify-end items-center">
            {/* <SelectLanguage
              handleClick={handleSelectLangClick}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            /> */}
            <Badge content="99+" shape="circle" color="danger">
              <Button
                radius="full"
                isIconOnly
                aria-label="more than 99 notifications"
                variant="light"
              >
                <FaBell size={24} className="text-coolchat" />
              </Button>
            </Badge>
          </div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                className="cursor-pointer"
                name={userInfo.name}
                description={
                  <div
                    href="https://twitter.com/jrgarciadev"
                    size="sm"
                    className="text-coolchat"
                  >
                    {userInfo.companyName}
                  </div>
                }
                avatarProps={{
                  src: userInfo.avatar
                    ? userInfo.avatar
                    : "https://cdn-icons-png.flaticon.com/512/6676/6676023.png",
                  className: "bg-white",
                }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" textValue="Đăng nhập với">
                <p className="font-semibold">Đăng nhập với:</p>
                <p className="font-semibold">{userInfo.email}</p>
              </DropdownItem>
              <DropdownItem key="settings" onClick={() => navigate("/setting")} textValue="Cài đặt">
                Cài đặt
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout} textValue="Đăng xuất">
                Đăng xuất
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
