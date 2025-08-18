import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const VehiclePricing = ({ pricing, vehicleStatus }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('KES');

  const currencies = [
    { code: 'KES', symbol: 'KSh', rate: 1, name: 'Kenyan Shilling' },
    { code: 'TZS', symbol: 'TSh', rate: 2.4, name: 'Tanzanian Shilling' },
    { code: 'GBP', symbol: '£', rate: 0.0062, name: 'British Pound' }
  ];

  const getCurrentCurrency = () => {
    return currencies?.find(c => c?.code === selectedCurrency);
  };

  const convertPrice = (priceInKES) => {
    const currency = getCurrentCurrency();
    return (priceInKES * currency?.rate)?.toLocaleString();
  };

  const getStatusBadge = () => {
    const statusConfig = {
      available: { color: 'text-success bg-success/10', icon: 'CheckCircle', text: 'Available' },
      reserved: { color: 'text-warning bg-warning/10', icon: 'Clock', text: 'Reserved' },
      sold: { color: 'text-error bg-error/10', icon: 'XCircle', text: 'Sold' },
      pending: { color: 'text-accent bg-accent/10', icon: 'AlertCircle', text: 'Pending' }
    };

    const config = statusConfig?.[vehicleStatus] || statusConfig?.available;
    
    return (
      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${config?.color}`}>
        <Icon name={config?.icon} size={16} />
        <span className="font-medium">{config?.text}</span>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg p-6 luxury-shadow-medium">
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-6">
        {getStatusBadge()}
        
        {/* Currency Selector */}
        <div className="flex items-center space-x-2">
          <Icon name="DollarSign" size={16} className="text-muted-foreground" />
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e?.target?.value)}
            className="bg-muted border border-border rounded-lg px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {currencies?.map((currency) => (
              <option key={currency?.code} value={currency?.code}>
                {currency?.code}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Main Price */}
      <div className="mb-6">
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-3xl lg:text-4xl font-heading font-bold text-accent">
            {getCurrentCurrency()?.symbol}{convertPrice(pricing?.currentPrice)}
          </span>
          {pricing?.originalPrice && pricing?.originalPrice > pricing?.currentPrice && (
            <span className="text-lg text-muted-foreground line-through">
              {getCurrentCurrency()?.symbol}{convertPrice(pricing?.originalPrice)}
            </span>
          )}
        </div>
        
        {pricing?.originalPrice && pricing?.originalPrice > pricing?.currentPrice && (
          <div className="flex items-center space-x-2">
            <div className="bg-success/10 text-success px-2 py-1 rounded text-sm font-medium">
              Save {getCurrentCurrency()?.symbol}{convertPrice(pricing?.originalPrice - pricing?.currentPrice)}
            </div>
            <span className="text-sm text-muted-foreground">
              ({Math.round(((pricing?.originalPrice - pricing?.currentPrice) / pricing?.originalPrice) * 100)}% off)
            </span>
          </div>
        )}
      </div>
      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Base Price</span>
          <span className="font-medium">
            {getCurrentCurrency()?.symbol}{convertPrice(pricing?.basePrice || pricing?.currentPrice)}
          </span>
        </div>
        
        {pricing?.taxes && (
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Taxes & Fees</span>
            <span className="font-medium">
              {getCurrentCurrency()?.symbol}{convertPrice(pricing?.taxes)}
            </span>
          </div>
        )}
        
        {pricing?.insurance && (
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Insurance (Optional)</span>
            <span className="font-medium">
              {getCurrentCurrency()?.symbol}{convertPrice(pricing?.insurance)}
            </span>
          </div>
        )}
        
        {pricing?.warranty && (
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Extended Warranty</span>
            <span className="font-medium">
              {getCurrentCurrency()?.symbol}{convertPrice(pricing?.warranty)}
            </span>
          </div>
        )}
      </div>
      {/* Financing Options */}
      {pricing?.financing && (
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="CreditCard" size={18} className="text-accent" />
            <h4 className="font-heading font-semibold text-foreground">Financing Available</h4>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Monthly Payment (60 months)</span>
              <span className="font-medium">
                {getCurrentCurrency()?.symbol}{convertPrice(pricing?.financing?.monthlyPayment)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Down Payment</span>
              <span className="font-medium">
                {getCurrentCurrency()?.symbol}{convertPrice(pricing?.financing?.downPayment)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Interest Rate</span>
              <span className="font-medium">{pricing?.financing?.interestRate}% APR</span>
            </div>
          </div>
        </div>
      )}
      {/* Price History */}
      {pricing?.priceHistory && pricing?.priceHistory?.length > 0 && (
        <div className="border-t border-border pt-4">
          <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center space-x-2">
            <Icon name="TrendingDown" size={18} className="text-accent" />
            <span>Price History</span>
          </h4>
          
          <div className="space-y-2">
            {pricing?.priceHistory?.slice(0, 3)?.map((entry, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{entry?.date}</span>
                <span className={`font-medium ${
                  index === 0 ? 'text-accent' : 'text-muted-foreground'
                }`}>
                  {getCurrentCurrency()?.symbol}{convertPrice(entry?.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Price Alert */}
      <div className="mt-6 p-3 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Bell" size={16} className="text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Price Drop Alert</p>
            <p className="text-xs text-muted-foreground">
              Get notified if the price drops below {getCurrentCurrency()?.symbol}{convertPrice(pricing?.currentPrice * 0.9)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclePricing;