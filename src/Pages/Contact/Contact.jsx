import React from 'react'
import { FaLocationDot, FaPhone, FaEnvelope, FaGithub, FaXTwitter } from 'react-icons/fa6'
import { BsLinkedin, BsFacebook, BsInstagram } from 'react-icons/bs'
import { SiLeetcode } from 'react-icons/si'

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2EFE7]/50 to-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Have questions or need assistance? We're here to help you find your dream job.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Main Contact Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-[#006A71] to-[#48A6A7] p-10 text-white relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mt-20 -mr-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -mb-16 -ml-16"></div>
              
              <h2 className="text-2xl font-bold mb-6 relative z-10">Contact Information</h2>
              <p className="mb-10 max-w-xs opacity-90 relative z-10">
                We'd love to hear from you. Reach out to us through any of these channels.
              </p>

              <div className="space-y-8 relative z-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/20 p-3 rounded-full mr-4">
                    <FaPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm opacity-75">Phone</p>
                    <p className="font-medium">+880 18136064**</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/20 p-3 rounded-full mr-4">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm opacity-75">Email</p>
                    <p className="font-medium">rijoanmaruf@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/20 p-3 rounded-full mr-4">
                    <FaLocationDot className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm opacity-75">Office</p>
                    <p className="font-medium">Block C, Road 7,</p>
                    <p className="font-medium">House 194/A, Dhaka</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 relative z-10">
                <p className="font-medium mb-4">Connect with us</p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://www.linkedin.com/in/mdrijoanmaruf/" target="_blank" rel="noopener noreferrer" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition duration-300 hover:scale-110">
                    <BsLinkedin className="w-5 h-5" />
                  </a>
                  <a href="https://x.com/rijianmaruf" target="_blank" rel="noopener noreferrer" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition duration-300 hover:scale-110">
                    <FaXTwitter className="w-5 h-5" />
                  </a>
                  <a href="https://www.facebook.com/md.rijoanmaruf" target="_blank" rel="noopener noreferrer" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition duration-300 hover:scale-110">
                    <BsFacebook className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/rijoanmaruf" target="_blank" rel="noopener noreferrer" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition duration-300 hover:scale-110">
                    <BsInstagram className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/mdrijoanmaruf" target="_blank" rel="noopener noreferrer" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition duration-300 hover:scale-110">
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a href="https://leetcode.com/u/mdrijoanmaruf/" target="_blank" rel="noopener noreferrer" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition duration-300 hover:scale-110">
                    <SiLeetcode className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="Rijoan"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="Maruf"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="rijoanmaruf@gmail.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="Job application inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 outline-none resize-none"
                    placeholder="I'm interested in learning more about job opportunities at JobPortal..."
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-[#006A71] hover:bg-[#48A6A7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006A71] transition-all duration-200"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5480489187313!2d90.3528391!3d23.7652105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bfd68a7752ad%3A0x3a1ab81789583e0e!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1653408345688!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-6">Can't find the answer you're looking for?</p>
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-[#006A71] text-base font-medium rounded-lg text-[#006A71] bg-transparent hover:bg-[#006A71] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006A71] transition-all duration-200"
          >
            Visit our FAQ page
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contact