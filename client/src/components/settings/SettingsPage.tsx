"use client";

import React, { useState } from "react";
import {toast } from "sonner"
import { Building2, User, KeyRound, Bell, Scale, Blocks } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthenticationTab from "./AuthenticationTab";
import FirmSettingsTab from "./FirmSettingsTab";
import IntegrationsTab from "./IntegrationsTab";
import NigerianRegulatoryTab from "./NigerianRegulatoryTab";
import NotificationsTab from "./NotificationsTab";
import PublicProfileTab from "./PublicProfileTab";



type SettingsTab = "firm" | "profile" | "auth" | "notifications" | "regulatory" | "integrations";

export default function SettingsHubPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("firm");

  const tabsConfig = [
    { id: "firm", name: "Firm Settings", icon: Building2 },
    { id: "profile", name: "Public Profile", icon: User },
    { id: "auth", name: "Authentication", icon: KeyRound },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "regulatory", name: "Nigerian Regulatory", icon: Scale },
    { id: "integrations", name: "Integrations", icon: Blocks },
  ] as const;

  const handleSaveAllConfigurations = () => {
    toast.success("Settings saved successfully")
    console.log(`Saving configurations mapped for tab panel: ${activeTab}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#181D1A] flex flex-col pb-24">
      {/* Settings Breadcrumb & Banner Header */}
      <header className="bg-white border-b border-slate-100 px-2 sm:px-4 md:px-8 py-5">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Settings & Configuration</h1>
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          Configure firm settings, notifications, regulatory compliance, and integrations
        </p>
      </header>

      {/* Horizontal Nav Bar Strip Selector */}
      <div className="bg-white border-b border-slate-200/60  px-2 sm:px-4 md:px-8 flex md:items-center gap-1 overflow-x-auto scrollbar-none flex-col md:flex-row items-start">
        {tabsConfig.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all relative ${
                isActive 
                  ? "border-[#055939] text-[#055939]" 
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Core Viewport Panel */}
      <main className="flex-1 max-w-350 mt-4 w-full mx-auto   sm:px-4 md:px-8 ">
        {activeTab === "firm" && <FirmSettingsTab />}
        {activeTab === "profile" && <PublicProfileTab />}
        {activeTab === "auth" && <AuthenticationTab />}
        {activeTab === "notifications" && <NotificationsTab />}
        {activeTab === "regulatory" && <NigerianRegulatoryTab />}
        {activeTab === "integrations" && <IntegrationsTab />}
      </main>

      {/* Fixed Sticky Action Commands Save Layout Footer Banner */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-8 py-4 flex items-center justify-end gap-3 shadow-2xl z-40">
        <Button variant="ghost" className="text-xs hover:border-red-900 hover:bg-red-700/70 transition-colors ease-in-out duration-300 cursor-pointer font-bold text-slate-500 h-10 px-5 rounded-xl">
          Cancel
        </Button>
        <Button 
          onClick={handleSaveAllConfigurations}
          className="bg-[#055939] cursor-pointer hover:bg-[#04432b] text-white text-xs font-bold h-10 px-6 rounded-xl shadow-sm transition-all"
        >
          Save Configuration
        </Button>
      </footer>
    </div>
  );
}