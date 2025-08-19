'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import MainContent from '@/components/Projects/MainContent';
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const [activeSection, setActiveSection] = useState('Dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true)
  const router = useRouter();
  const params = useSearchParams();

  const execId = params.get("execId");
  const curStep = params.get("step");



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className='pt-20 pl-4 text-black'>
        <button className='flex gap-2 text-sm' onClick={()=> router.back()}>
        <ArrowLeft className='border-2 w-5 h-5 border-black rounded-full' />
        Back
        </button>
      </div>
      
      <div className="flex pt-2">
        {/* <AnimatePresence>
          <Sidebar 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </AnimatePresence> */}
        <MainContent execId={execId} step={curStep} />
      </div>
    </div>
  )
}