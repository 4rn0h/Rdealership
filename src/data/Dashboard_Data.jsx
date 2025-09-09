// src/data/Dashboard_Data.jsx
import vehiclesData from './Vehicles_Data';

// ✅ Quick Actions
export const mockQuickActions = [
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
    path: "/vehicle-browse-search",
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
    path: "/vehicle-browse-search?action=schedule",
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
    variant: "outline",
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
      text: "2 pending", // 🔗 this can be dynamic later
      color: "text-warning",
      bgColor: "bg-warning/10",
      icon: "Clock",
    },
  },
];

// ✅ Notification Preferences
export const mockNotificationPreferences = {
  priceDrops: true,
  newArrivals: true,
  inquiryResponses: true,
  testDriveReminders: true,
  marketingUpdates: false,
  weeklyDigest: true,
  emailFrequency: "daily",
};

// ✅ Price Alerts (using local images from Vehicles_Data.jsx)
export const mockPriceAlerts = [
  {
    id: "PA001",
    vehicle: {
      id: 5,
      name: "Porsche Cayenne Turbo",
      image: "/assets/images/vehicles/Porsche Cayenne.jpeg",
    },
    currentPrice: 18500000,
    previousPrice: 19200000,
    targetPrice: 18000000,
    currency: "KES",
    isActive: true,
    createdAt: "2025-01-05T10:00:00Z",
  },
  {
    id: "PA002",
    vehicle: {
      id: 6,
      name: "Jaguar F-PACE SVR",
      image: "/assets/images/vehicles/Land Rover Defender 110.jpeg", // placeholder in Vehicles_Data
    },
    currentPrice: 14800000,
    targetPrice: 14500000,
    currency: "KES",
    isActive: true,
    createdAt: "2025-01-08T16:20:00Z",
  },
];

// ✅ Recent Activities (aligned with Vehicles_Data.jsx)
export const mockActivities = [
  {
    id: 1,
    type: "vehicle_viewed",
    vehicle: {
      id: 1,
      name: "BMW X7 xDrive40i",
      image: "/assets/images/vehicles/2021 Rolls Royce Ghost.jpg", // placeholder in Vehicles_Data
    },
    timestamp: "2025-01-12T15:30:00Z",
  },
  {
    id: 2,
    type: "vehicle_favorited",
    vehicle: {
      id: 2,
      name: "Mercedes-Benz S-Class S500",
      image: "/assets/images/vehicles/Mercedes-Benz S 450 4M AMG 1.jpeg",
    },
    timestamp: "2025-01-12T14:15:00Z",
  },
  {
    id: 3,
    type: "inquiry_sent",
    vehicle: {
      id: 4,
      name: "Range Rover Vogue",
      image: "/assets/images/vehicles/Range Rover Sport.jpeg", // placeholder in Vehicles_Data
    },
    timestamp: "2025-01-11T09:15:00Z",
  },
  {
    id: 4,
    type: "search_saved",
    searchQuery: "BMW X Series under 15M KES",
    timestamp: "2025-01-10T18:45:00Z",
  },
];



