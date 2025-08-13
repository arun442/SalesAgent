"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmailCampaignSettings from "./EmailCampaignSettings";
import LeadsTable from './LeadsTable';
// import LeadsDashboard from "../Leads/page";
 
const ProgressStepsPage = ({execId}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      id: "market_research",
      title: "Market Research",
      description: "Analyzing market trends and identifying target opportunities",
      content:
        "Conducting comprehensive market analysis to understand customer needs, competitor landscape, and market size. This phase involves data collection, trend analysis, and identifying potential market gaps.",
      icon: "📊"
    },
    {
      id: "lead_gen",
      title: "Lead Generation",
      description: "Generating and qualifying potential leads",
      content: null, // Will use component instead
      icon: "🎯",
      useComponent: true
    },
    // {
    //   id: "content",
    //   title: "Content Creation",
    //   description: "Creating engaging content for target audience",
    //   content:
    //     "Developing high-quality, relevant content that resonates with your target audience. This includes blog posts, social media content, email templates, and multimedia resources that drive engagement and conversions.",
    //   icon: "✏️"
    // },
    {
      id: "campaign_settings",
      title: "Campaign Settings",
      description: "",
      content: null, // Will use component instead
      icon: "⚙️",
      useComponent: true
    },
    {
      id: "outreach",
      title: "Outreach",
      description: "Executing outreach and engagement strategies",
      content:
        "Implementing multi-channel outreach strategies to connect with prospects. This includes email sequences, social media engagement, content distribution, and personalized communication workflows.",
      icon: "🚀"
    },
    {
      id: "tracking",
      title: "Tracking & Analytics",
      description: "Monitor performance and optimize campaigns",
      content:
        "Setting up comprehensive tracking systems to monitor campaign performance, analyze user behavior, and measure ROI. This includes implementing analytics tools, creating dashboards, and establishing KPIs for continuous optimization.",
      icon: "📈"
    },
  ];
 
  useEffect(() => {
    const randomStep = Math.floor(Math.random() * steps.length);
    setCurrentStep(randomStep);
  }, []);
 
  return (
    <div className="min-h-screen min-w-full bg-white p-4">
      <div className="w-full mx-auto">
        {/* First Row - Steps Navigation */}
        <div className="mb-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {steps.map((step, i) => {
              const isActive = i === currentStep;
              const isCompleted = i < currentStep;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative"
                >
                  <button
                    onClick={() => setCurrentStep(i)}
                    className={`w-full cursor-pointer text-center p-3 rounded-lg border transition-all duration-200 group ${isActive
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : isCompleted
                          ? 'bg-white text-black border-blue-200 shadow-sm'
                          : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200 hover:shadow-sm'
                      }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      {/* Step Number/Icon */}
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${isActive
                          ? 'bg-white text-blue-600'
                          : isCompleted
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                        {isCompleted ? (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            ✓
                          </motion.span>
                        ) : (
                          <span>{i + 1}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-xs leading-tight">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
        {/* Second Row - Active Step Content */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              {/* Detailed content */}
              {steps[currentStep].useComponent ? (
                <div className="min-h-80 ">
                  {steps[currentStep].id === 'lead_gen' && <LeadsTable execId={execId} />}
                  {steps[currentStep].id === 'campaign_settings' && <EmailCampaignSettings />}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {steps[currentStep].content}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
export default ProgressStepsPage;