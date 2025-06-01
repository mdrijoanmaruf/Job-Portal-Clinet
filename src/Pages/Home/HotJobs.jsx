import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import JobCard from './JobCard'
import { FiArrowRight } from 'react-icons/fi'

const HotJobs = () => {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('https://job-portal-server-sooty-theta.vercel.app/jobs')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setJobs(data)
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching jobs:', err)
        setError('Failed to load jobs. Please try again later.')
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Hot Jobs</h2>
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-[#006A71] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading job listings...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Hot Jobs</h2>
            <p className="mt-4 text-lg text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#006A71] text-white rounded-md hover:bg-[#005057]"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // No jobs state
  if (jobs.length === 0) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Hot Jobs</h2>
            <p className="mt-4 text-lg text-gray-500">No job listings available at the moment. Please check back later.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Hot Jobs</h2>
            <p className="mt-2 text-lg text-gray-600">Explore the most in-demand job opportunities</p>
          </div>
          <Link 
            to="/jobs" 
            className="flex items-center text-[#006A71] hover:text-[#005057] font-medium mt-4 md:mt-0"
          >
            View all jobs <FiArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.slice(0, 6).map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/jobs" 
            className="inline-block bg-white border border-[#006A71] text-[#006A71] hover:bg-[#006A71] hover:text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
          >
            Explore All Opportunities
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HotJobs