# MindMatch MVP

A rapid mental health support platform that connects young people with verified therapists in hours, not months.

## Overview

MindMatch is designed to eliminate unacceptable delays in mental health access by providing:

- **Rapid Referral Intake**: Parents, teachers, GPs, and self-referrers can submit referrals
- **Intelligent Matching**: Rule-based algorithm matches clients with appropriate therapists
- **Clinical Oversight**: All matches reviewed by qualified clinical professionals
- **Secure Platform**: GDPR-compliant with end-to-end encryption
- **Flexible Sessions**: Video, phone, chat, or in-person sessions

## Features

### ✅ Completed MVP Features

- **Authentication System**: Role-based access control (referrer, therapist, admin, clinical_lead)
- **Referral Intake Form**: Comprehensive form with validation and consent management
- **Therapist Onboarding**: Registration, credential verification, and profile management
- **Matching Engine**: Intelligent rule-based matching algorithm
- **Admin Dashboard**: Clinical oversight and platform management
- **Email Notifications**: Automated notifications using Resend
- **Therapist Dashboard**: Session management and client overview

### 🚧 In Progress

- **Calendly Integration**: Session scheduling and booking system
- **GDPR Compliance**: Privacy policy and data protection measures

### 📋 Future Enhancements

- **ML-Driven Matching**: Advanced AI-powered therapist matching
- **Video Integration**: Built-in video calling (Zoom/Twilio)
- **Mobile App**: React Native mobile application
- **Multi-language Support**: International expansion
- **Payment Processing**: Stripe integration for session payments

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Authentication**: Supabase Auth with role-based access
- **Email**: Resend for transactional emails
- **Scheduling**: Calendly API integration
- **Deployment**: Vercel
- **Database**: PostgreSQL with Row Level Security

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Resend account (for emails)
- Calendly account (for scheduling)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mindmatch-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

   # Resend Email Configuration
   RESEND_API_KEY=your_resend_api_key_here

   # Calendly Integration
   CALENDLY_API_TOKEN=your_calendly_api_token_here

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_APP_NAME=MindMatch

   # Security
   JWT_SECRET=your_jwt_secret_here
   ```

4. **Set up Supabase Database**
   - Create a new Supabase project
   - Run the SQL schema from `supabase-schema.sql`
   - Enable Row Level Security
   - Set up authentication providers

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses the following main tables:

- **users**: User accounts with role-based access
- **therapists**: Therapist profiles and credentials
- **referrals**: Client referrals and matching status
- **bookings**: Session scheduling and management
- **therapist_documents**: Document verification and storage

## User Roles

### Referrer
- Parents, teachers, GPs, or self-referrers
- Can submit referrals for young people
- Can view their referral status

### Therapist
- Verified mental health professionals
- Can view matched referrals
- Can manage their availability and profile

### Admin/Clinical Lead
- Platform oversight and management
- Therapist verification and approval
- Referral processing and matching override

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Referrals
- `POST /api/referrals` - Submit new referral
- `GET /api/referrals` - Get user's referrals
- `PUT /api/referrals/:id` - Update referral status

### Therapists
- `POST /api/therapists` - Create therapist profile
- `GET /api/therapists` - Get verified therapists
- `PUT /api/therapists/:id` - Update therapist profile

### Matching
- `POST /api/matching/find` - Find therapist matches
- `POST /api/matching/accept` - Accept a match

## Security & Privacy

- **GDPR Compliance**: Data protection and privacy controls
- **Row Level Security**: Database-level access control
- **Encrypted Storage**: All sensitive data encrypted
- **Secure Authentication**: JWT tokens with proper validation
- **Audit Logging**: All admin actions logged

## Deployment

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set environment variables** in Vercel dashboard

### Environment Variables for Production

Ensure all environment variables are set in your production environment:

- Supabase credentials
- Resend API key
- Calendly API token
- JWT secret
- App URL

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Business Model

### Revenue Streams
- **Commission Model**: 15% take rate per session (€120 average session)
- **SaaS Licensing**: €4,000/year for schools and organizations
- **Enterprise Partnerships**: Custom pricing for large organizations

### Target Metrics
- **Year 1**: 1,500 sessions/month, 50 school clients
- **Year 2**: 4,000 sessions/month, 100 clients
- **Year 3**: 10,000 sessions/month, 300 clients

## Support

For support and questions:
- Email: support@mindmatch.ie
- Documentation: [docs.mindmatch.ie](https://docs.mindmatch.ie)
- Status: [status.mindmatch.ie](https://status.mindmatch.ie)

## License

This project is proprietary and confidential. All rights reserved.

## Disclaimer

MindMatch facilitates connections between clients and therapists. We are not a healthcare provider and do not provide medical advice, diagnosis, or treatment. All therapists are independent professionals responsible for their own practice.

---

**MindMatch** - Connecting young people with verified therapists in hours, not months.