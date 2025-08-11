import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {

  currentStep: 1,

  formData: {},

  isLoading: false,

  isComplete: false

};
 
const onboardingSlice = createSlice({

  name: 'onboarding',

  initialState,

  reducers: {

    setStep: (state, action) => {

      state.currentStep = action.payload;

    },

    updateFormData: (state, action) => {

      const { field, value } = action.payload;

      state.formData[field] = value;

    },

    updateMultipleFields: (state, action) => {

      state.formData = { ...state.formData, ...action.payload };

    },

    setLoading: (state, action) => {

      state.isLoading = action.payload;

    },

    completeOnboarding: (state) => {

      state.isComplete = true;

      state.isLoading = false;

    },

    resetOnboarding: () => {

      return initialState;

    }

  }

});
 
export const {

  setStep,

  updateFormData,

  updateMultipleFields,

  setLoading,

  completeOnboarding,

  resetOnboarding

} = onboardingSlice.actions;
 
export default onboardingSlice.reducer;