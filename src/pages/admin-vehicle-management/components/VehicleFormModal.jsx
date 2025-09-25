import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { supabase, uploadVehicleImage } from '../../../lib/supabaseClient';

const CHUNK_SIZE = 5; // for chunked inserts

const VehicleFormModal = ({ isOpen, onClose, vehicle }) => {
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
  const [imageProgress, setImageProgress] = useState({}); // per-file progress
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const featureInputRef = useRef(null);
  const [newFeature, setNewFeature] = useState('');

  if (!isOpen) return null;

  // ---------- Select Options ----------
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

  // ---------- Handlers ----------
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer?.files?.length) handleFiles(e.dataTransfer.files);
  };

  const handleFiles = async (files) => {
    setUploadingImages(true);
    const newImages = [];
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024;

    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        alert(`${file.name} is not a valid image type.`);
        continue;
      }
      if (file.size > maxSize) {
        alert(`${file.name} exceeds 10MB.`);
        continue;
      }
      try {
        const url = await uploadVehicleImage(file, (percent) => {
          setImageProgress(prev => ({ ...prev, [file.name]: percent }));
        });
        newImages.push(url);
      } catch (err) {
        console.error(err);
        alert(`Failed to upload ${file.name}`);
      }
    }

    setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    setUploadingImages(false);
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
      setNewFeature('');
      featureInputRef.current?.focus();
    }
  };

  const removeFeature = (feature) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter(f => f !== feature) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("You must be logged in to add vehicles");

      const payload = {
        make: formData.make,
        model: formData.model,
        variant: formData.variant,
        year: formData.year,
        price: formData.price,
        mileage: formData.mileage,
        fuel_type: formData.fuelType,
        transmission: formData.transmission,
        body_type: formData.bodyType,
        color: formData.color,
        description: formData.description,
        status: formData.status,
        location: formData.location,
        created_by: user.id,
      };

      let vehicleId;
      if (vehicle?.id) {
        const { data, error } = await supabase
          .from("vehicles")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", vehicle.id)
          .select();
        if (error) throw error;
        vehicleId = vehicle.id;
      } else {
        const { data, error } = await supabase
          .from("vehicles")
          .insert([payload])
          .select();
        if (error) throw error;
        vehicleId = data[0].id;
      }

      // ---------- Chunked inserts for images ----------
      for (let i = 0; i < formData.images.length; i += CHUNK_SIZE) {
        const chunk = formData.images.slice(i, i + CHUNK_SIZE);
        await supabase.from('vehicle_images').insert(
          chunk.map(url => ({ vehicle_id: vehicleId, url }))
        );
      }

      // ---------- Chunked inserts for features ----------
      for (let i = 0; i < formData.features.length; i += CHUNK_SIZE) {
        const chunk = formData.features.slice(i, i + CHUNK_SIZE);
        await supabase.from('vehicle_features').insert(
          chunk.map(feature => ({ vehicle_id: vehicleId, feature }))
        );
      }

      alert(`✅ Vehicle ${vehicle ? "updated" : "added"} successfully!`);
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Error saving vehicle: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // ---------- Render ----------
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden luxury-shadow-prominent">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          <Button size="sm" variant="ghost" onClick={onClose} iconName="X" />
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Vehicle Images</label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center luxury-micro-transition ${
                  dragActive ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-foreground font-medium mb-2">Drag and drop images here, or click to select</p>
                <p className="text-sm text-muted-foreground mb-4">JPG, PNG, WebP up to 10MB</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
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
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                />
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                        <Image src={image} alt={`Vehicle ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                      {imageProgress[image] && (
                        <div className="absolute bottom-0 left-0 w-full bg-muted-foreground h-1">
                          <div
                            className="bg-accent h-1"
                            style={{ width: `${imageProgress[image]}%` }}
                          />
                        </div>
                      )}
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

            {/* Features Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Features</label>
              <div className="flex space-x-2 mb-2">
                <Input
                  ref={featureInputRef}
                  type="text"
                  placeholder="Add a feature"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <Button type="button" size="sm" onClick={addFeature}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((f, i) => (
                  <div key={i} className="bg-muted px-2 py-1 rounded flex items-center space-x-1">
                    <span>{f}</span>
                    <Button type="button" size="xs" variant="destructive" onClick={() => removeFeature(f)} iconName="X" />
                  </div>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select label="Make" required options={makeOptions} value={formData.make} onChange={(v) => handleInputChange('make', v)} />
              <Input label="Model" type="text" required value={formData.model} onChange={(e) => handleInputChange('model', e.target.value)} />
              <Input label="Variant" type="text" value={formData.variant} onChange={(e) => handleInputChange('variant', e.target.value)} />
              <Input label="Year" type="number" required min="1990" max={new Date()?.getFullYear() + 1} value={formData.year} onChange={(e) => handleInputChange('year', parseInt(e.target.value))} />
              <Input label="Price (KES)" type="number" required min="0" value={formData.price} onChange={(e) => handleInputChange('price', parseFloat(e.target.value))} />
              <Input label="Mileage (km)" type="number" min="0" value={formData.mileage} onChange={(e) => handleInputChange('mileage', parseInt(e.target.value))} />
            </div>

            {/* Technical Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select label="Fuel Type" required options={fuelTypeOptions} value={formData.fuelType} onChange={(v) => handleInputChange('fuelType', v)} />
              <Select label="Transmission" required options={transmissionOptions} value={formData.transmission} onChange={(v) => handleInputChange('transmission', v)} />
              <Select label="Body Type" required options={bodyTypeOptions} value={formData.bodyType} onChange={(v) => handleInputChange('bodyType', v)} />
              <Input label="Color" type="text" required value={formData.color} onChange={(e) => handleInputChange('color', e.target.value)} />
            </div>

            {/* Location & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select label="Location" required options={locationOptions} value={formData.location} onChange={(v) => handleInputChange('location', v)} />
              <Select label="Status" required options={statusOptions} value={formData.status} onChange={(v) => handleInputChange('status', v)} />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Detailed description..."
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit" iconName="Save" iconPosition="left" loading={saving}>
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
