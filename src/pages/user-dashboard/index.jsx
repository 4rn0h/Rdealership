import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

// Import dashboard components
import FavoriteVehicleCard from './components/FavoriteVehicleCard';
import InquiryCard from './components/InquiryCard';
import TestDriveCard from './components/TestDriveCard';
import PriceAlertCard from './components/PriceAlertCard';
import ActivityFeedCard from './components/ActivityFeedCard';
import QuickActionCard from './components/QuickActionCard';
import NotificationPreferences from './components/NotificationPreferences';
import ProfileCompletionCard from './components/ProfileCompletionCard';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  // Mock data
  const mockFavoriteVehicles = [
    {
      id: 1,
      name: "BMW X7 xDrive40i",
      year: 2023,
      price: 12500000,
      originalPrice: 13000000,
      currency: "KES",
      mileage: 15000,
      fuelType: "Petrol",
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
      priceDropAlert: true,
      priceAlertEnabled: true
    },
    {
      id: 2,
      name: "Mercedes-Benz S-Class S500",
      year: 2022,
      price: 15800000,
      currency: "KES",
      mileage: 8500,
      fuelType: "Petrol",
      image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg",
      priceDropAlert: false,
      priceAlertEnabled: false
    },
    {
      id: 3,
      name: "Audi Q8 55 TFSI",
      year: 2023,
      price: 11200000,
      currency: "KES",
      mileage: 12000,
      fuelType: "Petrol",
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
      priceDropAlert: false,
      priceAlertEnabled: true
    }
  ];

  const mockInquiries = [
    {
      id: "INQ001",
      vehicle: {
        id: 1,
        name: "BMW X7 xDrive40i",
        image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg"
      },
      message: "I\'m interested in scheduling a test drive for this vehicle. Could you please provide more details about the service history and any available warranties?",
      status: "responded",
      responseCount: 2,
      createdAt: "2025-01-10T14:30:00Z"
    },
    {
      id: "INQ002",
      vehicle: {
        id: 4,
        name: "Range Rover Vogue",
        image: "https://images.pexels.com/photos/2920064/pexels-photo-2920064.jpeg"
      },
      message: "What financing options are available for this vehicle?",
      status: "pending",
      responseCount: 0,
      createdAt: "2025-01-11T09:15:00Z"
    }
  ];

  const mockTestDrives = [
    {
      id: "TD001",
      vehicle: {
        id: 1,
        name: "BMW X7 xDrive40i",
        image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg"
      },
      date: "2025-01-15",
      time: "14:00",
      location: "LuxAuto Showroom, Westlands, Nairobi",
      salesAgent: "James Mwangi",
      status: "confirmed"
    },
    {
      id: "TD002",
      vehicle: {
        id: 2,
        name: "Mercedes-Benz S-Class S500",
        image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg"
      },
      date: "2025-01-18",
      time: "10:30",
      location: "LuxAuto Showroom, Karen, Nairobi",
      salesAgent: "Sarah Wanjiku",
      status: "scheduled"
    }
  ];

  const mockPriceAlerts = [
    {
      id: "PA001",
      vehicle: {
        id: 5,
        name: "Porsche Cayenne Turbo",
        image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg"
      },
      currentPrice: 18500000,
      previousPrice: 19200000,
      targetPrice: 18000000,
      currency: "KES",
      isActive: true,
      createdAt: "2025-01-05T10:00:00Z"
    },
    {
      id: "PA002",
      vehicle: {
        id: 6,
        name: "Jaguar F-PACE SVR",
        image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg"
      },
      currentPrice: 14800000,
      targetPrice: 14500000,
      currency: "KES",
      isActive: true,
      createdAt: "2025-01-08T16:20:00Z"
    }
  ];

  const mockActivities = [
    {
      id: 1,
      type: "vehicle_viewed",
      vehicle: {
        id: 7,
        name: "Tesla Model X",
        image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg"
      },
      timestamp: "2025-01-12T15:30:00Z"
    },
    {
      id: 2,
      type: "vehicle_favorited",
      vehicle: {
        id: 3,
        name: "Audi Q8 55 TFSI",
        image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg"
      },
      timestamp: "2025-01-12T14:15:00Z"
    },
    {
      id: 3,
      type: "inquiry_sent",
      vehicle: {
        id: 4,
        name: "Range Rover Vogue",
        image: "https://images.pexels.com/photos/2920064/pexels-photo-2920064.jpeg"
      },
      timestamp: "2025-01-11T09:15:00Z"
    },
    {
      id: 4,
      type: "search_saved",
      searchQuery: "BMW X Series under 15M KES",
      timestamp: "2025-01-10T18:45:00Z"
    }
  ];

  const mockQuickActions = [
    {
      id: 1,
      title: "Browse Vehicles",
      description: "Explore our luxury vehicle collection",
      icon: "Car",
      color: "text-accent",
      bgColor: "bg-accent/10",
      buttonText: "Browse Now",
      buttonIcon: "ArrowRight",
      variant: "default",
      path: "/vehicle-browse-search"
    },
    {
      id: 2,
      title: "Schedule Test Drive",
      description: "Book a test drive for your favorite vehicle",
      icon: "Calendar",
      color: "text-success",
      bgColor: "bg-success/10",
      buttonText: "Schedule",
      buttonIcon: "Plus",
      variant: "outline",
      path: "/vehicle-browse-search?action=schedule"
    },
    {
      id: 3,
      title: "Contact Sales Agent",
      description: "Get personalized assistance from our experts",
      icon: "Phone",
      color: "text-warning",
      bgColor: "bg-warning/10",
      buttonText: "Contact Now",
      buttonIcon: "MessageSquare",
      variant: "outline"
    },
    {
      id: 4,
      title: "My Inquiries",
      description: "Track your vehicle inquiries and responses",
      icon: "MessageSquare",
      color: "text-accent",
      bgColor: "bg-accent/10",
      buttonText: "View All",
      buttonIcon: "ArrowRight",
      variant: "outline",
      path: "/inquiry-management",
      badge: {
        text: `${mockInquiries?.filter(i => i?.status === 'pending')?.length} pending`,
        color: "text-warning",
        bgColor: "bg-warning/10",
        icon: "Clock"
      }
    }
  ];

  const mockNotificationPreferences = {
    priceDrops: true,
    newArrivals: true,
    inquiryResponses: true,
    testDriveReminders: true,
    marketingUpdates: false,
    weeklyDigest: true,
    emailFrequency: 'daily'
  };

  const mockProfileCompletion = {
    percentage: 65,
    completedSteps: 4,
    totalSteps: 7,
    missingSteps: ['budget_range', 'vehicle_preferences', 'profile_photo']
  };

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      const mockUser = {
        id: 1,
        name: "David Kimani",
        email: "david.kimani@email.com",
        role: "user",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
        joinedAt: "2024-11-15T10:00:00Z",
        preferences: {
          currency: "KES",
          notifications: mockNotificationPreferences
        }
      };
      setUser(mockUser);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRemoveFavorite = (vehicleId) => {
    console.log('Remove favorite:', vehicleId);
    // Implementation would update favorites list
  };

  const handleTogglePriceAlert = (vehicleId) => {
    console.log('Toggle price alert:', vehicleId);
    // Implementation would toggle price alert
  };

  const handleRescheduleTestDrive = (testDriveId) => {
    console.log('Reschedule test drive:', testDriveId);
    // Implementation would open reschedule modal
  };

  const handleCancelTestDrive = (testDriveId) => {
    console.log('Cancel test drive:', testDriveId);
    // Implementation would cancel test drive
  };

  const handleToggleAlert = (alertId) => {
    console.log('Toggle alert:', alertId);
    // Implementation would toggle alert status
  };

  const handleRemoveAlert = (alertId) => {
    console.log('Remove alert:', alertId);
    // Implementation would remove price alert
  };

  const handleSaveNotificationPreferences = async (preferences) => {
    console.log('Save preferences:', preferences);
    // Implementation would save to backend
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleDismissProfileCompletion = () => {
    console.log('Dismiss profile completion');
    // Implementation would hide the card
  };

  const handleQuickAction = (actionId) => {
    const action = mockQuickActions?.find(a => a?.id === actionId);
    if (action?.id === 3) {
      // Contact sales agent - could open a modal or navigate to contact page
      console.log('Contact sales agent');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mb-6"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[...Array(6)]?.map((_, i) => (
                  <div key={i} className="h-48 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Welcome back, {user?.name?.split(' ')?.[0]}!
                </h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your luxury vehicle journey
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/vehicle-browse-search')}
                  iconName="Search"
                  iconPosition="left"
                >
                  Browse Vehicles
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate('/inquiry-management')}
                  iconName="MessageSquare"
                  iconPosition="left"
                >
                  New Inquiry
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          {mockProfileCompletion?.percentage < 90 && (
            <div className="mb-8">
              <ProfileCompletionCard
                completionData={mockProfileCompletion}
                onDismiss={handleDismissProfileCompletion}
              />
            </div>
          )}

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockQuickActions?.map((action) => (
                <QuickActionCard
                  key={action?.id}
                  action={action}
                  onClick={() => handleQuickAction(action?.id)}
                />
              ))}
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Favorite Vehicles */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    My Favorites
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/vehicle-browse-search?section=favorites')}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    View All ({mockFavoriteVehicles?.length})
                  </Button>
                </div>
                
                {mockFavoriteVehicles?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockFavoriteVehicles?.slice(0, 4)?.map((vehicle) => (
                      <FavoriteVehicleCard
                        key={vehicle?.id}
                        vehicle={vehicle}
                        onRemoveFavorite={handleRemoveFavorite}
                        onPriceAlert={handleTogglePriceAlert}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-8 text-center">
                    <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-foreground mb-2">No favorites yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start browsing and save vehicles you're interested in
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/vehicle-browse-search')}
                      iconName="Search"
                      iconPosition="left"
                    >
                      Browse Vehicles
                    </Button>
                  </div>
                )}
              </div>

              {/* Recent Inquiries */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    Recent Inquiries
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/inquiry-management')}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    View All ({mockInquiries?.length})
                  </Button>
                </div>
                
                {mockInquiries?.length > 0 ? (
                  <div className="space-y-4">
                    {mockInquiries?.slice(0, 3)?.map((inquiry) => (
                      <InquiryCard key={inquiry?.id} inquiry={inquiry} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-8 text-center">
                    <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-foreground mb-2">No inquiries yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Send your first inquiry about a vehicle you're interested in
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/vehicle-browse-search')}
                      iconName="MessageSquare"
                      iconPosition="left"
                    >
                      Make Inquiry
                    </Button>
                  </div>
                )}
              </div>

              {/* Scheduled Test Drives */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    Scheduled Test Drives
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/user-dashboard?section=test-drives')}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    View All ({mockTestDrives?.length})
                  </Button>
                </div>
                
                {mockTestDrives?.length > 0 ? (
                  <div className="space-y-4">
                    {mockTestDrives?.slice(0, 2)?.map((testDrive) => (
                      <TestDriveCard
                        key={testDrive?.id}
                        testDrive={testDrive}
                        onReschedule={handleRescheduleTestDrive}
                        onCancel={handleCancelTestDrive}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-8 text-center">
                    <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-foreground mb-2">No test drives scheduled</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Schedule a test drive to experience our luxury vehicles
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/vehicle-browse-search?action=schedule')}
                      iconName="Calendar"
                      iconPosition="left"
                    >
                      Schedule Test Drive
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Price Alerts */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    Price Alerts
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/user-dashboard?section=alerts')}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    View All
                  </Button>
                </div>
                
                {mockPriceAlerts?.length > 0 ? (
                  <div className="space-y-4">
                    {mockPriceAlerts?.slice(0, 2)?.map((alert) => (
                      <PriceAlertCard
                        key={alert?.id}
                        alert={alert}
                        onToggleAlert={handleToggleAlert}
                        onRemoveAlert={handleRemoveAlert}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-6 text-center">
                    <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      No price alerts set
                    </p>
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Recent Activity
                </h3>
                
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  {mockActivities?.length > 0 ? (
                    <div className="divide-y divide-border">
                      {mockActivities?.slice(0, 5)?.map((activity) => (
                        <ActivityFeedCard key={activity?.id} activity={activity} />
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <Icon name="Activity" size={32} className="text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        No recent activity
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notification Preferences */}
              <NotificationPreferences
                preferences={mockNotificationPreferences}
                onSave={handleSaveNotificationPreferences}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;