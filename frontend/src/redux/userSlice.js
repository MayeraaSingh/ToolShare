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
      state.currentUser = action.payload || null; // Accept user object directly
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
    logout: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    populateUserFromCookie: (state) => {
      const cookieEntry = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user-data="));

      if (cookieEntry) {
        // Use slice(1).join('=') to handle '=' characters inside the value
        const rawValue = cookieEntry.split("=").slice(1).join("=");
        try {
          const parsedData = JSON.parse(decodeURIComponent(rawValue));
          state.currentUser = parsedData || null;
        } catch {
          state.currentUser = null;
        }
      }
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload || null; // Accept user object directly
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
  logout,
  populateUserFromCookie,
} = userSlice.actions;

export default userSlice.reducer;
