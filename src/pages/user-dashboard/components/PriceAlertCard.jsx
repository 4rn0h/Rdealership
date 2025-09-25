// src/pages/user-dashboard/components/PriceAlertCard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { supabase } from '../../../lib/supabaseClient';

const PriceAlertCard = ({ alert, onToggleAlert, onRemoveAlert }) => {
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState(alert);

  // 🔄 Hydrate vehicle details from Supabase if missing
  useEffect(() => {
    const fetchVehicle = async () => {
      if (alert?.vehicle_id && !alert?.vehicle) {
        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('id', alert.vehicle_id)
          .single();

        if (!error && data) {
          setAlertData({ ...alert, vehicle: data });
        }
      }
    };
    fetchVehicle();
  }, [alert]);

  const formatPrice = (price, currency) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);

  const formatDate = (date) =>
    new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date));

  const getPriceChange = () => {
    if (!alertData?.previousPrice || alertData?.previousPrice === alertData?.currentPrice) return null;
    const change = alertData?.currentPrice - alertData?.previousPrice;
    const percentage = ((change / alertData?.previousPrice) * 100).toFixed(1);
    return { amount: Math.abs(change), percentage: Math.abs(percentage), isDecrease: change < 0, isIncrease: change > 0 };
  };

  const priceChange = getPriceChange();

  return (
    <div className="bg-card border border-border rounded-lg p-4 luxury-shadow-subtle hover:luxury-shadow-medium luxury-transition">
      <div className="flex items-start space-x-4">
        {/* Vehicle Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={alertData?.vehicle?.image || alertData?.vehicle?.images?.[0] || alertData?.vehicle?.image_urls?.[0]}
            alt={alertData?.vehicle?.name || `${alertData?.vehicle?.year} ${alertData?.vehicle?.make} ${alertData?.vehicle?.model}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Alert Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-foreground line-clamp-1">
                {alertData?.vehicle?.name || `${alertData?.vehicle?.year} ${alertData?.vehicle?.make} ${alertData?.vehicle?.model}`}
              </h4>
              <p className="text-sm text-muted-foreground">Alert created {formatDate(alertData?.created_at || alertData?.createdAt)}</p>
            </div>

            <button
              onClick={() => onToggleAlert(alertData?.id)}
              className={`p-1 rounded luxury-micro-transition ${
                alertData?.isActive ? 'text-accent hover:text-accent/80' : 'text-muted-foreground hover:text-foreground'
              }`}
              title={alertData?.isActive ? 'Disable alert' : 'Enable alert'}
            >
              <Icon name={alertData?.isActive ? 'Bell' : 'BellOff'} size={16} />
            </button>
          </div>

          {/* Current Price */}
          <div className="mb-2">
            <p className="text-lg font-bold text-accent">{formatPrice(alertData?.currentPrice, alertData?.currency)}</p>
            {priceChange && (
              <div className={`flex items-center space-x-1 text-sm ${priceChange?.isDecrease ? 'text-success' : 'text-error'}`}>
                <Icon name={priceChange?.isDecrease ? 'TrendingDown' : 'TrendingUp'} size={12} />
                <span>
                  {priceChange?.isDecrease ? '-' : '+'}
                  {formatPrice(priceChange?.amount, alertData?.currency)} ({priceChange?.percentage}%)
                </span>
              </div>
            )}
          </div>

          {/* Target Price */}
          <div className="mb-3">
            <p className="text-sm text-muted-foreground">Target price: {formatPrice(alertData?.targetPrice, alertData?.currency)}</p>
            {alertData?.currentPrice <= alertData?.targetPrice && (
              <div className="flex items-center space-x-1 text-sm text-success mt-1">
                <Icon name="Target" size={12} />
                <span>Target reached!</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/vehicle-detail?id=${alertData?.vehicle?.id}`)}
              iconName="Eye"
              iconPosition="left"
            >
              View Vehicle
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveAlert(alertData?.id)}
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
