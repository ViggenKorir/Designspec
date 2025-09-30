# DesignSpec Ltd - Setup Guide

This guide will walk you through setting up the DesignSpec Ltd web application from scratch.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Clerk Authentication Setup](#clerk-authentication-setup)
3. [Supabase Database Setup](#supabase-database-setup)
4. [Local Development Setup](#local-development-setup)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**
- A code editor (VS Code recommended)

You'll also need accounts for:
- [Clerk](https://clerk.com) - For authentication
- [Supabase](https://supabase.com) - For database and storage

---

## Clerk Authentication Setup

### Step 1: Create a Clerk Application

1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Sign in or create a new account
3. Click **"Create Application"**
4. Name your application: **"DesignSpec Platform"**
5. Select authentication options:
   - ✅ Email
   - ✅ Google
   - (Optional) Add more OAuth providers

### Step 2: Configure Authentication Settings

1. In the Clerk Dashboard, go to **"User & Authentication"** → **"Email, Phone, Username"**
2. Configure settings:
   - Email address: **Required**
   - Phone number: **Optional**
   - Username: **Optional**

3. Go to **"Paths"** and configure:
   - Sign-in URL: `/login`
   - Sign-up URL: `/register`
   - After sign-in URL: `/dashboard`
   - After sign-up URL: `/onboarding`

### Step 3: Get Your Clerk Keys

1. Go to **"API Keys"** in the Clerk Dashboard
2. Copy the following keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
3. Save these for the environment variables setup

### Step 4: Add User Metadata Fields (Optional)

1. Go to **"User & Authentication"** → **"Metadata"**
2. Add custom metadata fields if needed:
   - `role`: User role in the system
   - `company_name`: Client's company name
   - `phone`: Contact phone number

---

## Supabase Database Setup

### Step 1: Create a Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in or create a new account
3. Click **"New Project"**
4. Fill in the details:
   - Name: **DesignSpec Platform**
   - Database Password: Choose a strong password (save this!)
   - Region: Choose closest to your users
   - Pricing Plan: Start with Free tier

### Step 2: Get Your Supabase Keys

1. Go to **"Settings"** → **"API"**
2. Copy the following:
   - Project URL: `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key: `SUPABASE_SERVICE_ROLE_KEY`
3. Save these for the environment variables setup

### Step 3: Create Database Tables

1. In your Supabase Dashboard, go to **"SQL Editor"**
2. Click **"New Query"**
3. Copy and paste the following SQL script:

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

-- RLS Policies

-- Profiles: Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid()::text = user_id);

-- Profiles: Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Portfolio: Everyone can view portfolio items
CREATE POLICY "Anyone can view portfolio" ON portfolio
  FOR SELECT USING (true);

-- Contact messages: Anyone can insert
CREATE POLICY "Anyone can submit contact form" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Projects: Users can view their own projects
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (
    client_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()::text)
  );

-- Appointments: Users can view their own appointments
CREATE POLICY "Users can view own appointments" ON appointments
  FOR SELECT USING (
    client_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()::text)
  );

-- Quotes: Users can view their own quotes
CREATE POLICY "Users can view own quotes" ON quotes
  FOR SELECT USING (
    client_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()::text)
  );

-- Payments: Users can view their own payments
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (
    client_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()::text)
  );

-- Documents: Users can view documents for their projects
CREATE POLICY "Users can view own project documents" ON documents
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects 
      WHERE client_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()::text)
    )
  );

-- Notifications: Users can view their own notifications
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (
    user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()::text)
  );
```

4. Click **"Run"** to execute the script
5. Verify all tables were created successfully in the **"Table Editor"**

### Step 4: Set Up Storage Buckets

1. Go to **"Storage"** in the Supabase Dashboard
2. Create the following buckets:
   - `documents` - For project documents
   - `portfolio` - For portfolio images
   - `avatars` - For user profile pictures

3. Configure bucket policies for public access where needed

---

## Local Development Setup

### Step 1: Install Dependencies

```bash
cd Designspec
npm install
```

### Step 2: Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env.local
```

2. Open `.env.local` and fill in your keys:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# Resend Email (optional for now)
RESEND_API_KEY=re_xxxxx

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Step 3: Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application!

### Step 4: Test Authentication

1. Click **"Sign Up"** to create a test account
2. Complete the sign-up process
3. You should be redirected to the dashboard
4. Check Supabase to verify a profile was created

---

## Troubleshooting

### Common Issues

#### 1. "Module not found" errors

**Solution:** Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 2. Clerk authentication not working

**Solution:** Verify your Clerk keys are correct in `.env.local`
- Check that keys start with `pk_` and `sk_`
- Ensure no extra spaces or quotes
- Restart the dev server after changing env vars

#### 3. Supabase connection errors

**Solution:** 
- Verify your Supabase URL and keys
- Check that your Supabase project is active
- Ensure RLS policies are set up correctly

#### 4. Build errors with TypeScript

**Solution:**
```bash
npm run type-check
```
Fix any type errors shown in the output

#### 5. Styling not loading

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Getting Help

If you encounter issues not covered here:

1. Check the [Next.js Documentation](https://nextjs.org/docs)
2. Review [Clerk Documentation](https://clerk.com/docs)
3. Check [Supabase Documentation](https://supabase.com/docs)
4. Contact the development team

---

## Next Steps

After successful setup:

1. ✅ Create a test admin account
2. ✅ Add sample portfolio items
3. ✅ Test the quote request flow
4. ✅ Configure email notifications (Resend)
5. ✅ Set up payment providers (M-Pesa, Stripe)

## Production Deployment

When ready to deploy:

1. Push code to GitHub
2. Connect to Vercel
3. Add production environment variables
4. Update Clerk production URLs
5. Configure Supabase production policies
6. Test thoroughly before going live

---

**Need help?** Contact: dev@designspec.co.ke