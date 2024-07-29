import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyData } from "../Api"; // Đảm bảo đường dẫn đúng
import { useAuthContext } from "../contexts/Support"; // Đảm bảo đường dẫn đúng

import logo from "../assets/logo/fpt-poly.png"; // Đảm bảo đường dẫn đúng

function Header({ onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [showUserInfo, setShowUserInfo] = useState(false);

  const { currentUser } = useAuthContext();

  const handleMouseOver = () => {
    setShowUserInfo(true);
  };

  const handleMouseOut = () => {
    setShowUserInfo(false);
  };

  useEffect(() => {
     function getData() {
      try {
        setDataUser(currentUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    getData();

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
          <a
            href="https://facebook.com"
            className="hover:text-blue-800"
            aria-label="Facebook"
          >
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12.1c0-5.3-4.3-9.6-9.6-9.6-5.3 0-9.6 4.3-9.6 9.6 0 4.8 3.5 8.8 8.1 9.4v-6.6h-2.4v-2.8h2.4v-2.1c0-2.4 1.5-3.7 3.6-3.7 1.1 0 2.2.1 2.2.1v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6v1.8h2.7l-.4 2.8h-2.3v6.6c4.6-.6 8.1-4.6 8.1-9.4z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            className="hover:text-purple-800"
            aria-label="Instagram"
          >
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.5 0 2.8.5 3.8 1.5s1.5 2.3 1.5 3.8c0 1.3.1 1.7.1 4.9s-.1 3.6-.1 4.9c-.1 1.5-.5 2.8-1.5 3.8s-2.3 1.5-3.8 1.5c-1.3 0-1.7.1-4.9.1s-3.6-.1-4.9-.1c-1.5 0-2.8-.5-3.8-1.5s-1.5-2.3-1.5-3.8c0-1.3-.1-1.7-.1-4.9s.1-3.6.1-4.9c.1-1.5.5-2.8 1.5-3.8s2.3-1.5 3.8-1.5zm0-2c-3.3 0-3.7 0-5 .1-2.1.1-3.9.7-5.3 2-1.4 1.4-1.9 3.2-2 5.3-.1 1.3-.1 1.7-.1 5s.1 3.7.1 5c.1 2.1.7 3.9 2 5.3s3.2 1.9 5.3 2c1.3.1 1.7.1 5 .1s3.7 0 5-.1c2.1-.1 3.9-.7 5.3-2 1.4-1.4 1.9-3.2 2-5.3.1-1.3.1-1.7.1-5s-.1-3.7-.1-5c-.1-2.1-.7-3.9-2-5.3-1.4-1.4-3.2-1.9-5.3-2-1.3-.1-1.7-.1-5-.1zm0 11.8c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6.6c-1.5 0-2.6 1.2-2.6 2.6s1.2 2.6 2.6 2.6 2.6-1.2 2.6-2.6-1.2-2.6-2.6-2.6zm5.7-3.4c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
            </svg>
          </a>
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
