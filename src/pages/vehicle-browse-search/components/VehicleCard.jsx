import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VehicleCard = ({ vehicle, onFavoriteToggle, isFavorited = false, viewMode = 'grid' }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/vehicle-detail?id=${vehicle?.id}`);
  };

  const handleFavoriteClick = (e) => {
    e?.stopPropagation();
    onFavoriteToggle(vehicle?.id);
  };

  const formatPrice = (price, currency = 'KES') => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(price);
  };

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('en-KE')?.format(mileage);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg luxury-shadow-subtle hover:luxury-shadow-medium luxury-transition overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
            <Image
              src={vehicle?.images?.[0]}
              alt={`${vehicle?.make} ${vehicle?.model}`}
              className="w-full h-full object-cover"
              onLoad={() => setImageLoading(false)}
            />
            {imageLoading && (
              <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                <Icon name="Car" size={32} className="text-muted-foreground" />
              </div>
            )}
            
            {/* Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background luxury-micro-transition"
            >
              <Icon 
                name={isFavorited ? "Heart" : "Heart"} 
                size={20} 
                className={isFavorited ? "text-error fill-current" : "text-muted-foreground hover:text-error"}
              />
            </button>

            {/* Status Badge */}
            {vehicle?.status && vehicle?.status !== 'available' && (
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  vehicle?.status === 'sold' ? 'bg-error text-error-foreground' :
                  vehicle?.status === 'reserved' ? 'bg-warning text-warning-foreground' :
                  'bg-accent text-accent-foreground'
                }`}>
                  {vehicle?.status?.charAt(0)?.toUpperCase() + vehicle?.status?.slice(1)}
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                      {vehicle?.year} {vehicle?.make} {vehicle?.model}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {vehicle?.variant || vehicle?.trim}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-heading font-bold text-accent">
                      {formatPrice(vehicle?.price)}
                    </p>
                    {vehicle?.originalPrice && vehicle?.originalPrice > vehicle?.price && (
                      <p className="text-sm text-muted-foreground line-through">
                        {formatPrice(vehicle?.originalPrice)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Gauge" size={16} className="text-accent" />
                    <span className="text-sm text-foreground">
                      {formatMileage(vehicle?.mileage)} km
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Fuel" size={16} className="text-accent" />
                    <span className="text-sm text-foreground">
                      {vehicle?.fuelType}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Settings" size={16} className="text-accent" />
                    <span className="text-sm text-foreground">
                      {vehicle?.transmission}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Car" size={16} className="text-accent" />
                    <span className="text-sm text-foreground">
                      {vehicle?.bodyType}
                    </span>
                  </div>
                </div>

                {/* Features */}
                {vehicle?.keyFeatures && vehicle?.keyFeatures?.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {vehicle?.keyFeatures?.slice(0, 4)?.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {vehicle?.keyFeatures?.length > 4 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                          +{vehicle?.keyFeatures?.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{vehicle?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>Listed {vehicle?.listedDate}</span>
                  </div>
                </div>
                <Button
                  variant="default"
                  onClick={handleViewDetails}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div className="bg-card border border-border rounded-lg luxury-shadow-subtle hover:luxury-shadow-medium luxury-transition overflow-hidden group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={vehicle?.images?.[0]}
          alt={`${vehicle?.make} ${vehicle?.model}`}
          className="w-full h-full object-cover group-hover:scale-105 luxury-transition"
          onLoad={() => setImageLoading(false)}
        />
        {imageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <Icon name="Car" size={32} className="text-muted-foreground" />
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background luxury-micro-transition opacity-0 group-hover:opacity-100"
        >
          <Icon 
            name={isFavorited ? "Heart" : "Heart"} 
            size={20} 
            className={isFavorited ? "text-error fill-current" : "text-muted-foreground hover:text-error"}
          />
        </button>

        {/* Status Badge */}
        {vehicle?.status && vehicle?.status !== 'available' && (
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              vehicle?.status === 'sold' ? 'bg-error text-error-foreground' :
              vehicle?.status === 'reserved' ? 'bg-warning text-warning-foreground' :
              'bg-accent text-accent-foreground'
            }`}>
              {vehicle?.status?.charAt(0)?.toUpperCase() + vehicle?.status?.slice(1)}
            </span>
          </div>
        )}

        {/* Image Count */}
        {vehicle?.images?.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
            <div className="flex items-center space-x-1">
              <Icon name="Camera" size={12} className="text-foreground" />
              <span className="text-xs text-foreground">{vehicle?.images?.length}</span>
            </div>
          </div>
        )}
      </div>
      {/* Content Section */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1 line-clamp-1">
            {vehicle?.year} {vehicle?.make} {vehicle?.model}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {vehicle?.variant || vehicle?.trim}
          </p>
        </div>

        {/* Price */}
        <div className="mb-3">
          <p className="text-xl font-heading font-bold text-accent">
            {formatPrice(vehicle?.price)}
          </p>
          {vehicle?.originalPrice && vehicle?.originalPrice > vehicle?.price && (
            <p className="text-sm text-muted-foreground line-through">
              {formatPrice(vehicle?.originalPrice)}
            </p>
          )}
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Gauge" size={14} className="text-accent" />
            <span className="text-foreground">{formatMileage(vehicle?.mileage)} km</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Fuel" size={14} className="text-accent" />
            <span className="text-foreground">{vehicle?.fuelType}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Settings" size={14} className="text-accent" />
            <span className="text-foreground">{vehicle?.transmission}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} className="text-accent" />
            <span className="text-foreground">{vehicle?.location}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          fullWidth
          onClick={handleViewDetails}
          iconName="ArrowRight"
          iconPosition="right"
          className="group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;