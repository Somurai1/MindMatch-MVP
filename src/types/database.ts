export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'referrer' | 'therapist' | 'admin' | 'clinical_lead'
          created_at: string
          updated_at: string
          phone: string | null
          organization: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role: 'referrer' | 'therapist' | 'admin' | 'clinical_lead'
          created_at?: string
          updated_at?: string
          phone?: string | null
          organization?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'referrer' | 'therapist' | 'admin' | 'clinical_lead'
          created_at?: string
          updated_at?: string
          phone?: string | null
          organization?: string | null
        }
      }
      therapists: {
        Row: {
          id: string
          user_id: string
          license_number: string
          qualifications: string[]
          specializations: string[]
          languages: string[]
          availability: any // JSON object for availability
          hourly_rate: number
          is_verified: boolean
          verification_date: string | null
          verified_by: string | null
          bio: string | null
          profile_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          license_number: string
          qualifications: string[]
          specializations: string[]
          languages: string[]
          availability: any
          hourly_rate: number
          is_verified?: boolean
          verification_date?: string | null
          verified_by?: string | null
          bio?: string | null
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          license_number?: string
          qualifications?: string[]
          specializations?: string[]
          languages?: string[]
          availability?: any
          hourly_rate?: number
          is_verified?: boolean
          verification_date?: string | null
          verified_by?: string | null
          bio?: string | null
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      referrals: {
        Row: {
          id: string
          referrer_id: string
          client_name: string
          client_age: number
          client_email: string | null
          client_phone: string | null
          issue_type: string
          urgency: 'low' | 'medium' | 'high' | 'crisis'
          preferred_language: string
          preferred_modality: 'video' | 'phone' | 'chat' | 'in_person'
          special_requirements: string | null
          consent_given: boolean
          consent_date: string
          status: 'pending' | 'matched' | 'booked' | 'completed' | 'cancelled'
          matched_therapist_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          referrer_id: string
          client_name: string
          client_age: number
          client_email?: string | null
          client_phone?: string | null
          issue_type: string
          urgency: 'low' | 'medium' | 'high' | 'crisis'
          preferred_language: string
          preferred_modality: 'video' | 'phone' | 'chat' | 'in_person'
          special_requirements?: string | null
          consent_given: boolean
          consent_date: string
          status?: 'pending' | 'matched' | 'booked' | 'completed' | 'cancelled'
          matched_therapist_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          referrer_id?: string
          client_name?: string
          client_age?: number
          client_email?: string | null
          client_phone?: string | null
          issue_type?: string
          urgency?: 'low' | 'medium' | 'high' | 'crisis'
          preferred_language?: string
          preferred_modality?: 'video' | 'phone' | 'chat' | 'in_person'
          special_requirements?: string | null
          consent_given?: boolean
          consent_date?: string
          status?: 'pending' | 'matched' | 'booked' | 'completed' | 'cancelled'
          matched_therapist_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          referral_id: string
          therapist_id: string
          scheduled_date: string
          duration_minutes: number
          modality: 'video' | 'phone' | 'chat' | 'in_person'
          meeting_link: string | null
          status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          referral_id: string
          therapist_id: string
          scheduled_date: string
          duration_minutes: number
          modality: 'video' | 'phone' | 'chat' | 'in_person'
          meeting_link?: string | null
          status?: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          referral_id?: string
          therapist_id?: string
          scheduled_date?: string
          duration_minutes?: number
          modality?: 'video' | 'phone' | 'chat' | 'in_person'
          meeting_link?: string | null
          status?: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      therapist_documents: {
        Row: {
          id: string
          therapist_id: string
          document_type: 'license' | 'insurance' | 'qualification' | 'id'
          file_url: string
          file_name: string
          uploaded_at: string
          verified: boolean
          verified_by: string | null
          verified_at: string | null
        }
        Insert: {
          id?: string
          therapist_id: string
          document_type: 'license' | 'insurance' | 'qualification' | 'id'
          file_url: string
          file_name: string
          uploaded_at?: string
          verified?: boolean
          verified_by?: string | null
          verified_at?: string | null
        }
        Update: {
          id?: string
          therapist_id?: string
          document_type?: 'license' | 'insurance' | 'qualification' | 'id'
          file_url?: string
          file_name?: string
          uploaded_at?: string
          verified?: boolean
          verified_by?: string | null
          verified_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type Therapist = Database['public']['Tables']['therapists']['Row']
export type Referral = Database['public']['Tables']['referrals']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type TherapistDocument = Database['public']['Tables']['therapist_documents']['Row']
