import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import VehicleImageGallery from './components/VehicleImageGallery';
import VehicleSpecifications from './components/VehicleSpecifications';
import VehiclePricing from './components/VehiclePricing';
import VehicleActions from './components/VehicleActions';
import RelatedVehicles from './components/RelatedVehicles';
import VehicleHistory from './components/VehicleHistory';

const VehicleDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const vehicleId = searchParams?.get('id') || 'default-vehicle';
  
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock vehicle data
  const mockVehicleData = {
    id: vehicleId,
    make: 'BMW',
    model: 'X7 xDrive40i',
    year: 2023,
    vin: 'WBAJA5C50NCG12345',
    status: 'available',
    location: 'Nairobi Showroom',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&h=800&fit=crop'
    ],
    pricing: {
      currentPrice: 15800000,
      originalPrice: 16500000,
      basePrice: 15200000,
      taxes: 600000,
      insurance: 180000,
      warranty: 120000,
      financing: {
        monthlyPayment: 285000,
        downPayment: 3160000,
        interestRate: 12.5
      },
      priceHistory: [
        { date: '2025-01-15', price: 15800000 },
        { date: '2024-12-20', price: 16200000 },
        { date: '2024-11-10', price: 16500000 }
      ]
    },
    specifications: {
      engineType: '3.0L Inline-6 Turbo',
      displacement: '2998cc',
      power: '335 HP @ 5500 RPM',
      torque: '450 Nm @ 1500-5200 RPM',
      transmission: '8-Speed Automatic',
      driveType: 'All-Wheel Drive (xDrive)',
      fuelType: 'Petrol',
      fuelCapacity: '83 Liters',
      cityConsumption: '12.5 L/100km',
      highwayConsumption: '8.9 L/100km',
      combinedConsumption: '10.3 L/100km',
      co2Emissions: '235 g/km',
      length: '5151 mm',
      width: '2000 mm',
      height: '1805 mm',
      wheelbase: '3105 mm',
      curbWeight: '2265 kg',
      grossWeight: '3045 kg',
      seatingCapacity: '7 Passengers',
      doors: '5 Doors',
      bootSpace: '326-2120 Liters',
      groundClearance: '225 mm',
      turningRadius: '6.05 m',
      towingCapacity: '2700 kg'
    },
    features: {
      safety: [
        'Active Protection System',
        'Adaptive Cruise Control',
        'Lane Departure Warning',
        'Blind Spot Monitoring',
        'Forward Collision Warning',
        'Automatic Emergency Braking',
        'Parking Assistant Plus',
        'Surround View Camera',
        'Night Vision with Pedestrian Detection',
        'Head-Up Display'
      ],
      comfort: [
        'Panoramic Sky Lounge LED Roof',
        'Ambient Lighting',
        'Four-Zone Automatic Climate Control',
        'Heated and Ventilated Front Seats',
        'Heated Rear Seats',
        'Massage Function for Front Seats',
        'Power-Adjustable Steering Column',
        'Soft-Close Doors',
        'Gesture Control',
        'Wireless Phone Charging'
      ],
      technology: [
        'BMW Live Cockpit Professional',
        '12.3" Digital Instrument Display',
        '12.3" Control Display',
        'BMW Intelligent Personal Assistant',
        'Apple CarPlay & Android Auto',
        'BMW ConnectedDrive Services',
        'Remote Engine Start',
        'BMW Digital Key Plus',
        'Over-the-Air Updates',
        'WiFi Hotspot Preparation'
      ],
      exterior: [
        'Adaptive LED Headlights',
        'BMW Laser Light',
        'LED Fog Lights',
        'Power Tailgate',
        'Roof Rails',
        'M Sport Package',
        'Aerodynamic Kit',
        '21" M Light Alloy Wheels',
        'Run-Flat Tires',
        'Tinted Glass'
      ],
      interior: [
        'Vernasca Leather Upholstery',
        'BMW Individual Merino Leather',
        'Alcantara Headliner',
        'Fine-Wood Trim',
        'Illuminated Door Sills',
        'Premium Floor Mats',
        'Luxury Seating Package',
        'Executive Lounge Seating',
        'Rear Entertainment System',
        'Refrigerated Compartment'
      ],
      entertainment: [
        'Bowers & Wilkins Diamond Surround Sound',
        '20 Speakers',
        'Rear Seat Entertainment',
        'Dual 10.2" Rear Displays',
        'Blu-ray Player',
        'Digital TV Reception',
        'USB-C Charging Ports',
        'HDMI Connectivity',
        'Streaming Services Integration',
        'Premium Audio Experience'
      ]
    },
    vehicleHistory: {
      ownership: {
        totalOwners: 1,
        history: [
          {
            period: 'Jan 2023 - Present',
            duration: '2 years',
            location: 'Nairobi, Kenya',
            usage: 'Personal Use',
            mileageAdded: 18500,
            notes: 'Single owner, well maintained, garage kept'
          }
        ]
      },
      service: {
        records: [
          {
            date: '2024-12-15',
            type: 'Major Service',
            mileage: 18500,
            cost: 85000,
            provider: 'BMW Service Center Nairobi',
            workDone: [
              'Engine Oil & Filter Change',
              'Brake Fluid Replacement',
              'Air Filter Replacement',
              'Spark Plugs Replacement',
              'Comprehensive Vehicle Inspection'
            ],
            nextService: {
              date: '2025-06-15',
              mileage: 28500
            }
          },
          {
            date: '2024-06-20',
            type: 'Minor Service',
            mileage: 12000,
            cost: 45000,
            provider: 'BMW Service Center Nairobi',
            workDone: [
              'Engine Oil Change',
              'Tire Rotation',
              'Battery Check',
              'Fluid Level Check'
            ]
          },
          {
            date: '2023-12-10',
            type: 'First Service',
            mileage: 5000,
            cost: 35000,
            provider: 'BMW Service Center Nairobi',
            workDone: [
              'Initial Service Check',
              'Engine Oil Change',
              'System Diagnostics',
              'Warranty Registration'
            ]
          }
        ]
      },
      accidents: {
        status: 'clean',
        incidents: []
      },
      modifications: {
        items: []
      }
    },
    description: `Experience luxury redefined with this pristine 2023 BMW X7 xDrive40i. This flagship SUV combines commanding presence with unparalleled comfort, featuring a powerful 3.0L turbo engine and BMW's renowned xDrive all-wheel-drive system.\n\nMeticulously maintained with full service history, this X7 offers seating for seven in supreme comfort. The Bowers & Wilkins sound system, panoramic roof, and advanced driver assistance systems ensure every journey is extraordinary.\n\nPerfect for discerning buyers seeking the ultimate in luxury SUV ownership.`,
    mileage: 18500,
    condition: 'Excellent',warranty: 'BMW Warranty until Jan 2026',lastUpdated: '2025-01-12T10:30:00Z'
  };

  useEffect(() => {
    // Simulate loading and fetch vehicle data
    const loadVehicleData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVehicle(mockVehicleData);
      setLoading(false);
    };

    loadVehicleData();

    // Check authentication status
    const user = localStorage.getItem('luxauto_user');
    setIsAuthenticated(!!user);

    // Check if vehicle is in favorites
    const favorites = JSON.parse(localStorage.getItem('luxauto_favorites') || '[]');
    setIsFavorite(favorites?.includes(vehicleId));

    // Track vehicle view
    const viewHistory = JSON.parse(localStorage.getItem('luxauto_view_history') || '[]');
    const updatedHistory = [vehicleId, ...viewHistory?.filter(id => id !== vehicleId)]?.slice(0, 10);
    localStorage.setItem('luxauto_view_history', JSON.stringify(updatedHistory));
  }, [vehicleId]);

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      navigate('/user-authentication');
      return;
    }

    const favorites = JSON.parse(localStorage.getItem('luxauto_favorites') || '[]');
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites?.filter(id => id !== vehicleId);
    } else {
      updatedFavorites = [...favorites, vehicleId];
    }

    localStorage.setItem('luxauto_favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Browse Vehicles', path: '/vehicle-browse-search' },
    { label: `${vehicle?.year || ''} ${vehicle?.make || ''} ${vehicle?.model || ''}`, path: null }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-6 py-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="aspect-video bg-muted rounded-lg"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-64 bg-muted rounded-lg"></div>
                  <div className="h-96 bg-muted rounded-lg"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-80 bg-muted rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-6 py-16 text-center">
            <Icon name="Car" size={64} className="mx-auto mb-6 text-muted-foreground opacity-50" />
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
              Vehicle Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The vehicle you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/vehicle-browse-search')}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 luxury-micro-transition"
            >
              Browse All Vehicles
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-6 py-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm mb-8">
            {breadcrumbItems?.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                )}
                {item?.path ? (
                  <button
                    onClick={() => navigate(item?.path)}
                    className="text-muted-foreground hover:text-accent luxury-micro-transition"
                  >
                    {item?.label}
                  </button>
                ) : (
                  <span className="text-foreground font-medium">{item?.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Vehicle Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                  {vehicle?.year} {vehicle?.make} {vehicle?.model}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={16} />
                    <span>{vehicle?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Gauge" size={16} />
                    <span>{vehicle?.mileage?.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={16} />
                    <span>Updated {new Date(vehicle.lastUpdated)?.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Hash" size={16} />
                    <span>VIN: {vehicle?.vin}</span>
                  </div>
                </div>
              </div>
              
              {/* Mobile Share Button */}
              <div className="lg:hidden mt-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 luxury-micro-transition">
                  <Icon name="Share2" size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-3 space-y-8">
              {/* Image Gallery */}
              <VehicleImageGallery 
                images={vehicle?.images} 
                vehicleName={`${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}
              />

              {/* Vehicle Description */}
              <div className="bg-card rounded-lg p-6 luxury-shadow-medium">
                <h2 className="text-xl font-heading font-bold text-foreground mb-4">
                  Description
                </h2>
                <div className="prose prose-invert max-w-none">
                  {vehicle?.description?.split('\n')?.map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Key Highlights */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    Key Highlights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="Award" size={18} className="text-accent" />
                      <span className="text-foreground">Condition: {vehicle?.condition}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Shield" size={18} className="text-accent" />
                      <span className="text-foreground">{vehicle?.warranty}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Users" size={18} className="text-accent" />
                      <span className="text-foreground">Single Owner</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="CheckCircle" size={18} className="text-accent" />
                      <span className="text-foreground">Full Service History</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specifications and Features */}
              <VehicleSpecifications 
                specifications={vehicle?.specifications}
                features={vehicle?.features}
              />

              {/* Vehicle History */}
              <VehicleHistory vehicleHistory={vehicle?.vehicleHistory} />

              {/* Related Vehicles */}
              <RelatedVehicles 
                currentVehicleId={vehicle?.id}
                currentMake={vehicle?.make}
                currentCategory="luxury-suv"
              />
            </div>

            {/* Right Column - Pricing and Actions */}
            <div className="lg:col-span-1 space-y-6">
              {/* Pricing */}
              <VehiclePricing 
                pricing={vehicle?.pricing}
                vehicleStatus={vehicle?.status}
              />

              {/* Actions */}
              <VehicleActions
                vehicleId={vehicle?.id}
                vehicleName={`${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
                isAuthenticated={isAuthenticated}
              />

              {/* Contact Information */}
              <div className="bg-card rounded-lg p-6 luxury-shadow-medium">
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={18} className="text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">+254 700 123 456</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={18} className="text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">sales@luxauto.co.ke</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" size={18} className="text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">Nairobi Showroom</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={18} className="text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Hours</p>
                      <p className="font-medium text-foreground">Mon-Sat: 8AM-6PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;