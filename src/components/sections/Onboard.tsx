'use client'

import { motion } from 'framer-motion'
import { UserPlus, CheckCircle, Clock, AlertCircle } from 'lucide-react'

const Onboard = () => {
  const onboardingSteps = [
    { title: 'Account Setup', status: 'completed', description: 'Basic account information' },
    { title: 'Profile Verification', status: 'completed', description: 'Email and phone verification' },
    { title: 'Payment Setup', status: 'in-progress', description: 'Add payment method' },
    { title: 'Team Invitation', status: 'pending', description: 'Invite team members' },
    { title: 'First Campaign', status: 'pending', description: 'Create your first campaign' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500'
      case 'in-progress':
        return 'from-yellow-500 to-orange-500'
      default:
        return 'from-gray-400 to-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text">Onboarding</h1>
        <p className="text-gray-600 mt-2">Complete your setup to get started with all features.</p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Setup Progress</h2>
            <p className="text-gray-600">2 of 5 steps completed</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-2/5"></div>
        </div>
      </motion.div>

      {/* Onboarding Steps */}
      <div className="space-y-4">
        {onboardingSteps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="glass-effect rounded-xl p-6 card-hover"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 bg-gradient-to-r ${getStatusColor(step.status)} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {getStatusIcon(step.status)}
                {step.status !== 'completed' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    {step.status === 'in-progress' ? 'Continue' : 'Start'}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Help Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Documentation</h4>
            <p className="text-blue-700 text-sm">Learn how to set up your account step by step.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Support Chat</h4>
            <p className="text-purple-700 text-sm">Get instant help from our support team.</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Onboard