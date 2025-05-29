import React from 'react'
import { motion } from 'framer-motion'
import { FaHandshake, FaUserTie, FaRegLightbulb, FaChartLine } from 'react-icons/fa'
import { HiOutlineUserGroup } from 'react-icons/hi'

const About = () => {
  return (
    <div className="bg-gradient-to-br from-[#F2EFE7]/50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#006A71] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute left-0 top-0 h-full w-full text-white/10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path d="M0,0 L1000,0 L1000,1000 L0,1000 Z" fill="none" stroke="currentColor" strokeWidth="2"></path>
            <path d="M0,0 C300,100 400,300 500,400 C600,500 700,600 1000,1000 L0,1000 Z" fill="currentColor"></path>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About JobPortal</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Transforming how talent connects with opportunity in the modern workforce.
            </p>
            <p className="text-lg text-white/80 max-w-2xl">
              Founded in 2023, JobPortal has quickly become a leading platform for job seekers and employers, 
              providing innovative solutions to make the hiring process more efficient and effective.
            </p>
          </div>
        </div>
      </div>
      
      {/* Mission and Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
              alt="Team collaboration" 
              className="rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#006A71] mb-3">Our Mission</h3>
                <p className="text-gray-700">
                  To bridge the gap between talent and opportunity by creating a transparent, efficient, and 
                  user-friendly platform that connects qualified candidates with their ideal employers.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#006A71] mb-3">Our Vision</h3>
                <p className="text-gray-700">
                  To become the world's most trusted job marketplace, where every professional can find meaningful work 
                  and every organization can build exceptional teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              The journey of building the future of recruitment
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="md:text-right md:pr-8 mb-8 md:mb-0">
                  <div className="bg-gradient-to-br from-[#F2EFE7] to-white p-6 rounded-lg shadow-md inline-block">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#006A71]/10 text-[#006A71] text-sm font-medium mb-3">2023</span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">The Beginning</h3>
                    <p className="text-gray-700">
                      JobPortal was founded with a simple idea: make job searching and hiring easier, faster, and more human.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex md:items-center md:justify-start">
                  <div className="w-6 h-6 rounded-full bg-[#006A71] border-4 border-white shadow"></div>
                </div>
              </div>
              
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="hidden md:flex md:items-center md:justify-end">
                  <div className="w-6 h-6 rounded-full bg-[#006A71] border-4 border-white shadow"></div>
                </div>
                <div className="md:pl-8 mb-8 md:mb-0">
                  <div className="bg-gradient-to-br from-[#F2EFE7] to-white p-6 rounded-lg shadow-md inline-block">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#006A71]/10 text-[#006A71] text-sm font-medium mb-3">2023</span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">First 1,000 Users</h3>
                    <p className="text-gray-700">
                      We celebrated our first milestone: 1,000 registered users and over 100 successful job placements.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="md:text-right md:pr-8 mb-8 md:mb-0">
                  <div className="bg-gradient-to-br from-[#F2EFE7] to-white p-6 rounded-lg shadow-md inline-block">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#006A71]/10 text-[#006A71] text-sm font-medium mb-3">2024</span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Platform Expansion</h3>
                    <p className="text-gray-700">
                      Added advanced matching algorithms, improved user experience, and expanded to new markets.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex md:items-center md:justify-start">
                  <div className="w-6 h-6 rounded-full bg-[#006A71] border-4 border-white shadow"></div>
                </div>
              </div>
              
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="hidden md:flex md:items-center md:justify-end">
                  <div className="w-6 h-6 rounded-full bg-[#006A71] border-4 border-white shadow"></div>
                </div>
                <div className="md:pl-8">
                  <div className="bg-gradient-to-br from-[#F2EFE7] to-white p-6 rounded-lg shadow-md inline-block">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#006A71]/10 text-[#006A71] text-sm font-medium mb-3">2025</span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">The Future</h3>
                    <p className="text-gray-700">
                      We're continuing to innovate and expand, with plans to introduce AI-powered career coaching and more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            The principles that guide everything we do
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-[#006A71]/10 rounded-lg flex items-center justify-center mb-6">
              <FaHandshake className="w-8 h-8 text-[#006A71]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Trust & Transparency</h3>
            <p className="text-gray-700">
              We believe in building trust through transparent communication and honest interactions with our users.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-[#006A71]/10 rounded-lg flex items-center justify-center mb-6">
              <FaRegLightbulb className="w-8 h-8 text-[#006A71]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
            <p className="text-gray-700">
              We continuously seek new ways to improve our platform and provide cutting-edge solutions to our users.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-[#006A71]/10 rounded-lg flex items-center justify-center mb-6">
              <HiOutlineUserGroup className="w-8 h-8 text-[#006A71]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">User-Focused</h3>
            <p className="text-gray-700">
              Every feature and update is designed with our users' needs and experiences in mind.
            </p>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-[#006A71] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-white/80">Active Jobs</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">5K+</div>
              <div className="text-white/80">Companies</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-white/80">Job Seekers</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">8K+</div>
              <div className="text-white/80">Successful Hires</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            The talented people behind JobPortal
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <img 
              src="https://i.ibb.co/RT9FwBYw/488257098-1767983300425990-1845821744608083197-n.jpg" 
              alt="CEO" 
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Md Rijoan Maruf</h3>
              <p className="text-[#006A71] font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                With over 10 years of experience in tech and recruitment, Rijoan leads our vision and strategy.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80" 
              alt="CTO" 
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Sarah Johnson</h3>
              <p className="text-[#006A71] font-medium mb-3">Chief Technology Officer</p>
              <p className="text-gray-600 text-sm">
                Sarah oversees our technological infrastructure and development of innovative features.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" 
              alt="COO" 
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">David Chen</h3>
              <p className="text-[#006A71] font-medium mb-3">Chief Operating Officer</p>
              <p className="text-gray-600 text-sm">
                David manages our day-to-day operations and ensures we deliver exceptional service.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="bg-gradient-to-br from-[#F2EFE7] to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Hear from our satisfied users
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md relative">
              <div className="text-[#006A71] text-5xl absolute -top-4 -left-2">"</div>
              <p className="text-gray-700 mb-6 pt-3">
                JobPortal helped me find my dream job within just 2 weeks! The platform is so intuitive and the job matching algorithm is spot on.
              </p>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="User" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Robert James</h4>
                  <p className="text-sm text-gray-500">Software Developer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md relative">
              <div className="text-[#006A71] text-5xl absolute -top-4 -left-2">"</div>
              <p className="text-gray-700 mb-6 pt-3">
                As a recruiter, JobPortal has revolutionized our hiring process. We've reduced our time-to-hire by 40% and found exceptional candidates.
              </p>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="User" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Lisa Thompson</h4>
                  <p className="text-sm text-gray-500">HR Director</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md relative">
              <div className="text-[#006A71] text-5xl absolute -top-4 -left-2">"</div>
              <p className="text-gray-700 mb-6 pt-3">
                The resources and tools available on JobPortal helped me revamp my resume and prepare for interviews. I landed a job with a 30% salary increase!
              </p>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/men/62.jpg" 
                  alt="User" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Michael Rodriguez</h4>
                  <p className="text-sm text-gray-500">Marketing Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-[#006A71] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Find Your Dream Job?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of job seekers and employers who trust JobPortal for their career and hiring needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/jobs" 
              className="inline-block bg-white text-[#006A71] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 shadow-md"
            >
              Browse Jobs
            </a>
            <a 
              href="/post-job" 
              className="inline-block bg-transparent text-white border border-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors duration-300"
            >
              Post a Job
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About