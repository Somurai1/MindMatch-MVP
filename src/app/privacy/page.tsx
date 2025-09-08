import Navigation from '@/components/Navigation'
import { ShieldCheckIcon, EyeIcon, LockClosedIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <ShieldCheckIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-gray-600 mt-2">Last updated: September 2025</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                <LockClosedIcon className="h-5 w-5 mr-2" />
                Your Privacy is Our Priority
              </h2>
              <p className="text-blue-800">
                MindMatch is committed to protecting your privacy and personal data. We comply with 
                GDPR and other applicable data protection laws to ensure your information is handled 
                securely and transparently.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Referrer Information:</strong> Name, email, phone number, organization</li>
                <li><strong>Client Information:</strong> Name, age, email, phone number (with consent)</li>
                <li><strong>Therapist Information:</strong> Professional credentials, qualifications, specializations</li>
                <li><strong>Session Data:</strong> Appointment details, session notes (stored securely)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">1.2 Technical Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>IP address and browser information</li>
                <li>Device information and operating system</li>
                <li>Usage analytics and platform interactions</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Service Provision</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Matching clients with therapists</li>
                    <li>• Facilitating communication</li>
                    <li>• Managing appointments</li>
                    <li>• Processing payments</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Platform Improvement</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Analyzing usage patterns</li>
                    <li>• Improving matching algorithms</li>
                    <li>• Enhancing user experience</li>
                    <li>• Developing new features</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Legal Basis for Processing</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Consent</h3>
                  <p className="text-gray-600">You have given clear consent for us to process your personal data for specific purposes.</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Legitimate Interest</h3>
                  <p className="text-gray-600">Processing is necessary for our legitimate interests in providing mental health support services.</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Vital Interests</h3>
                  <p className="text-gray-600">Processing is necessary to protect the vital interests of individuals seeking mental health support.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-yellow-800 mb-2">We Do NOT Sell Your Data</h3>
                <p className="text-yellow-700">We never sell, rent, or trade your personal information to third parties for marketing purposes.</p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Limited Sharing</h3>
              <p className="mb-4">We may share your information only in these limited circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>With Therapists:</strong> Only relevant information needed for matching and session provision</li>
                <li><strong>Service Providers:</strong> Trusted third parties who help us operate our platform (hosting, email, payments)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
                <li><strong>Emergency Situations:</strong> To protect vital interests in crisis situations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <LockClosedIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Encryption</h3>
                  <p className="text-sm text-gray-600">All data encrypted in transit and at rest</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <ShieldCheckIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Access Control</h3>
                  <p className="text-sm text-gray-600">Role-based access with audit logging</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <EyeIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Monitoring</h3>
                  <p className="text-sm text-gray-600">24/7 security monitoring and alerts</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4">Under GDPR, you have the following rights regarding your personal data:</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Access & Portability</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Right to access your data</li>
                      <li>• Right to data portability</li>
                      <li>• Right to rectification</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Control & Deletion</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Right to erasure</li>
                      <li>• Right to restrict processing</li>
                      <li>• Right to object</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800">
                    <strong>To exercise your rights:</strong> Contact us at privacy@mindmatch.ie or use the 
                    data request form in your account settings.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Active Accounts</h3>
                  <p className="text-gray-600">Data retained while your account is active and for 7 years after last activity for clinical and legal purposes.</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Session Records</h3>
                  <p className="text-gray-600">Session notes and records retained for 7 years as required by professional standards.</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Marketing Data</h3>
                  <p className="text-gray-600">Marketing preferences and communications retained until you opt out or request deletion.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Transfers</h2>
              
              <p className="mb-4">
                Your data is primarily stored within the European Economic Area (EEA). When we transfer 
                data outside the EEA, we ensure adequate protection through:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Standard Contractual Clauses (SCCs)</li>
                <li>Adequacy decisions by the European Commission</li>
                <li>Certification schemes and codes of conduct</li>
                <li>Binding corporate rules</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-800 mb-2">Special Protection for Minors</h3>
                <p className="text-orange-700 mb-2">
                  We provide special protection for children's personal data. For users under 16:
                </p>
                <ul className="text-orange-700 text-sm space-y-1">
                  <li>• Parental consent required for data processing</li>
                  <li>• Limited data collection and processing</li>
                  <li>• Enhanced security measures</li>
                  <li>• Regular consent verification</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
              
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any 
                material changes by:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Email notification to registered users</li>
                <li>Prominent notice on our website</li>
                <li>In-app notification</li>
                <li>Updated "Last Modified" date</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">Data Protection Officer</h3>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@mindmatch.ie</p>
                  <p><strong>Address:</strong> MindMatch, Dublin, Ireland</p>
                  <p><strong>Phone:</strong> +353 1 234 5678</p>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800">
                    <strong>Supervisory Authority:</strong> You have the right to lodge a complaint 
                    with the Data Protection Commission (DPC) if you believe your data protection 
                    rights have been violated.
                  </p>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8 mt-8">
              <p className="text-sm text-gray-500 text-center">
                This Privacy Policy is effective as of September 2025 and was last updated on September 8, 2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
