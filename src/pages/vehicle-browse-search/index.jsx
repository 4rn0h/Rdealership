// src/pages/VehicleBrowseSearch/index.jsx

import React, { useState, useEffect } from 'react';
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

// ✅ Import external vehicle mock data
import vehiclesData from '../../data/Vehicles_Data';

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
    year: 'all',
    priceRange: { min: '', max: '' },
    mileageRange: { min: '', max: '' },
    yearRange: { min: '', max: '' },
    features: []
  });

  // Load initial data
  useEffect(() => {
    const loadVehicles = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVehicles(vehiclesData);
        setFilteredVehicles(vehiclesData);
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
        vehicle?.features?.some(feature => 
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
          vehicle?.features?.includes(feature)
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
        case 'date-new':
          return new Date(b.listedDate) - new Date(a.listedDate);
        default:
          return new Date(b.listedDate) - new Date(a.listedDate); // fallback relevance
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
      setVehicles([...vehiclesData]);
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
