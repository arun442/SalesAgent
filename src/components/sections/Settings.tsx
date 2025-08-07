'use client'

import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react'

const Settings = () => {
  const settingsCategories = [
    {
      title: 'Account',
      icon: User,
      color: 'from-blue-500 to-cyan-500',
      items: [
        { name: 'Profile Information', description: 'Update your personal details' },
        { name: 'Password & Security', description: 'Manage your account security' },
        { name: 'Email Preferences', description: 'Configure email notifications' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      color: 'from-green-500 to-emerald-500',
      items: [
        { name: 'Push Notifications', description: 'Manage push notification settings' },
        { name: 'Email Alerts', description: 'Configure email alert preferences' },
        { name: 'SMS Notifications', description: 'Set up SMS notification options' }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      items: [
        { name: 'Privacy Settings', description: 'Control your data privacy' },
        { name: 'Two-Factor Authentication', description: 'Enhanced account security' },
        { name: 'Login Activity', description: 'Monitor account access' }
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      color: 'from-orange-500 to-red-500',
      items: [
        { name: 'Theme Settings', description: 'Choose your preferred theme' },
        { name: 'Dashboard Layout', description: 'Customize dashboard appearance' },
        { name: 'Language & Region', description: 'Set language and region preferences' }
      ]
    }
  ]

  const quickActions = [
    {
      title: 'Billing & Subscription',
      icon: CreditCard,
      color: 'from-indigo-500 to-blue-500',
      description: 'Manage your subscription and billing'
    },
    {
      title: 'Help & Support',
      icon: HelpCircle,
      color: 'from-teal-500 to-cyan-500',
      description: 'Get help and contact support'
    },
    {
      title: 'Sign Out',
      icon: LogOut,
      color: 'from-gray-500 to-slate-600',
      description: 'Sign out from your account'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account preferences and application settings.</p>
      </motion.div>

      {/* Profile Overview */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
            <p className="text-sm text-gray-500">Premium Plan • Member since 2023</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
          >
            Edit Profile
          </motion.button>
        </div>
      </motion.div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingsCategories.map((category, categoryIndex) => {
          const CategoryIcon = category.icon
          return (
            <motion.div
              key={category.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + categoryIndex * 0.1, duration: 0.5 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                  <CategoryIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
              </div>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + categoryIndex * 0.1 + itemIndex * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 bg-white/50 rounded-lg hover:bg-white/80 cursor-pointer transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const ActionIcon = action.icon
            return (
              <motion.div
                key={action.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-all duration-300 card-hover"
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                  <ActionIcon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
                <p className="text-sm text-gray-600">{action.description}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* System Information */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Version</span>
              <span className="text-sm font-medium text-gray-900">v2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Updated</span>
              <span className="text-sm font-medium text-gray-900">2024-01-15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Storage Used</span>
              <span className="text-sm font-medium text-gray-900">2.3 GB / 10 GB</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">API Calls</span>
              <span className="text-sm font-medium text-gray-900">1,234 / 5,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active Sessions</span>
              <span className="text-sm font-medium text-gray-900">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Data Export</span>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Download
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Settings