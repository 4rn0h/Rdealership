// src/data/Inquiry_Data.js

const mockInquiries = [
  {
    id: "INQ001",
    vehicleId: 1, // Link to vehicle in Vehicles_Data
    message: "I'm interested in this luxury SUV. Could you provide more details about the interior features and available financing options?",
    status: "pending",
    createdAt: new Date('2025-01-10T09:30:00'),
    lastActivity: new Date('2025-01-10T09:30:00'),
    agent: null,
    response: null,
    responseDate: null,
  },
  {
    id: "INQ002",
    vehicleId: 2,
    message: "What is the fuel efficiency of this model? Also, does it come with the latest driver assistance features?",
    status: "responded",
    createdAt: new Date('2025-01-08T14:15:00'),
    lastActivity: new Date('2025-01-09T11:20:00'),
    agent: {
      name: "Sarah Johnson",
      email: "sarah.johnson@RoyaMotorsUk.co.ke",
    },
    response: "Thank you for your interest! The S500 offers excellent fuel efficiency with an average of 8.5L/100km combined...",
    responseDate: new Date('2025-01-09T11:20:00'),
  },
  {
    id: "INQ003",
    vehicleId: 3,
    message: "Is this vehicle still available? I'm looking for a luxury SUV with good off-road capabilities.",
    status: "scheduled",
    createdAt: new Date('2025-01-05T16:45:00'),
    lastActivity: new Date('2025-01-11T10:30:00'),
    agent: {
      name: "Michael Chen",
      email: "michael.chen@RoyaMotorsUk.co.ke",
    },
    response: "Yes, this Q8 is still available! It features Audi's renowned Quattro system...",
    responseDate: new Date('2025-01-11T10:30:00'),
  },
];

const mockTestDrives = [
  {
    id: "TD001",
    vehicleId: 3,
    scheduledDate: new Date('2025-01-18T10:00:00'),
    status: "confirmed",
    location: {
      name: "RoyaMotorsUk Showroom Westlands",
      address: "Westlands Road, Nairobi",
      coordinates: { lat: -1.2634, lng: 36.8155 },
    },
    agent: {
      name: "Michael Chen",
      phone: "+254 712 345 678",
      email: "michael.chen@RoyaMotorsUk.co.ke",
    },
    notes: "Customer specifically interested in off-road capabilities and interior luxury features.",
  },
  {
    id: "TD002",
    vehicleId: 4,
    scheduledDate: new Date('2025-01-15T14:30:00'),
    status: "completed",
    location: {
      name: "RoyaMotorsUk Showroom Karen",
      address: "Karen Shopping Centre, Nairobi",
      coordinates: { lat: -1.3197, lng: 36.7073 },
    },
    agent: {
      name: "Sarah Johnson",
      phone: "+254 723 456 789",
      email: "sarah.johnson@RoyaMotorsUk.co.ke",
    },
    notes: "Test drive completed successfully. Customer very impressed with performance.",
  },
];

const mockCommunications = [
  {
    id: "COMM001",
    type: "inquiry",
    subject: "BMW X7 Inquiry Response",
    content: "Thank you for your inquiry about the BMW X7...",
    date: new Date('2025-01-10T11:45:00'),
    vehicleId: 1,
    agent: { name: "David Kimani" },
    rating: 5,
    attachments: [],
  },
  {
    id: "COMM002",
    type: "call",
    subject: "Follow-up Call",
    content: "Had a productive call with the customer...",
    date: new Date('2025-01-09T15:20:00'),
    vehicleId: 2,
    agent: { name: "Sarah Johnson" },
    rating: 4,
    attachments: [],
  },
  {
    id: "COMM003",
    type: "email",
    subject: "Test Drive Confirmation",
    content: "This email confirms your test drive appointment for the Audi Q8...",
    date: new Date('2025-01-11T10:30:00'),
    vehicleId: 3,
    agent: { name: "Michael Chen" },
    rating: null,
    attachments: ['test_drive_checklist.pdf'],
  },
];

const mockStats = {
  total: 12,
  pending: 3,
  testDrives: 2,
  avgResponseTime: "4.2 hrs",
};

export { mockInquiries, mockTestDrives, mockCommunications, mockStats };

// ✅ Default export for seeding
export default {
  mockInquiries,
  mockTestDrives,
  mockCommunications,
  mockStats,
};
