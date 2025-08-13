"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosPublic } from '@/app/api/constant';
import { Mail, ArrowLeft, User, Eye, EyeOff, Plus, X, Trash2, Calendar, AlertCircle, ChevronDown, Building2, ExternalLink } from 'lucide-react';
import { FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setsection } from '@/app/redux/sectionslice';
// API functions
const fetchOrganizations = async () => {
  try {
    const res = await axiosPublic.get('/onboarding/get-organizations', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
};

const fetchUserEmails = async (orgId) => {
  try {
    const res = await axiosPublic.get(`/tracking/getEmailsByClientId/${orgId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.status === 200) {

      return res.data;

    }
  } catch (error) {
    console.error('Error fetching emails:', error);
    throw error;
  }
};

export default function EmailSettingsComponent() {
    const router=useRouter()
    const dispatch=useDispatch()
  const [currentStep, setCurrentStep] = useState('list');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [userEmails, setUserEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [orgLoading, setOrgLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const providers = [
    {
      id: 'gmail',
      name: 'Gmail',
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

  // Load organizations on component mount
  useEffect(() => {
    loadOrganizations();
  }, []);

  // Load emails when organization is selected
  useEffect(() => {
    if (selectedOrg) {
      loadUserEmails();
    }
  }, [selectedOrg]);

  const loadOrganizations = async () => {
    try {
      setOrgLoading(true);
      const orgData = await fetchOrganizations();
      
      if (orgData.organizations && orgData.organizations.length > 0) {
        setOrganizations(orgData.organizations);
        if (orgData.organizations.length === 1) {
          setSelectedOrg(orgData.organizations[0]);
        }
      } else {
        setOrganizations([]);
      }
            setOrgLoading(false);

    } catch (error) {
              setOrgLoading(true);

      console.error('Error loading organizations:', error);
      toast.error(error.response.data.message||'Failed to load organizations');
    } finally {
    }
  };

  const loadUserEmails = async () => {
    if (!selectedOrg) return;
    
    try {
      const emails = await fetchUserEmails(selectedOrg.org_id);
                          setLoading(false);

                              setUserEmails(emails);

                    
    } catch (error) {
                                setUserEmails([])
              setLoading(false);
      console.error('Error loading user emails:', error);
      toast.error(error.response.data.message||"Error loading user emails");
    } 
  };

  const handleOrgSelect = (org) => {
    setSelectedOrg(org);
    setShowOrgDropdown(false);
  };

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setCurrentStep('auth-method');
  };

  const handleOAuthRedirect = () => {
    const authUrls = {
      gmail: `https://stu.globalknowledgetech.com:8444/auth/google?client_id=${selectedOrg.org_id}`,
      outlook: `https://stu.globalknowledgetech.com:8444/auth/login?client_id=${selectedOrg.org_id}`
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
    if (provider?.id === 'gmail') {
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
    const passwordValidationError = validatePassword(formData.password, selectedProvider);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    const submitData = {
      ...formData,
      clientId: selectedOrg.org_id, // Use selected organization ID
      emailProvider: selectedProvider.id,
    };
    
    try {
      const res = await axiosPublic.post('/tracking/create-email-config', submitData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.status === 201) {
        console.log('Form submitted:', submitData);
        
        const newEmail = {
          id: userEmails.length + 1,
          ...formData,
          emailProvider: selectedProvider.id,
          dateAdded: new Date().toISOString().split('T')[0]
        };
        
        toast.success(res.data.message);
        loadUserEmails()
        // setUserEmails(prev => [...prev, newEmail]);
        
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
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.error || 'Failed to create email configuration');
      console.error("Full error:", error);
    }
  };

  const handleDeleteEmail = async (emailId) => {
    try {
    const res = await axiosPublic.delete(`/tracking/delete-email-config/${emailId}/${selectedOrg.org_id}`)
if (res.status==200) {
              setUserEmails(prev => prev.filter(email => email.uuid !== emailId));

}
      toast.success('Email account removed');
    } catch (error) {
      console.error('Error deleting email:', error);
      toast.error(error.response.data.message||'Failed to delete email account');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password' && passwordError) {
      setPasswordError('');
    }
  };

  const handlePasswordChange = (value) => {
    if (selectedProvider?.id === 'gmail' && value.length > 16) {
      return;
    }
    
    handleInputChange('password', value);
    
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

  const redirectToOnboard = () => {
   router.push('/Home')// Adjust the path as needed
   dispatch(setsection('Onboard'))
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

  // Show loading while fetching organizations
  if (orgLoading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center items-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
            />
            <span className="ml-3 text-gray-600">Loading organizations...</span>
          </div>
        </div>
      </div>
    );
  }

  // Show create organization prompt if no organizations exist
  if (organizations.length === 0) {
    return (
      <div className="p-4 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Organizations Found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You need to create an organization before managing email accounts. 
              Organizations help you organize and manage your email configurations.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={redirectToOnboard}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <Building2 className="w-5 h-5" />
              <span>Create Organization</span>
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex items-center justify-center">
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
              {/* Organization Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Organization
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowOrgDropdown(!showOrgDropdown)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-900 text-xs">
                        {selectedOrg ? selectedOrg.company_name : 'Select an organization'}
                      </span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showOrgDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showOrgDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
                    >
                      {organizations.map((org) => (
                        <button
                          key={org.org_id}
                          onClick={() => handleOrgSelect(org)}
                          className="w-full px-4 py-3 text-xs text-left hover:bg-gray-50 flex items-center space-x-3 first:rounded-t-lg last:rounded-b-lg"
                        >
                          <Building2 className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-900">{org.company_name}</span>
                          {selectedOrg?.org_id === org.org_id && (
                            <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Main Content - Only show if organization is selected */}
              {selectedOrg ? (
                <>
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
                        <p className="text-gray-600">Manage email accounts for {selectedOrg.company_name}</p>
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
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-4 border-blue-500  rounded-full"
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
                                                                <p className="text-gray-500">{email.emailProvider}</p>

                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteEmail(email.uuid)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Select an Organization</h3>
                  <p className="text-gray-600 text-xs">Please select an organization from the dropdown above to manage email accounts</p>
                </motion.div>
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
                    <p className="text-gray-600">Choose your email provider for {selectedOrg?.company_name}</p>
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
                  <p className="text-gray-600 text-sm">Choose how you'd like to connect for {selectedOrg?.company_name}</p>
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
                  <p className="text-gray-600 text-sm">Enter your {selectedProvider?.name} credentials for {selectedOrg?.company_name}</p>
                </div>
              </div>

              {selectedProvider?.name === "Gmail" && (
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
                        <li>1. Go to your Gmail Account's <span className="font-medium text-blue-600">Security Settings</span></li>
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
                    {selectedProvider?.id === 'gmail' ? 'App Password (16 characters)' : 'Password'}
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
                      placeholder={selectedProvider?.id === 'gmail' ? 'Enter 16-character app password' : 'Enter your password'}
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
                  
                  {selectedProvider?.id === 'gmail' && (
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
                  disabled={passwordError || (selectedProvider?.id === 'gmail' && formData.password.length !== 16)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                    passwordError || (selectedProvider?.id === 'gmail' && formData.password.length !== 16)
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