import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContexs'
import Swal from 'sweetalert2'

// Import React Icons
import { MdWork, MdDashboard, MdBookmark, MdKeyboardArrowDown, MdAssignment } from 'react-icons/md'
import { FaUser, FaSignOutAlt } from 'react-icons/fa'
import { HiMenu, HiX } from 'react-icons/hi'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logoutUser } = useContext(AuthContext)

  const isActive = (path) => {
    return location.pathname === path
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfileOpen])

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

  // Handle logout with SweetAlert confirmation
  const handleLogout = () => {
    Swal.fire({
      title: 'Sign Out',
      text: 'Are you sure you want to sign out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#006A71',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, sign out',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
          .then(() => {
            navigate('/')
          })
          .catch(error => {
            console.error('Logout error:', error)
          })
      }
    })
  }

  // Default profile icon when no photo is available
  const ProfileIcon = () => (
    <div className="flex items-center justify-center bg-gray-200 rounded-full text-gray-500">
      <FaUser className="h-3/4 w-3/4" />
    </div>
  )

  return (
    <nav className={`${isScrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-transparent'} sticky top-0 z-50 transition-all duration-300 border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <MdWork className="w-8 h-8 text-[#006A71]" />
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
            {user && (
              <Link 
                to="/my-applications" 
                className={`transition-all px-3 py-2 rounded-md text-md font-medium relative ${
                  isActive('/my-applications') 
                    ? 'text-[#006A71] font-semibold' 
                    : 'text-gray-600 hover:text-[#006A71]'
                }`}
              >
                <span>My Applications</span>
                {isActive('/my-applications') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#006A71] transform transition-all duration-300"></span>}
              </Link>
            )}
          </div>
          
          {/* Auth buttons or user profile */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative profile-dropdown">
                <button 
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 bg-white/90 border border-gray-200 rounded-full pl-1 pr-3 py-1 hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:ring-opacity-50 shadow-sm hover:shadow-md"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full object-cover border border-[#006A71]/10"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full overflow-hidden border border-[#006A71]/10">
                      <ProfileIcon />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">{user.displayName || 'User'}</span>
                  <MdKeyboardArrowDown className="h-5 w-5 text-gray-400" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg py-2 ring-1 ring-black/5 focus:outline-none z-50 transform origin-top-right transition-all duration-200 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center">
                        {user.photoURL ? (
                          <img 
                            src={user.photoURL} 
                            alt="Profile" 
                            className="h-12 w-12 rounded-full object-cover border-2 border-[#006A71]/20"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#006A71]/20">
                            <ProfileIcon />
                          </div>
                        )}
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">{user.displayName || 'User'}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-1">
                      <Link to="/profile" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group">
                        <FaUser className="h-4 w-4 mr-3 text-gray-400 group-hover:text-[#006A71]" />
                        <span className="group-hover:text-[#006A71]">Your Profile</span>
                      </Link>
                      
                      <Link to="/dashboard" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group">
                        <MdDashboard className="h-4 w-4 mr-3 text-gray-400 group-hover:text-[#006A71]" />
                        <span className="group-hover:text-[#006A71]">Dashboard</span>
                      </Link>
                      
                      <Link to="/saved-jobs" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group">
                        <MdBookmark className="h-4 w-4 mr-3 text-gray-400 group-hover:text-[#006A71]" />
                        <span className="group-hover:text-[#006A71]">Saved Jobs</span>
                      </Link>
                      
                      <Link to="/my-applications" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group">
                        <MdAssignment className="h-4 w-4 mr-3 text-gray-400 group-hover:text-[#006A71]" />
                        <span className="group-hover:text-[#006A71]">My Applications</span>
                      </Link>
                    </div>
                    
                    <div className="py-1 border-t border-gray-100">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 group"
                      >
                        <FaSignOutAlt className="h-4 w-4 mr-3 text-red-500" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-[#006A71] hover:bg-[#006A71]/5 px-5 py-2 rounded-md text-sm font-medium transition-all duration-300">
                  Login
                </Link>
                <Link to="/register" className="bg-[#006A71] text-white hover:bg-[#48A6A7] px-5 py-2 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300">
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            {user ? (
              <button 
                onClick={toggleProfile}
                className="mr-2 flex items-center focus:outline-none"
              >
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <ProfileIcon />
                  </div>
                )}
              </button>
            ) : null}
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-[#006A71] hover:bg-gray-100/50 focus:outline-none transition-colors duration-300"
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
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
            {user && (
              <Link to="/my-applications" className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/my-applications') ? 'text-[#006A71] bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-[#006A71]'}`}>
                My Applications
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="space-y-1">
                <div className="flex items-center px-5 py-3">
                  <div className="flex-shrink-0">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt="Profile" 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <ProfileIcon />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.displayName || 'User'}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <Link to="/profile" className="flex items-center px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-[#006A71]">
                  <FaUser className="h-5 w-5 mr-3 text-gray-400" />
                  Your Profile
                </Link>
                <Link to="/dashboard" className="flex items-center px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-[#006A71]">
                  <MdDashboard className="h-5 w-5 mr-3 text-gray-400" />
                  Dashboard
                </Link>
                <Link to="/saved-jobs" className="flex items-center px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-[#006A71]">
                  <MdBookmark className="h-5 w-5 mr-3 text-gray-400" />
                  Saved Jobs
                </Link>
                <Link to="/my-applications" className="flex items-center px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-[#006A71]">
                  <MdAssignment className="h-5 w-5 mr-3 text-gray-400" />
                  My Applications
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-gray-50"
                >
                  <FaSignOutAlt className="h-5 w-5 mr-3 text-red-500" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex justify-center space-x-4 px-5 py-3">
                <Link to="/login" className="text-[#006A71] hover:bg-[#006A71]/5 px-6 py-2 rounded-md text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-[#006A71] text-white hover:bg-[#48A6A7] px-6 py-2 rounded-md text-sm font-medium shadow-sm transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Mobile profile dropdown */}
      {isProfileOpen && user && (
        <div className="md:hidden absolute right-4 top-20 w-56 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg py-2 ring-1 ring-black/5 focus:outline-none z-50 transform origin-top-right transition-all duration-200 animate-fadeIn profile-dropdown">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="h-12 w-12 rounded-full object-cover border-2 border-[#006A71]/20"
                />
              ) : (
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#006A71]/20">
                  <ProfileIcon />
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">{user.displayName || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>
          
          <div className="py-1">
            <Link to="/profile" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group">
              <FaUser className="h-4 w-4 mr-3 text-gray-400 group-hover:text-[#006A71]" />
              <span className="group-hover:text-[#006A71]">Your Profile</span>
            </Link>
            
            <Link to="/dashboard" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group">
              <MdDashboard className="h-4 w-4 mr-3 text-gray-400 group-hover:text-[#006A71]" />
              <span className="group-hover:text-[#006A71]">Dashboard</span>
            </Link>
            
            <Link to="/saved-jobs" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group">
              <MdBookmark className="h-4 w-4 mr-3 text-gray-400 group-hover:text-[#006A71]" />
              <span className="group-hover:text-[#006A71]">Saved Jobs</span>
            </Link>
            
            <Link to="/my-applications" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group">
              <MdAssignment className="h-4 w-4 mr-3 text-gray-400 group-hover:text-[#006A71]" />
              <span className="group-hover:text-[#006A71]">My Applications</span>
            </Link>
          </div>
          
          <div className="py-1 border-t border-gray-100">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 group"
            >
              <FaSignOutAlt className="h-4 w-4 mr-3 text-red-500" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar