import { supabase } from './supabase'
import { Referral, Therapist } from '@/types/database'

export interface MatchResult {
  therapist: Therapist
  score: number
  reasons: string[]
}

export interface MatchingCriteria {
  issueType: string
  urgency: 'low' | 'medium' | 'high' | 'crisis'
  preferredLanguage: string
  preferredModality: 'video' | 'phone' | 'chat' | 'in_person'
  clientAge: number
  specialRequirements?: string
}

export class MatchingEngine {
  private static instance: MatchingEngine

  public static getInstance(): MatchingEngine {
    if (!MatchingEngine.instance) {
      MatchingEngine.instance = new MatchingEngine()
    }
    return MatchingEngine.instance
  }

  /**
   * Find matching therapists for a referral
   */
  async findMatches(referral: Referral, limit: number = 3): Promise<MatchResult[]> {
    const criteria: MatchingCriteria = {
      issueType: referral.issue_type,
      urgency: referral.urgency,
      preferredLanguage: referral.preferred_language,
      preferredModality: referral.preferred_modality,
      clientAge: referral.client_age,
      specialRequirements: referral.special_requirements || undefined,
    }

    // Get all verified therapists
    const { data: therapists, error } = await supabase
      .from('therapists')
      .select(`
        *,
        users!inner(*)
      `)
      .eq('is_verified', true)

    if (error) {
      console.error('Error fetching therapists:', error)
      return []
    }

    if (!therapists || therapists.length === 0) {
      return []
    }

    // Score each therapist
    const scoredTherapists: MatchResult[] = therapists.map(therapist => {
      const score = this.calculateMatchScore(therapist, criteria)
      return {
        therapist,
        score: score.total,
        reasons: score.reasons,
      }
    })

    // Filter out therapists with score 0 and sort by score
    const validMatches = scoredTherapists
      .filter(match => match.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)

    return validMatches
  }

  /**
   * Calculate match score for a therapist
   */
  private calculateMatchScore(therapist: Therapist, criteria: MatchingCriteria): { total: number; reasons: string[] } {
    let score = 0
    const reasons: string[] = []

    // Base score for being verified
    score += 10
    reasons.push('Verified therapist')

    // Specialization match (highest weight)
    const specializationMatch = this.checkSpecializationMatch(therapist.specializations, criteria.issueType)
    if (specializationMatch.matched) {
      score += 40
      reasons.push(`Specializes in ${specializationMatch.matchedSpecialization}`)
    } else {
      // Check for related specializations
      const relatedMatch = this.checkRelatedSpecialization(therapist.specializations, criteria.issueType)
      if (relatedMatch.matched) {
        score += 20
        reasons.push(`Has experience with ${relatedMatch.matchedSpecialization}`)
      }
    }

    // Language match
    if (therapist.languages.includes(criteria.preferredLanguage)) {
      score += 25
      reasons.push(`Speaks ${criteria.preferredLanguage}`)
    } else if (therapist.languages.includes('English') && criteria.preferredLanguage !== 'English') {
      score += 10
      reasons.push('Speaks English (fallback)')
    }

    // Modality availability (simplified - in real implementation, check actual availability)
    score += 15
    reasons.push('Available for sessions')

    // Age appropriateness
    const ageScore = this.calculateAgeScore(therapist, criteria.clientAge)
    score += ageScore.score
    if (ageScore.reason) {
      reasons.push(ageScore.reason)
    }

    // Urgency handling
    const urgencyScore = this.calculateUrgencyScore(therapist, criteria.urgency)
    score += urgencyScore.score
    if (urgencyScore.reason) {
      reasons.push(urgencyScore.reason)
    }

    // Special requirements
    if (criteria.specialRequirements) {
      const specialReqScore = this.checkSpecialRequirements(therapist, criteria.specialRequirements)
      score += specialReqScore.score
      if (specialReqScore.reason) {
        reasons.push(specialReqScore.reason)
      }
    }

    return { total: score, reasons }
  }

  /**
   * Check if therapist specializes in the specific issue
   */
  private checkSpecializationMatch(specializations: string[], issueType: string): { matched: boolean; matchedSpecialization?: string } {
    const directMatches: { [key: string]: string[] } = {
      'Anxiety': ['Anxiety Disorders', 'Social Anxiety'],
      'Depression': ['Depression'],
      'ADHD': ['ADHD'],
      'Autism Spectrum': ['Autism Spectrum'],
      'Eating Disorders': ['Eating Disorders'],
      'Substance Use': ['Substance Use'],
      'Trauma/PTSD': ['Trauma/PTSD'],
      'Family Issues': ['Family Therapy'],
      'School/Work Stress': ['School Issues'],
      'Self-Harm': ['Self-Harm'],
      'Suicidal Thoughts': ['Suicidal Ideation'],
      'Behavioral Issues': ['Behavioral Issues'],
      'Grief/Loss': ['Grief & Loss'],
    }

    const matchingSpecializations = directMatches[issueType] || []
    
    for (const spec of matchingSpecializations) {
      if (specializations.includes(spec)) {
        return { matched: true, matchedSpecialization: spec }
      }
    }

    return { matched: false }
  }

  /**
   * Check for related specializations
   */
  private checkRelatedSpecialization(specializations: string[], issueType: string): { matched: boolean; matchedSpecialization?: string } {
    const relatedMatches: { [key: string]: string[] } = {
      'Anxiety': ['Child & Adolescent', 'CBT'],
      'Depression': ['Child & Adolescent', 'CBT'],
      'ADHD': ['Child & Adolescent', 'Behavioral Issues'],
      'Autism Spectrum': ['Child & Adolescent'],
      'Eating Disorders': ['Child & Adolescent'],
      'Substance Use': ['Child & Adolescent'],
      'Trauma/PTSD': ['Child & Adolescent', 'EMDR'],
      'Family Issues': ['Child & Adolescent', 'Couples Therapy'],
      'School/Work Stress': ['Child & Adolescent'],
      'Self-Harm': ['Child & Adolescent', 'Crisis Intervention'],
      'Suicidal Thoughts': ['Child & Adolescent', 'Crisis Intervention'],
      'Behavioral Issues': ['Child & Adolescent'],
      'Grief/Loss': ['Child & Adolescent'],
    }

    const relatedSpecializations = relatedMatches[issueType] || []
    
    for (const spec of relatedSpecializations) {
      if (specializations.includes(spec)) {
        return { matched: true, matchedSpecialization: spec }
      }
    }

    return { matched: false }
  }

  /**
   * Calculate age appropriateness score
   */
  private calculateAgeScore(therapist: Therapist, clientAge: number): { score: number; reason?: string } {
    // If therapist has child & adolescent specialization, they're good for all ages
    if (therapist.specializations.includes('Child & Adolescent')) {
      return { score: 15, reason: 'Specializes in child & adolescent therapy' }
    }

    // For very young clients (under 12), prefer child specialists
    if (clientAge < 12) {
      return { score: 5, reason: 'General practice (may need child specialist)' }
    }

    // For teens and young adults, general practice is fine
    return { score: 10, reason: 'Appropriate for age group' }
  }

  /**
   * Calculate urgency handling score
   */
  private calculateUrgencyScore(therapist: Therapist, urgency: string): { score: number; reason?: string } {
    switch (urgency) {
      case 'crisis':
        // Prefer therapists with crisis intervention experience
        if (therapist.specializations.some(spec => 
          ['Suicidal Ideation', 'Self-Harm', 'Crisis Intervention'].includes(spec)
        )) {
          return { score: 20, reason: 'Crisis intervention specialist' }
        }
        return { score: 5, reason: 'General practice (may need crisis specialist)' }
      
      case 'high':
        // Prefer therapists with experience in high-urgency issues
        if (therapist.specializations.some(spec => 
          ['Suicidal Ideation', 'Self-Harm', 'Trauma/PTSD'].includes(spec)
        )) {
          return { score: 15, reason: 'Experience with urgent cases' }
        }
        return { score: 10, reason: 'General practice' }
      
      case 'medium':
      case 'low':
      default:
        return { score: 10, reason: 'Appropriate for urgency level' }
    }
  }

  /**
   * Check special requirements
   */
  private checkSpecialRequirements(therapist: Therapist, requirements: string): { score: number; reason?: string } {
    const lowerRequirements = requirements.toLowerCase()
    
    // Check for accessibility needs
    if (lowerRequirements.includes('wheelchair') || lowerRequirements.includes('accessibility')) {
      // In a real implementation, you'd check therapist's accessibility capabilities
      return { score: 10, reason: 'Accessibility considerations noted' }
    }

    // Check for cultural considerations
    if (lowerRequirements.includes('cultural') || lowerRequirements.includes('religion')) {
      // In a real implementation, you'd check therapist's cultural competencies
      return { score: 10, reason: 'Cultural considerations noted' }
    }

    // Check for specific therapy approaches
    if (lowerRequirements.includes('cbt') && therapist.specializations.includes('CBT')) {
      return { score: 15, reason: 'CBT specialist' }
    }

    if (lowerRequirements.includes('emdr') && therapist.specializations.includes('EMDR')) {
      return { score: 15, reason: 'EMDR specialist' }
    }

    return { score: 5, reason: 'Special requirements noted' }
  }

  /**
   * Get therapist availability for a specific time range
   */
  async getTherapistAvailability(therapistId: string, startDate: Date, endDate: Date): Promise<boolean> {
    // In a real implementation, this would check the therapist's calendar
    // For now, we'll return true if they're verified
    const { data: therapist } = await supabase
      .from('therapists')
      .select('is_verified, availability')
      .eq('id', therapistId)
      .single()

    return therapist?.is_verified || false
  }

  /**
   * Update referral with matched therapist
   */
  async updateReferralWithMatch(referralId: string, therapistId: string): Promise<boolean> {
    const { error } = await supabase
      .from('referrals')
      .update({
        matched_therapist_id: therapistId,
        status: 'matched',
        updated_at: new Date().toISOString(),
      })
      .eq('id', referralId)

    return !error
  }
}

export const matchingEngine = MatchingEngine.getInstance()
