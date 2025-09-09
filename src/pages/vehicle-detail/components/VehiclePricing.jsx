import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const VehiclePricing = ({ pricing = {}, vehicleStatus = "available" }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('KES');

  const currencies = [
    { code: 'KES', symbol: 'KSh', rate: 1, name: 'Kenyan Shilling' },
    { code: 'TZS', symbol: 'TSh', rate: 2.4, name: 'Tanzanian Shilling' },
    { code: 'GBP', symbol: '£', rate: 0.0062, name: 'British Pound' }
  ];

  const getCurrentCurrency = () => currencies.find(c => c.code === selectedCurrency);

  const convertPrice = (priceInKES = 0) => {
    const currency = getCurrentCurrency();
    return (priceInKES * (currency?.rate || 1)).toLocaleString();
  };

  const getStatusBadge = () => {
    const statusConfig = {
      available: { color: 'text-success bg-success/10', icon: 'CheckCircle', text: 'Available' },
      reserved: { color: 'text-warning bg-warning/10', icon: 'Clock', text: 'Reserved' },
      sold: { color: 'text-error bg-error/10', icon: 'XCircle', text: 'Sold' },
      pending: { color: 'text-accent bg-accent/10', icon: 'AlertCircle', text: 'Pending' }
    };

    const config = statusConfig[vehicleStatus?.toLowerCase()] || statusConfig.available;
    return (
      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${config.color}`}>
        <Icon name={config.icon} size={16} />
        <span className="font-medium">{config.text}</span>
      </div>
    );
  };

  const currentPrice = pricing.currentPrice || 0;

  return (
    <div className="bg-card rounded-lg p-6 luxury-shadow-medium">
      {/* Status Badge + Currency Selector */}
      <div className="flex items-center justify-between mb-6">
        {getStatusBadge()}
        <div className="flex items-center space-x-2">
          <Icon name="DollarSign" size={16} className="text-muted-foreground" />
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="bg-muted border border-border rounded-lg px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Price */}
      <div className="mb-6">
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-3xl lg:text-4xl font-heading font-bold text-accent">
            {getCurrentCurrency()?.symbol}{convertPrice(currentPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VehiclePricing;
