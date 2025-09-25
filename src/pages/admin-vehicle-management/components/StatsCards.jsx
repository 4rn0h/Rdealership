import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import { supabase } from "../../../lib/supabaseClient";

const StatsCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stats from Supabase
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('dashboard_stats')
          .select('*')
          .single(); // assuming one row with aggregated stats

        if (error) throw error;
        setStats(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-muted-foreground p-4">Loading stats...</p>;
  if (error) return <p className="text-error p-4">Error: {error}</p>;

  // Map stats to cards dynamically
  const cards = [
    {
      title: 'Total Vehicles',
      value: stats?.total_vehicles ?? 0,
      change: stats?.total_vehicles_trend ?? '+0%',
      icon: 'Car',
      color: 'text-accent bg-accent/10'
    },
    {
      title: 'Available',
      value: stats?.available_vehicles ?? 0,
      change: stats?.available_vehicles_trend ?? '+0%',
      icon: 'CheckCircle',
      color: 'text-success bg-success/10'
    },
    {
      title: 'Sold This Month',
      value: stats?.sold_this_month ?? 0,
      change: stats?.sold_this_month_trend ?? '+0%',
      icon: 'TrendingUp',
      color: 'text-primary bg-primary/10'
    },
    {
      title: 'Reserved',
      value: stats?.reserved_vehicles ?? 0,
      change: stats?.reserved_vehicles_trend ?? '+0%',
      icon: 'Clock',
      color: 'text-warning bg-warning/10'
    },
    {
      title: 'Total Value',
      value: stats?.total_value
        ? `KES ${(stats.total_value / 1_000_000).toFixed(1)}M`
        : 'KES 0M',
      change: stats?.total_value_trend ?? '+0%',
      icon: 'DollarSign',
      color: 'text-accent bg-accent/10'
    },
    {
      title: 'Avg. Price',
      value: stats?.average_price
        ? `KES ${(stats.average_price / 1_000_000).toFixed(1)}M`
        : 'KES 0M',
      change: stats?.average_price_trend ?? '+0%',
      icon: 'BarChart3',
      color: 'text-foreground bg-muted'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 luxury-shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}>
              <Icon name={card.icon} size={24} aria-hidden="true" />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              card.change?.startsWith('-') ? 'text-error' : 'text-success'
            }`}>
              <Icon
                name={card.change?.startsWith('-') ? 'TrendingDown' : 'TrendingUp'}
                size={14}
                aria-hidden="true"
              />
              <span>{card.change}</span>
            </div>
          </div>

          <div>
            <p className="text-2xl font-bold text-foreground mb-1">{card.value}</p>
            <p className="text-sm text-muted-foreground">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
