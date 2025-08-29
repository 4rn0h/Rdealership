import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCar, FaUserCircle, FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Left Section */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-red-500 flex items-center space-x-2">
            <FaCar className="text-red-500" />
            <span>Home</span>
          </Link>
          <Link
            to="/vehicle-browse-search"
            className="hover:text-red-500"
          >
            Our Collection
          </Link>
        </div>

        {/* Center Logo/Name */}
        <div className="text-xl font-bold text-center">
          <Link to="/" className="uppercase tracking-wide">
            ROYAMOTORSUK
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/about" className="hover:text-red-500">
            About Us
          </Link>
          <Link to="/contacts" className="hover:text-red-500">
            Contact
          </Link>
          <FaUserCircle className="text-2xl cursor-pointer hover:text-red-500" />
          <a
            href="tel:+447964595923"
            className="bg-red-600 px-3 py-1 rounded flex items-center space-x-2 hover:bg-red-700"
          >
            <FaPhoneAlt /> <span>+44 7964 595923</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-black text-white px-6 py-4 space-y-4">
          <Link to="/" className="block hover:text-red-500">Home</Link>
          <Link to="/vehicle-browse-search" className="block hover:text-red-500">Our Collection</Link>
          <Link to="/about" className="block hover:text-red-500">About Us</Link>
          <Link to="/contacts" className="block hover:text-red-500">Contact</Link>
          <a
            href="tel:+447964595923"
            className="block bg-red-600 px-3 py-2 rounded flex items-center space-x-2 hover:bg-red-700"
          >
            <FaPhoneAlt /> <span>+44 7964 595923</span>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
