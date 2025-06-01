import React from 'react'
import { Link } from 'react-router-dom'

const Accessibility = () => {
  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Accessibility Statement</h1>
          
          <p className="text-gray-600 mb-6">
            At JobPortal, we are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Commitment</h2>
              <p className="text-gray-600 mb-4">
                We strive to ensure that our website is accessible to everyone. Our goal is to meet WCAG 2.1 AA standards, 
                which will make our content more accessible to a wider range of people with disabilities, including blindness 
                and low vision, deafness and hearing loss, limited movement, speech disabilities, photosensitivity, and 
                combinations of these.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Accessibility Features</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Semantic HTML structure</li>
                <li>Keyboard navigation for all interactive elements</li>
                <li>ARIA landmarks to identify regions of the page</li>
                <li>Alternative text for images</li>
                <li>Adequate color contrast ratios</li>
                <li>Resizable text without loss of functionality</li>
                <li>Clear focus indicators</li>
                <li>Consistent navigation</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Feedback</h2>
              <p className="text-gray-600 mb-4">
                We welcome your feedback on the accessibility of JobPortal. Please let us know if you encounter accessibility barriers:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>Email: <a href="mailto:rijoanmaruf@gmail.com" className="text-[#006A71] hover:underline">rijoanmaruf@gmail.com</a></li>
                <li>Phone: <a href="tel:+1-800-555-5555" className="text-[#006A71] hover:underline">+018136064**</a></li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Compatibility</h2>
              <p className="text-gray-600">
                JobPortal is designed to be compatible with the following assistive technologies:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2 text-gray-600">
                <li>JAWS and NVDA screen readers</li>
                <li>Basic screen magnifiers</li>
                <li>Speech recognition software</li>
                <li>Keyboard-only navigation</li>
              </ul>
            </section>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link to="/" className="text-[#006A71] hover:underline inline-flex items-center">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accessibility