// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import sectionreducer from './sectionslice';
import onboardingReducer from './OnBoardingSlice';

const store = configureStore({
  reducer: {
    section: sectionreducer,
    onboarding: onboardingReducer,
  },
});

export default store;
