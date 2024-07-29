import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/Support";
import Footer from "../../components/Footer";
import { logoutRequest } from "../../Api";
import { Header } from "../../components";
import { useSidebarContext } from "../../contexts/Support";
import SlideShow from "../../components/SlideShow";

export default function DefaultLayout() {
  const { currentUser, userToken, setCurrentUser, setUserToken } = useAuthContext();
  if (!userToken || !currentUser) {
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
    <div className="relative bg-slate-100 h-screen">
      <SlideShow className="absolute inset-0 z-0" />

      <div className="relative z-10 flex flex-col h-full">
        <Header onLogout={onLogout} />
        <main className="flex-1 relative z-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
