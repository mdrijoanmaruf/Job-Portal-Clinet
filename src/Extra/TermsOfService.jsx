import React from 'react'
import { Link } from 'react-router-dom'

const TermsOfService = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          
          <p className="text-gray-600 mb-6">
            Last updated: May 29, 2023
          </p>
          
          <p className="text-gray-600 mb-8">
            Please read these Terms of Service carefully before using JobPortal. By accessing or using our service, you agree to be bound by these Terms.
          </p>
          
          {/* Table of Contents */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Contents</h2>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('acceptance')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  1. Acceptance of Terms
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('eligibility')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  2. Eligibility
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('accounts')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  3. User Accounts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('conduct')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  4. User Conduct
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('content')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  5. Content and Intellectual Property
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('termination')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  6. Termination
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('liability')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  7. Limitation of Liability
                </button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-8">
            <section id="acceptance">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing or using JobPortal, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these Terms, please do not use our services.
              </p>
            </section>
            
            <section id="eligibility">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Eligibility</h2>
              <p className="text-gray-600">
                You must be at least 18 years old to use JobPortal. By using our services, you represent and warrant that you meet this age requirement and that you have the legal capacity to enter into a binding agreement with us.
              </p>
            </section>
            
            <section id="accounts">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. User Accounts</h2>
              <p className="text-gray-600 mb-3">
                When you create an account with us, you must provide accurate, complete, and up-to-date information. You are responsible for safeguarding the password you use to access our services and for any activities or actions under your password.
              </p>
              <p className="text-gray-600">
                We reserve the right to disable any user account, at any time in our sole discretion, if we believe you have violated these Terms.
              </p>
            </section>
            
            <section id="conduct">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. User Conduct</h2>
              <p className="text-gray-600 mb-3">
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>Violating any laws, regulations, or third-party rights</li>
                <li>Using our services for any illegal or unauthorized purpose</li>
                <li>Posting or transmitting viruses, malware, or other harmful code</li>
                <li>Interfering with or disrupting the integrity or performance of our services</li>
                <li>Attempting to gain unauthorized access to our systems or user accounts</li>
                <li>Posting false, misleading, or fraudulent content</li>
                <li>Impersonating another person or entity</li>
                <li>Harassing, threatening, or intimidating other users</li>
              </ul>
            </section>
            
            <section id="content">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Content and Intellectual Property</h2>
              <p className="text-gray-600 mb-3">
                Our services and content (excluding content provided by users) are owned by JobPortal or its licensors and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-600 mb-3">
                You retain all rights to the content you post, upload, or submit to JobPortal. By posting content, you grant us a non-exclusive, worldwide, royalty-free license to use, copy, modify, publicly display, and distribute your content in connection with our services.
              </p>
            </section>
            
            <section id="termination">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Termination</h2>
              <p className="text-gray-600">
                We may terminate or suspend access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use our services will immediately cease.
              </p>
            </section>
            
            <section id="liability">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Limitation of Liability</h2>
              <p className="text-gray-600 mb-3">
                In no event shall JobPortal, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>Your access to or use of or inability to access or use our services</li>
                <li>Any conduct or content of any third party on our services</li>
                <li>Any content obtained from our services</li>
                <li>Unauthorized access, use or alteration of your transmissions or content</li>
              </ul>
            </section>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
              <Link to="/" className="text-[#006A71] hover:underline inline-flex items-center">
                &larr; Back to Home
              </Link>
              <div className="flex space-x-6">
                <Link to="/privacy-policy" className="text-[#006A71] hover:underline">Privacy Policy</Link>
                <Link to="/cookie-policy" className="text-[#006A71] hover:underline">Cookie Policy</Link>
                <Link to="/accessibility" className="text-[#006A71] hover:underline">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService