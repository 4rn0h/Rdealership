import React from "react";
import VehicleCard from "../../vehicle-browse-search/components/VehicleCard";
import vehiclesData from "../../../data/Vehicles_Data.jsx"; //shared mock data

export default function FeaturedCars() {
  // Example: grab first 3 "Available" vehicles
  const featuredCars = vehiclesData
    .filter(v => v.status?.toLowerCase() === "available")
    .slice(0, 3);

  return (
    <section className="section bg-neutral py-16">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-medium mb-3 text-primary">
              Featured Vehicles
            </h2>
            <p className="text-muted-foreground">
              Discover our handpicked selection of exceptional luxury vehicles,
              each representing the pinnacle of automotive excellence.
            </p>
          </div>
        </div>

        {/* Featured Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map(vehicle => (
            <VehicleCard 
              key={vehicle.id} 
              vehicle={vehicle} 
              className="luxury-shadow-subtle hover:luxury-shadow-medium transition-shadow duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}