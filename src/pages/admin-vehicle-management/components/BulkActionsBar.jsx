import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [bulkAction, setBulkAction] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  if (selectedCount === 0) return null;

  const bulkActionOptions = [
    { value: '', label: 'Select action...' },
    { value: 'status-available', label: 'Mark as Available' },
    { value: 'status-reserved', label: 'Mark as Reserved' },
    { value: 'status-sold', label: 'Mark as Sold' },
    { value: 'price-increase', label: 'Increase Price by %' },
    { value: 'price-decrease', label: 'Decrease Price by %' },
    { value: 'export', label: 'Export Selected' },
    { value: 'delete', label: 'Delete Selected' }
  ];

  const handleBulkAction = () => {
    if (!bulkAction) return;

    if (bulkAction === 'delete') {
      setShowConfirm(true);
    } else {
      onBulkAction(bulkAction);
      setBulkAction('');
    }
  };

  const confirmDelete = () => {
    onBulkAction('delete');
    setShowConfirm(false);
    setBulkAction('');
  };

  return (
    <>
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={20} className="text-accent" />
              <span className="font-medium text-foreground">
                {selectedCount} vehicle{selectedCount !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Select
                options={bulkActionOptions}
                value={bulkAction}
                onChange={setBulkAction}
                className="min-w-48"
              />
              
              <Button
                onClick={handleBulkAction}
                disabled={!bulkAction}
                iconName="Play"
                iconPosition="left"
              >
                Apply
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
          >
            Clear Selection
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md luxury-shadow-prominent">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} className="text-error" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Confirm Deletion</h3>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone
                </p>
              </div>
            </div>
            
            <p className="text-foreground mb-6">
              Are you sure you want to delete {selectedCount} selected vehicle{selectedCount !== 1 ? 's' : ''}?
            </p>
            
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="ghost"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                iconName="Trash2"
                iconPosition="left"
              >
                Delete Vehicles
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionsBar;