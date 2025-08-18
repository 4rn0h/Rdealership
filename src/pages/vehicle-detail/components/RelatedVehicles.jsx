import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedVehicles = ({ currentVehicleId, currentMake, currentCategory }) => {
  const navigate = useNavigate();

  // Mock related vehicles data
  const relatedVehicles = [
    {
      id: 'rv001',
      make: 'BMW',
      model: 'X5 M Competition',
      year: 2023,
      price: 12500000,
      mileage: 15000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
      status: 'available',
      location: 'Nairobi',
      rating: 4.8,
      features: ['Leather Seats', 'Sunroof', 'Navigation']
    },
    {
      id: 'rv002',
      make: 'Mercedes-Benz',
      model: 'GLE 450 4MATIC',
      year: 2022,
      price: 11800000,
      mileage: 22000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
      status: 'available',
      location: 'Mombasa',
      rating: 4.7,
      features: ['Premium Sound', 'Heated Seats', 'Panoramic Roof']
    },
    {
      id: 'rv003',
      make: 'Audi',
      model: 'Q7 55 TFSI',
      year: 2023,
      price: 13200000,
      mileage: 8500,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
      status: 'available',
      location: 'Kisumu',
      rating: 4.9,
      features: ['Virtual Cockpit', 'Matrix LED', 'Air Suspension']
    },
    {
      id: 'rv004',
      make: 'Range Rover',
      model: 'Sport HSE Dynamic',
      year: 2022,
      price: 14500000,
      mileage: 18000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      status: 'reserved',
      location: 'Nakuru',
      rating: 4.8,
      features: ['Terrain Response', 'Meridian Audio', 'Adaptive Cruise']
    },
    {
      id: 'rv005',
      make: 'Porsche',
      model: 'Cayenne Turbo',
      year: 2023,
      price: 16800000,
      mileage: 5200,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop',
      status: 'available',
      location: 'Nairobi',
      rating: 4.9,
      features: ['Sport Chrono', 'PASM', 'Bose Audio']
    },
    {
      id: 'rv006',
      make: 'Lexus',
      model: 'LX 570',
      year: 2022,
      price: 13800000,
      mileage: 28000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
      status: 'available',
      location: 'Eldoret',
      rating: 4.6,
      features: ['Mark Levinson', 'Crawl Control', 'Multi-Terrain']
    }
  ]?.filter(vehicle => vehicle?.id !== currentVehicleId);

  const formatPrice = (price) => {
    return `KSh ${(price / 1000000)?.toFixed(1)}M`;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { color: 'text-success bg-success/10', text: 'Available' },
      reserved: { color: 'text-warning bg-warning/10', text: 'Reserved' },
      sold: { color: 'text-error bg-error/10', text: 'Sold' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.available;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.text}
      </span>
    );
  };

  const handleVehicleClick = (vehicleId) => {
    navigate(`/vehicle-detail?id=${vehicleId}`);
    window.scrollTo(0, 0);
  };

  const handleViewAllSimilar = () => {
    navigate(`/vehicle-browse-search?make=${currentMake}&category=${currentCategory}`);
  };

  return (
    <div className="bg-card rounded-lg luxury-shadow-medium">
      {/* Section Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Similar Vehicles
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            You might also be interested in these vehicles
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleViewAllSimilar}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      {/* Related Vehicles Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedVehicles?.slice(0, 6)?.map((vehicle) => (
            <div
              key={vehicle?.id}
              className="bg-muted/30 rounded-lg overflow-hidden hover:luxury-shadow-medium luxury-micro-transition cursor-pointer group"
              onClick={() => handleVehicleClick(vehicle?.id)}
            >
              {/* Vehicle Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={vehicle?.image}
                  alt={`${vehicle?.make} ${vehicle?.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 luxury-micro-transition"
                />
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  {getStatusBadge(vehicle?.status)}
                </div>
                
                {/* Favorite Button */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background luxury-micro-transition">
                  <Icon name="Heart" size={16} />
                </button>
                
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 luxury-micro-transition flex items-center justify-center">
                  <Button variant="default" size="sm">
                    View Details
                  </Button>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="p-4">
                {/* Title and Price */}
                <div className="mb-3">
                  <h3 className="font-heading font-semibold text-foreground group-hover:text-accent luxury-micro-transition">
                    {vehicle?.year} {vehicle?.make} {vehicle?.model}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-lg font-bold text-accent">
                      {formatPrice(vehicle?.price)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span className="text-sm text-muted-foreground">{vehicle?.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="Gauge" size={12} />
                    <span>{vehicle?.mileage?.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="Fuel" size={12} />
                    <span>{vehicle?.fuelType}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="Settings" size={12} />
                    <span>{vehicle?.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="MapPin" size={12} />
                    <span>{vehicle?.location}</span>
                  </div>
                </div>

                {/* Key Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {vehicle?.features?.slice(0, 2)?.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {vehicle?.features?.length > 2 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{vehicle?.features?.length - 2} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e?.stopPropagation();
                      // Handle quick inquiry
                      console.log('Quick inquiry for:', vehicle?.id);
                    }}
                  >
                    Quick Inquiry
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e?.stopPropagation();
                      // Handle compare
                      console.log('Compare vehicle:', vehicle?.id);
                    }}
                  >
                    <Icon name="GitCompare" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {relatedVehicles?.length > 6 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={handleViewAllSimilar}
              iconName="Plus"
              iconPosition="left"
            >
              Load More Similar Vehicles
            </Button>
          </div>
        )}
      </div>
      {/* No Related Vehicles */}
      {relatedVehicles?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Car" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            No Similar Vehicles Found
          </h3>
          <p className="text-muted-foreground mb-4">
            We couldn't find any similar vehicles at the moment.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/vehicle-browse-search')}
          >
            Browse All Vehicles
          </Button>
        </div>
      )}
    </div>
  );
};

export default RelatedVehicles;