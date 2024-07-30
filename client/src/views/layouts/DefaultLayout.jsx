import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/Support";
import Footer from "../../components/Footer";
import { logoutRequest } from "../../Api";
import Header from "../../components/Header";
import SlideShow from "../../components/SlideShow";

export default function DefaultLayout() {
  const { currentUser, userToken, setCurrentUser, setUserToken } = useAuthContext();

  useEffect(() => {
    if (!currentUser || Object.keys(currentUser).length === 0) {
      setUserToken(null);
    }
  }, [currentUser, setUserToken]);

  if (!userToken) {
    return <Navigate to="/login" />;
  }

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
