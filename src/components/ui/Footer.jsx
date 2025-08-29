// components/ui/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCar,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 mt-16 border-t border-gray-700">
      <div className="container mx-auto grid md:grid-cols-4 gap-10 px-6">
        
        {/* Column 1 - Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaCar className="text-red-500 text-3xl" />
            <h2 className="text-xl font-serif font-bold">RoyaMotorsUK</h2>
          </div>
          <p className="text-gray-400 mb-4">
            Luxury automotive excellence delivering exceptional vehicles from
            the UK to East Africa, with unparalleled service and attention to
            detail.
          </p>
          <div className="flex gap-4 text-gray-400">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-red-500 cursor-pointer" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="hover:text-red-500 cursor-pointer" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-red-500 cursor-pointer" />
            </a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="luxury-hover-gold">Home</Link></li>
            <li><Link to="/vehicle-browse-search" className="luxury-hover-gold">Our Collection</Link></li>
            <li><Link to="/about" className="luxury-hover-gold">About Us</Link></li>
            <li><Link to="/contacts" className="luxury-hover-gold">Contact</Link></li>
            <li><Link to="/privacy-policy" className="luxury-hover-gold">Privacy Policy</Link></li>
            <li><Link to="/terms" className="luxury-hover-gold">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Column 3 - Contact Us */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <p className="flex items-center gap-2 text-gray-400">
            <FaPhoneAlt className="text-red-500" /> 
            <a href="tel:+447964595923" className="hover:text-red-500">
              UK Office: +44 7964 595923
            </a>
          </p>
          <p className="flex items-center gap-2 text-gray-400">
            <FaPhoneAlt className="text-red-500" /> 
            <a href="tel:+254710966523" className="hover:text-red-500">
              East Africa Office: +254 710 966523
            </a>
          </p>
          <p className="flex items-center gap-2 text-gray-400">
            <FaEnvelope className="text-red-500" /> 
            <a href="mailto:info@royamotorsuk.com" className="hover:text-red-500">
              info@royamotorsuk.com
            </a>
          </p>
          <p className="flex items-center gap-2 text-gray-400">
            <FaMapMarkerAlt className="text-red-500" /> 
            39 Kinross drive, Bletchley, Milton Keynes, MK3 7UF
          </p>
        </div>

        {/* Column 4 - Business Hours */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
          <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p className="text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
          <p className="text-gray-400">Sunday: By Appointment</p>

          <h3 className="font-semibold text-lg mt-6 mb-2">We Accept</h3>
          <div className="flex gap-3">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-8" />
            <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="MasterCard" className="h-8" />
            <img src="https://img.icons8.com/ios-filled/50/bank-building.png" alt="Bank Transfer" className="h-8 invert" />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} RoyaMotorsUK. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
