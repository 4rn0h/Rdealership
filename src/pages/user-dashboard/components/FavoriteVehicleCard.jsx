// src/pages/user-dashboard/components/FavoriteVehicleCard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { supabase } from '../../../lib/supabaseClient';

const FavoriteVehicleCard = ({ vehicle, onRemoveFavorite, onPriceAlert }) => {
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState(vehicle);

  // 🔄 Try fetching from Supabase if only `vehicle_id` is passed
  useEffect(() => {
    const fetchVehicle = async () => {
      if (vehicle?.vehicle_id && !vehicle?.make) {
        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('id', vehicle.vehicle_id)
          .single();

        if (!error && data) {
          setVehicleData(data);
        }
      }
    };
    fetchVehicle();
  }, [vehicle]);

  const handleViewDetails = () => {
    navigate(`/vehicle-detail?id=${vehicleData?.id}`);
  };

  const formatPrice = (price, currency) => {
    if (!price || !currency) return '';
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const vehicleName = `${vehicleData?.year || ''} ${vehicleData?.make || ''} ${vehicleData?.model || ''}`.trim();

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden luxury-shadow-subtle hover:luxury-shadow-medium luxury-transition group">
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <Image
            src={vehicleData?.images?.[0] || vehicleData?.image_urls?.[0]}
            alt={vehicleName}
            className="w-full h-full object-cover group-hover:scale-105 luxury-transition"
          />
        </div>

        {vehicleData?.priceDropAlert && (
          <div className="absolute top-3 left-3 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Icon name="TrendingDown" size={12} />
            <span>Price Drop!</span>
          </div>
        )}

        <button
          onClick={() => onRemoveFavorite(vehicleData?.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background luxury-micro-transition"
        >
          <Icon name="Heart" size={16} className="text-error fill-current" />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-heading font-semibold text-foreground mb-1 line-clamp-1">
            {vehicleName}
          </h3>

          <p className="text-sm text-muted-foreground mb-2">
            {vehicleData?.year}
            {vehicleData?.fuelType && <> • {vehicleData?.fuelType}</>}
            {vehicleData?.mileage && <> • {vehicleData?.mileage} km</>}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-accent">
                {formatPrice(vehicleData?.price, vehicleData?.currency)}
              </p>
              {vehicleData?.originalPrice &&
                vehicleData?.originalPrice > vehicleData?.price && (
                  <p className="text-sm text-muted-foreground line-through">
                    {formatPrice(vehicleData?.originalPrice, vehicleData?.currency)}
                  </p>
                )}
            </div>

            <button
              onClick={() => onPriceAlert(vehicleData?.id)}
              className={`p-2 rounded-lg luxury-micro-transition ${
                vehicleData?.priceAlertEnabled
                  ? 'bg-accent/10 text-accent'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
              title={vehicleData?.priceAlertEnabled ? 'Price alerts enabled' : 'Enable price alerts'}
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
            onClick={() => navigate(`/inquiry-management?vehicle=${vehicleData?.id}`)}
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
