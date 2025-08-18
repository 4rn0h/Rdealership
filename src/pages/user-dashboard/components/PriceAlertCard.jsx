import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PriceAlertCard = ({ alert, onToggleAlert, onRemoveAlert }) => {
  const navigate = useNavigate();

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(price);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })?.format(new Date(date));
  };

  const getPriceChange = () => {
    if (!alert?.previousPrice || alert?.previousPrice === alert?.currentPrice) {
      return null;
    }
    
    const change = alert?.currentPrice - alert?.previousPrice;
    const percentage = ((change / alert?.previousPrice) * 100)?.toFixed(1);
    
    return {
      amount: Math.abs(change),
      percentage: Math.abs(percentage),
      isDecrease: change < 0,
      isIncrease: change > 0
    };
  };

  const priceChange = getPriceChange();

  return (
    <div className="bg-card border border-border rounded-lg p-4 luxury-shadow-subtle hover:luxury-shadow-medium luxury-transition">
      <div className="flex items-start space-x-4">
        {/* Vehicle Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={alert?.vehicle?.image}
            alt={alert?.vehicle?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Alert Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-foreground line-clamp-1">
                {alert?.vehicle?.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                Alert created {formatDate(alert?.createdAt)}
              </p>
            </div>
            
            <button
              onClick={() => onToggleAlert(alert?.id)}
              className={`p-1 rounded luxury-micro-transition ${
                alert?.isActive
                  ? 'text-accent hover:text-accent/80' :'text-muted-foreground hover:text-foreground'
              }`}
              title={alert?.isActive ? 'Disable alert' : 'Enable alert'}
            >
              <Icon name={alert?.isActive ? "Bell" : "BellOff"} size={16} />
            </button>
          </div>

          {/* Current Price */}
          <div className="mb-2">
            <p className="text-lg font-bold text-accent">
              {formatPrice(alert?.currentPrice, alert?.currency)}
            </p>
            
            {/* Price Change */}
            {priceChange && (
              <div className={`flex items-center space-x-1 text-sm ${
                priceChange?.isDecrease ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={priceChange?.isDecrease ? "TrendingDown" : "TrendingUp"} 
                  size={12} 
                />
                <span>
                  {priceChange?.isDecrease ? '-' : '+'}
                  {formatPrice(priceChange?.amount, alert?.currency)} 
                  ({priceChange?.percentage}%)
                </span>
              </div>
            )}
          </div>

          {/* Target Price */}
          <div className="mb-3">
            <p className="text-sm text-muted-foreground">
              Target price: {formatPrice(alert?.targetPrice, alert?.currency)}
            </p>
            {alert?.currentPrice <= alert?.targetPrice && (
              <div className="flex items-center space-x-1 text-sm text-success mt-1">
                <Icon name="Target" size={12} />
                <span>Target reached!</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/vehicle-detail?id=${alert?.vehicle?.id}`)}
                iconName="Eye"
                iconPosition="left"
              >
                View Vehicle
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveAlert(alert?.id)}
              iconName="Trash2"
              iconPosition="left"
              className="text-error hover:text-error"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceAlertCard;