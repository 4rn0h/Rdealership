import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeedCard = ({ activity }) => {
  const navigate = useNavigate();

  const getActivityConfig = (type) => {
    const configs = {
      vehicle_viewed: {
        icon: 'Eye',
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        title: 'Viewed Vehicle',
        action: 'viewed'
      },
      vehicle_favorited: {
        icon: 'Heart',
        color: 'text-error',
        bgColor: 'bg-error/10',
        title: 'Added to Favorites',
        action: 'favorited'
      },
      inquiry_sent: {
        icon: 'MessageSquare',
        color: 'text-success',
        bgColor: 'bg-success/10',
        title: 'Inquiry Sent',
        action: 'inquired about'
      },
      test_drive_scheduled: {
        icon: 'Calendar',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        title: 'Test Drive Scheduled',
        action: 'scheduled test drive for'
      },
      price_alert_created: {
        icon: 'Bell',
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        title: 'Price Alert Set',
        action: 'set price alert for'
      },
      search_saved: {
        icon: 'Search',
        color: 'text-muted-foreground',
        bgColor: 'bg-muted',
        title: 'Search Saved',
        action: 'saved search'
      }
    };
    return configs?.[type] || configs?.vehicle_viewed;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInMinutes = Math.floor((now - activityDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short'
    })?.format(activityDate);
  };

  const handleClick = () => {
    if (activity?.vehicle?.id) {
      navigate(`/vehicle-detail?id=${activity?.vehicle?.id}`);
    } else if (activity?.type === 'search_saved' && activity?.searchQuery) {
      navigate(`/vehicle-browse-search?q=${encodeURIComponent(activity?.searchQuery)}`);
    }
  };

  const config = getActivityConfig(activity?.type);

  return (
    <div 
      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 luxury-micro-transition cursor-pointer"
      onClick={handleClick}
    >
      {/* Activity Icon */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${config?.bgColor}`}>
        <Icon name={config?.icon} size={14} className={config?.color} />
      </div>
      {/* Activity Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-foreground">
              <span className="font-medium">{config?.title}</span>
              {activity?.vehicle && (
                <>
                  <span className="text-muted-foreground"> • {config?.action} </span>
                  <span className="font-medium">{activity?.vehicle?.name}</span>
                </>
              )}
              {activity?.type === 'search_saved' && activity?.searchQuery && (
                <>
                  <span className="text-muted-foreground"> • </span>
                  <span className="font-medium">"{activity?.searchQuery}"</span>
                </>
              )}
            </p>
            
            {activity?.details && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {activity?.details}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
            {activity?.vehicle?.image && (
              <div className="w-8 h-8 rounded overflow-hidden">
                <Image
                  src={activity?.vehicle?.image}
                  alt={activity?.vehicle?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(activity?.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeedCard;