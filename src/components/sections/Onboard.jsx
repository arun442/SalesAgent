

// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Building2,
//   Target,
//   Brain,
//   ArrowRight,
//   ArrowLeft,
//   X,
//   Check,
//   Sparkles,
//   HelpCircle,
// } from "lucide-react";
// import CompanyForm from "../../components/forms/CompanyForm";
// import ProductServices from "../forms/ProductService";
// import CompetitiveContextForm from "../forms/Competetive";
// import Complaince from '../forms/Complaince'
// import { useOnboarding } from "../../app/context/onboardingContext";
// import { axiosPublic } from "@/app/api/constant";
// import { toast } from "react-toastify";
// export default function LightStepperOnboarding() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isLoading, setLoading] = useState(false);
// const {
//   formData,
//   completeOnboarding,
//   resetOnboarding
// } = useOnboarding();
//   const steps = [
//     {
//       number: 1,
//       title: "Organization",
//       subtitle: "Organization information",
//       icon: Building2,
//       active: currentStep === 1,
//       completed: currentStep > 1,
//     },
//     {
//       number: 2,
//       title: "Product Services",
//       subtitle: "Product information",
//       icon: Target,
//       active: currentStep === 2,
//       completed: currentStep > 2,
//     },
//     {
//       number: 3,
//       title: "Competitive Context",
//       subtitle: "Competitive information",
//       icon: Brain,
//       active: currentStep === 3,
//       completed: currentStep > 3,
//     },
//      {
//       number: 4,
//       title: "Compliance Settings",
//       subtitle: "Settings setup",
//       icon: Brain,
//       active: currentStep === 4,
//       completed: currentStep > 4,
//     },
//   ];

//   const [formErrors, setFormErrors] = useState({});

//   const validateStep1 = () => {
//     const errors = {};
//     const data = formData.organizationData || {};

//     if (!data.company_name?.trim()) {
//       errors.company_name = 'Company name is required';
//     }

//     // const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}([\/\w\-._~:?#[\]@!$&'()*+,;=]*)?$/;
//     // if (!data.company_website?.trim()) {
//     //   errors.company_website = 'Company website is required';
//     // } else if (!urlRegex.test(data.company_website)) {
//     //   errors.company_website = 'Enter a valid website URL';
//     // }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleNext = async () => {
//     if (currentStep === 1 && !validateStep1()) return;

//     setLoading(true);
//     await new Promise((resolve) => setTimeout(resolve, 800));
//     setLoading(false);

//     setCurrentStep(currentStep + 1);
//   };

//   const handlePrev = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

// // const handleComplete = async () => {
// //   setLoading(true);
// //   await new Promise((resolve) => setTimeout(resolve, 2000));
// //   setLoading(false);
 
// //   console.log(formData);

// //   try {
// //     const res = await axiosPublic.post('/onboarding/create-onboarding-data', formData,
// //        {
// //     headers: {
// //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiZGhhYW51QGV4YW1wbGUuY29tbSIsInJvbGVJZCI6NSwiZmlyc3ROYW1lIjoiRGhhYW51IiwiaWF0IjoxNzU0NDgwNjExLCJleHAiOjE3NTUwODU0MTF9.3Q_vMZKM6N2PzDUQBEdvfwKfMiWShKLg2eFgxlZAn8Q`,
// //     },}
// //     );
// //      toast.success("Onboarding completed!");
// //     console.log(res);
// //   } catch (error) {
// //     toast.error("Error submitting onboarding data:", error.message);
// //     console.error("Full error:", error);
// //   }
// // };


// const handleComplete = async () => {
//   setLoading(true);
//   await new Promise((resolve) => setTimeout(resolve, 2000));
//   setLoading(false);

//   console.log(formData);

//   try {
//     const res = await axiosPublic.post('/onboarding/create-onboarding-data', formData, {
//       headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     });

//     toast.success("Onboarding completed!");
//     console.log(res);

//     completeOnboarding(); 
//     resetOnboarding();     
//     setCurrentStep(1);    

//   } catch (error) {
//     toast.error("Error submitting onboarding data");
//     console.error("Full error:", error);
//   }
// };



//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="bg-white p-8 text-black">
//             {/* <div className="mb-8">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
//                   <Building2 className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">Company & Product Overview</h2>
//                   <p className="text-gray-600 text-sm">Tell us about your business</p>
//                 </div>
//               </div>
//             </div> */}
//             <CompanyForm errors={formErrors}/>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="bg-white p-8 ">
//             {/* <div className="mb-8">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
//                   <Target className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">Target Market & Goals</h2>
//                   <p className="text-gray-600 text-sm">Define your ideal customers</p>
//                 </div>
//               </div>
//             </div> */}
//             <ProductServices />
//           </div>
//         );
//       case 3:
//         return (
//           <div className="bg-white  p-8 text-black">
//             {/* <div className="mb-8">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
//                   <Brain className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">Market Intelligence & Setup</h2>
//                   <p className="text-gray-600 text-sm">Configure your AI assistant</p>
//                 </div>
//               </div>
//             </div> */}
//             <CompetitiveContextForm />
//           </div>
//         );

//          case 4:
//         return (
//           <div className="bg-white  p-8 text-black">
//             {/* <div className="mb-8">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
//                   <Brain className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">Market Intelligence & Setup</h2>
//                   <p className="text-gray-600 text-sm">Configure your AI assistant</p>
//                 </div>
//               </div>
//             </div> */}
//             <Complaince />
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 overflow-hidden">
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-2">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Brain className="w-8 h-8 text-blue-500" />
//               <span className="text-xl font-bold text-gray-900">
//                 AI Sales Agent
//               </span>
//             </div>
//             <button className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100">
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-center items-start overflow-hidden">
//         <div className="w-72 bg-white p-6 border-r border-gray-200">
//           <div className="space-y-16">
//             {steps.map((step, index) => (
//               <div key={index} className="relative">
//                 <div
//                   className={`flex items-center space-x-4 p-2 rounded-2xl transition-all duration-300 ${
//                     step.completed
//                       ? "bg-green-50 border border-green-200"
//                       : step.active
//                       ? "bg-blue-50 border border-blue-200"
//                       : "bg-gray-50 border border-gray-200"
//                   }`}
//                 >
//                   <div className="relative">
//                     {index < steps.length - 1 && (
//                       <div
//                         className={`absolute top-full left-1/2 transform -translate-x-1/2 w-px h-32 z-0 transition-colors duration-300 ${
//                           step.completed ? "bg-green-300" : "bg-gray-200"
//                         }`}
//                       />
//                     )}

//                     <div
//                       className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 ${
//                         step.completed
//                           ? "bg-green-500 text-white"
//                           : step.active
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-200 text-gray-600"
//                       }`}
//                     >
//                       {step.completed ? (
//                         <Check className="w-6 h-6" />
//                       ) : (
//                         <span className="text-sm">{step.number}</span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex-1">
//                     <div
//                       className={`text-xs transition-colors duration-300 ${
//                         step.completed || step.active
//                           ? "text-gray-900"
//                           : "text-gray-500"
//                       }`}
//                     >
//                       STEP {step.number} {":"} {step.title}
//                     </div>
//                     <div
//                       className={`text-xs transition-colors duration-300 ${
//                         step.completed || step.active
//                           ? "text-gray-600"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       {step.subtitle}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-200">
//             <div className="flex items-start space-x-3">
//               <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5" />
//               <div>
//                 <p className="text-sm font-medium text-blue-900">Having troubles?</p>
//                 <button className="text-sm cursor-pointer text-blue-600 hover:text-blue-800 underline">
//                   Contact us
//                 </button>
//               </div>
//             </div>
//           </div> */}
//         </div>

//         <div className="flex-1 ">
//           <div className="max-w-3xl ">
//             {renderStepContent()}

//             <div className="flex justify-between items-center pl-8 pr-8">
//               <button
//                 onClick={handlePrev}
//                 disabled={currentStep === 1}
//                 className="flex items-center cursor-pointer text-sm space-x-2 px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//                 <span>Previous</span>
//               </button>

//               <button
//                 onClick={currentStep === 4 ? handleComplete : handleNext}
//                 disabled={isLoading}
//                 className="flex items-center cursor-pointer text-sm space-x-2 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     <span>Processing...</span>
//                   </>
//                 ) : currentStep === 4 ? (
//                   <>
//                     <span>Submit</span>
//                     <Sparkles className="w-5 h-5" />
//                   </>
//                 ) : (
//                   <>
//                     <span>Next</span>
//                     <ArrowRight className="w-5 h-5" />
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Target,
  Brain,
  ArrowRight,
  ArrowLeft,
  X,
  Check,
  Sparkles,
  HelpCircle,
  Plus,
  Calendar,
  Globe,
  Users,
  ArrowLeft as BackArrow
} from "lucide-react";
import CompanyForm from "../../components/forms/CompanyForm";
import ProductServices from "../forms/ProductService";
import CompetitiveContextForm from "../forms/Competetive";
import Complaince from '../forms/Complaince';
import { useOnboarding } from "@/app/context/onboardingContext";
import { toast } from "react-toastify";
import { axiosPublic } from "@/app/api/constant";


export default function OrganizationDashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const {
  formData,
  completeOnboarding,
  resetOnboarding
} = useOnboarding();


async function getOrganizationDetails(){
  await axiosPublic.get("onboarding/get-organizations",
      {headers:
      {Authorization : `Bearer ${localStorage.getItem("token")}`}})
    .then(res =>{
      setOrganizations(res.data.organizations);
    })
    .catch(err =>{
      console.log(err);
    }
    )
}

useEffect(()=>{
 getOrganizationDetails();
},[]);


  const steps = [
    {
      number: 1,
      title: "Organization",
      subtitle: "Organization information",
      icon: Building2,
      active: currentStep === 1,
      completed: currentStep > 1,
    },
    {
      number: 2,
      title: "Product Services",
      subtitle: "Product information",
      icon: Target,
      active: currentStep === 2,
      completed: currentStep > 2,
    },
    {
      number: 3,
      title: "Competitive Context",
      subtitle: "Competitive information",
      icon: Brain,
      active: currentStep === 3,
      completed: currentStep > 3,
    },
    {
      number: 4,
      title: "Compliance Settings",
      subtitle: "Settings setup",
      icon: Brain,
      active: currentStep === 4,
      completed: currentStep > 4,
    },
  ];

  const [formErrors, setFormErrors] = useState({});

   const validateStep1 = () => {
    const errors = {};
    const data = formData.organizationData || {};

    if (!data.company_name?.trim()) {
      errors.company_name = 'Company name is required';
    }

    // const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}([\/\w\-._~:?#[\]@!$&'()*+,;=]*)?$/;
    // if (!data.company_website?.trim()) {
    //   errors.company_website = 'Company website is required';
    // } else if (!urlRegex.test(data.company_website)) {
    //   errors.company_website = 'Enter a valid website URL';
    // }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = async () => {
    if (currentStep === 1 && !validateStep1()) return;
    
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

 const handleComplete = async () => {
  setLoading(true);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  setLoading(false);

  console.log(formData);

  try {
    const res = await axiosPublic.post('/onboarding/create-onboarding-data', formData, {
      headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    toast.success("Onboarding completed!");
    console.log(res);

    completeOnboarding(); 
    resetOnboarding();     
    setCurrentStep(1);  
    getOrganizationDetails();  
    setShowAddForm(false);

  } catch (error) {
    toast.error("Error submitting onboarding data");
    console.error("Full error:", error);
  }
};

  const handleBackToDashboard = () => {
    setShowAddForm(false);
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white p-4 sm:p-8 text-black">
            <CompanyForm errors={formErrors}/>
          </div>
        );
      case 2:
        return (
          <div className="bg-white p-4 sm:p-8">
            <ProductServices />
          </div>
        );
      case 3:
        return (
          <div className="bg-white p-4 sm:p-8 text-black">
            <CompetitiveContextForm />
          </div>
        );
      case 4:
        return (
          <div className="bg-white p-4 sm:p-8 text-black">
            <Complaince />
          </div>
        );
      default:
        return null;
    }
  };

  const OrganizationCard = ({ org }) => (
    <div className="bg-white rounded-lg shadow-md border corner-accent border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
      <div className=" sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{org.company_name}</h3>
            </div>
          </div>
          
          {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <a href={org.website} target="_blank" rel="noopener noreferrer" 
                 className="text-blue-600 hover:underline truncate">
                {org.website}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{org.employees} employees</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Created {org.createdAt}</span>
            </div>
          </div> */}
        </div>
        
        <div className="flex gap-2">
          <button className="px-3 py-2 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Edit
          </button>
          <button className="px-3 py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-12 sm:py-16">
      <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Building2 className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-sm font-semibold text-gray-900 mb-2">No organizations found</h3>
      <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
        Get started by creating your first organization to begin managing your projects.
      </p>
      <button
        onClick={() => setShowAddForm(true)}
        className="inline-flex items-center text-sm px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create Organization
      </button>
    </div>
  );

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-gray-50 overflow-hidden">
        {/* Header for form */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleBackToDashboard}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-2"
                >
                  <BackArrow className="w-5 h-5 text-gray-600" />
                </button>
                <Brain className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-bold text-gray-900">
                  Create Organization
                </span>
              </div>
              <button 
                onClick={handleBackToDashboard}
                className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-start overflow-hidden">
          {/* Sidebar */}
          <div className="hidden lg:block w-72 bg-white p-6 border-r border-gray-200 min-h-screen">
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div
                    className={`flex items-center space-x-4 p-2 rounded-2xl transition-all duration-300 ${
                      step.completed
                        ? "bg-green-50 border border-green-200"
                        : step.active
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div className="relative">
                      {index < steps.length - 1 && (
                        <div
                          className={`absolute top-full left-1/2 transform -translate-x-1/2 w-px h-32 z-0 transition-colors duration-300 ${
                            step.completed ? "bg-green-300" : "bg-gray-200"
                          }`}
                        />
                      )}

                      <div
                        className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 ${
                          step.completed
                            ? "bg-green-500 text-white"
                            : step.active
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step.completed ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <span className="text-sm">{step.number}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          step.completed || step.active
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        STEP {step.number}: {step.title}
                      </div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          step.completed || step.active
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        {step.subtitle}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile steps indicator */}
          <div className="lg:hidden w-full bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Step {currentStep} of {steps.length}</span>
              <span className="font-medium">{steps[currentStep - 1]?.title}</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form content */}
          <div className="flex-1 lg:max-w-3xl">
            {renderStepContent()}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 sm:px-8">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="w-full sm:w-auto flex items-center justify-center text-xs space-x-2 px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              <button
                onClick={currentStep === 4 ? handleComplete : handleNext}
                disabled={isLoading}
                className="w-full sm:w-auto flex items-center justify-center text-xs space-x-2 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : currentStep === 4 ? (
                  <>
                    <span>Submit</span>
                    <Sparkles className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Dashboard Header */}
        <div className={`bg-white rounded-lg shadow-lg border border-gray-200 py-4 px-3 sm:px-6 mb-6 transition-all duration-500 ${showAddForm ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-md sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Organizations Dashboard
              </h1>
              <p className="text-gray-600 mt-1 text-xs sm:text-sm">Manage and track your projects by organization</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center justify-center px-4 py-3 text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Organization
            </button>
          </div>
        </div>

        {/* Organizations List */}
        <div className={`transition-all duration-500 ${showAddForm ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
          {organizations.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {organizations.map((org) => (
                <OrganizationCard key={org.id} org={org} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}