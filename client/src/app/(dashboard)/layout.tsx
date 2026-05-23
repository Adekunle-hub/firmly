"use client";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/Sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Cookies from "js-cookie";
import { Toaster } from "sonner";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import BackgroundLoader from "@/components/BackgroundLoader";
import { restoreSession } from "@/store/slice/authSlice";
import { MOCK_USERS } from "@/utils/mockDatabase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, isLoggingOut } = useAuthGuard();

 useEffect(() => {
  const token = Cookies.get("firmly_auth_token");
  const email = Cookies.get("firmly_user_email");

  if (token && email) {
    const record = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (record) {
      dispatch(restoreSession({ user: record.user, accessToken: token })); // ← .user here
    }
  }
}, [dispatch]);

  if (isLoggingOut || isLoading) return <BackgroundLoader />;
  if (!isAuthenticated) return null;

  return (
    <div className="flex justify-center w-full min-h-screen bg-background">
      <div className="w-full max-w-555">
        <SidebarProvider>
          <div className="flex min-h-screen w-full overflow-hidden">
            <AppSidebar />
            <SidebarInset className="flex flex-col min-w-0 flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto overflow-x-hidden py-2">
                {children}
              </main>
             
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
