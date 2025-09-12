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
    <footer className="bg-background text-foreground border-t border-border pt-16 mt-24">
      <div className="container-custom grid md:grid-cols-4 gap-10">
        
        {/* Column 1 - Logo & About */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <FaCar className="text-primary text-3xl z-10 relative" />
              <div className="absolute -inset-3 bg-accent rounded-full opacity-20"></div>
            </div>
            <h2 className="text-2xl font-playfair font-bold text-primary">ROYAMOTORSUK</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Luxury automotive excellence delivering exceptional vehicles from
            the UK to East Africa, with unparalleled service and attention to
            detail.
          </p>
          <div className="flex gap-5">
            <a href="https://instagram.com/RoyaMotorsUK" target="_blank" rel="noopener noreferrer" className="luxury-hover-gold luxury-micro-transition text-muted-foreground hover:text-accent">
              <FaInstagram className="text-xl" />
            </a>
            <a href="https://facebook.com/RoyaMotorsUK" target="_blank" rel="noopener noreferrer" className="luxury-hover-gold luxury-micro-transition text-muted-foreground hover:text-accent">
              <FaFacebook className="text-xl" />
            </a>
            <a href="https://twitter.com/RoyaMotorsUK" target="_blank" rel="noopener noreferrer" className="luxury-hover-gold luxury-micro-transition text-muted-foreground hover:text-accent">
              <FaTwitter className="text-xl" />
            </a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="font-playfair font-semibold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-accent">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Home", path: "/" },
              { name: "Our Collection", path: "/vehicle-browse-search" },
              { name: "About Us", path: "/about" },
              { name: "Contact", path: "/contacts" },
              { name: "Privacy Policy", path: "/privacy-policy" },
              { name: "Terms & Conditions", path: "/terms" }
            ].map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.path} 
                  className="text-muted-foreground luxury-hover-gold luxury-micro-transition hover:text-accent block py-1"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Contact Us */}
        <div>
          <h3 className="font-playfair font-semibold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-accent">
            Contact Us
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-accent mt-1 flex-shrink-0" /> 
              <a href="tel:+447964595923" className="text-muted-foreground luxury-hover-gold luxury-micro-transition hover:text-accent block">
                UK Office: +44 7964 595923
              </a>
            </div>
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-accent mt-1 flex-shrink-0" /> 
              <a href="tel:+254710966523" className="text-muted-foreground luxury-hover-gold luxury-micro-transition hover:text-accent block">
                East Africa Office: +254 710 966523
              </a>
            </div>
            <div className="flex items-start gap-3">
              <FaEnvelope className="text-accent mt-1 flex-shrink-0" /> 
              <a href="mailto:info@royamotorsuk.com" className="text-muted-foreground luxury-hover-gold luxury-micro-transition hover:text-accent block">
                info@royamotorsuk.com
              </a>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-accent mt-1 flex-shrink-0" /> 
              <span className="text-muted-foreground">
                39 Kinross drive, Bletchley, Milton Keynes, MK3 7UF
              </span>
            </div>
          </div>
        </div>

        {/* Column 4 - Business Hours */}
        <div>
          <h3 className="font-playfair font-semibold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-accent">
            Business Hours
          </h3>
          <div className="space-y-2 text-muted-foreground mb-6">
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: By Appointment</p>
          </div>

          <h3 className="font-playfair font-semibold text-lg mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-accent">
            We Accept
          </h3>
          <div className="flex gap-4">
            <div className="bg-card p-2 rounded luxury-shadow-subtle">
              <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6" />
            </div>
            <div className="bg-card p-2 rounded luxury-shadow-subtle">
              <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="MasterCard" className="h-6" />
            </div>
            <div className="bg-card p-2 rounded luxury-shadow-subtle invert opacity-80">
              <img src="https://img.icons8.com/ios-filled/50/bank-building.png" alt="Bank Transfer" className="h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-12 pt-6 pb-8 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} RoyaMotorsUK. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;