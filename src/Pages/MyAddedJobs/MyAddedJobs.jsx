import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContexs';
import { FaSpinner, FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa';
import { FiAlertCircle, FiCalendar } from 'react-icons/fi';
import Swal from 'sweetalert2';

const MyAddedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://job-portal-server-sooty-theta.vercel.app/jobsByEmailAddress?email=${user.email}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch your jobs');
        }
        
        const data = await response.json();
        setJobs(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchMyJobs();
    }
  }, [user?.email]);

  const handleDeleteJob = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This job posting will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://job-portal-server-sooty-theta.vercel.app/jobs/${id}`, {
            method: 'DELETE',
          });
          
          if (!response.ok) {
            throw new Error('Failed to delete job');
          }
          
          // Remove the deleted job from state
          setJobs(jobs.filter(job => job._id !== id));
          
          Swal.fire(
            'Deleted!',
            'The job posting has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting job:', error);
          Swal.fire(
            'Error!',
            'There was a problem deleting the job.',
            'error'
          );
        }
      }
    });
  };

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format salary for display
  const formatSalary = (salaryRange) => {
    if (!salaryRange) return 'Not specified';
    
    const { min, max, currency } = salaryRange;
    const currencySymbol = currency === 'usd' ? '$' : 
                          currency === 'eur' ? '€' : 
                          currency === 'gbp' ? '£' : 'BDT';
    
    return `${currencySymbol}${min.toLocaleString()} - ${currencySymbol}${max.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] max-w-7xl mx-auto flex justify-center items-center py-16">
        <FaSpinner className="animate-spin text-4xl text-[#006A71]" />
        <p className="ml-2 text-xl text-gray-700">Loading your job postings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[40vh] max-w-7xl mx-auto text-center py-16">
        <FiAlertCircle className="mx-auto text-5xl text-red-500 mb-4" />
        <p className="text-red-500 text-xl mb-4">Error: {error}</p>
        <button 
          className="bg-[#006A71] text-white px-4 py-2 rounded-md hover:bg-[#48A6A7] transition-all duration-300"
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
        <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">My Job Postings</h1>
        <p className="text-gray-600 text-center mb-8">
          Manage all the job positions you've posted
        </p>
        
        {/* Search and add job button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search your job postings..."
              className="w-full sm:w-80 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <Link to="/add-job" className="w-full sm:w-auto bg-[#006A71] text-white px-6 py-2 rounded-md hover:bg-[#48A6A7] transition-all duration-300 flex items-center justify-center">
            <span className="mr-2">+</span> Add New Job
          </Link>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <img 
            src="https://i.ibb.co/tBK9T7L/no-data.png" 
            alt="No jobs found" 
            className="w-48 mx-auto mb-6 opacity-80"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No job postings found</h3>
          {searchTerm ? (
            <p className="text-gray-600 mb-4">
              We couldn't find any jobs matching "{searchTerm}"
            </p>
          ) : (
            <p className="text-gray-600 mb-4">
              You haven't posted any jobs yet. Start by adding a new job posting.
            </p>
          )}
          <Link 
            to="/add-job" 
            className="inline-block bg-[#006A71] text-white px-6 py-2 rounded-md hover:bg-[#48A6A7] transition-all duration-300"
          >
            Post Your First Job
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map(job => (
            <div key={job._id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                      <img 
                        src={job.company_logo || "https://via.placeholder.com/64?text=Logo"} 
                        alt={job.company} 
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/64?text=Logo";
                        }}
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-1 hover:text-[#006A71]">
                        <Link to={`/job/${job._id}`}>{job.title}</Link>
                      </h2>
                      <p className="text-gray-600 mb-2">{job.company}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          job.jobType === "Remote" ? "bg-blue-100 text-blue-700" :
                          job.jobType === "Hybrid" ? "bg-purple-100 text-purple-700" :
                                              "bg-green-100 text-green-700"
                        }`}>
                          {job.jobType}
                        </span>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {job.category}
                        </span>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {job.location}
                        </span>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          job.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {job.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col mt-4 md:mt-0 space-y-2">
                    <div className="text-right">
                      <div className="text-sm text-gray-500 flex items-center justify-end">
                        <FiCalendar className="mr-1" />
                        <span>Deadline: {formatDate(job.applicationDeadline)}</span>
                      </div>
                      <div className="font-medium text-gray-800 mt-1">
                        {formatSalary(job.salaryRange)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-end gap-2 mt-6 border-t pt-4">
                  <Link 
                    to={`/job/${job._id}`}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                  >
                    <FaEye className="mr-2" />
                    View
                  </Link>
                  <Link 
                    to={`/edit-job/${job._id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md transition-colors"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDeleteJob(job._id)}
                    className="inline-flex items-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-colors"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedJobs;