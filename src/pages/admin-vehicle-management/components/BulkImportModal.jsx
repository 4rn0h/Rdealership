import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkImportModal = ({ isOpen, onClose, onImport }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importResults, setImportResults] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

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
      handleFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFile = (file) => {
    if (file?.type === 'text/csv' || file?.name?.endsWith('.csv')) {
      setSelectedFile(file);
      setImportResults(null);
    } else {
      alert('Please select a CSV file');
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setImporting(true);
    
    // Mock CSV processing
    setTimeout(() => {
      const mockResults = {
        total: 25,
        successful: 23,
        failed: 2,
        errors: [
          { row: 5, error: 'Invalid price format' },
          { row: 12, error: 'Missing required field: make' }
        ]
      };
      
      setImportResults(mockResults);
      setImporting(false);
      
      if (mockResults?.successful > 0) {
        onImport(mockResults);
      }
    }, 3000);
  };

  const downloadTemplate = () => {
    const csvContent = `make,model,variant,year,price,mileage,fuelType,transmission,bodyType,color,location,status,description
Mercedes-Benz,C-Class,AMG C43,2022,7500000,15000,petrol,automatic,sedan,Obsidian Black,nairobi,available,"Luxury sedan with premium features" BMW,X5,xDrive40i,2021,8200000,25000,petrol,automatic,suv,Alpine White,nairobi,available,"Premium SUV with advanced technology"`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vehicle_import_template.csv';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const resetModal = () => {
    setSelectedFile(null);
    setImportResults(null);
    setImporting(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl luxury-shadow-prominent">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Bulk Import Vehicles
          </h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleClose}
            iconName="X"
          />
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {!importResults ? (
            <>
              {/* Instructions */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">Import Instructions</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Upload a CSV file with vehicle data</li>
                  <li>• Maximum file size: 10MB</li>
                  <li>• Maximum 1000 vehicles per import</li>
                  <li>• Required fields: make, model, year, price, location</li>
                </ul>
              </div>

              {/* Download Template */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">CSV Template</p>
                  <p className="text-sm text-muted-foreground">
                    Download the template file with correct format
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={downloadTemplate}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download Template
                </Button>
              </div>

              {/* File Upload Area */}
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
                <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-foreground font-medium mb-2">
                  Drag and drop your CSV file here, or click to select
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Only CSV files are supported
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef?.current?.click()}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Select CSV File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={(e) => e?.target?.files?.[0] && handleFile(e?.target?.files?.[0])}
                  className="hidden"
                />
              </div>

              {/* Selected File */}
              {selectedFile && (
                <div className="flex items-center justify-between p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={20} className="text-accent" />
                    <div>
                      <p className="font-medium text-foreground">{selectedFile?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile?.size / 1024)?.toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedFile(null)}
                    iconName="X"
                  />
                </div>
              )}

              {/* Import Progress */}
              {importing && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-accent border-t-transparent"></div>
                    <span className="text-foreground">Processing CSV file...</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    This may take a few moments
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Import Results */
            (<div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Import Completed
                </h3>
                <p className="text-muted-foreground">
                  Your vehicle data has been processed
                </p>
              </div>
              {/* Results Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{importResults?.total}</p>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                </div>
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <p className="text-2xl font-bold text-success">{importResults?.successful}</p>
                  <p className="text-sm text-muted-foreground">Successful</p>
                </div>
                <div className="text-center p-4 bg-error/10 rounded-lg">
                  <p className="text-2xl font-bold text-error">{importResults?.failed}</p>
                  <p className="text-sm text-muted-foreground">Failed</p>
                </div>
              </div>
              {/* Error Details */}
              {importResults?.errors?.length > 0 && (
                <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                  <h4 className="font-medium text-error mb-2">Import Errors</h4>
                  <div className="space-y-1">
                    {importResults?.errors?.map((error, index) => (
                      <p key={index} className="text-sm text-muted-foreground">
                        Row {error?.row}: {error?.error}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>)
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
            {!importResults ? (
              <>
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  disabled={importing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={!selectedFile || importing}
                  loading={importing}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Import Vehicles
                </Button>
              </>
            ) : (
              <Button
                onClick={handleClose}
                iconName="Check"
                iconPosition="left"
              >
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkImportModal;