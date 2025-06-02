import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaSpinner, FaEnvelope, FaFileAlt, FaExternalLinkAlt, FaGithub, FaLinkedin, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import { FiArrowLeft, FiAlertCircle, FiCalendar } from 'react-icons/fi';
import Swal from 'sweetalert2';

const ViewApplications = () => {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch job details
        const jobResponse = await fetch(`https://job-portal-server-sooty-theta.vercel.app/jobs/${id}`);
        if (!jobResponse.ok) throw new Error('Failed to fetch job details');
        const jobData = await jobResponse.json();
        setJob(jobData);
        
        // Fetch applications for this job - using the correct endpoint
        const applicationsResponse = await fetch(`https://job-portal-server-sooty-theta.vercel.app/applications/job/${id}`);
        if (!applicationsResponse.ok) throw new Error('Failed to fetch applications');
        const applicationsData = await applicationsResponse.json();
        setApplications(applicationsData);
        
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  // Update application status
  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      Swal.fire({
        title: 'Updating Status',
        text: 'Please wait...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await fetch(`https://job-portal-server-sooty-theta.vercel.app/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update application status');

      // Update local state
      setApplications(applications.map(app => 
        app._id === applicationId ? {...app, status: newStatus} : app
      ));

      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Application marked as ${newStatus}`,
        confirmButtonColor: '#006A71',
      });
    } catch (error) {
      console.error('Error updating status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update application status',
        confirmButtonColor: '#006A71',
      });
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter applications based on search and status
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      (app.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (app.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-[40vh] max-w-7xl mx-auto flex justify-center items-center py-16">
        <FaSpinner className="animate-spin text-4xl text-[#006A71]" />
        <p className="ml-2 text-xl text-gray-700">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[40vh] max-w-7xl mx-auto text-center py-16">
        <FiAlertCircle className="mx-auto text-5xl text-red-500 mb-4" />
        <p className="text-red-500 text-xl mb-4">Error: {error}</p>
        <Link 
          to="/my-posted-jobs" 
          className="bg-[#006A71] text-white px-4 py-2 rounded-md hover:bg-[#48A6A7] transition-all duration-300"
        >
          Back to My Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[40vh] max-w-7xl mx-auto px-4 py-12">
      <Link 
        to="/my-posted-jobs" 
        className="inline-flex items-center gap-2 text-[#006A71] font-medium mb-6 group hover:underline"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to My Jobs
      </Link>
      
      {job && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Applications for: {job.title}</h1>
              <p className="text-gray-600">{job.company} • {job.location}</p>
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
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  job.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {job.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 flex items-center justify-end">
                <FiCalendar className="mr-1" />
                <span>Deadline: {formatDate(job.applicationDeadline)}</span>
              </div>
              <Link 
                to={`/job/${job._id}`}
                className="inline-flex items-center mt-2 text-[#006A71] hover:underline"
              >
                View Job Posting
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full md:w-80 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="flex items-center w-full md:w-auto">
          <label htmlFor="statusFilter" className="mr-2 text-gray-700">Status:</label>
          <select
            id="statusFilter"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71]"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-6">
        {filteredApplications.length} Application{filteredApplications.length !== 1 ? 's' : ''} 
        {filterStatus !== 'all' ? ` (${filterStatus})` : ''}
      </h2>
      
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <img 
            src="https://i.ibb.co/tBK9T7L/no-data.png" 
            alt="No applications found" 
            className="w-48 mx-auto mb-6 opacity-80"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No applications found</h3>
          {searchTerm || filterStatus !== 'all' ? (
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria.
            </p>
          ) : (
            <p className="text-gray-600 mb-4">
              No one has applied to this job posting yet.
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredApplications.map(application => (
            <div key={application._id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{application.name}</h3>
                    <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      application.status === 'reviewing' ? 'bg-blue-100 text-blue-700' :
                      application.status === 'shortlisted' ? 'bg-green-100 text-green-700' :
                      application.status === 'hired' ? 'bg-purple-100 text-purple-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {application.status || 'Pending'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <FaEnvelope className="mr-2 text-[#006A71]" />
                      <a href={`mailto:${application.email}`} className="hover:text-[#006A71]">
                        {application.email}
                      </a>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      {application.github && (
                        <a 
                          href={application.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-[#006A71]"
                        >
                          <FaGithub className="mr-1" />
                          GitHub
                        </a>
                      )}
                      
                      {application.linkedin && (
                        <a 
                          href={application.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-[#006A71]"
                        >
                          <FaLinkedin className="mr-1" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      Applied: {formatDate(application.appliedDate || new Date())}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                  <div className="flex flex-wrap gap-2">
                    {application.resume && (
                      <a 
                        href={application.resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-[#006A71] text-white rounded-md hover:bg-[#48A6A7] transition-colors"
                      >
                        <FaFileAlt className="mr-2" />
                        View Resume
                      </a>
                    )}
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71]"
                      value={application.status || 'pending'}
                      onChange={(e) => updateApplicationStatus(application._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                      <option value="hired">Hired</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {application.coverLetter && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Cover Letter</h4>
                  <p className="text-gray-600 whitespace-pre-line">{application.coverLetter}</p>
                </div>
              )}
              
              {/* Quick actions */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button 
                  onClick={() => updateApplicationStatus(application._id, 'rejected')}
                  className="px-3 py-1 text-sm rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  <FaTimes className="inline mr-1" />
                  Reject
                </button>
                <button 
                  onClick={() => updateApplicationStatus(application._id, 'shortlisted')}
                  className="px-3 py-1 text-sm rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                >
                  <FaCheck className="inline mr-1" />
                  Shortlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplications;