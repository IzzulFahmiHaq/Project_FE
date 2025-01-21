import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    localStorage.removeItem('adminData'); // Clear admin data from localStorage
    navigate('/register'); // Redirect to register page
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle the mobile menu state
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg p-4"> {/* Updated navbar color to match dashboard */}
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
          <i className="fas fa-user-shield text-2xl"></i> {/* Admin icon */}
          Admin Bakery
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/register"
            className="bg-blue-600 px-5 py-2 rounded-md hover:bg-blue-500 transition duration-300 flex items-center gap-2"
            title="Akun Admin"
          >
            <i className="fas fa-user-circle text-xl"></i> {/* User icon */}
            <span className="hidden md:block">Akun Admin</span>
          </Link>
          <button
            onClick={handleLogout} // Handle logout with navigate
            className="bg-blue-600 px-5 py-2 rounded-md hover:bg-blue-500 transition duration-300 flex items-center gap-2"
          >
            <i className="fas fa-sign-out-alt text-xl"></i> {/* Logout icon */}
            Logout
          </button>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white text-2xl">
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i> {/* Change icon based on menu state */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-blue-700 p-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}> {/* Adjusted to match dashboard */}
        <div className="flex flex-col items-start gap-4">
          <Link
            to="/register"
            className="bg-blue-600 px-5 py-2 rounded-md hover:bg-blue-500 transition duration-300 flex items-center gap-2"
            title="Akun Admin"
          >
            <i className="fas fa-user-circle text-xl"></i> {/* User icon */}
            Akun Admin
          </Link>
          <button
            onClick={handleLogout}
            className="bg-blue-600 px-5 py-2 rounded-md hover:bg-blue-500 transition duration-300 w-full flex items-center gap-2"
          >
            <i className="fas fa-sign-out-alt text-xl"></i> {/* Logout icon */}
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
