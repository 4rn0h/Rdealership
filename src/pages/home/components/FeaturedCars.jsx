import React from "react";
import VehicleCard from "../../vehicle-browse-search/components/VehicleCard";
import vehiclesData from "../../../data/Vehicles_Data.js"; //shared mock data

export default function FeaturedCars() {
  // Example: grab first 3 "Available" vehicles
  const featuredCars = vehiclesData
    .filter(v => v.status?.toLowerCase() === "available")
    .slice(0, 3);

  return (
    <section className="section py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-24 h-24 border border-accent/10 rounded-full opacity-30"></div>
      <div className="absolute bottom-20 right-0 w-16 h-16 border border-accent/10 rounded-full opacity-20"></div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Luxury badge */}
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <span className="text-accent font-caption font-semibold text-sm tracking-wider uppercase">
                Premium Selection
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-5 text-foreground">
              <span className="text-gold-gradient">Featured</span> Vehicles
            </h2>
            
            <div className="w-20 h-1 bg-accent mx-auto mb-6 luxury-shadow-subtle"></div>
            
            <p className="text-xl text-muted-foreground font-caption leading-relaxed">
              Discover our handpicked selection of exceptional luxury vehicles,
              each representing the pinnacle of automotive excellence and craftsmanship.
            </p>
          </div>
        </div>

        {/* Featured Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map(vehicle => (
            <div key={vehicle.id} className="transform hover:-translate-y-2 luxury-transition">
              <VehicleCard 
                vehicle={vehicle} 
                className="luxury-shadow-subtle hover:luxury-shadow-prominent luxury-transition overflow-hidden"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}