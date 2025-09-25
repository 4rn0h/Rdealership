// src/pages/user-authentication/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Icon from "../../components/AppIcon";
import AuthTabs from "./components/AuthTabs";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import SocialAuth from "./components/SocialAuth";
import TrustSignals from "./components/TrustSignals";
import { supabase } from "../../lib/supabaseClient";
import { FaCar } from "react-icons/fa";

const UserAuthentication = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Centralized redirect function
  const redirectByRole = (role, name) => {
    switch (role) {
      case "admin":
        navigate("/admin-vehicle-management");
        break;
      case "sales_agent":
        navigate("/inquiry-management");
        break;
      default:
        navigate("/user-dashboard");
    }
    setAuthSuccess({ name, role });
  };

  // ✅ Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        console.log("🔍 Supabase session:", session);

        if (session?.user && !error) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role, full_name")
            .eq("id", session.user.id) // ✅ FIXED
            .single();

          let role = profile?.role || "user"; // ✅ normalized
          let name = profile?.full_name || session.user.email;

          // fallback for admin
          if (!profile?.role && session.user.email === "admin@royamotorsuk.com") {
            role = "admin";
          }

          console.log("🔍 Loaded profile:", profile);
          redirectByRole(role, name);
          return;
        }

        // 2. Fallback → Local mock
        const existingUser = localStorage.getItem("RoyaMotorsUk_user");
        if (existingUser) {
          const userData = JSON.parse(existingUser);
          redirectByRole(userData?.role, userData?.name);
          return;
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // ✅ Handle successful authentication
  const handleAuthSuccess = async (userData) => {
    setAuthSuccess(userData);

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", userData.id) // ✅ FIXED
        .single();

      let role = profile?.role || "user"; // ✅ normalized
      let name = profile?.full_name || userData.email;

      if (!profile?.role && userData.email === "admin@royamotorsuk.com") {
        role = "admin";
      }

      redirectByRole(role, name);
    } catch (err) {
      console.error("Post-login redirect failed:", err);
      navigate("/user-dashboard"); // safe fallback
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // ✅ Custom loader branding
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <h2 className="text-xl font-heading font-bold text-primary">
          Luxury Automotive Excellence
        </h2>
      </div>
    );
  }

  if (authSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Welcome, {authSuccess?.name}!
            </h2>
            <p className="text-muted-foreground">
              Redirecting you to your dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Sign In | RoyaMotorsUk Kenya - Premium Vehicle Authentication
        </title>
        <meta
          name="description"
          content="Sign in to your RoyaMotorsUk Kenya account to access personalized features, save favorites, and manage vehicle inquiries. Secure authentication for premium automotive experience."
        />
        <meta
          name="keywords"
          content="RoyaMotorsUk login, Kenya car dealership, vehicle authentication, luxury cars signin"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={handleBack}
              className="p-2 rounded-lg hover:bg-muted luxury-micro-transition"
            >
              <Icon name="ArrowLeft" size={24} />
            </button>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <FaCar className="text-primary text-xl z-10 relative" />
                <div className="absolute -inset-2 bg-accent rounded-full opacity-20"></div>
              </div>
              <span className="font-heading font-bold text-foreground">
                ROYAMOTORSUK
              </span>
            </div>

            <div className="w-10"></div>
          </div>
        </div>

        <div className="flex min-h-screen">
          {/* Left Side - Form */}
          <div className="flex-1 flex items-center justify-center p-4 pt-20 lg:pt-4">
            <div className="w-full max-w-md space-y-6">
              {/* Desktop Logo */}
              <div className="hidden lg:block text-center mb-8">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <div className="relative">
                    <FaCar className="text-primary text-3xl z-10 relative" />
                    <div className="absolute -inset-3 bg-accent rounded-full opacity-20"></div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-heading font-bold text-primary">
                      ROYAMOTORSUK
                    </h1>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  Premium Automotive Experience
                </p>
              </div>

              {/* Auth Tabs */}
              <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

              {/* Auth Forms */}
              <div className="bg-card border border-border rounded-lg p-6 luxury-shadow-medium">
                {activeTab === "login" ? (
                  <LoginForm
                    onForgotPassword={() => setShowForgotPassword(true)}
                    onSuccess={handleAuthSuccess}
                  />
                ) : (
                  <RegisterForm onSuccess={handleAuthSuccess} />
                )}
              </div>

              {/* Social Authentication */}
              <div className="bg-card border border-border rounded-lg p-6 luxury-shadow-medium">
                <SocialAuth onSuccess={handleAuthSuccess} />
              </div>

              {/* Mobile Trust Signals */}
              <div className="lg:hidden bg-card border border-border rounded-lg p-6 luxury-shadow-medium">
                <TrustSignals />
              </div>
            </div>
          </div>

          {/* Right Side - Trust Signals (Desktop Only) */}
          <div className="hidden lg:flex w-96 bg-card border-l border-border p-8 flex-col justify-center">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
                  Join Our East Africa's Premier Luxury Car Community
                </h2>
                <p className="text-muted-foreground text-sm">
                  Experience the finest in automotive excellence with
                  personalized service and exclusive access to premium vehicles.
                </p>
              </div>

              <TrustSignals />

              {/* Contact Info */}
              <div className="pt-6 border-t border-border">
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  Need Help?
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={14} className="text-accent" />
                    <span className="text-xs text-muted-foreground">
                      +44 7964 595923
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={14} className="text-accent" />
                    <span className="text-xs text-muted-foreground">
                      support@Royamotorsuk.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="MessageCircle"
                      size={14}
                      className="text-accent"
                    />
                    <span className="text-xs text-muted-foreground">
                      Live Chat Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Forgot Password Modal */}
        <ForgotPasswordModal
          isOpen={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
        />
      </div>
    </>
  );
};

export default UserAuthentication;
