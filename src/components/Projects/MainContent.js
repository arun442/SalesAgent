// "use client"
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import EmailCampaignSettings from "./EmailCampaignSettings";
// import LeadsTable from './LeadsTable';
// import { axiosPublic } from "@/app/api/constant";
// import MarketAnalysis from './MarketAnalysisReport';
// import TrackTable from './TrackerTable';
 
// const ProgressStepsPage = ({execId,step}) => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [enabledSteps, setEnabledSteps] = useState(new Set()); // No steps enabled by default
//   const [executionStatus, setExecutionStatus] = useState(null);
//   const [activeProcessStep, setActiveProcessStep] = useState(null); // Track which step is currently processing
 

//   const statusToStepMap = {
//       'active': 0,           // Market research is starting/in progress
//       'Market Research': 0,  // Market research completed, lead gen starting
//       'Lead Generation': 1,         // Lead gen completed, campaign settings starting
//       'Campaign Strategy': 2,
//       'Outreach': 3,  // Campaign settings completed, tracking starting      // Tracking completed
//     };  

//     useEffect(()=>{
//         setCurrentStep(statusToStepMap[step] || 0);
//     },[step]);

//   const steps = [
//     {
//       id: "market_research",
//       title: "Market Research",
//       description: "Analyzing market trends and identifying target opportunities",
//       content:null,
//       useComponent: true,
//       icon: "📊",
//       statusKey: "Market Research" // Maps to API status
//     },
//     {
//       id: "lead_gen",
//       title: "Lead Generation",
//       description: "Generating and qualifying potential leads",
//       content: null,
//       icon: "🎯",
//       useComponent: true,
//       statusKey: "Lead Generation"
//     },
//     {
//       id: "campaign_settings",
//       title: "Campaign Settings",
//       description: "",
//       content: null,
//       icon: "⚙️",
//       useComponent: true,
//       statusKey: "Campaign Strategy"
//     },
//     {
//       id: "outreach",
//       title: "Outreach",
//       description: "",
//       content: null,
//       icon: "⚙️",
//       useComponent: true,
//       statusKey: "Outreach"
//     },
//     // {
//     //   id: "tracking",
//     //   title: "Tracking & Analytics",
//     //   description: "Monitor performance and optimize campaigns",
//     //   content:
//     //     null,
//     //   icon: "📈",
//     //   useComponent: true,
//     //   statusKey: "tracking"
//     // },
//   ];
 
//   // Function to determine which steps should be enabled based on status
//   const updateEnabledSteps = (status) => {
//     // Map status to step indices
    
   
//     const currentStatusIndex = statusToStepMap[status];
   
//     if (currentStatusIndex !== undefined) {
//       // Set which step is currently being processed
//       setActiveProcessStep(currentStatusIndex);
     
//       // Enable all completed steps + current processing step
//       setEnabledSteps(prevEnabled => {
//         const newEnabledSteps = new Set(prevEnabled);
       
//         // Enable all steps up to and including the current processing step
//         for (let i = 0; i <= currentStatusIndex; i++) {
//           newEnabledSteps.add(i);
//         }
       
//         return newEnabledSteps;
//       });
     
//       // Auto-navigate to the currently processing step
//       // setCurrentStep(currentStatusIndex);
//     }
//   };
 
//   // Fetch execution status every 5 seconds
//   useEffect(() => {
//     let intervalId;
   
//     const fetchStatus = () => {
//       if (execId) {
//         axiosPublic.get(`project/execution-status/${execId}`)
//           .then(res => {

//             if(res.data.status === "Outreach"){
//                  clearInterval(intervalId);
//             }
//             console.log('Status update:', res.data);
//             setExecutionStatus(res.data.status);
           
//             // Assuming the response has a 'status' field
//             if (res.data && res.data.status) {
//               updateEnabledSteps(res.data.status);
//             }
            
//           })
//           .catch(error => {
//             console.error('Error fetching execution status:', error);
//           });
//       }
//     };
   
//     // Initial fetch
//     fetchStatus();
   
//     // Set up interval for polling every 5 seconds
//     intervalId = setInterval(fetchStatus, 5000);
    
   
//     // Cleanup interval on component unmount
//     return () => {
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);
 
//   // Handle step click - only allow if step is enabled
//   const handleStepClick = (stepIndex) => {
//     if (enabledSteps.has(stepIndex)) {
//       setCurrentStep(stepIndex);
//     }
//   };
 
//   return (
//     <div className="min-h-screen min-w-full bg-white p-4">
//       <div className="w-full mx-auto">
//         {/* First Row - Steps Navigation */}
//         <div className="mb-1">
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//             {steps.map((step, i) => {
//               const isActive = i === currentStep;
//               const isCompleted = enabledSteps.has(i) && i < activeProcessStep;
//               const isProcessing = i === activeProcessStep;
//               const isEnabled = enabledSteps.has(i);
//               const isDisabled = !isEnabled;
             
//               return (
//                 <motion.div
//                   key={step.id}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.05 }}
//                   className="relative"
//                 >
//                   <button
//                     onClick={() => handleStepClick(i)}
//                     disabled={isDisabled}
//                     className={`w-full text-center p-3 rounded-lg border transition-all duration-200 group ${
//                       isDisabled
//                         ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
//                         : isProcessing
//                           ? 'bg-yellow-500 text-white border-yellow-500 shadow-md cursor-pointer animate-pulse'
//                           : isActive
//                             ? 'bg-green-500 text-white border-2 border-black shadow-md cursor-pointer'
//                             : isCompleted
//                               ? 'bg-green-500 text-white border-green-500 shadow-sm cursor-pointer'
//                               : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200 hover:shadow-sm cursor-pointer'
//                     }`}
//                   >
//                     <div className="flex flex-col items-center space-y-2">
//                       {/* Step Number/Icon */}
//                       <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
//                         isDisabled
//                           ? 'bg-gray-200 text-gray-400'
//                           : isProcessing
//                             ? 'bg-white text-yellow-500'
//                             : isActive
//                               ? 'bg-white text-blue-600'
//                               : isCompleted
//                                 ? 'bg-white text-green-500'
//                                 : 'bg-gray-100 text-gray-500'
//                       }`}>
//                         {isProcessing ? (
//                           <motion.div
//                             animate={{ rotate: 360 }}
//                             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                           >
//                             ⟳
//                           </motion.div>
//                         ) : isCompleted ? (
//                           <motion.span
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                           >
//                             ✓
//                           </motion.span>
//                         ) : (
//                           <span>{i + 1}</span>
//                         )}
//                       </div>
//                       <div className="min-w-0">
//                         <h3 className="font-semibold text-xs leading-tight">
//                           {step.title}
//                         </h3>
//                         {isProcessing && (
//                           <p className="text-xs opacity-90 mt-1">In Progress...</p>
//                         )}
//                       </div>
//                     </div>
//                   </button>
                 
//                   {/* Lock icon for disabled steps */}
//                   {isDisabled && (
//                     <div className="absolute top-1 right-1 bg-gray-300 rounded-full p-1">
                    //   <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    //     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    //   </svg>
//                     </div>
//                   )}
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
       
//         {/* Second Row - Active Step Content */}
//         <div className="w-full">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentStep}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//               className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
//             >
//               {/* Detailed content */}
//               {steps[currentStep]?.useComponent ? (
//                 <div className="min-h-80">
//                   {steps[currentStep].id === 'lead_gen' && <LeadsTable execId={execId} curStatus={executionStatus} />}
//                   {steps[currentStep].id === 'campaign_settings' && <EmailCampaignSettings execId={execId} curStatus={executionStatus}/>}
//                   {steps[currentStep].id === 'market_research' && <MarketAnalysis execId={execId} curStatus={executionStatus} />}
//                   {steps[currentStep].id === 'outreach' && <TrackTable execId={execId} curStatus={executionStatus} />}
//                 </div>
//               ) : (
//                 <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
//                   <p className="text-gray-700 leading-relaxed text-sm">
//                     {steps[currentStep].content}
//                   </p>
//                 </div>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default ProgressStepsPage;
 

"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmailCampaignSettings from "./EmailCampaignSettings";
import LeadsTable from './LeadsTable';
import { axiosPublic } from "@/app/api/constant";
import MarketAnalysis from './MarketAnalysisReport';
import TrackTable from './TrackerTable';
 
const ProgressStepsPage = ({execId,step}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [enabledSteps, setEnabledSteps] = useState(new Set()); // No steps enabled by default
  const [executionStatus, setExecutionStatus] = useState(null);
  const [activeProcessStep, setActiveProcessStep] = useState(null); // Track which step is currently processing
  const [marketResearchSubSteps, setMarketResearchSubSteps] = useState(new Set()); // Track completed sub-steps
 
  // Market research sub-steps mapping
  const marketResearchSteps = [
    'market_segment updated',
    'market_context updated',
    'client_org_research updated', 
    'prospect_research updated',
    'target_org_research updated'
  ];

  const statusToStepMap = {
      'active': 0,           // Market research is starting/in progress
      'market_context updated': 0,
      'client_org_research updated': 0,
      'prospect_research updated': 0,
      'market_segment updated': 0,
      'target_org_research updated': 0,
      'Market Research': 1,  // Market research completed, lead gen starting
      'Lead Generation': 2,         // Lead gen completed, campaign settings starting
      'Campaign Strategy': 3,
      'Outreach': 3,  // Outreach maps to the last step (index 3)
    };  

    useEffect(()=>{
        setCurrentStep(statusToStepMap[step] || 0);
    },[step]);

  const steps = [
    {
      id: "market_research",
      title: "Market Research",
      description: "Analyzing market trends and identifying target opportunities",
      content:null,
      useComponent: true,
      icon: "📊",
      statusKey: "Market Research" // Maps to API status
    },
    {
      id: "lead_gen",
      title: "Lead Generation",
      description: "Generating and qualifying potential leads",
      content: null,
      icon: "🎯",
      useComponent: true,
      statusKey: "Lead Generation"
    },
    {
      id: "campaign_settings",
      title: "Campaign Settings",
      description: "",
      content: null,
      icon: "⚙️",
      useComponent: true,
      statusKey: "Campaign Strategy"
    },
    {
      id: "outreach",
      title: "Outreach",
      description: "",
      content: null,
      icon: "⚙️",
      useComponent: true,
      statusKey: "Outreach"
    },
  ];
 
  // Function to determine which steps should be enabled based on status
  const updateEnabledSteps = (status) => {
    const currentStatusIndex = statusToStepMap[status];
   
    if (currentStatusIndex !== undefined) {
      // Handle market research sub-steps
      if (marketResearchSteps.includes(status)) {
        setMarketResearchSubSteps(prev => {
          const newSubSteps = new Set(prev);
          const stepIndex = marketResearchSteps.indexOf(status);
          // Add all completed sub-steps up to current one
          for (let i = 0; i <= stepIndex; i++) {
            newSubSteps.add(marketResearchSteps[i]);
          }
          return newSubSteps;
        });
        setActiveProcessStep(0); // Market research is processing
        setEnabledSteps(prev => new Set([...prev, 0]));
      } else {
        // Clear market research sub-steps when moving beyond market research
        if (status === 'Market Research') {
          setMarketResearchSubSteps(new Set());
        }
        
        // Set which step is currently being processed
        setActiveProcessStep(currentStatusIndex);
       
        // Enable all completed steps + current processing step
        setEnabledSteps(prevEnabled => {
          const newEnabledSteps = new Set(prevEnabled);
         
          // Enable all steps up to and including the current processing step
          for (let i = 0; i <= currentStatusIndex; i++) {
            newEnabledSteps.add(i);
          }
         
          return newEnabledSteps;
        });
      }
    }
  };
 
  // Fetch execution status every 5 seconds
  useEffect(() => {
    let intervalId;
   
    const fetchStatus = () => {
      if (execId) {
        axiosPublic.get(`project/execution-status/${execId}`)
          .then(res => {

            if(res.data.status === "Outreach"){
                 clearInterval(intervalId);
            }
            console.log('Status update:', res.data);
            setExecutionStatus(res.data.status);
           
            // Assuming the response has a 'status' field
            if (res.data && res.data.status) {
              updateEnabledSteps(res.data.status);
            }
            
          })
          .catch(error => {
            console.error('Error fetching execution status:', error);
          });
      }
    };
   
    // Initial fetch
    fetchStatus();
   
    // Set up interval for polling every 5 seconds
    intervalId = setInterval(fetchStatus, 5000);
   
    // Cleanup interval on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);
 
  // Handle step click - only allow if step is enabled
  const handleStepClick = (stepIndex) => {
    if (enabledSteps.has(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  // Helper function to determine step state
  const getStepState = (stepIndex) => {
    const isEnabled = enabledSteps.has(stepIndex);
    const isActive = stepIndex === currentStep;
    
    // Special handling for market research
    if (stepIndex === 0) {
      const hasMarketResearchSubSteps = marketResearchSubSteps.size > 0;
      const isMarketResearchComplete = executionStatus === 'Market Research' || statusToStepMap[executionStatus] > 0;
      
      if (executionStatus === 'Outreach') {
        return { state: 'completed', isEnabled: true };
      } else if (isMarketResearchComplete && !hasMarketResearchSubSteps) {
        return { state: 'completed', isEnabled: true };
      } else if (hasMarketResearchSubSteps || (isEnabled && marketResearchSteps.includes(executionStatus))) {
        return { state: 'processing', isEnabled: true };
      } else if (!isEnabled) {
        return { state: 'disabled', isEnabled: false };
      }
    }
    
    // Handle other steps
    if (executionStatus === 'Outreach') {
      return { state: 'completed', isEnabled: true };
    } else if (stepIndex === activeProcessStep) {
      return { state: 'processing', isEnabled: true };
    } else if (enabledSteps.has(stepIndex) && stepIndex < activeProcessStep) {
      return { state: 'completed', isEnabled: true };
    } else if (isEnabled) {
      return { state: 'enabled', isEnabled: true };
    } else {
      return { state: 'disabled', isEnabled: false };
    }
    
    return { state: 'enabled', isEnabled };
  };
 
  return (
    <div className="min-h-screen min-w-full bg-white p-4">
      <div className="w-full mx-auto">
        {/* First Row - Steps Navigation */}
        <div className="mb-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {steps.map((step, i) => {
              const { state, isEnabled } = getStepState(i);
              const isActive = i === currentStep;
              const isCompleted = state === 'completed';
              const isProcessing = state === 'processing';
              const isDisabled = !isEnabled;
             
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative"
                >
                  <button
                    onClick={() => handleStepClick(i)}
                    disabled={isDisabled}
                    className={`w-full text-center p-3 rounded-lg border transition-all duration-200 group ${
                      isDisabled
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                        : isProcessing
                          ? 'bg-yellow-500 text-white border-yellow-500 shadow-md cursor-pointer animate-pulse'
                          : isActive
                            ? 'bg-green-500 text-white border-2 border-black shadow-md cursor-pointer'
                            : isCompleted
                              ? 'bg-green-500 text-white border-green-500 shadow-sm cursor-pointer'
                              : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200 hover:shadow-sm cursor-pointer'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      {/* Step Number/Icon */}
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        isDisabled
                          ? 'bg-gray-200 text-gray-400'
                          : isProcessing
                            ? 'bg-white text-yellow-500'
                            : isActive
                              ? 'bg-white text-blue-600'
                              : isCompleted
                                ? 'bg-white text-green-500'
                                : 'bg-gray-100 text-gray-500'
                      }`}>
                        {isProcessing ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            ⟳
                          </motion.div>
                        ) : isCompleted ? (
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
                        {isProcessing && (
                          <p className="text-xs opacity-90 mt-1">In Progress...</p>
                        )}
                      </div>
                    </div>

                    {/* Market Research Sub-step Dots */}
                    {i === 0 && marketResearchSubSteps.size > 0 && (
                      <div className="flex justify-center space-x-1 mt-2">
                        {marketResearchSteps.map((subStep, subIndex) => (
                          <div
                            key={subStep}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              marketResearchSubSteps.has(subStep)
                                ? 'bg-white'
                                : 'bg-yellow-300 opacity-50'
                            }`}
                          >
                            {marketResearchSubSteps.has(subStep) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-full h-full rounded-full bg-green-500 flex items-center justify-center"
                              >
                                <span className="text-white text-xs font-bold">✓</span>
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                 
                  {/* Lock icon for disabled steps */}
                  {isDisabled && (
                    <div className="absolute top-1 right-1 bg-gray-300 rounded-full p-1">
                      <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
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
              {steps[currentStep]?.useComponent ? (
                <div className="min-h-80">
                  {steps[currentStep].id === 'lead_gen' && <LeadsTable execId={execId} curStatus={executionStatus} />}
                  {steps[currentStep].id === 'campaign_settings' && <EmailCampaignSettings execId={execId} curStatus={executionStatus}/>}
                  {steps[currentStep].id === 'market_research' && <MarketAnalysis execId={execId} curStatus={executionStatus} />}
                  {steps[currentStep].id === 'outreach' && <TrackTable execId={execId} curStatus={executionStatus} />}
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