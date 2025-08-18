import React from 'react';
import Icon from '../../../components/AppIcon';

const InquiryStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Inquiries',
      value: stats?.total,
      icon: 'MessageSquare',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Pending Response',
      value: stats?.pending,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Test Drives Scheduled',
      value: stats?.testDrives,
      icon: 'Calendar',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Avg Response Time',
      value: stats?.avgResponseTime,
      icon: 'Timer',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 lg:p-6">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg lg:text-2xl font-bold text-foreground">
                {item?.value}
              </p>
              <p className="text-xs lg:text-sm text-muted-foreground">
                {item?.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InquiryStats;