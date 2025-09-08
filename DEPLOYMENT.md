# MindMatch MVP Deployment Guide

This guide will help you deploy the MindMatch MVP to production.

## Prerequisites

- Vercel account
- Supabase project
- Resend account
- Calendly account
- Domain name (optional)

## Step 1: Set Up Supabase

1. **Create a new Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Set up the database**
   - Go to the SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL to create all tables and policies

3. **Configure Authentication**
   - Go to Authentication > Settings
   - Enable email authentication
   - Configure email templates if needed
   - Set up any additional providers (optional)

4. **Set up Storage (for document uploads)**
   - Go to Storage
   - Create a new bucket called "therapist-documents"
   - Set up RLS policies for the bucket

## Step 2: Set Up Resend

1. **Create a Resend account**
   - Go to [resend.com](https://resend.com)
   - Sign up for an account
   - Verify your domain (recommended for production)

2. **Get your API key**
   - Go to API Keys in your Resend dashboard
   - Create a new API key
   - Copy the key for later use

## Step 3: Set Up Calendly

1. **Create a Calendly account**
   - Go to [calendly.com](https://calendly.com)
   - Set up your account
   - Create event types for therapy sessions

2. **Get your API token**
   - Go to Account > Integrations > API & Webhooks
   - Generate a personal access token
   - Copy the token for later use

## Step 4: Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy the project**
   ```bash
   vercel --prod
   ```

4. **Set environment variables in Vercel**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Add the following variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   RESEND_API_KEY=your_resend_api_key
   CALENDLY_API_TOKEN=your_calendly_api_token
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_APP_NAME=MindMatch
   JWT_SECRET=your_secure_jwt_secret
   ```

5. **Redeploy after setting environment variables**
   ```bash
   vercel --prod
   ```

## Step 5: Configure Custom Domain (Optional)

1. **Add domain in Vercel**
   - Go to your project settings
   - Add your custom domain
   - Follow Vercel's DNS configuration instructions

2. **Update environment variables**
   - Update `NEXT_PUBLIC_APP_URL` to your custom domain
   - Redeploy the application

## Step 6: Set Up Monitoring and Analytics

1. **Vercel Analytics**
   - Enable Vercel Analytics in your project settings
   - Monitor performance and usage

2. **Error Tracking**
   - Consider adding Sentry or similar error tracking
   - Monitor application errors and performance

## Step 7: Security Configuration

1. **Supabase Security**
   - Review and test Row Level Security policies
   - Ensure all tables have proper RLS enabled
   - Test authentication flows

2. **Vercel Security**
   - Review the security headers in `vercel.json`
   - Ensure HTTPS is enforced
   - Set up security monitoring

## Step 8: Testing

1. **Test all user flows**
   - User registration and authentication
   - Referral submission
   - Therapist onboarding
   - Admin dashboard access
   - Email notifications

2. **Test security**
   - Verify RLS policies work correctly
   - Test unauthorized access attempts
   - Verify data encryption

## Step 9: Go Live Checklist

- [ ] All environment variables set correctly
- [ ] Database schema deployed and tested
- [ ] Authentication working
- [ ] Email notifications working
- [ ] Admin dashboard accessible
- [ ] Therapist onboarding working
- [ ] Referral system working
- [ ] Security policies tested
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Monitoring set up
- [ ] Backup strategy in place

## Post-Deployment

1. **Create admin user**
   - Register the first admin user
   - Update their role in the database to 'admin' or 'clinical_lead'

2. **Set up initial content**
   - Configure email templates
   - Set up default availability for therapists
   - Configure matching criteria

3. **Monitor and maintain**
   - Regular security updates
   - Database maintenance
   - Performance monitoring
   - User feedback collection

## Troubleshooting

### Common Issues

1. **Environment Variables Not Working**
   - Ensure all variables are set in Vercel
   - Redeploy after setting variables
   - Check variable names match exactly

2. **Database Connection Issues**
   - Verify Supabase URL and keys
   - Check RLS policies
   - Ensure database is accessible

3. **Email Not Sending**
   - Verify Resend API key
   - Check domain verification
   - Review email templates

4. **Authentication Issues**
   - Check Supabase auth configuration
   - Verify redirect URLs
   - Test with different browsers

### Support

For deployment issues:
- Check Vercel deployment logs
- Review Supabase logs
- Contact support teams for respective services

## Maintenance

### Regular Tasks

1. **Weekly**
   - Monitor application performance
   - Review error logs
   - Check user feedback

2. **Monthly**
   - Update dependencies
   - Review security policies
   - Backup database

3. **Quarterly**
   - Security audit
   - Performance optimization
   - Feature updates

---

**Note**: This is a production deployment guide. Ensure you have proper backups and rollback procedures in place before going live.
