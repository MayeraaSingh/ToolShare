import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null, // To hold structured user data
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
      // Ensure the payload has the expected structure
      state.currentUser = action.payload?.user || null;
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
    populateUserFromCookie: (state) => {
      const userData = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user-data="))
        ?.split("=")[1];

      if (userData) {
        const parsedData = JSON.parse(decodeURIComponent(userData));
        state.currentUser = parsedData?.user || null; // Only take the `user` object
      }
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload?.user || null; // Ensure updated structure
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Exporting the reducers
export const {
  registerStart,
  registerSuccess,
  updateStart,
  updateSuccess,
  updateFailure,
  registerFailure,
  clearError,
  populateUserFromCookie,
} = userSlice.actions;

export default userSlice.reducer;
