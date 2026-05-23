"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { simulateRefreshApi } from "@/utils/mockAuthApi";
import Cookies from "js-cookie";
import { restoreSession, logout } from "./slice/authSlice";
import { MOCK_USERS } from "@/utils/mockDatabase";

export default function InitialSessionLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = Cookies.get("firmly_refresh_token");
    const email = Cookies.get("firmly_user_email");

    if (refreshToken && email) {
      simulateRefreshApi()
        .then((res) => {
          const mockUser = MOCK_USERS.find(u => u.email === email);
          if (mockUser) {
            dispatch(restoreSession({ user: mockUser.user, accessToken: res.accessToken }));
          } else {
            dispatch(logout());
          }
        })
        .catch(() => {
          dispatch(logout());
        });
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return <>{children}</>;
}