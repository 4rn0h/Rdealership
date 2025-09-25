// src/pages/user-dashboard/components/InquiryCard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { supabase } from '../../../lib/supabaseClient';

const InquiryCard = ({ inquiry }) => {
  const navigate = useNavigate();
  const [inquiryData, setInquiryData] = useState(inquiry);

  // 🔄 Try to hydrate vehicle details from Supabase
  useEffect(() => {
    const fetchVehicle = async () => {
      if (inquiry?.vehicle_id && !inquiry?.vehicle) {
        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('id', inquiry.vehicle_id)
          .single();

        if (!error && data) {
          setInquiryData({ ...inquiry, vehicle: data });
        }
      }
    };
    fetchVehicle();
  }, [inquiry]);

  const getStatusConfig = (status) => {
    const configs = {
      pending: { color: 'text-warning', bgColor: 'bg-warning/10', icon: 'Clock', label: 'Pending Response' },
      responded: { color: 'text-success', bgColor: 'bg-success/10', icon: 'CheckCircle', label: 'Responded' },
      closed: { color: 'text-muted-foreground', bgColor: 'bg-muted', icon: 'XCircle', label: 'Closed' },
    };
    return configs?.[status] || { color: 'text-gray-500', bgColor: 'bg-gray-100', icon: 'HelpCircle', label: 'Unknown' };
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));

  const statusConfig = getStatusConfig(inquiryData?.status);

  return (
    <div className="bg-card border border-border rounded-lg p-4 luxury-shadow-subtle hover:luxury-shadow-medium luxury-transition">
      <div className="flex items-start space-x-4">
        {/* Vehicle Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={inquiryData?.vehicle?.images?.[0] || inquiryData?.vehicle?.image_urls?.[0]}
            alt={`${inquiryData?.vehicle?.year} ${inquiryData?.vehicle?.make} ${inquiryData?.vehicle?.model}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Inquiry Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-foreground line-clamp-1">
                {inquiryData?.vehicle?.year} {inquiryData?.vehicle?.make} {inquiryData?.vehicle?.model}
              </h4>
              <p className="text-sm text-muted-foreground">Inquiry #{inquiryData?.id}</p>
            </div>

            <div
              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig?.bgColor} ${statusConfig?.color}`}
            >
              <Icon name={statusConfig?.icon} size={12} />
              <span>{statusConfig?.label}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {inquiryData?.message || 'No message provided.'}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={12} />
                <span>{formatDate(inquiryData?.created_at || inquiryData?.createdAt)}</span>
              </div>
              {inquiryData?.responseCount > 0 && (
                <div className="flex items-center space-x-1">
                  <Icon name="MessageCircle" size={12} />
                  <span>
                    {inquiryData?.responseCount} response
                    {inquiryData?.responseCount !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/inquiry-management?id=${inquiryData?.id}`)}
              iconName="ArrowRight"
              iconPosition="right"
            >
              View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryCard;
