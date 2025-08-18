import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterSidebar = ({ filters, onFiltersChange, onSavePreset, savedPresets, onLoadPreset, onClearFilters }) => {
  const [presetName, setPresetName] = useState('');
  const [showSavePreset, setShowSavePreset] = useState(false);

  const makeOptions = [
    { value: '', label: 'All Makes' },
    { value: 'mercedes', label: 'Mercedes-Benz' },
    { value: 'bmw', label: 'BMW' },
    { value: 'audi', label: 'Audi' },
    { value: 'lexus', label: 'Lexus' },
    { value: 'porsche', label: 'Porsche' },
    { value: 'jaguar', label: 'Jaguar' },
    { value: 'landrover', label: 'Land Rover' },
    { value: 'bentley', label: 'Bentley' },
    { value: 'rollsroyce', label: 'Rolls-Royce' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'sold', label: 'Sold' },
    { value: 'reserved', label: 'Reserved' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'mombasa', label: 'Mombasa' },
    { value: 'kisumu', label: 'Kisumu' },
    { value: 'nakuru', label: 'Nakuru' },
    { value: 'eldoret', label: 'Eldoret' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleSavePreset = () => {
    if (presetName?.trim()) {
      onSavePreset(presetName?.trim(), filters);
      setPresetName('');
      setShowSavePreset(false);
    }
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters)?.filter(value => 
      value !== '' && value !== null && value !== undefined
    )?.length;
  };

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Saved Presets */}
        {savedPresets?.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-2">Saved Presets</h4>
            <div className="space-y-2">
              {savedPresets?.map((preset) => (
                <button
                  key={preset?.id}
                  onClick={() => onLoadPreset(preset)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted luxury-micro-transition text-left"
                >
                  <span className="text-sm text-foreground">{preset?.name}</span>
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Save Current Filters */}
        <div className="mb-6">
          {!showSavePreset ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowSavePreset(true)}
              iconName="Bookmark"
              iconPosition="left"
              fullWidth
              disabled={getActiveFiltersCount() === 0}
            >
              Save Current Filters
            </Button>
          ) : (
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Preset name"
                value={presetName}
                onChange={(e) => setPresetName(e?.target?.value)}
              />
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={handleSavePreset}
                  disabled={!presetName?.trim()}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setShowSavePreset(false);
                    setPresetName('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Make Filter */}
        <div>
          <Select
            label="Make"
            options={makeOptions}
            value={filters?.make || ''}
            onChange={(value) => handleFilterChange('make', value)}
          />
        </div>

        {/* Model Filter */}
        <div>
          <Input
            label="Model"
            type="text"
            placeholder="Enter model name"
            value={filters?.model || ''}
            onChange={(e) => handleFilterChange('model', e?.target?.value)}
          />
        </div>

        {/* Year Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Year Range</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="From"
              value={filters?.yearFrom || ''}
              onChange={(e) => handleFilterChange('yearFrom', e?.target?.value)}
            />
            <Input
              type="number"
              placeholder="To"
              value={filters?.yearTo || ''}
              onChange={(e) => handleFilterChange('yearTo', e?.target?.value)}
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Price Range (KES)</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min price"
              value={filters?.priceFrom || ''}
              onChange={(e) => handleFilterChange('priceFrom', e?.target?.value)}
            />
            <Input
              type="number"
              placeholder="Max price"
              value={filters?.priceTo || ''}
              onChange={(e) => handleFilterChange('priceTo', e?.target?.value)}
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status || ''}
            onChange={(value) => handleFilterChange('status', value)}
          />
        </div>

        {/* Location Filter */}
        <div>
          <Select
            label="Location"
            options={locationOptions}
            value={filters?.location || ''}
            onChange={(value) => handleFilterChange('location', value)}
          />
        </div>

        {/* Date Added */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Date Added</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={filters?.dateFrom || ''}
              onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
            />
            <Input
              type="date"
              value={filters?.dateTo || ''}
              onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
            />
          </div>
        </div>

        {/* Mileage Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Mileage Range (km)</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min km"
              value={filters?.mileageFrom || ''}
              onChange={(e) => handleFilterChange('mileageFrom', e?.target?.value)}
            />
            <Input
              type="number"
              placeholder="Max km"
              value={filters?.mileageTo || ''}
              onChange={(e) => handleFilterChange('mileageTo', e?.target?.value)}
            />
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <Select
            label="Fuel Type"
            options={[
              { value: '', label: 'All Fuel Types' },
              { value: 'petrol', label: 'Petrol' },
              { value: 'diesel', label: 'Diesel' },
              { value: 'hybrid', label: 'Hybrid' },
              { value: 'electric', label: 'Electric' }
            ]}
            value={filters?.fuelType || ''}
            onChange={(value) => handleFilterChange('fuelType', value)}
          />
        </div>

        {/* Transmission */}
        <div>
          <Select
            label="Transmission"
            options={[
              { value: '', label: 'All Transmissions' },
              { value: 'automatic', label: 'Automatic' },
              { value: 'manual', label: 'Manual' },
              { value: 'cvt', label: 'CVT' }
            ]}
            value={filters?.transmission || ''}
            onChange={(value) => handleFilterChange('transmission', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;