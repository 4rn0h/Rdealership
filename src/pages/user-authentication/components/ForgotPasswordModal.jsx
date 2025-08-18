import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/?.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-card border border-border rounded-lg luxury-shadow-prominent">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Reset Password
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-muted luxury-micro-transition"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="CheckCircle" size={32} className="text-success" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Email Sent!
                </h3>
                <p className="text-muted-foreground text-sm">
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Please check your inbox and follow the instructions.
                </p>
              </div>
              <Button
                variant="default"
                onClick={handleClose}
                fullWidth
              >
                Got it
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-muted-foreground text-sm">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
              
              {error && (
                <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
                    <p className="text-sm text-error">{error}</p>
                  </div>
                </div>
              )}
              
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e?.target?.value);
                  setError('');
                }}
                required
              />
              
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  loading={isLoading}
                  iconName="Send"
                  iconPosition="left"
                  fullWidth
                >
                  Send Reset Link
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;