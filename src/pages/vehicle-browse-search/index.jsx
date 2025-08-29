import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';

import Button from '../../components/ui/Button';

import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';
import ViewToggle from './components/ViewToggle';
import VehicleGrid from './components/VehicleGrid';
import LoadingSpinner from './components/LoadingSpinner';

const VehicleBrowseSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State management
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('search') || '');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [favoriteVehicles, setFavoriteVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreVehicles, setHasMoreVehicles] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [filters, setFilters] = useState({
    make: 'all',
    model: 'all',
    bodyType: 'all',
    fuelType: 'all',
    transmission: 'all',
    condition: 'all',
    year: 'all',
    priceRange: { min: '', max: '' },
    mileageRange: { min: '', max: '' },
    yearRange: { min: '', max: '' },
    features: []
  });

  // Mock vehicle data
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
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop'
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
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop'
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
    },
    {
      id: 4,
      make: 'Lexus',
      model: 'RX',
      variant: 'RX 350 F Sport',
      year: 2022,
      price: 8900000,
      mileage: 22000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'SUV',
      condition: 'used',
      location: 'Kisumu',
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop'
      ],
      keyFeatures: ['Hybrid System', 'Mark Levinson Audio', 'Safety System+', 'Wireless Charging'],
      listedDate: '5 days ago',
      popularity: 85
    },
    {
      id: 5,
      make: 'Jaguar',
      model: 'F-PACE',
      variant: 'P300 R-Dynamic',
      year: 2023,
      price: 10500000,
      mileage: 12000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'SUV',
      condition: 'used',
      location: 'Nairobi',
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop'
      ],
      keyFeatures: ['Meridian Sound', 'Terrain Response', 'Activity Key', 'Gesture Tailgate'],
      listedDate: '1 day ago',
      popularity: 78
    },
    {
      id: 6,
      make: 'Porsche',
      model: 'Macan',
      variant: 'Macan S',
      year: 2023,
      price: 12800000,
      mileage: 5500,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'SUV',
      condition: 'used',
      location: 'Nairobi',
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop'
      ],
      keyFeatures: ['Sport Chrono', 'PASM', 'Bose Audio', 'Panoramic Roof'],
      listedDate: '4 hours ago',
      popularity: 96
    },
    {
      id: 7,
      make: 'Land Rover',
      model: 'Range Rover Evoque',
      variant: 'P250 R-Dynamic',
      year: 2022,
      price: 7500000,
      mileage: 35000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'SUV',
      condition: 'used',
      location: 'Eldoret',
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop'
      ],
      keyFeatures: ['Terrain Response 2', 'ClearSight', 'Touch Pro Duo', 'Wade Sensing'],
      listedDate: '1 week ago',
      popularity: 82
    },
    {
      id: 8,
      make: 'Volvo',
      model: 'XC90',
      variant: 'T6 Inscription',
      year: 2023,
      price: 11200000,
      mileage: 18000,
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      bodyType: 'SUV',
      condition: 'used',
      location: 'Nairobi',
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'
      ],
      keyFeatures: ['Pilot Assist', 'Bowers & Wilkins', 'Air Suspension', 'Crystal Gear Shifter'],
      listedDate: '2 days ago',
      popularity: 89
    }
  ];

  // Load initial data
  useEffect(() => {
    const loadVehicles = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVehicles(mockVehicles);
        setFilteredVehicles(mockVehicles);
      } catch (error) {
        console.error('Error loading vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('RoyaMotorsUk_favorites');
    if (savedFavorites) {
      setFavoriteVehicles(JSON.parse(savedFavorites));
    }
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...vehicles];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(vehicle =>
        vehicle?.make?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        vehicle?.model?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        vehicle?.variant?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        vehicle?.keyFeatures?.some(feature => 
          feature?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        )
      );
    }

    // Apply filters
    if (filters?.make !== 'all') {
      filtered = filtered?.filter(vehicle => 
        vehicle?.make?.toLowerCase()?.replace(' ', '-') === filters?.make
      );
    }

    if (filters?.model !== 'all') {
      filtered = filtered?.filter(vehicle => 
        vehicle?.model?.toLowerCase()?.replace(' ', '-') === filters?.model
      );
    }

    if (filters?.bodyType !== 'all') {
      filtered = filtered?.filter(vehicle => vehicle?.bodyType?.toLowerCase() === filters?.bodyType);
    }

    if (filters?.fuelType !== 'all') {
      filtered = filtered?.filter(vehicle => 
        vehicle?.fuelType?.toLowerCase()?.replace(' ', '-') === filters?.fuelType
      );
    }

    if (filters?.transmission !== 'all') {
      filtered = filtered?.filter(vehicle => vehicle?.transmission?.toLowerCase() === filters?.transmission);
    }

    if (filters?.condition !== 'all') {
      filtered = filtered?.filter(vehicle => vehicle?.condition === filters?.condition);
    }

    if (filters?.year !== 'all') {
      filtered = filtered?.filter(vehicle => vehicle?.year?.toString() === filters?.year);
    }

    // Price range filter
    if (filters?.priceRange?.min) {
      filtered = filtered?.filter(vehicle => vehicle?.price >= filters?.priceRange?.min);
    }
    if (filters?.priceRange?.max) {
      filtered = filtered?.filter(vehicle => vehicle?.price <= filters?.priceRange?.max);
    }

    // Mileage range filter
    if (filters?.mileageRange?.min) {
      filtered = filtered?.filter(vehicle => vehicle?.mileage >= filters?.mileageRange?.min);
    }
    if (filters?.mileageRange?.max) {
      filtered = filtered?.filter(vehicle => vehicle?.mileage <= filters?.mileageRange?.max);
    }

    // Year range filter
    if (filters?.yearRange?.min) {
      filtered = filtered?.filter(vehicle => vehicle?.year >= filters?.yearRange?.min);
    }
    if (filters?.yearRange?.max) {
      filtered = filtered?.filter(vehicle => vehicle?.year <= filters?.yearRange?.max);
    }

    // Features filter
    if (filters?.features && filters?.features?.length > 0) {
      filtered = filtered?.filter(vehicle =>
        filters?.features?.every(feature =>
          vehicle?.keyFeatures?.includes(feature)
        )
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a?.price - b?.price;
        case 'price-high':
          return b?.price - a?.price;
        case 'year-new':
          return b?.year - a?.year;
        case 'year-old':
          return a?.year - b?.year;
        case 'mileage-low':
          return a?.mileage - b?.mileage;
        case 'mileage-high':
          return b?.mileage - a?.mileage;
        case 'popularity':
          return b?.popularity - a?.popularity;
        case 'date-new':
          return new Date(b.listedDate) - new Date(a.listedDate);
        default:
          return b?.popularity - a?.popularity; // relevance
      }
    });

    setFilteredVehicles(filtered);
  }, [vehicles, searchTerm, filters, sortBy]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params?.set('search', term);
    } else {
      params?.delete('search');
    }
    setSearchParams(params);
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle filter removal
  const handleFilterRemove = (filterKey) => {
    const newFilters = { ...filters };
    
    switch (filterKey) {
      case 'priceRange':
        newFilters.priceRange = { min: '', max: '' };
        break;
      case 'mileageRange':
        newFilters.mileageRange = { min: '', max: '' };
        break;
      case 'yearRange':
        newFilters.yearRange = { min: '', max: '' };
        break;
      case 'features':
        newFilters.features = [];
        break;
      default:
        newFilters[filterKey] = 'all';
    }
    
    setFilters(newFilters);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setFilters({
      make: 'all',
      model: 'all',
      bodyType: 'all',
      fuelType: 'all',
      transmission: 'all',
      condition: 'all',
      year: 'all',
      priceRange: { min: '', max: '' },
      mileageRange: { min: '', max: '' },
      yearRange: { min: '', max: '' },
      features: []
    });
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (vehicleId) => {
    const user = localStorage.getItem('RoyaMotorsUk_user');
    if (!user) {
      navigate('/user-authentication');
      return;
    }

    const newFavorites = favoriteVehicles?.includes(vehicleId)
      ? favoriteVehicles?.filter(id => id !== vehicleId)
      : [...favoriteVehicles, vehicleId];
    
    setFavoriteVehicles(newFavorites);
    localStorage.setItem('RoyaMotorsUk_favorites', JSON.stringify(newFavorites));
  };

  // Handle pull to refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Simulate data refresh
      setVehicles([...mockVehicles]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Check if mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Desktop Filter Sidebar */}
          {!isMobile && (
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClose={() => {}}
              vehicleCount={filteredVehicles?.length}
              isMobile={false}
            />
          )}

          {/* Main Content */}
          <div className={`flex-1 flex flex-col overflow-hidden ${!isMobile ? 'ml-0' : ''}`}>
            {/* Search and Controls Header */}
            <div className="bg-card border-b border-border p-6 space-y-4">
              {/* Search Bar */}
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search luxury vehicles by make, model, or features..."
                className="max-w-2xl"
              />

              {/* Controls Row */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  {/* Mobile Filter Button */}
                  {isMobile && (
                    <Button
                      variant="outline"
                      onClick={() => setShowMobileFilters(true)}
                      iconName="Filter"
                      iconPosition="left"
                    >
                      Filters
                    </Button>
                  )}

                  {/* Results Count */}
                  <div className="text-sm text-muted-foreground">
                    {loading ? (
                      'Loading vehicles...'
                    ) : (
                      `${filteredVehicles?.length} vehicle${filteredVehicles?.length !== 1 ? 's' : ''} found`
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <SortDropdown
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                  />

                  {/* View Toggle */}
                  <ViewToggle
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                  />

                  {/* Refresh Button */}
                  <Button
                    variant="ghost"
                    onClick={handleRefresh}
                    loading={refreshing}
                    iconName="RefreshCw"
                    className="hidden sm:flex"
                  >
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Active Filters */}
              <FilterChips
                filters={filters}
                onFilterRemove={handleFilterRemove}
                onClearAll={handleClearAllFilters}
              />
            </div>

            {/* Vehicle Grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center py-16">
                    <LoadingSpinner size="lg" text="Loading luxury vehicles..." />
                  </div>
                ) : (
                  <VehicleGrid
                    vehicles={filteredVehicles}
                    viewMode={viewMode}
                    onFavoriteToggle={handleFavoriteToggle}
                    favoriteVehicles={favoriteVehicles}
                    loading={loading}
                  />
                )}

                {/* Load More Button */}
                {!loading && filteredVehicles?.length > 0 && hasMoreVehicles && (
                  <div className="flex justify-center mt-12">
                    <Button
                      variant="outline"
                      onClick={() => {
                        // Simulate loading more vehicles
                        setCurrentPage(prev => prev + 1);
                      }}
                      iconName="ChevronDown"
                      iconPosition="right"
                    >
                      Load More Vehicles
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Panel */}
        {isMobile && (
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClose={() => setShowMobileFilters(false)}
            isOpen={showMobileFilters}
            isMobile={true}
            vehicleCount={filteredVehicles?.length}
          />
        )}
      </div>
    </div>
  );
};

export default VehicleBrowseSearch;