import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import Header from "../../components/ui/Header";
import AdminSidebar from "../../components/ui/AdminSidebar";
import Button from "../../components/ui/Button";
import VehicleTable from "./components/VehicleTable";
import FilterSidebar from "./components/FilterSidebar";
import VehicleFormModal from "./components/VehicleFormModal";
import BulkImportModal from "./components/BulkImportModal";
import StatsCards from "./components/StatsCards";

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
  const [sortConfig, setSortConfig] = useState({ key: "updated_at", direction: "desc" });
  const [filters, setFilters] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalVehiclesCount, setTotalVehiclesCount] = useState(0);
  const [stats, setStats] = useState({ total: 0, available: 0, reserved: 0, sold: 0 });
  const [checking, setChecking] = useState(true);

  // ✅ Admin Auth Check
  useEffect(() => {
    const checkAdmin = async () => {
      setChecking(true);
      const { data: { user }, error } = await supabase.auth.getUser();
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
      if (profileError || !profile || profile.role !== "admin") {
        navigate("/user-dashboard");
        setChecking(false);
        return;
      }
      setChecking(false);
    };
    checkAdmin();
  }, [navigate]);

  // ✅ Fetch Vehicles
  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("vehicles")
        .select("*", { count: "exact" })
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)
        .order(sortConfig.key, { ascending: sortConfig.direction === "asc" });

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
      if (!error) {
        setVehicles(data);
        setTotalVehiclesCount(count || 0);
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

  // ✅ Save callback
  const handleSaveVehicle = () => {
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

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <h1 className="text-2xl font-bold text-primary">Luxury Automotive Excellence</h1>
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
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"} mt-16`}>
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
                    <h1 className="text-2xl font-heading font-bold text-foreground">Vehicle Management</h1>
                    <p className="text-muted-foreground">Manage your luxury vehicle inventory and listings</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)} iconName={showFilters ? "EyeOff" : "Eye"}>
                      {showFilters ? "Hide" : "Show"} Filters
                    </Button>
                    <Button variant="outline" onClick={() => setShowImportModal(true)} iconName="Upload">
                      Bulk Import
                    </Button>
                    <Button onClick={() => { setEditingVehicle(null); setShowVehicleModal(true); }} iconName="Plus">
                      Add New Vehicle
                    </Button>
                  </div>
                </div>

                <StatsCards stats={stats} />

                <VehicleTable
                  vehicles={vehicles}
                  selectedVehicles={selectedVehicles}
                  onSelectVehicle={(id) =>
                    setSelectedVehicles((prev) =>
                      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
                    )
                  }
                  onSelectAll={() =>
                    setSelectedVehicles(
                      selectedVehicles.length === vehicles.length ? [] : vehicles.map((v) => v.id)
                    )
                  }
                  onSort={(key) =>
                    setSortConfig((prev) => ({
                      key,
                      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
                    }))
                  }
                  sortConfig={sortConfig}
                  onEdit={(v) => { setEditingVehicle(v); setShowVehicleModal(true); }}
                  onDelete={handleDelete}
                  onInlineEdit={handleInlineEdit}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <VehicleFormModal
        isOpen={showVehicleModal}
        onClose={() => { setShowVehicleModal(false); setEditingVehicle(null); }}
        vehicle={editingVehicle}
        onSave={handleSaveVehicle}
      />
      <BulkImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={() => fetchVehicles()}
      />
    </div>
  );
};

export default AdminVehicleManagement;
