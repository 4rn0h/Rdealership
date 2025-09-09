import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

// Components
import VehicleImageGallery from './components/VehicleImageGallery';
import VehicleSpecifications from './components/VehicleSpecifications';
import VehiclePricing from './components/VehiclePricing';
import VehicleActions from './components/VehicleActions';
import RelatedVehicles from './components/RelatedVehicles';

// ✅ Import central vehicle data
import vehiclesData from '../../data/Vehicles_Data';
import vehiclesSpecs from '../../data/Vehicle_Specs';

const VehicleDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const vehicleId = searchParams?.get('id') || null;
  
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadVehicleData = async () => {
      setLoading(true);

      // Simulate fetch delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // ✅ Find vehicle in Vehicles_Data
      const foundVehicle = vehiclesData.find(v => String(v.id) === String(vehicleId));

      setVehicle(foundVehicle || null);
      setLoading(false);
    };

    loadVehicleData();

    // Check authentication status
    const user = localStorage.getItem('RoyaMotorsUk_user');
    setIsAuthenticated(!!user);

    // Favorites check
    const favorites = JSON.parse(localStorage.getItem('RoyaMotorsUk_favorites') || '[]');
    setIsFavorite(favorites?.includes(vehicleId));

    // Track view history
    const viewHistory = JSON.parse(localStorage.getItem('RoyaMotorsUk_view_history') || '[]');
    const updatedHistory = [vehicleId, ...viewHistory.filter(id => id !== vehicleId)].slice(0, 10);
    localStorage.setItem('RoyaMotorsUk_view_history', JSON.stringify(updatedHistory));
  }, [vehicleId]);

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      navigate('/user-authentication');
      return;
    }

    const favorites = JSON.parse(localStorage.getItem('RoyaMotorsUk_favorites') || '[]');
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(id => id !== vehicleId);
    } else {
      updatedFavorites = [...favorites, vehicleId];
    }

    localStorage.setItem('RoyaMotorsUk_favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  // Breadcrumb
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Our Collection', path: '/vehicle-browse-search' },
    { label: vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Vehicle', path: null }
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

  // ✅ Wrap flat price into pricing object
  const pricing = {
    currentPrice: vehicle.price,
    basePrice: vehicle.price,
    taxes: 0,
    insurance: 0,
    warranty: 0,
    financing: null,
    priceHistory: []
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-6 py-8">
          {/* ✅ Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-8">
            {breadcrumbItems?.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                )}
                {item?.path ? (
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-muted-foreground hover:text-accent luxury-micro-transition"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className="text-foreground font-medium">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Vehicle Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-3 space-y-8">
              <VehicleImageGallery
                images={vehicle.images}
                vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              />

              {/* Description */}
              <div className="bg-card rounded-lg p-6 luxury-shadow-medium">
                <h2 className="text-xl font-heading font-bold text-foreground mb-4">Description</h2>
                <div className="prose prose-invert max-w-none">
                  {vehicle.description?.split('\n')?.map((p, i) => (
                    <p key={i} className="text-muted-foreground mb-4 last:mb-0">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Specs & Features */}
              <VehicleSpecifications vehicle={vehicle} />

              <RelatedVehicles
                currentVehicleId={vehicle.id}
                currentMake={vehicle.make}
                currentCategory={vehicle.category || 'luxury'}
              />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
              <VehiclePricing pricing={pricing} vehicleStatus={vehicle.status} />
              <VehicleActions
                vehicleId={vehicle.id}
                vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
                isAuthenticated={isAuthenticated}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
