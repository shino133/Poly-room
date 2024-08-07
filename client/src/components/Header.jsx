import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/Support";
import logo from "../assets/logo/fpt-poly.png";
import { menu } from "../assets"; // Đổi tên biến import để tránh xung đột

function Header({ onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const { currentUser } = useAuthContext();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMouseOver = () => {
    setShowUserInfo(true);
  };

  const handleMouseOut = () => {
    setShowUserInfo(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
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
            ? "bg-white w-full text-black border-gray-300"
            : "w-4/5 bg-white shadow-slate-50"
        }`}
      >
        <div className="md:hidden">
          <button onClick={handleMenuToggle}>
            <img className="w-12" src={menu} alt="Menu" />
          </button>
        </div>
        <div className="cursor-pointer">
          <Link to="/">
            <img className="max-w-36" src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="hidden md:flex">
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
            <li>
              <Link
                to="/user"
                className="hover:text-blue-500 transition-colors"
              >
                User
              </Link>
            </li>
            <li className="hover:text-blue-500 transition-colors">Blog</li>
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="hover:text-gray-800 relative"
            aria-label="User"
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
            {showUserInfo && currentUser && (
              <div className="absolute top-7 right-0 bg-white border-solid border-black border-[1px] p-[0.5] text-[10px] font-normal pl-3 pr-3 rounded">
                <p>{currentUser.name}</p>
              </div>
            )}
          </button>
          <div
            className={`p-1.5 px-5 cursor-pointer font-medium rounded-xl hover:opacity-75 hover:bg-red-600 relative overflow-hidden ${
              scrolled ? "text-white bg-black" : "bg-black text-white"
            } group`}
          >
            <Link onClick={onLogout}>
              <span className="relative z-10">Log Out</span>
            </Link>
          </div>
        </div>
      </div>


{/* menu của mobile */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${
          isMenuOpen ? "transform translate-x-0" : "transform -translate-x-full"
        } w-1/2 bg-white shadow-lg`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={handleMenuToggle} aria-label="Close menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col items-start ">
          <li className="py-2 w-full hover:bg-gray-400">
            <Link to="/" className="text-black w-full" onClick={handleMenuToggle}>
              Home
            </Link>
          </li>
          <li className="py-2 w-full">
            <Link to="/booking" className="text-black w-full" onClick={handleMenuToggle}>
              Booking
            </Link>
          </li>
          <li className="py-2 w-full">
            <Link to="/contact" className="text-black w-full" onClick={handleMenuToggle}>
              Contact
            </Link>
          </li>
          <li className="py-2 w-full">
            <Link to="/blog" className="text-black w-full" onClick={handleMenuToggle}>
              Blog
            </Link>
          </li>
          <li className="py-2 w-full">
            <Link onClick={() => {handleMenuToggle(); onLogout();}} className="text-black w-full">
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
