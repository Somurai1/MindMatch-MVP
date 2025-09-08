import Navigation from '@/components/Navigation'
import { 
  UserPlusIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: 'Submit a Referral',
      description: 'Parents, teachers, GPs, or self-referrers complete our secure referral form with client information and mental health needs.',
      icon: UserPlusIcon,
      details: [
        'Complete referral form with client details',
        'Specify mental health concerns and urgency',
        'Provide preferred language and session type',
        'Give informed consent for data processing'
      ]
    },
    {
      number: 2,
      title: 'Clinical Review',
      description: 'Our qualified clinical team reviews each referral to ensure appropriate matching and safety.',
      icon: ShieldCheckIcon,
      details: [
        'Clinical lead reviews referral details',
        'Assesses urgency and risk factors',
        'Identifies appropriate specializations needed',
        'Ensures client safety and suitability'
      ]
    },
    {
      number: 3,
      title: 'Intelligent Matching',
      description: 'Our algorithm matches clients with verified therapists based on specializations, availability, and preferences.',
      icon: MagnifyingGlassIcon,
      details: [
        'Matches by issue type and specialization',
        'Considers language and cultural preferences',
        'Checks therapist availability',
        'Returns top 3 suitable matches'
      ]
    },
    {
      number: 4,
      title: 'Therapist Selection',
      description: 'Referrers receive therapist options with profiles and can book directly with their chosen therapist.',
      icon: ChatBubbleLeftRightIcon,
      details: [
        'Receive 3 verified therapist options',
        'Review therapist profiles and specializations',
        'Choose preferred therapist',
        'Book session directly'
      ]
    },
    {
      number: 5,
      title: 'Session Booking',
      description: 'Schedule sessions through our integrated booking system with flexible options for video, phone, or in-person.',
      icon: CalendarDaysIcon,
      details: [
        'Choose session type (video, phone, chat, in-person)',
        'Select convenient time slot',
        'Receive booking confirmation',
        'Get secure meeting links'
      ]
    },
    {
      number: 6,
      title: 'Ongoing Support',
      description: 'Continue sessions with your matched therapist and access additional support resources as needed.',
      icon: HeartIcon,
      details: [
        'Regular therapy sessions',
        'Progress tracking and support',
        'Access to additional resources',
        'Ongoing clinical oversight'
      ]
    }
  ]

  const benefits = [
    {
      title: 'Rapid Access',
      description: 'Connect with therapists in hours, not months',
      icon: ClockIcon,
      stat: '< 24 hours'
    },
    {
      title: 'Verified Professionals',
      description: 'All therapists are clinically verified and licensed',
      icon: ShieldCheckIcon,
      stat: '100% Verified'
    },
    {
      title: 'Intelligent Matching',
      description: 'AI-powered matching for optimal therapist-client fit',
      icon: MagnifyingGlassIcon,
      stat: '95% Match Rate'
    },
    {
      title: 'Clinical Oversight',
      description: 'Every match reviewed by qualified professionals',
      icon: CheckCircleIcon,
      stat: 'Clinical Review'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/hero/nik-z1d-LP8sjuI-unsplash.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-indigo-900/70"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6 drop-shadow-lg">
              How MindMatch Works
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Our streamlined process connects young people with the right mental health support 
              quickly and safely, eliminating unacceptable delays in care.
            </p>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our 6-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From referral to first session, we ensure rapid, appropriate, and safe connections.
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-16 bg-blue-200 hidden lg:block"></div>
                )}
                
                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-8 lg:space-y-0 lg:space-x-12">
                  {/* Step Number and Icon */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <step.icon className="h-8 w-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose MindMatch?
            </h2>
            <p className="text-xl text-gray-600">
              We're transforming mental health access with technology and clinical expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-2">{benefit.stat}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Typical Timeline
            </h2>
            <p className="text-xl text-gray-600">
              See how quickly we can connect someone with the support they need.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  0
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Referral Submitted</h3>
                  <p className="text-gray-600">Parent, teacher, GP, or self-referrer completes our secure form</p>
                </div>
                <div className="text-sm text-gray-500">Immediate</div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Clinical Review</h3>
                  <p className="text-gray-600">Our clinical team reviews and assesses the referral</p>
                </div>
                <div className="text-sm text-gray-500">Within 2 hours</div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Therapist Matching</h3>
                  <p className="text-gray-600">Algorithm finds and ranks suitable therapists</p>
                </div>
                <div className="text-sm text-gray-500">Within 4 hours</div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Therapist Options Sent</h3>
                  <p className="text-gray-600">Referrer receives 3 verified therapist options</p>
                </div>
                <div className="text-sm text-gray-500">Within 6 hours</div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Session Booked</h3>
                  <p className="text-gray-600">First session scheduled with chosen therapist</p>
                </div>
                <div className="text-sm text-gray-500">Within 24 hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join us in eliminating unacceptable delays in mental health access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/referral"
              className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Submit a Referral
            </a>
            <a
              href="/therapists"
              className="border border-white text-white hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Join as Therapist
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-4">MindMatch</div>
              <p className="text-gray-400">
                Connecting young people with verified therapists in hours, not months.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Families</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/how-it-works" className="hover:text-white">How It Works</a></li>
                <li><a href="/referral" className="hover:text-white">Submit Referral</a></li>
                <li><a href="/faq" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Therapists</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/therapists" className="hover:text-white">Join Our Network</a></li>
                <li><a href="/therapist-dashboard" className="hover:text-white">Therapist Portal</a></li>
                <li><a href="/verification" className="hover:text-white">Verification Process</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MindMatch. All rights reserved.</p>
            <p className="mt-2 text-sm">
              MindMatch facilitates connections between clients and therapists. 
              We are not a healthcare provider and do not provide medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
