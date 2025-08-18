import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VehicleTable = ({ 
  vehicles, 
  selectedVehicles, 
  onSelectVehicle, 
  onSelectAll, 
  onSort, 
  sortConfig, 
  onEdit, 
  onDuplicate, 
  onDelete, 
  onViewPublic,
  onInlineEdit 
}) => {
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleInlineEditStart = (vehicleId, field, currentValue) => {
    setEditingCell(`${vehicleId}-${field}`);
    setEditValue(currentValue);
  };

  const handleInlineEditSave = (vehicleId, field) => {
    onInlineEdit(vehicleId, field, editValue);
    setEditingCell(null);
    setEditValue('');
  };

  const handleInlineEditCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { color: 'text-success bg-success/10', label: 'Available' },
      sold: { color: 'text-error bg-error/10', label: 'Sold' },
      reserved: { color: 'text-warning bg-warning/10', label: 'Reserved' }
    };

    const config = statusConfig?.[status] || statusConfig?.available;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="opacity-50" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-accent" />
      : <Icon name="ArrowDown" size={14} className="text-accent" />;
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedVehicles?.length === vehicles?.length && vehicles?.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 font-semibold text-foreground">Vehicle</th>
              <th 
                className="text-left p-4 font-semibold text-foreground cursor-pointer hover:bg-muted/30 luxury-micro-transition"
                onClick={() => onSort('make')}
              >
                <div className="flex items-center space-x-2">
                  <span>Make/Model</span>
                  {getSortIcon('make')}
                </div>
              </th>
              <th 
                className="text-left p-4 font-semibold text-foreground cursor-pointer hover:bg-muted/30 luxury-micro-transition"
                onClick={() => onSort('year')}
              >
                <div className="flex items-center space-x-2">
                  <span>Year</span>
                  {getSortIcon('year')}
                </div>
              </th>
              <th 
                className="text-left p-4 font-semibold text-foreground cursor-pointer hover:bg-muted/30 luxury-micro-transition"
                onClick={() => onSort('price')}
              >
                <div className="flex items-center space-x-2">
                  <span>Price</span>
                  {getSortIcon('price')}
                </div>
              </th>
              <th className="text-left p-4 font-semibold text-foreground">Status</th>
              <th 
                className="text-left p-4 font-semibold text-foreground cursor-pointer hover:bg-muted/30 luxury-micro-transition"
                onClick={() => onSort('lastModified')}
              >
                <div className="flex items-center space-x-2">
                  <span>Last Modified</span>
                  {getSortIcon('lastModified')}
                </div>
              </th>
              <th className="text-right p-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles?.map((vehicle) => (
              <tr key={vehicle?.id} className="border-b border-border hover:bg-muted/30 luxury-micro-transition">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedVehicles?.includes(vehicle?.id)}
                    onChange={() => onSelectVehicle(vehicle?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={vehicle?.images?.[0]}
                        alt={`${vehicle?.make} ${vehicle?.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{vehicle?.make} {vehicle?.model}</p>
                      <p className="text-sm text-muted-foreground">{vehicle?.variant}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-foreground">
                    <p className="font-medium">{vehicle?.make}</p>
                    <p className="text-sm text-muted-foreground">{vehicle?.model}</p>
                  </div>
                </td>
                <td className="p-4">
                  {editingCell === `${vehicle?.id}-year` ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e?.target?.value)}
                        className="w-20 px-2 py-1 text-sm border border-border rounded bg-input text-foreground"
                        onKeyDown={(e) => {
                          if (e?.key === 'Enter') handleInlineEditSave(vehicle?.id, 'year');
                          if (e?.key === 'Escape') handleInlineEditCancel();
                        }}
                        autoFocus
                      />
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => handleInlineEditSave(vehicle?.id, 'year')}
                      >
                        <Icon name="Check" size={12} />
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={handleInlineEditCancel}
                      >
                        <Icon name="X" size={12} />
                      </Button>
                    </div>
                  ) : (
                    <span
                      className="text-foreground cursor-pointer hover:text-accent luxury-micro-transition"
                      onClick={() => handleInlineEditStart(vehicle?.id, 'year', vehicle?.year)}
                    >
                      {vehicle?.year}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {editingCell === `${vehicle?.id}-price` ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e?.target?.value)}
                        className="w-32 px-2 py-1 text-sm border border-border rounded bg-input text-foreground"
                        onKeyDown={(e) => {
                          if (e?.key === 'Enter') handleInlineEditSave(vehicle?.id, 'price');
                          if (e?.key === 'Escape') handleInlineEditCancel();
                        }}
                        autoFocus
                      />
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => handleInlineEditSave(vehicle?.id, 'price')}
                      >
                        <Icon name="Check" size={12} />
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={handleInlineEditCancel}
                      >
                        <Icon name="X" size={12} />
                      </Button>
                    </div>
                  ) : (
                    <span
                      className="text-foreground cursor-pointer hover:text-accent luxury-micro-transition font-medium"
                      onClick={() => handleInlineEditStart(vehicle?.id, 'price', vehicle?.price)}
                    >
                      {formatPrice(vehicle?.price)}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {getStatusBadge(vehicle?.status)}
                </td>
                <td className="p-4 text-muted-foreground">
                  <div>
                    <p className="text-sm">{new Date(vehicle.lastModified)?.toLocaleDateString()}</p>
                    <p className="text-xs">{new Date(vehicle.lastModified)?.toLocaleTimeString()}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => onEdit(vehicle)}
                      title="Edit Vehicle"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => onDuplicate(vehicle)}
                      title="Duplicate Vehicle"
                    >
                      <Icon name="Copy" size={14} />
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => onViewPublic(vehicle)}
                      title="View Public Listing"
                    >
                      <Icon name="ExternalLink" size={14} />
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => onDelete(vehicle)}
                      title="Delete Vehicle"
                      className="text-error hover:text-error"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTable;