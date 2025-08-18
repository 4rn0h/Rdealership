import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ action, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (action?.path) {
      navigate(action?.path);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 luxury-shadow-subtle hover:luxury-shadow-medium luxury-transition group">
      <div className="text-center">
        {/* Icon */}
        <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${action?.bgColor} group-hover:scale-110 luxury-transition`}>
          <Icon name={action?.icon} size={24} className={action?.color} />
        </div>

        {/* Title and Description */}
        <h3 className="font-heading font-semibold text-foreground mb-2">
          {action?.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {action?.description}
        </p>

        {/* Action Button */}
        <Button
          variant={action?.variant || "outline"}
          size="sm"
          onClick={handleClick}
          iconName={action?.buttonIcon || action?.icon}
          iconPosition="left"
          className="w-full"
        >
          {action?.buttonText}
        </Button>

        {/* Badge/Counter */}
        {action?.badge && (
          <div className="mt-3">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${action?.badge?.bgColor} ${action?.badge?.color}`}>
              {action?.badge?.icon && <Icon name={action?.badge?.icon} size={12} className="mr-1" />}
              {action?.badge?.text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActionCard;