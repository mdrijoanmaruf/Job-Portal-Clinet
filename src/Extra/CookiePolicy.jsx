import React from 'react'
import { Link } from 'react-router-dom'

const CookiePolicy = () => {
  // Function to scroll to a specific section
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
          
          <p className="text-gray-600 mb-8">
            This Cookie Policy explains how JobPortal uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>
          
          {/* Table of Contents */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Contents</h2>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('what-are-cookies')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  1. What are cookies?
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('types-of-cookies')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  2. Types of cookies we use
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('third-party')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  3. Third-party cookies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('control')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  4. How you can control cookies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('updates')}
                  className="text-[#006A71] hover:underline text-left"
                >
                  5. Updates to this policy
                </button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-8">
            <section id="what-are-cookies">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. What are cookies?</h2>
              <p className="text-gray-600 mb-3">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              <p className="text-gray-600">
                Cookies set by the website owner (in this case, JobPortal) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content and analytics).
              </p>
            </section>
            
            <section id="types-of-cookies">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Types of cookies we use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800">Essential cookies</h3>
                  <p className="text-gray-600">These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800">Performance cookies</h3>
                  <p className="text-gray-600">These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800">Functional cookies</h3>
                  <p className="text-gray-600">These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800">Targeting cookies</h3>
                  <p className="text-gray-600">These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.</p>
                </div>
              </div>
            </section>
            
            <section id="third-party">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Third-party cookies</h2>
              <p className="text-gray-600">
                We may use various third-party cookies, including those from:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2 text-gray-600">
                <li>Google Analytics (for traffic analysis)</li>
                <li>Facebook Pixel (for marketing)</li>
                <li>LinkedIn Insight (for marketing)</li>
                <li>Hotjar (for user behavior analysis)</li>
              </ul>
            </section>
            
            <section id="control">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. How you can control cookies</h2>
              <p className="text-gray-600 mb-3">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager that we display when you first visit our website.
              </p>
              <p className="text-gray-600 mb-3">
                You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas may be restricted.
              </p>
              <p className="text-gray-600">
                Most browsers allow you to refuse to accept cookies and to delete cookies. The methods for doing so vary from browser to browser, and from version to version.
              </p>
            </section>
            
            <section id="updates">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Updates to this policy</h2>
              <p className="text-gray-600">
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              <p className="text-gray-600 mt-3">
                The date at the top of this Cookie Policy indicates when it was last updated.
              </p>
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

export default CookiePolicy