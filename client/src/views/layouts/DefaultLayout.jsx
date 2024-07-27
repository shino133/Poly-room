/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/Support";
import Footer from "../../components/Footer"
import Content from "../pages/Content";
import { getMyData, logoutRequest } from "../../Api";
import { Toast } from "../../components";

import { Header } from "../../components";
import { useSidebarContext } from "../../contexts/Support";


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
    <Header onLogout={onLogout}/>
    <Outlet/>
    <Footer/>
    </div>
    </>
  );
}
