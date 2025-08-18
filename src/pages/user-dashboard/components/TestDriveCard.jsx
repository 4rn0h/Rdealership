import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TestDriveCard = ({ testDrive, onReschedule, onCancel }) => {
  const navigate = useNavigate();

  const getStatusConfig = (status) => {
    const configs = {
      scheduled: {
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        icon: 'Calendar',
        label: 'Scheduled'
      },
      confirmed: {
        color: 'text-success',
        bgColor: 'bg-success/10',
        icon: 'CheckCircle',
        label: 'Confirmed'
      },
      completed: {
        color: 'text-muted-foreground',
        bgColor: 'bg-muted',
        icon: 'Check',
        label: 'Completed'
      },
      cancelled: {
        color: 'text-error',
        bgColor: 'bg-error/10',
        icon: 'XCircle',
        label: 'Cancelled'
      }
    };
    return configs?.[status] || configs?.scheduled;
  };

  const formatDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    return {
      date: new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })?.format(dateObj),
      time: new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })?.format(dateObj)
    };
  };

  const isUpcoming = () => {
    const appointmentDateTime = new Date(`${testDrive.date}T${testDrive.time}`);
    return appointmentDateTime > new Date() && testDrive?.status !== 'cancelled';
  };

  const statusConfig = getStatusConfig(testDrive?.status);
  const formattedDateTime = formatDateTime(testDrive?.date, testDrive?.time);

  return (
    <div className="bg-card border border-border rounded-lg p-4 luxury-shadow-subtle hover:luxury-shadow-medium luxury-transition">
      <div className="flex items-start space-x-4">
        {/* Vehicle Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={testDrive?.vehicle?.image}
            alt={testDrive?.vehicle?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Test Drive Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-foreground line-clamp-1">
                {testDrive?.vehicle?.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                Booking #{testDrive?.id}
              </p>
            </div>
            
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig?.bgColor} ${statusConfig?.color}`}>
              <Icon name={statusConfig?.icon} size={12} />
              <span>{statusConfig?.label}</span>
            </div>
          </div>

          {/* Date and Time */}
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1 text-sm text-foreground">
              <Icon name="Calendar" size={14} className="text-accent" />
              <span>{formattedDateTime?.date}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-foreground">
              <Icon name="Clock" size={14} className="text-accent" />
              <span>{formattedDateTime?.time}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-1 mb-3 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>{testDrive?.location}</span>
          </div>

          {/* Sales Agent */}
          {testDrive?.salesAgent && (
            <div className="flex items-center space-x-1 mb-3 text-sm text-muted-foreground">
              <Icon name="User" size={14} />
              <span>with {testDrive?.salesAgent}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {isUpcoming() && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReschedule(testDrive?.id)}
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCancel(testDrive?.id)}
                    iconName="X"
                    iconPosition="left"
                    className="text-error hover:text-error"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/vehicle-detail?id=${testDrive?.vehicle?.id}`)}
              iconName="ArrowRight"
              iconPosition="right"
            >
              View Vehicle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDriveCard;