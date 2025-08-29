import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onForgotPassword, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for different user types
  const mockCredentials = {
    'admin@RoyaMotorsUk.com': { password: 'admin123', role: 'admin', name: 'Admin User' },
    'agent@RoyaMotorsUk.com': { password: 'agent123', role: 'agent', name: 'Sales Agent' },
    'user@RoyaMotorsUk.com': { password: 'user123', role: 'user', name: 'John Doe' }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      const mockUser = mockCredentials?.[formData?.email];
      if (!mockUser || mockUser?.password !== formData?.password) {
        setErrors({ 
          general: 'Invalid email or password. Try: admin@RoyaMotorsUk.com / admin123, agent@RoyaMotorsUk.com / agent123, or user@RoyaMotorsUk.com / user123' 
        });
        return;
      }
      
      // Store user data
      const userData = {
        email: formData?.email,
        name: mockUser?.name,
        role: mockUser?.role,
        loginTime: new Date()?.toISOString()
      };
      
      localStorage.setItem('RoyaMotorsUk_user', JSON.stringify(userData));
      
      // Success callback
      if (onSuccess) {
        onSuccess(userData);
      }
      
      // Redirect based on role
      switch (mockUser?.role) {
        case 'admin': navigate('/admin-vehicle-management');
          break;
        case 'agent': navigate('/inquiry-management');
          break;
        default:
          navigate('/user-dashboard');
      }
      
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors?.general && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        </div>
      )}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={handleInputChange}
        error={errors?.password}
        required
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
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