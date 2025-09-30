export const APP_NAME = "DesignSpec Ltd";
export const APP_MOTTO = "Consulting with confidence, trust and excellence";
export const COMPANY_ESTABLISHED = 2010;

export const SERVICES = [
  {
    id: 'architectural_design',
    name: 'Architectural Design',
    description: 'Innovative and sustainable architectural solutions tailored to your vision',
    icon: 'Building2',
    features: [
      'Conceptual Design',
      'Technical Drawings',
      '3D Visualization',
      'Building Permits',
      'Construction Documentation',
    ],
  },
  {
    id: 'interior_design',
    name: 'Interior Design',
    description: 'Transform spaces into functional and aesthetically pleasing environments',
    icon: 'Sofa',
    features: [
      'Space Planning',
      'Color Consultation',
      'Furniture Selection',
      'Lighting Design',
      'Material Specification',
    ],
  },
  {
    id: 'urban_planning',
    name: 'Urban Planning',
    description: 'Strategic planning for sustainable and livable urban developments',
    icon: 'Map',
    features: [
      'Master Planning',
      'Land Use Planning',
      'Environmental Impact',
      'Infrastructure Design',
      'Community Engagement',
    ],
  },
  {
    id: 'project_management',
    name: 'Project Management',
    description: 'Expert oversight ensuring projects are delivered on time and within budget',
    icon: 'ClipboardCheck',
    features: [
      'Project Scheduling',
      'Budget Management',
      'Quality Control',
      'Risk Management',
      'Stakeholder Coordination',
    ],
  },
] as const;

export const USER_ROLES = {
  POTENTIAL_CLIENT: 'potential_client',
  EXISTING_CLIENT: 'existing_client',
  ADMIN: 'admin',
  STAFF: 'staff',
  PARTNER: 'partner',
} as const;

export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  PORTFOLIO: '/portfolio',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  CLIENT: '/dashboard/client',
  ADMIN: '/dashboard/admin',
  STAFF: '/dashboard/staff',
  PARTNER: '/dashboard/partner',
  ONBOARDING: '/onboarding',
} as const;

export const PROJECT_STATUS_LABELS = {
  inquiry: 'Inquiry',
  quoted: 'Quoted',
  active: 'Active',
  on_hold: 'On Hold',
  completed: 'Completed',
  cancelled: 'Cancelled',
} as const;

export const APPOINTMENT_STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
} as const;

export const PAYMENT_STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  refunded: 'Refunded',
} as const;

export const BUDGET_RANGES = [
  'Under KES 500,000',
  'KES 500,000 - 1,000,000',
  'KES 1,000,000 - 2,500,000',
  'KES 2,500,000 - 5,000,000',
  'KES 5,000,000 - 10,000,000',
  'Above KES 10,000,000',
] as const;

export const TIMELINE_OPTIONS = [
  'Less than 1 month',
  '1-3 months',
  '3-6 months',
  '6-12 months',
  'More than 1 year',
] as const;

export const APPOINTMENT_TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
] as const;

export const CONTACT_INFO = {
  email: 'info@designspec.co.ke',
  phone: '+254 700 000 000',
  address: 'Nairobi, Kenya',
  workingHours: 'Monday - Friday: 9:00 AM - 5:00 PM',
} as const;

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/designspec',
  twitter: 'https://twitter.com/designspec',
  instagram: 'https://instagram.com/designspec',
  linkedin: 'https://linkedin.com/company/designspec',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
} as const;

export const QUERY_KEYS = {
  PROFILE: 'profile',
  PROJECTS: 'projects',
  PROJECT: 'project',
  APPOINTMENTS: 'appointments',
  APPOINTMENT: 'appointment',
  QUOTES: 'quotes',
  QUOTE: 'quote',
  PAYMENTS: 'payments',
  PAYMENT: 'payment',
  PORTFOLIO: 'portfolio',
  PORTFOLIO_ITEM: 'portfolio-item',
  DOCUMENTS: 'documents',
  NOTIFICATIONS: 'notifications',
  DASHBOARD_STATS: 'dashboard-stats',
} as const;
