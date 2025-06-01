import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiMapPin, FiBriefcase, FiDollarSign } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import JobCard from '../Home/JobCard';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    category: '',
    location: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filter dropdowns
  const getUniqueValues = (field) => {
    const values = jobs.map(job => job[field]);
    return [...new Set(values)].filter(Boolean);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://job-portal-server-sooty-theta.vercel.app/jobs');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...jobs];
    
    // Apply search term
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(lowerCaseSearch) || 
        job.company.toLowerCase().includes(lowerCaseSearch) ||
        (job.description && job.description.toLowerCase().includes(lowerCaseSearch))
      );
    }
    
    // Apply filters
    if (filters.jobType) {
      result = result.filter(job => job.jobType === filters.jobType);
    }
    
    if (filters.category) {
      result = result.filter(job => job.category === filters.category);
    }
    
    if (filters.location) {
      result = result.filter(job => job.location === filters.location);
    }
    
    setFilteredJobs(result);
  }, [searchTerm, filters, jobs]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      jobType: '',
      category: '',
      location: ''
    });
    setSearchTerm('');
    setFilteredJobs(jobs);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-[40vh] max-w-7xl mx-auto flex justify-center items-center py-16">
        <FaSpinner className="animate-spin text-4xl text-[#006A71]" />
        <p className="ml-2 text-xl text-gray-700">Loading jobs...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[40vh] max-w-7xl mx-auto text-center py-16">
        <p className="text-red-500 text-xl">Error: {error}</p>
        <button 
          className="mt-4 bg-[#006A71] text-white px-4 py-2 rounded-md hover:bg-[#48A6A7] transition-all duration-300"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[40vh] max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">All Job Opportunities</h1>
        <p className="text-gray-600">
          Browse through {jobs.length} job opportunities and find your perfect career match
        </p>
      </div>

      {/* Search and filter section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search bar */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search jobs by title or company..."
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* Toggle filters button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-md flex items-center justify-center transition-colors"
          >
            <FiFilter className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
            {/* Job Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71]"
              >
                <option value="">All Types</option>
                {getUniqueValues('jobType').map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71]"
              >
                <option value="">All Categories</option>
                {getUniqueValues('category').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71]"
              >
                <option value="">All Locations</option>
                {getUniqueValues('location').map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Reset Filters Button */}
            <div className="md:col-span-3 flex justify-end mt-2">
              <button
                onClick={resetFilters}
                className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md text-sm transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results section */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>
      </div>

      {/* Job listings */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-gray-400 mb-4">
            <FiSearch className="mx-auto text-4xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find any jobs matching your search criteria.
          </p>
          <button
            onClick={resetFilters}
            className="bg-[#006A71] text-white px-4 py-2 rounded-md hover:bg-[#48A6A7] transition-all duration-300"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;