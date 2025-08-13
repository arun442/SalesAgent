'use client'
import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import  {setsection}  from '../../redux/sectionslice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'; // <-- Correct for App Router
export default function OAuthCallback() {
  const router=useRouter()
  const dispatch=useDispatch();
  const [status, setStatus] = useState('processing'); // processing, success, error
  const [countdown, setCountdown] = useState(10);
  const [state,setstate]=useState('')

  useEffect(() => {
    // Extract URL parameters
    const urlParams = new URLSearchParams(window.location.search);
        const states = urlParams.get('provider');
    const status = urlParams.get('status');

    // Simulate OAuth processing
    const processOAuth = async () => {
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (states) {
    console.log(states,status);
    
      setstate(states)
          setStatus(status); 
          // Start countdown for auto-redirect
          const timer = setInterval(() => {
            setCountdown(prev => {
              if (prev <= 1) {
                clearInterval(timer);
                // dispatch(setsection('Communication Settings'))
if (status=='success') {
                  router.push('/Home')
}
                
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          
          return () => clearInterval(timer);
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    processOAuth();
  }, []);

  const handleManualRedirect = () => {
    // In real Next.js app, use: router.push('/dashboard')
                router.push('/Home')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
          {status === 'processing' && (
            <>
              <div className="mb-6">
                <Loader2 className="w-16 h-16 text-blue-500 mx-auto animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-3">
                Completing Sign In
              </h1>
              <p className="text-gray-600 mb-6">
                Please wait while we securely process your {state} authentication...
              </p>
              <div className="flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mb-6">
                <div className="relative">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-20"></div>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-3">
                Welcome Back!
              </h1>
              <p className="text-gray-600 mb-6">
                You've successfully configure in with {state}. Redirecting to your dashboard in {countdown} seconds...
              </p>
              
              <button
                onClick={handleManualRedirect}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
              >
                <span>Continue to Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mb-6">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-3">
                Authentication Failed
              </h1>
              <p className="text-gray-600 mb-6">
                There was an issue processing your {state} configure. Please try again.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() =>{dispatch(setsection('Communication Settings')),router.push('/Home')}}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Try Again
                </button>
                <button
                  onClick={handleManualRedirect}
                  className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  Go to Dashboard
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Secured by {state} OAuth 2.0
          </p>
        </div>

        {/* Floating Decorative Elements */} 
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
}