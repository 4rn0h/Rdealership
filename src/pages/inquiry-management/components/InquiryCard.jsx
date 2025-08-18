import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InquiryCard = ({ inquiry, onScheduleTestDrive, onSendFollowup, onMarkResolved, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'responded':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'scheduled':
        return 'bg-success/10 text-success border-success/20';
      case 'closed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg luxury-shadow-subtle overflow-hidden">
      {/* Mobile Card Layout */}
      <div className="lg:hidden">
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={inquiry?.vehicle?.image}
                alt={inquiry?.vehicle?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground text-sm truncate">
                    {inquiry?.vehicle?.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Inquiry #{inquiry?.id}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(inquiry?.status)}`}>
                  {inquiry?.status?.charAt(0)?.toUpperCase() + inquiry?.status?.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  {formatDate(inquiry?.createdAt)}
                </p>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 rounded hover:bg-muted luxury-micro-transition"
                >
                  <Icon 
                    name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-border p-4 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Your Message:</p>
              <p className="text-sm text-foreground bg-muted/50 p-3 rounded-lg">
                {inquiry?.message}
              </p>
            </div>
            
            {inquiry?.response && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Agent Response:</p>
                <div className="bg-accent/5 p-3 rounded-lg">
                  <p className="text-sm text-foreground mb-2">{inquiry?.response}</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-accent-foreground">
                        {inquiry?.agent?.name?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {inquiry?.agent?.name} • {formatDate(inquiry?.responseDate)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-2">
              {inquiry?.status !== 'closed' && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={() => onScheduleTestDrive(inquiry)}
                    fullWidth
                  >
                    Schedule Test Drive
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageSquare"
                    iconPosition="left"
                    onClick={() => onSendFollowup(inquiry)}
                    fullWidth
                  >
                    Send Follow-up
                  </Button>
                </>
              )}
              <Button
                variant="link"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={() => onViewDetails(inquiry)}
                fullWidth
              >
                View Full Details
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Desktop List Layout */}
      <div className="hidden lg:block">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={inquiry?.vehicle?.image}
                alt={inquiry?.vehicle?.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    {inquiry?.vehicle?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Inquiry #{inquiry?.id} • Created {formatDate(inquiry?.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(inquiry?.status)}`}>
                    {inquiry?.status?.charAt(0)?.toUpperCase() + inquiry?.status?.slice(1)}
                  </span>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 rounded-lg hover:bg-muted luxury-micro-transition"
                  >
                    <Icon 
                      name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                      size={18} 
                    />
                  </button>
                </div>
              </div>
              
              <div className="mt-2 flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Last activity: {formatDate(inquiry?.lastActivity)}
                  </span>
                </div>
                {inquiry?.agent && (
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Agent: {inquiry?.agent?.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {inquiry?.status !== 'closed' && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={() => onScheduleTestDrive(inquiry)}
                  >
                    Test Drive
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageSquare"
                    iconPosition="left"
                    onClick={() => onSendFollowup(inquiry)}
                  >
                    Follow-up
                  </Button>
                </>
              )}
              <Button
                variant="link"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={() => onViewDetails(inquiry)}
              >
                Details
              </Button>
            </div>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Your Message</h4>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-foreground">{inquiry?.message}</p>
                  </div>
                </div>
                
                {inquiry?.response && (
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Agent Response</h4>
                    <div className="bg-accent/5 p-4 rounded-lg">
                      <p className="text-sm text-foreground mb-3">{inquiry?.response}</p>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-accent-foreground">
                            {inquiry?.agent?.name?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{inquiry?.agent?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(inquiry?.responseDate)} at {formatTime(inquiry?.responseDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryCard;