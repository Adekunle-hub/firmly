"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
  const { isAuthenticated, isLoading, isLoggingOut } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    
    if (!isLoading && !isAuthenticated && !isLoggingOut) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, isLoggingOut, router]);

  return { isAuthenticated, isLoading, isLoggingOut };
}