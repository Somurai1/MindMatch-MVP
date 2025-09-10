'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import { 
  UserIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { Therapist, Referral, Booking } from '@/types/database'

interface TherapistStats {
  totalReferrals: number
  pendingReferrals: number
  acceptedReferrals: number
  totalSessions: number
  completedSessions: number
  upcomingSessions: number
}

export default function TherapistDashboard() {
  const { user, profile } = useAuth()
  const [therapist, setTherapist] = useState<Therapist | null>(null)
  const [stats, setStats] = useState<TherapistStats | null>(null)
  const [recentReferrals, setRecentReferrals] = useState<Referral[]>([])
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const loadTherapistData = async () => {
    try {
      // Load therapist profile
      const { data: therapistData } = await supabase
        .from('therapists')
        .select('*')
        .eq('user_id', user.id)
        .single()

      setTherapist(therapistData)

      if (!therapistData) {
        setLoading(false)
        return
      }

      // Load referrals matched to this therapist
      const { data: referrals } = await supabase
        .from('referrals')
        .select('*')
        .eq('matched_therapist_id', therapistData.id)

      // Load bookings for this therapist
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('therapist_id', therapistData.id)

      const referralsData = referrals || []
      const bookingsData = bookings || []

      // Calculate stats
      const therapistStats: TherapistStats = {
        totalReferrals: referralsData.length,
        pendingReferrals: referralsData.filter(r => r.status === 'matched').length,
        acceptedReferrals: referralsData.filter(r => r.status === 'booked').length,
        totalSessions: bookingsData.length,
        completedSessions: bookingsData.filter(b => b.status === 'completed').length,
        upcomingSessions: bookingsData.filter(b => 
          b.status === 'scheduled' && new Date(b.scheduled_date) > new Date()
        ).length,
      }

      setStats(therapistStats)
      setRecentReferrals(referralsData.slice(0, 5))
      setUpcomingBookings(
        bookingsData
          .filter(b => b.status === 'scheduled' && new Date(b.scheduled_date) > new Date())
          .sort((a, b) => new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime())
          .slice(0, 5)
      )

    } catch (error) {
      console.error('Error loading therapist data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Check if user has therapist access
  if (!user || profile?.role !== 'therapist') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access the therapist dashboard.</p>
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    loadTherapistData()
  }, [user])

  const handleAcceptReferral = async (referralId: string) => {
    try {
      const { error } = await supabase
        .from('referrals')
        .update({ status: 'booked' })
        .eq('id', referralId)

      if (error) {
        console.error('Error accepting referral:', error)
        return
      }

      // Reload data
      await loadTherapistData()
    } catch (error) {
      console.error('Error accepting referral:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!therapist) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <DocumentTextIcon className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Profile</h1>
            <p className="text-gray-600 mb-6">You need to complete your therapist profile before accessing the dashboard.</p>
            <a
              href="/therapists"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Complete Profile
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (!therapist.is_verified) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <ClockIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Verification Pending</h1>
            <p className="text-gray-600 mb-6">Your therapist profile is currently under review by our clinical team. You'll receive an email once verification is complete.</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Status:</strong> Pending verification<br>
                <strong>Submitted:</strong> {new Date(therapist.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Therapist Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {profile?.full_name}</p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalReferrals}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Referrals</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.pendingReferrals}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Accepted Referrals</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.acceptedReferrals}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalSessions}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed Sessions</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.completedSessions}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming Sessions</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.upcomingSessions}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Referrals */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Referrals</h3>
            </div>
            <div className="p-6">
              {recentReferrals.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No referrals yet</p>
              ) : (
                <div className="space-y-4">
                  {recentReferrals.map((referral) => (
                    <div key={referral.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{referral.client_name}</h4>
                          <p className="text-sm text-gray-600">Age: {referral.client_age}</p>
                          <p className="text-sm text-gray-600">{referral.issue_type}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-2 ${
                            referral.urgency === 'crisis' ? 'bg-red-100 text-red-800' :
                            referral.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                            referral.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {referral.urgency}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(referral.created_at).toLocaleDateString()}
                          </p>
                          {referral.status === 'matched' && (
                            <button
                              onClick={() => handleAcceptReferral(referral.id)}
                              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Accept
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Sessions</h3>
            </div>
            <div className="p-6">
              {upcomingBookings.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No upcoming sessions</p>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {new Date(booking.scheduled_date).toLocaleDateString()}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {new Date(booking.scheduled_date).toLocaleTimeString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            Duration: {booking.duration_minutes} minutes
                          </p>
                          <p className="text-sm text-gray-600 capitalize">
                            {booking.modality.replace('_', ' ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {booking.status}
                          </span>
                          {booking.meeting_link && (
                            <a
                              href={booking.meeting_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block mt-2 text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Join Session
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Your Profile</h3>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {therapist.specializations.map((spec) => (
                    <span key={spec} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {therapist.languages.map((lang) => (
                    <span key={lang} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Hourly Rate</h4>
                <p className="text-gray-600">€{therapist.hourly_rate}/hour</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">License Number</h4>
                <p className="text-gray-600">{therapist.license_number}</p>
              </div>
            </div>
            {therapist.bio && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                <p className="text-gray-600">{therapist.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
