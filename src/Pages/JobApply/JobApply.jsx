import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiGithub, FiLinkedin, FiFileText } from "react-icons/fi";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const JobApply = () => {
  const { id: jobId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    github: "",
    linkedin: "",
    resume: "",
    coverLetter: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const applicantInfo = {
      jobId,
      name: formData.name,
      email: formData.email,
      github: formData.github,
      linkedin: formData.linkedin,
      resume: formData.resume,
      coverLetter: formData.coverLetter,
    };

    // Show loading alert
    Swal.fire({
      title: 'Submitting Application',
      text: 'Please wait while we process your application...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Fixed URL - update port to match your backend server (likely 5000, 3000, or 8000)
    axios.post("https://job-portal-server-sooty-theta.vercel.app/jobApplication", applicantInfo)
      .then((response) => {
        console.log("Application submitted successfully:", response.data);
        setIsSubmitting(false);
        
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Application Submitted!',
          text: 'Your job application has been successfully submitted.',
          confirmButtonColor: '#006A71',
          confirmButtonText: 'View My Applications'
        }).then((result) => {
          if (result.isConfirmed) {
            // Navigate to applications page
            navigate('/my-applications');
          }
        });
      })
      .catch((error) => {
        console.error("Error submitting application:", error);
        setIsSubmitting(false);
        
        // Show error message with more details
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: `We encountered an error: ${error.message}. Please check your backend server.`,
          confirmButtonColor: '#006A71'
        });
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/jobs/${jobId}`}
          className="inline-flex items-center gap-2 text-[#006A71] font-medium mb-6 group hover:underline"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Job Details
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-br from-[#006A71] to-[#48A6A7] p-6 text-white">
            <h1 className="text-2xl font-bold">Apply for Position</h1>
            <p className="text-white/80 mt-2">
              Complete the form below to submit your application
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Top row - Personal info */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              {/* Name */}
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="Your email address"
                  required
                  readOnly
                />
              </div>
            </div>

            {/* Middle row - Social/Professional links */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              {/* GitHub URL */}
              <div className="flex-1">
                <label
                  htmlFor="github"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center">
                    <FiGithub className="mr-2 text-gray-500" />
                    GitHub Profile URL
                  </div>
                </label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="https://github.com/yourusername"
                  required
                />
              </div>

              {/* LinkedIn URL */}
              <div className="flex-1">
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center">
                    <FiLinkedin className="mr-2 text-gray-500" />
                    LinkedIn Profile URL
                  </div>
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="https://linkedin.com/in/yourprofile"
                  required
                />
              </div>
            </div>

            {/* Resume URL */}
            <div className="mb-6">
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                <div className="flex items-center">
                  <FiFileText className="mr-2 text-gray-500" />
                  Resume URL
                </div>
              </label>
              <input
                type="url"
                id="resume"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Please provide a link to your resume hosted on Google Drive,
                Dropbox, or another file sharing service
              </p>
            </div>

            {/* Bottom section - Split layout */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cover Letter */}
              <div className="lg:w-2/3">
                <label
                  htmlFor="coverLetter"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 outline-none resize-none"
                  placeholder="Tell us why you're a good fit for this position..."
                ></textarea>
              </div>

              {/* Application Tips */}
              <div className="lg:w-1/3 bg-gray-50 p-4 rounded-lg self-start">
                <h3 className="text-md font-semibold text-gray-900 mb-3">
                  Application Tips
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#006A71] mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Showcase your best projects on GitHub</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#006A71] mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Keep LinkedIn profile up to date</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#006A71] mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Use PDF format for your resume</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#006A71] mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Address why you're interested in this role</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  isSubmitting
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-[#006A71] to-[#48A6A7] text-white hover:shadow-lg transform hover:-translate-y-1"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApply;
