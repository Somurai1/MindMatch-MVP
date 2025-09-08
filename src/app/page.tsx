import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { 
  HeartIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

export default function Home() {
  const features = [
    {
      name: 'Gentle Matching',
      description: 'We carefully match you with a therapist who understands your unique needs and creates a safe, comfortable space for healing.',
      icon: HeartIcon,
      emoji: '🤗'
    },
    {
      name: 'Caring Professionals',
      description: 'Our therapists are not just qualified - they\'re compassionate, understanding, and dedicated to your wellbeing.',
      icon: ShieldCheckIcon,
      emoji: '💚'
    },
    {
      name: 'Supportive Community',
      description: 'Whether you\'re a parent, teacher, or reaching out for yourself, we\'re here to support you every step of the way.',
      icon: UserGroupIcon,
      emoji: '🤝'
    },
    {
      name: 'Comfortable Sessions',
      description: 'Choose what feels right for you - video calls from home, phone conversations, or in-person meetings.',
      icon: ChatBubbleLeftRightIcon,
      emoji: '🏠'
    },
    {
      name: 'Safe & Monitored',
      description: 'Every connection is carefully reviewed by our clinical team to ensure you receive the best possible care.',
      icon: AcademicCapIcon,
      emoji: '🛡️'
    },
    {
      name: 'Your Privacy Matters',
      description: 'Your conversations and personal information are completely private and secure. We protect your trust.',
      icon: HeartIcon,
      emoji: '🔒'
    },
  ]

  const stats = [
    { name: 'Average Wait Time', value: '< 24 hours', description: 'From referral to first session' },
    { name: 'Verified Therapists', value: '500+', description: 'Qualified professionals ready to help' },
    { name: 'Successful Matches', value: '10,000+', description: 'Young people connected with support' },
    { name: 'Countries Served', value: 'Ireland & UK', description: 'Expanding across Europe' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/hero/wonderlane-_rmULTYorYQ-unsplash.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-900/60 via-pink-900/50 to-purple-900/60"></div>
        </div>
        
        {/* Gentle overlay pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-white rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/90 text-rose-800 border border-white/20 backdrop-blur-sm">
                💙 You're not alone in this journey
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight drop-shadow-lg">
              Gentle Support for
              <span className="block text-rose-200 font-normal">Young Hearts & Minds</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              We understand that seeking help takes courage. Our warm, caring therapists are here 
              to provide gentle support when you need it most - connecting you with the right 
              person in hours, not months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/referral"
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🌸 Find Your Support
              </Link>
              <Link
                href="/therapists"
                className="border-2 border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300"
              >
                💚 Join Our Caring Team
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Why We're Here */}
      <div className="relative py-16 overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/hero/kateryna-hliznitsova-2THdTdKs0yU-unsplash.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 to-orange-900/70"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-3xl font-light text-white mb-6 drop-shadow-lg">
              Why We're Here
            </h2>
            <p className="text-lg text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              We believe that when someone reaches out for help, they shouldn't have to wait. 
              Every young person deserves gentle, timely support from caring professionals.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
                <div className="text-4xl mb-4">⏰</div>
                <div className="text-3xl font-light text-amber-600 mb-2">6-12+ months</div>
                <div className="text-gray-600">Current wait times for support</div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
                <div className="text-4xl mb-4">💙</div>
                <div className="text-3xl font-light text-rose-600 mb-2">4,000+</div>
                <div className="text-gray-600">Young people waiting for help in Ireland</div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
                <div className="text-4xl mb-4">✨</div>
                <div className="text-3xl font-light text-purple-600 mb-2">&lt; 24 hours</div>
                <div className="text-gray-600">Our promise to connect you with support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-br from-white to-rose-50 relative overflow-hidden">
        {/* Background therapy image */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/images/therapy/joe-CWNFqQu1qYM-unsplash.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-800 mb-4">
              How We Care for You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every aspect of our platform is designed with your comfort, safety, and healing in mind. 
              We believe therapy should feel like a warm embrace, not a clinical procedure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="text-center group">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-pink-100 mb-6 group-hover:from-rose-200 group-hover:to-pink-200 transition-all duration-300">
                  <span className="text-2xl">{feature.emoji}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  {feature.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-16 overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/hero/youssef-naddam-iJ2IG8ckCpA-unsplash.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 to-indigo-900/70"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-white mb-4 drop-shadow-lg">
              Stories of Hope & Healing
            </h2>
            <p className="text-xl text-white/90 drop-shadow-md">
              Every number represents a young person who found the support they needed
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.name} className="text-center group">
                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 group-hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl font-light text-purple-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-medium text-gray-800 mb-1">
                    {stat.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 overflow-hidden">
        {/* Background therapy image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/therapy/jerry-wang-HiCfTMUVcZA-unsplash.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-900/80 to-pink-900/80"></div>
        </div>
        
        {/* Gentle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl font-light text-white mb-4">
            Take the First Step Towards Healing
          </h2>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            You don't have to face this alone. Our caring community is here to support you 
            on your journey to wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/referral"
              className="bg-white hover:bg-rose-50 text-rose-600 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🌸 I'm Ready for Support
            </Link>
            <Link
              href="/therapists"
              className="border-2 border-white text-white hover:bg-white hover:text-rose-600 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300"
            >
              💚 I Want to Help Others
            </Link>
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
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/referral" className="hover:text-white">Submit Referral</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Therapists</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/therapists" className="hover:text-white">Join Our Network</Link></li>
                <li><Link href="/therapist-dashboard" className="hover:text-white">Therapist Portal</Link></li>
                <li><Link href="/verification" className="hover:text-white">Verification Process</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
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
