import React from 'react'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <p className="text-gray-600 mb-2">Last updated: May 29, 2023</p>
          
          <p className="text-gray-600 mb-8">
            JobPortal is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          
          {/* Table of Contents */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Contents</h2>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('collection')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  1. Information We Collect
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('use')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  2. How We Use Your Information
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('disclosure')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  3. Disclosure of Your Information
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('security')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  4. Security of Your Information
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('rights')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  5. Your Privacy Rights
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  6. Contact Us
                </button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-8">
            <section id="collection">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
              
              <h3 className="font-medium text-gray-800 mt-4 mb-2">Personal Information</h3>
              <p className="text-gray-600 mb-3">
                We may collect personal information that you voluntarily provide when using our services, such as:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>Name, email address, and contact information</li>
                <li>Resume, work history, and education information</li>
                <li>Job preferences and professional skills</li>
                <li>Account login credentials</li>
                <li>Profile information and photographs</li>
              </ul>
              
              <h3 className="font-medium text-gray-800 mt-4 mb-2">Automatically Collected Information</h3>
              <p className="text-gray-600 mb-3">
                When you visit our website, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>IP address and browser type</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on those pages</li>
                <li>Referring websites</li>
                <li>Device information</li>
              </ul>
            </section>
            
            <section id="use">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-3">
                We may use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>Providing, maintaining, and improving our services</li>
                <li>Matching you with potential job opportunities</li>
                <li>Processing your job applications</li>
                <li>Communicating with you about our services</li>
                <li>Responding to your inquiries and support requests</li>
                <li>Sending you marketing and promotional communications</li>
                <li>Analyzing usage patterns and trends</li>
                <li>Protecting against fraudulent or unauthorized activity</li>
              </ul>
            </section>
            
            <section id="disclosure">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Disclosure of Your Information</h2>
              <p className="text-gray-600 mb-3">
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li><strong>With Employers:</strong> When you apply for a job, your information is shared with the employer.</li>
                <li><strong>Service Providers:</strong> We may share your information with third-party vendors who provide services on our behalf.</li>
                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid legal requests.</li>
              </ul>
            </section>
            
            <section id="security">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Security of Your Information</h2>
              <p className="text-gray-600 mb-3">
                We use administrative, technical, and physical security measures to help protect your personal information from unauthorized access, use, or disclosure. However, no website or internet transmission is completely secure. Therefore, we cannot guarantee that your information will not be accessed, disclosed, altered, or destroyed by breach of any of our safeguards.
              </p>
              <p className="text-gray-600">
                You are responsible for maintaining the secrecy of your unique password and account information and for controlling access to your email communications.
              </p>
            </section>
            
            <section id="rights">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Your Privacy Rights</h2>
              <p className="text-gray-600 mb-3">
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>The right to access the personal information we have about you</li>
                <li>The right to request correction of inaccurate information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to opt-out of marketing communications</li>
                <li>The right to data portability</li>
                <li>The right to object to certain processing of your information</li>
              </ul>
              <p className="text-gray-600 mt-3">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section.
              </p>
            </section>
            
            <section id="contact">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Contact Us</h2>
              <p className="text-gray-600 mb-3">
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">JobPortal Inc.</p>
                <p className="text-gray-700">House-194/A, Road-7, Block-C</p>
                <p className="text-gray-700">Bashundhara R/A, Dhaka</p>
                <p className="text-gray-700 mt-2">Email: <a href="mailto:rijoanmaruf@gmail.com" className="text-[#006A71] hover:underline">rijoanmaruf@gmail.com</a></p>
                <p className="text-gray-700">Phone: <a href="tel:+1-800-555-5555" className="text-[#006A71] hover:underline">+018136064**</a></p>
              </div>
            </section>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
              <Link to="/" className="text-[#006A71] hover:underline inline-flex items-center">
                &larr; Back to Home
              </Link>
              <div className="flex space-x-6">
                <Link to="/terms-of-service" className="text-[#006A71] hover:underline">Terms of Service</Link>
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

export default PrivacyPolicy