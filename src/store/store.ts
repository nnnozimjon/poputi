import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { locationReducer, userReducer } from "./slices";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// Import redux-persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

// Persist configuration
const persistConfig = {
  key: "root", // Key for the storage
  storage, // Storage engine (e.g., localStorage)
  whitelist: ["user"], // Only persist the `user` slice (optional)
};

// Create a persisted reducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Use the persisted reducer for the `user` slice
    location: locationReducer, // Other reducers remain unchanged
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check (required for redux-persist)
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook for using the selector with the correct RootState type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;