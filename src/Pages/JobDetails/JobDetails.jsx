import React, { useState, useEffect } from 'react'
import { useLoaderData, Link, useNavigate } from 'react-router-dom'
import { FiMapPin, FiBriefcase, FiCalendar, FiMail, FiUser, FiDollarSign, FiChevronRight, FiShare2, FiBookmark, FiClock, FiArrowLeft } from 'react-icons/fi'
import { motion } from 'framer-motion'

const JobDetails = () => {
  const navigate = useNavigate()
  const job = useLoaderData()
  const [isLoading, setIsLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [saved, setSaved] = useState(false)
  
  // Set isLoading to false when job data is loaded
  useEffect(() => {
    if (job) {
      setIsLoading(false)
    }
  }, [job])

  // Helper functions for formatting
  const formatSalary = (salaryRange) => {
    if (!salaryRange) return "Competitive"
    
    const { min, max, currency } = salaryRange
    const formatNumber = (num) => new Intl.NumberFormat().format(num)
    
    const currencySymbols = {
      'usd': '$',
      'bdt': '৳',
      'eur': '€',
      'gbp': '£'
    }
    
    const symbol = currencySymbols[currency?.toLowerCase()] || ''
    return `${symbol}${formatNumber(min)} - ${symbol}${formatNumber(max)}`
  }
  
  const formatDate = (dateString) => {
    if (!dateString) return "Open"
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }
  
  const getTimeAgo = (dateString) => {
    if (!dateString) return ""
    const now = new Date()
    const postedDate = new Date(dateString)
    const diffInDays = Math.floor((now - postedDate) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return `${Math.floor(diffInDays / 30)} months ago`
  }

  // Loading state
  if (!job || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-t-4 border-[#006A71] animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 opacity-20"></div>
        </div>
        <h2 className="text-xl font-medium text-gray-700 mt-8">Loading job details...</h2>
        <p className="text-gray-500 mt-2">Preparing your dream opportunity</p>
      </div>
    )
  }

  const {
    title,
    company,
    location,
    jobType,
    category,
    applicationDeadline,
    salaryRange,
    description,
    requirements,
    responsibilities,
    hr_email,
    hr_name,
    company_logo,
    status,
    postedDate
  } = job

  // Check if job exists and is active
  if (!job || status !== "active") {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-red-50 to-pink-50 p-8 rounded-2xl shadow-sm"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-6">
            <FiBookmark className="text-red-500 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Available</h2>
          <p className="text-gray-700 mb-6">This job listing is no longer active or does not exist.</p>
          <Link to="/" className="bg-[#006A71] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#005057] transition-all transform hover:-translate-y-1 inline-flex items-center gap-2">
            <FiBriefcase />
            Browse Other Jobs
          </Link>
        </motion.div>
      </div>
    )
  }

  const handleApply = () => {
    setApplying(true)
    
    // Navigate to the job application page after a brief delay to show the loading state
    setTimeout(() => {
      setApplying(false)
      navigate(`/jobApply/${job._id}`) 
    }, 800)
  }

  const handleSave = () => {
    setSaved(!saved)
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link to="/jobs" className="inline-flex items-center gap-2 text-[#006A71] font-medium mb-6 group hover:underline">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Jobs
        </Link>
        
        {/* Job Position Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#006A71] via-[#006A71] to-[#48A6A7] rounded-2xl shadow-lg overflow-hidden mb-8 text-white relative"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3"></div>
          
          <div className="relative p-8 sm:p-10 z-10">
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-4 backdrop-blur-sm">
                  <FiClock className="mr-1.5" />
                  {getTimeAgo(postedDate)}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 drop-shadow-sm">{title}</h1>
                <div className="text-xl text-white/90 font-medium mb-4">{company}</div>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white p-2 shadow-lg">
                  <img 
                    src={company_logo || "https://via.placeholder.com/64?text=Logo"} 
                    alt={company} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "https://via.placeholder.com/64?text=Logo"
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center text-white/90 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <FiMapPin className="mr-2" />
                <span>{location}</span>
              </div>
              <div className="flex items-center text-white/90 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <FiBriefcase className="mr-2" />
                <span>{category}</span>
              </div>
              <div className="flex items-center text-white/90 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <FiDollarSign className="mr-2" />
                <span>{formatSalary(salaryRange)}</span>
              </div>
              <div className="flex items-center text-white/90 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <FiCalendar className="mr-2" />
                <span>Deadline: {formatDate(applicationDeadline)}</span>
              </div>
            </div>
          </div>
          
          <div className="relative bg-black/20 backdrop-blur-sm p-4 sm:p-6 flex flex-wrap gap-4 justify-between items-center z-10">
            <div className="flex items-center">
              <div className={`px-4 py-1.5 rounded-full text-sm font-medium mr-4 ${
                jobType === "Remote" ? "bg-blue-100 text-blue-700" :
                jobType === "Hybrid" ? "bg-purple-100 text-purple-700" :
                                     "bg-green-100 text-green-700"
              }`}>
                {jobType}
              </div>
              
              <button 
                onClick={handleSave} 
                className={`p-2 rounded-full ${saved ? 'bg-yellow-100 text-yellow-700' : 'bg-white/10 text-white/90 hover:bg-white/20'} transition-all`}
                aria-label={saved ? "Unsave job" : "Save job"}
              >
                <FiBookmark className={saved ? 'fill-yellow-500' : ''} />
              </button>
              
              <button 
                className="p-2 rounded-full bg-white/10 text-white/90 hover:bg-white/20 ml-2"
                aria-label="Share job"
              >
                <FiShare2 />
              </button>
            </div>
            
            <button 
              onClick={handleApply}
              disabled={applying}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                applying 
                  ? "bg-gray-400 text-white cursor-not-allowed" 
                  : "bg-white text-[#006A71] hover:bg-gray-100 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              }`}
            >
              Apply Now
            </button>
          </div>
        </motion.div>
        
        {/* Job Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#006A71]/10 flex items-center justify-center mr-3">
                  <FiBriefcase className="text-[#006A71]" />
                </span>
                About This Role
              </h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                <p>{description}</p>
              </div>
            </motion.div>
            
            {/* Responsibilities */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#006A71]/10 flex items-center justify-center mr-3">
                  <FiChevronRight className="text-[#006A71]" />
                </span>
                What You'll Do
              </h2>
              <ul className="space-y-4">
                {responsibilities?.map((item, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-start bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#006A71]/10 flex items-center justify-center mr-3 mt-0.5">
                      <FiChevronRight className="text-[#006A71]" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Requirements */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#006A71]/10 flex items-center justify-center mr-3">
                  <FiUser className="text-[#006A71]" />
                </span>
                What You Need
              </h2>
              <div className="flex flex-wrap gap-3 mb-4">
                {requirements?.map((skill, index) => (
                  <motion.span 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-[#006A71]/10 hover:text-[#006A71] border border-gray-200 hover:border-[#006A71]/20"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Company Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#006A71]/10 flex items-center justify-center mr-3">
                  <FiBriefcase className="text-[#006A71]" />
                </span>
                About the Company
              </h2>
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 p-2 mr-4 border border-gray-200">
                  <img 
                    src={company_logo || "https://via.placeholder.com/64?text=Logo"} 
                    alt={company} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "https://via.placeholder.com/64?text=Logo"
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{company}</h3>
                  <p className="text-gray-600">{category}</p>
                </div>
              </div>
              
              <div className="space-y-4 border-t border-gray-100 pt-6">
                <div className="flex items-center text-gray-700 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <FiUser className="w-5 h-5 mr-3 text-[#006A71]" />
                  <span>{hr_name}</span>
                </div>
                <div className="flex items-center text-gray-700 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <FiMail className="w-5 h-5 mr-3 text-[#006A71]" />
                  <span>{hr_email}</span>
                </div>
                <div className="flex items-center text-gray-700 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <FiMapPin className="w-5 h-5 mr-3 text-[#006A71]" />
                  <span>{location}</span>
                </div>
              </div>
            </motion.div>
            
            {/* Job Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#006A71]/10 flex items-center justify-center mr-3">
                  <FiClock className="text-[#006A71]" />
                </span>
                Job Overview
              </h2>
              
              <div className="space-y-5">
                <div className="flex items-start p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#006A71]/10 flex items-center justify-center mr-3">
                    <FiBriefcase className="text-[#006A71]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Job Type</h3>
                    <p className="text-gray-900 font-medium">{jobType}</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#006A71]/10 flex items-center justify-center mr-3">
                    <FiDollarSign className="text-[#006A71]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Salary Range</h3>
                    <p className="text-gray-900 font-medium">{formatSalary(salaryRange)}</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#006A71]/10 flex items-center justify-center mr-3">
                    <FiCalendar className="text-[#006A71]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Application Deadline</h3>
                    <p className="text-gray-900 font-medium">{formatDate(applicationDeadline)}</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#006A71]/10 flex items-center justify-center mr-3">
                    <FiClock className="text-[#006A71]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Posted</h3>
                    <p className="text-gray-900 font-medium">{getTimeAgo(postedDate)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={handleApply}
                  disabled={applying}
                  className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    applying 
                      ? "bg-gray-400 text-white cursor-not-allowed" 
                      : "bg-gradient-to-r from-[#006A71] to-[#48A6A7] text-white hover:shadow-lg transform hover:-translate-y-1"
                  }`}
                >
                  {applying ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Applying...
                    </>
                  ) : "Apply for this position"}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Similar Jobs (Optional) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full bg-[#006A71]/10 flex items-center justify-center mr-3">
              <FiBriefcase className="text-[#006A71]" />
            </span>
            Similar Jobs You Might Like
          </h2>
          <p className="text-gray-500 text-center py-8">
            Similar job recommendations will appear here based on your browsing history and preferences.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default JobDetails

