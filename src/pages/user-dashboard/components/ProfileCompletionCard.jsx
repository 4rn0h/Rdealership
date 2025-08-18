import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileCompletionCard = ({ completionData, onDismiss }) => {
  const navigate = useNavigate();

  const { percentage, completedSteps, totalSteps, missingSteps } = completionData;

  const getStepIcon = (stepType) => {
    const icons = {
      personal_info: 'User',
      preferences: 'Settings',
      contact_details: 'Phone',
      location: 'MapPin',
      budget_range: 'DollarSign',
      vehicle_preferences: 'Car',
      profile_photo: 'Camera'
    };
    return icons?.[stepType] || 'CheckCircle';
  };

  const getStepLabel = (stepType) => {
    const labels = {
      personal_info: 'Personal Information',
      preferences: 'Vehicle Preferences',
      contact_details: 'Contact Details',
      location: 'Location',
      budget_range: 'Budget Range',
      vehicle_preferences: 'Preferred Brands',
      profile_photo: 'Profile Photo'
    };
    return labels?.[stepType] || stepType?.replace('_', ' ');
  };

  const handleCompleteStep = (stepType) => {
    // Navigate to appropriate section based on step type
    navigate('/user-dashboard?section=profile&step=' + stepType);
  };

  if (percentage >= 90) {
    return null; // Don't show if profile is mostly complete
  }

  return (
    <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-6 luxury-shadow-subtle">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              Complete Your Profile
            </h3>
            <p className="text-sm text-muted-foreground">
              Get better vehicle recommendations
            </p>
          </div>
        </div>
        
        <button
          onClick={onDismiss}
          className="text-muted-foreground hover:text-foreground luxury-micro-transition"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {completedSteps} of {totalSteps} completed
          </span>
          <span className="text-sm font-bold text-accent">
            {percentage}%
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-accent rounded-full h-2 luxury-transition"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      {/* Missing Steps */}
      <div className="space-y-2 mb-4">
        <p className="text-sm font-medium text-foreground">Still needed:</p>
        {missingSteps?.slice(0, 3)?.map((step) => (
          <button
            key={step}
            onClick={() => handleCompleteStep(step)}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-accent/10 luxury-micro-transition text-left"
          >
            <div className="flex items-center space-x-2">
              <Icon name={getStepIcon(step)} size={14} className="text-accent" />
              <span className="text-sm text-foreground">{getStepLabel(step)}</span>
            </div>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          </button>
        ))}
        
        {missingSteps?.length > 3 && (
          <p className="text-xs text-muted-foreground text-center">
            +{missingSteps?.length - 3} more steps
          </p>
        )}
      </div>
      {/* Action Button */}
      <Button
        variant="default"
        size="sm"
        onClick={() => navigate('/user-dashboard?section=profile')}
        iconName="ArrowRight"
        iconPosition="right"
        className="w-full"
      >
        Complete Profile
      </Button>
    </div>
  );
};

export default ProfileCompletionCard;