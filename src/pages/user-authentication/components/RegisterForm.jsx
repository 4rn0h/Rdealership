// src/pages/user-authentication/components/RegisterForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";
import Icon from "../../../components/AppIcon";
import { supabase } from "../../../lib/supabaseClient";

const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const locationOptions = [
    { value: "kenya", label: "Kenya" },
    { value: "tanzania", label: "Tanzania" },
    { value: "uk", label: "United Kingdom" },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    else if (formData.fullName.trim().length < 2)
      newErrors.fullName = "Full name must be at least 2 characters";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone))
      newErrors.phone = "Please enter a valid phone number";
    if (!formData.location) newErrors.location = "Please select your location";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password))
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.acceptTerms)
      newErrors.acceptTerms = "You must accept the terms and conditions";

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

  const handleLocationChange = (value) => {
    setFormData((prev) => ({ ...prev, location: value }));
    if (errors.location) setErrors((prev) => ({ ...prev, location: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      // ✅ Supabase signup
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error || !data?.user) {
        console.warn("Supabase signup failed, falling back to mock", error);
        const userData = {
          id: "mock-" + formData.email, // ✅ ensure id exists
          email: formData.email,
          name: formData.fullName,
          phone: formData.phone,
          location: formData.location,
          role: "user",
          registrationTime: new Date().toISOString(),
        };
        if (onSuccess) onSuccess(userData);
        navigate("/user-dashboard");
        return;
      }

      const userId = data.user.id;

      // ✅ Create profile in Supabase
      await supabase.from("profiles").insert([
        {
          id: userId,
          full_name: formData.fullName,
          phone: formData.phone,
          location: formData.location,
          role: "user",
        },
      ]);

      const userData = {
        id: userId, // ✅ always included
        email: formData.email,
        name: formData.fullName,
        phone: formData.phone,
        location: formData.location,
        role: "user",
        registrationTime: new Date().toISOString(),
      };

      if (onSuccess) onSuccess(userData);
      navigate("/user-dashboard");
    } catch (err) {
      setErrors({ general: "Registration failed. Please try again." });
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
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleInputChange}
        error={errors.fullName}
        required
      />
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
        label="Phone Number"
        type="tel"
        name="phone"
        placeholder="+254 700 000 000"
        value={formData.phone}
        onChange={handleInputChange}
        error={errors.phone}
        required
      />
      <Select
        label="Location"
        placeholder="Select your location"
        options={locationOptions}
        value={formData.location}
        onChange={handleLocationChange}
        error={errors.location}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Create a strong password"
        description="Must contain uppercase, lowercase, and number"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        required
      />
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={errors.confirmPassword}
        required
      />
      <Checkbox
        label="I agree to the Terms and Conditions and Privacy Policy"
        name="acceptTerms"
        checked={formData.acceptTerms}
        onChange={handleInputChange}
        error={errors.acceptTerms}
        required
      />
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
