'use client'

import { motion } from 'framer-motion'
import { TrendingUp, BarChart3, PieChart, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const MarketAnalysis = () => {
  const metrics = [
    {
      title: 'Market Share',
      value: '23.4%',
      change: '+2.1%',
      trend: 'up',
      description: 'Industry position'
    },
    {
      title: 'Customer Acquisition Cost',
      value: '$127',
      change: '-5.3%',
      trend: 'down',
      description: 'Average CAC'
    },
    {
      title: 'Market Growth',
      value: '15.8%',
      change: '+1.2%',
      trend: 'up',
      description: 'YoY growth rate'
    },
    {
      title: 'Competitive Index',
      value: '8.2',
      change: '+0.4',
      trend: 'up',
      description: 'Competitive strength'
    }
  ]

  const competitors = [
    { name: 'Competitor A', share: '28.5%', trend: 'up', color: 'from-red-500 to-pink-500' },
    { name: 'Your Company', share: '23.4%', trend: 'up', color: 'from-blue-500 to-cyan-500' },
    { name: 'Competitor B', share: '18.7%', trend: 'down', color: 'from-orange-500 to-yellow-500' },
    { name: 'Competitor C', share: '15.2%', trend: 'up', color: 'from-green-500 to-emerald-500' },
    { name: 'Others', share: '14.2%', trend: 'down', color: 'from-gray-400 to-gray-600' }
  ]

  const insights = [
    {
      title: 'Market Opportunity',
      description: 'Emerging markets in Asia-Pacific showing 25% growth potential',
      impact: 'High',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Competitive Threat',
      description: 'New entrant gaining traction in premium segment',
      impact: 'Medium',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Customer Behavior',
      description: 'Shift towards mobile-first solutions accelerating',
      impact: 'High',
      color: 'from-blue-500 to-purple-600'
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
        <h1 className="text-3xl font-bold gradient-text">Market Analysis</h1>
        <p className="text-gray-600 mt-2">Comprehensive insights into market trends and competitive landscape.</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="glass-effect rounded-xl p-6 card-hover"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center">
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ml-1 ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
            <p className="text-sm text-gray-600">{metric.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Share Chart */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Market Share Analysis</h3>
            <PieChart className="w-5 h-5 text-gray-600" />
          </div>
          <div className="space-y-4">
            {competitors.map((competitor, index) => (
              <div key={competitor.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 bg-gradient-to-r ${competitor.color} rounded-full`}></div>
                  <span className="text-sm font-medium text-gray-900">{competitor.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-gray-900">{competitor.share}</span>
                  {competitor.trend === 'up' ? (
                    <ArrowUpRight className="w-3 h-3 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trend Analysis */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
            <BarChart3 className="w-5 h-5 text-gray-600" />
          </div>
          <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-12 h-12 text-blue-500 mx-auto mb-2" />
              <p className="text-gray-600">Trend chart visualization</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Market Insights */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Market Insights</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${insight.color} rounded-lg flex items-center justify-center`}>
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  insight.impact === 'High' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {insight.impact}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">{insight.title}</h4>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Strategic Recommendations */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Recommendations</h3>
        <div className="space-y-3">
          {[
            'Focus on mobile-first product development to capture growing mobile market',
            'Invest in Asia-Pacific expansion to capitalize on high growth potential',
            'Strengthen premium segment offerings to defend against new competitors',
            'Develop strategic partnerships to accelerate market penetration'
          ].map((recommendation, index) => (
            <motion.div
              key={index}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-blue-900">{recommendation}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default MarketAnalysis