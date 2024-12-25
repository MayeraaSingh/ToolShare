import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";

// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage, // Using localStorage to persist
  whitelist: ["user"], // Only persist the "user" slice of the state
  // Disable serializability check for actions with non-serializable values
  version: 1,
  transforms: [],
};

// Create a persisted reducer using the persistConfig
const persistedReducer = persistReducer(persistConfig, userReducer);

// Store Configuration
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // This disables the serializability check for non-serializable actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register"], // Optionally ignore specific paths in state
      },
    }),
});

export const persistor = persistStore(store);
export  {store};
