import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContexs';
import { FaGithub, FaLinkedin, FaFilePdf, FaSpinner, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Get current user from auth context

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://job-portal-server-sooty-theta.vercel.app/application?email=${user.email}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        
        const data = await response.json();
        setApplications(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchApplications();
    }
  }, [user?.email]);

  // Function to handle application withdrawal
  const handleWithdraw = (id) => {
    // This would typically make an API call to delete the application
    console.log('Withdraw application:', id);
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] max-w-7xl mx-auto flex justify-center items-center h-96">
        <FaSpinner className="animate-spin text-4xl text-[#006A71]" />
        <p className="ml-2 text-xl text-gray-700">Loading your applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[40vh] max-w-7xl mx-auto text-center py-10">
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

  if (applications.length === 0) {
    return (
      <div className="min-h-[40vh] max-w-7xl mx-auto text-center py-20">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">No Applications Found</h2>
        <p className="text-gray-600 mb-6">You haven't applied to any jobs yet.</p>
        <Link 
          to="/" 
          className="bg-[#006A71] text-white px-6 py-3 rounded-md hover:bg-[#48A6A7] shadow-sm hover:shadow-md transition-all duration-300"
        >
          Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[40vh] max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Job Applications</h1>
      <p className="text-gray-600 mb-8 text-center">
        Track the status of your job applications
      </p>

      <div className="overflow-x-auto shadow-sm rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Application ID</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Job ID</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Name</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Links</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Cover Letter</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-sm text-gray-500">{app._id}</td>
                <td className="py-4 px-4 text-gray-700">{app.jobId}</td>
                <td className="py-4 px-4 text-gray-700">{app.name}</td>
                <td className="py-4 px-4">
                  <div className="flex space-x-3">
                    {app.github && (
                      <a href={app.github} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-[#006A71] transition-colors">
                        <FaGithub size={20} />
                      </a>
                    )}
                    {app.linkedin && (
                      <a href={app.linkedin} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-[#006A71] transition-colors">
                        <FaLinkedin size={20} />
                      </a>
                    )}
                    {app.resume && (
                      <a href={app.resume} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-[#006A71] transition-colors">
                        <FaFilePdf size={20} />
                      </a>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">
                  <div className="max-w-xs truncate">{app.coverLetter}</div>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => handleWithdraw(app._id)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm hover:bg-red-50 flex items-center transition-all duration-300"
                  >
                    <FaTrash className="mr-1" size={14} /> Withdraw
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;