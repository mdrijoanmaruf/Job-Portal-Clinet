import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdWork, MdAdd, MdDelete } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Contexts/AuthContexs';

const AddJobs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requirements, setRequirements] = useState(['']);
  const [responsibilities, setResponsibilities] = useState(['']);
  const { user } = useContext(AuthContext); // Get the logged-in user
  
  // Use react-hook-form with defaultValues
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  
  // Set default HR email when component mounts or user changes
  useEffect(() => {
    if (user && user.email) {
      setValue('hrEmail', user.email);
    }
  }, [user, setValue]);

  // Handle adding new requirement field
  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  // Handle removing requirement field
  const removeRequirement = (index) => {
    const updatedRequirements = [...requirements];
    updatedRequirements.splice(index, 1);
    setRequirements(updatedRequirements);
  };

  // Handle requirement field change
  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index] = value;
    setRequirements(updatedRequirements);
  };

  // Handle adding new responsibility field
  const addResponsibility = () => {
    setResponsibilities([...responsibilities, '']);
  };

  // Handle removing responsibility field
  const removeResponsibility = (index) => {
    const updatedResponsibilities = [...responsibilities];
    updatedResponsibilities.splice(index, 1);
    setResponsibilities(updatedResponsibilities);
  };

  // Handle responsibility field change
  const handleResponsibilityChange = (index, value) => {
    const updatedResponsibilities = [...responsibilities];
    updatedResponsibilities[index] = value;
    setResponsibilities(updatedResponsibilities);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Filter out empty values
      const filteredRequirements = requirements.filter(req => req.trim() !== '');
      const filteredResponsibilities = responsibilities.filter(resp => resp.trim() !== '');

      // Create job object
      const jobData = {
        title: data.title,
        company: data.company,
        location: data.location,
        jobType: data.jobType,
        category: data.category,
        applicationDeadline: data.applicationDeadline,
        salaryRange: {
          min: parseInt(data.minSalary),
          max: parseInt(data.maxSalary),
          currency: data.currency
        },
        description: data.description,
        requirements: filteredRequirements,
        responsibilities: filteredResponsibilities,
        status: data.status,
        hr_name: data.hrName,
        hr_email: data.hrEmail,
        company_logo: data.companyLogo
      };

      console.log("Sending job data:", jobData); // Debug - check data structure

      // Make API request - use the correct endpoint
      const response = await fetch('https://job-portal-server-sooty-theta.vercel.app/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(jobData),
      });

      console.log("Response status:", response.status); // Debug - check response

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Server error details:", errorData);
        throw new Error(`Failed to add job (${response.status}): ${errorData?.message || response.statusText}`);
      }

      // Success message
      Swal.fire({
        icon: 'success',
        title: 'Job Posted Successfully!',
        text: 'Your job listing has been published.',
        confirmButtonColor: '#006A71',
      });

      // Reset form
      reset();
      setRequirements(['']);
      setResponsibilities(['']);
    } catch (error) {
      console.error('Error adding job:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Something went wrong! ${error.message}`,
        confirmButtonColor: '#006A71',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[40vh] max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center">
          <MdWork className="mr-2 text-[#006A71]" />
          Post a New Job
        </h1>
        <p className="text-gray-600">Fill in the details below to create a new job listing</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Job Title *
            </label>
            <input
              type="text"
              {...register('title', { required: 'Job title is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
              placeholder="e.g. Software Engineer"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Company Name *
            </label>
            <input
              type="text"
              {...register('company', { required: 'Company name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
              placeholder="e.g. TechSolutions Inc."
            />
            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Location *
            </label>
            <input
              type="text"
              {...register('location', { required: 'Location is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
              placeholder="e.g. Dhaka, Bangladesh"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Job Type *
            </label>
            <select
              {...register('jobType', { required: 'Job type is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
            >
              <option value="">Select job type</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
            {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category *
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
            >
              <option value="">Select category</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Finance">Finance</option>
              <option value="HR">Human Resources</option>
              <option value="Management">Management</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Application Deadline *
            </label>
            <input
              type="date"
              {...register('applicationDeadline', { required: 'Application deadline is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
            />
            {errors.applicationDeadline && <p className="text-red-500 text-sm mt-1">{errors.applicationDeadline.message}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Status *
            </label>
            <select
              {...register('status', { required: 'Status is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
          </div>

          {/* Salary Range */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Salary Range *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <input
                  type="number"
                  {...register('minSalary', { required: 'Minimum salary is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
                  placeholder="Minimum salary"
                />
                {errors.minSalary && <p className="text-red-500 text-sm mt-1">{errors.minSalary.message}</p>}
              </div>
              <div>
                <input
                  type="number"
                  {...register('maxSalary', { required: 'Maximum salary is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
                  placeholder="Maximum salary"
                />
                {errors.maxSalary && <p className="text-red-500 text-sm mt-1">{errors.maxSalary.message}</p>}
              </div>
              <div>
                <select
                  {...register('currency', { required: 'Currency is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
                >
                  <option value="bdt">BDT</option>
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gbp">GBP</option>
                </select>
                {errors.currency && <p className="text-red-500 text-sm mt-1">{errors.currency.message}</p>}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Job Description *
            </label>
            <textarea
              rows="5"
              {...register('description', { required: 'Job description is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
              placeholder="Describe the position, roles, and company information..."
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Requirements */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Requirements *
            </label>
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => handleRequirementChange(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
                  placeholder={`Requirement ${index + 1}`}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                  >
                    <MdDelete size={20} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addRequirement}
              className="mt-2 flex items-center text-[#006A71] hover:text-[#48A6A7]"
            >
              <MdAdd className="mr-1" /> Add Requirement
            </button>
          </div>

          {/* Responsibilities */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Responsibilities *
            </label>
            {responsibilities.map((responsibility, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
                  placeholder={`Responsibility ${index + 1}`}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeResponsibility(index)}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                  >
                    <MdDelete size={20} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addResponsibility}
              className="mt-2 flex items-center text-[#006A71] hover:text-[#48A6A7]"
            >
              <MdAdd className="mr-1" /> Add Responsibility
            </button>
          </div>

          {/* HR Information */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              HR Name *
            </label>
            <input
              type="text"
              {...register('hrName', { required: 'HR name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
              placeholder="e.g. John Smith"
            />
            {errors.hrName && <p className="text-red-500 text-sm mt-1">{errors.hrName.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              HR Email *
            </label>
            <input
              type="email"
              {...register('hrEmail', { 
                required: 'HR email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
              placeholder="e.g. hr@company.com"
              defaultValue={user?.email} // Set default value here as well
            />
            {errors.hrEmail && <p className="text-red-500 text-sm mt-1">{errors.hrEmail.message}</p>}
            {user?.email && (
              <p className="text-xs text-gray-500 mt-1">Using your account email. You can change it if needed.</p>
            )}
          </div>

          {/* Company Logo URL */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Company Logo URL *
            </label>
            <input
              type="url"
              {...register('companyLogo', { required: 'Company logo URL is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
              placeholder="e.g. https://example.com/logo.png"
            />
            {errors.companyLogo && <p className="text-red-500 text-sm mt-1">{errors.companyLogo.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#006A71] text-white py-3 px-6 rounded-md hover:bg-[#48A6A7] focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:ring-opacity-50 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Posting Job...
                </>
              ) : (
                'Post Job'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddJobs;