import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VehicleImageGallery = ({ images, vehicleName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images?.length) % images?.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="relative bg-card rounded-lg overflow-hidden luxury-shadow-medium">
        {/* Main Image Display */}
        <div className="relative aspect-video lg:aspect-[4/3] overflow-hidden">
          <Image
            src={images?.[currentImageIndex]}
            alt={`${vehicleName} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          {images?.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background luxury-micro-transition"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background luxury-micro-transition"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background luxury-micro-transition"
          >
            <Icon name="Maximize2" size={18} />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full">
            <span className="text-sm font-medium">
              {currentImageIndex + 1} / {images?.length}
            </span>
          </div>
        </div>

        {/* Thumbnail Strip - Desktop */}
        {images?.length > 1 && (
          <div className="hidden lg:flex p-4 space-x-2 overflow-x-auto">
            {images?.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 luxury-micro-transition ${
                  index === currentImageIndex
                    ? 'border-accent' :'border-border hover:border-accent/50'
                }`}
              >
                <Image
                  src={image}
                  alt={`${vehicleName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Mobile Thumbnail Dots */}
        {images?.length > 1 && (
          <div className="lg:hidden flex justify-center p-4 space-x-2">
            {images?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full luxury-micro-transition ${
                  index === currentImageIndex
                    ? 'bg-accent' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            <Image
              src={images?.[currentImageIndex]}
              alt={`${vehicleName} - Fullscreen`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close Button */}
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background luxury-micro-transition"
            >
              <Icon name="X" size={24} />
            </button>

            {/* Navigation in Fullscreen */}
            {images?.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background luxury-micro-transition"
                >
                  <Icon name="ChevronLeft" size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background luxury-micro-transition"
                >
                  <Icon name="ChevronRight" size={24} />
                </button>
              </>
            )}

            {/* Fullscreen Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full">
              <span className="text-sm font-medium">
                {currentImageIndex + 1} / {images?.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleImageGallery;