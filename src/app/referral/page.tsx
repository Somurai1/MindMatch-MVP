'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import { 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

const referralSchema = z.object({
  clientName: z.string().min(2, 'Client name must be at least 2 characters'),
  clientAge: z.number().min(0).max(25, 'Age must be between 0 and 25'),
  clientEmail: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  clientPhone: z.string().optional(),
  issueType: z.string().min(1, 'Please select an issue type'),
  urgency: z.enum(['low', 'medium', 'high', 'crisis']),
  preferredLanguage: z.string().min(1, 'Please select a preferred language'),
  preferredModality: z.enum(['video', 'phone', 'chat', 'in_person']),
  specialRequirements: z.string().optional(),
  consentGiven: z.boolean().refine(val => val === true, 'You must give consent to proceed'),
  referrerType: z.enum(['parent', 'teacher', 'gp', 'self']),
  referrerName: z.string().min(2, 'Referrer name is required'),
  referrerEmail: z.string().email('Please enter a valid email address'),
  referrerPhone: z.string().optional(),
  referrerOrganization: z.string().optional(),
})

type ReferralFormData = z.infer<typeof referralSchema>

const issueTypes = [
  'Anxiety',
  'Depression',
  'ADHD',
  'Autism Spectrum',
  'Eating Disorders',
  'Substance Use',
  'Trauma/PTSD',
  'Family Issues',
  'School/Work Stress',
  'Social Anxiety',
  'Self-Harm',
  'Suicidal Thoughts',
  'Behavioral Issues',
  'Grief/Loss',
  'Other'
]

const languages = [
  'English',
  'Irish',
  'French',
  'German',
  'Spanish',
  'Polish',
  'Romanian',
  'Lithuanian',
  'Other'
]

export default function ReferralPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      urgency: 'medium',
      preferredLanguage: 'English',
      preferredModality: 'video',
      consentGiven: false,
      referrerType: 'parent',
    }
  })

  const urgency = watch('urgency')
  const referrerType = watch('referrerType')

  const onSubmit = async (data: ReferralFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // First, ensure the user is authenticated or create a temporary user
      let referrerId = user?.id

      if (!user) {
        // For non-authenticated users, we'll create a temporary record
        // In a real implementation, you might want to require authentication
        const { data: tempUser, error: userError } = await supabase
          .from('users')
          .insert({
            email: data.referrerEmail,
            full_name: data.referrerName,
            role: 'referrer',
            organization: data.referrerOrganization,
          })
          .select()
          .single()

        if (userError) {
          throw new Error('Failed to create referrer record')
        }
        referrerId = tempUser.id
      }

      // Create the referral
      const { data: referral, error: referralError } = await supabase
        .from('referrals')
        .insert({
          referrer_id: referrerId,
          client_name: data.clientName,
          client_age: data.clientAge,
          client_email: data.clientEmail || null,
          client_phone: data.clientPhone || null,
          issue_type: data.issueType,
          urgency: data.urgency,
          preferred_language: data.preferredLanguage,
          preferred_modality: data.preferredModality,
          special_requirements: data.specialRequirements || null,
          consent_given: data.consentGiven,
          consent_date: new Date().toISOString(),
          status: 'pending',
        })
        .select()
        .single()

      if (referralError) {
        throw new Error('Failed to submit referral')
      }

      setSubmitSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Referral Submitted Successfully
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for submitting your referral. Our clinical team will review it and 
              begin the matching process within 24 hours.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-left text-blue-800 space-y-1">
                <li>• Our clinical team reviews your referral</li>
                <li>• We match you with verified therapists</li>
                <li>• You'll receive therapist options within 24 hours</li>
                <li>• Book your first session directly with your chosen therapist</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Return Home
              </a>
              <a
                href="/how-it-works"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Submit a Referral
            </h1>
            <p className="text-gray-600">
              Help connect someone with the mental health support they need. 
              All information is kept confidential and secure.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Referrer Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <UserIcon className="h-5 w-5 mr-2" />
                Your Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a...
                  </label>
                  <select
                    {...register('referrerType')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="parent">Parent/Guardian</option>
                    <option value="teacher">Teacher/School Staff</option>
                    <option value="gp">GP/Healthcare Professional</option>
                    <option value="self">Self-Referrer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    {...register('referrerName')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                  {errors.referrerName && (
                    <p className="mt-1 text-sm text-red-600">{errors.referrerName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register('referrerEmail')}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                  {errors.referrerEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.referrerEmail.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('referrerPhone')}
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+353 1 234 5678"
                  />
                </div>

                {(referrerType === 'teacher' || referrerType === 'gp') && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <input
                      {...register('referrerOrganization')}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="School name, GP practice, etc."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Client Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <UserIcon className="h-5 w-5 mr-2" />
                Client Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    {...register('clientName')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter client's full name"
                  />
                  {errors.clientName && (
                    <p className="mt-1 text-sm text-red-600">{errors.clientName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    {...register('clientAge', { valueAsNumber: true })}
                    type="number"
                    min="0"
                    max="25"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Age"
                  />
                  {errors.clientAge && (
                    <p className="mt-1 text-sm text-red-600">{errors.clientAge.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    {...register('clientEmail')}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="client@example.com"
                  />
                  {errors.clientEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.clientEmail.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('clientPhone')}
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+353 1 234 5678"
                  />
                </div>
              </div>
            </div>

            {/* Mental Health Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                Mental Health Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Issue/Concern *
                  </label>
                  <select
                    {...register('issueType')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select an issue type</option>
                    {issueTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.issueType && (
                    <p className="mt-1 text-sm text-red-600">{errors.issueType.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { value: 'low', label: 'Low', color: 'green', description: 'Can wait 1-2 weeks' },
                      { value: 'medium', label: 'Medium', color: 'yellow', description: 'Needs help within days' },
                      { value: 'high', label: 'High', color: 'orange', description: 'Needs help urgently' },
                      { value: 'crisis', label: 'Crisis', color: 'red', description: 'Immediate intervention needed' }
                    ].map((level) => (
                      <label key={level.value} className="relative">
                        <input
                          {...register('urgency')}
                          type="radio"
                          value={level.value}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          urgency === level.value 
                            ? `border-${level.color}-500 bg-${level.color}-50` 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className={`font-semibold text-${level.color}-600`}>
                            {level.label}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {level.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {urgency === 'crisis' && (
                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                      <div className="flex items-center">
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                        <span className="text-red-800 font-medium">
                          Crisis Level Selected
                        </span>
                      </div>
                      <p className="text-red-700 text-sm mt-1">
                        For immediate crisis support, please contact emergency services or 
                        the Samaritans at 116 123 (Ireland) or 116 123 (UK).
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Language *
                    </label>
                    <select
                      {...register('preferredLanguage')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                    {errors.preferredLanguage && (
                      <p className="mt-1 text-sm text-red-600">{errors.preferredLanguage.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Session Type *
                    </label>
                    <select
                      {...register('preferredModality')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="video">Video Call</option>
                      <option value="phone">Phone Call</option>
                      <option value="chat">Text Chat</option>
                      <option value="in_person">In-Person</option>
                    </select>
                    {errors.preferredModality && (
                      <p className="mt-1 text-sm text-red-600">{errors.preferredModality.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requirements or Additional Information
                  </label>
                  <textarea
                    {...register('specialRequirements')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any accessibility needs, cultural considerations, or other important information..."
                  />
                </div>
              </div>
            </div>

            {/* Consent */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Consent & Privacy
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    {...register('consentGiven')}
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    I confirm that I have the legal authority to refer this person for mental health support. 
                    I understand that MindMatch will process this information in accordance with GDPR 
                    and our Privacy Policy. I consent to the sharing of necessary information with 
                    verified therapists for the purpose of providing appropriate support.
                  </label>
                </div>
                {errors.consentGiven && (
                  <p className="text-sm text-red-600">{errors.consentGiven.message}</p>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Important Notice</h3>
                  <p className="text-blue-800 text-sm">
                    MindMatch facilitates connections between clients and therapists. We are not a 
                    healthcare provider and do not provide medical advice, diagnosis, or treatment. 
                    All therapists are independent professionals responsible for their own practice.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Referral'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
