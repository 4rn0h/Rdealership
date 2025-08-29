import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import InquiryCard from './components/InquiryCard';
import TestDriveCard from './components/TestDriveCard';
import CommunicationHistory from './components/CommunicationHistory';
import InquiryStats from './components/InquiryStats';
import QuickActions from './components/QuickActions';

const InquiryManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inquiries');
  const [statusFilter, setStatusFilter] = useState('all');
  const [inquiries, setInquiries] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [filteredCommunications, setFilteredCommunications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Mock data
  useEffect(() => {
    const mockInquiries = [
      {
        id: "INQ001",
        vehicle: {
          name: "BMW X7 xDrive40i 2023",
          image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        message: "I\'m interested in this luxury SUV. Could you provide more details about the interior features and available financing options? I\'m particularly interested in the premium sound system and leather seating.",
        status: "pending",
        createdAt: new Date('2025-01-10T09:30:00'),
        lastActivity: new Date('2025-01-10T09:30:00'),
        agent: null,
        response: null,
        responseDate: null
      },
      {
        id: "INQ002",
        vehicle: {
          name: "Mercedes-Benz S-Class S500 2024",
          image: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        message: "What is the fuel efficiency of this model? Also, does it come with the latest driver assistance features?",
        status: "responded",
        createdAt: new Date('2025-01-08T14:15:00'),
        lastActivity: new Date('2025-01-09T11:20:00'),
        agent: {
          name: "Sarah Johnson",
          email: "sarah.johnson@RoyaMotorsUk.co.ke"
        },
        response: "Thank you for your interest! The S500 offers excellent fuel efficiency with an average of 8.5L/100km in combined driving. It comes equipped with the latest Mercedes-Benz Intelligent Drive package including adaptive cruise control, lane keeping assist, and automatic emergency braking. Would you like to schedule a test drive to experience these features firsthand?",
        responseDate: new Date('2025-01-09T11:20:00')
      },
      {
        id: "INQ003",
        vehicle: {
          name: "Audi Q8 55 TFSI Quattro 2023",
          image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        message: "Is this vehicle still available? I\'m looking for a luxury SUV with good off-road capabilities.",
        status: "scheduled",
        createdAt: new Date('2025-01-05T16:45:00'),
        lastActivity: new Date('2025-01-11T10:30:00'),
        agent: {
          name: "Michael Chen",
          email: "michael.chen@RoyaMotorsUk.co.ke"
        },
        response: "Yes, this Q8 is still available! It features Audi's renowned Quattro all-wheel drive system, perfect for both city driving and off-road adventures. I've scheduled a test drive for you this Saturday. Looking forward to showing you this exceptional vehicle!",
        responseDate: new Date('2025-01-11T10:30:00')
      }
    ];

    const mockTestDrives = [
      {
        id: "TD001",
        vehicle: {
          name: "Audi Q8 55 TFSI Quattro 2023",
          image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        scheduledDate: new Date('2025-01-18T10:00:00'),
        status: "confirmed",
        location: {
          name: "RoyaMotorsUk Showroom Westlands",
          address: "Westlands Road, Nairobi",
          coordinates: { lat: -1.2634, lng: 36.8155 }
        },
        agent: {
          name: "Michael Chen",
          phone: "+254 712 345 678",
          email: "michael.chen@RoyaMotorsUk.co.ke"
        },
        notes: "Customer specifically interested in off-road capabilities and interior luxury features."
      },
      {
        id: "TD002",
        vehicle: {
          name: "BMW X5 xDrive30d 2024",
          image: "https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        scheduledDate: new Date('2025-01-15T14:30:00'),
        status: "completed",
        location: {
          name: "RoyaMotorsUk Showroom Karen",
          address: "Karen Shopping Centre, Nairobi",
          coordinates: { lat: -1.3197, lng: 36.7073 }
        },
        agent: {
          name: "Sarah Johnson",
          phone: "+254 723 456 789",
          email: "sarah.johnson@RoyaMotorsUk.co.ke"
        },
        notes: "Test drive completed successfully. Customer very impressed with performance."
      }
    ];

    const mockCommunications = [
      {
        id: "COMM001",
        type: "inquiry",
        subject: "BMW X7 Inquiry Response",
        content: "Thank you for your inquiry about the BMW X7. This luxury SUV features a spacious 7-seater configuration with premium leather upholstery, a state-of-the-art infotainment system, and advanced safety features. The financing options include competitive rates starting from 8.5% APR with flexible payment terms.",
        date: new Date('2025-01-10T11:45:00'),
        vehicle: {
          name: "BMW X7 xDrive40i 2023"
        },
        agent: {
          name: "David Kimani"
        },
        rating: 5,
        attachments: []
      },
      {
        id: "COMM002",
        type: "call",
        subject: "Follow-up Call",
        content: "Had a productive 15-minute call with the customer discussing their specific requirements for a luxury SUV. They're particularly interested in vehicles with advanced driver assistance systems and premium interior features. Scheduled a test drive for next week.",
        date: new Date('2025-01-09T15:20:00'),
        vehicle: {
          name: "Mercedes-Benz S-Class S500 2024"
        },
        agent: {
          name: "Sarah Johnson"
        },
        rating: 4,
        attachments: []
      },
      {
        id: "COMM003",
        type: "email",
        subject: "Test Drive Confirmation",
        content: "This email confirms your test drive appointment for the Audi Q8 on Saturday, January 18th at 10:00 AM. Please bring a valid driving license and arrive 15 minutes early for a brief orientation. We look forward to showing you this exceptional vehicle!",
        date: new Date('2025-01-11T10:30:00'),
        vehicle: {
          name: "Audi Q8 55 TFSI Quattro 2023"
        },
        agent: {
          name: "Michael Chen"
        },
        rating: null,
        attachments: ['test_drive_checklist.pdf']
      }
    ];

    const mockStats = {
      total: 12,
      pending: 3,
      testDrives: 2,
      avgResponseTime: "4.2 hrs"
    };

    setInquiries(mockInquiries);
    setTestDrives(mockTestDrives);
    setCommunications(mockCommunications);
    setFilteredCommunications(mockCommunications);
    setStats(mockStats);
    setLoading(false);
  }, []);

  const tabs = [
    { id: 'inquiries', label: 'Active Inquiries', icon: 'MessageSquare', count: inquiries?.length },
    { id: 'testdrives', label: 'Test Drives', icon: 'Calendar', count: testDrives?.length },
    { id: 'history', label: 'Communication History', icon: 'History', count: communications?.length }
  ];

  const statusFilters = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'responded', label: 'Responded' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'closed', label: 'Closed' }
  ];

  const getFilteredInquiries = () => {
    if (statusFilter === 'all') return inquiries;
    return inquiries?.filter(inquiry => inquiry?.status === statusFilter);
  };

  const handleScheduleTestDrive = (inquiry) => {
    console.log('Schedule test drive for:', inquiry);
    // Mock implementation - would open scheduling modal
  };

  const handleSendFollowup = (inquiry) => {
    console.log('Send follow-up for:', inquiry);
    // Mock implementation - would open follow-up form
  };

  const handleMarkResolved = (inquiry) => {
    console.log('Mark resolved:', inquiry);
    // Mock implementation - would update inquiry status
  };

  const handleViewDetails = (inquiry) => {
    console.log('View details for:', inquiry);
    // Mock implementation - would open detailed view
  };

  const handleRescheduleTestDrive = (testDrive) => {
    console.log('Reschedule test drive:', testDrive);
    // Mock implementation - would open rescheduling modal
  };

  const handleCancelTestDrive = (testDrive) => {
    console.log('Cancel test drive:', testDrive);
    // Mock implementation - would cancel test drive
  };

  const handleGetDirections = (testDrive) => {
    const { lat, lng } = testDrive?.location?.coordinates;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  const handleSearchCommunications = (searchTerm, type) => {
    let filtered = communications;
    
    if (type !== 'all') {
      filtered = filtered?.filter(comm => comm?.type === type);
    }
    
    if (searchTerm) {
      filtered = filtered?.filter(comm => 
        comm?.subject?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        comm?.content?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        comm?.vehicle?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }
    
    setFilteredCommunications(filtered);
  };

  const handleQuickActions = {
    onNewInquiry: () => navigate('/vehicle-browse-search'),
    onScheduleTestDrive: () => setActiveTab('testdrives'),
    onViewFavorites: () => navigate('/user-dashboard'),
    onContactSupport: () => console.log('Contact support')
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-accent animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your inquiries...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-6 lg:py-8">
          {/* Page Header */}
          <div className="mb-6 lg:mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                  Inquiry Management
                </h1>
                <p className="text-muted-foreground mt-1">
                  Track your vehicle inquiries, test drives, and communications
                </p>
              </div>
              
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => navigate('/vehicle-browse-search')}
              >
                New Inquiry
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mb-6 lg:mb-8">
            <InquiryStats stats={stats} />
          </div>

          {/* Quick Actions */}
          <div className="mb-6 lg:mb-8">
            <QuickActions 
              onNewInquiry={handleQuickActions.onNewInquiry}
              onScheduleTestDrive={handleQuickActions.onScheduleTestDrive}
              onViewFavorites={handleQuickActions.onViewFavorites}
              onContactSupport={handleQuickActions.onContactSupport}
            />
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap luxury-micro-transition ${
                      activeTab === tab?.id
                        ? 'border-accent text-accent' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                    {tab?.count > 0 && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activeTab === tab?.id
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {tab?.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'inquiries' && (
              <>
                {/* Status Filter */}
                <div className="flex flex-wrap gap-2">
                  {statusFilters?.map((filter) => (
                    <button
                      key={filter?.value}
                      onClick={() => setStatusFilter(filter?.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium luxury-micro-transition ${
                        statusFilter === filter?.value
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent'
                      }`}
                    >
                      {filter?.label}
                    </button>
                  ))}
                </div>

                {/* Inquiries List */}
                <div className="space-y-4">
                  {getFilteredInquiries()?.length === 0 ? (
                    <div className="bg-card border border-border rounded-lg p-8 text-center">
                      <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">No Inquiries Found</h3>
                      <p className="text-muted-foreground mb-4">
                        {statusFilter === 'all' ? "You haven't made any vehicle inquiries yet." : `No inquiries with status "${statusFilter}" found.`}
                      </p>
                      <Button
                        variant="outline"
                        iconName="Plus"
                        iconPosition="left"
                        onClick={() => navigate('/vehicle-browse-search')}
                      >
                        Browse Vehicles
                      </Button>
                    </div>
                  ) : (
                    getFilteredInquiries()?.map((inquiry) => (
                      <InquiryCard
                        key={inquiry?.id}
                        inquiry={inquiry}
                        onScheduleTestDrive={handleScheduleTestDrive}
                        onSendFollowup={handleSendFollowup}
                        onMarkResolved={handleMarkResolved}
                        onViewDetails={handleViewDetails}
                      />
                    ))
                  )}
                </div>
              </>
            )}

            {activeTab === 'testdrives' && (
              <div className="space-y-4">
                {testDrives?.length === 0 ? (
                  <div className="bg-card border border-border rounded-lg p-8 text-center">
                    <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">No Test Drives Scheduled</h3>
                    <p className="text-muted-foreground mb-4">
                      Schedule a test drive to experience our luxury vehicles firsthand.
                    </p>
                    <Button
                      variant="outline"
                      iconName="Calendar"
                      iconPosition="left"
                      onClick={() => navigate('/vehicle-browse-search')}
                    >
                      Schedule Test Drive
                    </Button>
                  </div>
                ) : (
                  testDrives?.map((testDrive) => (
                    <TestDriveCard
                      key={testDrive?.id}
                      testDrive={testDrive}
                      onReschedule={handleRescheduleTestDrive}
                      onCancel={handleCancelTestDrive}
                      onGetDirections={handleGetDirections}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <CommunicationHistory
                communications={filteredCommunications}
                onSearch={handleSearchCommunications}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InquiryManagement;