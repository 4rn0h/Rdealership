// src/pages/user-dashboard/components/TestDriveCard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { supabase } from '../../../lib/supabaseClient';

const TestDriveCard = ({ testDrive, onReschedule, onCancel }) => {
  const navigate = useNavigate();
  const [driveData, setDriveData] = useState(testDrive);

  // 🔄 Hydrate vehicle details from Supabase if missing
  useEffect(() => {
    const fetchVehicle = async () => {
      if (testDrive?.vehicle_id && !testDrive?.vehicle) {
        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('id', testDrive.vehicle_id)
          .single();

        if (!error && data) {
          setDriveData({ ...testDrive, vehicle: data });
        }
      }
    };
    fetchVehicle();
  }, [testDrive]);

  const getStatusConfig = (status) => {
    const configs = {
      scheduled: { color: 'text-accent', bgColor: 'bg-accent/10', icon: 'Calendar', label: 'Scheduled' },
      confirmed: { color: 'text-success', bgColor: 'bg-success/10', icon: 'CheckCircle', label: 'Confirmed' },
      completed: { color: 'text-muted-foreground', bgColor: 'bg-muted', icon: 'Check', label: 'Completed' },
      cancelled: { color: 'text-error', bgColor: 'bg-error/10', icon: 'XCircle', label: 'Cancelled' },
    };
    return configs?.[status] || configs?.scheduled;
  };

  const formatDateTime = (date, time) => {
    if (!date || !time) return { date: '', time: '' };
    const dateObj = new Date(`${date}T${time}`);
    return {
      date: new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).format(dateObj),
      time: new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(dateObj),
    };
  };

  const isUpcoming = () => {
    if (!driveData?.date || !driveData?.time) return false;
    const appointmentDateTime = new Date(`${driveData.date}T${driveData.time}`);
    return appointmentDateTime > new Date() && driveData?.status !== 'cancelled';
  };

  const statusConfig = getStatusConfig(driveData?.status);
  const formattedDateTime = formatDateTime(driveData?.date, driveData?.time);

  return (
    <div className="bg-card border border-border rounded-lg p-4 luxury-shadow-subtle hover:luxury-shadow-medium luxury-transition">
      <div className="flex items-start space-x-4">
        {/* Vehicle Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={driveData?.vehicle?.image || driveData?.vehicle?.images?.[0] || driveData?.vehicle?.image_urls?.[0]}
            alt={driveData?.vehicle?.name || `${driveData?.vehicle?.year} ${driveData?.vehicle?.make} ${driveData?.vehicle?.model}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Test Drive Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-foreground line-clamp-1">
                {driveData?.vehicle?.name || `${driveData?.vehicle?.year} ${driveData?.vehicle?.make} ${driveData?.vehicle?.model}`}
              </h4>
              <p className="text-sm text-muted-foreground">Booking #{driveData?.id}</p>
            </div>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig?.bgColor} ${statusConfig?.color}`}>
              <Icon name={statusConfig?.icon} size={12} />
              <span>{statusConfig?.label}</span>
            </div>
          </div>

          {/* Date and Time */}
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1 text-sm text-foreground">
              <Icon name="Calendar" size={14} className="text-accent" />
              <span>{formattedDateTime?.date}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-foreground">
              <Icon name="Clock" size={14} className="text-accent" />
              <span>{formattedDateTime?.time}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-1 mb-3 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>{driveData?.location}</span>
          </div>

          {/* Sales Agent */}
          {driveData?.salesAgent && (
            <div className="flex items-center space-x-1 mb-3 text-sm text-muted-foreground">
              <Icon name="User" size={14} />
              <span>with {driveData?.salesAgent}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {isUpcoming() && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReschedule(driveData?.id)}
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCancel(driveData?.id)}
                    iconName="X"
                    iconPosition="left"
                    className="text-error hover:text-error"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/vehicle-detail?id=${driveData?.vehicle?.id}`)}
              iconName="ArrowRight"
              iconPosition="right"
            >
              View Vehicle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDriveCard;
