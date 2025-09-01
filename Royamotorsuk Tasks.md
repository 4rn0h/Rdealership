## To be completed
 -Scan the the project and understand the code, add this screens
    -Favourites management, Sales Agent dashboard
    -Switch from Navbar to Header for all the pages, with contents from NavBar - Done
    -WhyChooseUs not showing on the homepage - Done
    -also update your Home page the same way (removing its local CallToAction import), so _app.js is the single source of truth for CTA placement?



## Completed
 -change everywhere where luxauto is mentioned to RoyaMotorsUk
 -add a navbar with page links(rearranged) Home(missing), Collection(available), {RoyaMotorsUk-brand name to be in the middle} About(missing), contacts, SignUp/Login-Use an icon for this - Done

## Contents
-get content and style from the below links
   url-https://www.royamotorsuk.com
   repo-https://github.com/4rn0h/royamotorsuk_app/tree/master/rmotors_frontend
-All image links change to use placeholders. il upload local images for the missing pages
-change Login credentials to @royamotorsuk.com, pswd can stay the same for app's functional experience. admin@luxauto.com: admin123 agent@luxauto.com: agent123 user@luxauto.com: user123 david.kimani@email.com: (role-based access)

### To be Improved On
-homepage CallToAction to be just above the footer - Done
-login/logout working - Done


-Clear and consistent data all through
-separate Hero Images & texts intervals
-Royamotorsuk to be same color as phone cta




## Clarity on how to go about this
This project is using supabase and already connected
project url = https://supabase.com/dashboard/project/ckozmqltqbumvjnahjgr
 =>attach screenshot


### Step 1: Configure Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Step 2: Setup Supabase Configuration
Create `lib/supabase.ts` for client configuration and auth helpers.

---

## Phase 3: Database Schema & Authentication

### Step 4: Create Supabase Database Tables
Execute these SQL commands in Supabase SQL Editor:

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'sales_agent', 'customer')) DEFAULT 'customer',
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vehicles table
CREATE TABLE public.vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  mileage INTEGER,
  fuel_type TEXT,
  transmission TEXT,
  body_type TEXT,
  color TEXT,
  engine_size TEXT,
  description TEXT,
  features TEXT[], -- Array of features
  image_urls TEXT[], -- Array of image URLs
  status TEXT NOT NULL CHECK (status IN ('available', 'reserved', 'sold')) DEFAULT 'available',
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favorites table
CREATE TABLE public.favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, vehicle_id)
);

-- Inquiries table
CREATE TABLE public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('form', 'whatsapp', 'phone', 'email')),
  status TEXT NOT NULL CHECK (status IN ('new', 'contacted', 'qualified', 'sold', 'closed')) DEFAULT 'new',
  message TEXT,
  contact_info JSONB, -- Store phone, email, preferred contact method
  assigned_agent_id UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Test Drives table
CREATE TABLE public.test_drives (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES public.users(id),
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled')) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Step 5: Setup Row Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_drives ENABLE ROW LEVEL SECURITY;

-- RLS Policies (create comprehensive policies for each table)
-- Users can read their own data, admins can read all
-- Vehicles are publicly readable, only admins can modify
-- Favorites are private to users
-- Inquiries have role-based access
-- Test drives have role-based access
```

### Step 6: Setup Supabase Storage
Create storage bucket for vehicle images:
- Bucket name: `vehicle-images`
- Public access: Yes
- File size limit: 10MB
- Allowed file types: image/*