// context/OnboardingContext.js
'use client';
 
import { createContext, useContext, useReducer } from 'react';
 
const OnboardingContext = createContext();
 
const initialState = {
  currentStep: 1,
  formData: {},
  isLoading: false,
  isComplete: false
};
 
function onboardingReducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value
        }
      };
    case 'UPDATE_MULTIPLE_FIELDS':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload
        }
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'COMPLETE_ONBOARDING':
      return { ...state, isComplete: true, isLoading: false };
    case 'RESET_ONBOARDING':
      return initialState;
    default:
      return state;
  }
}
 
export function OnboardingProvider({ children }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);
 
  const setStep = (step) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };
 
  const updateFormData = (field, value) => {
    dispatch({ type: 'UPDATE_FORM_DATA', field, value });
  };
 
  const updateMultipleFields = (data) => {
    dispatch({ type: 'UPDATE_MULTIPLE_FIELDS', payload: data });
  };
 
  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };
 
  const completeOnboarding = () => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
  };
 
  const resetOnboarding = () => {
    dispatch({ type: 'RESET_ONBOARDING' });
  };
 
  const value = {
    ...state,
    setStep,
    updateMultipleFields,
    updateFormData,
    updateMultipleFields,
    setLoading,
    completeOnboarding,
    resetOnboarding
  };
 
  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}
 
export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
 