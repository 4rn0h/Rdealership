// src/pages/admin-vehicle-management/components/FilterSidebar.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const FilterSidebar = ({
  filters,
  onFiltersChange,
  onSavePreset,
  savedPresets,
  onLoadPreset,
  onClearFilters,
}) => {
  const [presetName, setPresetName] = useState("");
  const [showSavePreset, setShowSavePreset] = useState(false);

  const [makeOptions, setMakeOptions] = useState([{ value: "", label: "All Makes" }]);
  const [statusOptions, setStatusOptions] = useState([{ value: "", label: "All Status" }]);
  const [fuelOptions, setFuelOptions] = useState([{ value: "", label: "All Fuel Types" }]);
  const [bodyTypeOptions, setBodyTypeOptions] = useState([{ value: "", label: "All Body Types" }]);
  const [transmissionOptions, setTransmissionOptions] = useState([{ value: "", label: "All Transmissions" }]);

  // ✅ Fetch distinct values from Supabase (snake_case fields)
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data: makes } = await supabase.from("vehicles").select("make").not("make", "is", null);
        const { data: statuses } = await supabase.from("vehicles").select("status").not("status", "is", null);
        const { data: fuels } = await supabase.from("vehicles").select("fuel_type").not("fuel_type", "is", null);
        const { data: bodyTypes } = await supabase.from("vehicles").select("body_type").not("body_type", "is", null);
        const { data: transmissions } = await supabase.from("vehicles").select("transmission").not("transmission", "is", null);

        setMakeOptions((prev) => [
          prev[0],
          ...[...new Set(makes?.map((v) => v.make))].map((m) => ({ value: m, label: m })),
        ]);

        setStatusOptions((prev) => [
          prev[0],
          ...[...new Set(statuses?.map((v) => v.status))].map((s) => ({ value: s, label: s })),
        ]);

        setFuelOptions((prev) => [
          prev[0],
          ...[...new Set(fuels?.map((v) => v.fuel_type))].map((f) => ({ value: f, label: f })),
        ]);

        setBodyTypeOptions((prev) => [
          prev[0],
          ...[...new Set(bodyTypes?.map((v) => v.body_type))].map((b) => ({ value: b, label: b })),
        ]);

        setTransmissionOptions((prev) => [
          prev[0],
          ...[...new Set(transmissions?.map((v) => v.transmission))].map((t) => ({ value: t, label: t })),
        ]);
      } catch (err) {
        console.error("Error fetching filter options:", err.message);
      }
    };

    fetchOptions();
  }, []);

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleSavePreset = () => {
    if (presetName?.trim()) {
      onSavePreset(presetName.trim(), filters);
      setPresetName("");
      setShowSavePreset(false);
    }
  };

  const getActiveFiltersCount = () =>
    Object.values(filters)?.filter((v) => v !== "" && v !== null && v !== undefined)?.length;

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      {/* Header */}
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
              {savedPresets.map((preset) => (
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
                onChange={(e) => setPresetName(e.target.value)}
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleSavePreset} disabled={!presetName?.trim()}>
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setShowSavePreset(false);
                    setPresetName("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 space-y-6">
        <Select
          label="Make"
          options={makeOptions}
          value={filters?.make || ""}
          onChange={(v) => handleFilterChange("make", v)}
        />
        <Input
          label="Model"
          type="text"
          placeholder="Enter model name"
          value={filters?.model || ""}
          onChange={(e) => handleFilterChange("model", e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Year Range</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="From"
              value={filters?.yearFrom || ""}
              onChange={(e) => handleFilterChange("yearFrom", e.target.value)}
            />
            <Input
              type="number"
              placeholder="To"
              value={filters?.yearTo || ""}
              onChange={(e) => handleFilterChange("yearTo", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Price Range (KES)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min price"
              value={filters?.priceFrom || ""}
              onChange={(e) => handleFilterChange("priceFrom", e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max price"
              value={filters?.priceTo || ""}
              onChange={(e) => handleFilterChange("priceTo", e.target.value)}
            />
          </div>
        </div>
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status || ""}
          onChange={(v) => handleFilterChange("status", v)}
        />
        <Select
          label="Fuel Type"
          options={fuelOptions}
          value={filters?.fuel_type || ""}
          onChange={(v) => handleFilterChange("fuel_type", v)}
        />
        <Select
          label="Body Type"
          options={bodyTypeOptions}
          value={filters?.body_type || ""}
          onChange={(v) => handleFilterChange("body_type", v)}
        />
        <Select
          label="Transmission"
          options={transmissionOptions}
          value={filters?.transmission || ""}
          onChange={(v) => handleFilterChange("transmission", v)}
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
