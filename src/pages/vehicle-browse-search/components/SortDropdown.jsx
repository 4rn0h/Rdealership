import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ sortBy, onSortChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Star' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'year-new', label: 'Year: Newest First', icon: 'Calendar' },
    { value: 'year-old', label: 'Year: Oldest First', icon: 'Clock' },
    { value: 'mileage-low', label: 'Mileage: Low to High', icon: 'Gauge' },
    { value: 'mileage-high', label: 'Mileage: High to Low', icon: 'Zap' },
    { value: 'date-new', label: 'Recently Listed', icon: 'Plus' },
    { value: 'popularity', label: 'Most Popular', icon: 'Heart' }
  ];

  const currentSort = sortOptions?.find(option => option?.value === sortBy) || sortOptions?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Sort Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted luxury-micro-transition min-w-48"
      >
        <Icon name={currentSort?.icon} size={16} className="text-accent" />
        <span className="text-sm font-medium text-foreground flex-1 text-left">
          {currentSort?.label}
        </span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg luxury-shadow-medium z-50 max-h-80 overflow-y-auto">
          <div className="py-2">
            {sortOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleSortSelect(option?.value)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted luxury-micro-transition ${
                  option?.value === sortBy ? 'bg-accent/10 text-accent' : 'text-foreground'
                }`}
              >
                <Icon 
                  name={option?.icon} 
                  size={16} 
                  className={option?.value === sortBy ? 'text-accent' : 'text-muted-foreground'}
                />
                <span className="text-sm font-medium">{option?.label}</span>
                {option?.value === sortBy && (
                  <Icon name="Check" size={16} className="text-accent ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;