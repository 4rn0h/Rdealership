import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Mock user authentication state
  useEffect(() => {
    const mockUser = localStorage.getItem('luxauto_user');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
  }, []);

  const navigationItems = [
    {
      label: 'Browse Vehicles',
      path: '/vehicle-browse-search',
      icon: 'Car',
      roles: ['public', 'user', 'admin']
    },
    {
      label: 'My Dashboard',
      path: '/user-dashboard',
      icon: 'LayoutDashboard',
      roles: ['user', 'admin']
    },
    {
      label: 'Inquiries',
      path: '/inquiry-management',
      icon: 'MessageSquare',
      roles: ['user', 'admin']
    },
    {
      label: 'Admin',
      path: '/admin-vehicle-management',
      icon: 'Settings',
      roles: ['admin']
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleAuthAction = () => {
    if (user) {
      localStorage.removeItem('luxauto_user');
      setUser(null);
      navigate('/');
    } else {
      navigate('/user-authentication');
    }
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const getUserRole = () => {
    return user?.role || 'public';
  };

  const getVisibleNavItems = () => {
    const userRole = getUserRole();
    return navigationItems?.filter(item => item?.roles?.includes(userRole));
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border luxury-shadow-subtle">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer luxury-hover-gold luxury-micro-transition"
          onClick={() => navigate('/')}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-luxury-gradient rounded-lg flex items-center justify-center">
              <Icon name="Car" size={24} color="#F5F5F5" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-bold text-foreground">
                LuxAuto
              </h1>
              <p className="text-xs font-caption text-muted-foreground -mt-1">
                Kenya
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {getVisibleNavItems()?.slice(0, 4)?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg luxury-micro-transition ${
                isActivePath(item?.path)
                  ? 'text-accent bg-accent/10' :'text-foreground hover:text-accent hover:bg-accent/5'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span className="font-medium">{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Desktop User Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted luxury-micro-transition"
              >
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-accent-foreground">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                </div>
                <Icon name="ChevronDown" size={16} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg luxury-shadow-medium">
                  <div className="py-2">
                    <button
                      onClick={() => handleNavigation('/user-dashboard')}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-muted luxury-micro-transition"
                    >
                      <Icon name="User" size={16} />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={handleAuthAction}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-muted luxury-micro-transition text-error"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={handleAuthAction}
              iconName="LogIn"
              iconPosition="left"
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-muted luxury-micro-transition"
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40">
          <div className="bg-background border-t border-border">
            <nav className="px-6 py-4 space-y-2">
              {getVisibleNavItems()?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg luxury-micro-transition ${
                    isActivePath(item?.path)
                      ? 'text-accent bg-accent/10' :'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              ))}
              
              <div className="border-t border-border pt-4 mt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-4 py-2">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-accent-foreground">
                          {user?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user?.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleAuthAction}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted luxury-micro-transition text-error"
                    >
                      <Icon name="LogOut" size={20} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAuthAction}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted luxury-micro-transition"
                  >
                    <Icon name="LogIn" size={20} />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;