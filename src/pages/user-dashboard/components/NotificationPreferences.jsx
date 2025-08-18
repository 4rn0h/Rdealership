import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const NotificationPreferences = ({ preferences, onSave }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [isSaving, setIsSaving] = useState(false);

  const notificationTypes = [
    {
      id: 'priceDrops',
      label: 'Price Drop Alerts',
      description: 'Get notified when favorited vehicles drop in price',
      icon: 'TrendingDown'
    },
    {
      id: 'newArrivals',
      label: 'New Arrivals',
      description: 'Be the first to know about new luxury vehicles',
      icon: 'Plus'
    },
    {
      id: 'inquiryResponses',
      label: 'Inquiry Responses',
      description: 'Notifications when sales agents respond to your inquiries',
      icon: 'MessageSquare'
    },
    {
      id: 'testDriveReminders',
      label: 'Test Drive Reminders',
      description: 'Reminders about upcoming test drive appointments',
      icon: 'Calendar'
    },
    {
      id: 'marketingUpdates',
      label: 'Marketing Updates',
      description: 'Special offers, promotions, and dealership news',
      icon: 'Mail'
    },
    {
      id: 'weeklyDigest',
      label: 'Weekly Digest',
      description: 'Summary of new vehicles matching your preferences',
      icon: 'FileText'
    }
  ];

  const handlePreferenceChange = (id, checked) => {
    setLocalPreferences(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(localPreferences);
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = JSON.stringify(localPreferences) !== JSON.stringify(preferences);

  return (
    <div className="bg-card border border-border rounded-lg p-6 luxury-shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-semibold text-foreground mb-1">
            Notification Preferences
          </h3>
          <p className="text-sm text-muted-foreground">
            Choose how you'd like to be notified about important updates
          </p>
        </div>
        <Icon name="Settings" size={20} className="text-accent" />
      </div>
      <div className="space-y-4">
        {notificationTypes?.map((type) => (
          <div key={type?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 luxury-micro-transition">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Icon name={type?.icon} size={14} className="text-accent" />
            </div>
            
            <div className="flex-1">
              <Checkbox
                label={type?.label}
                description={type?.description}
                checked={localPreferences?.[type?.id] || false}
                onChange={(e) => handlePreferenceChange(type?.id, e?.target?.checked)}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Email Frequency */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-3">Email Frequency</h4>
        <div className="space-y-2">
          {['immediate', 'daily', 'weekly']?.map((frequency) => (
            <label key={frequency} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="emailFrequency"
                value={frequency}
                checked={localPreferences?.emailFrequency === frequency}
                onChange={(e) => handlePreferenceChange('emailFrequency', e?.target?.value)}
                className="w-4 h-4 text-accent border-border focus:ring-accent focus:ring-2"
              />
              <span className="text-sm text-foreground capitalize">{frequency}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Save Button */}
      {hasChanges && (
        <div className="mt-6 pt-6 border-t border-border">
          <Button
            variant="default"
            onClick={handleSave}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Save Preferences
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPreferences;