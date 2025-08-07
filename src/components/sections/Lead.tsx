'use client'

import { motion } from 'framer-motion'
import { Users, Plus, Search, Filter, MoreHorizontal, Mail, Phone, Calendar } from 'lucide-react'

const Lead = () => {
  const leads = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 234 567 8900',
      company: 'Tech Corp',
      status: 'hot',
      value: '$15,000',
      lastContact: '2 days ago'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      phone: '+1 234 567 8901',
      company: 'Design Studio',
      status: 'warm',
      value: '$8,500',
      lastContact: '5 days ago'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@startup.io',
      phone: '+1 234 567 8902',
      company: 'Startup Inc',
      status: 'cold',
      value: '$3,200',
      lastContact: '1 week ago'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@enterprise.com',
      phone: '+1 234 567 8903',
      company: 'Enterprise Co',
      status: 'hot',
      value: '$25,000',
      lastContact: '1 day ago'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'warm':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cold':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
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
          <h1 className="text-3xl font-bold gradient-text">Lead Management</h1>
          <p className="text-gray-600 mt-2">Track and manage your sales leads efficiently.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 sm:mt-0 flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Lead</span>
        </motion.button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: '124', color: 'from-blue-500 to-cyan-500' },
          { label: 'Hot Leads', value: '23', color: 'from-red-500 to-pink-500' },
          { label: 'Converted', value: '45', color: 'from-green-500 to-emerald-500' },
          { label: 'This Month', value: '18', color: 'from-purple-500 to-indigo-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass-effect rounded-xl p-4"
          >
            <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <Users className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="glass-effect rounded-xl p-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </motion.div>

      {/* Leads Table */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="glass-effect rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {lead.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {lead.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(lead.status)}`}>
                      {lead.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lead.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {lead.lastContact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default Lead
