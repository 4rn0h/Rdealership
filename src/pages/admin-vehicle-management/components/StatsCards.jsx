// src/pages/admin-vehicle-management/components/StatsCards.jsx
import React from "react";
import Icon from "../../../components/AppIcon";

const StatsCards = ({ stats }) => {
  if (!stats) {
    return (
      <p className="text-muted-foreground p-4">
        No stats available.
      </p>
    );
  }

  const cards = [
    {
      title: "Total Vehicles",
      value: stats.total ?? 0,
      icon: "Car",
      color: "text-accent bg-accent/10",
    },
    {
      title: "Available",
      value: stats.available ?? 0,
      icon: "CheckCircle",
      color: "text-success bg-success/10",
    },
    {
      title: "Reserved",
      value: stats.reserved ?? 0,
      icon: "Clock",
      color: "text-warning bg-warning/10",
    },
    {
      title: "Sold",
      value: stats.sold ?? 0,
      icon: "TrendingUp",
      color: "text-primary bg-primary/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 luxury-shadow-subtle"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}
            >
              <Icon name={card.icon} size={24} aria-hidden="true" />
            </div>
          </div>

          <div>
            <p className="text-2xl font-bold text-foreground mb-1">
              {card.value}
            </p>
            <p className="text-sm text-muted-foreground">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
