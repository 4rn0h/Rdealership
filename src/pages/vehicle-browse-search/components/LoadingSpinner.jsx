import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingSpinner = ({ size = 'default', text = 'Loading...', className = "" }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    default: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className={`${sizeClasses?.[size]} animate-spin`}>
        <Icon name="Loader2" size={size === 'sm' ? 16 : size === 'lg' ? 48 : 32} className="text-accent" />
      </div>
      {text && (
        <p className={`${textSizeClasses?.[size]} text-muted-foreground font-medium`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;