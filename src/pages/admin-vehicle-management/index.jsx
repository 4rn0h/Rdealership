// src/pages/admin-vehicle-management/index.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import Header from "../../components/ui/Header";
import AdminSidebar from "../../components/ui/AdminSidebar";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import VehicleTable from "./components/VehicleTable";
import FilterSidebar from "./components/FilterSidebar";
import VehicleFormModal from "./components/VehicleFormModal";
import BulkImportModal from "./components/BulkImportModal";
import StatsCards from "./components/StatsCards";
import BulkActionsBar from "./components/BulkActionsBar";

const AdminVehicleManagement = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortConfig, setSortConfig] = useState({
    key: "updated_at",
    direction: "desc",
  });
  const [filters, setFilters] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalVehiclesCount, setTotalVehiclesCount] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    reserved: 0,
    sold: 0,
  });
  const [checking, setChecking] = useState(true);

  // ✅ Admin Auth Check
  useEffect(() => {
    const checkAdmin = async () => {
      setChecking(true);

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      console.log("🔍 Supabase getUser result:", { user, error });

      if (error || !user) {
        navigate("/user-authentication");
        setChecking(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      console.log("🔍 Loaded profile:", profile, "Error:", profileError);

      if (profileError || !profile) {
        navigate("/user-authentication");
        setChecking(false);
        return;
      }

      if (profile.role !== "admin") {
        navigate("/user-dashboard");
        setChecking(false);
        return;
      }

      console.log("✅ Admin check passed, staying on Admin page");
      setChecking(false);
    };

    checkAdmin();
  }, [navigate]);

  // ✅ Column mapping
  const columnMap = {
    fuelType: "fuel_type",
    bodyType: "body_type",
    transmission: "transmission",
    status: "status",
    make: "make",
    model: "model",
    year: "year",
    price: "price",
    updated_at: "updated_at",
    created_at: "created_at",
  };

  // ✅ Fetch Vehicles
  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("vehicles")
        .select("*", { count: "exact" })
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)
        .order(columnMap[sortConfig.key] || "updated_at", {
          ascending: sortConfig.direction === "asc",
        });

      if (filters?.status) query = query.eq("status", filters.status);
      if (filters?.make) query = query.ilike("make", `%${filters.make}%`);
      if (filters?.model) query = query.ilike("model", `%${filters.model}%`);
      if (filters?.bodyType) query = query.eq("body_type", filters.bodyType);
      if (filters?.fuelType) query = query.eq("fuel_type", filters.fuelType);
      if (filters?.transmission) query = query.eq("transmission", filters.transmission);
      if (filters?.yearFrom) query = query.gte("year", parseInt(filters.yearFrom));
      if (filters?.yearTo) query = query.lte("year", parseInt(filters.yearTo));
      if (filters?.priceFrom) query = query.gte("price", parseFloat(filters.priceFrom));
      if (filters?.priceTo) query = query.lte("price", parseFloat(filters.priceTo));

      if (searchQuery) {
        query = query.or(
          `make.ilike.%${searchQuery}%,model.ilike.%${searchQuery}%`
        );
      }

      const { data, count, error } = await query;
      if (error) console.error(error);
      else {
        setVehicles(data);
        setTotalVehiclesCount(count || 0);

        // ✅ update stats from fetched data
        setStats({
          total: count || 0,
          available: data.filter((v) => v.status === "available").length,
          reserved: data.filter((v) => v.status === "reserved").length,
          sold: data.filter((v) => v.status === "sold").length,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, sortConfig, filters, searchQuery]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  // ✅ CRUD + helpers
  const handleSaveVehicle = async (vehicleData) => {
    if (editingVehicle?.id) {
      await supabase
        .from("vehicles")
        .update({ ...vehicleData, updated_at: new Date() })
        .eq("id", editingVehicle.id);
    } else {
      await supabase
        .from("vehicles")
        .insert([{ ...vehicleData, updated_at: new Date(), created_at: new Date() }]);
    }
    setShowVehicleModal(false);
    setEditingVehicle(null);
    fetchVehicles();
  };

  const handleDelete = async (vehicle) => {
    if (window.confirm(`Delete ${vehicle.make} ${vehicle.model}?`)) {
      await supabase.from("vehicles").delete().eq("id", vehicle.id);
      fetchVehicles();
    }
  };

  const handleInlineEdit = async (vehicleId, field, value) => {
    const updateData = { updated_at: new Date() };
    updateData[field] = field === "price" ? parseFloat(value) : value;
    await supabase.from("vehicles").update(updateData).eq("id", vehicleId);
    fetchVehicles();
  };

  const handleBulkImport = async (importedVehicles) => {
    if (!importedVehicles?.length) return;
    await supabase.from("vehicles").insert(importedVehicles);
    setShowImportModal(false);
    fetchVehicles();
  };

  const handleBulkAction = async (action) => {
    if (!selectedVehicles.length) return;
    switch (action) {
      case "status-available":
      case "status-reserved":
      case "status-sold": {
        const newStatus = action.split("-")[1];
        await supabase
          .from("vehicles")
          .update({ status: newStatus, updated_at: new Date() })
          .in("id", selectedVehicles);
        break;
      }
      case "delete": {
        await supabase.from("vehicles").delete().in("id", selectedVehicles);
        break;
      }
      case "export": {
        const csvContent = vehicles
          .filter((v) => selectedVehicles.includes(v.id))
          .map((v) => `${v.make},${v.model},${v.year},${v.price},${v.status}`)
          .join("\n");
        const blob = new Blob(
          [`Make,Model,Year,Price,Status\n${csvContent}`],
          { type: "text/csv" }
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "selected_vehicles.csv";
        a.click();
        URL.revokeObjectURL(url);
        break;
      }
    }
    setSelectedVehicles([]);
    fetchVehicles();
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const totalPages = Math.ceil(totalVehiclesCount / pageSize);

  // ✅ Loader
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <h1 className="text-2xl font-bold text-primary">
          Luxury Automotive Excellence
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <AdminSidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          } mt-16`}
        >
          <div className="flex h-[calc(100vh-4rem)]">
            {showFilters && (
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={() => {
                  setFilters({});
                  setSearchQuery("");
                }}
              />
            )}
            <div className={`flex-1 overflow-y-auto ${showFilters ? "" : "w-full"}`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-heading font-bold text-foreground">
                      Vehicle Management
                    </h1>
                    <p className="text-muted-foreground">
                      Manage your luxury vehicle inventory and listings
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      iconName={showFilters ? "EyeOff" : "Eye"}
                    >
                      {showFilters ? "Hide" : "Show"} Filters
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowImportModal(true)}
                      iconName="Upload"
                    >
                      Bulk Import
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingVehicle(null);
                        setShowVehicleModal(true);
                      }}
                      iconName="Plus"
                    >
                      Add New Vehicle
                    </Button>
                  </div>
                </div>

                <StatsCards stats={stats} />

                {/* Search + pagination */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Icon
                        name="Search"
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        type="text"
                        placeholder="Search vehicles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-80"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Show:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(parseInt(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-3 py-1 border border-border rounded bg-input text-foreground"
                    >
                      {[10, 25, 50, 100].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <BulkActionsBar
                  selectedCount={selectedVehicles.length}
                  onBulkAction={handleBulkAction}
                  onClearSelection={() => setSelectedVehicles([])}
                />

                <VehicleTable
                  vehicles={vehicles}
                  selectedVehicles={selectedVehicles}
                  onSelectVehicle={(id) => {
                    setSelectedVehicles((prev) =>
                      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
                    );
                  }}
                  onSelectAll={() => {
                    if (selectedVehicles.length === vehicles.length)
                      setSelectedVehicles([]);
                    else setSelectedVehicles(vehicles.map((v) => v.id));
                  }}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                  onEdit={(v) => {
                    setEditingVehicle(v);
                    setShowVehicleModal(true);
                  }}
                  onDelete={handleDelete}
                  onInlineEdit={handleInlineEdit}
                />

                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        iconName="ChevronLeft"
                      />
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + Math.max(1, currentPage - 2);
                        if (page > totalPages) return null;
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        );
                      })}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                        }
                        disabled={currentPage === totalPages}
                        iconName="ChevronRight"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <VehicleFormModal
        isOpen={showVehicleModal}
        onClose={() => {
          setShowVehicleModal(false);
          setEditingVehicle(null);
        }}
        vehicle={editingVehicle}
        onSave={handleSaveVehicle}
      />
      <BulkImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleBulkImport}
      />
    </div>
  );
};

export default AdminVehicleManagement;
