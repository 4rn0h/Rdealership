import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Mock user authentication state
  useEffect(() => {
    const mockUser = localStorage.getItem("RoyaMotorsUk_user");
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
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

  // Role-based items
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

  const handleAuthAction = () => {
    if (user) {
      localStorage.removeItem("RoyaMotorsUk_user");
      setUser(null);
      navigate("/");
    } else {
      navigate("/user-authentication");
    }
    setIsMobileMenuOpen(false);
  };

  const getUserRole = () => user?.role || "public";
  const getVisibleNavItems = () =>
    roleNavItems.filter((item) => item.roles.includes(getUserRole()));
  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border luxury-shadow-subtle">
      <div className="flex items-center justify-between h-16 px-6">
        {/* LEFT (Logo + Left Nav) */}
        <div className="flex flex-1 items-center space-x-6">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer luxury-hover-gold luxury-micro-transition"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-luxury-gradient rounded-lg flex items-center justify-center">
              <Icon name="Car" size={24} color="#F5F5F5" />
            </div>
          </div>

          {/* Left Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {leftNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`px-3 py-2 rounded-lg font-medium luxury-micro-transition ${
                  isActivePath(item.path)
                    ? "text-accent bg-accent/10"
                    : "text-foreground hover:text-accent hover:bg-accent/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* CENTER (Brand) */}
        <div
          className="flex-0 text-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-xl font-heading font-bold text-red-600">
            ROYAMOTORSUK
          </h1>
        </div>

        {/* RIGHT (Right Nav + User + Phone) */}
        <div className="flex flex-1 items-center justify-end space-x-6">
          {/* Right Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {rightNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`px-3 py-2 rounded-lg font-medium luxury-micro-transition ${
                  isActivePath(item.path)
                    ? "text-accent bg-accent/10"
                    : "text-foreground hover:text-accent hover:bg-accent/5"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Role-based links */}
            {getVisibleNavItems()?.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg luxury-micro-transition ${
                  isActivePath(item.path)
                    ? "text-accent bg-accent/10"
                    : "text-foreground hover:text-accent hover:bg-accent/5"
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User icon */}
          <button
            onClick={handleAuthAction}
            className="flex items-center space-x-2 text-foreground hover:text-accent"
          >
            <FaUserCircle className="text-2xl" />
          </button>

          {/* Phone CTA */}
          <a
            href="tel:+447964595923"
            className="bg-red-600 px-3 py-1 rounded flex items-center space-x-2 text-white hover:bg-red-700"
          >
            <FaPhoneAlt /> <span>+44 7964 595923</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-muted luxury-micro-transition"
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40">
          <div className="bg-background border-t border-border">
            <nav className="px-6 py-4 space-y-4">
              {[...leftNavItems, ...rightNavItems].map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`block w-full text-left px-4 py-2 rounded-lg ${
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
                  className={`block w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                    isActivePath(item.path)
                      ? "text-accent bg-accent/10"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}

              {/* Phone CTA */}
              <a
                href="tel:+447964595923"
                className="block bg-red-600 px-3 py-2 rounded flex items-center space-x-2 text-white hover:bg-red-700"
              >
                <FaPhoneAlt /> <span>+44 7964 595923</span>
              </a>

              {/* Auth */}
              <button
                onClick={handleAuthAction}
                className="block w-full px-4 py-2 rounded-lg hover:bg-muted luxury-micro-transition"
              >
                {user ? "Sign Out" : "Sign In"}
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
