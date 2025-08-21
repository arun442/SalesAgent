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
  Cpu,
  Zap,
  TrendingUp,
  Shield,
  Settings,
  ChevronRight,
  Eye,
  Edit
} from "lucide-react";
import CompanyForm from "../../components/forms/CompanyForm";
import ProductServices from "../forms/ProductService";
import CompetitiveContextForm from "../forms/Competetive";
import Complaince from '../forms/Complaince';
import { useOnboarding } from "@/app/context/onboardingContext";
import { toast } from "react-toastify";
import { axiosPublic } from "@/app/api/constant";

const AILoadingOverlay = ({ isVisible }) => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-8 shadow-2xl border border-gray-100 max-w-md mx-4">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center relative overflow-hidden"
                 style={{ background: 'linear-gradient(135deg, #0056D2 0%, #003A94 100%)' }}>
              <Brain className="w-8 h-8 text-white animate-pulse" />
              <div className="absolute inset-0 bg-white opacity-20 animate-ping rounded-full"></div>
            </div>
            <div className="flex justify-center space-x-1 mt-4">
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0056D2' }}></div>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0056D2', animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0056D2', animationDelay: '0.2s' }}></div>
            </div>
          </div>
          <h3 className="text-xs font-bold text-black mb-2">Setting Up Your Organization</h3>
          <p className="text-xs text-gray-600 mb-4">Configuring your sales environment{dots}</p>
          <div className="w-full bg-gray-100 rounded-full h-1 mb-4 overflow-hidden">
            <div className="h-full rounded-full animate-pulse" style={{ backgroundColor: '#0056D2' }}></div>
          </div>
          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: '#0056D2' }}></div>
              <span>Processing organization data</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: '#0056D2', animationDelay: '0.1s' }}></div>
              <span>Configuring AI sales settings</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: '#0056D2', animationDelay: '0.2s' }}></div>
              <span>Finalizing setup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OrganizationDashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isCompletionLoading, setIsCompletionLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const { formData, completeOnboarding, resetOnboarding } = useOnboarding();

  async function getOrganizationDetails(){
    await axiosPublic.get("onboarding/get-organizations",
      {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
      .then(res => setOrganizations(res.data.organizations))
      .catch(err => console.log(err));
  }

  useEffect(() => {
   getOrganizationDetails();
  }, []);

  const steps = [
    {number: 1, title: "Organization Setup", subtitle: "Basic company information", icon: Building2, active: currentStep === 1, completed: currentStep > 1},
    {number: 2, title: "Product Portfolio", subtitle: "Services & offerings", icon: Target, active: currentStep === 2, completed: currentStep > 2},
    {number: 3, title: "Market Intelligence", subtitle: "Competitive landscape", icon: TrendingUp, active: currentStep === 3, completed: currentStep > 3},
    {number: 4, title: "Compliance Framework", subtitle: "Security & regulations", icon: Shield, active: currentStep === 4, completed: currentStep > 4}
  ];

  const [formErrors, setFormErrors] = useState({});

   const validateStep1 = () => {
    const errors = {};
    const data = formData.organizationData || {};
    if (!data.company_name?.trim()) { errors.company_name = 'Company name is required'; }
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
    if (currentStep > 1) { setCurrentStep(currentStep - 1); }
  };

  const handleComplete = async () => {
    setIsCompletionLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const res = await axiosPublic.post('/onboarding/create-onboarding-data', formData, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
      toast.success("Onboarding completed!");
      completeOnboarding(); 
      resetOnboarding();     
      setCurrentStep(1);  
      getOrganizationDetails();  
      setShowAddForm(false);
    } catch (error) {
      toast.error("Error submitting onboarding data");
      console.error("Full error:", error);
    } finally {
      setIsCompletionLoading(false);
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
          <div className="bg-white p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xs font-bold text-black mb-1">ORGANIZATION SETUP</h2>
              <p className="text-xs text-gray-600">Configure your organization's basic information and settings</p>
            </div>
            <CompanyForm errors={formErrors}/>
          </div>
        );
      case 2:
        return (
          <div className="bg-white p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xs font-bold text-black mb-1">PRODUCT PORTFOLIO</h2>
              <p className="text-xs text-gray-600">Define your products and services for targeted sales strategies</p>
            </div>
            <ProductServices />
          </div>
        );
      case 3:
        return (
          <div className="bg-white p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xs font-bold text-black mb-1">MARKET INTELLIGENCE</h2>
              <p className="text-xs text-gray-600">Analyze competitive landscape and market positioning</p>
            </div>
            <CompetitiveContextForm />
          </div>
        );
      case 4:
        return (
          <div className="bg-white p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xs font-bold text-black mb-1">COMPLIANCE FRAMEWORK</h2>
              <p className="text-xs text-gray-600">Set up security protocols and regulatory compliance</p>
            </div>
            <Complaince />
          </div>
        );
      default:
        return null;
    }
  };

const OrganizationCard = ({ org }) => (
  <div className="group bg-white rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md p-5 transition-all duration-300 hover:-translate-y-1">
    
    {/* Top Row: Logo + Company Name + Actions */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center border border-blue-100"
          style={{ backgroundColor: '#f0f7ff' }}
        >
          <Building2 className="w-3 h-3" style={{ color: '#0056D2' }} />
        </div>
        <h3 className="text-xs  text-black">{org.company_name}</h3>
      </div>

      {/* Action Buttons on Right End */}
      <div className="flex items-center space-x-2">
        <div className="relative group/tooltip">
          <button className="p-1 rounded-lg border border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
            <Eye className="w-3 h-3" />
          </button>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap">
            View Details
          </div>
        </div>

        <div className="relative group/tooltip">
          <button className="p-1 rounded-lg border border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
            <Edit className="w-3 h-3" />
          </button>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap">
            Edit Organization
          </div>
        </div>
      </div>
    </div>

    {/* Status & Performance */}
    <div className="space-y-1 mb-1">
      <div className="flex items-center justify-between py-1">
        <span className="text-xs text-gray-600">Status</span>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs font-medium text-gray-900">Live</span>
        </div>
      </div>

      <div className="flex items-center justify-between py-1">
        <span className="text-xs text-gray-600">Performance</span>
        <div className="flex items-center space-x-1">
          <TrendingUp className="w-3 h-3 text-green-500" />
          <span className="text-xs font-medium text-gray-900">Growing</span>
        </div>
      </div>
    </div>

   
  </div>
);



  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4 border-2 border-dashed border-gray-200">
        <Building2 className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-sm font-bold text-black mb-2">No Organizations Configured</h3>
      <p className="text-xs text-gray-600 mb-6 max-w-sm mx-auto leading-relaxed">
        Start building your sales pipeline by setting up your first organization. Configure products, competitive intel, and compliance settings.
      </p>
      <button
        onClick={() => setShowAddForm(true)}
        className="inline-flex items-center text-xs px-6 py-3 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
        style={{ backgroundColor: '#0056D2' }}
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Organization
      </button>
    </div>
  );

 if (showAddForm) {
    return (
      <div className="min-h-screen bg-gray-50 overflow-hidden relative">
        {/* AI Loading Overlay */}
        <AILoadingOverlay isVisible={isCompletionLoading} />
        
        {/* Header for form */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleBackToDashboard}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-2"
                  disabled={isCompletionLoading}
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <Brain className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-bold text-gray-900">
                  Create Organization
                </span>
              </div>
              <button 
                onClick={handleBackToDashboard}
                className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100"
                disabled={isCompletionLoading}
              >
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
                disabled={currentStep === 1 || isCompletionLoading}
                className="w-full sm:w-auto flex items-center justify-center text-xs space-x-2 px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              <button
                onClick={currentStep === 4 ? handleComplete : handleNext}
                disabled={isLoading || isCompletionLoading}
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
      <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center border-2 border-blue-100"
                   style={{ backgroundColor: '#f0f7ff' }}>
                <Building2 className="w-5 h-5" style={{ color: '#0056D2' }} />
              </div>
              <div>
                <h1 className="text-sm font-bold text-black">
                   ORGANIZATIONS DASHBORAD
                </h1>
                <p className="text-xs text-gray-600">
                  Manage and track your projects by organization
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100">
                  <Users className="w-4 h-4" style={{ color: '#0056D2' }} />
                  <span className="font-medium text-gray-700">{organizations.length} Active Organizations</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg border border-green-100">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-gray-700">Performance Tracking</span>
                </div>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center justify-center px-5 py-2 text-xs text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 border border-transparent"
                style={{ backgroundColor: '#0056D2' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Organization
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
      
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-semibold text-black">ACTIVE ORGANIZATIONS</h2>
              <p className="text-xs text-gray-500 mt-1">View and manage your configured organizations</p>
            </div>
            {organizations.length > 0 && (
              <button
                onClick={() => setShowAddForm(true)}
                className="text-xs font-medium px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                Add New
              </button>
            )}
          </div>
          {organizations.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {organizations.map((org, index) => (
                <OrganizationCard key={org.id || index} org={org} />
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
