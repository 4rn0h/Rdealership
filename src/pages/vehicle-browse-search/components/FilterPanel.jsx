import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onClose, 
  isOpen = false, 
  isMobile = false,
  vehicleCount = 0 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const makeOptions = [
    { value: 'all', label: 'All Makes' },
    { value: 'mercedes-benz', label: 'Mercedes-Benz' },
    { value: 'bmw', label: 'BMW' },
    { value: 'audi', label: 'Audi' },
    { value: 'lexus', label: 'Lexus' },
    { value: 'jaguar', label: 'Jaguar' },
    { value: 'porsche', label: 'Porsche' },
    { value: 'land-rover', label: 'Land Rover' },
    { value: 'volvo', label: 'Volvo' },
    { value: 'infiniti', label: 'Infiniti' },
    { value: 'cadillac', label: 'Cadillac' }
  ];

  const modelOptions = {
    'mercedes-benz': [
      { value: 'all', label: 'All Models' },
      { value: 'c-class', label: 'C-Class' },
      { value: 'e-class', label: 'E-Class' },
      { value: 's-class', label: 'S-Class' },
      { value: 'gle', label: 'GLE' },
      { value: 'glc', label: 'GLC' },
      { value: 'g-class', label: 'G-Class' }
    ],
    'bmw': [
      { value: 'all', label: 'All Models' },
      { value: '3-series', label: '3 Series' },
      { value: '5-series', label: '5 Series' },
      { value: '7-series', label: '7 Series' },
      { value: 'x3', label: 'X3' },
      { value: 'x5', label: 'X5' },
      { value: 'x7', label: 'X7' }
    ],
    'audi': [
      { value: 'all', label: 'All Models' },
      { value: 'a4', label: 'A4' },
      { value: 'a6', label: 'A6' },
      { value: 'a8', label: 'A8' },
      { value: 'q5', label: 'Q5' },
      { value: 'q7', label: 'Q7' },
      { value: 'q8', label: 'Q8' }
    ]
  };

  const bodyTypeOptions = [
    { value: 'all', label: 'All Body Types' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'coupe', label: 'Coupe' },
    { value: 'convertible', label: 'Convertible' },
    { value: 'wagon', label: 'Wagon' },
    { value: 'hatchback', label: 'Hatchback' }
  ];

  const fuelTypeOptions = [
    { value: 'all', label: 'All Fuel Types' },
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'electric', label: 'Electric' },
    { value: 'plug-in-hybrid', label: 'Plug-in Hybrid' }
  ];

  const transmissionOptions = [
    { value: 'all', label: 'All Transmissions' },
    { value: 'automatic', label: 'Automatic' },
    { value: 'manual', label: 'Manual' },
    { value: 'cvt', label: 'CVT' }
  ];

  const conditionOptions = [
    { value: 'all', label: 'All Conditions' },
    { value: 'new', label: 'New' },
    { value: 'used', label: 'Used' },
    { value: 'certified', label: 'Certified Pre-Owned' }
  ];

  const currentYear = new Date()?.getFullYear();
  const yearOptions = [
    { value: 'all', label: 'All Years' },
    ...Array.from({ length: 20 }, (_, i) => {
      const year = currentYear - i;
      return { value: year?.toString(), label: year?.toString() };
    })
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    
    // Reset model when make changes
    if (key === 'make' && value !== localFilters?.make) {
      newFilters.model = 'all';
    }
    
    setLocalFilters(newFilters);
  };

  const handlePriceRangeChange = (type, value) => {
    const newFilters = {
      ...localFilters,
      priceRange: {
        ...localFilters?.priceRange,
        [type]: value ? parseInt(value) : ''
      }
    };
    setLocalFilters(newFilters);
  };

  const handleMileageRangeChange = (type, value) => {
    const newFilters = {
      ...localFilters,
      mileageRange: {
        ...localFilters?.mileageRange,
        [type]: value ? parseInt(value) : ''
      }
    };
    setLocalFilters(newFilters);
  };

  const handleYearRangeChange = (type, value) => {
    const newFilters = {
      ...localFilters,
      yearRange: {
        ...localFilters?.yearRange,
        [type]: value ? parseInt(value) : ''
      }
    };
    setLocalFilters(newFilters);
  };

  const handleFeatureToggle = (feature) => {
    const currentFeatures = localFilters?.features || [];
    const newFeatures = currentFeatures?.includes(feature)
      ? currentFeatures?.filter(f => f !== feature)
      : [...currentFeatures, feature];
    
    setLocalFilters({ ...localFilters, features: newFeatures });
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const resetFilters = () => {
    const resetFilters = {
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
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.make !== 'all') count++;
    if (localFilters?.model !== 'all') count++;
    if (localFilters?.bodyType !== 'all') count++;
    if (localFilters?.fuelType !== 'all') count++;
    if (localFilters?.transmission !== 'all') count++;
    if (localFilters?.condition !== 'all') count++;
    if (localFilters?.year !== 'all') count++;
    if (localFilters?.priceRange?.min || localFilters?.priceRange?.max) count++;
    if (localFilters?.mileageRange?.min || localFilters?.mileageRange?.max) count++;
    if (localFilters?.yearRange?.min || localFilters?.yearRange?.max) count++;
    if (localFilters?.features?.length > 0) count++;
    return count;
  };

  const popularFeatures = [
    'Leather Seats',
    'Sunroof',
    'Navigation System',
    'Backup Camera',
    'Bluetooth',
    'Heated Seats',
    'Premium Sound',
    'Keyless Entry',
    'Cruise Control',
    'Parking Sensors',
    'Lane Assist',
    'Adaptive Cruise',
    'Wireless Charging',
    'Apple CarPlay',
    'Android Auto',
    'Premium Wheels'
  ];

  const panelContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Filter Vehicles
          </h2>
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg luxury-micro-transition"
          >
            <Icon name="X" size={20} />
          </button>
        )}
      </div>

      {/* Filters Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Make & Model */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Make & Model</h3>
          <Select
            label="Make"
            options={makeOptions}
            value={localFilters?.make}
            onChange={(value) => handleFilterChange('make', value)}
          />
          {localFilters?.make !== 'all' && modelOptions?.[localFilters?.make] && (
            <Select
              label="Model"
              options={modelOptions?.[localFilters?.make]}
              value={localFilters?.model}
              onChange={(value) => handleFilterChange('model', value)}
            />
          )}
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Price Range (KES)</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              label="Min Price"
              placeholder="0"
              value={localFilters?.priceRange?.min || ''}
              onChange={(e) => handlePriceRangeChange('min', e?.target?.value)}
            />
            <Input
              type="number"
              label="Max Price"
              placeholder="No limit"
              value={localFilters?.priceRange?.max || ''}
              onChange={(e) => handlePriceRangeChange('max', e?.target?.value)}
            />
          </div>
        </div>

        {/* Year Range */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Year Range</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              label="From Year"
              placeholder="2000"
              min="1990"
              max={currentYear}
              value={localFilters?.yearRange?.min || ''}
              onChange={(e) => handleYearRangeChange('min', e?.target?.value)}
            />
            <Input
              type="number"
              label="To Year"
              placeholder={currentYear?.toString()}
              min="1990"
              max={currentYear}
              value={localFilters?.yearRange?.max || ''}
              onChange={(e) => handleYearRangeChange('max', e?.target?.value)}
            />
          </div>
        </div>

        {/* Mileage Range */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Mileage Range (km)</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              label="Min Mileage"
              placeholder="0"
              value={localFilters?.mileageRange?.min || ''}
              onChange={(e) => handleMileageRangeChange('min', e?.target?.value)}
            />
            <Input
              type="number"
              label="Max Mileage"
              placeholder="No limit"
              value={localFilters?.mileageRange?.max || ''}
              onChange={(e) => handleMileageRangeChange('max', e?.target?.value)}
            />
          </div>
        </div>

        {/* Vehicle Type */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Vehicle Details</h3>
          <Select
            label="Body Type"
            options={bodyTypeOptions}
            value={localFilters?.bodyType}
            onChange={(value) => handleFilterChange('bodyType', value)}
          />
          <Select
            label="Fuel Type"
            options={fuelTypeOptions}
            value={localFilters?.fuelType}
            onChange={(value) => handleFilterChange('fuelType', value)}
          />
          <Select
            label="Transmission"
            options={transmissionOptions}
            value={localFilters?.transmission}
            onChange={(value) => handleFilterChange('transmission', value)}
          />
          <Select
            label="Condition"
            options={conditionOptions}
            value={localFilters?.condition}
            onChange={(value) => handleFilterChange('condition', value)}
          />
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Popular Features</h3>
          <div className="grid grid-cols-2 gap-2">
            {popularFeatures?.map((feature) => (
              <Checkbox
                key={feature}
                label={feature}
                checked={localFilters?.features?.includes(feature) || false}
                onChange={() => handleFeatureToggle(feature)}
                size="sm"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {vehicleCount} vehicles found
          </p>
          <button
            onClick={resetFilters}
            className="text-sm text-accent hover:text-accent/80 luxury-micro-transition"
          >
            Reset All
          </button>
        </div>
        <div className="flex space-x-3">
          {isMobile && (
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
          <Button
            variant="default"
            onClick={applyFilters}
            className="flex-1"
            iconName="Filter"
            iconPosition="left"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
            <div className="fixed inset-x-0 bottom-0 top-16 bg-card border-t border-border">
              {panelContent}
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className="w-80 bg-card border-r border-border h-full">
      {panelContent}
    </div>
  );
};

export default FilterPanel;