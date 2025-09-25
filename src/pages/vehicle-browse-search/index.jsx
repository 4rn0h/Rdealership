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
import { Filter, ChevronDown, RefreshCw, Grid, List, X, SlidersHorizontal } from 'lucide-react';

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
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
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
        await new Promise(resolve => setTimeout(resolve, 800));
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

    if (searchTerm) {
      filtered = filtered?.filter(vehicle =>
        vehicle?.make?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        vehicle?.model?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        vehicle?.features?.some(feature => 
          feature?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        )
      );
    }

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
      filtered = filtered?.filter(vehicle => vehicle?.price >= parseInt(filters?.priceRange?.min));
    }
    if (filters?.priceRange?.max) {
      filtered = filtered?.filter(vehicle => vehicle?.price <= parseInt(filters?.priceRange?.max));
    }

    // Mileage range filter
    if (filters?.mileageRange?.min) {
      filtered = filtered?.filter(vehicle => vehicle?.mileage >= parseInt(filters?.mileageRange?.min));
    }
    if (filters?.mileageRange?.max) {
      filtered = filtered?.filter(vehicle => vehicle?.mileage <= parseInt(filters?.mileageRange?.max));
    }

    // Year range filter
    if (filters?.yearRange?.min) {
      filtered = filtered?.filter(vehicle => vehicle?.year >= parseInt(filters?.yearRange?.min));
    }
    if (filters?.yearRange?.max) {
      filtered = filtered?.filter(vehicle => vehicle?.year <= parseInt(filters?.yearRange?.max));
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
          return new Date(b.listedDate) - new Date(a.listedDate);
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

  // Quick Filter Dropdown Component
  const QuickFilterDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
        className="flex items-center gap-2 px-4 py-3 bg-accent text-primary-foreground rounded-lg luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium"
      >
        <SlidersHorizontal size={18} />
        <span className="font-caption font-semibold">Filters</span>
        <ChevronDown size={16} className={`luxury-transition ${showFilterDropdown ? 'rotate-180' : ''}`} />
      </button>

      {showFilterDropdown && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-xl luxury-shadow-prominent z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair font-semibold text-lg">Quick Filters</h3>
              <button
                onClick={() => setShowFilterDropdown(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Make Filter */}
            <div className="mb-4">
              <label className="block text-sm font-caption font-medium mb-2">Make</label>
              <select
                value={filters.make}
                onChange={(e) => setFilters({...filters, make: e.target.value})}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Makes</option>
                <option value="bentley">Bentley</option>
                <option value="range-rover">Range Rover</option>
                <option value="mercedes-benz">Mercedes-Benz</option>
                <option value="bmw">BMW</option>
                <option value="audi">Audi</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-sm font-caption font-medium mb-2">Min Price (KES)</label>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) => setFilters({...filters, priceRange: {...filters.priceRange, min: e.target.value}})}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-caption font-medium mb-2">Max Price (KES)</label>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters({...filters, priceRange: {...filters.priceRange, max: e.target.value}})}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* Year Range */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-caption font-medium mb-2">Min Year</label>
                <input
                  type="number"
                  placeholder="2020"
                  value={filters.yearRange.min}
                  onChange={(e) => setFilters({...filters, yearRange: {...filters.yearRange, min: e.target.value}})}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-caption font-medium mb-2">Max Year</label>
                <input
                  type="number"
                  placeholder="2024"
                  value={filters.yearRange.max}
                  onChange={(e) => setFilters({...filters, yearRange: {...filters.yearRange, max: e.target.value}})}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleClearAllFilters}
              className="w-full mt-4 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg luxury-transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Custom FilterChips component
  const LuxuryFilterChips = ({ filters, onFilterRemove, onClearAll }) => {
    const activeFilters = [];
    
    Object.keys(filters).forEach(key => {
      if (key === 'priceRange' && (filters.priceRange.min || filters.priceRange.max)) {
        activeFilters.push({
          key: 'priceRange',
          label: `Price: ${filters.priceRange.min ? `KES ${parseInt(filters.priceRange.min).toLocaleString()}` : ''}${filters.priceRange.min && filters.priceRange.max ? ' - ' : ''}${filters.priceRange.max ? `KES ${parseInt(filters.priceRange.max).toLocaleString()}` : ''}`
        });
      } else if (key === 'yearRange' && (filters.yearRange.min || filters.yearRange.max)) {
        activeFilters.push({
          key: 'yearRange',
          label: `Year: ${filters.yearRange.min || ''}${filters.yearRange.min && filters.yearRange.max ? ' - ' : ''}${filters.yearRange.max || ''}`
        });
      } else if (key === 'features' && filters.features.length > 0) {
        filters.features.forEach(feature => {
          activeFilters.push({ key: `feature-${feature}`, label: feature, feature: true });
        });
      } else if (filters[key] !== 'all' && filters[key] !== '' && !key.includes('Range')) {
        activeFilters.push({ key, label: `${key.charAt(0).toUpperCase() + key.slice(1)}: ${filters[key]}` });
      }
    });

    if (activeFilters.length === 0) return null;

    return (
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="text-sm text-muted-foreground font-caption mr-2">Active filters:</span>
        {activeFilters.map((filter) => (
          <div
            key={filter.key}
            className="flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-caption luxury-shadow-subtle"
          >
            <span>{filter.label}</span>
            <button
              onClick={() => filter.feature ? onFilterRemove('features') : onFilterRemove(filter.key)}
              className="hover:text-accent/70 luxury-transition"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <button
          onClick={onClearAll}
          className="text-sm text-muted-foreground hover:text-foreground luxury-transition font-caption underline"
        >
          Clear all
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Compact Hero Section (Smaller but keeping all original content) */}
      <div className="luxury-gradient text-primary-foreground pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMTUiLz48L2c+PC9zdmc+')]"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Premium Heritage Badge */}
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary-foreground/20 border border-primary-foreground/30 mb-4">
              <span className="text-primary-foreground font-caption font-semibold text-sm tracking-wider uppercase">
                Exclusive Collection
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Luxury Vehicle Portfolio
            </h1>
            
            {/* Accent Line */}
            <div className="w-16 h-0.5 bg-accent mx-auto mb-4 luxury-shadow-subtle"></div>
            
            {/* Description */}
            <p className="text-lg text-primary-foreground/80 font-caption leading-relaxed">
              Discover our curated selection of premium vehicles sourced directly from the UK
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-6">
        {/* Integrated Search and Filters Section */}
        <div className="bg-card rounded-xl luxury-shadow-subtle border border-border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search Bar with Integrated Filters */}
            <div className="flex-1 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search Bentley, Range Rover, Mercedes-Benz..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground font-caption luxury-transition focus:border-accent focus:luxury-shadow-medium outline-none"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Quick Filter Dropdown */}
              <QuickFilterDropdown />
            </div>

            {/* Results Count and Controls */}
            <div className="flex items-center gap-4">
              <div className="text-lg font-playfair font-bold text-foreground">
                {filteredVehicles?.length}
              </div>
              <div className="text-muted-foreground font-caption text-sm hidden sm:block">
                luxury vehicle{filteredVehicles?.length !== 1 ? 's' : ''} available
              </div>

              {/* Sort and View Controls */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm font-caption luxury-transition focus:border-accent outline-none"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low-High</option>
                  <option value="price-high">Price: High-Low</option>
                  <option value="year-new">Year: Newest</option>
                  <option value="year-old">Year: Oldest</option>
                  <option value="mileage-low">Mileage: Low-High</option>
                  <option value="mileage-high">Mileage: High-Low</option>
                </select>

                <div className="flex bg-background rounded-lg p-1 border border-border">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded luxury-transition ${
                      viewMode === 'grid' ? 'bg-accent text-primary-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded luxury-transition ${
                      viewMode === 'list' ? 'bg-accent text-primary-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={handleRefresh}
                  className="p-2 text-muted-foreground luxury-transition hover:text-foreground hover:bg-background rounded-lg"
                  disabled={refreshing}
                >
                  <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <LuxuryFilterChips
            filters={filters}
            onFilterRemove={handleFilterRemove}
            onClearAll={handleClearAllFilters}
          />
        </div>

        {/* Main Content Area - No Left Sidebar */}
        <div className="w-full">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <LoadingSpinner size="lg" text="Loading luxury vehicles..." />
            </div>
          ) : filteredVehicles?.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🚗</div>
              <h3 className="text-xl font-playfair font-semibold mb-2">No vehicles found</h3>
              <p className="text-muted-foreground font-caption">
                Try adjusting your filters or search terms to see more results
              </p>
            </div>
          ) : (
            <>
              <VehicleGrid
                vehicles={filteredVehicles}
                viewMode={viewMode}
                onFavoriteToggle={handleFavoriteToggle}
                favoriteVehicles={favoriteVehicles}
                loading={loading}
              />

              {/* Load More Button */}
              {!loading && filteredVehicles?.length > 0 && hasMoreVehicles && (
                <div className="flex justify-center mt-12">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentPage(prev => prev + 1);
                    }}
                    iconName="ChevronDown"
                    iconPosition="right"
                    className="luxury-transition hover:bg-accent hover:text-primary-foreground"
                  >
                    Load More Exclusive Vehicles
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Filter Panel Only */}
      {isMobile && showMobileFilters && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-card border-l border-border luxury-shadow-prominent">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClose={() => setShowMobileFilters(false)}
              isMobile={true}
              vehicleCount={filteredVehicles?.length}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleBrowseSearch;