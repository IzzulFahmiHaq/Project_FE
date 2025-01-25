import React, { useState } from "react";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin log out?");
    if (isConfirmed) {
      navigate("/Register");
    }
  };

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className={`${
        darkMode ? "bg-gradient-to-r from-gray-800 to-gray-900" : "bg-gradient-to-r from-yellow-400 to-orange-500"
      } shadow-md fixed w-full top-0 left-0 z-50`}
    >
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-serif font-extrabold tracking-wide text-white">
            Sweet Bakes
          </div>

          {/* Navigation Menu */}
          <ul className="flex gap-6 items-center">
            <li>
              <a
                href="/"
                className="text-white text-lg hover:text-yellow-300 transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/banner"
                className="text-white text-lg hover:text-yellow-300 transition duration-300"
              >
                Produk
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-white text-lg hover:text-yellow-300 transition duration-300"
              >
                About
              </a>
            </li>
            <li>
              <button
                onClick={toggleDarkMode}
                className="text-white text-lg hover:text-yellow-300 transition duration-300"
              >
                {darkMode ? <BiSolidSun /> : <BiSolidMoon />}
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center text-white text-lg hover:text-yellow-300 transition duration-300"
              >
                <FiLogOut className="mr-2 text-xl" /> Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
