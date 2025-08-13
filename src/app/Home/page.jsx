'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import MainContent from '@/components/MainContent/MainContent'
import { useDispatch } from 'react-redux'
import { setsection } from '../redux/sectionslice'

export default function Home() {
  const [activeSection, setActiveSection] = useState('Dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true)
  const dispatch = useDispatch();
  useEffect(()=>{
    const org_id = JSON.parse(localStorage.getItem("orgId"));
    if(org_id === null){
       dispatch(setsection("Onboard"))
    }
  },[]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex pt-16">
        <AnimatePresence>
          <Sidebar 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </AnimatePresence>
        
        <MainContent 
          activeSection={activeSection}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </div>
    </div>
  )
}