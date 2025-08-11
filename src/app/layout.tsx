import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import ReduxProvider from '../app/redux/reduxprovider';
import {OnboardingProvider} from '../app/context/onboardingContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sales Agent',
  description: 'A beautiful and responsive dashboard application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <ReduxProvider>
      <body className={inter.className}>
        <ToastContainer />
        <OnboardingProvider >
        {children}
        </OnboardingProvider>
        </body>
        </ReduxProvider>
    </html>
  )
}