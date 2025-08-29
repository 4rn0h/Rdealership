import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AdminSidebar from '../../components/ui/AdminSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import VehicleTable from './components/VehicleTable';
import FilterSidebar from './components/FilterSidebar';
import VehicleFormModal from './components/VehicleFormModal';
import BulkImportModal from './components/BulkImportModal';
import StatsCards from './components/StatsCards';
import BulkActionsBar from './components/BulkActionsBar';

const AdminVehicleManagement = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortConfig, setSortConfig] = useState({ key: 'lastModified', direction: 'desc' });
  const [filters, setFilters] = useState({});
  const [savedPresets, setSavedPresets] = useState([
    { id: 1, name: 'Available Luxury Cars', filters: { status: 'available', priceFrom: '5000000' } },
    { id: 2, name: 'Recent Additions', filters: { dateFrom: '2024-12-01' } }
  ]);

  // Mock vehicle data
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      make: 'Mercedes-Benz',
      model: 'S-Class',
      variant: 'S 500',
      year: 2023,
      price: 12500000,
      mileage: 5000,
      fuelType: 'petrol',
      transmission: 'automatic',
      bodyType: 'sedan',
      color: 'Obsidian Black',
      location: 'nairobi',
      status: 'available',
      description: `Luxury flagship sedan with premium features and exceptional comfort. This S-Class represents the pinnacle of Mercedes-Benz engineering with advanced driver assistance systems, premium leather interior, and state-of-the-art infotainment.`,
      images: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'
      ],
      lastModified: new Date('2024-12-10T14:30:00'),
      dateAdded: new Date('2024-12-01T10:00:00')
    },
    {
      id: 2,
      make: 'BMW',
      model: 'X7',
      variant: 'xDrive40i',
      year: 2022,
      price: 9800000,
      mileage: 15000,
      fuelType: 'petrol',
      transmission: 'automatic',
      bodyType: 'suv',
      color: 'Alpine White',
      location: 'nairobi',
      status: 'reserved',
      description: `Premium luxury SUV with commanding presence and exceptional versatility. Features include panoramic sunroof, premium sound system, and advanced safety technologies.`,
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop'
      ],
      lastModified: new Date('2024-12-09T16:45:00'),
      dateAdded: new Date('2024-11-28T14:20:00')
    },
    {
      id: 3,
      make: 'Audi',
      model: 'A8',
      variant: '55 TFSI',
      year: 2023,
      price: 11200000,
      mileage: 8000,
      fuelType: 'hybrid',
      transmission: 'automatic',
      bodyType: 'sedan',
      color: 'Glacier White',
      location: 'mombasa',
      status: 'available',
      description: `Executive luxury sedan with hybrid powertrain and cutting-edge technology. Features quattro all-wheel drive, virtual cockpit, and premium Bang & Olufsen sound system.`,
      images: [
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop'
      ],
      lastModified: new Date('2024-12-08T11:20:00'),
      dateAdded: new Date('2024-11-25T09:15:00')
    },
    {
      id: 4,
      make: 'Porsche',
      model: 'Cayenne',
      variant: 'Turbo',
      year: 2022,
      price: 15800000,
      mileage: 12000,
      fuelType: 'petrol',
      transmission: 'automatic',
      bodyType: 'suv',
      color: 'Carrara White',
      location: 'nairobi',
      status: 'sold',
      description: `High-performance luxury SUV with sports car DNA. Twin-turbo V8 engine delivers exceptional power while maintaining Porsche's legendary handling characteristics.`,
      images: [
        'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop'
      ],
      lastModified: new Date('2024-12-07T13:10:00'),dateAdded: new Date('2024-11-20T16:30:00')
    },
    {
      id: 5,
      make: 'Lexus',model: 'LS',variant: '500h',year: 2023,price: 10500000,mileage: 6000,fuelType: 'hybrid',transmission: 'automatic',bodyType: 'sedan',color: 'Deep Blue',location: 'kisumu',status: 'available',
      description: `Japanese luxury flagship with hybrid efficiency and exceptional craftsmanship. Features include Mark Levinson premium audio, massage seats, and advanced safety suite.`,
      images: [
        'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop'
      ],
      lastModified: new Date('2024-12-06T09:45:00'),dateAdded: new Date('2024-11-18T11:00:00')
    }
  ]);

  // Check admin authentication
  useEffect(() => {
    const user = localStorage.getItem('RoyaMotorsUk_user');
    if (!user) {
      navigate('/user-authentication');
      return;
    }
    
    const userData = JSON.parse(user);
    if (userData?.role !== 'admin') {
      navigate('/user-dashboard');
      return;
    }
  }, [navigate]);

  // Calculate statistics
  const stats = {
    totalVehicles: vehicles?.length,
    availableVehicles: vehicles?.filter(v => v?.status === 'available')?.length,
    soldThisMonth: vehicles?.filter(v => {
      const soldDate = new Date(v.lastModified);
      const currentMonth = new Date()?.getMonth();
      return v?.status === 'sold' && soldDate?.getMonth() === currentMonth;
    })?.length,
    reservedVehicles: vehicles?.filter(v => v?.status === 'reserved')?.length,
    totalValue: vehicles?.reduce((sum, v) => sum + v?.price, 0),
    averagePrice: vehicles?.length > 0 ? vehicles?.reduce((sum, v) => sum + v?.price, 0) / vehicles?.length : 0
  };

  // Filter and search vehicles
  const filteredVehicles = vehicles?.filter(vehicle => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      const searchableText = `${vehicle?.make} ${vehicle?.model} ${vehicle?.variant} ${vehicle?.color}`?.toLowerCase();
      if (!searchableText?.includes(query)) return false;
    }

    // Apply filters
    if (filters?.make && vehicle?.make?.toLowerCase() !== filters?.make) return false;
    if (filters?.model && !vehicle?.model?.toLowerCase()?.includes(filters?.model?.toLowerCase())) return false;
    if (filters?.status && vehicle?.status !== filters?.status) return false;
    if (filters?.location && vehicle?.location !== filters?.location) return false;
    if (filters?.fuelType && vehicle?.fuelType !== filters?.fuelType) return false;
    if (filters?.transmission && vehicle?.transmission !== filters?.transmission) return false;
    
    // Year range
    if (filters?.yearFrom && vehicle?.year < parseInt(filters?.yearFrom)) return false;
    if (filters?.yearTo && vehicle?.year > parseInt(filters?.yearTo)) return false;
    
    // Price range
    if (filters?.priceFrom && vehicle?.price < parseFloat(filters?.priceFrom)) return false;
    if (filters?.priceTo && vehicle?.price > parseFloat(filters?.priceTo)) return false;
    
    // Mileage range
    if (filters?.mileageFrom && vehicle?.mileage < parseInt(filters?.mileageFrom)) return false;
    if (filters?.mileageTo && vehicle?.mileage > parseInt(filters?.mileageTo)) return false;
    
    // Date range
    if (filters?.dateFrom) {
      const filterDate = new Date(filters.dateFrom);
      if (vehicle?.dateAdded < filterDate) return false;
    }
    if (filters?.dateTo) {
      const filterDate = new Date(filters.dateTo);
      if (vehicle?.dateAdded > filterDate) return false;
    }

    return true;
  });

  // Sort vehicles
  const sortedVehicles = [...filteredVehicles]?.sort((a, b) => {
    const { key, direction } = sortConfig;
    let aValue = a?.[key];
    let bValue = b?.[key];

    if (key === 'make') {
      aValue = `${a?.make} ${a?.model}`;
      bValue = `${b?.make} ${b?.model}`;
    }

    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedVehicles?.length / pageSize);
  const paginatedVehicles = sortedVehicles?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectVehicle = (vehicleId) => {
    setSelectedVehicles(prev =>
      prev?.includes(vehicleId)
        ? prev?.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const handleSelectAll = () => {
    if (selectedVehicles?.length === paginatedVehicles?.length) {
      setSelectedVehicles([]);
    } else {
      setSelectedVehicles(paginatedVehicles?.map(v => v?.id));
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowVehicleModal(true);
  };

  const handleDuplicate = (vehicle) => {
    const duplicatedVehicle = {
      ...vehicle,
      id: Date.now(),
      make: vehicle?.make,
      model: vehicle?.model,
      variant: `${vehicle?.variant} (Copy)`,
      status: 'available',
      lastModified: new Date(),
      dateAdded: new Date()
    };
    setEditingVehicle(duplicatedVehicle);
    setShowVehicleModal(true);
  };

  const handleDelete = (vehicle) => {
    if (window.confirm(`Are you sure you want to delete ${vehicle?.make} ${vehicle?.model}?`)) {
      setVehicles(prev => prev?.filter(v => v?.id !== vehicle?.id));
    }
  };

  const handleViewPublic = (vehicle) => {
    navigate(`/vehicle-detail?id=${vehicle?.id}`);
  };

  const handleInlineEdit = (vehicleId, field, value) => {
    setVehicles(prev => prev?.map(v => 
      v?.id === vehicleId 
        ? { ...v, [field]: field === 'price' ? parseFloat(value) : value, lastModified: new Date() }
        : v
    ));
  };

  const handleSaveVehicle = (vehicleData) => {
    if (editingVehicle && editingVehicle?.id) {
      // Update existing vehicle
      setVehicles(prev => prev?.map(v => 
        v?.id === editingVehicle?.id 
          ? { ...vehicleData, id: editingVehicle?.id, lastModified: new Date() }
          : v
      ));
    } else {
      // Add new vehicle
      const newVehicle = {
        ...vehicleData,
        id: Date.now(),
        lastModified: new Date(),
        dateAdded: new Date(),
        images: vehicleData?.images?.length > 0 ? vehicleData?.images : [
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'
        ]
      };
      setVehicles(prev => [newVehicle, ...prev]);
    }
    
    setShowVehicleModal(false);
    setEditingVehicle(null);
  };

  const handleBulkImport = (results) => {
    // Mock imported vehicles
    const importedVehicles = Array.from({ length: results?.successful }, (_, i) => ({
      id: Date.now() + i,
      make: ['Mercedes-Benz', 'BMW', 'Audi']?.[i % 3],
      model: ['C-Class', 'X3', 'A4']?.[i % 3],
      variant: 'Imported',
      year: 2022,
      price: 6000000 + (i * 100000),
      mileage: 20000 + (i * 1000),
      fuelType: 'petrol',
      transmission: 'automatic',
      bodyType: 'sedan',
      color: 'Black',
      location: 'nairobi',
      status: 'available',
      description: 'Imported vehicle from bulk upload',
      images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'],
      lastModified: new Date(),
      dateAdded: new Date()
    }));
    
    setVehicles(prev => [...importedVehicles, ...prev]);
    setShowImportModal(false);
  };

  const handleBulkAction = (action) => {
    const selectedVehicleObjects = vehicles?.filter(v => selectedVehicles?.includes(v?.id));
    
    switch (action) {
      case 'status-available': case'status-reserved': case'status-sold':
        const newStatus = action?.split('-')?.[1];
        setVehicles(prev => prev?.map(v => 
          selectedVehicles?.includes(v?.id) 
            ? { ...v, status: newStatus, lastModified: new Date() }
            : v
        ));
        break;
      case 'export':
        // Mock export functionality
        const csvContent = selectedVehicleObjects?.map(v => 
          `${v?.make},${v?.model},${v?.year},${v?.price},${v?.status}`
        )?.join('\n');
        const blob = new Blob([`Make,Model,Year,Price,Status\n${csvContent}`], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'selected_vehicles.csv';
        a?.click();
        URL.revokeObjectURL(url);
        break;
      case 'delete':
        setVehicles(prev => prev?.filter(v => !selectedVehicles?.includes(v?.id)));
        break;
    }
    
    setSelectedVehicles([]);
  };

  const handleSavePreset = (name, filterData) => {
    const newPreset = {
      id: Date.now(),
      name,
      filters: filterData
    };
    setSavedPresets(prev => [...prev, newPreset]);
  };

  const handleLoadPreset = (preset) => {
    setFilters(preset?.filters);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const handleExportData = () => {
    const csvContent = filteredVehicles?.map(v => 
      `${v?.make},${v?.model},${v?.variant},${v?.year},${v?.price},${v?.mileage},${v?.fuelType},${v?.transmission},${v?.bodyType},${v?.color},${v?.location},${v?.status}`
    )?.join('\n');
    
    const blob = new Blob([
      `Make,Model,Variant,Year,Price,Mileage,Fuel Type,Transmission,Body Type,Color,Location,Status\n${csvContent}`
    ], { type: 'text/csv' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vehicles_export_${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <AdminSidebar 
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        } mt-16`}>
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Filter Sidebar */}
            {showFilters && (
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                onSavePreset={handleSavePreset}
                savedPresets={savedPresets}
                onLoadPreset={handleLoadPreset}
                onClearFilters={handleClearFilters}
              />
            )}
            
            {/* Main Content */}
            <div className={`flex-1 overflow-y-auto ${showFilters ? '' : 'w-full'}`}>
              <div className="p-6">
                {/* Page Header */}
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
                      iconPosition="left"
                    >
                      {showFilters ? 'Hide' : 'Show'} Filters
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={handleExportData}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Export Data
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => setShowImportModal(true)}
                      iconName="Upload"
                      iconPosition="left"
                    >
                      Bulk Import
                    </Button>
                    
                    <Button
                      onClick={() => {
                        setEditingVehicle(null);
                        setShowVehicleModal(true);
                      }}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Add New Vehicle
                    </Button>
                  </div>
                </div>

                {/* Statistics Cards */}
                <StatsCards stats={stats} />

                {/* Search and Controls */}
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
                        onChange={(e) => setSearchQuery(e?.target?.value)}
                        className="pl-10 w-80"
                      />
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Showing {paginatedVehicles?.length} of {filteredVehicles?.length} vehicles
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Show:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(parseInt(e?.target?.value));
                        setCurrentPage(1);
                      }}
                      className="px-3 py-1 border border-border rounded bg-input text-foreground"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>

                {/* Bulk Actions Bar */}
                <BulkActionsBar
                  selectedCount={selectedVehicles?.length}
                  onBulkAction={handleBulkAction}
                  onClearSelection={() => setSelectedVehicles([])}
                />

                {/* Vehicle Table */}
                <VehicleTable
                  vehicles={paginatedVehicles}
                  selectedVehicles={selectedVehicles}
                  onSelectVehicle={handleSelectVehicle}
                  onSelectAll={handleSelectAll}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                  onEdit={handleEdit}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                  onViewPublic={handleViewPublic}
                  onInlineEdit={handleInlineEdit}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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
      {/* Modals */}
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