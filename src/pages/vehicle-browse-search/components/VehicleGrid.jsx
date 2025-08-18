import React from 'react';
import VehicleCard from './VehicleCard';
import Icon from '../../../components/AppIcon';


const VehicleGrid = ({ 
  vehicles, 
  viewMode = 'grid', 
  onFavoriteToggle, 
  favoriteVehicles = [],
  loading = false,
  className = "" 
}) => {
  if (loading) {
    return (
      <div className={`${className}`}>
        <div className={`grid gap-6 ${
          viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
        }`}>
          {Array.from({ length: 8 })?.map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
              {viewMode === 'grid' ? (
                <>
                  <div className="h-48 bg-muted animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted animate-pulse rounded" />
                    <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
                    <div className="h-5 bg-muted animate-pulse rounded w-1/2" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-3 bg-muted animate-pulse rounded" />
                      <div className="h-3 bg-muted animate-pulse rounded" />
                    </div>
                    <div className="h-9 bg-muted animate-pulse rounded" />
                  </div>
                </>
              ) : (
                <div className="flex">
                  <div className="w-80 h-48 bg-muted animate-pulse" />
                  <div className="flex-1 p-6 space-y-3">
                    <div className="h-5 bg-muted animate-pulse rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                    <div className="h-6 bg-muted animate-pulse rounded w-1/3" />
                    <div className="grid grid-cols-4 gap-4">
                      {Array.from({ length: 4 })?.map((_, i) => (
                        <div key={i} className="h-3 bg-muted animate-pulse rounded" />
                      ))}
                    </div>
                    <div className="h-9 bg-muted animate-pulse rounded w-32 mt-auto" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!vehicles || vehicles?.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="Car" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          No vehicles found
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          We couldn't find any vehicles matching your search criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className={`grid gap-6 ${
        viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
      }`}>
        {vehicles?.map((vehicle) => (
          <VehicleCard
            key={vehicle?.id}
            vehicle={vehicle}
            viewMode={viewMode}
            onFavoriteToggle={onFavoriteToggle}
            isFavorited={favoriteVehicles?.includes(vehicle?.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default VehicleGrid;