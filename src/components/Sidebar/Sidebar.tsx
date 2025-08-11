'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Megaphone,
  TrendingUp,
  Settings,
  ChevronRight,
  MessageSquare,
  Mail,
  MessageCircle
} from 'lucide-react'
import { GoOrganization } from "react-icons/go";
import { setsection } from '@/app/redux/sectionslice';
import { useDispatch, useSelector,  } from 'react-redux';
const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, color: 'from-blue-500 to-cyan-500' },
  { name: 'Onboard', icon: UserPlus, color: 'from-green-500 to-emerald-500' },
  { name: 'Projects', icon: Users, color: 'from-purple-500 to-pink-500' },
  { name: 'Campaign', icon: Megaphone, color: 'from-orange-500 to-red-500' },
  { name: 'MarketAnalysis', icon: TrendingUp, color: 'from-indigo-500 to-blue-500' },
  { name: 'Settings', icon: Settings, color: 'from-gray-500 to-slate-600' },
]

const settingsSubItems = [
  { name: 'Communication Settings', icon: MessageSquare },
  { name: 'Organization Settings', icon: GoOrganization },
]

interface SidebarProps {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

const Sidebar = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: SidebarProps) => {
    const activeSection=useSelector((state:any)=>{
       return state?.section?.value
    })
    const dispatch=useDispatch()
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false)
  
  const handleItemClick = (itemName: string) => {
    if (itemName === 'Settings') {
      setIsSettingsExpanded(!isSettingsExpanded)
    } else {
        dispatch(setsection(itemName))
    //   setActiveSection(itemName)
      setIsSettingsExpanded(false)
    }

    if (window.innerWidth < 750 && itemName !== 'Settings') {
      setIsMobileMenuOpen(false)
    }
  }

  const handleSettingsSubItemClick = (subItemName: string) => {
    dispatch(setsection(subItemName))
    // setActiveSection(subItemName)
    
    if (window.innerWidth < 750) {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <div className='relative'>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: 0 }}
        animate={{ 
          x: isMobileMenuOpen ? 0 : -280
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-13 h-full w-64 glass-effect border-r bg-gradient-to-t from-indigo-500 to-blue-500 border-white/20 z-50"
      >
        <div className="p-4 h-full overflow-y-auto">
          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === item.name
              
              return (
                <div key={item.name}>
                  <motion.button
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleItemClick(item.name)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                      isActive || (item.name === 'Settings' && isSettingsExpanded)
                        ? 'bg-white text-black shadow-lg'
                        : 'hover:bg-white/90 text-white hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 group-hover:text-black ${
                      isActive || (item.name === 'Settings' && isSettingsExpanded) 
                        ? 'text-black' 
                        : 'text-white'
                    }`} />
                    <span className="font-medium text-sm flex-1 text-left">{item.name}</span>
                    {item.name === 'Settings' && (
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isSettingsExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Settings Sub-items */}
                  {item.name === 'Settings' && (
                    <AnimatePresence>
                      {isSettingsExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="ml-4 mt-2 space-y-1 overflow-hidden"
                        >
                          {settingsSubItems.map((subItem, subIndex) => {
                            const SubIcon = subItem.icon
                            const isSubActive = activeSection === subItem.name
                            
                            return (
                              <motion.button
                                key={subItem.name}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: subIndex * 0.05 }}
                                onClick={() => handleSettingsSubItemClick(subItem.name)}
                                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 group ${
                                  isSubActive
                                    ? 'bg-white/20 text-white shadow-md'
                                    : 'hover:bg-white/10 text-white/80 hover:text-white'
                                }`}
                              >
                                <SubIcon className="w-4 h-4" />
                                <span className="text-sm font-medium flex-1 text-left">
                                  {subItem.name.split(' ')[0]}
                                </span>
                              </motion.button>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Desktop Sidebar Spacer */}
      <div className="hidden lg:block w-64 flex-shrink-0"></div>
    </div>
  )
}

export default Sidebar