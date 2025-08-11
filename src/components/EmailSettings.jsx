"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosPublic } from '@/app/api/constant';
import { Mail, ArrowLeft, User, Eye, EyeOff, Plus, X, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { FaGoogle, FaMicrosoft } from 'react-icons/fa';

// Dummy API function
const fetchUserEmails = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
      emailProvider: "google",
      dateAdded: "2024-01-15"
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.wilson@outlook.com",
      emailProvider: "outlook",
      dateAdded: "2024-01-20"
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.j@gmail.com",
      emailProvider: "google",
      dateAdded: "2024-01-25"
    },
    {
      id: 4,
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@outlook.com",
      emailProvider: "outlook",
      dateAdded: "2024-01-28"
    }
  ];
};

export default function EmailSettingsComponent() {
  const [currentStep, setCurrentStep] = useState('list'); // 'list', 'provider', 'auth-method', 'manual-form'
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [userEmails, setUserEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passwordError, setPasswordError] = useState('');
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

  // Load user emails on component mount
  useEffect(() => {
    loadUserEmails();
  }, []);

  const loadUserEmails = async () => {
    try {
      setLoading(true);
      const emails = await fetchUserEmails();
      setUserEmails(emails);
    } catch (error) {
      console.error('Error loading user emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setCurrentStep('auth-method');
  };

  const handleOAuthRedirect = () => {
    const authUrls = {
      google: "https://stu.globalknowledgetech.com:8444/auth/google",
      outlook: "https://stu.globalknowledgetech.com:8444/auth/login"
    };

    const redirectUrl = authUrls[selectedProvider.id];
    
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      console.error('Unknown provider:', selectedProvider.id);
    }
  };

  const handleManualEntry = () => {
    setCurrentStep('manual-form');
  };

  const validatePassword = (password, provider) => {
    if (provider?.id === 'google') {
      // For Google, check if password is exactly 16 characters
      if (password.length > 0 && password.length < 16) {
        return 'App password must be exactly 16 characters. Please follow the instructions above to generate a proper App password.';
      }
      if (password.length > 16) {
        return 'App password should be exactly 16 characters.';
      }
    }
    return '';
  };

  const handleFormSubmit = async () => {
    // Validate password before submitting
    const passwordValidationError = validatePassword(formData.password, selectedProvider);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

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

    if (res.status==201) {
            // Your existing API call here
      console.log('Form submitted:', submitData);
      
      // Simulate adding to list
      const newEmail = {
        id: userEmails.length + 1,
        ...formData,
        emailProvider: selectedProvider.id,
        dateAdded: new Date().toISOString().split('T')[0]
      };
      
      setUserEmails(prev => [...prev, newEmail]);
      
      // Clear form and go back to list
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      });
      setPasswordError('');
      setCurrentStep('list');
    }
  
      
    } catch (error) {
      console.error("Full error:", error);
    }
  };

  const handleDeleteEmail = async (emailId) => {
    try {
      // Simulate API call for delete
      await new Promise(resolve => setTimeout(resolve, 300));
      setUserEmails(prev => prev.filter(email => email.id !== emailId));
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear password error when user starts typing
    if (field === 'password' && passwordError) {
      setPasswordError('');
    }
  };

  const handlePasswordChange = (value) => {
    // For Google, restrict input to 16 characters max
    if (selectedProvider?.id === 'google' && value.length > 16) {
      return; // Don't allow more than 16 characters
    }
    
    handleInputChange('password', value);
    
    // Real-time validation
    const error = validatePassword(value, selectedProvider);
    setPasswordError(error);
  };

  const goBack = () => {
    if (currentStep === 'manual-form') {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      });
      setPasswordError('');
      setCurrentStep('auth-method');
    } else if (currentStep === 'auth-method') {
      setCurrentStep('provider');
    } else if (currentStep === 'provider') {
      setCurrentStep('list');
    }
  };

  const getProviderIcon = (providerId) => {
    const provider = providers.find(p => p.id === providerId);
    return provider ? provider.icon : <Mail className="text-lg" />;
  };

  const getProviderColor = (providerId) => {
    const provider = providers.find(p => p.id === providerId);
    return provider ? provider.color : 'from-gray-500 to-gray-600';
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
    <div className="p-4 flex items-center justify-center  ">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {/* User Email List */}
          {currentStep === 'list' && (
            <motion.div
              key="list"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center justify-between mb-8 space-x-4">
                <div className="flex items-center space-x-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center"
                  >
                    <Mail className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Email Accounts</h1>
                    <p className="text-gray-600">Manage your connected email accounts</p>
                  </div>
                </div>
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep('provider')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">Add</span>
                </motion.button>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                  />
                </div>
              ) : userEmails.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No email accounts yet</h3>
                  <p className="text-gray-600 mb-6">Add your first email account to get started</p>
                  <button
                    onClick={() => setCurrentStep('provider')}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-300"
                  >
                    Add Email Account
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {userEmails.map((email, index) => (
                    <motion.div
                      key={email.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${getProviderColor(email.emailProvider)} rounded-lg flex items-center justify-center text-white`}>
                            {getProviderIcon(email.emailProvider)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {email.firstName} {email.lastName}
                            </h3>
                            <p className="text-gray-600">{email.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500">
                                Added {new Date(email.dateAdded).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteEmail(email.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

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
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center"
                  >
                    <Mail className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Email Settings</h1>
                    <p className="text-gray-600">Choose your email provider to get started</p>
                  </div>
                </div>
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goBack}
                  className="p-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 text-gray-600"
                >
                  <X className="w-6 h-6" />
                </motion.button>
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

              {selectedProvider?.name === "Google" && (
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
                        <li>1. Go to your Google Account's <span className="font-medium text-blue-600">Security Settings</span></li>
                        <li>2. Enable <span className="font-medium text-blue-600">2-step verification</span></li>
                        <li>3. Create an <span className="font-medium text-blue-600">App password</span> (exactly 16 characters)</li>
                        <li className="text-xs text-blue-600 mt-1">Select 'Other' for both App and Device</li>
                      </ol>
                    </div>
                  </div>
                </motion.div>
              )}

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
                    {selectedProvider?.id === 'google' ? 'App Password (16 characters)' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 pr-12 ${
                        passwordError 
                          ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                          : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      }`}
                      placeholder={selectedProvider?.id === 'google' ? 'Enter 16-character app password' : 'Enter your password'}
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
                  
                  {/* Password counter for Google */}
                  {selectedProvider?.id === 'google' && (
                    <div className="flex justify-between items-center mt-1">
                      <span className={`text-xs ${
                        formData.password.length === 16 
                          ? 'text-green-600' 
                          : formData.password.length > 0 
                            ? 'text-orange-600' 
                            : 'text-gray-500'
                      }`}>
                        {formData.password.length}/16 characters
                      </span>
                      {formData.password.length === 16 && (
                        <span className="text-xs text-green-600 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                          Valid length
                        </span>
                      )}
                    </div>
                  )}

                  {/* Error message */}
                  {passwordError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2"
                    >
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-red-700">{passwordError}</span>
                    </motion.div>
                  )}
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleFormSubmit}
                  disabled={passwordError || (selectedProvider?.id === 'google' && formData.password.length !== 16)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                    passwordError || (selectedProvider?.id === 'google' && formData.password.length !== 16)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : `bg-gradient-to-r ${selectedProvider?.color} text-white`
                  }`}
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