# DesignSpec Ltd - Web Application

> **Consulting with confidence, trust and excellence**

A comprehensive full-stack web application for DesignSpec Ltd, a consulting company specializing in architectural design, interior design, urban planning, and project management services.

## 🚀 Features

### Phase 1 - MVP (Current Implementation)

- ✅ Modern landing page with hero section, services showcase, and portfolio grid
- ✅ Authentication system using Clerk (Email/Password + OAuth)
- ✅ Role-based dashboard routing
- ✅ Responsive design with mobile-first approach
- ✅ Type-safe development with TypeScript
- ✅ Server-side rendering with Next.js 14 App Router
- ✅ Real-time data with Supabase integration
- ✅ Beautiful UI components with shadcn/ui

### Upcoming Features

- 📋 Multi-step quote request form
- 📅 Appointment booking with calendar interface
- 💼 Portfolio showcase with filtering
- 💳 Payment integration (M-Pesa + Stripe)
- 📊 Admin analytics dashboard
- 📁 Document management system
- 🔔 Real-time notifications
- 📧 Email notifications with Resend

## 🛠 Tech Stack

### Core Technologies

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **UI Library:** React 18+
- **Database:** Supabase
- **Authentication:** Clerk Auth
- **Styling:** TailwindCSS

### Additional Libraries

- **Components:** shadcn/ui
- **Forms:** React Hook Form + Zod
- **State Management:** TanStack Query v5
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Date Utilities:** date-fns
- **Email:** Resend
- **Icons:** Lucide React

## 📁 Project Structure

```
Designspec/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication routes
│   │   ├── (marketing)/         # Public pages
│   │   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── api/                 # API routes
│   │   ├── globals.css          # Global styles
│   │   └── layout.tsx           # Root layout
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── marketing/           # Marketing page components
│   │   ├── dashboard/           # Dashboard components
│   │   ├── forms/               # Form components
│   │   ├── providers/           # Context providers
│   │   └── shared/              # Shared components
│   ├── lib/
│   │   ├── supabase/           # Supabase clients
│   │   ├── clerk/              # Clerk utilities
│   │   └── utils.ts            # Utility functions
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # TypeScript type definitions
│   └── config/                  # Configuration files
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- A Clerk account ([clerk.com](https://clerk.com))
- A Supabase account ([supabase.com](https://supabase.com))

### Installation

1. **Clone the repository**

```bash
cd Designspec
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend Email (optional for now)
RESEND_API_KEY=your_resend_api_key

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

4. **Set up Supabase Database**

Run the following SQL in your Supabase SQL Editor to create the necessary tables:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums
CREATE TYPE user_role AS ENUM ('potential_client', 'existing_client', 'admin', 'staff', 'partner');
CREATE TYPE project_status AS ENUM ('inquiry', 'quoted', 'active', 'on_hold', 'completed', 'cancelled');
CREATE TYPE service_type AS ENUM ('architectural_design', 'interior_design', 'urban_planning', 'project_management');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded');
CREATE TYPE payment_method AS ENUM ('mpesa', 'stripe', 'bank_transfer');

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role DEFAULT 'potential_client',
  avatar_url TEXT,
  company_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  service_type service_type NOT NULL,
  status project_status DEFAULT 'inquiry',
  budget_range TEXT,
  start_date DATE,
  end_date DATE,
  assigned_staff_id UUID REFERENCES profiles(id),
  progress_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  service_type service_type NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  status appointment_status DEFAULT 'pending',
  notes TEXT,
  meeting_link TEXT,
  staff_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quotes table
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  project_title TEXT NOT NULL,
  service_type service_type NOT NULL,
  description TEXT NOT NULL,
  budget_range TEXT,
  timeline TEXT,
  status TEXT DEFAULT 'pending',
  quoted_amount DECIMAL(12, 2),
  valid_until DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  currency TEXT DEFAULT 'KES',
  method payment_method NOT NULL,
  status payment_status DEFAULT 'pending',
  transaction_id TEXT,
  mpesa_receipt TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio table
CREATE TABLE portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  service_type service_type NOT NULL,
  images TEXT[] NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  client_name TEXT,
  completion_date DATE,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity logs table
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_appointments_client_id ON appointments(client_id);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_quotes_client_id ON quotes(client_id);
CREATE INDEX idx_payments_project_id ON payments(project_id);
CREATE INDEX idx_documents_project_id ON documents(project_id);
CREATE INDEX idx_portfolio_featured ON portfolio(featured);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👥 User Roles & Access Levels

The application supports five user roles with different access levels:

### 1. Potential Clients
- Browse services and portfolio
- Request quotes
- Book consultations
- View public content

### 2. Existing Clients
- All potential client features
- Access to project dashboard
- View project progress
- Download documents
- Make payments

### 3. Admin
- Full system access
- User management
- Analytics and reports
- Content management
- Financial oversight

### 4. Staff
- Project management
- Task assignments
- Calendar management
- Client communication
- Document uploads

### 5. Partners
- Limited project access
- Commission tracking
- Performance reports
- Referral management

## 🎨 Design System

### Color Palette

The application uses a modern, professional color scheme based on blue tones:

- **Primary:** `#0ea5e9` (Sky Blue)
- **Secondary:** Muted grays for backgrounds
- **Accent:** Primary blue variations
- **Success:** Green tones
- **Warning:** Amber tones
- **Error:** Red tones

### Typography

- **Font Family:** Inter (Google Fonts)
- **Headings:** Bold, tracking-tight
- **Body:** Regular weight, comfortable line-height
- **Code:** Monospace for technical content

## 🔐 Authentication Flow

1. User signs up via Clerk (email or OAuth)
2. Profile is created in Supabase
3. User is assigned a default role (`potential_client`)
4. User completes onboarding (optional)
5. User is redirected to appropriate dashboard based on role

## 📱 Responsive Design

The application is fully responsive and optimized for:

- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1280px+)
- 🖥️ Large displays (1536px+)

## 🧪 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Add loading states for async operations
- Write meaningful commit messages

### Component Guidelines

- Use Server Components by default
- Add 'use client' only when needed
- Keep components focused and small
- Use composition over inheritance
- Implement proper accessibility (ARIA)

### API Development

- Validate all inputs with Zod
- Return consistent error responses
- Implement rate limiting
- Use proper HTTP status codes
- Add comprehensive logging

### Database Best Practices

- Use parameterized queries
- Implement pagination (20 items default)
- Enable Row Level Security (RLS)
- Add proper indexes
- Use transactions for related operations

## 📚 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check

# Database
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:

- All Clerk keys
- All Supabase keys
- Resend API key (for emails)
- NEXT_PUBLIC_APP_URL (your production URL)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software for DesignSpec Ltd.

## 📞 Support

For support, email info@designspec.co.ke or contact us through the website.

## 🎯 Roadmap

### Q1 2024
- ✅ MVP Launch
- ✅ Landing page and marketing site
- ✅ Authentication system
- 🔄 Quote request form
- 🔄 Appointment booking

### Q2 2024
- 📋 Payment integration (M-Pesa + Stripe)
- 📋 Document management
- 📋 Real-time notifications
- 📋 Email notifications

### Q3 2024
- 📋 Advanced analytics
- 📋 Mobile app (React Native)
- 📋 API for third-party integrations
- 📋 White-label solution

---

**Built with ❤️ by DesignSpec Ltd Development Team**

*Consulting with confidence, trust and excellence since 2010*