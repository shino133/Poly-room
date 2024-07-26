/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/Support";
import Footer from "../../components/Footer"
import Content from "../pages/Content";
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
    <div className="bg-slate-100">
    <Sidebar/>
    <Outlet/>
    <Footer/>
    </div>
    </>
  );
}
