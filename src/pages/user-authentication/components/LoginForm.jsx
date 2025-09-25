// src/pages/user-authentication/components/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Checkbox } from "../../../components/ui/Checkbox";
import Icon from "../../../components/AppIcon";
import { supabase } from "../../../lib/supabaseClient";

const LoginForm = ({ onForgotPassword, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Offline mock credentials
  const mockCredentials = {
    "admin@Royamotorsuk.com": {
      password: "admin123",
      role: "admin",
      name: "Admin User",
    },
    "agent@Royamotorsuk.com": {
      password: "agent123",
      role: "sales_agent",
      name: "Sales Agent",
    },
    "user@Royamotorsuk.com": {
      password: "user123",
      role: "user",
      name: "John Doe",
    },
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      // ✅ Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error || !data?.user) {
        // 🔄 Fallback → mock login
        const mockUser = mockCredentials?.[formData.email];
        if (!mockUser || mockUser.password !== formData.password) {
          setErrors({
            general: "Invalid email or password. Try admin@Royamotorsuk.com / admin123",
          });
          return;
        }
        const userData = {
          id: "mock-" + formData.email, // ✅ ensure id exists
          email: formData.email,
          name: mockUser.name,
          role: mockUser.role,
          loginTime: new Date().toISOString(),
        };
        if (onSuccess) onSuccess(userData);

        switch (mockUser.role) {
          case "admin":
            navigate("/admin-vehicle-management");
            break;
          case "sales_agent":
            navigate("/inquiry-management");
            break;
          default:
            navigate("/user-dashboard");
        }
        return;
      }

      const userId = data.user.id;

      // ✅ Fetch profile
      let { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", userId)
        .single();

      // 🔄 Auto-create profile if missing
      if (profileError || !profile) {
        await supabase.from("profiles").insert([
          {
            id: userId,
            full_name: data.user.email.split("@")[0],
            role: "user",
          },
        ]);
        const { data: newProfile } = await supabase
          .from("profiles")
          .select("role, full_name")
          .eq("id", userId)
          .single();
        profile = newProfile;
      }

      const userData = {
        id: userId, // ✅ always included
        email: data.user.email,
        name: profile?.full_name || data.user.email,
        role: profile?.role || "user",
        loginTime: new Date().toISOString(),
      };

      if (onSuccess) onSuccess(userData);

      switch (userData.role) {
        case "admin":
          navigate("/admin-vehicle-management");
          break;
        case "sales_agent":
          navigate("/inquiry-management");
          break;
        default:
          navigate("/user-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrors({ general: "Unexpected login error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
            <p className="text-sm text-error">{errors.general}</p>
          </div>
        </div>
      )}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        required
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleInputChange}
        />
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-accent hover:text-accent/80 luxury-micro-transition"
        >
          Forgot Password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="left"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
