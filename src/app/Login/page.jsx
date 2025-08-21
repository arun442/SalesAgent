'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Building, MapPin, Briefcase, Bot, BarChart3, TrendingUp, Users, Zap } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { axiosPublic } from '../api/constant';
export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [useOtp, setUseOtp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    otp: ''
  });

  const [signupData, setSignupData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_no: '',
    password: '',
    department: '',
    organization: '',
    location: ''
  });

  const handleLoginSubmit = async () => {
    setIsLoading(true);
    await axiosPublic.post('auth/verify-otp-email', loginData)
    .then(res =>{
      if (res.status !== 200) {
        throw new Error('Login failed');
      }
      console.log('Login successful:', res.data);
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('email', JSON.stringify(res.data.email));
      localStorage.setItem('roleId', JSON.stringify(res.data.roleId));
      localStorage.setItem('orgId', JSON.stringify(res.data.org_id));
      toast.success('Login successful! Redirecting...');
      router.push('/Home');
    })
    .catch(err =>{
      console.error('Login failed:', err);
      toast.error('Login failed. Please check your credentials or OTP.');
    })
    .finally(()=>{
      setLoginData({ email: '', password: '', otp: '' }); // Reset login fields
      setOtpSent(false);
       setIsLoading(false);
    })
  };

  const handleSignupSubmit = async () => {
    setIsLoading(true);
    try{
    const resp = await axiosPublic.post('auth/signup',signupData);
    if (!resp.ok) {
      const errorData = await resp.json();
      console.error('Signup error:', errorData);
      setIsLoading(false);
      return;
    }
    const data = await resp.json();
    console.log('Signup successful:', data);
    toast.success('Signup successful! Redirecting to login...');
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', JSON.stringify(data.email));
    localStorage.setItem('roleId', JSON.stringify(data.roleId));
    router.push("/CampaignSettings");
    setIsSignup(false);
    
    setIsLoading(false);
  }
  catch(err){
    console.error('Signup failed:', err);
    setIsLoading(false);  
    toast.error('Signup failed. Please check your details and try again.');
  }

  };


  const handleSendOtp = async () => {
    if (!loginData.email) return;
    setIsLoading(true);
    
    await axiosPublic.post('auth/otp-email',{
      email: loginData.email
    })
    .then(res =>{
      if (res.status !== 200) {
        throw new Error('Failed to send OTP');
      }
      setOtpSent(true);
      toast.success('OTP sent to your email!');
    })
    .catch(err =>{
      console.error('Error sending OTP:', err);
      toast.error('Failed to send OTP. Please try again.');
    })
    .finally(()=>{
      setIsLoading(false);
      setLoginData({...loginData, otp: ''}); // Reset OTP field
    })
  };

  const FloatingIcon = ({ icon: Icon, className, delay = 0 }) => (
    <div 
      className={`absolute ${className} animate-pulse`}
      style={{ 
        animation: `float 6s ease-in-out infinite ${delay}s, pulse 4s ease-in-out infinite ${delay + 1}s` 
      }}
    >
      <Icon className="w-6 h-6 text-blue-400 opacity-30" />
    </div>
  );

  return (
    <div className="max-h-screen min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .slide-in-left { animation: slideInLeft 0.8s ease-out; }
        .slide-in-right { animation: slideInRight 0.8s ease-out; }
        .fade-in-up { animation: fadeInUp 0.6s ease-out; }
      `}</style>

      {/* Left Column - AI Sales Imagery */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden slide-in-left">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Floating Icons */}
        <FloatingIcon icon={Bot} className="top-20 left-16" delay={0} />
        <FloatingIcon icon={BarChart3} className="top-40 right-20" delay={1} />
        <FloatingIcon icon={TrendingUp} className="bottom-40 left-12" delay={2} />
        <FloatingIcon icon={Users} className="bottom-60 right-16" delay={1.5} />
        <FloatingIcon icon={Zap} className="top-60 left-1/3" delay={0.5} />

        <div className="relative z-10 p-8 flex flex-col justify-center text-white">
          <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h1 className='text-5xl font-bold mb-2'>AIA</h1>
            <h1 className="text-2xl font-bold mb-6 leading-tight">
              AI-Powered
              <br />
              <span className="text-blue-300">Sales Automation</span>
            </h1>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              Transform your sales process with intelligent automation. 
              Boost conversions, streamline workflows, and accelerate growth.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-2 fade-in-up text-black" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white  backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-20">
              <div className="flex items-center space-x-3">
                <Bot className="w-6 h-6 text-blue-300" />
                <span className="font-semibold text-md">Smart Lead Scoring</span>
              </div>
              <p className="text-sm opacity-75 mt-2">AI identifies your best prospects automatically</p>
            </div>
            
            <div className="bg-white backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-20">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-blue-300" />
                <span className="font-semibold">Predictive Analytics</span>
              </div>
              <p className="text-sm opacity-75 mt-2">Forecast sales trends with 95% accuracy</p>
            </div>

            <div className="bg-white backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-20">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-blue-300" />
                <span className="font-semibold">Automated Workflows</span>
              </div>
              <p className="text-sm opacity-75 mt-2">Streamline repetitive tasks and focus on closing</p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-10 -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full opacity-5 translate-y-48 -translate-x-48"></div>
      </div>

      {/* Right Column - Login/Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center overflow-auto justify-center p-8 slide-in-right ">
        <div className="w-full max-w-md">
          <div className="text-center mb-4 mt-4 fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600 text-md">
              {isSignup 
                ? 'Join thousands of sales teams using AI automation' 
                : 'Sign in to your AI Sales Dashboard'
              }
            </p>
          </div>

          {!isSignup ? (
            /* Login Form */
            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-3">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

               

                {/* Password or OTP Input */}
                {!useOtp ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="w-full pl-10 pr-12 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isLoading || !loginData.email}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                      >
                        {isLoading ? 'Sending OTP...' : 'Send OTP'}
                      </button>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Enter OTP
                        </label>
                        <input
                          type="text"
                          value={loginData.otp}
                          onChange={(e) => setLoginData({...loginData, otp: e.target.value})}
                          className="w-full px-4 py-3 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-center text-xl tracking-widest"
                          placeholder="000000"
                          maxLength={6}
                          required
                        />
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          OTP sent to {loginData.email}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                {(!useOtp || otpSent) && (
                  <button
                    onClick={handleLoginSubmit}
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 mt-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-[1.02]"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>
                )}
                 {/* Login Method Toggle */}
                {/* <div className="flex space-x-4 mt-2">
                  <button
                    type="button"
                    onClick={() => {setUseOtp(false); setOtpSent(false);}}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-200 ${
                      !useOtp 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {setUseOtp(true); setOtpSent(false);}}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-200 ${
                      useOtp 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    OTP
                  </button>
                </div> */}

                {!useOtp && (
                  <div className="text-center">
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition duration-200">
                      Forgot your password?
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Signup Form */
            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-2">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={signupData.first_name}
                        onChange={(e) => setSignupData({...signupData, first_name: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="First name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={signupData.last_name}
                      onChange={(e) => setSignupData({...signupData, last_name: e.target.value})}
                      className="w-full px-4 py-3 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={signupData.phone_no}
                      onChange={(e) => setSignupData({...signupData, phone_no: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      className="w-full pl-10 pr-12 py-3 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Create a strong password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Organization & Department */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={signupData.organization}
                        onChange={(e) => setSignupData({...signupData, organization: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="Company name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        value={signupData.department}
                        onChange={(e) => setSignupData({...signupData, department: e.target.value})}
                        className="w-full pl-10 pr-4 text-sm py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        required
                      >
                        <option value="">Select department</option>
                        <option value="sales">Sales</option>
                        <option value="marketing">Marketing</option>
                        <option value="operations">Operations</option>
                        <option value="it">IT</option>
                        <option value="hr">Human Resources</option>
                        <option value="finance">Finance</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={signupData.location}
                      onChange={(e) => setSignupData({...signupData, location: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="City, Country"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSignupSubmit}
                  disabled={isLoading}
                  className="w-full bg-blue-600  mt-3 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-[1.02]"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>

                <p className="text-xs text-gray-500 text-center mt-2">
                  By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          )}

          {/* Toggle Between Login/Signup */}
          <div className="text-center mt-2 fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-gray-600">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setOtpSent(false);
                  setUseOtp(false);
                }}
                className="ml-2 text-blue-600 hover:text-blue-700 font-medium transition duration-200"
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}