// src/components/layout/Header.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient"; // adjust path if needed
import Icon from "../AppIcon";
import { FaPhoneAlt, FaUserCircle, FaCar } from "react-icons/fa";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Supabase session check + listener
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error.message);
        setUser(null);
      } else {
        setUser(data.session?.user ?? null);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Left nav
  const leftNavItems = [
    { label: "Home", path: "/" },
    { label: "Our Collection", path: "/vehicle-browse-search" },
  ];

  // Right nav
  const rightNavItems = [
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contacts" },
  ];

  // Role-based items (optional: adjust roles from Supabase metadata if needed)
  const roleNavItems = [
    {
      label: "My Dashboard",
      path: "/user-dashboard",
      icon: "LayoutDashboard",
      roles: ["user", "admin"],
    },
    {
      label: "Inquiries",
      path: "/inquiry-management",
      icon: "MessageSquare",
      roles: ["user", "admin"],
    },
    {
      label: "Admin",
      path: "/admin-vehicle-management",
      icon: "Settings",
      roles: ["admin"],
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // ✅ Sign In / Sign Out via Supabase
  const handleAuthAction = async () => {
    if (user) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message);
      }
      setUser(null);
      navigate("/");
    } else {
      navigate("/user-authentication");
    }
    setIsMobileMenuOpen(false);
  };

  const getUserRole = () =>
    user?.user_metadata?.role || "public"; // Supabase stores custom claims here
  const getVisibleNavItems = () =>
    roleNavItems.filter((item) => item.roles.includes(getUserRole()));
  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border luxury-shadow-subtle">
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        {/* LEFT (Logo) */}
        <div className="flex items-center">
          <div
            className="flex items-center cursor-pointer luxury-hover-gold luxury-micro-transition"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <FaCar className="text-primary text-2xl md:text-3xl z-10 relative" />
                <div className="absolute -inset-2 md:-inset-3 bg-accent rounded-full opacity-20"></div>
              </div>
              <span className="text-xl md:text-2xl font-playfair font-bold text-primary md:hidden">
                ROYAMOTORSUK
              </span>
            </div>
          </div>

          {/* Left Nav - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1 ml-6">
            {leftNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`px-3 py-2 rounded-lg font-medium luxury-micro-transition relative group ${
                  isActivePath(item.path)
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                    isActivePath(item.path) ? "w-full" : ""
                  }`}
                ></span>
              </button>
            ))}
          </nav>
        </div>

        {/* CENTER (Brand Name - Desktop) */}
        <div
          className="hidden md:flex flex-0 text-center cursor-pointer luxury-hover-gold luxury-micro-transition"
          onClick={() => navigate("/")}
        >
          <h1 className="text-xl md:text-2xl font-playfair font-bold text-primary">
            ROYAMOTORSUK
          </h1>
        </div>

        {/* RIGHT (Navigation + Controls) */}
        <div className="flex items-center justify-end space-x-4">
          {/* Right Nav - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {rightNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`px-3 py-2 rounded-lg font-medium luxury-micro-transition relative group ${
                  isActivePath(item.path)
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                    isActivePath(item.path) ? "w-full" : ""
                  }`}
                ></span>
              </button>
            ))}

            {/* Role-based links */}
            {getVisibleNavItems()?.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg luxury-micro-transition relative group ${
                  isActivePath(item.path)
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-medium">{item.label}</span>
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                    isActivePath(item.path) ? "w-full" : ""
                  }`}
                ></span>
              </button>
            ))}
          </nav>

          {/* User icon */}
          <button
            onClick={handleAuthAction}
            className="text-foreground hover:text-accent luxury-micro-transition p-1 md:p-2 rounded-lg hover:bg-muted"
            aria-label={user ? "Sign out" : "Sign in"}
          >
            <FaUserCircle className="text-xl md:text-2xl" />
          </button>

          {/* Phone CTA - Desktop */}
          <a
            href="tel:+447964595923"
            className="hidden md:flex bg-primary px-3 py-2 rounded-lg items-center space-x-2 text-primary-foreground hover:bg-primary/90 luxury-micro-transition luxury-shadow-subtle"
          >
            <FaPhoneAlt className="text-sm" />
            <span className="text-sm font-medium">+44 7964 595923</span>
          </a>

          {/* Phone CTA - Mobile */}
          <a
            href="tel:+447964595923"
            className="md:hidden bg-primary p-2 rounded-lg flex items-center text-primary-foreground hover:bg-primary/90 luxury-micro-transition luxury-shadow-subtle"
            aria-label="Call us"
          >
            <FaPhoneAlt className="text-sm" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted luxury-micro-transition"
            aria-label="Toggle menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40">
          <div className="bg-background border-t border-border">
            <nav className="px-6 py-6 space-y-4">
              {[...leftNavItems, ...rightNavItems].map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-lg luxury-micro-transition ${
                    isActivePath(item.path)
                      ? "text-accent bg-accent/10"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {getVisibleNavItems().map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`block w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-lg luxury-micro-transition ${
                    isActivePath(item.path)
                      ? "text-accent bg-accent/10"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}

              <div className="pt-4 border-t border-border mt-4">
                {/* Phone CTA */}
                <a
                  href="tel:+447964595923"
                  className="block bg-primary px-4 py-3 rounded-lg flex items-center justify-center space-x-2 text-primary-foreground hover:bg-primary/90 mb-4"
                >
                  <FaPhoneAlt />
                  <span>+44 7964 595923</span>
                </a>

                {/* Auth */}
                <button
                  onClick={handleAuthAction}
                  className="block w-full px-4 py-3 rounded-lg hover:bg-muted luxury-micro-transition text-foreground flex items-center justify-center space-x-2"
                >
                  <FaUserCircle className="text-xl" />
                  <span className="font-medium">
                    {user ? "Sign Out" : "Sign In"}
                  </span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
