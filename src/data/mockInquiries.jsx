// src/data/mockInquiries.jsx
const mockInquiries = [
  {
    id: 101,
    vehicle: {
      year: 2022,
      make: 'Bentley',
      model: 'Continental GT',
      images: [
        'https://example.com/images/bentley-continental-gt.jpg',
      ],
    },
    message: 'I’m interested in financing options for this car.',
    status: 'pending',
    createdAt: '2025-09-01T10:45:00Z',
    responseCount: 0,
  },
  {
    id: 102,
    vehicle: {
      year: 2023,
      make: 'Rolls Royce',
      model: 'Ghost',
      images: [
        'https://example.com/images/rolls-royce-ghost.jpg',
      ],
    },
    message: 'Can I schedule a test drive next week?',
    status: 'responded',
    createdAt: '2025-08-28T14:20:00Z',
    responseCount: 2,
  },
  {
    id: 103,
    vehicle: {
      year: 2024,
      make: 'Ferrari',
      model: 'SF90 Stradale',
      images: [
        'https://example.com/images/ferrari-sf90.jpg',
      ],
    },
    message: 'Is this model available in black interior?',
    status: 'closed',
    createdAt: '2025-08-20T09:15:00Z',
    responseCount: 1,
  },
];

export default mockInquiries;
