import React from 'react';
import VehicleCard from '../../vehicle-browse-search/components/VehicleCard';

// Copy mockVehicles directly from VehicleBrowseSearch
const mockVehicles = [
  {
    id: 1,
    make: 'Mercedes-Benz',
    model: 'C-Class',
    variant: 'C300 AMG Line',
    year: 2023,
    price: 8500000,
    originalPrice: 9200000,
    mileage: 15000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    condition: 'used',
    location: 'Nairobi',
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop'
    ],
    keyFeatures: ['Leather Seats', 'Sunroof', 'Navigation System', 'Backup Camera', 'Bluetooth'],
    listedDate: '2 days ago',
    popularity: 95
  },
  {
    id: 2,
    make: 'BMW',
    model: '5 Series',
    variant: '530i M Sport',
    year: 2022,
    price: 7800000,
    mileage: 28000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    condition: 'used',
    location: 'Mombasa',
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop'
    ],
    keyFeatures: ['Heated Seats', 'Premium Sound', 'Keyless Entry', 'Cruise Control'],
    listedDate: '1 week ago',
    popularity: 88
  },
  {
    id: 3,
    make: 'Audi',
    model: 'Q5',
    variant: '45 TFSI Quattro',
    year: 2023,
    price: 9200000,
    mileage: 8500,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    condition: 'used',
    location: 'Nairobi',
    status: 'reserved',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'
    ],
    keyFeatures: ['All-Wheel Drive', 'Virtual Cockpit', 'Matrix LED', 'Parking Sensors'],
    listedDate: '3 days ago',
    popularity: 92
  }
];

export default function FeaturedCars() {
  const featuredCars = mockVehicles.slice(0, 3);

  return (
    <section className="section bg-neutral">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-medium mb-3 text-primary">
              Featured Vehicles
            </h2>
            <p className="text-gray-600 text-primary">
              Discover our handpicked selection of exceptional luxury vehicles,
              each representing the pinnacle of automotive excellence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
