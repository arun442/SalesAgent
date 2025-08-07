'use client'

import { motion } from 'framer-motion'
import { Megaphone, Plus, Play, Pause, Eye, Users, TrendingUp, Calendar } from 'lucide-react'

const Campaign = () => {
  const campaigns = [
    {
      id: 1,
      name: 'Summer Sale 2024',
      type: 'Email',
      status: 'active',
      reach: '15,432',
      clicks: '2,341',
      conversion: '12.4%',
      budget: '$5,000',
      startDate: '2024-07-01',
      endDate: '2024-08-31'
    },
    {
      id: 2,
      name: 'Product Launch',
      type: 'Social Media',
      status: 'paused',
      reach: '8,921',
      clicks: '1,234',
      conversion: '8.7%',
      budget: '$3,500',
      startDate: '2024-06-15',
      endDate: '2024-07-15'
    },
    {
      id: 3,
      name: 'Brand Awareness',
      type: 'Display Ads',
      status: 'completed',
      reach: '25,678',
      clicks: '3,456',
      conversion: '15.2%',
      budget: '$8,000',
      startDate: '2024-05-01',
      endDate: '2024-06-30'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Email':
        return 'from-blue-500 to-cyan-500'
      case 'Social Media':
        return 'from-purple-500 to-pink-500'
      case 'Display Ads':
        return 'from-orange-500 to-red-500'
      default:
        return 'from-gray-500 to-slate-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Campaign Management</h1>
          <p className="text-gray-600 mt-2">Create and manage your marketing campaigns.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 sm:mt-0 flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </motion.button>
      </motion.div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Campaigns', value: '12', icon: Megaphone, color: 'from-green-500 to-emerald-500' },
          { label: 'Total Reach', value: '49.1K', icon: Users, color: 'from-blue-500 to-cyan-500' },
          { label: 'Click Rate', value: '12.4%', icon: Eye, color: 'from-purple-500 to-pink-500' },
          { label: 'Conversion', value: '8.7%', icon: TrendingUp, color: 'from-orange-500 to-red-500' }
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-effect rounded-xl p-4"
            >
              <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Campaign List */}
      <div className="space-y-4">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="glass-effect rounded-xl p-6 card-hover"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                <div className={`w-12 h-12 bg-gradient-to-r ${getTypeColor(campaign.type)} rounded-lg flex items-center justify-center`}>
                  <Megaphone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(campaign.status)}`}>
                      {campaign.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{campaign.type} • Budget: {campaign.budget}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {campaign.startDate} - {campaign.endDate}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{campaign.reach}</p>
                    <p className="text-xs text-gray-600">Reach</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{campaign.clicks}</p>
                    <p className="text-xs text-gray-600">Clicks</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{campaign.conversion}</p>
                    <p className="text-xs text-gray-600">Conversion</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    {campaign.status === 'active' ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Campaign Templates */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Email Newsletter', description: 'Engage your subscribers with regular updates' },
            { name: 'Product Launch', description: 'Announce new products to your audience' },
            { name: 'Promotional Sale', description: 'Drive sales with special offers' }
          ].map((template, index) => (
            <motion.div
              key={template.name}
              whileHover={{ scale: 1.05 }}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-all duration-300"
            >
              <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
              <p className="text-sm text-gray-600">{template.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Campaign