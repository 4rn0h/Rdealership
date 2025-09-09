// src/pages/vehicle-detail/components/VehicleSpecifications.jsx

import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import vehicleSpecifications from '../../../data/Vehicle_Specs';

const VehicleSpecifications = ({ vehicle }) => {
  const [activeTab, setActiveTab] = useState('specs');

  // ✅ Get the vehicle specs by ID
  const specs = vehicleSpecifications[vehicle.id] || {};

  // ✅ Helper to safely fetch nested values
  const getSpecValue = (key) => {
    return (
      specs.enginePerformance?.[key] ||
      specs.fuelEfficiency?.[key] ||
      specs.dimensionsWeight?.[key] ||
      specs.capacityStorage?.[key] ||
      null
    );
  };

  // ✅ Categories (uses nested keys)
  const specCategories = [
    {
      title: 'Engine & Performance',
      specs: [
        { label: 'Engine Type', key: 'engineType' },
        { label: 'Displacement', key: 'displacement' },
        { label: 'Power', key: 'power' },
        { label: 'Torque', key: 'torque' },
        { label: 'Transmission', key: 'transmission' },
        { label: 'Drive Type', key: 'driveType' }
      ]
    },
    {
      title: 'Fuel & Efficiency',
      specs: [
        { label: 'Fuel Type', key: 'fuelType' },
        { label: 'Fuel Capacity', key: 'fuelCapacity' },
        { label: 'City Consumption', key: 'cityConsumption' },
        { label: 'Highway Consumption', key: 'highwayConsumption' },
        { label: 'Combined Consumption', key: 'combinedConsumption' },
        { label: 'CO2 Emissions', key: 'co2Emissions' }
      ]
    },
    {
      title: 'Dimensions & Weight',
      specs: [
        { label: 'Length', key: 'length' },
        { label: 'Width', key: 'width' },
        { label: 'Height', key: 'height' },
        { label: 'Wheelbase', key: 'wheelbase' },
        { label: 'Curb Weight', key: 'curbWeight' },
        { label: 'Gross Weight', key: 'grossWeight' }
      ]
    },
    {
      title: 'Capacity & Storage',
      specs: [
        { label: 'Seating Capacity', key: 'seatingCapacity' },
        { label: 'Doors', key: 'doors' },
        { label: 'Boot Space', key: 'bootSpace' },
        { label: 'Ground Clearance', key: 'groundClearance' },
        { label: 'Turning Radius', key: 'turningRadius' },
        { label: 'Towing Capacity', key: 'towingCapacity' }
      ]
    }
  ];

  return (
    <div className="bg-card rounded-lg luxury-shadow-medium">
      {/* Tabs */}
      <div className="border-b border-border flex">
        <button
          onClick={() => setActiveTab('specs')}
          className={`flex-1 px-6 py-4 text-center font-medium ${
            activeTab === 'specs'
              ? 'text-accent border-b-2 border-accent bg-accent/5'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Settings" size={18} />
            <span>Specifications</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('features')}
          className={`flex-1 px-6 py-4 text-center font-medium ${
            activeTab === 'features'
              ? 'text-accent border-b-2 border-accent bg-accent/5'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Star" size={18} />
            <span>Features</span>
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'specs' && (
          <div className="space-y-8">
            {specCategories.map((category, i) => {
              // Only keep fields that actually exist for this vehicle
              const availableSpecs = category.specs.filter(
                (spec) => getSpecValue(spec.key)
              );

              if (availableSpecs.length === 0) return null;

              return (
                <div key={i}>
                  <h3 className="text-lg font-heading font-semibold mb-4">
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableSpecs.map((spec, j) => (
                      <div
                        key={j}
                        className="flex justify-between items-center p-3 bg-muted/30 rounded-lg"
                      >
                        <span className="text-muted-foreground">
                          {spec.label}
                        </span>
                        <span className="text-foreground font-medium">
                          {getSpecValue(spec.key)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-3">
            {vehicle.features?.length > 0 ? (
              vehicle.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
                >
                  <Icon name="Check" size={16} className="text-success" />
                  <span>{feature}</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No features listed</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleSpecifications;
