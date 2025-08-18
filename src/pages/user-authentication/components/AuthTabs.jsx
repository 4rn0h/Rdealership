import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Sign In', icon: 'LogIn' },
    { id: 'register', label: 'Register', icon: 'UserPlus' }
  ];

  return (
    <div className="flex bg-muted rounded-lg p-1 mb-6">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md luxury-micro-transition ${
            activeTab === tab?.id
              ? 'bg-background text-foreground luxury-shadow-subtle'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name={tab?.icon} size={18} />
          <span className="font-medium">{tab?.label}</span>
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;