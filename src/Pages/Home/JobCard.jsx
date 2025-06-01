import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiBriefcase, FiCalendar, FiDollarSign } from "react-icons/fi";

const JobCard = ({ job }) => {
  const {
    _id,
    title,
    location,
    jobType,
    category,
    applicationDeadline,
    salaryRange,
    company,
    requirements,
    company_logo
  } = job;

  // Format salary with commas and proper currency symbol
  const formatSalary = (amount, currency) => {
    const formattedAmount = new Intl.NumberFormat('en-US').format(amount);
    
    const currencySymbols = {
      'usd': '$',
      'bdt': '৳',
      'eur': '€',
      'gbp': '£'
    };
    
    return `${currencySymbols[currency.toLowerCase()] || ''}${formattedAmount}`;
  };

  // Format date to more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100 flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 bg-gray-50 p-1">
              <img 
                src={company_logo || "https://via.placeholder.com/48?text=Logo"} 
                alt={company} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/48?text=Logo";
                }}
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{company}</h3>
              <div className="flex items-center text-xs text-gray-500">
                <FiBriefcase className="mr-1" />
                <span>{category}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              jobType === "Remote" ? "bg-blue-100 text-blue-700" :
              jobType === "Hybrid" ? "bg-purple-100 text-purple-700" :
                                    "bg-green-100 text-green-700"
            }`}>
              {jobType}
            </span>
          </div>
        </div>
        
        <h2 className="text-lg font-bold text-gray-800 mb-2 hover:text-[#006A71] transition-colors">
          {title}
        </h2>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <FiMapPin className="mr-1 text-gray-400" />
          <span>{location}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {requirements && requirements.slice(0, 3).map((skill, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {skill}
            </span>
          ))}
          {requirements && requirements.length > 3 && (
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              +{requirements.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="p-4 bg-gray-50 flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <div className="text-sm">
            <span className="text-gray-700 font-medium text-sm">
              {salaryRange ? 
                `${formatSalary(salaryRange.min, salaryRange.currency)} - ${formatSalary(salaryRange.max, salaryRange.currency)}` : 
                "Competitive"}
            </span>
          </div>
          
          <div className="flex items-center text-xs">
            <FiCalendar className="mr-1 text-gray-500" />
            <span className="text-gray-600">
              Deadline: {applicationDeadline ? formatDate(applicationDeadline) : "Open"}
            </span>
          </div>
        </div>
        
        <Link 
          to={`/job/${_id}`} 
          className="bg-[#006A71] hover:bg-[#005057] text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-300"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;

// data will recive in this formate

// "_id": "683880caecf4b48903997bf5",
// "title": "Software Engineer",
// "location": "Halishohor, Chittagong",
// "jobType": "Hybrid",
// "category": "Engineering",
// "applicationDeadline": "2024-12-31",
// "salaryRange": {
// "min": 40000,
// "max": 60000,
// "currency": "bdt"
// },
// "description": "We are seeking a skilled Software Engineer to join our dynamic team. The candidate will work on diverse projects and contribute to innovative solutions.",
// "company": "Favorite IT",
// "requirements": [
// "JavaScript",
// "React",
// "Node.js",
// "MongoDB"
// ],
// "responsibilities": [
// "Develop and maintain software",
// "Collaborate with the team",
// "Participate in code reviews"
// ],
// "status": "active",
// "hr_email": "hr@techsolutions.com",
// "hr_name": "Farhan Rahman",
// "company_logo": "https://i.ibb.co/mXD5MNf/facebook.png"
