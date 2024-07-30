import { useState, useEffect } from "react";
import { Link,Navigate } from "react-router-dom";
import { getMyData } from "../Api"; // Đảm bảo đường dẫn đúng
import { useAuthContext } from "../contexts/Support"; // Đảm bảo đường dẫn đúng

import logo from "../assets/logo/fpt-poly.png"; // Đảm bảo đường dẫn đúng

function Header({ onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const { currentUser,userToken } = useAuthContext();
  const [showUserInfo, setShowUserInfo] = useState(false);

  const handleMouseOver = () => {
    setShowUserInfo(true);
  };

  const handleMouseOut = () => {
    setShowUserInfo(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div
        className={`flex rounded-bl-md rounded-br-md z-50 font-bold fixed top-0 justify-between p-4 items-center transition-all duration-300 ${
          scrolled
            ? "bg-white w-full text-black  border-gray-300"
            : "w-4/5 bg-white shadow-slate-50"
        }`}
      >
        <div className="cursor-pointer">
          <Link to="/">
            <img className="max-w-36" src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="flex">
          <ul className="flex gap-5 font-medium cursor-pointer">
            <li>
              <Link to="/" className="hover:text-blue-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/booking"
                className="hover:text-blue-500 transition-colors"
              >
                Booking
              </Link>
            </li>
            <li className="hover:text-blue-500 transition-colors">Contact</li>
            <li className="hover:text-blue-500 transition-colors">Blog</li>
          </ul>
        </div>
        <div className="flex items-center gap-3">
        
          <button
            className="hover:text-gray-800"
            aria-label="TikTok"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
          <div
            className={`p-1.5 px-5 cursor-pointer font-medium rounded-xl hover:opacity-75 hover:bg-red-600 relative overflow-hidden ${
              scrolled ? "text-white bg-black" : " bg-black text-white"
            } group`}
          >
            <Link onClick={onLogout}>
              <span className="relative z-10 ">Log Out</span>
            </Link>
          </div>
          {showUserInfo && currentUser && (
            <div className="absolute top-24 right-0  p-4 rounded shadow-lg">
              <p>Name: {currentUser.name}</p>
              <p>Email: {currentUser.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
