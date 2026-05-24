"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  Check,
  Trash2,
  Briefcase,
  AlertCircle,
  UserPlus,
  MessageSquare,
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isUnread: boolean;
  type: "system" | "workspace" | "team" | "comment";
}

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "ntf_1",
      title: "Security Clearance Updated",
      description:
        "Your firm authorization role was adjusted to Firm Admin successfully.",
      timestamp: "2 mins ago",
      isUnread: true,
      type: "system",
    },
    {
      id: "ntf_2",
      title: "New Case Briefing Assigned",
      description:
        "Adejoke Owolabi tagged you on the Lex Chambers onboarding documentation.",
      timestamp: "1 hour ago",
      isUnread: true,
      type: "workspace",
    },
    {
      id: "ntf_3",
      title: "Team Access Invitation",
      description:
        "Partner signup invitation sent to info@adewalelaw.ng has been accepted.",
      timestamp: "5 hours ago",
      isUnread: false,
      type: "team",
    },
  ]);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  // Mount → animate in; close → animate out → unmount
  function openDropdown() {
    setShouldRender(true);
    // Let DOM paint first, then trigger the enter animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsAnimating(true));
    });
  }

  function closeDropdown() {
    setIsAnimating(false);
    // Wait for the CSS transition to finish before unmounting
    setTimeout(() => setShouldRender(false), 250);
  }

  function toggleDropdown() {
    if (isOpen) {
      setIsOpen(false);
      closeDropdown();
    } else {
      setIsOpen(true);
      openDropdown();
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        closeDropdown();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "system":
        return (
          <div className="p-2 bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 rounded-xl">
            <AlertCircle size={16} />
          </div>
        );
      case "workspace":
        return (
          <div className="p-2 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-xl">
            <Briefcase size={16} />
          </div>
        );
      case "team":
        return (
          <div className="p-2 bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 rounded-xl">
            <UserPlus size={16} />
          </div>
        );
      default:
        return (
          <div className="p-2 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 rounded-xl">
            <MessageSquare size={16} />
          </div>
        );
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
    
      <button
        type="button"
        onClick={toggleDropdown}
        className="relative p-2 text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-full transition-all focus:outline-none cursor-pointer"
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

   
      {shouldRender && (
        <div
          className={`notif-panel ${isAnimating ? "is-open" : ""} absolute -mr-12 sm:-mr-4 md:ml-0 right-0 mt-3 w-80 md:w-96 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl shadow-xl z-50 origin-top-right`}
        >
          
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-50 dark:border-zinc-800/80">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Notifications
              </h3>
              <p className="text-[11px] font-medium text-slate-400">
                {unreadCount} unread items pending
              </p>
            </div>
            {notifications.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={markAllAsRead}
                  title="Mark all as read"
                  className="p-1.5 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Check size={14} />
                </button>
                <button
                  type="button"
                  onClick={clearAllNotifications}
                  title="Clear all log"
                  className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>

         
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-50 dark:divide-zinc-800/50">
            {notifications.length > 0 ? (
              notifications.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => item.isUnread && markAsRead(item.id)}
                  className={`notif-item-enter flex gap-3 p-4 items-start text-left transition-colors relative cursor-pointer group ${
                    item.isUnread
                      ? "bg-slate-50/60 dark:bg-zinc-800/20 hover:bg-slate-50 dark:hover:bg-zinc-800/40"
                      : "hover:bg-slate-50/40 dark:hover:bg-zinc-800/10"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.isUnread && (
                    <span className="absolute left-2.5 top-5 h-1.5 w-1.5 bg-emerald-600 rounded-full" />
                  )}
                  {getNotificationIcon(item.type)}
                  <div className="flex-1 min-w-0 pr-2">
                    <p
                      className={`text-sm tracking-tight ${item.isUnread ? "font-bold text-slate-800 dark:text-zinc-100" : "font-medium text-slate-600 dark:text-zinc-400"}`}
                    >
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5 line-clamp-2 leading-normal">
                      {item.description}
                    </p>
                    <span className="text-[9px] text-slate-400 dark:text-zinc-600 mt-1 block font-medium">
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 px-4 flex flex-col items-center justify-center text-center">
                <div className="p-3 bg-slate-50 dark:bg-zinc-800 text-slate-300 dark:text-zinc-600 rounded-full mb-2">
                  <Bell size={24} />
                </div>
                <p className="text-sm font-bold text-slate-700 dark:text-zinc-400">
                  All caught up!
                </p>
                <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">
                  No alerts or activity items found.
                </p>
              </div>
            )}
          </div>

      
          {notifications.length > 0 && (
            <div className="p-2 border-t border-slate-50 dark:border-zinc-800/80 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  closeDropdown();
                }}
                className="w-full py-2 text-[11px] font-bold tracking-wide uppercase text-emerald-700 hover:text-emerald-800 dark:text-emerald-500 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-zinc-800/50 rounded-xl transition-all cursor-pointer"
              >
                View all tracking logs
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
