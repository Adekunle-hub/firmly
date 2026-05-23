// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slice/uiSlice";
import authReducer from "./slice/authSlice";
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
