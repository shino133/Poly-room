/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/Support";
import { getMyData, logoutRequest } from "../../Api";
import { Toast } from "../../components";
import { AppLogo } from "../../assets";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Sidebar } from "../../components";
import { useSidebarContext } from "../../contexts/Support";
import { FPTLogo } from "../../assets";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";

export default function DefaultLayout() {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useAuthContext();

  //WHEN: Don't have Token and is not Admin => go Login
  if (!userToken) {
    return <Navigate to="login" />;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = (ev) => {
    ev.preventDefault();
    logoutRequest().then(() => {
      setCurrentUser({});
      setUserToken(null);
      localStorage.clear();
    });
  };

  const { isOpen, toggleSidebar } = useSidebarContext();

  return (
    <>
      <div className="min-h-full">
        <div className="flex items-center mt-4 ml-2">
          <div className="h-12 p-1 mr-16">
            <img
              className="h-full cursor-pointer"
              src={AppLogo}
              alt="FPoly Booking"
            />
          </div>
          <div className="input-container flex-1 max-w-[600px]">
            <div className="menu-left" onClick={toggleSidebar}>
              <DehazeIcon className="icon-first cursor-pointer" />
            </div>
            <div className="line"></div>
            <input type="text" placeholder={"Tìm kiếm..."} />
            <SearchIcon className="icon" />
          </div>
          <div className="flex items-center space-x-7 justify-end flex-1 mr-6">
            <NotificationsNoneIcon
              className="cursor-pointer"
              style={{ fontSize: 30 }}
            />
            <MoreHorizIcon
              className="cursor-pointer"
              style={{ fontSize: 30 }}
            />
            <AccountCircleIcon
              className="cursor-pointer"
              style={{ fontSize: 30 }}
              onClick={handleClick}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Trang cá nhân</MenuItem>
              <MenuItem onClick={handleClose}>Tài khoản</MenuItem>
              <MenuItem onClick={(ev) => onLogout(ev)}>Đăng xuất</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="flex flex-row">
          <Sidebar />
          <div className={`flex-1 main-content ${!isOpen ? "expanded" : ""}`}>
            <Outlet />
          </div>
        </div>
        <hr className="mt-4 mx-4 border-[#ccc]" />
        <div className="flex flex-row justify-around mb-6 mt-6">
          <div className="flex flex-col">
            <img src={FPTLogo} alt="FPT Polytechnic" />
            <div className="line"></div>
            <a href="#">Về chúng tôi</a>
            <a href="#">CLB IT FPOLY HÀ NAM</a>
          </div>
          <div className="flex flex-col ml-4">
            <h3 className="font-bold text-orange-500">Phòng</h3>
            <div className="line"></div>
            <a href="#">Phòng họp</a>
            <a href="#">Phòng học</a>
            <a href="#">Phòng chức năng</a>
          </div>
          <div className="flex flex-col ml-4">
            <h3 className="font-bold text-orange-500">Điều khoản sử dụng</h3>
            <div className="line"></div>
            <a href="#">Điều khoản và Điều kiện</a>
            <a href="#">Chính sách quyền riêng tư và cookie</a>
          </div>
          <div className="flex flex-col mr-4">
            <h3 className="font-bold text-orange-500">Liên hệ</h3>
            <div className="line"></div>
            <a href="#" className="flex flex-row items-center gap-2">
              <FaPhoneAlt /> 091 196 82 13
            </a>
            <a href="#" className="flex flex-row items-center gap-2">
              <CiMail />
              caodangfpt.hanam@fpt.edu.vn
            </a>
            <a href="#" className="flex flex-row items-center gap-2">
              <FaLocationDot /> FPT Hà Nam
            </a>
            <a href="#" className="flex flex-row items-center gap-2">
              <FaLocationDot /> Tổ hợp giáo dục FPT Unischool .
            </a>
          </div>
        </div>
        <center className="mb-8">© 2024 Copyright - FPT Polytechnic</center>
        <Toast />
      </div>
    </>
  );
}
