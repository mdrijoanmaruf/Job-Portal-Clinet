import React, { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { AuthContext } from '../../Contexts/AuthContexs'
import Swal from 'sweetalert2'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { signInUser, signInWithGoogle, signInWithGithub } = use(AuthContext)
  const navigate = useNavigate()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    signInUser(email, password)
      .then((result) => {
        // Handle successful login
        console.log('Login successful', result)
        
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome back to JobPortal.',
          confirmButtonColor: '#006A71',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          // Navigate to home or dashboard
          navigate('/')
        })
        
        // Reset form
        setEmail('')
        setPassword('')
      })
      .catch((err) => {
        // Handle login error
        console.error('Login failed:', err)
        
        // Set appropriate error message
        if (err.code === 'auth/user-not-found') {
          setError('No user found with this email. Please check your email or sign up.')
        } else if (err.code === 'auth/wrong-password') {
          setError('Incorrect password. Please try again.')
        } else {
          setError(err.message || 'Login failed. Please try again.')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleGoogleLogin = () => {
    setIsLoading(true)
    setError('')
    
    signInWithGoogle()
      .then((result) => {
        console.log('Google login successful', result.user)
        
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome back to JobPortal.',
          confirmButtonColor: '#006A71',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          // Navigate to home or dashboard
          navigate('/')
        })
      })
      .catch((err) => {
        console.error('Google login error:', err)
        setError(err.message || 'Google login failed. Please try again.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleGithubLogin = () => {
    setIsLoading(true)
    setError('')
    
    signInWithGithub()
      .then((result) => {
        console.log('GitHub login successful', result.user)
        
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome back to JobPortal.',
          confirmButtonColor: '#006A71',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          // Navigate to home or dashboard
          navigate('/')
        })
      })
      .catch((err) => {
        console.error('GitHub login error:', err)
        
        // Check for account exists with different credential error
        if (err.code === 'auth/account-exists-with-different-credential') {
          setError('An account already exists with the same email address but different sign-in credentials. Please sign in using the method you used previously.')
        } else {
          setError(err.message || 'GitHub login failed. Please try again.')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-white to-gray-100">
      {/* Left side - Brand/Image */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#006A71] to-[#48A6A7] p-12 flex-col justify-center items-center text-white">
        <div className="max-w-md mx-auto space-y-8">
          <div className="animate-fade-in-up">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
            </svg>
            <h1 className="text-4xl font-bold text-center">JobPortal</h1>
          </div>
          
          <div className="space-y-4 animate-fade-in-up delay-150">
            <h2 className="text-2xl font-semibold">Find Your Dream Job</h2>
            <p className="text-[#9ACBD0]">Sign in to access thousands of job opportunities tailored to your skills and preferences.</p>
          </div>
          
          <div className="pt-8 animate-fade-in-up delay-300">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Easy Application Process</h3>
                <p className="text-sm text-[#9ACBD0]">Apply to multiple jobs with a single click</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Track Your Applications</h3>
                <p className="text-sm text-[#9ACBD0]">Monitor status and get timely updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Sign in to continue your job search</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-600">
              <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
            <div className="space-y-4">
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-10 pr-3 py-3 w-full bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-10 pr-3 py-3 w-full bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006A71] focus:border-transparent transition-all duration-200"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#006A71] focus:ring-[#006A71] border-gray-300 rounded transition-colors"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#006A71] hover:text-[#48A6A7] transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 bg-[#006A71] text-white rounded-lg hover:bg-[#48A6A7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006A71] font-medium transition-all duration-200 transform hover:translate-y-[-1px] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <div className="my-6 flex items-center justify-center">
            <span className="h-px bg-gray-200 w-full"></span>
            <span className="px-4 text-sm text-gray-400 whitespace-nowrap">or continue with</span>
            <span className="h-px bg-gray-200 w-full"></span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006A71] transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-sm"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Google
            </button>

            <button
              onClick={handleGithubLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006A71] transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-sm"
            >
              <FaGithub className="h-5 w-5 mr-2" />
              GitHub
            </button>
          </div>
          
          <p className="mt-10 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-[#006A71] hover:text-[#48A6A7] transition-colors">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login