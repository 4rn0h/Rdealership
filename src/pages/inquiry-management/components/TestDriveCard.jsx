import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TestDriveCard = ({ testDrive, onReschedule, onCancel, onGetDirections }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'completed':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const isUpcoming = () => {
    return new Date(testDrive.scheduledDate) > new Date();
  };

  return (
    <div className="bg-card border border-border rounded-lg luxury-shadow-subtle overflow-hidden">
      {/* Mobile Layout */}
      <div className="lg:hidden p-4">
        <div className="flex items-start space-x-3">
          <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={testDrive?.vehicle?.image}
              alt={testDrive?.vehicle?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground text-sm">
                  {testDrive?.vehicle?.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Test Drive #{testDrive?.id}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(testDrive?.status)}`}>
                {testDrive?.status?.charAt(0)?.toUpperCase() + testDrive?.status?.slice(1)}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-accent" />
                <span className="text-xs text-foreground">
                  {formatDate(testDrive?.scheduledDate)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-accent" />
                <span className="text-xs text-foreground">
                  {formatTime(testDrive?.scheduledDate)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={14} className="text-accent" />
                <span className="text-xs text-foreground truncate">
                  {testDrive?.location?.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="User" size={14} className="text-accent" />
                <span className="text-xs text-foreground">
                  {testDrive?.agent?.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isUpcoming() && testDrive?.status !== 'cancelled' && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Navigation"
                iconPosition="left"
                onClick={() => onGetDirections(testDrive)}
                fullWidth
              >
                Get Directions
              </Button>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={() => onReschedule(testDrive)}
                  className="flex-1"
                >
                  Reschedule
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => onCancel(testDrive)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Desktop Layout */}
      <div className="hidden lg:block p-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={testDrive?.vehicle?.image}
              alt={testDrive?.vehicle?.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground text-lg">
                  {testDrive?.vehicle?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Test Drive #{testDrive?.id}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(testDrive?.status)}`}>
                {testDrive?.status?.charAt(0)?.toUpperCase() + testDrive?.status?.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatDate(testDrive?.scheduledDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatTime(testDrive?.scheduledDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">
                    {testDrive?.location?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} className="text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Agent</p>
                  <p className="text-sm font-medium text-foreground">
                    {testDrive?.agent?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isUpcoming() && testDrive?.status !== 'cancelled' && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Navigation"
                iconPosition="left"
                onClick={() => onGetDirections(testDrive)}
              >
                Directions
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => onReschedule(testDrive)}
              >
                Reschedule
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="X"
                iconPosition="left"
                onClick={() => onCancel(testDrive)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        {testDrive?.notes && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Notes:</p>
            <p className="text-sm text-foreground bg-muted/50 p-3 rounded-lg">
              {testDrive?.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDriveCard;