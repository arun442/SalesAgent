"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, User, Eye, EyeOff } from 'lucide-react';
import { FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { axiosPublic } from '@/app/api/constant';

export default function EmailSettingsComponent() {
  const [currentStep, setCurrentStep] = useState('provider'); // 'provider', 'auth-method', 'manual-form'
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const providers = [
    {
      id: 'google',
      name: 'Google',
      icon: <FaGoogle className="text-2xl" />,
      color: 'from-red-500 to-orange-500',
      description: 'Connect with Gmail'
    },
    {
      id: 'outlook',
      name: 'Microsoft Outlook',
      icon: <FaMicrosoft className="text-2xl" />,
      color: 'from-blue-600 to-indigo-600',
      description: 'Connect with Outlook'
    }
  ];

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setCurrentStep('auth-method');
  };

  const handleOAuthRedirect = () => {
  const authUrls = {
    google: 'https://accounts.google.com/oauth/authorize?' + new URLSearchParams({
      client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual Google Client ID
      redirect_uri: window.location.origin + '/auth/google/callback', // Your callback URL
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      access_type: 'offline',
      prompt: 'consent'
    }).toString(),
    
    outlook: "https://stu.globalknowledgetech.com:8444/login"
 
  };

  const redirectUrl = authUrls[selectedProvider.id];
  
  if (redirectUrl) {
    // Redirect to the appropriate OAuth provider
    window.location.href = redirectUrl;
  } else {
    console.error('Unknown provider:', selectedProvider.id);
  }
};

  const handleManualEntry = () => {
    setCurrentStep('manual-form');
  };

  const handleFormSubmit =async () => {
    const submitData = {
      ...formData,
      emailProvider: selectedProvider.id,
    };
try {
    const res = await axiosPublic.post('/tracking/create-email-config', submitData, {
      headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiZGhhYW51QGV4YW1wbGUuY29tbSIsInJvbGVJZCI6NSwiZmlyc3ROYW1lIjoiRGhhYW51IiwiaWF0IjoxNzU0NDgwNjExLCJleHAiOjE3NTUwODU0MTF9.3Q_vMZKM6N2PzDUQBEdvfwKfMiWShKLg2eFgxlZAn8Q`,
      },
    });
 

 
  } catch (error) {
     console.error("Full error:", error);
  }
    console.log('Form submitted:', submitData);
    // alert(`Email settings saved successfully for ${selectedProvider.name}!`);
    
    // Clear form after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const goBack = () => {
    if (currentStep === 'manual-form') {
      // Clear form when going back from manual form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      });
      setCurrentStep('auth-method');
    } else if (currentStep === 'auth-method') {
      setCurrentStep('provider');
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <div className="p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {/* Provider Selection */}
          {currentStep === 'provider' && (
            <motion.div
              key="provider"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                >
                  <Mail className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Settings</h1>
                <p className="text-gray-600">Choose your email provider to get started</p>
              </div>

              <div className="space-y-4">
                {providers.map((provider, index) => (
                  <motion.button
                    key={provider.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleProviderSelect(provider)}
                    className={`w-full p-4 rounded-xl bg-gradient-to-r ${provider.color} text-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4`}
                  >
                    <div className="text-white">{provider.icon}</div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-lg">{provider.name}</div>
                      <div className="text-blue-100 text-sm">{provider.description}</div>
                    </div>
                    <div className="text-blue-100">→</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Authentication Method Selection */}
          {currentStep === 'auth-method' && (
            <motion.div
              key="auth-method"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center mb-6">
                <button
                  onClick={goBack}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-3"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Connect {selectedProvider?.name}</h1>
                  <p className="text-gray-600 text-sm">Choose how you'd like to connect</p>
                </div>
              </div>

              <div className="space-y-4">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOAuthRedirect}
                  className={`w-full p-4 rounded-xl bg-gradient-to-r ${selectedProvider?.color} text-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-between`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-white">{selectedProvider?.icon}</div>
                    <div className="text-left">
                      <div className="font-semibold">Quick Connect</div>
                      <div className="text-blue-100 text-sm">Sign in with {selectedProvider?.name}</div>
                    </div>
                  </div>
                  <div className="text-blue-100">→</div>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleManualEntry}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Manual Setup</div>
                      <div className="text-gray-600 text-sm">Enter your credentials manually</div>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Manual Form */}
          {currentStep === 'manual-form' && (
            <motion.div
              key="manual-form"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center mb-6">
                <button
                  onClick={goBack}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-3"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Manual Setup</h1>
                  <p className="text-gray-600 text-sm">Enter your {selectedProvider?.name} credentials</p>
                </div>
              </div>
{selectedProvider?.name=="Google"&&
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">!</span>
                  </div>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-2">To connect your {selectedProvider?.name} account:</p>
                    <ol className="space-y-1 text-blue-700">
                      <li>1. Go to your {selectedProvider?.name === 'Google' ? 'Google Account\'s' : 'Microsoft Account\'s'} <span className="font-medium text-blue-600">Security Settings</span></li>
                      <li>2. Enable <span className="font-medium text-blue-600">2-step verification</span></li>
                      <li>3. Create an <span className="font-medium text-blue-600">App password</span></li>
                      {selectedProvider?.name === 'Google' && (
                        <li className="text-xs text-blue-600 mt-1">Select 'Other' for both App and Device</li>
                      )}
                    </ol>
                  </div>
                </div>
              </motion.div>}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="John"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Doe"
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="john@example.com"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleFormSubmit}
                  className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r ${selectedProvider?.color} text-white font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300`}
                >
                  Connect Email Account
                </motion.button>
                </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center text-gray-500 text-sm mt-4"
              >
                Your credentials are encrypted and stored securely
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}