import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

// Data Links
const NavLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About", link: "/about" },
  { id: 3, name: "Produk", link: "/banner" },
];

// Navbar Component
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State untuk toggle menu
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  // Handle logout
  const handleLogout = () => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin log out?");
    if (isConfirmed) {
      navigate("/Register"); // Redirect to the login page
    }
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Update local storage and apply dark mode
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Check if the current page is Home or About
  const isHomeOrAboutPage = location.pathname === "/" || location.pathname === "/about";

  return (
    <div
      className={`${
        location.pathname === "/banner"
          ? "bg-gradient-to-r from-yellow-400 to-orange-500 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900"
          : "bg-black"
      } shadow-md fixed w-full top-0 left-0 z-50`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className={`text-2xl font-serif font-extrabold tracking-wide ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            Bakery Shop
          </div>

          {/* Hamburger for Mobile */}
          <div className="sm:hidden flex items-center">
            {isMobileMenuOpen ? (
              <AiOutlineClose
                className="text-3xl text-white cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ) : (
              <AiOutlineMenu
                className="text-3xl text-white cursor-pointer"
                onClick={() => setIsMobileMenuOpen(true)}
              />
            )}
          </div>

          {/* Navigation Section */}
          <ul
            className={`sm:flex items-center gap-10 space-x-8 absolute sm:static left-0 top-0 sm:top-auto sm:left-auto ${
              location.pathname === "/banner"
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 sm:bg-transparent"
                : "bg-black"
            } sm:bg-transparent w-full sm:w-auto p-6 sm:p-0 transition-all duration-300 z-10 ${isMobileMenuOpen ? "block" : "hidden sm:flex"}`}
          >
            {NavLinks.map(({ id, name, link }) => (
              <li key={id}>
                <a
                  href={link}
                  className="block text-lg font-semibold text-white hover:text-yellow-200 transition duration-300"
                >
                  {name}
                </a>
              </li>
            ))}

            {/* Dark Mode Toggle */}
            <li className="mt-4 md:mt-0">
              {darkMode && !isHomeOrAboutPage ? (
                <BiSolidSun
                  className="text-2xl text-white cursor-pointer hover:text-yellow-300 transition duration-300"
                  onClick={toggleDarkMode}
                />
              ) : (
                <BiSolidMoon
                  className="text-2xl text-white cursor-pointer hover:text-yellow-600 transition duration-300"
                  onClick={toggleDarkMode}
                />
              )}
            </li>

            {/* Logout Button */}
            <li className="mt-4 md:mt-0">
              <button
                onClick={handleLogout}
                className="flex items-center text-lg font-semibold text-white hover:text-yellow-200 transition duration-300"
              >
                <FiLogOut className="inline mr-2 text-2xl" /> Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
