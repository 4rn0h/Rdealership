import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const VehicleHistory = ({ vehicleHistory }) => {
  const [activeSection, setActiveSection] = useState('ownership');

  const sections = [
    { id: 'ownership', label: 'Ownership History', icon: 'Users' },
    { id: 'service', label: 'Service Records', icon: 'Wrench' },
    { id: 'accidents', label: 'Accident History', icon: 'AlertTriangle' },
    { id: 'modifications', label: 'Modifications', icon: 'Settings' }
  ];

  const getStatusIcon = (status) => {
    const statusConfig = {
      clean: { icon: 'CheckCircle', color: 'text-success' },
      minor: { icon: 'AlertCircle', color: 'text-warning' },
      major: { icon: 'XCircle', color: 'text-error' },
      unknown: { icon: 'HelpCircle', color: 'text-muted-foreground' }
    };
    return statusConfig?.[status] || statusConfig?.unknown;
  };

  const renderOwnershipHistory = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-heading font-semibold text-foreground">Previous Owners</h4>
        <span className="text-sm text-muted-foreground">
          {vehicleHistory?.ownership?.totalOwners || 0} previous owners
        </span>
      </div>
      
      {vehicleHistory?.ownership?.history?.map((owner, index) => (
        <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium text-foreground">Owner #{index + 1}</h5>
              <span className="text-sm text-muted-foreground">{owner?.duration}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div>Period: {owner?.period}</div>
              <div>Location: {owner?.location}</div>
              <div>Usage: {owner?.usage}</div>
              <div>Mileage: {owner?.mileageAdded?.toLocaleString()} km added</div>
            </div>
            {owner?.notes && (
              <p className="text-sm text-muted-foreground mt-2 italic">{owner?.notes}</p>
            )}
          </div>
        </div>
      )) || (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Info" size={24} className="mx-auto mb-2 opacity-50" />
          <p>No ownership history available</p>
        </div>
      )}
    </div>
  );

  const renderServiceRecords = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-heading font-semibold text-foreground">Service History</h4>
        <span className="text-sm text-muted-foreground">
          {vehicleHistory?.service?.records?.length || 0} service records
        </span>
      </div>
      
      {vehicleHistory?.service?.records?.map((record, index) => (
        <div key={index} className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Icon name="Wrench" size={18} className="text-accent" />
              <div>
                <h5 className="font-medium text-foreground">{record?.type}</h5>
                <p className="text-sm text-muted-foreground">{record?.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">KSh {record?.cost?.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{record?.mileage?.toLocaleString()} km</p>
            </div>
          </div>
          
          <div className="mb-3">
            <p className="text-sm text-muted-foreground mb-2">Service Provider:</p>
            <p className="text-sm font-medium text-foreground">{record?.provider}</p>
          </div>
          
          {record?.workDone && (
            <div className="mb-3">
              <p className="text-sm text-muted-foreground mb-2">Work Performed:</p>
              <ul className="text-sm text-foreground space-y-1">
                {record?.workDone?.map((work, workIndex) => (
                  <li key={workIndex} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} className="text-success" />
                    <span>{work}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {record?.nextService && (
            <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
              <p className="text-sm font-medium text-accent">Next Service Due:</p>
              <p className="text-sm text-muted-foreground">
                {record?.nextService?.date} or {record?.nextService?.mileage?.toLocaleString()} km
              </p>
            </div>
          )}
        </div>
      )) || (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Info" size={24} className="mx-auto mb-2 opacity-50" />
          <p>No service records available</p>
        </div>
      )}
    </div>
  );

  const renderAccidentHistory = () => {
    const accidentStatus = vehicleHistory?.accidents?.status || 'unknown';
    const statusConfig = getStatusIcon(accidentStatus);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-heading font-semibold text-foreground">Accident History</h4>
          <div className="flex items-center space-x-2">
            <Icon name={statusConfig?.icon} size={18} className={statusConfig?.color} />
            <span className={`text-sm font-medium ${statusConfig?.color}`}>
              {accidentStatus?.charAt(0)?.toUpperCase() + accidentStatus?.slice(1)} Record
            </span>
          </div>
        </div>
        {vehicleHistory?.accidents?.incidents?.map((incident, index) => (
          <div key={index} className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Icon name="AlertTriangle" size={18} className="text-warning" />
                <div>
                  <h5 className="font-medium text-foreground">{incident?.type}</h5>
                  <p className="text-sm text-muted-foreground">{incident?.date}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                incident?.severity === 'minor' ? 'text-warning bg-warning/10' :
                incident?.severity === 'major'? 'text-error bg-error/10' : 'text-muted-foreground bg-muted'
              }`}>
                {incident?.severity}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Location: </span>
                <span className="text-foreground">{incident?.location}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Damage: </span>
                <span className="text-foreground">{incident?.damage}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Repair Cost: </span>
                <span className="text-foreground">KSh {incident?.repairCost?.toLocaleString()}</span>
              </div>
              {incident?.description && (
                <div>
                  <span className="text-muted-foreground">Description: </span>
                  <span className="text-foreground">{incident?.description}</span>
                </div>
              )}
            </div>
          </div>
        )) || (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="mx-auto mb-4 text-success opacity-50" />
            <h5 className="text-lg font-heading font-semibold text-foreground mb-2">
              Clean Accident History
            </h5>
            <p className="text-muted-foreground">
              This vehicle has no reported accidents or damage history.
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderModifications = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-heading font-semibold text-foreground">Modifications</h4>
        <span className="text-sm text-muted-foreground">
          {vehicleHistory?.modifications?.items?.length || 0} modifications
        </span>
      </div>
      
      {vehicleHistory?.modifications?.items?.map((mod, index) => (
        <div key={index} className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Icon name="Settings" size={18} className="text-accent" />
              <div>
                <h5 className="font-medium text-foreground">{mod?.type}</h5>
                <p className="text-sm text-muted-foreground">{mod?.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">KSh {mod?.cost?.toLocaleString()}</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                mod?.category === 'performance' ? 'text-accent bg-accent/10' :
                mod?.category === 'aesthetic'? 'text-success bg-success/10' : 'text-muted-foreground bg-muted'
              }`}>
                {mod?.category}
              </span>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Description: </span>
              <span className="text-foreground">{mod?.description}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Installer: </span>
              <span className="text-foreground">{mod?.installer}</span>
            </div>
            {mod?.warranty && (
              <div>
                <span className="text-muted-foreground">Warranty: </span>
                <span className="text-foreground">{mod?.warranty}</span>
              </div>
            )}
          </div>
        </div>
      )) || (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Settings" size={48} className="mx-auto mb-4 opacity-50" />
          <h5 className="text-lg font-heading font-semibold text-foreground mb-2">
            No Modifications
          </h5>
          <p>This vehicle remains in original factory condition.</p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'ownership':
        return renderOwnershipHistory();
      case 'service':
        return renderServiceRecords();
      case 'accidents':
        return renderAccidentHistory();
      case 'modifications':
        return renderModifications();
      default:
        return renderOwnershipHistory();
    }
  };

  return (
    <div className="bg-card rounded-lg luxury-shadow-medium">
      {/* Section Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-heading font-bold text-foreground mb-2">
          Vehicle History Report
        </h2>
        <p className="text-sm text-muted-foreground">
          Comprehensive history and maintenance records for this vehicle
        </p>
      </div>
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {sections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap luxury-micro-transition ${
                activeSection === section?.id
                  ? 'text-accent border-b-2 border-accent bg-accent/5' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={section?.icon} size={16} />
              <span>{section?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default VehicleHistory;