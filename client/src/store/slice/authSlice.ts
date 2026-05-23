import { MockUserProfile } from "@/utils/mockDatabase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  user: MockUserProfile | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
}

const existingToken = typeof window !== "undefined"
  ? Cookies.get("firmly_auth_token") ?? null
  : null;

const initialState: AuthState = {
  user: null,
  accessToken: existingToken,
  isAuthenticated: !!existingToken, // ← true on refresh if cookie exists
  isLoading: !existingToken,        // ← skip loading if cookie already there
  isLoggingOut: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: MockUserProfile; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isLoggingOut = false;
    },
    restoreSession: (
      state,
      action: PayloadAction<{ user: MockUserProfile; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isLoggingOut = false;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isLoggingOut = true; // ← keeps loader visible during redirect
      if (typeof window !== "undefined") {
        Cookies.remove("firmly_refresh_token");
        Cookies.remove("firmly_auth_token");
        Cookies.remove("firmly_user_email");
      }
    },
  },
});

export const { setCredentials, restoreSession, updateAccessToken, logout } =
  authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;
export const selectIsLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectIsLoggingOut = (state: { auth: AuthState }) =>
  state.auth.isLoggingOut;

export default authSlice.reducer;