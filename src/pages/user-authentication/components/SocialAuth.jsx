import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const SocialAuth = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState({});
  const navigate = useNavigate();

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-500',
      bgColor: 'hover:bg-red-50'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50'
    }
  ];

  const handleSocialAuth = async (provider) => {
    setIsLoading(prev => ({ ...prev, [provider?.id]: true }));
    
    try {
      // Simulate social auth API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful social auth
      const userData = {
        email: `user@${provider?.id}.com`,
        name: `${provider?.name} User`,
        role: 'user',
        provider: provider?.id,
        loginTime: new Date()?.toISOString()
      };
      
      localStorage.setItem('RoyaMotorsUk_user', JSON.stringify(userData));
      
      if (onSuccess) {
        onSuccess(userData);
      }
      
      navigate('/user-dashboard');
      
    } catch (error) {
      console.error(`${provider?.name} authentication failed:`, error);
    } finally {
      setIsLoading(prev => ({ ...prev, [provider?.id]: false }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={() => handleSocialAuth(provider)}
            loading={isLoading?.[provider?.id]}
            iconName={provider?.icon}
            iconPosition="left"
            className="justify-center"
          >
            {provider?.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuth;