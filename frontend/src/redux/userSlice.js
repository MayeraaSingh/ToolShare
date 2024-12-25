import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error =null;
  },
  updateSuccess: (state,action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
  },
  
  updateFailure: (state,action) => {
      state.loading = false;
      state.error = action.payload;
  },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  clearError,updateSuccess,
  updateStart,updateFailure
} = userSlice.actions;

export default userSlice.reducer;
