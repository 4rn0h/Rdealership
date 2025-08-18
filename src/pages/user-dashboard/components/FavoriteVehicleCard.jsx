import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FavoriteVehicleCard = ({ vehicle, onRemoveFavorite, onPriceAlert }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/vehicle-detail?id=${vehicle?.id}`);
  };

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden luxury-shadow-subtle hover:luxury-shadow-medium luxury-transition group">
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <Image
            src={vehicle?.image}
            alt={vehicle?.name}
            className="w-full h-full object-cover group-hover:scale-105 luxury-transition"
          />
        </div>
        
        {/* Price Alert Badge */}
        {vehicle?.priceDropAlert && (
          <div className="absolute top-3 left-3 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Icon name="TrendingDown" size={12} />
            <span>Price Drop!</span>
          </div>
        )}

        {/* Remove Favorite Button */}
        <button
          onClick={() => onRemoveFavorite(vehicle?.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background luxury-micro-transition"
        >
          <Icon name="Heart" size={16} className="text-error fill-current" />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-heading font-semibold text-foreground mb-1 line-clamp-1">
            {vehicle?.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {vehicle?.year} • {vehicle?.mileage} km • {vehicle?.fuelType}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-accent">
                {formatPrice(vehicle?.price, vehicle?.currency)}
              </p>
              {vehicle?.originalPrice && vehicle?.originalPrice > vehicle?.price && (
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrice(vehicle?.originalPrice, vehicle?.currency)}
                </p>
              )}
            </div>
            
            <button
              onClick={() => onPriceAlert(vehicle?.id)}
              className={`p-2 rounded-lg luxury-micro-transition ${
                vehicle?.priceAlertEnabled
                  ? 'bg-accent/10 text-accent' :'bg-muted text-muted-foreground hover:text-foreground'
              }`}
              title={vehicle?.priceAlertEnabled ? 'Price alerts enabled' : 'Enable price alerts'}
            >
              <Icon name="Bell" size={16} />
            </button>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate(`/inquiry-management?vehicle=${vehicle?.id}`)}
            className="flex-1"
            iconName="MessageSquare"
            iconPosition="left"
          >
            Inquire
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteVehicleCard;