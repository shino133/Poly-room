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
    <div className="relative bg-slate-100 min-h-screen overflow-hidden">
      <Header onLogout={onLogout} />
      <div className="flex flex-col min-h-screen">
        <SlideShow className="flex-1">
          <main className="relative z-10 flex-1 overflow-auto">
            <Outlet />
          </main>
        </SlideShow>
      </div>
      <Footer className="fixed bottom-0 left-0 w-full" />
    </div>
  );
}
