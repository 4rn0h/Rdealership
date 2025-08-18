import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onNewInquiry, onScheduleTestDrive, onViewFavorites, onContactSupport }) => {
  const actions = [
    {
      label: 'New Inquiry',
      icon: 'Plus',
      variant: 'default',
      onClick: onNewInquiry,
      description: 'Ask about a vehicle'
    },
    {
      label: 'Schedule Test Drive',
      icon: 'Calendar',
      variant: 'outline',
      onClick: onScheduleTestDrive,
      description: 'Book a test drive'
    },
    {
      label: 'View Favorites',
      icon: 'Heart',
      variant: 'ghost',
      onClick: onViewFavorites,
      description: 'See saved vehicles'
    },
    {
      label: 'Contact Support',
      icon: 'HelpCircle',
      variant: 'ghost',
      onClick: onContactSupport,
      description: 'Get help'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
      <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
      {/* Mobile Layout - 2x2 Grid */}
      <div className="lg:hidden grid grid-cols-2 gap-3">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            iconName={action?.icon}
            iconPosition="left"
            onClick={action?.onClick}
            className="h-auto p-3 flex-col items-center justify-center text-center"
          >
            <span className="text-sm font-medium">{action?.label}</span>
            <span className="text-xs opacity-75 mt-1">{action?.description}</span>
          </Button>
        ))}
      </div>
      {/* Desktop Layout - Horizontal */}
      <div className="hidden lg:flex lg:space-x-4">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            iconName={action?.icon}
            iconPosition="left"
            onClick={action?.onClick}
            className="flex-1"
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;