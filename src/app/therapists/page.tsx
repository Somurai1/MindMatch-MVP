'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import { 
  CheckCircleIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  ClockIcon,
  CurrencyEuroIcon
} from '@heroicons/react/24/outline'

const therapistSchema = z.object({
  licenseNumber: z.string().min(1, 'License number is required'),
  qualifications: z.array(z.string()).min(1, 'At least one qualification is required'),
  specializations: z.array(z.string()).min(1, 'At least one specialization is required'),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  hourlyRate: z.number().min(30, 'Minimum rate is €30 per hour'),
  bio: z.string().min(100, 'Bio must be at least 100 characters'),
  availability: z.object({
    monday: z.object({ available: z.boolean(), start: z.string(), end: z.string() }),
    tuesday: z.object({ available: z.boolean(), start: z.string(), end: z.string() }),
    wednesday: z.object({ available: z.boolean(), start: z.string(), end: z.string() }),
    thursday: z.object({ available: z.boolean(), start: z.string(), end: z.string() }),
    friday: z.object({ available: z.boolean(), start: z.string(), end: z.string() }),
    saturday: z.object({ available: z.boolean(), start: z.string(), end: z.string() }),
    sunday: z.object({ available: z.boolean(), start: z.string(), end: z.string() }),
  }),
})

type TherapistFormData = z.infer<typeof therapistSchema>

const qualifications = [
  'Bachelor of Psychology',
  'Master of Psychology',
  'PhD in Psychology',
  'Bachelor of Social Work',
  'Master of Social Work',
  'Bachelor of Counselling',
  'Master of Counselling',
  'Psychotherapy Diploma',
  'Cognitive Behavioral Therapy (CBT)',
  'Dialectical Behavior Therapy (DBT)',
  'EMDR Certification',
  'Family Therapy Certification',
  'Play Therapy Certification',
  'Art Therapy Certification',
  'Other'
]

const specializations = [
  'Anxiety Disorders',
  'Depression',
  'ADHD',
  'Autism Spectrum',
  'Eating Disorders',
  'Substance Use',
  'Trauma/PTSD',
  'Family Therapy',
  'Child & Adolescent',
  'Couples Therapy',
  'Grief & Loss',
  'Self-Harm',
  'Suicidal Ideation',
  'Behavioral Issues',
  'School Issues',
  'Social Anxiety',
  'OCD',
  'Bipolar Disorder',
  'Personality Disorders',
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

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export default function TherapistsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, profile } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TherapistFormData>({
    resolver: zodResolver(therapistSchema),
    defaultValues: {
      qualifications: [],
      specializations: [],
      languages: ['English'],
      hourlyRate: 60,
      availability: {
        monday: { available: false, start: '09:00', end: '17:00' },
        tuesday: { available: false, start: '09:00', end: '17:00' },
        wednesday: { available: false, start: '09:00', end: '17:00' },
        thursday: { available: false, start: '09:00', end: '17:00' },
        friday: { available: false, start: '09:00', end: '17:00' },
        saturday: { available: false, start: '09:00', end: '17:00' },
        sunday: { available: false, start: '09:00', end: '17:00' },
      }
    }
  })

  const watchedQualifications = watch('qualifications')
  const watchedSpecializations = watch('specializations')
  const watchedLanguages = watch('languages')

  const handleArrayChange = (field: 'qualifications' | 'specializations' | 'languages', value: string, checked: boolean) => {
    const current = watch(field)
    if (checked) {
      setValue(field, [...current, value])
    } else {
      setValue(field, current.filter(item => item !== value))
    }
  }

  const onSubmit = async (data: TherapistFormData) => {
    if (!user) {
      setError('You must be logged in to register as a therapist')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Create therapist profile
      const { data: therapist, error: therapistError } = await supabase
        .from('therapists')
        .insert({
          user_id: user.id,
          license_number: data.licenseNumber,
          qualifications: data.qualifications,
          specializations: data.specializations,
          languages: data.languages,
          availability: data.availability,
          hourly_rate: data.hourlyRate,
          bio: data.bio,
          is_verified: false, // Will be verified by clinical lead
        })
        .select()
        .single()

      if (therapistError) {
        throw new Error('Failed to create therapist profile')
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
              Application Submitted Successfully
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for applying to join the MindMatch network. Our clinical team will 
              review your application and credentials within 2-3 business days.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-left text-blue-800 space-y-1">
                <li>• Our clinical team reviews your credentials</li>
                <li>• We verify your qualifications and license</li>
                <li>• You'll receive an email with the verification result</li>
                <li>• Once verified, you can start receiving referrals</li>
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
                href="/therapist-dashboard"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View Dashboard
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
              Join Our Therapist Network
            </h1>
            <p className="text-gray-600">
              Help us provide rapid mental health support to young people. 
              Join our network of verified, qualified therapists.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Professional Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Professional Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License/Registration Number *
                  </label>
                  <input
                    {...register('licenseNumber')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your professional license number"
                  />
                  {errors.licenseNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.licenseNumber.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualifications *
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {qualifications.map((qual) => (
                      <label key={qual} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={watchedQualifications.includes(qual)}
                          onChange={(e) => handleArrayChange('qualifications', qual, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{qual}</span>
                      </label>
                    ))}
                  </div>
                  {errors.qualifications && (
                    <p className="mt-1 text-sm text-red-600">{errors.qualifications.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specializations *
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {specializations.map((spec) => (
                      <label key={spec} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={watchedSpecializations.includes(spec)}
                          onChange={(e) => handleArrayChange('specializations', spec, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{spec}</span>
                      </label>
                    ))}
                  </div>
                  {errors.specializations && (
                    <p className="mt-1 text-sm text-red-600">{errors.specializations.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages Spoken *
                  </label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {languages.map((lang) => (
                      <label key={lang} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={watchedLanguages.includes(lang)}
                          onChange={(e) => handleArrayChange('languages', lang, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{lang}</span>
                      </label>
                    ))}
                  </div>
                  {errors.languages && (
                    <p className="mt-1 text-sm text-red-600">{errors.languages.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hourly Rate (€) *
                  </label>
                  <input
                    {...register('hourlyRate', { valueAsNumber: true })}
                    type="number"
                    min="30"
                    max="200"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="60"
                  />
                  {errors.hourlyRate && (
                    <p className="mt-1 text-sm text-red-600">{errors.hourlyRate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Bio *
                  </label>
                  <textarea
                    {...register('bio')}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about your experience, approach to therapy, and what makes you passionate about helping young people..."
                  />
                  {errors.bio && (
                    <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ClockIcon className="h-5 w-5 mr-2" />
                Availability
              </h2>
              <div className="space-y-4">
                {days.map((day) => (
                  <div key={day} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-24">
                      <label className="flex items-center">
                        <input
                          {...register(`availability.${day}.available` as any)}
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 capitalize">
                          {day}
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        {...register(`availability.${day}.start` as any)}
                        type="time"
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        {...register(`availability.${day}.end` as any)}
                        type="time"
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                Why Join MindMatch?
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-blue-800">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    <span className="text-sm">Pre-verified client referrals</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    <span className="text-sm">Flexible scheduling</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    <span className="text-sm">Secure platform</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    <span className="text-sm">Clinical oversight</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    <span className="text-sm">Competitive rates</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    <span className="text-sm">Make a real difference</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
