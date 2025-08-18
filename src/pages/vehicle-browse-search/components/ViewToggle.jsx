import React from 'react';
import Icon from '../../../components/AppIcon';

const ViewToggle = ({ viewMode, onViewModeChange, className = "" }) => {
  const viewOptions = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' }
  ];

  return (
    <div className={`flex items-center bg-card border border-border rounded-lg p-1 ${className}`}>
      {viewOptions?.map((option) => (
        <button
          key={option?.value}
          onClick={() => onViewModeChange(option?.value)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md luxury-micro-transition ${
            viewMode === option?.value
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
          title={option?.label}
        >
          <Icon name={option?.icon} size={16} />
          <span className="text-sm font-medium hidden sm:inline">
            {option?.label?.split(' ')?.[0]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;