import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/Support";
import Footer from "../../components/Footer";
import { getMyData, logoutRequest } from "../../Api";
import { Header } from "../../components";
import { useSidebarContext } from "../../contexts/Support";

export default function DefaultLayout() {
  const { currentUser, userToken, setCurrentUser, setUserToken } = useAuthContext();
    // WHEN: Don't have Token and is not Admin => go Login
  if (!userToken && !currentUser) {
    return <Navigate to="/login" />;
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = async (ev) => {
    ev.preventDefault();
    try {
      await logoutRequest();
      setCurrentUser(null);
      setUserToken(null);
      localStorage.clear();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const { isOpen, toggleSidebar } = useSidebarContext();

  return (
    <div className="bg-slate-100">
      <Header onLogout={onLogout} />
      <Outlet />
      <Footer />
    </div>
  );
}
