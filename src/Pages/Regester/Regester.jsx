import React, { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGithub, FaUser } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { MdOutlinePhotoCamera } from 'react-icons/md'
import { AuthContext } from '../../Contexts/AuthContexs'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const { registerUser, updateUserProfile, signInWithGoogle, signInWithGithub } = use(AuthContext)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Check password strength
    if (name === 'password') {
      let strength = 0
      if (value.length >= 8) strength += 1
      if (/[A-Z]/.test(value)) strength += 1
      if (/[0-9]/.test(value)) strength += 1
      if (/[^A-Za-z0-9]/.test(value)) strength += 1
      setPasswordStrength(strength)
    }
    
    // Check if passwords match
    if (name === 'confirmPassword') {
      setPasswordMatch(formData.password === value)
    } else if (name === 'password') {
      setPasswordMatch(formData.confirmPassword === '' || formData.confirmPassword === value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    setIsLoading(true)
    setError('')

    try {
      // Create user account (this automatically logs them in)
      const userCredential = await registerUser(formData.email, formData.password)
      
      // If we have additional profile data (name, photo), update the profile
      if (formData.name || formData.photoURL) {
        await updateUserProfile({
          displayName: formData.name || null,
          photoURL: formData.photoURL || null
        })
      }
      
      console.log('User registered successfully', userCredential.user)
      
      // Show sweet alert on successful registration
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your account has been created and you are now logged in.',
        confirmButtonColor: '#006A71',
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: 'Continue to Dashboard',
      }).then((result) => {
        // Navigate to home/dashboard since user is already logged in
        navigate('/')
      })
      
      // Reset form data
      setFormData({
        name: '',
        email: '',
        photoURL: '',
        password: '',
        confirmPassword: ''
      })
    } catch (err) {
      console.error('Registration error:', err)
      
      // Show specific error messages for common registration issues
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please use a different email or login.')
      } else if (err.code === 'auth/weak-password') {
        setError('Please use a stronger password (at least 6 characters).')
      } else {
        setError(err.message || 'Registration failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    setIsLoading(true)
    setError('')
    
    signInWithGoogle()
      .then((result) => {
        console.log('Google signup successful', result.user)
        
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Your account has been created with Google and you are now logged in.',
          confirmButtonColor: '#006A71',
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: true,
          confirmButtonText: 'Continue to Dashboard',
        }).then(() => {
          // Navigate to home or dashboard
          navigate('/')
        })
      })
      .catch((err) => {
        console.error('Google signup error:', err)
        setError(err.message || 'Google signup failed. Please try again.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleGithubSignup = () => {
    setIsLoading(true)
    setError('')
    
    signInWithGithub()
      .then((result) => {
        console.log('GitHub signup successful', result.user)
        
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Your account has been created with GitHub and you are now logged in.',
          confirmButtonColor: '#006A71',
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: true,
          confirmButtonText: 'Continue to Dashboard',
        }).then(() => {
          // Navigate to home or dashboard
          navigate('/')
        })
      })
      .catch((err) => {
        console.error('GitHub signup error:', err)
        
        // Check for account exists with different credential error
        if (err.code === 'auth/account-exists-with-different-credential') {
          setError('An account already exists with the same email address but different sign-in credentials. Please sign in using the method you used previously.')
        } else {
          setError(err.message || 'GitHub signup failed. Please try again.')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  
  // Helper function for password strength indicator
  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return 'Very weak'
    if (passwordStrength === 1) return 'Weak'
    if (passwordStrength === 2) return 'Medium'
    if (passwordStrength === 3) return 'Strong'
    return 'Very strong'
  }
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-red-500'
    if (passwordStrength === 1) return 'bg-orange-500'
    if (passwordStrength === 2) return 'bg-yellow-500'
    if (passwordStrength === 3) return 'bg-blue-500'
    return 'bg-green-500'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F2EFE7]/50 to-white overflow-hidden relative py-2 sm:py-10 px-0 sm:px-4">
      {/* Background decorations - hidden on mobile */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5 }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-[#9ACBD0]/10 rounded-full blur-3xl hidden sm:block"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#48A6A7]/10 rounded-full blur-3xl hidden sm:block"
      ></motion.div>
      
      {/* Main content container - border and styling hidden on mobile */}
      <div className="w-full sm:max-w-7xl mx-0 sm:mx-auto border-0 sm:border border-gray-200/60 rounded-none sm:rounded-3xl shadow-none sm:shadow-2xl bg-transparent sm:bg-white/40 sm:backdrop-blur-sm overflow-hidden z-10 relative">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Form */}
          <div className="w-full md:w-3/5 flex items-center justify-center p-0 sm:p-6 md:p-12 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg space-y-6 sm:space-y-8 bg-white sm:bg-white/90 sm:backdrop-blur-xl p-5 sm:p-8 rounded-none sm:rounded-2xl shadow-md sm:shadow-lg border-0 sm:border-2 sm:border-[#006A71]/10"
            >
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Create an Account</h2>
                <p className="mt-2 text-gray-600">Join thousands of job seekers finding their dream careers</p>
              </div>
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center text-red-600 shadow-sm"
                >
                  <svg className="h-5 w-5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </motion.div>
              )}
              
              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <motion.div 
                    className="relative group" 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#006A71] transition-colors duration-200" size={18} />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="pl-12 pr-4 py-4 w-full bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 shadow-sm group-hover:shadow-md"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="relative group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <HiOutlineMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#006A71] transition-colors duration-200" size={20} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="pl-12 pr-4 py-4 w-full bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 shadow-sm group-hover:shadow-md"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="relative group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <MdOutlinePhotoCamera className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#006A71] transition-colors duration-200" size={20} />
                    <input
                      id="photoURL"
                      name="photoURL"
                      type="url"
                      className="pl-12 pr-4 py-4 w-full bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 shadow-sm group-hover:shadow-md"
                      placeholder="Photo URL (optional)"
                      value={formData.photoURL}
                      onChange={handleInputChange}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="relative group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <RiLockPasswordLine className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#006A71] transition-colors duration-200" size={20} />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="pl-12 pr-4 py-4 w-full bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200 shadow-sm group-hover:shadow-md"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </motion.div>
                  
                  {formData.password && (
                    <motion.div 
                      className="mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">Password strength: <span className="font-medium">{getPasswordStrengthText()}</span></span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${getPasswordStrengthColor()}`} 
                          initial={{ width: 0 }}
                          animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  )}
                  
                  <motion.div 
                    className="relative group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <RiLockPasswordLine className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#006A71] transition-colors duration-200" size={20} />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className={`pl-12 pr-4 py-4 w-full bg-gray-50/80 border ${!passwordMatch && formData.confirmPassword ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:bg-white focus:outline-none focus:ring-2 ${!passwordMatch && formData.confirmPassword ? 'focus:ring-red-400' : 'focus:ring-[#006A71]'} focus:border-transparent transition-all duration-200 shadow-sm group-hover:shadow-md`}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </motion.div>
                  
                  {!passwordMatch && formData.confirmPassword && (
                    <motion.p 
                      className="text-sm text-red-500 mt-1 flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Passwords do not match
                    </motion.p>
                  )}
                </div>

                <div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading || !passwordMatch}
                    className={`w-full flex justify-center items-center py-4 px-4 bg-[#006A71] text-white rounded-xl hover:bg-[#48A6A7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006A71] font-medium transition-all duration-200 shadow-lg ${(isLoading || !passwordMatch) ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </motion.button>
                </div>
              </form>

              <div className="my-6 flex items-center justify-center">
                <span className="h-px bg-gray-200 w-full"></span>
                <span className="px-4 text-sm text-gray-500 whitespace-nowrap font-medium">or sign up with</span>
                <span className="h-px bg-gray-200 w-full"></span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleGoogleSignup}
                  className="w-full flex items-center justify-center px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006A71] transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <FcGoogle className="h-5 w-5 mr-2" />
                  Google
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleGithubSignup}
                  className="w-full flex items-center justify-center px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006A71] transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <FaGithub className="h-5 w-5 mr-2" />
                  GitHub
                </motion.button>
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 text-center text-sm text-gray-600"
              >
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-[#006A71] hover:text-[#48A6A7] transition-colors hover:underline">
                  Sign in instead
                </Link>
              </motion.p>
            </motion.div>
          </div>
          
          {/* Right side - Brand/Image */}
          <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-[#006A71] to-[#48A6A7] p-12 flex-col justify-center items-center text-white relative overflow-hidden">
            {/* Decorative elements */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 1.5 }}
                className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"
              ></motion.div>
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full"
              ></motion.div>
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 1.5, delay: 0.6 }}
                className="absolute top-1/3 right-10 w-20 h-20 bg-white/10 rounded-full"
              ></motion.div>
            </motion.div>
            
            <div className="max-w-md mx-auto space-y-8 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 mx-auto mb-6 drop-shadow-lg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                </svg>
                <h1 className="text-5xl font-bold text-center tracking-tight drop-shadow-md">JobPortal</h1>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-semibold">Why Create an Account?</h2>
                <p className="text-[#9ACBD0] text-lg">Join thousands of professionals finding their perfect career match through our advanced job matching technology.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-8 space-y-6"
              >
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Personalized Job Matches</h3>
                    <p className="text-sm text-[#9ACBD0]">Get job recommendations tailored to your skills</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">One-Click Apply</h3>
                    <p className="text-sm text-[#9ACBD0]">Apply to jobs with a single click</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Job Alerts</h3>
                    <p className="text-sm text-[#9ACBD0]">Get notified about relevant opportunities</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register