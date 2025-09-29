// src/pages/VehicleBrowseSearch/index.jsx

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import FilterPanel from './components/FilterPanel';
import LoadingSpinner from './components/LoadingSpinner';
import VehicleGrid from './components/VehicleGrid';
import {
  ChevronDown,
  RefreshCw,
  Grid,
  List,
  X,
  SlidersHorizontal,
} from 'lucide-react';

const VehicleBrowseSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // State
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    searchParams?.get('search') || ''
  );
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [favoriteVehicles, setFavoriteVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreVehicles, setHasMoreVehicles] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simplified filters
  const [filters, setFilters] = useState({
    make: 'all',
    priceRange: { min: '', max: '' },
  });

  // ✅ Load vehicles from Supabase with normalization
  const loadVehicles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const normalized = (data || []).map((row) => {
        const imageUrls = row.image_urls || [];
        const primaryImage = imageUrls.length > 0 ? imageUrls[0] : null;

        return {
          ...row,
          fuelType: row.fuel_type ?? '',
          bodyType: row.body_type ?? '',
          images: imageUrls,
          imageUrls: imageUrls,
          image_url: primaryImage,
          imageUrl: primaryImage,
        };
      });

      setVehicles(normalized);
      setFilteredVehicles(normalized);
    } catch (err) {
      console.error('Error loading vehicles:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  // Favorites
  useEffect(() => {
    const savedFavorites = localStorage.getItem('RoyaMotorsUk_favorites');
    if (savedFavorites) {
      setFavoriteVehicles(JSON.parse(savedFavorites));
    }
  }, []);

  // Filtering + sorting
  useEffect(() => {
    let filtered = [...vehicles];

    if (searchTerm) {
      filtered = filtered.filter(
        (v) =>
          v?.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v?.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v?.features?.some((f) =>
            f?.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (filters.make !== 'all') {
      filtered = filtered.filter(
        (v) =>
          v?.make?.toLowerCase()?.replace(' ', '-') === filters.make
      );
    }

    if (filters.priceRange.min) {
      filtered = filtered.filter(
        (v) => v?.price >= parseInt(filters.priceRange.min)
      );
    }
    if (filters.priceRange.max) {
      filtered = filtered.filter(
        (v) => v?.price <= parseInt(filters.priceRange.max)
      );
    }

    filtered.sort((a, b) => {
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
          return new Date(b.created_at) - new Date(a.created_at);
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });

    setFilteredVehicles(filtered);
  }, [vehicles, searchTerm, filters, sortBy]);

  // Search
  const handleSearch = (term) => {
    setSearchTerm(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  // Filter changes
  const handleFiltersChange = (newFilters) => setFilters(newFilters);

  const handleFilterRemove = (key) => {
    const newFilters = { ...filters };
    if (key === 'priceRange') {
      newFilters.priceRange = { min: '', max: '' };
    } else {
      newFilters[key] = 'all';
    }
    setFilters(newFilters);
  };

  const handleClearAllFilters = () =>
    setFilters({ make: 'all', priceRange: { min: '', max: '' } });

  // Favorites toggle
  const handleFavoriteToggle = (id) => {
    const user = localStorage.getItem('RoyaMotorsUk_user');
    if (!user) {
      navigate('/user-authentication');
      return;
    }
    const updated = favoriteVehicles.includes(id)
      ? favoriteVehicles.filter((f) => f !== id)
      : [...favoriteVehicles, id];
    setFavoriteVehicles(updated);
    localStorage.setItem('RoyaMotorsUk_favorites', JSON.stringify(updated));
  };

  // Refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadVehicles();
    setRefreshing(false);
  };

  // Mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Quick Filters
  const QuickFilterDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
        className="flex items-center gap-2 px-4 py-3 bg-accent text-primary-foreground rounded-lg luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium"
      >
        <SlidersHorizontal size={18} />
        <span className="font-caption font-semibold">Filters</span>
        <ChevronDown
          size={16}
          className={`luxury-transition ${
            showFilterDropdown ? 'rotate-180' : ''
          }`}
        />
      </button>

      {showFilterDropdown && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-xl luxury-shadow-prominent z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair font-semibold text-lg">
                Quick Filters
              </h3>
              <button
                onClick={() => setShowFilterDropdown(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Make */}
            <div className="mb-4">
              <label className="block text-sm font-caption font-medium mb-2">
                Make
              </label>
              <select
                value={filters.make}
                onChange={(e) =>
                  setFilters({ ...filters, make: e.target.value })
                }
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

            {/* Price */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-sm font-caption font-medium mb-2">
                  Min Price (KES)
                </label>
                <input
                  type="number"
                  value={filters.priceRange.min}
                  placeholder="Min"
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceRange: {
                        ...filters.priceRange,
                        min: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-caption font-medium mb-2">
                  Max Price (KES)
                </label>
                <input
                  type="number"
                  value={filters.priceRange.max}
                  placeholder="Max"
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceRange: {
                        ...filters.priceRange,
                        max: e.target.value,
                      },
                    })
                  }
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

  // Chips
  const LuxuryFilterChips = ({ filters, onFilterRemove, onClearAll }) => {
    const active = [];
    if (filters.make !== 'all')
      active.push({ key: 'make', label: `Make: ${filters.make}` });
    if (filters.priceRange.min || filters.priceRange.max) {
      active.push({
        key: 'priceRange',
        label: `Price: ${
          filters.priceRange.min
            ? `KES ${parseInt(filters.priceRange.min).toLocaleString()}`
            : ''
        }${
          filters.priceRange.min && filters.priceRange.max ? ' - ' : ''
        }${
          filters.priceRange.max
            ? `KES ${parseInt(filters.priceRange.max).toLocaleString()}`
            : ''
        }`,
      });
    }
    if (active.length === 0) return null;
    return (
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="text-sm text-muted-foreground font-caption mr-2">
          Active filters:
        </span>
        {active.map((f) => (
          <div
            key={f.key}
            className="flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-caption luxury-shadow-subtle"
          >
            <span>{f.label}</span>
            <button
              onClick={() => onFilterRemove(f.key)}
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

      {/* Hero */}
      <div className="luxury-gradient text-primary-foreground pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2Zy...')]"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex px-4 py-2 rounded-full bg-primary-foreground/20 border border-primary-foreground/30 mb-4">
              <span className="text-primary-foreground font-caption font-semibold text-sm uppercase">
                Exclusive Collection
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Luxury Vehicle Portfolio
            </h1>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-4"></div>
            <p className="text-lg text-primary-foreground/80 font-caption">
              Discover our curated selection of premium vehicles sourced
              directly from the UK
            </p>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="container-custom py-6">
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search Bentley, Range Rover, Mercedes-Benz..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground font-caption focus:border-accent outline-none"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <QuickFilterDropdown />
            </div>

            {/* Results + Controls */}
            <div className="flex items-center gap-4">
              <div className="text-lg font-playfair font-bold text-foreground">
                {filteredVehicles.length}
              </div>
              <div className="text-muted-foreground font-caption text-sm hidden sm:block">
                luxury vehicle{filteredVehicles.length !== 1 ? 's' : ''}{' '}
                available
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm font-caption focus:border-accent outline-none"
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
                    className={`p-2 rounded ${
                      viewMode === 'grid'
                        ? 'bg-accent text-primary-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${
                      viewMode === 'list'
                        ? 'bg-accent text-primary-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>
                <button
                  onClick={handleRefresh}
                  className="p-2 text-muted-foreground hover:text-foreground rounded-lg"
                  disabled={refreshing}
                >
                  <RefreshCw
                    size={16}
                    className={refreshing ? 'animate-spin' : ''}
                  />
                </button>
              </div>
            </div>
          </div>
          <LuxuryFilterChips
            filters={filters}
            onFilterRemove={handleFilterRemove}
            onClearAll={handleClearAllFilters}
          />
        </div>

        {/* Vehicle Grid */}
        <div className="w-full">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <LoadingSpinner size="lg" text="Loading luxury vehicles..." />
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🚗</div>
              <h3 className="text-xl font-playfair font-semibold mb-2">
                No vehicles found
              </h3>
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
              {!loading && filteredVehicles.length > 0 && hasMoreVehicles && (
                <div className="flex justify-center mt-12">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => p + 1)}
                    iconName="ChevronDown"
                    iconPosition="right"
                  >
                    Load More Exclusive Vehicles
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {isMobile && showMobileFilters && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-card border-l border-border">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClose={() => setShowMobileFilters(false)}
              isMobile={true}
              vehicleCount={filteredVehicles.length}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleBrowseSearch;
