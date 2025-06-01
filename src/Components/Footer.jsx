import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { HiOutlineMail } from 'react-icons/hi'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#006A71]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
              </svg>
              <h2 className="text-xl font-bold text-[#006A71]">JobPortal</h2>
            </div>
            <p className="text-gray-600 text-sm">
              Connecting talented professionals with their dream careers. Find your perfect job match with our advanced job matching platform.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://www.linkedin.com/in/mdrijoanmaruf/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#006A71] transition-colors">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
              <a href="https://x.com/rijianmaruf" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#006A71] transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/md.rijoanmaruf" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#006A71] transition-colors">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/rijoanmaruf" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#006A71] transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://github.com/mdrijoanmaruf" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#006A71] transition-colors">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="https://leetcode.com/u/mdrijoanmaruf/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#006A71] transition-colors">
                <SiLeetcode className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-600 hover:text-[#006A71] transition-colors text-sm">Browse Jobs</Link>
              </li>
              <li>
                <Link to="/jobs/categories" className="text-gray-600 hover:text-[#006A71] transition-colors text-sm">Job Categories</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-[#006A71] transition-colors text-sm">Candidate Dashboard</Link>
              </li>
              <li>
                <Link to="/saved-jobs" className="text-gray-600 hover:text-[#006A71] transition-colors text-sm">Saved Jobs</Link>
              </li>
              <li>
                <Link to="/job-alerts" className="text-gray-600 hover:text-[#006A71] transition-colors text-sm">Job Alerts</Link>
              </li>
              <li>
                <Link to="/career-resources" className="text-gray-600 hover:text-[#006A71] transition-colors text-sm">Career Resources</Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/post-job" className="text-gray-600 hover:text-[#006A71] transition-colors text-sm">Post a Job</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-[#006A71] transition-colors text-sm">Pricing Plans</Link>
              </li>
              <li>
                <Link to="/employer/dashboard" className="text-gray-600 hover:text-[#006A71] transition-colors text-sm">Employer Dashboard</Link>
              </li>
              <li>
                <Link to="/candidate-search" className="text-gray-600 hover:text-[#006A71] transition-colors text-sm">Search Candidates</Link>
              </li>
              <li>
                <Link to="/employer/resources" className="text-gray-600 hover:text-[#006A71] transition-colors text-sm">Recruitment Resources</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Stay Updated</h3>
            <p className="text-gray-600 text-sm">Subscribe to our newsletter for job alerts and career tips.</p>
            <form className="space-y-2">
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="pl-10 pr-3 py-2 w-full bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#006A71] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#48A6A7] transition-colors duration-300 text-sm"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © {currentYear} JobPortal. All rights reserved.
            </div>
            <div className="md:text-center text-sm text-gray-500">
              Developed By <a href="https://rijoan.com" target="_blank" rel="noopener noreferrer" className="text-[#006A71] hover:underline font-medium">Md Rijoan Maruf</a>
            </div>
            <div className="md:mt-0 flex flex-wrap gap-4">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-[#006A71]">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-[#006A71]">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-500 hover:text-[#006A71]">
                Cookie Policy
              </Link>
              <Link to="/accessibility" className="text-sm text-gray-500 hover:text-[#006A71]">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer