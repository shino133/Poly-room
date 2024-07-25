/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
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

export default function DefaultLayout() {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useAuthContext();

  //WHEN: Don't have Token and is not Admin => go Login
  if (!userToken) {
    return <Navigate to="login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    logoutRequest().then(() => {
      setCurrentUser({});
      setUserToken(null);
    });
  };

  useEffect(() => {
    const userInfo = getMyData();
    setCurrentUser(userInfo);
  }, [setCurrentUser]);

  return (
    <>
      <div className="min-h-full">
        <div className="flex items-center mt-4 ml-2">
          <div className="h-12 p-1 mr-16">
            <img
              className="h-full cursor-pointer"
              src={AppLogo}
              alt="Your Company"
            />
          </div>
          <div className="input-container flex-1 max-w-[600px]">
            <div className="menu-left">
              <DehazeIcon className="icon-first cursor-pointer" />
            </div>
            <div className="line"></div>
            <input type="text" placeholder={"Search..."} />
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
            />
          </div>
        </div>
        <Outlet />

        <Toast />
      </div>
    </>
  );
}
