'use client'

import { motion } from 'framer-motion'
import Dashboard from '../sections/Dashboard'
import Onboard from '../sections/Onboard'
import Lead from '../sections/Lead'
import Campaign from '../sections/Campaign'
import MarketAnalysis from '../sections/marketAnalysis'
import Settings from '../sections/Settings'
import EmailSettingsComponent from '../EmailSettings'
import Projects from '../sections/Projects';

interface MainContentProps {
  activeSection: string
  isMobileMenuOpen: boolean
}

const MainContent = ({ activeSection, isMobileMenuOpen }: MainContentProps) => {
  const renderSection = () => {
    switch (activeSection) {
      case 'Dashboard':
        return <Dashboard />
      case 'Onboard':
        return <Onboard />
      case 'Lead':
        return <Lead />
      case 'Campaign':
        return <Campaign />
      case 'MarketAnalysis':
        return <MarketAnalysis />
      case 'Communication Settings':
        return <EmailSettingsComponent />
      case 'Projects':
        return <Projects />
      default:
        return <Dashboard />
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex-1 p-4 lg:p-6 transition-all duration-300 ${
        isMobileMenuOpen ? 'lg:ml-0' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {renderSection()}
      </div>
    </motion.main>
  )
}

export default MainContent