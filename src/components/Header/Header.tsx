'use client'

import { motion } from 'framer-motion'
import { Menu, X, Coins, Bell, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onMenuToggle: () => void
  isMobileMenuOpen: boolean
}

const Header = ({ onMenuToggle, isMobileMenuOpen }: HeaderProps) => {
  const router = useRouter();
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20"
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SA</span>
            </div> */}
            <h1 className="text-xl font-bold gradient-text hidden sm:block cursor-pointer" onClick={()=>{router.push("/Home")}}>
              AIA
            </h1>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Credit Points */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-2 rounded-full"
          >
            <Coins className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-700">1,250</span>
          </motion.div>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors relative"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer"
          >
            <User className="w-4 h-4 text-white" />
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header