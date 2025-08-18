import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const VehicleSpecifications = ({ specifications, features }) => {
  const [activeTab, setActiveTab] = useState('specs');

  const specCategories = [
    {
      title: 'Engine & Performance',
      specs: [
        { label: 'Engine Type', value: specifications?.engineType },
        { label: 'Displacement', value: specifications?.displacement },
        { label: 'Power', value: specifications?.power },
        { label: 'Torque', value: specifications?.torque },
        { label: 'Transmission', value: specifications?.transmission },
        { label: 'Drive Type', value: specifications?.driveType }
      ]
    },
    {
      title: 'Fuel & Efficiency',
      specs: [
        { label: 'Fuel Type', value: specifications?.fuelType },
        { label: 'Fuel Capacity', value: specifications?.fuelCapacity },
        { label: 'City Consumption', value: specifications?.cityConsumption },
        { label: 'Highway Consumption', value: specifications?.highwayConsumption },
        { label: 'Combined Consumption', value: specifications?.combinedConsumption },
        { label: 'CO2 Emissions', value: specifications?.co2Emissions }
      ]
    },
    {
      title: 'Dimensions & Weight',
      specs: [
        { label: 'Length', value: specifications?.length },
        { label: 'Width', value: specifications?.width },
        { label: 'Height', value: specifications?.height },
        { label: 'Wheelbase', value: specifications?.wheelbase },
        { label: 'Curb Weight', value: specifications?.curbWeight },
        { label: 'Gross Weight', value: specifications?.grossWeight }
      ]
    },
    {
      title: 'Capacity & Storage',
      specs: [
        { label: 'Seating Capacity', value: specifications?.seatingCapacity },
        { label: 'Doors', value: specifications?.doors },
        { label: 'Boot Space', value: specifications?.bootSpace },
        { label: 'Ground Clearance', value: specifications?.groundClearance },
        { label: 'Turning Radius', value: specifications?.turningRadius },
        { label: 'Towing Capacity', value: specifications?.towingCapacity }
      ]
    }
  ];

  const featureCategories = [
    {
      title: 'Safety Features',
      icon: 'Shield',
      items: features?.safety || []
    },
    {
      title: 'Comfort & Convenience',
      icon: 'Armchair',
      items: features?.comfort || []
    },
    {
      title: 'Technology',
      icon: 'Smartphone',
      items: features?.technology || []
    },
    {
      title: 'Exterior Features',
      icon: 'Car',
      items: features?.exterior || []
    },
    {
      title: 'Interior Features',
      icon: 'Home',
      items: features?.interior || []
    },
    {
      title: 'Audio & Entertainment',
      icon: 'Music',
      items: features?.entertainment || []
    }
  ];

  return (
    <div className="bg-card rounded-lg luxury-shadow-medium">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab('specs')}
            className={`flex-1 px-6 py-4 text-center font-medium luxury-micro-transition ${
              activeTab === 'specs' ?'text-accent border-b-2 border-accent bg-accent/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Settings" size={18} />
              <span>Specifications</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`flex-1 px-6 py-4 text-center font-medium luxury-micro-transition ${
              activeTab === 'features' ?'text-accent border-b-2 border-accent bg-accent/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Star" size={18} />
              <span>Features</span>
            </div>
          </button>
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'specs' && (
          <div className="space-y-8">
            {specCategories?.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  {category?.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category?.specs?.map((spec, specIndex) => (
                    <div
                      key={specIndex}
                      className="flex justify-between items-center p-3 bg-muted/30 rounded-lg"
                    >
                      <span className="text-muted-foreground font-medium">
                        {spec?.label}
                      </span>
                      <span className="text-foreground font-semibold">
                        {spec?.value || 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-8">
            {featureCategories?.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name={category?.icon} size={18} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    {category?.title}
                  </h3>
                </div>
                
                {category?.items?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category?.items?.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
                      >
                        <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Info" size={24} className="mx-auto mb-2 opacity-50" />
                    <p>No {category?.title?.toLowerCase()} information available</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleSpecifications;