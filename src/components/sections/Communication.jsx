"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MessageCircle } from 'lucide-react';
import EmailSettingsComponent from '../EmailSettings';
import { FaWhatsapp } from "react-icons/fa";

// import SmsSettingsComponent from './SmsSettingsComponent
// ';
// import WhatsappSettingsComponent from './WhatsappSettingsComponent';

export default function CommunicationComponent() {
  const [activeTab, setActiveTab] = useState('email');

  const tabs = [
    { 
      id: 'email', 
      name: 'Email Settings', 
      icon: <Mail className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      id: 'sms', 
      name: 'SMS Settings', 
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      id: 'whatsapp', 
      name: 'WhatsApp Settings', 
      icon: <FaWhatsapp className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-600'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'email':
        return <EmailSettingsComponent />;
      case 'sms':
        return <EmailSettingsComponent />;
      case 'whatsapp':
        return <EmailSettingsComponent />;
      default:
        return <EmailSettingsComponent />;
    }
  };

  return (
    <div className="  p-2 ">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-2">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold gradient-text mb-2"
          >
            Communication Settings
          </motion.h1>
   
        </div>

        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-2"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl`}
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center space-x-2">
                    {tab.icon}
                    <span>{tab.name}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center"
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
}