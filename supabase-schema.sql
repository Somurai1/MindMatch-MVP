-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE user_role AS ENUM ('referrer', 'therapist', 'admin', 'clinical_lead');
CREATE TYPE urgency_level AS ENUM ('low', 'medium', 'high', 'crisis');
CREATE TYPE referral_status AS ENUM ('pending', 'matched', 'booked', 'completed', 'cancelled');
CREATE TYPE booking_status AS ENUM ('scheduled', 'completed', 'cancelled', 'no_show');
CREATE TYPE session_modality AS ENUM ('video', 'phone', 'chat', 'in_person');
CREATE TYPE document_type AS ENUM ('license', 'insurance', 'qualification', 'id');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role user_role NOT NULL DEFAULT 'referrer',
    phone TEXT,
    organization TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Therapists table
CREATE TABLE public.therapists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    license_number TEXT NOT NULL,
    qualifications TEXT[] NOT NULL DEFAULT '{}',
    specializations TEXT[] NOT NULL DEFAULT '{}',
    languages TEXT[] NOT NULL DEFAULT '{}',
    availability JSONB NOT NULL DEFAULT '{}',
    hourly_rate DECIMAL(10,2) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_date TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES public.users(id),
    bio TEXT,
    profile_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referrals table
CREATE TABLE public.referrals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    referrer_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    client_name TEXT NOT NULL,
    client_age INTEGER NOT NULL CHECK (client_age >= 0 AND client_age <= 25),
    client_email TEXT,
    client_phone TEXT,
    issue_type TEXT NOT NULL,
    urgency urgency_level NOT NULL DEFAULT 'medium',
    preferred_language TEXT NOT NULL DEFAULT 'English',
    preferred_modality session_modality NOT NULL DEFAULT 'video',
    special_requirements TEXT,
    consent_given BOOLEAN NOT NULL DEFAULT FALSE,
    consent_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status referral_status DEFAULT 'pending',
    matched_therapist_id UUID REFERENCES public.therapists(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    referral_id UUID REFERENCES public.referrals(id) ON DELETE CASCADE NOT NULL,
    therapist_id UUID REFERENCES public.therapists(id) ON DELETE CASCADE NOT NULL,
    scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 60,
    modality session_modality NOT NULL,
    meeting_link TEXT,
    status booking_status DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Therapist documents table
CREATE TABLE public.therapist_documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    therapist_id UUID REFERENCES public.therapists(id) ON DELETE CASCADE NOT NULL,
    document_type document_type NOT NULL,
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified BOOLEAN DEFAULT FALSE,
    verified_by UUID REFERENCES public.users(id),
    verified_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_therapists_verified ON public.therapists(is_verified);
CREATE INDEX idx_therapists_specializations ON public.therapists USING GIN(specializations);
CREATE INDEX idx_referrals_status ON public.referrals(status);
CREATE INDEX idx_referrals_urgency ON public.referrals(urgency);
CREATE INDEX idx_referrals_created_at ON public.referrals(created_at);
CREATE INDEX idx_bookings_scheduled_date ON public.bookings(scheduled_date);
CREATE INDEX idx_bookings_status ON public.bookings(status);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'clinical_lead')
        )
    );

-- RLS Policies for therapists table
CREATE POLICY "Therapists can view their own profile" ON public.therapists
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Therapists can update their own profile" ON public.therapists
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view verified therapists" ON public.therapists
    FOR SELECT USING (is_verified = true);

CREATE POLICY "Admins can view all therapists" ON public.therapists
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'clinical_lead')
        )
    );

-- RLS Policies for referrals table
CREATE POLICY "Referrers can view their own referrals" ON public.referrals
    FOR SELECT USING (auth.uid() = referrer_id);

CREATE POLICY "Referrers can create referrals" ON public.referrals
    FOR INSERT WITH CHECK (auth.uid() = referrer_id);

CREATE POLICY "Referrers can update their own referrals" ON public.referrals
    FOR UPDATE USING (auth.uid() = referrer_id);

CREATE POLICY "Admins can view all referrals" ON public.referrals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'clinical_lead')
        )
    );

-- RLS Policies for bookings table
CREATE POLICY "Users can view bookings for their referrals" ON public.bookings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.referrals 
            WHERE id = referral_id AND referrer_id = auth.uid()
        )
    );

CREATE POLICY "Therapists can view their bookings" ON public.bookings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.therapists 
            WHERE id = therapist_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can view all bookings" ON public.bookings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'clinical_lead')
        )
    );

-- RLS Policies for therapist_documents table
CREATE POLICY "Therapists can view their own documents" ON public.therapist_documents
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.therapists 
            WHERE id = therapist_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Therapists can upload their own documents" ON public.therapist_documents
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.therapists 
            WHERE id = therapist_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can view all documents" ON public.therapist_documents
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'clinical_lead')
        )
    );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_therapists_updated_at BEFORE UPDATE ON public.therapists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_referrals_updated_at BEFORE UPDATE ON public.referrals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, role)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', 'referrer');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
