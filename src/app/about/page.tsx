import Navigation from '@/components/Navigation'
import { 
  HeartIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  UsersIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export default function AboutPage() {
  const team = [
    {
      name: 'Ed Harnett',
      role: 'Founder & CEO',
      description: 'Visionary leader passionate about eliminating mental health access barriers for young people.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Prof. Samantha',
      role: 'Clinical Lead',
      description: 'Qualified therapist overseeing clinical safety and therapist verification processes.',
      image: '/api/placeholder/150/150'
    }
  ]

  const values = [
    {
      title: 'Rapid Access',
      description: 'We believe mental health support should be available when needed, not months later.',
      icon: HeartIcon
    },
    {
      title: 'Clinical Safety',
      description: 'Every match is reviewed by qualified professionals to ensure appropriate care.',
      icon: ShieldCheckIcon
    },
    {
      title: 'Inclusive Support',
      description: 'We serve all young people regardless of background, language, or accessibility needs.',
      icon: UsersIcon
    },
    {
      title: 'Evidence-Based',
      description: 'Our approach is grounded in clinical best practices and mental health research.',
      icon: AcademicCapIcon
    }
  ]

  const stats = [
    { number: '4,000+', label: 'Children on waiting lists in Ireland' },
    { number: '6-12+', label: 'Months average wait time' },
    { number: '< 24', label: 'Hours to first session with MindMatch' },
    { number: '100%', label: 'Verified therapists' }
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
            backgroundImage: 'url(/images/hero/leuchtturm-entertainment-U2H4Br0_NLs-unsplash.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-indigo-900/70"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6 drop-shadow-lg">
              About MindMatch
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              We're on a mission to eliminate unacceptable delays in mental health access 
              for young people across Ireland and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                MindMatch exists to dismantle the outdated mindset that mental health care can wait in a queue. 
                When mental health concerns arise, they must be addressed with the same urgency as physical 
                health emergencies.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We eliminate unacceptable delays in access to mental health support by enabling a secure, 
                AI-powered triage and matching platform where parents, teachers, GPs, or university staff 
                can post a concern and rapidly connect with a pre-vetted, appropriately skilled therapist.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Our Vision</h3>
                <p className="text-blue-800">
                  To become the world's most trusted, inclusive, and intelligent platform for matching 
                  children, teens, students, and families with the right mental health support—fast, 
                  intelligently, and without borders.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">The Crisis We're Solving</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center">
                    <div className="text-3xl font-bold text-blue-600 mr-4">{stat.number}</div>
                    <div className="text-gray-700">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do at MindMatch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <value.icon className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600">
              Dedicated professionals working to transform mental health access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <UsersIcon className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Impact</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              We're building a platform that will transform how young people access mental health support.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">Ireland & UK</div>
                <div className="text-blue-100">Initial markets</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">Europe</div>
                <div className="text-blue-100">Expansion target</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">Global</div>
                <div className="text-blue-100">Long-term vision</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Technology</h2>
            <p className="text-xl text-gray-600">
              Built with privacy, security, and clinical safety at its core.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <ShieldCheckIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">GDPR Compliant</h3>
              <p className="text-gray-600">End-to-end encryption and privacy-first architecture</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <ChartBarIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Matching</h3>
              <p className="text-gray-600">Intelligent algorithms for optimal therapist-client pairing</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <GlobeAltIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Scalable Platform</h3>
              <p className="text-gray-600">Cloud-native architecture ready for global expansion</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you need support or want to provide it, we're building a community 
            dedicated to transforming mental health access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/referral"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Support Now
            </a>
            <a
              href="/therapists"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
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
