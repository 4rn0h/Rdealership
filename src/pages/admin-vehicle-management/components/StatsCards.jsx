import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Vehicles',
      value: stats?.totalVehicles,
      change: '+12%',
      changeType: 'positive',
      icon: 'Car',
      color: 'text-accent bg-accent/10'
    },
    {
      title: 'Available',
      value: stats?.availableVehicles,
      change: '+5%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'text-success bg-success/10'
    },
    {
      title: 'Sold This Month',
      value: stats?.soldThisMonth,
      change: '+23%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'text-primary bg-primary/10'
    },
    {
      title: 'Reserved',
      value: stats?.reservedVehicles,
      change: '-2%',
      changeType: 'negative',
      icon: 'Clock',
      color: 'text-warning bg-warning/10'
    },
    {
      title: 'Total Value',
      value: `KES ${(stats?.totalValue / 1000000)?.toFixed(1)}M`,
      change: '+8%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'text-accent bg-accent/10'
    },
    {
      title: 'Avg. Price',
      value: `KES ${(stats?.averagePrice / 1000000)?.toFixed(1)}M`,
      change: '+3%',
      changeType: 'positive',
      icon: 'BarChart3',
      color: 'text-foreground bg-muted'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {cards?.map((card, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 luxury-shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card?.color}`}>
              <Icon name={card?.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              card?.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={card?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
              />
              <span>{card?.change}</span>
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-foreground mb-1">
              {card?.value}
            </p>
            <p className="text-sm text-muted-foreground">
              {card?.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;