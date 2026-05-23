"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import Cookies from "js-cookie";
import Image from "next/image";
import { 
  User, 
  Users, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  LogOut 
} from "lucide-react";
import { logout } from "@/store/slice/authSlice";
import { toast } from "sonner";

interface UserProfileDropdownProps {
  avatarUrl?: string;
  userName?: string;
}

export default function UserProfileDropdown({
  avatarUrl = "/images/ede.jpg",
  userName = "Mujeeb",
}: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 const handleSignOut = async () => {
  Cookies.remove("firmly_refresh_token");
  dispatch(logout());
  toast.success("User logged out successfully");
  setIsOpen(false);
  await new Promise((res) => setTimeout(res, 100));
  router.replace("/login");
};

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      
   
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative h-10 w-10 rounded-full border-2 border-transparent hover:scale-105 active:scale-95 focus:outline-none transition-all duration-200 overflow-hidden cursor-pointer"
      >
        <Image
          src={avatarUrl}
          alt={userName}
          width={40}
          height={40}
          className="h-full w-full object-cover"
          priority
        />
      </button>

      {/* ── Dropdown Panel Container ── */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl py-2 shadow-xl z-50 origin-top-right animate-in fade-in slide-in-from-top-2 duration-150">
          
          {/* Profile Item */}
          <button 
            type="button"
            onClick={() => { setIsOpen(false); router.push("/profile"); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-zinc-800/60 group transition-colors cursor-pointer"
          >
            <User size={18} className="text-slate-500 dark:text-zinc-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-slate-700 dark:text-zinc-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              Profile
            </span>
          </button>

          {/* Community Item */}
          <button 
            type="button"
            onClick={() => { setIsOpen(false); router.push("/community"); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-zinc-800/60 group transition-colors cursor-pointer"
          >
            <Users size={18} className="text-slate-500 dark:text-zinc-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-slate-700 dark:text-zinc-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              Community
            </span>
          </button>

          {/* Subscription Item with Premium Ribbon Badge */}
          <button 
            type="button"
            onClick={() => { setIsOpen(false); router.push("/billing"); }}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-zinc-800/60 group transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <CreditCard size={18} className="text-slate-500 dark:text-zinc-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors" />
              <span className="text-sm font-medium text-slate-700 dark:text-zinc-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                Subscription
              </span>
            </div>
            
            {/* Pro badge matching your application design guidelines */}
            <span className="text-[10px] font-bold text-white bg-purple-600 px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider shadow-xs">
              ✦ Pro
            </span>
          </button>

          {/* Settings Item */}
          <button 
            type="button"
            onClick={() => { setIsOpen(false); router.push("/settings"); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-zinc-800/60 group transition-colors cursor-pointer"
          >
            <Settings size={18} className="text-slate-500 dark:text-zinc-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-slate-700 dark:text-zinc-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              Settings
            </span>
          </button>

          {/* Divider */}
          <div className="h-px bg-slate-100 dark:bg-zinc-800 my-1.5" />

          {/* Help Center Item */}
          <button 
            type="button"
            onClick={() => { setIsOpen(false); router.push("/help"); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-zinc-800/60 group transition-colors cursor-pointer"
          >
            <HelpCircle size={18} className="text-slate-500 dark:text-zinc-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-slate-700 dark:text-zinc-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              Help center
            </span>
          </button>

          {/* Sign Out Item */}
          <button 
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-950/30 group transition-colors cursor-pointer text-red-600 dark:text-red-400"
          >
            <LogOut size={18} className="text-red-500/80 group-hover:text-red-600 transition-colors" />
            <span className="text-sm font-medium group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">
              Sign out
            </span>
          </button>

        </div>
      )}
    </div>
  );
}