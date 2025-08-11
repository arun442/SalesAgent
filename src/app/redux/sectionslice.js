import { createSlice } from '@reduxjs/toolkit';

const sectionslice = createSlice({
  name: 'section',
  initialState: {
    value: 'Dashboard',
  },
  reducers: {
    setsection: (state,actions) => {
      state.value = actions.payload;
    },
  },
});

// Export actions
export const { setsection } = sectionslice.actions;

// Export reducer
export default sectionslice.reducer;
