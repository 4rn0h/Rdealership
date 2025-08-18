import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure & Encrypted',
      description: 'Your data is protected with bank-level security'
    },
    {
      icon: 'Award',
      title: 'Trusted by Thousands',
      description: 'Join over 10,000+ satisfied customers across East Africa'
    },
    {
      icon: 'Clock',
      title: '24/7 Support',
      description: 'Get help whenever you need it from our expert team'
    }
  ];

  const certifications = [
    { name: 'Kenya Auto Dealers Association', badge: 'KADA Certified' },
    { name: 'Tanzania Motor Dealers Association', badge: 'TMDA Member' },
    { name: 'UK Company Registration', badge: 'Companies House' }
  ];

  return (
    <div className="space-y-6">
      {/* Trust Features */}
      <div className="space-y-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={16} className="text-accent" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                {feature?.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Certifications */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Certified & Registered
        </h4>
        <div className="space-y-2">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {cert?.name}
              </span>
              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                {cert?.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Customer Testimonial */}
      <div className="pt-4 border-t border-border">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex text-accent">
              {[...Array(5)]?.map((_, i) => (
                <Icon key={i} name="Star" size={12} className="fill-current" />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">5.0</span>
          </div>
          <p className="text-xs text-muted-foreground italic mb-2">
            "Exceptional service and premium vehicles. The team made my luxury car purchase seamless and professional."
          </p>
          <p className="text-xs font-medium text-foreground">
            - Sarah M., Nairobi
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;