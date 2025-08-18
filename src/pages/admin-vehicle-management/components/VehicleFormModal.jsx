import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const VehicleFormModal = ({ isOpen, onClose, vehicle, onSave }) => {
  const [formData, setFormData] = useState(vehicle || {
    make: '',
    model: '',
    variant: '',
    year: new Date()?.getFullYear(),
    price: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    bodyType: '',
    color: '',
    location: '',
    description: '',
    features: [],
    images: [],
    status: 'available'
  });
  
  const [dragActive, setDragActive] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const makeOptions = [
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

  const fuelTypeOptions = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'electric', label: 'Electric' }
  ];

  const transmissionOptions = [
    { value: 'automatic', label: 'Automatic' },
    { value: 'manual', label: 'Manual' },
    { value: 'cvt', label: 'CVT' }
  ];

  const bodyTypeOptions = [
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'coupe', label: 'Coupe' },
    { value: 'convertible', label: 'Convertible' },
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'wagon', label: 'Wagon' }
  ];

  const locationOptions = [
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'mombasa', label: 'Mombasa' },
    { value: 'kisumu', label: 'Kisumu' },
    { value: 'nakuru', label: 'Nakuru' },
    { value: 'eldoret', label: 'Eldoret' }
  ];

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'sold', label: 'Sold' },
    { value: 'reserved', label: 'Reserved' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleFiles = async (files) => {
    setUploadingImages(true);
    const newImages = [];
    
    for (let file of files) {
      if (file?.type?.startsWith('image/')) {
        // Mock image upload - in real app, upload to Supabase Storage
        const mockUrl = `https://images.unsplash.com/photo-${Date.now()}-${Math.random()?.toString(36)?.substr(2, 9)}?w=800&h=600&fit=crop`;
        newImages?.push(mockUrl);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      images: [...prev?.images, ...newImages]
    }));
    
    setUploadingImages(false);
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev?.images?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden luxury-shadow-prominent">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Vehicle Images
              </label>
              
              {/* Drag and Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center luxury-micro-transition ${
                  dragActive 
                    ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-foreground font-medium mb-2">
                  Drag and drop images here, or click to select
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Support for JPG, PNG, WebP files up to 10MB each
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef?.current?.click()}
                  loading={uploadingImages}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Select Images
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFiles(e?.target?.files)}
                  className="hidden"
                />
              </div>

              {/* Image Preview Grid */}
              {formData?.images?.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {formData?.images?.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={image}
                          alt={`Vehicle image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        size="xs"
                        variant="destructive"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 luxury-micro-transition"
                        iconName="X"
                      />
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Make"
                required
                options={makeOptions}
                value={formData?.make}
                onChange={(value) => handleInputChange('make', value)}
              />
              
              <Input
                label="Model"
                type="text"
                required
                value={formData?.model}
                onChange={(e) => handleInputChange('model', e?.target?.value)}
                placeholder="e.g., C-Class, X5, A4"
              />
              
              <Input
                label="Variant"
                type="text"
                value={formData?.variant}
                onChange={(e) => handleInputChange('variant', e?.target?.value)}
                placeholder="e.g., AMG, M Sport, S-Line"
              />
              
              <Input
                label="Year"
                type="number"
                required
                min="1990"
                max={new Date()?.getFullYear() + 1}
                value={formData?.year}
                onChange={(e) => handleInputChange('year', parseInt(e?.target?.value))}
              />
              
              <Input
                label="Price (KES)"
                type="number"
                required
                min="0"
                value={formData?.price}
                onChange={(e) => handleInputChange('price', parseFloat(e?.target?.value))}
                placeholder="e.g., 5000000"
              />
              
              <Input
                label="Mileage (km)"
                type="number"
                min="0"
                value={formData?.mileage}
                onChange={(e) => handleInputChange('mileage', parseInt(e?.target?.value))}
                placeholder="e.g., 50000"
              />
            </div>

            {/* Technical Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Fuel Type"
                required
                options={fuelTypeOptions}
                value={formData?.fuelType}
                onChange={(value) => handleInputChange('fuelType', value)}
              />
              
              <Select
                label="Transmission"
                required
                options={transmissionOptions}
                value={formData?.transmission}
                onChange={(value) => handleInputChange('transmission', value)}
              />
              
              <Select
                label="Body Type"
                required
                options={bodyTypeOptions}
                value={formData?.bodyType}
                onChange={(value) => handleInputChange('bodyType', value)}
              />
              
              <Input
                label="Color"
                type="text"
                required
                value={formData?.color}
                onChange={(e) => handleInputChange('color', e?.target?.value)}
                placeholder="e.g., Pearl White, Jet Black"
              />
            </div>

            {/* Location and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Location"
                required
                options={locationOptions}
                value={formData?.location}
                onChange={(value) => handleInputChange('location', value)}
              />
              
              <Select
                label="Status"
                required
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => handleInputChange('status', value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                rows={4}
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                placeholder="Detailed description of the vehicle, its condition, and unique features..."
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                iconName="Save"
                iconPosition="left"
              >
                {vehicle ? 'Update Vehicle' : 'Add Vehicle'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleFormModal;