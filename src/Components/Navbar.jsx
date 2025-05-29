import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${isScrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-transparent'} sticky top-0 z-50 transition-all duration-300 border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#006A71]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
              </svg>
              <span className="text-[#006A71] text-2xl font-bold tracking-tight">JobPortal</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              to="/" 
              className={`transition-all px-3 py-2 rounded-md text-md font-medium relative ${
                isActive('/') 
                  ? 'text-[#006A71] font-semibold' 
                  : 'text-gray-600 hover:text-[#006A71]'
              }`}
            >
              <span>Home</span>
              {isActive('/') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#006A71] transform transition-all duration-300"></span>}
            </Link>
            <Link 
              to="/jobs" 
              className={`transition-all px-3 py-2 rounded-md text-md font-medium relative ${
                isActive('/jobs') 
                  ? 'text-[#006A71] font-semibold' 
                  : 'text-gray-600 hover:text-[#006A71]'
              }`}
            >
              <span>Jobs</span>
              {isActive('/jobs') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#006A71] transform transition-all duration-300"></span>}
            </Link>
            <Link 
              to="/about" 
              className={`transition-all px-3 py-2 rounded-md text-md font-medium relative ${
                isActive('/about') 
                  ? 'text-[#006A71] font-semibold' 
                  : 'text-gray-600 hover:text-[#006A71]'
              }`}
            >
              <span>About</span>
              {isActive('/about') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#006A71] transform transition-all duration-300"></span>}
            </Link>
            <Link 
              to="/contact" 
              className={`transition-all px-3 py-2 rounded-md text-md font-medium relative ${
                isActive('/contact') 
                  ? 'text-[#006A71] font-semibold' 
                  : 'text-gray-600 hover:text-[#006A71]'
              }`}
            >
              <span>Contact</span>
              {isActive('/contact') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#006A71] transform transition-all duration-300"></span>}
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-[#006A71] hover:bg-[#006A71]/5 px-5 py-2 rounded-md text-sm font-medium transition-all duration-300">
              Login
            </Link>
            <Link to="/register" className="bg-[#006A71] text-white hover:bg-[#48A6A7] px-5 py-2 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300">
              Register
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-[#006A71] hover:bg-gray-100/50 focus:outline-none transition-colors duration-300"
            >
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/') ? 'text-[#006A71] bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-[#006A71]'}`}>
              Home
            </Link>
            <Link to="/jobs" className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/jobs') ? 'text-[#006A71] bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-[#006A71]'}`}>
              Jobs
            </Link>
            <Link to="/about" className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/about') ? 'text-[#006A71] bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-[#006A71]'}`}>
              About
            </Link>
            <Link to="/contact" className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/contact') ? 'text-[#006A71] bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-[#006A71]'}`}>
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex justify-center space-x-4 px-5 py-3">
              <Link to="/login" className="text-[#006A71] hover:bg-[#006A71]/5 px-6 py-2 rounded-md text-sm font-medium transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-[#006A71] text-white hover:bg-[#48A6A7] px-6 py-2 rounded-md text-sm font-medium shadow-sm transition-colors">
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar