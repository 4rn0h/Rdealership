import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ filters, onFilterRemove, onClearAll }) => {
  const getActiveFilters = () => {
    const activeFilters = [];

    if (filters?.make && filters?.make !== 'all') {
      activeFilters?.push({
        key: 'make',
        label: `Make: ${filters?.make?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}`,
        value: filters?.make
      });
    }

    if (filters?.model && filters?.model !== 'all') {
      activeFilters?.push({
        key: 'model',
        label: `Model: ${filters?.model?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}`,
        value: filters?.model
      });
    }

    if (filters?.bodyType && filters?.bodyType !== 'all') {
      activeFilters?.push({
        key: 'bodyType',
        label: `Body: ${filters?.bodyType?.charAt(0)?.toUpperCase() + filters?.bodyType?.slice(1)}`,
        value: filters?.bodyType
      });
    }

    if (filters?.fuelType && filters?.fuelType !== 'all') {
      activeFilters?.push({
        key: 'fuelType',
        label: `Fuel: ${filters?.fuelType?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}`,
        value: filters?.fuelType
      });
    }

    if (filters?.transmission && filters?.transmission !== 'all') {
      activeFilters?.push({
        key: 'transmission',
        label: `Trans: ${filters?.transmission?.charAt(0)?.toUpperCase() + filters?.transmission?.slice(1)}`,
        value: filters?.transmission
      });
    }

    if (filters?.condition && filters?.condition !== 'all') {
      activeFilters?.push({
        key: 'condition',
        label: `Condition: ${filters?.condition?.charAt(0)?.toUpperCase() + filters?.condition?.slice(1)}`,
        value: filters?.condition
      });
    }

    if (filters?.year && filters?.year !== 'all') {
      activeFilters?.push({
        key: 'year',
        label: `Year: ${filters?.year}`,
        value: filters?.year
      });
    }

    if (filters?.priceRange?.min || filters?.priceRange?.max) {
      const min = filters?.priceRange?.min ? `${(filters?.priceRange?.min / 1000000)?.toFixed(1)}M` : '0';
      const max = filters?.priceRange?.max ? `${(filters?.priceRange?.max / 1000000)?.toFixed(1)}M` : '∞';
      activeFilters?.push({
        key: 'priceRange',
        label: `Price: KES ${min} - ${max}`,
        value: 'priceRange'
      });
    }

    if (filters?.yearRange?.min || filters?.yearRange?.max) {
      const min = filters?.yearRange?.min || '1990';
      const max = filters?.yearRange?.max || new Date()?.getFullYear();
      activeFilters?.push({
        key: 'yearRange',
        label: `Years: ${min} - ${max}`,
        value: 'yearRange'
      });
    }

    if (filters?.mileageRange?.min || filters?.mileageRange?.max) {
      const min = filters?.mileageRange?.min ? `${(filters?.mileageRange?.min / 1000)?.toFixed(0)}k` : '0';
      const max = filters?.mileageRange?.max ? `${(filters?.mileageRange?.max / 1000)?.toFixed(0)}k` : '∞';
      activeFilters?.push({
        key: 'mileageRange',
        label: `Mileage: ${min} - ${max} km`,
        value: 'mileageRange'
      });
    }

    if (filters?.features && filters?.features?.length > 0) {
      if (filters?.features?.length === 1) {
        activeFilters?.push({
          key: 'features',
          label: `Feature: ${filters?.features?.[0]}`,
          value: 'features'
        });
      } else {
        activeFilters?.push({
          key: 'features',
          label: `Features: ${filters?.features?.length} selected`,
          value: 'features'
        });
      }
    }

    return activeFilters;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters?.length === 0) {
    return null;
  }

  const handleRemoveFilter = (filterKey) => {
    onFilterRemove(filterKey);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Active Filter Chips */}
      {activeFilters?.map((filter) => (
        <div
          key={filter?.key}
          className="flex items-center space-x-2 bg-accent/10 text-accent border border-accent/20 rounded-full px-3 py-1.5 text-sm"
        >
          <span className="font-medium">{filter?.label}</span>
          <button
            onClick={() => handleRemoveFilter(filter?.key)}
            className="hover:bg-accent/20 rounded-full p-0.5 luxury-micro-transition"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      ))}
      {/* Clear All Button */}
      {activeFilters?.length > 1 && (
        <button
          onClick={onClearAll}
          className="flex items-center space-x-1 text-muted-foreground hover:text-foreground text-sm luxury-micro-transition"
        >
          <Icon name="X" size={14} />
          <span>Clear all</span>
        </button>
      )}
    </div>
  );
};

export default FilterChips;